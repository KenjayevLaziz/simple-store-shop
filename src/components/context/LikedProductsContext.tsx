import { createContext, useContext, useState } from 'react';

type LikedProductsContextType = {
  likedIds: number[];
  likeCount: number;
  toggleLike: (id: number) => void;
  removeFromWishlist: (id: number) => void;
};

const LikedProductsContext = createContext<LikedProductsContextType | undefined>(undefined);

export const LikedProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const removeFromWishlist = (id: number) => {
  setLikedIds((prev) => prev.filter((likedId) => likedId !== id));
  };
  const toggleLike = (id: number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const likeCount =likedIds.length;
  return (
    <LikedProductsContext.Provider value={{ likedIds, removeFromWishlist,toggleLike,likeCount}}>
      {children}
    </LikedProductsContext.Provider>
  );
};

export const useLikedProducts = () => {
  const context = useContext(LikedProductsContext);
  if (!context) {
    throw new Error('useLikedProducts must be used within LikedProductsProvider');
  }
  return context;
};
