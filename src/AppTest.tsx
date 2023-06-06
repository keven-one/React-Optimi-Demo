import React, { useState } from "react";


export default function App() {
  const [num, updateNum] = useState(0);
  // 希望button 和 静态组件不更新
  return (
    <div>
      <>
      <button onClick={() => updateNum(Math.random())}>产生随机数</button>
      <p>num is {num}</p>
      </>
      <p>静态组件</p>
    </div>
  );
}
