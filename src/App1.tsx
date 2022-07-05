import React, { useState } from "react";

function Input() {
  const [num, updateNum] = useState(0);

  return (
    <>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
    </>
  );
}

function ExpensiveGrandChild() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的孙组件 render");
  return <p>耗时的组件</p>;
}

function ExpensiveChild() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的子组件 render");
  return <ExpensiveGrandChild />;
}

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的组件 render");
  return <ExpensiveChild />;
}

// 变与不变分开，不变的命中性能优化
// export default function App() {
  
//   return (
//     <div>
//       <Input />
//       <ExpensiveCpn />
//     </div>
//   );
// }

// 模拟父组件有state
export default function App() {
  
  return (
    <div>
      <Input />
      <ExpensiveCpn />
    </div>
  );
}
