import React, { ReactNode, useMemo } from "react";
import { MProvider, useDispatch, useAppContext } from "./mReducer";
import { ACTION_TYPES } from "./mReducer/action";

const Button = React.memo((props: any)=> {
  const {click} = props
  console.log("btn render");
  return (
    <button
      onClick={click}
    >
      产生随机数
    </button>
  );
})



function Show(state:any) {

  return <p>num is: {state.count}</p>;
}

const Size = () => {
 
  const dispatch = useDispatch()
console.log('Button');

  return (
   <SizeWarper>
      <Button click={()=>dispatch({ type: ACTION_TYPES.ADD_COUNT, payload: { count: 1 } })}/>
   </SizeWarper>
  );
};

const SizeWarper = ({children}:{children:ReactNode})=>{
  const state  = useAppContext();

  return (
    <div>
      {state.count}
      {children}
      <Show count={state.count}/>

    </div>
  );
}

const SizeOld = ()=>{
  const state  = useAppContext();
  const dispatch = useDispatch()

  return (
    <div>
      {state.count}
      <Button click={()=>dispatch({ type: ACTION_TYPES.ADD_COUNT, payload: { count: 1 } })}/>

      <Show count={state.count}/>

    </div>
  );
}

export default  function App(){
  return (
    <MProvider>
        <SizeOld />
    </MProvider>
  );
};
