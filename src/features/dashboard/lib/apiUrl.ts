const api = "/v1/api";

const status = "posted"

const API_URL = {
  Get_TOTAL_POST: (userId: string) => `${api}/media/user/${userId}/posts/?status=${status}&sort_by=id&page=1&page_size=1&order_by=desc`,
MEDIA_SUMMARY:()=>`${api}/media/summary/`,
};

export default API_URL;
