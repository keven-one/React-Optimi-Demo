import React, { createContext, useCallback, useContext, useMemo } from "react";
import { MProvider, useDispatch, useAppContext } from "./mReducer";
import { ACTION_TYPES } from "./mReducer/action";
import Reducer from './reducer/reducer';

function Button() {
  const dispatch = useDispatch()
  console.log("btn render");
  return (
    <button
      onClick={()=> dispatch({ type: ACTION_TYPES.ADD_COUNT, payload: { count: 1 } })}
    >
      产生随机数
    </button>
  );
}



function Show() {
  const state  = useAppContext();

  return <p>num is: {state.count}</p>;
}

const Size = () => {

  return (
    <>
      <Button />
      <Show />
    </>
  );
};

export default  function App(){
  return (
    
    <MProvider>
        <Size />
    </MProvider>
  );
};

/* -------------未优化------------ */

export const AppContext = createContext<{initState:any,dispatch:any}>({
  initState: {},
  dispatch: () => {},
});

function Store({ children }: { children: React.ReactNode }) {
  const { initState, dispatch } = Reducer();
  const contextValue = useMemo(() => ({ initState, dispatch }), [initState, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// export default function App() {
//   return (
//     (<Store>
//       <Size1 />
//       </Store>)
//   )
// }

const Size1 =() => {  
  return (
    <>
      <Button1 />
      <Show1 />
    </>
  );
};  

const Button1 = ()=> {
  const {  dispatch } = useContext(AppContext);
 
  
  return (
    <button
    onClick={()=> dispatch({ type: "update", payload: { size: 1 } })}
  >
    产生随机数
  </button>
  );
}
// 优化版本
// const Button1 = ()=> {
//   const {  dispatch } = useContext(AppContext);
//   const btn = useMemo(()=>{
//     console.log("btn render");

//     return (
//       <button
//         onClick={()=> dispatch({ type: "update", payload: { size: 1 } })}
//       >
//         产生随机数
//       </button>
//     )
//   },[dispatch])
  
//   return (
//    <>
//    {btn}
//    </>
//   );
// }



function Show1() {
  const { initState } = useContext(AppContext);
  return <p>num is: {initState.size}</p>;
}