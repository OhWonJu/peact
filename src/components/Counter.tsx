import { useState } from "@/core/peact";
import { SyntheticMouseEvent } from "@/core/eventDispather";

const Counter = () => {
  const [count, setCount] = useState<number>(1);


  const handlePlus = (e: SyntheticMouseEvent) => {
    console.log(e);
    e.stopPropagation();
    setCount(count + 1);
  };

  const handleMiuns = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div>
      <button onClick={(e) => handlePlus(e)}>+</button>
      <span>{count}</span>
      <button onClick={handleMiuns}>-</button>
    </div>
  );
};

export default Counter;
