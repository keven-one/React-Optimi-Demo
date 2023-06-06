/*
 * @Description: Reducer
 * @FilePath: \kitchen-online-web\src\redux\reducer.js
 * @Author: Yongchao Wang
 * @Date: 2021-07-03 17:13:29
 * @LastEditors: Yu Wang
 * @LastEditTime: 2021-08-18 15:57:26
 */
import { useReducer } from 'react';



const obj = {
  size:1
};



function Reducer() {
  const [initState, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'update':
          return {...state,size:action.payload.size+state.size} // 返回新的state
      default:
          return state
  }
  }, obj);
  return { initState, dispatch };
}

export default Reducer;

