import {useRef, useEffect} from 'react';

export default function Todo({onEdit, text, checked, completed}) {
  const ref = useRef();

  useEffect(() => {
    if(ref.current != undefined) ref.current.checked = checked;
  })
  return (
    <li className="group w-full leading-6 rounded-none border-b border-gray-250 relative">
        <button className="absolute h-43px bottom-10 right-10 w-10 text-red-200 text-3xl cursor-default outline-none opacity-0 hover:text-red-300  focus:outline-none group-hover:opacity-100">×</button>
        <input ref={ref} type="checkbox" className="absolute h-full opacity-0 w-10 label-checked:bg-check label-checked:line-through label-checked:text-gray-450" defaultChecked={checked}/>
        <label onDoubleClick={onEdit} className="block p-15 pl-60 break-all bg-uncheck bg-no-repeat bg-left overflow-hidden">{text}</label>
    </li>
  )
}





