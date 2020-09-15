import Editor from './Editor';
import Todo from './Todo';


export default function Todos({todos, path, completed, send}) {
  const edit = {
    execute: () => {},
    send: send
  };

  const filter = todo => {
    const response = path == '/active' ? false : true;
    
    if(path == '/' || todo.completed == response) 
      return todo;
  }

  const save = (id, send) => {
    const elem = document.getElementById(id);
    const data = {id: elem.id, text: elem.innerText, completed: elem.parentElement.querySelector('input').checked}

    edit.send("TODO.EDIT", data);
  }

  return (
      <section className="relative">
        <div className="absolute -top-65 left-5 text-center w-34 h-65 flex">
          {todos.length > 0 && <>
            <input type="checkbox" name="select" className="transform rotate-0 z-10 absolute appearance-none focus:outline-none w-full h-full top-0 left-0" onChange={() => send("CHANGECOMPLETED.ALL", { value: completed == 0 ? false : true })} />
            <label htmlFor="select" className={"transform rotate-90 p-3px items-center text-gray-"+ (completed == 0 ? "400" : "200") +" text-1xl "} >❯</label>
          </>}
        </div>
        <ul className="todo border-t border-gray-250">
          {todos.filter(todo => filter(todo)).map(
              todo => <Todo onEdit={edit} data={todo} key={todo.id}/>
          )}
        </ul>
        <Editor save={save} edit={edit} />
      </section>
  );
}