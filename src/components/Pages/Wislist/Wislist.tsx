import {Link,useNavigate} from "react-router-dom"
import {ShoppingCart,Archive} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLikedProducts } from "@/components/context/LikedProductsContext";
import { useCart } from '../../context/CartContext';
export default function Wislist({ products1 }: { products1: any[] }) {
     const { addToCart } = useCart();
    const navigite=useNavigate()
    const { likedIds, removeFromWishlist} = useLikedProducts();
    const likedProducts = products1?.filter((p) => likedIds.includes(p.id));
    return <>
        <div className="max-w-[1440px] w-full mx-auto flex flex-col pt-[100px] min-h-[50vh] items-center">
            {
                likedProducts?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5 gap-6">
                        {likedProducts.map((product) => (
                            <div key={product.id} className="bg-white dark:bg-transparent border rounded-lg shadow-md flex flex-col justify-between">
                                <img src={product.image} alt={product.title} className="object-cover  transition-transform duration-300 group-hover:scale-110 w-full h-[320px] mb-4 rounded-md" />
                                <div className="p-2.5 pt-0">
                                    <h2 onClick={()=>{}} className=" px-2 truncate text-lg font-semibold mb-2">{product.title}</h2>
                                    <p className=" px-2 text-gray-600 line-clamp-2 dark:text-gray-300 mb-4">${product.price}</p>
                                    <div className="flex justify-between items-center gap-2">
                                    <Button  onClick={()=>{addToCart(product)}} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-black hover:bg-primary/90 h-10 px-4 py-2 flex-1 bg-[#2576DF]">
                                        Add to Cart <ShoppingCart className="ml-2 text-black" />
                                    </Button>
                                    <div>
                                        <Archive onClick={()=>{removeFromWishlist(product?.id)}} className="cursor-pointer"/>
                                    </div>

                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Add products to your wishlist to see them here.</p>
                        <Link to="/">
                        <Button className="cursor-pointer text-center mx-auto bg-[#3576DF]">
                            Contuine shopping
                        </Button>
                    </Link>
                    </div>
                )
            }
        </div>
    </>
}