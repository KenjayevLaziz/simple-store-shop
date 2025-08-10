import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import SearchFilter from "./components/SearchFilter/SearchFilter"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Wislist from "./components/Pages/Wislist/Wislist"
import Cart from "./components/Pages/ProductItem/Cart"
import Category from "./components/Pages/Category/Category"
import Login from "./components/Pages/Login/Login"
import Register from "./components/Pages/Register/Register"
import { UserProvider } from "./components/context/UserContext"
import ProductInfo from "./components/Pages/ProductItem/ProductInfo"
import { LikedProductsProvider } from "./components/context/LikedProductsContext"
import { SelectedProductProvider } from "./components/context/SelectedProductContext"
import Profile from "./components/Pages/Profile/Profile"
import { CartProvider } from "./components/context/CartContext"
import {type Product } from "./types/product.ts"
export default function App() {
  const [products1, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data)
      })
  }, [])

  return (
    <SelectedProductProvider>
      <CartProvider>
        <UserProvider>
          <LikedProductsProvider>
            <div className="flex flex-col justify-between min-h-screen text-white pt-[90px]">
              <Header products1={ products1 || []} />
              <Routes>
                <Route path="/" element={<SearchFilter products1={products1} />} />
                <Route path="/home" element={<SearchFilter products1={products1} />} />
                <Route path="/wishlist" element={<Wislist products1={products1 || []} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/category" element={<Category />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path={`/product/:id`} element={<ProductInfo products1={products1 || []} />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
            </div>
          </LikedProductsProvider>
        </UserProvider>
      </CartProvider>
    </SelectedProductProvider>
  )
}
