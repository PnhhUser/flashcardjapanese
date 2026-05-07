import { apiClient } from "../api/client";

export const track = async () => {
  const tracked = sessionStorage.getItem("tracked");

  if (tracked) {
    return;
  }

  try {
    await apiClient.post("/visitors", {
      path: window.location.pathname,
    });

    sessionStorage.setItem("tracked", "true");
  } catch (error) {
    console.error(error);
  }
};
