import { httpClient } from "utils/http-client.util";
import { responseHandle } from "utils/response-handle.util";

const baseUrl =
  process.env.REACT_APP_API_URL || "http://localhost:8080/patient";

export const fetchAllData = ({ sort, pagination, keyword }) => {
  let url = `${baseUrl}?id_like=${keyword}&_sort=${sort.key}&_order=${
    sort.direction
  }&_page=${pagination.page + 1}&_limit=${pagination.perPage}`;

  const request = httpClient.get(url);

  return async (dispatch) => await responseHandle(dispatch, request, true);
};

// export const getDataCount = (keyword) => {
//   const url = `${baseUrl}?id_like=${keyword}`;
//   const request = httpClient.get(url);

//   return async (dispatch) =>
//     await responseHandle(dispatch, request).then((res) => res.data?.length);
// };

export const getAutocompleteIdList = (id) => {
  const url = `${baseUrl}?id_like=${id}`;
  const request = httpClient.get(url);

  return async (dispatch) =>
    await responseHandle(dispatch, request).then((res) => res.data);
};
