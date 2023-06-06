import React, {useState, useContext, ReactNode} from 'react';

const numCtx = React.createContext<number>(0);
const updateNumCtx = React.createContext<React.Dispatch<number>>(() => {});

const Button = ()=> {
  const updateNum = useContext(updateNumCtx);
  console.log('btn render')
  return (
<>
<button onClick={() => updateNum(Math.random())}>产生随机数</button>
<button onClick={() => updateNum(Math.random())}>产生随机数</button>
<button onClick={() => updateNum(Math.random())}>产生随机数</button>
<button onClick={() => updateNum(Math.random())}>产生随机数</button>
</>    
  )
}




function ShowWarpper({childEl}:{childEl:(num:number)=>JSX.Element}) {
  const num = useContext(numCtx);
  return <div>
    {childEl(num)}
  </div>;
}

function ToastDialog({num}:{num:number}) {
  return <p>{num}</p>;
}


// 1.变与不变分离
// const Middle = () => {
//   const num = useContext(numCtx);

//   return (
//     <>
//       <Button/>
//       <div>
//       <p>{num}</p>
//   </div>
//     </>
//   )
// }

// 2.变与不变分离
// const Middle = () => {
//   console.log('Middle')
//   return (
//     <>
//       <Button/>
//       <ShowWarpper childEl={(num:number)=>(<ToastDialog num={num}/>)}/>
//     </>
//   )
// }

// 3.purecomponent
const Middle = React.memo(() => {
  console.log('Middle')
  return (
    <>
      <Button/>
      <ShowWarpper childEl={(num:number)=>(<ToastDialog num={num}/>)}/>
    </>
  )
})

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

