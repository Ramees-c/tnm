// export const API_URL = 'https://api-tnm.tutor-nearme.com/api'

const API_BASE =
  import.meta.env.MODE === "development"
    ? "/api" // handled by Vite proxy locally
    : "https://api-tnm.tutor-nearme.com/api"; 

export default API_BASE;
export const MEDIA_URL = "https://api-tnm.tutor-nearme.com/";
