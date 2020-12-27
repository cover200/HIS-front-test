import { ACTION_TOGGLE_LOADING } from "actions/app.action";

export const responseHandle = async (dispatch, request) => {
  dispatch(ACTION_TOGGLE_LOADING());
  try {
    const res = await request;
    return res;
  } catch (e) {
    errorHandle(dispatch, e);
  } finally {
    setTimeout(() => dispatch(ACTION_TOGGLE_LOADING()), 500);
  }
};

const errorHandle = (dispatch, error) => {
  const { data } = error;
  alert("error");
  throw data;
};
