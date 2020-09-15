import { Machine, assign, spawn, sendParent } from 'xstate';
import { request, gql } from 'graphql-request';

async function server(query) {
    const endpoint = 'api/graphql/';
    return await request(endpoint, query, {});
}

const TodoMachine = Machine({
    id: 'todo',
    initial: 'reading',
    context: {id: "", text: "", completed: false},
    states: {
        reading: {
            on:{
                "TODO.EDIT": {target: 'edit'},
                "TODO.COMPLETE": {
                    actions: [
                        assign({completed : (a, b) => {
                            return b.completed
                        }}),
                        sendParent(ctx => ({ type: "waiting", todo: ctx }))
                    ]
                },
                "TODO.DELETE": {target: 'delete'},
            }
        },
        edit: {
            invoke: {
                src: (ctx, e) => server(gql`
                mutation{
                    changeTodo(text:"${e.text}", completed:${e.completed}, id:"${e.id}"){
                        id
                        text
                        completed
                    }
                }
            `),
                onDone: {
                    target: 'reading',
                    actions: [
                        assign({
                            text : (a, b) => b.data.changeTodo.text,
                            completed : (a, b) => b.data.changeTodo.completed
                        }),
                        sendParent(ctx => (console.log('commit'), { type: "UPDATE", todo: ctx }))
                    ]
                }
            }
        },
        delete: {
            entry: sendParent((ctx, e) => ({}, { type: "DELETE", id: e.id }))
        }
    }
});

export const TodosMachine = Machine({
  id: 'todos',
  initial: 'loading',
  context: {
    todos: [],
    temp: "",
  },
  states: {
    //carrega as todos do banco
    loading: {
        invoke: {
            src: () => server(gql`
                query {
                    todos{
                        id
                        text
                        completed
                    }
                }
            `),
            onDone: {
                target: 'waiting',
                actions: assign({todos : (a, b) => b.data.todos.map(todo => ({
                    ...todo,
                    ref: spawn(TodoMachine.withContext(todo))
                }))})
            },
            onError: {
              target: 'failure',
              actions: assign({ error: (context, event) => event.data })
            }
        }
    },
    //estado de espera padrão, que gerencia todos os outros
    waiting: {
        on: {
            "NEWTODO": {target: 'registerTodo', cond: (ctx, e) => e.value.length},
            "CLEARCOMPLETED": {target: 'clearTodos'},
            "CHANGECOMPLETED.ALL": {target: 'allCompleted'},
            "DELETE": {target: 'todo.delete'},
            "EDIT": {target: 'todo.edit'},
            "UPDATE": {
                actions: assign({todos : (a, b) => a.todos.map(todo => {
                    if(todo.id == b.todo.id)
                        return {...b.todo, ref: todo.ref }
                    return todo;
                })}),
            }
        }
    },
    //estados relacionados as todo
    todo: {
        states: {
            //deleta a todo selecionada
            delete: {
                invoke: {
                    src: (ctx, e) => {
                        ctx.temp = e.id;
                        return server(gql`
                            mutation{
                                deleteTodo(id:"${e.id}")
                            }
                        `)
                    },
                    onDone: {
                        target: '#todos.waiting',
                        actions: assign({todos : ctx => ctx.todos.filter(todo => todo.id !== ctx.temp)})
                    },
                    onError: {
                      target: '#todos.failure',
                      actions: assign({ error: (context, event) => event.data })
                    }
                }
            },
            //edita informações da todo, utilizo uma unica para text e check para ficar sempre em sync
            edit: {
                invoke: {
                    src: (ctx, e) => server(gql`
                    mutation{
                        changeTodo(text:"${e.text}", completed:${e.completed}, id:"${e.id}"){
                            id
                            text
                            completed
                        }
                    }
                `),
                    onDone: {
                        //target: '#todos.waiting',
                        actions: assign({todos : (a, b) => {
                            const i = a.todos.forEach(todo => {
                                if(todo.id == b.data.changeTodo.id){
                                    todo.text = b.data.changeTodo.text;
                                    todo.completed = b.data.changeTodo.completed;
                                }
                            })
                            return a.todos;
                        }})
                    },
                    onError: {
                      target: '#todos.failure',
                      actions: assign({ error: (context, event) => event.data })
                    }
                }
            }
        }
    },
    //registra uma nova task
    registerTodo: {
        invoke: {
            src: (ctx, e) => {
                ctx.temp = e.value;
                return server(gql`
                    mutation{
                        createTodo(text: "${e.value}"){
                            id
                        }
                    }
                `)
            },
            onDone: {
                target: 'waiting',
                actions: assign({todos : (a, b) => {
                    const todo = {id: b.data.createTodo.id, text: a.temp, completed: false};
                    a.todos.push({
                        ...todo, 
                        ref: spawn(TodoMachine.withContext(todo))
                    });
                    return a.todos
                }})
            },
            onError: {
              target: 'failure',
              actions: assign({ error: (context, event) => event.data })
            }
        }
    },
    //limpa todas as todo completas
    clearTodos: {
        invoke: {
            src: (ctx, e) => {
                ctx.temp = e.value;
                return server(gql`
                    mutation{
                        clearCompleted
                    }
                `)
            },
            onDone: {
                target: 'waiting',
                actions: assign({todos : ctx => ctx.todos.filter(todo => !todo.completed)})
            },
            onError: {
              target: 'failure',
              actions: assign({ error: (context, event) => event.data })
            }
        }
    },
    //completed ou uncompleted de todas as tasks
    allCompleted: {
        invoke: {
            src: (ctx, e) => {
                ctx.temp = e.value;
                ctx.todos.forEach(todo => todo.ref.send("TODO.COMPLETE", {completed: e.value}));
                return server(gql`
                    mutation{
                        changeCompletedAll(completed: ${e.value})
                    }
                `)
            },
            onDone: {
                target: 'waiting',
                actions: assign({todos : ctx => {
                    ctx.todos.forEach(todo => todo.completed = ctx.temp)
                    return ctx.todos
                    }
                })
            },
            onError: {
              target: 'failure',
              actions: assign({ error: (context, event) => event.data })
            }
        }
    },
    failure: {
        on: {
            RETRY: 'loading'
        }
    }
  }
});