import Todo from './Todo';
import  { useRef, useState } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    width: 100%;
    padding-left: 43px;

    & input{
      width: 100%;
      height: 100%;
      padding: 12px 16px;
      height: 59px;
      border: 1px solid #999;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)
    }
`;

export default function Todos({todos, path}) {
  const editor = useRef();
  const [content, setContent] = useState({x: '0', y: '0'});

  const filter = todo => {
    const response = path == '/active' ? false : true;

    if(path == '/' || todo.completed == response) 
      return todo;
  }

  const edit = e => {
    e.target.className += " whitespace-no-wrap";
    editor.current.value = e.target.innerText;
    editor.current.parentElement.parentElement.className = 'relative';
    if(content.ref != undefined) content.ref.className = content.ref.className.replace(" whitespace-no-wrap", "");

    const position = e.target.getBoundingClientRect();
    const parent = editor.current.parentElement.parentElement.getBoundingClientRect();

    setTimeout(() => editor.current.focus(), 0); //setTimeout para executar apos a pilha atual de codigo
    setContent({x: position.x - parent.x, y: position.y - parent.y, ref:e.target});
  }

  const blur = () => {
    editor.current.parentElement.parentElement.className = 'relative hidden';
    if(content.ref != undefined) content.ref.className = content.ref.className.replace(" whitespace-no-wrap", "");
    setContent({x: 0, y: 0, ref:undefined});
  }
  return (
      <section className="relative">
        <div className="absolute -top-65 text-center w-34 h-65 flex">
          <input type="radio" name="select" className="absolute appearance-none opacity-50 w-full h-full top-0 left-0" />
          <label htmlFor="select" className="transform rotate-90 p-3px items-center text-gray-200 text-1xl">❯</label>
        </div>
        <ul className="todo border-t border-gray-250">
          {todos.filter(todo => filter(todo)).map((todo, key) => <Todo onEdit={edit} text={todo.text} key={key} path={path} checked={todo.completed} />)}
        </ul>
        <div className="relative hidden">
          <Content x={content.x} y={content.y} className="bg-white">
            <input ref={editor} type="text" className="rounde-r-none border-solid border-1 border-green-600 outline-none" onBlur={blur} />
          </Content>
        </div>
      </section>
  );
}