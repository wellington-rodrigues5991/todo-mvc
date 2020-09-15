import Head from 'next/head';
import { useRouter } from 'next/router';
import  { useState } from 'react';

import "../styles/main.css";

import Filter from '../src/components/Filter/Filter';
import Todos from '../src/components/Todos/Todos';
import Footer from '../src/components/__General/Footer';
import __Header from '../src/components/__General/__Header';
import { useMachine } from '@xstate/react';
import { TodosMachine } from '../src/xstate/TodosMachine';
import Learn from '../src/components/__General/Learn';

export default function Home() {
  const router = useRouter();  
  const [state, send] = useMachine(TodosMachine);

  const completed = () => {
    const todos = state.context.todos;
    const n = todos.filter(todo => todo.completed == false);
    return {todo: n.length, completed: todos.length-n.length};
  };  
  const count = completed();

  return (
    <div className="pt-15r fixed w-full h-full top-px left-px overflow-y-auto md:pl-300">
      <Learn />
      <main className="shadow-double bg-white  mx-auto mt-32 relative max-w-550">
        <__Header send={send} count={state.context.todos.length} />
        <Todos path={router.asPath} todos={state.context.todos} completed={count.todo} send={send} />
        {state.context.todos.length > 0 && <Filter path={router} todos={count} send={send}/>}
      </main>

      <Footer/>
    </div>
  )
}
