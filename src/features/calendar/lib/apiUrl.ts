const api = "/v1/api";

const API_URL = {
  POSTS_BY_DATE: (userId: number) =>
    `${api}/media/user/${userId}/posts/date-filtered/`,
};

export default API_URL;
