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

export default function Editor({save, edit}) {
  const editor = useRef();
  const [content, setContent] = useState({x: '0', y: '0'});

  edit.execute = (e, send) => {
    e.target.className += " whitespace-no-wrap";
    editor.current.value = e.target.innerText;
    editor.current.parentElement.parentElement.className = 'relative';
    if(content.ref != undefined) content.ref.className = content.ref.className.replace(" whitespace-no-wrap", "");

    const position = e.target.getBoundingClientRect();
    const parent = editor.current.parentElement.parentElement.getBoundingClientRect();

    edit.send = send;

    setTimeout(() => editor.current.focus(), 0); //setTimeout para executar apos a pilha atual de codigo
    setContent({x: position.x - parent.x, y: position.y - parent.y, ref:e.target});
  }

  const blur = () => {
    editor.current.parentElement.parentElement.className = 'relative hidden';
    if(content.ref != undefined) {
      content.ref.className = content.ref.className.replace(" whitespace-no-wrap", "");
      content.ref.innerText = editor.current.value;
      save(content.ref.id);
    }
    setContent({x: 0, y: 0, ref:undefined});
  }

  return (
    <div className="relative hidden">
        <Content x={content.x} y={content.y} className="bg-white">
        <input ref={editor} type="text" className="rounde-r-none border-solid border-1 border-green-600 outline-none" onBlur={blur} onKeyPress={e => e.key === "Enter"? blur() : null} />
        </Content>
    </div>
  );
}