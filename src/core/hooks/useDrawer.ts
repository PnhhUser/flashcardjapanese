import { useState, useEffect } from "react";

export const useDrawer = (key: string = "drawer-collapsed") => {
  const [isCollapse, setIsCollapse] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : true;
    }
    return false;
  });

  const toggleDrawer = () => setIsCollapse((prev) => !prev);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(isCollapse));
  }, [isCollapse, key]);

  return { isCollapse, toggleDrawer, setIsCollapse };
};
