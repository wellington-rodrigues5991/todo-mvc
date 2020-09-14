import {useRef, useEffect} from 'react';

export default function Todo({onEdit, data, change, remove}) {
  const ref = useRef();

  useEffect(() => {
    if(ref.current != undefined) ref.current.checked = data.completed;
  })
  return (
    <li className="group w-full leading-6 rounded-none border-b border-gray-250 relative">
        <button className="absolute h-43px bottom-10 right-10 w-10 text-red-200 text-3xl cursor-default outline-none hidden hover:text-red-300  focus:outline-none group-hover:block" onClick={() => remove(data.id)}>×</button>
        <input ref={ref} type="checkbox" className="absolute h-full opacity-0 w-10 label-checked:bg-check label-checked:line-through label-checked:text-gray-450" defaultChecked={data.completed} onChange={() => change(data.id)}/>
        <label onDoubleClick={onEdit} className="block p-15 pl-60 break-all bg-uncheck bg-no-repeat bg-left overflow-hidden" id={data.id}>{data.text}</label>
    </li>
  )
}





