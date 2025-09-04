const api = "/v1/api";

const API_URL = {
 
  POST: (id: any) => ({
    DELETE: `${api}/media/posts/${id}/delete/`, 
  }),

  POSTS_BY_DATE: (userId: string) =>
    `${api}/media/user/${userId}/posts/date-filtered/`,
};

export default API_URL;