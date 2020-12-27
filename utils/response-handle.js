export const responseHandle = async (dispatch, request) => {
  try {
    const data = await request;
    return data;
  } catch (e) {
    errorHandle(dispatch, e);
  }
};

export const errorHandle = (dispatch, error) => {
  const { statusText, status, data } = error;
  console.error(status);
  console.error(statusText);
  console.error(data);
  throw data;
};
