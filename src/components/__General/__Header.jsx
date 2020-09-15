export default function __Header({send, count}){
    return(
        <header>
          <h1 className="text-center text-red-150 text-100 leading-none absolute w-full -top-110 font-hairline">todos</h1>
          <input type="text" className={"w-full p-16 pl-60 leading-6 rounded-none outline-none shadow-inset placeholder-gray-200 "+(count == 0 ? "pb-15" : '')} placeholder="What needs to be done?" autoFocus
          onKeyPress={e => {
            if (e.key === "Enter") {
              send("NEWTODO", { value: e.target.value });
              e.target.value = ''
            }
          }} />
        </header>
    );
}