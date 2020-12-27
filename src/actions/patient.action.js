import { httpClient } from "utils/http-client.util";
import { responseHandle } from "utils/response-handle.util";

const baseUrl =
  process.env.REACT_APP_API_URL || "http://localhost:8080/patient";

export const fetchAllData = (sortOption) => {
  const url = `${baseUrl}?_sort=${sortOption.key}&_order=${sortOption.direction}`;
  const request = httpClient.get(url);

  return async (dispatch) => await responseHandle(dispatch, request);
};
