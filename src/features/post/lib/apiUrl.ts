const api = "/v1/api";
const region = "NP"

const API_URL = {
  FILES: {
    UPLOAD: `${api}/media/generate-presigned-posts/`,
  },
  POST: {
    CREATE: `${api}/media/posts/`,
  },
  YOUTUBE_CATEGORIES: `${api}/media/youtube/categories/?region=${region}`,
};

export default API_URL;
