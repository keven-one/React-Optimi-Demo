import { createContext, useContext, useReducer } from 'react';

import Action, { ACTION_TYPES } from './action';

/* ---------------------- TS类型定义Start ------------------------------- */


/**
 * @description: 初始状态
 */
export interface MState {
  count: number;
  loading: false;
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
  loading:false
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
 const AppContext = createContext<{
  state: Partial<MState>;
  dispatch: (props: InteriorActions) => void;
}>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

/**
 * reducer实例化
 * @returns
 */
export function AccReducer() {
  const [initState, dispatch] = useReducer(interiorReducer, initialState);
  return { state: initState, dispatch };
}


export const useAccConfig= () => useContext(AppContext)


/**
 * 创建context的provider
 */
export function AccProvider({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = AccReducer();
  const { Provider } = AppContext;
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

/* ---------------------- 代码实现End ------------------------------- */
