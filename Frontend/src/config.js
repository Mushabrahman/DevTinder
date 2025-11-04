
const dev = window.location.hostname === "localhost";

export const BASE_URL = dev
  ? "http://localhost:8000"
  : "https://13.204.82.69:8000";
