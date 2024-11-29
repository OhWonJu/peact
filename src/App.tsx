import { ChangeEvent } from "react";
import Counter from "./components/Counter";
import { SyntheticOnChangeEvent } from "./core/eventDispather";
import { useState } from "./core/useState";

const Descrition = ({ text }: { text: string }) => {
  return (
    <div>
      this is
      <span> {text}</span>
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return <h1>{title}</h1>;
};

const Frag = () => {
  return (
    <>
      <p>fragment</p>
      how can i handle it?
    </>
  );
};

function App() {
  const [text, setText] = useState("");

  const inputHandler = (e: any) => {
    console.log(e);
    setText(e.value);
  };

  return (
    <div id="app">
      Hello <Title title="Peact!" />
      <Descrition text="create own React" />
      <Frag />
      <Counter />
      <Counter />
      <input onChange={inputHandler} />
      <span>{text}</span>
    </div>
  );
}

export default App;
