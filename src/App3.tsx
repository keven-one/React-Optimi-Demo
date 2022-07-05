import React from "react";
import { MProvider, useDispatch, useAppContext } from "./mReducer";
import { ACTION_TYPES } from "./mReducer/action";

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
      {/* <AccProvider> */}
        <Size />
      {/* </AccProvider> */}
    </MProvider>
  );
};
