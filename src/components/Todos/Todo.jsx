import {useRef, useEffect} from 'react';
import { useService } from "@xstate/react";

export default function Todo({onEdit, data, change}) {
  const ref = useRef();
  const [state, send] = useService(data.ref);
  const { id, text, completed } = state.context;

  useEffect(() => {
    if(ref.current != undefined) ref.current.checked = completed;
  })
  return (
    <li className="group w-full leading-tight rounded-none border-b border-gray-250 relative">
        <button className="absolute h-43px bottom-10 right-20 w-20 text-red-200 text-3xl cursor-default outline-none hidden hover:text-red-300  focus:outline-none group-hover:block" onClick={() => send("TODO.DELETE", {id})}>×</button>
        <input ref={ref} type="checkbox" className="absolute h-full opacity-0 w-10 label-checked:bg-check label-checked:line-through label-checked:text-gray-450" defaultChecked={completed} onChange={e => send("TODO.EDIT", {id, text, completed: e.target.checked})}/>
        <label onDoubleClick={e => onEdit.execute(e, send)} className="block p-15 pl-60 break-all bg-uncheck bg-no-repeat bg-pos overflow-hidden" id={id}>{text}</label>
    </li>
  )
}





