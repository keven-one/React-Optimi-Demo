import React, { useMemo } from "react";
import { MProvider, useDispatch, useAppContext } from "./mReducer";
import { ACTION_TYPES } from "./mReducer/action";

function Button() {
  const dispatch = useDispatch()
  console.log("btn render");
  return (
    <button
      onClick={()=> dispatch({ type: ACTION_TYPES.ADD_COUNT, payload: { count: 1 } })}
    >
      切换柜型
    </button>
  );
}



function Show() {
  console.log('show');
  
  const state  = useAppContext();

  return <p>num is: {state.count}</p>;
}

const Size =() => {
  console.log('size');

 
  return (
    <>
      <BottomInput></BottomInput>
      <Button />
      <Show />
      <TopInput />

    </>
  );
};


// 优化 CusInput渲染一次

const BottomInput = ()=>{
  const state  = useAppContext();
  const dispatch = useDispatch()
return  useMemo(()=>{
  console.log('BottomInput 优化');

  return (
    <CusInput  value={state.height1} onChange={(e:any)=>dispatch({type:ACTION_TYPES.HEIGHT1,payload:{height1:e.target.value}})} />
    )
},[dispatch, state.height1])
}

// React.memo(({})=>{

// })

// 未优化 CusInput渲染两次

// const BottomInput = ()=>{
//   const state  = useAppContext();
//   const dispatch = useDispatch()
//   console.log('BottomInput 未优化');

//   return (
//     <div>
//       <span>bottom:</span> 
//       <CusInput  value={state.height1} onChange={(e:any)=>dispatch({type:ACTION_TYPES.HEIGHT1,payload:{height1:e.target.value}})} />
//     </div>

//   )
// }

const TopInput = ()=>{
  const state  = useAppContext();
  const dispatch = useDispatch()
  console.log('TopInput');

  return (
    <div> 
            <span>top:</span> 

    <CusInput  value={state.height2} onChange={(e:any)=>dispatch({type:ACTION_TYPES.HEIGHT2,payload:{height2:e.target.value}})} />
    </div>

  )
}

// 自定义组件
const CusInput =({value,onChange}:{value:any,onChange:any})=>{
  console.log('CusInput');

  return (
    <input type="text" value={value} onChange={onChange} />
  )
}

export default  function App(){
  return (
    <MProvider>
      {/* <AccProvider> */}
        <Size />
      {/* </AccProvider> */}
    </MProvider>
  );
};
