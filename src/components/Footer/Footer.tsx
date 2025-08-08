import { Link } from "react-router-dom"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: <Facebook />, color: "hover:text-blue-600" },
    { icon: <Instagram />, color: "hover:text-pink-600" },
    { icon: <Twitter />, color: "hover:text-blue-400" },
    { icon: <Youtube />, color: "hover:text-red-600" },
  ]

  const shopLinks = [
    { name: "All Products", path: "/" },
    { name: "Categories", path: "/category" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Cart", path: "/cart" },
  ]

  const accountLinks = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
    { name: "My Account", path: "/login" },
    { name: "Order History", path: "#" },
  ]

  return (
    <footer className="dark:bg-[#0D1526] bg-muted/40 border-t">
      <div className="max-w-[1440px] w-full mx-auto dark:text-white text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <ul>
          <li className="font-bold text-lg mb-4">Store</li>
          <li className="text-muted-foreground mb-4">
            Your one-stop shop for all your shopping needs. Quality products,
            competitive prices, and exceptional service.
          </li>
          <ul className="flex gap-4 mt-4">
            {socialLinks.map((item, idx) => (
              <li key={idx}>
                <Link
                  to="#"
                  className={`text-muted-foreground transition-colors ${item.color}`}
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </ul>

        <ul>
          <li className="font-bold text-lg mb-4">Shop</li>
          {shopLinks.map((link, idx) => (
            <li key={idx} className="text-muted-foreground mb-4">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <ul>
          <li className="font-bold text-lg mb-4">Account</li>
          {accountLinks.map((link, idx) => (
            <li key={idx} className="text-muted-foreground mb-4">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <ul>
          <li className="font-bold text-lg mb-4">Contact</li>
          <li className="text-muted-foreground mb-4 flex gap-x-2 select-none">
            <MapPin /> 123 Shopping Street, Retail City, 10001
          </li>
          <li className="text-muted-foreground mb-4 flex gap-x-2 select-none">
            <Phone /> (123) 456-7890
          </li>
          <li className="text-muted-foreground mb-4 flex gap-x-2 select-none">
            <Mail /> info@store.com
          </li>
        </ul>
      </div>
    </footer>
  )
}
