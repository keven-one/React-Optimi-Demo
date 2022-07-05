import { MState } from ".";

export enum ACTION_TYPES {
  ADD_COUNT = "ADD_COUNT", // 增加数量
  REDUCE_COUNT = "REDUCE_COUNT", // 增加数量
  LOADING_START = 'LOADING_START', // 开始loading
  LOADING_END = "LOADING_END", // 结束loading
  HEIGHT1 = "HEIGHT1",
  HEIGHT2 = "HEIGHT2"
}

const Action = {
  [ACTION_TYPES.ADD_COUNT]: (state: Partial<MState>, payload: Partial<MState>) => {
    return ({
      ...state,
      count:( payload.count ?? 0) + (state.count ?? 0),
    })
  },
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
  }),
  [ACTION_TYPES.HEIGHT1]: (state: Partial<MState>, payload: Partial<MState>) => ({
    ...state,
    height1: payload.height1
  }),
  [ACTION_TYPES.HEIGHT2]: (state: Partial<MState>, payload: Partial<MState>) => ({
    ...state,
    height2: payload.height2
  })
};
export default Action;
