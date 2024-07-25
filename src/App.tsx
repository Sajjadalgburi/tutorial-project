import MouseTracker from "./components/MouseTracker";

const App = () => {
  return (
    <MouseTracker>
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center capitalize text-5xl font-extrabold bg-slate-500 p-10">
          Hey There! Hover over me for a cool effect...
        </div>
      </div>
    </MouseTracker>
  );
};

export default App;
