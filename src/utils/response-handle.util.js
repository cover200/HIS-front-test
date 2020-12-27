export const responseHandle = async (dispatch, request) => {
  try {
    const res = await request;
    return res;
  } catch (e) {
    errorHandle(dispatch, e);
  }
};

const errorHandle = (dispatch, error) => {
  const { statusText, status, data } = error;
  console.error(status);
  console.error(statusText);
  console.error(data);
  throw data;
};
