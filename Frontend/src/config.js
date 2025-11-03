
const dev = window.location.hostname === "localhost";

export const BASE_URL = dev
  ? "http://localhost:8000"
  : "http://43.204.102.182:8000";
