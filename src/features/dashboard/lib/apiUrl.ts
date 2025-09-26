const api = "/v1/api";

const status = "posted"

const API_URL = {
  Get_TOTAL_POST: (userId: string) => `${api}/media/user/${userId}/posts/?status=${status}&sort_by=id&page=1&page_size=1&order_by=desc`,
};

export default API_URL;
