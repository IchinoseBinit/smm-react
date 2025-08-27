const api = "/v1/api";

const API_URL = {
 
  POST: (id: any) => ({
    DELETE: `${api}/media/posts/${id}/unschedule/`, 
  })
};

export default API_URL;