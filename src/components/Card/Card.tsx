import { Heart } from 'lucide-react';
import { useLikedProducts } from '../context/LikedProductsContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {useSelectedProduct } from "../context/SelectedProductContext"
export default function Card({ searchProducts }: { searchProducts: any[] }) {
  const { likedIds, toggleLike } = useLikedProducts();
  const { setSelectedProductId } = useSelectedProduct();
  const navigate=useNavigate()
  const { addToCart } = useCart();
  return (
    <div className="min-h-[50vh] max-w-[1440px] w-full mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {searchProducts ? (
        searchProducts.map((product) => {
          const isLiked = likedIds.includes(product.id);

          return (
            <div
              key={product.id}
              className="bg-transparent border overflow-hidden shadow-md rounded-xl group relative hover:shadow-lg transition-shadow duration-300"
            >
              <div
                onClick={() => toggleLike(product.id)}
                className="absolute right-[25px] cursor-pointer w-[50px] h-[50px] z-10 top-[25px] bg-[#17191d] hover:bg-[#1E293B] rounded-sm flex items-center justify-center visible"
              >
                <Heart
                  className={
                    isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                  }
                />
              </div>

              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover transition-transform duration-300 group-hover:scale-110 w-full h-[320px] bg-white mb-4 rounded-md"
                />
              </div>

             <div className="p-4">
                   <h2 onClick={() => {navigate(`/product/${product.id}`);setSelectedProductId(product.id)}} className="hover:underline cursor-pointer dark:text-white text-black text-lg font-semibold mb-2 truncate w-64">
                    {product.title}
                  </h2>
                  <p className="text-gray-400 mb-2 line-clamp-2 w-64">
                    {product.description}
                  </p>
                  <p className="dark:text-white text-black mb-4">${product.price}</p>
                  <button onClick={() => addToCart(product)}  className="w-full bg-blue-600 dark:text-black text-white py-2 cursor-pointer rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
             </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {searchProducts && searchProducts.length === 0 && (
        <div className="col-span-4 text-center flex flex-col items-center gap-4">
          <h1 className='col-span-4 font-semibold text-2xl text-center text-white'>No products found.</h1>
          <p className='text-muted-foreground'>Try changing your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

