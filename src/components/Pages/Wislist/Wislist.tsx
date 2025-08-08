import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLikedProducts } from "@/components/context/LikedProductsContext"
import { useCart } from "@/components/context/CartContext"
import { type Product } from "@/types/product" 

interface WishlistProps {
  products1: Product[]
}

export default function Wishlist({ products1 }: WishlistProps) {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const { likedIds, removeFromWishlist } = useLikedProducts()

  const likedProducts = products1?.filter((p) => likedIds.includes(p.id))

  return (
    <div className="max-w-[1440px] w-full mx-auto flex flex-col pt-[100px] min-h-[50vh] items-center">
      {likedProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5 gap-6">
          {likedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-transparent border rounded-lg shadow-md flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.title}
                className="object-cover transition-transform duration-300 group-hover:scale-110 w-full h-[320px] mb-4 rounded-md"
              />
              <div className="p-2.5 pt-0">
                <h2
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="px-2 text-black dark:text-white truncate text-lg font-semibold mb-2 cursor-pointer hover:underline"
                >
                  {product.title}
                </h2>
                <p className="px-2 text-gray-600 dark:text-gray-300 mb-4">
                  ${product.price}
                </p>
                <div className="flex justify-between items-center gap-2">
                  <Button
                    onClick={() => addToCart(product)}
                    className="inline-flex items-center cursor-pointer hover:bg-[#2576DF] justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 flex-1 bg-blue-700 text-black dark:hover:bg-primary/90"
                  >
                    Add to Cart <ShoppingCart className="ml-2 text-black" />
                  </Button>
                  <Archive
                    onClick={() => removeFromWishlist(product.id)}
                    className="cursor-pointer dark:text-white text-black"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-black dark:text-white font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Add products to your wishlist to see them here.
          </p>
          <Link to="/">
            <Button className="cursor-pointer text-center mx-auto bg-[#3576DF] hover:bg-blue-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
