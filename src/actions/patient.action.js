import { httpClient } from "utils/http-client.util";
import { responseHandle } from "utils/response-handle.util";

const baseUrl =
  process.env.REACT_APP_API_URL || "http://localhost:8080/patient";

export const fetchAllData = (sortOption, pagination) => {
  const url = `${baseUrl}?_sort=${sortOption.key}&_order=${
    sortOption.direction
  }&_page=${pagination.page + 1}&_limit=${pagination.perPage}`;
  const request = httpClient.get(url);

  return async (dispatch) => await responseHandle(dispatch, request);
};

export const getDataCount = () => {
  const url = baseUrl;
  const request = httpClient.get(url);

  return async (dispatch) =>
    await responseHandle(dispatch, request).then((res) => res.data?.length);
};
