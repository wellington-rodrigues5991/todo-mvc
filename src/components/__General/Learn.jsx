export default function Learn({send}){
    return(
        <aside className="absolute top-8 -left-300 md:left-8 p-10 w-272 bg-white transition-all duration-500 rounded-md bg-gray-50 text-sm aside">
            <h3>React</h3>

            <h5>Example</h5>
            <a href="https://github.com/wellington-rodrigues5991/todo-mvc">Source</a>
            <h5 className="pt-12px">React + Backbone.js</h5>
            <a href="http://todomvc.com/examples/react-backbone">Demo</a>, 
            <a className="pl-4px" href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/react-backbone">Source</a>
            <h5 className="pt-12px">Scala.js + React</h5>
            <a href="http://todomvc.com/examples/scalajs-react">Demo</a>, 
            <a className="pl-4px" href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/scalajs-react">Source</a>
            <h5 className="pt-12px">TypeScript + React</h5>
            <a href="http://todomvc.com/examples/typescript-react">Demo</a>, 
            <a className="pl-4px" href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-react">Source</a>
            <h5 className="pt-12px">React + Alt</h5>
            <a href="http://todomvc.com/examples/react-alt">Demo</a>, 
            <a className="pl-4px" href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/react-alt">Source</a>

            <hr/>

            <div className="chat mb-60">
                <p className="bg-gray-310 p-10 text-15 italic leading-tight2 text-gray-400">React is a JavaScript library for creating user interfaces. Its core principles are declarative code, efficiency, and flexibility. Simply specify what your component looks like and React will keep it up-to-date when the underlying data changes.</p>
                <a className="float-right pt-20" href="http://facebook.github.io/react">React</a>
            </div>

            <hr/>

            <h4>Official Resources</h4>
            <ul>  
                <li><a href="http://facebook.github.io/react/docs/tutorial.html">Tutorial</a></li>
                <li><a href="http://www.quora.com/Pete-Hunt/Posts/React-Under-the-Hood">Philosophy</a></li>  
                <li><a href="http://facebook.github.io/react/support.html">Support</a></li>  
                <li><a href="https://github.com/facebook/flux/tree/master/examples/flux-todomvc">Flux architecture example</a></li>  
            </ul>

            <h4 className="pt-30">Community</h4>
            <ul>  
                <li><a href="https://stackoverflow.com/questions/tagged/reactjs">ReactJS on Stack Overflow</a></li>
                <li><a href="https://groups.google.com/group/reactjs">Google Groups Mailing List</a></li>
                <li className="mb-30"><a href="irc://chat.freenode.net/reactjs">IRC</a></li>  
            </ul>

            <hr/>

            <p className="text-14 italic leading-7 text-gray-400">If you have other helpful links to share, or find any of the links above no longer work, please <a className="remove-margin" href="https://github.com/tastejs/todomvc/issues">let us know</a>.</p>
        </aside>
    );
}