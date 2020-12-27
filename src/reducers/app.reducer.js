import { APP_CASE } from "global/constants/reducer.const";

const initialState = {
  loading: false,
};

const AppReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_CASE.TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

export default AppReducer;
