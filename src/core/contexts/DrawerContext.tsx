import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";

type DrawerContextType = {
  isCollapse: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  openDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapse, setIsCollapse] = useState(true);

  const toggleDrawer = useCallback(() => setIsCollapse((prev) => !prev), []);
  const closeDrawer = useCallback(() => setIsCollapse(true), []);
  const openDrawer = useCallback(() => setIsCollapse(false), []);

  return (
    <DrawerContext.Provider
      value={{ isCollapse, toggleDrawer, closeDrawer, openDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
