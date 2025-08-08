import { useEffect } from "react"
import { useState } from "react";
import { Link,useParams } from "react-router-dom";
import { Heart,Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import {useLikedProducts} from "../../context/LikedProductsContext"
export default function ProductInfo() {
    const { likedIds,toggleLike } = useLikedProducts()
    const {
    increaseQuantity,
    decreaseQuantity,
    cartItems,
    addToCart,
  } = useCart();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    //  const { selectedProductId } = useSelectedProduct();
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  const isLiked = likedIds.includes(product?.id);
    return <>
        <div className="container mx-auto px-4 py-8 max-w-[1440px] w-full">
            <Link to="/" className="text-sm hover:underline inline-flex items-center mb-8">Back to Products</Link>
            <div className="grid md:grid-cols-2">
                <div className="relative aspect-square">
                    <img src={product?.image} alt={product?.title} />
                </div>
                <div className="">
                    <p className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mb-2">{product?.category}</p>
                    <h1 className="text-2xl font-bold mb-2">{product?.title}</h1>
                    <div className="flex items-center gap-1 mb-4">
                        {
                            Array.from({ length: 5 }, (_, index) => (
                                <Star
                                    key={index}
                                    className={`w-4 h-4 ${index < Math.round(product?.rating?.rate) ? 'text-yellow-500 fill-[yellow]' : 'text-gray-300'}`}
                                />
                            ))
                            }
                        <span className="text-sm text-gray-500 ml-2">{product?.rating?.rate} </span>
                        <span className="text-sm text-gray-500">({product?.rating?.count} reviews)</span>
                    </div>
                    <p className="text-xl font-semibold mb-4">$ {product?.price}</p>
                    <div className="">
                        <div className=" inline-flex h-10 items-center justify-center rounded-md bg-[#1E293B] p-1 text-muted-foreground mb-3">
                            <button className="cursor-pointer bg-[#020817] inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Description</button>
                            <button className="cursor-pointer  inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Details</button>
                            <button className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Shipping</button>
                        </div>
                        <p className="text-muted-foreground mb-3">{product?.description}</p>
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="font-medium text-2xl">Quantity</h2>
                        <div className="flex items-center">
                            <button onClick={()=>{decreaseQuantity(product?.id)}} className="cursor-pointer text-center px-4 py-1 text-2xl text-white font-medium rounded-md  bg-transparent border hover:bg-[#1E293B] ">-</button>
                            <span className="px-4 py-1 text-2xl font-medium w-[55px]">1</span>
                            <button onClick={()=>{increaseQuantity(product?.id)}} className="cursor-pointer px-4 py-1 text-2xl text-white font-medium rounded-md  bg-transparent border hover:bg-[#1E293B]">+</button>
                        </div>
                </div>
                <div className=" flex items-center gap-4">
                    <button onClick={()=>{addToCart(product?.id)}} className="cursor-pointer w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Add to Cart</button>
                    <div onClick={()=>{toggleLike(product?.id)}} className="border w-10 h-10 flex items-center justify-center bg-transparent rounded-md cursor-pointer dark:hover:bg-[#1E293B] hover:bg-gray-300">
                        <Heart
                            className={
                            isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                            }
                            />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
}