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

function App() {
  return (
    <div id="app">
      Hello <Title title="Peact!" />
      <Descrition text="create own React" />
      <>
        <p>fragment</p>
        how can i handle it?
      </>
    </div>
  );
}

export default App;
