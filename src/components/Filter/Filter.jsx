import FilterOption from './FilterOption';

export default function Filter({path, todos, send}) {
  const Change = url => path.push('/', url, { shallow: true });
  const filter = [
    {path: '/', text: 'All'},
    {path: '/active', text: 'Active'},
    {path: '/completed', text: 'All'}
  ];

  return (
    <section className="text-sm p-1015 relative text-gray-700 before:empty-content before:absolute before:w-full before:h-full before:overflow-hidden before:shadow-triple before:left-0 before:bottom-0">
      <span>{todos.todo} item{todos.todo != 1 ? 's' : ''} left</span>
      <form className="text-center absolute -top-1 left-0 right-0 h-full leading-10">
        <FilterOption path ='/' url={path.asPath} change={Change}>All</FilterOption>
        <FilterOption middle="true" path = '/active' url={path.asPath} change={Change}>Active</FilterOption>
        <FilterOption path = '/completed' url={path.asPath} change={Change}>Completed</FilterOption>
      </form>
      {todos.completed > 0 && <button className="text-left pt-px pr-4 -mr-px absolute -top-1 right-0 leading-10 hover:underline focus:outline-none text-gray-700" onClick={() => send("CLEARCOMPLETED", {})}>Clear completed</button>}
    </section>
  )
}