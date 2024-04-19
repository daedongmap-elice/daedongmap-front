import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <details className="dropdown">
        <summary className="m-1 btn">open or close</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <div>Item 1</div>
          </li>
          <li>
            <div>Item 2</div>
          </li>
        </ul>
      </details>
    </>
  );
}

export default App;
