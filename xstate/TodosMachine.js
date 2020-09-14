import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';

async function load(){
    const res = await fetch('api/hello/')
    const json = await res.json()
    return {json}
}

const add = assign({
    todos: (context, event) => context.todos + 1
});

export const TodosMachine = Machine({
  id: 'todos',
  initial: 'loading',
  context: {
    todos: []
  },
  states: {
    loading: {
        invoke: {
            src: () => load(),
            onDone: {
                target: 'waiting',
                actions: assign({todos : (a, b) => b.data.json})
            }
        }
    },
    waiting: {
        //nova
        //editar text, completed
        //deletar
        //limpar tasks completas
    }
  }
});


/*
    load ->  listar -> nova, editar, deletar, limpar tasks completas
*/