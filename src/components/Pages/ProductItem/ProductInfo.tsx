import { Link, useParams } from "react-router-dom"
import { Heart, Star } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { useLikedProducts } from "../../context/LikedProductsContext"
import type { Product } from "../../../types/product"
import { useState } from "react"
interface ProductInfoProps {
  products1: Product[];
}

export default function ProductInfo({ products1 }: ProductInfoProps) {
  const { likedIds, toggleLike } = useLikedProducts()
  const {  addToCart } = useCart()
  const { id } = useParams()
  const product = products1?.find((item) => item?.id === Number(id))
  if (!product) {
    return (
      <div className="text-black dark:text-white  container mx-auto px-4 py-8">
        <p>Loading product.....</p>
      </div>
    )
  }

  const isLiked = likedIds.includes(product.id)
  const [inc,setInc]=useState(1)
   function increment() {
   setInc(prev => prev + 1)  }
    function decrement() {
   setInc(prev => prev>1 ? prev-1 : 1)  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px] w-full">
      <Link
        to="/"
        className="text-black dark:text-white  text-sm hover:underline inline-flex items-center mb-8"
      >
        Back to Products
      </Link>
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-square">
          <img src={product.image} alt={product.title} />
        </div>
        <div>
          <p className="text-black dark:text-white  inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-2">
            {product.category}
          </p>
          <h1 className="text-black dark:text-white text-2xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < Math.round(product.rating.rate)
                    ? "text-yellow-500 fill-[yellow]"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              {product.rating.rate}
            </span>
            <span className="text-sm text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>
          <p className="text-black dark:text-white text-xl font-semibold mb-4">$ {product.price}</p>
          <div>
            <p className="text-muted-foreground mb-3">{product.description}</p>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className=" text-black dark:text-white font-medium text-2xl">Quantity</h2>
            <div className="flex items-center">
              <button
                onClick={() => {
                  decrement()
                }}
                className="px-4 py-1 text-2xl text-white bg-transparent border hover:bg-[#1E293B] rounded-md"
              >
                -
              </button>
              <span className="px-4 py-1 text-2xl font-medium w-[55px]">
                {inc}
              </span>
              <button
                onClick={() => {
                  increment()
                }}
                className="px-4 py-1 text-2xl text-white bg-transparent border hover:bg-[#1E293B] rounded-md"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                for (let i=0;i<inc;i++){
                  addToCart(product)
                }
              }}
              className="cursor-pointer w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <div
              onClick={() => {
                toggleLike(product.id)
              }}
              className="border w-10 h-10 flex items-center justify-center bg-transparent rounded-md cursor-pointer dark:hover:bg-[#1E293B] hover:bg-gray-300"
            >
              <Heart
                className={
                  isLiked ? "fill-red-500 text-red-500" : "text-black dark:text-white "
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
