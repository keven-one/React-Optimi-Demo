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


// 1.没有性能优化
// export default function App() {
//   const [num, updateNum] = useState(0);

//   return (
//     <>
//       <input value={num} onChange={(e) => updateNum(+e.target.value)} />
//       <p>num is {num}</p>
//       <ExpensiveCpn></ExpensiveCpn>
//     </>
//   );
 
// }

// 2.变与不变分开，不变的命中性能优化
// export default function App() {
  
//   return (
//     <div>
//       <Input />
//       <ExpensiveCpn />
//     </div>
//   );
// }

// 3.父组件有变量
// export default function App() {
//   const [num, updateNum] = useState(0);
//   return (
//     <div title={num + ''}>
//       <input type="text" value={num} onChange={(e)=> updateNum(+e.target.value)}/>
//       <p>num is {num}</p>
//       <ExpensiveCpn></ExpensiveCpn>
//     </div>
//   )
// }

// 4.提取变量
export function InputWrapper({children}:{children:React.ReactNode}) {
  const [num, updateNum] = useState(0);
  return (
    <div title={num + ''}>
      <input type="text" value={num} onChange={(e)=> updateNum(+e.target.value)}/>
      <p>num is {num}</p>
      {children}
    </div>
  )
}
export default function App() {
  return (
    (
      <InputWrapper>
        <ExpensiveCpn></ExpensiveCpn>
      </InputWrapper>
    )

    
  )
}

