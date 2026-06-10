
const dev = window.location.hostname === "localhost";

export const BASE_URL = dev
  ? "http://localhost:8000"
  : "https://webtinder-backend.onrender.com";
