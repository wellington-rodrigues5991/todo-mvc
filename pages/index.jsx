import Head from 'next/head';
import { useRouter } from 'next/router';
import  { useState } from 'react';

import "../styles/main.css";

import Filter from '../src/components/Filter/Filter';
import Todos from '../src/components/Todos/Todos';
import Footer from '../src/components/__General/Footer';
import __Header from '../src/components/__General/__Header';

export default function Home() {
  const router = useRouter();  
  const [todos, setTodos] = useState([
    {text: "sjskdfjsklfjssfld", completed: false}, 
    {text: "klfldsjsfkljs", completed: true}, 
    {text: "dlkiuouwadklklajkds", completed: false}, 
    {text: "kslfjsdklfjsdklsfjsklfdskldjf sadklfjs jsdklfsdkl", completed: false}
  ]);

  return (
    <div className="pt-15r">
      <Head>
        <title>React • TodoMVC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="shadow-double bg-white  mx-auto mt-32 relative max-w-550">
        <__Header />
        <Todos path={router.asPath} todos={todos} />
        <Filter path={router}/>
      </main>

      <Footer/>
    </div>
  )
}
