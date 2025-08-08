import { Link } from "react-router-dom"
import { Facebook,Instagram, Twitter, Youtube,Phone,Mail,MapPin } from "lucide-react"
export default function Footer() {
    return<>
    <footer className="dark:bg-[#0D1526] bg-muted/40 border-t">
        <hr />
        <div className=" max-w-[1440px] w-full mx-auto dark:text-white text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ">
            <ul>
                <li className="font-bold text-lg mb-4 dark:text-white text-black">Store</li>
                <li className="text-muted-foreground mb-4">Your one-stop shop for all your shopping needs. Quality products, competitive prices, and exceptional service.</li>
                <div className="">
                    <ul className="flex gap-4 mt-4">
                        <li>
                            <Link to="#">
                                <Facebook className="text-muted-foreground hover:text-blue-600" />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <Instagram className="text-muted-foreground hover:text-pink-600" />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <Twitter className="text-muted-foreground hover:text-blue-400" />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <Youtube className="text-muted-foreground hover:text-red-600" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </ul>
            <ul>
                <li className="font-bold text-lg mb-4 dark:text-white text-black">Shop</li>
                <Link to="/">
                    <li className="text-muted-foreground mb-4">All Products</li>
                </Link>
                <Link to="/category">
                    <li className="text-muted-foreground mb-4">Categories</li>
                </Link>
                <Link to="/wislist">
                    <li className="text-muted-foreground mb-4">Wishlist</li>
                </Link>
                <Link to="/cart">
                    <li className="text-muted-foreground mb-4">Cart</li>
                </Link>
            </ul>
            <ul>
                <li className="font-bold text-lg mb-4 dark:text-white text-black">Account</li>
                <Link to="/login">
                    <li className="text-muted-foreground mb-4">Login</li>
                </Link>
                <Link to="/register">
                    <li className="text-muted-foreground mb-4">Register</li>
                </Link>
                <Link to="/login">
                    <li className="text-muted-foreground mb-4">My Account</li>
                </Link>
                <Link to="#">
                    <li className="text-muted-foreground mb-4">Order History</li>
                </Link>
            </ul>
            <ul>
                <li className="font-bold text-lg mb-4 dark:text-white text-black">Contact</li>
                <li className="text-muted-foreground mb-4 flex gap-x-2 select-none"> <MapPin/>123 Shopping Street, Retail City, 10001</li>
                <li className="text-muted-foreground mb-4 flex gap-x-2 select-none"><Phone/> (123) 456-7890</li>
                <li className="text-muted-foreground mb-4 flex gap-x-2 select-none"> <Mail/>  info@store.com</li>
            </ul>
        </div>
    </footer>
    
    </>
}