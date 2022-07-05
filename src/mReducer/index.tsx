import React, { Dispatch } from 'react';
import { createContext, useContext, useReducer } from 'react';

import Action, { ACTION_TYPES } from './action';

/* ---------------------- TS类型定义Start ------------------------------- */
/**
 * @description: 内部状态
 */
export interface MBottom {
  width: number;
}

/**
 * @description: 初始状态
 */
export interface MState {
  count: number;
  loading: boolean;
  bottom: MBottom;
 
  height1:number,
  height2:number
}

/**
 * @description: reducer的Action类型
 */
interface InteriorActions {
  type: ACTION_TYPES;
  payload: Partial<MState> | Partial<unknown>;
}
/* ---------------------- TS类型定义End ------------------------------- */

/* ---------------------- 代码实现Start ------------------------------- */
/**
 * 初始化state
 */
const initialState: MState = {
  count: 1,
  loading: false, // loading...
  bottom: { width: 100 },
  height1:10,
  height2:20
};

/**
 * reducer定义，action转发
 * @param state 状态
 * @param action action
 * @returns
 */
const interiorReducer = (state: Partial<MState>, action: InteriorActions) => {

  const { type, payload } = action;

  const fn = Action[type];
  if (fn) {
    return fn(state, payload);
  }
  return { ...state };
};

/**
 * 创建context
 */
const AppContext = createContext<Partial<MState>>(initialState);

const AppDispatchContext = createContext<
Dispatch<InteriorActions> 
>(()=>{})
/**
 * reducer实例化
 * @returns
 */
export function MReducer() {
  const [initState, dispatch] = useReducer(interiorReducer, initialState);
  return { state: initState, dispatch };
}



export const useDispatch = ()=>  useContext(AppDispatchContext)
export const useAppContext = ()=> useContext(AppContext)


/**
 * 创建context的provider
 */
export function MProvider({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = MReducer();
  return (<AppContext.Provider value={state}>
    <AppDispatchContext.Provider value={dispatch}>
   {children}
   </AppDispatchContext.Provider>
  </AppContext.Provider>);
}

/* ---------------------- 代码实现End ------------------------------- */

/* ---------------------- 异步actionStart ------------------------------- */
// function isPromise(obj: Partial<MState> | Partial<unknown>) {
//   return !!obj && (typeof obj === 'object' || typeof obj === 'function') && obj instanceof Promise;
// }

// function wrapperDispatch(dispatch: (props: InteriorActions) => void) {
//   return (action: InteriorActions) => {
//     if (isPromise(action.payload)) {
//       dispatch({ type: ACTION_TYPES.LOADING_START, payload: true });
//       (action.payload as any).then((v: Partial<MState> | Partial<unknown>) => {
//         dispatch({ type: action.type, payload: v });
//         dispatch({ type: ACTION_TYPES.LOADING_END, payload: false });
//       });
//     } else {
//       dispatch(action);
//     }
//   };
// }

// export async function asyncFetch(p: Partial<MState>) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(p);
//     }, 1000);
//   });
// }

/* ---------------------- 异步actionEnd ------------------------------- */
