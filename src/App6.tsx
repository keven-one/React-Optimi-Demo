import React, { useCallback, useMemo } from "react";
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
// callback优化
const BottomInput = ()=>{
  const state  = useAppContext();
  const dispatch = useDispatch()
const change = useCallback((e:any)=>dispatch({type:ACTION_TYPES.HEIGHT1,payload:{height1:e.target.value}}),[dispatch]);
// const change = (e:any)=>dispatch({type:ACTION_TYPES.HEIGHT1,payload:{height1:e.target.value}});

if (window.changeTest) {
  console.log('usecallback',window.changeTest === change);
  
}else{
  window.changeTest = change
}
return  useMemo(()=>{
  console.log('BottomInput 优化');

  return (
    <div> 
        <span>bottom:</span> 
    <CusInput  value={state.height1} onChange={change} />
    </div>
    )
},[change,state.height1])
}



const TopInput = ()=>{
  const state  = useAppContext();
  const dispatch = useDispatch()
  console.log('TopInput');

  return <TopInputMemo height2={state.height2} dispatch={dispatch}></TopInputMemo>
}

const TopInputMemo =  React.memo((props:{height2:any,dispatch:any})=>{
  console.log('TopInputMemo');

  return (
    <div>     
      <span>top:</span> 
      <CusInput  value={props.height2} onChange={(e:any)=>props.dispatch({type:ACTION_TYPES.HEIGHT2,payload:{height2:e.target.value}})} />
    </div>

  ) 
})

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
