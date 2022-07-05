import { MState } from ".";

export enum ACTION_TYPES {
  ADD_COUNT = "ADD_COUNT", // 增加数量
  REDUCE_COUNT = "REDUCE_COUNT", // 增加数量
  LOADING_START = 'LOADING_START', // 开始loading
  LOADING_END = "LOADING_END", // 结束loading
}

const Action = {
  [ACTION_TYPES.ADD_COUNT]: (state: Partial<MState>, payload: Partial<MState>) => ({
    ...state,
    count: payload.count ?? 0 + (state.count ?? 0),
  }),
  [ACTION_TYPES.REDUCE_COUNT]: (state: Partial<MState>, payload: Partial<MState>) => ({
    ...state,
    count: (state.count ?? 0) - (payload.count ?? 0),
  }),
  [ACTION_TYPES.LOADING_START]: (state: Partial<MState>, payload: Partial<MState>) => ({
    ...state,
    loading: payload.loading
  }),
  [ACTION_TYPES.LOADING_END]: (state: Partial<MState>, payload: Partial<MState>) => ({
    ...state,
    loading: payload.loading
  })
};
export default Action;
