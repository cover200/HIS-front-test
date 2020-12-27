export const responseHandle = async (dispatch, request) => {
  try {
    const res = await request;
    return res;
  } catch (e) {
    errorHandle(dispatch, e);
  }
};

const errorHandle = (dispatch, error) => {
  const { data } = error;
  alert("error");
  throw data;
};
