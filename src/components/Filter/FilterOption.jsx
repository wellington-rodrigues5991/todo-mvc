export default function FilterOption({children, middle, path, url, change}) {
  const p = path.replace("/", '');

  return (
    <div className={"inline p-3px7px relative"+(middle == 'true' ? ' mx-12px' : '')}>
      <input type="radio" id={"filter"+p} name="filter" value={p} defaultChecked={path == url} className="absolute w-full h-full appearance-none -top-1 left-0 outline-none checked:shadow-outline cursor-pointer hover:shadow-hoverline rounded-sm" onChange={() => change(path)} />
      <label htmlFor={"filter"+p}>{children}</label>
    </div>
  )
}
  
  
  
  
  
  