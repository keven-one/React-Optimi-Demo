import React, {useState, useContext} from 'react';

const numCtx = React.createContext<number>(0);
const updateNumCtx = React.createContext<React.Dispatch<number>>(() => {});

// class PureComponent
const Button = React.memo(()=> {
  const updateNum = useContext(updateNumCtx);
  console.log('btn render')
  return (
    <button onClick={() => updateNum(Math.random())}>产生随机数</button>
  )
})


function Show() {
  const num = useContext(numCtx);
  return <p>num is: {num}</p>;
}


const Middle = () => {
  return (
    <>
      <Button/>
      <Show/>
    </>
  )
}

export default function App() {
  const [num, updateNum] = useState(0);

  return (
    <numCtx.Provider value={num}>
      <updateNumCtx.Provider value={updateNum}>
        <Middle/>
      </updateNumCtx.Provider>
    </numCtx.Provider>
  );
}

