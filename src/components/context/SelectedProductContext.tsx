import { createContext, useContext, useState, type ReactNode } from "react";

type SelectedProductContextType = {
  selectedProductId: number | null;
  setSelectedProductId: (id: number | null) => void;
};

const SelectedProductContext = createContext<SelectedProductContextType | undefined>(undefined);

export const SelectedProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  return (
    <SelectedProductContext.Provider value={{ selectedProductId, setSelectedProductId }}>
      {children}
    </SelectedProductContext.Provider>
  );
};

export const useSelectedProduct = () => {
  const context = useContext(SelectedProductContext);
  if (!context) {
    throw new Error("useSelectedProduct must be used within SelectedProductProvider");
  }
  return context;
};
