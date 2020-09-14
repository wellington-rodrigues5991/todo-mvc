import { Machine, assign } from 'xstate';
import { request, gql } from 'graphql-request';

async function server(query) {
    const endpoint = 'api/graphql/';
    return await request(endpoint, query, {});
}

export const TodosMachine = Machine({
  id: 'todos',
  initial: 'loading',
  context: {
    todos: [],
    todo: "",
    temp: ""
  },
  states: {
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
                actions: assign({todos : (a, b) => b.data.todos})
            },
            onError: {
              target: 'failure',
              actions: assign({ error: (context, event) => event.data })
            }
        }
    },
    waiting: {
        on: {
            "NEWTODO": {target: 'registerTodo', cond: (ctx, e) => e.value.length},
            "CLEARCOMPLETED": {target: 'clearTodos'},
            "CHANGECOMPLETED.ALL": {target: 'allCompleted'},
            "TODO.EDIT": {target: 'todo.edit'},
            "TODO.DELETE": {target: 'todo.delete'},
        }
    },
    todo: {
        states: {
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
                        target: '#todos.waiting',
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
    registerTodo: {
        invoke: {
            src: (ctx, e) => {
                ctx.todo = e.value;
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
                    a.todos.push({id: b.data.createTodo.id, text: a.todo, completed: false});
                    console.log(a.todos)
                    return a.todos
                }})
            },
            onError: {
              target: 'failure',
              actions: assign({ error: (context, event) => event.data })
            }
        }
    },
    clearTodos: {
        invoke: {
            src: (ctx, e) => {
                ctx.todo = e.value;
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
    allCompleted: {
        invoke: {
            src: (ctx, e) => {
                ctx.temp = e.value
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