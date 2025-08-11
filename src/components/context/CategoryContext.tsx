import { createContext, useContext, useState, type ReactNode } from "react";

interface CategoryContextType {
  categoryName: string;
  setCategoryName: (name: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categoryName, setCategoryName] = useState("");

  return (
    <CategoryContext.Provider value={{ categoryName, setCategoryName }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategory must be used within CategoryProvider");
  return context;
};
