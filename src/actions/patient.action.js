import { httpClient } from "utils/http-client.util";
import { responseHandle } from "utils/response-handle.util";

const baseUrl =
  process.env.REACT_APP_API_URL || "http://localhost:8080/patient";

export const fetchAllData = ({ sort, pagination, keyword, date }) => {
  let url = `${baseUrl}?id_like=${keyword}&_sort=${sort.key}&_order=${
    sort.direction
  }&_page=${pagination.page + 1}&_limit=${pagination.perPage}`;

  if (date) {
    const isoFormat = date.toISOString();
    url += `&checkIn_lte=${isoFormat}&checkOut_gte=${isoFormat}`;
  }

  const request = httpClient.get(url);

  return async (dispatch) => await responseHandle(dispatch, request, true);
};

export const getAutocompleteIdList = (id, date) => {
  let url = `${baseUrl}?id_like=${id}`;
  if (date) {
    const isoFormat = date.toISOString();
    url += `&checkIn_lte=${isoFormat}&checkOut_gte=${isoFormat}`;
  }
  const request = httpClient.get(url);

  return async (dispatch) =>
    await responseHandle(dispatch, request).then((res) => res.data);
};
