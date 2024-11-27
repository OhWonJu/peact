import { useState } from "@/core/useState";

const Counter = () => {
  const [count, setCount] = useState<number>(1);

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMiuns = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div>
      <button onClick={handlePlus}>+</button>
      <span>{count}</span>
      <button onClick={handleMiuns}>-</button>
    </div>
  );
};

export default Counter;
