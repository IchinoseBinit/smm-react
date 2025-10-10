const api = "/v1/api";

const API_URL = {
  POSTS_BY_DATE: (userId: string) =>
    `${api}/media/user/${userId}/posts/date-filtered/`,
  RETRY_POST: () => `${api}/media/posts/re-try/`,
};

export default API_URL;
