import { Moon, Sun, Heart, ShoppingCart, LogInIcon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useLikedProducts } from "../context/LikedProductsContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip"
interface User {
  name: string;
  [key: string]: unknown;
}
type CartItem = {
  product: Product;
  quantity: number;
};
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};
interface HeaderProps {
  products1: Product[];
}

export default function Header({ products1 }: HeaderProps) {
  const { setUser, user } = useUser() as {
    setUser: (user: User | null) => void;
    user: User | null;
  };

  const { likeCount,likedIds } = useLikedProducts() as { likeCount: number;likedIds:number[]; };

  const likedProducts = products1?.filter((p) => likedIds.includes(p.id))

    const { totalItems, cartItems } = useCart() as { totalItems: number; cartItems: CartItem[] };
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("system");

  const getSystemTheme = (): "dark" | "light" =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const applyTheme = (mode: string) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (mode === "system") {
      const systemTheme = getSystemTheme();
      root.classList.add(systemTheme);
    } else {
      root.classList.add(mode);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    if (savedTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, []);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    applyTheme(selectedTheme);
    setIsActive(false);
  };

  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const toggleMenu1 = () => {
    setUser(null);
    setOpenUserMenu(false);
    navigate("/login");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  console.log(cartItems)
  return (
    <div className="dark:bg-[#020817] bg-white text-white w-full fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-700 ">
      <header className="text-white p-4 flex w-full max-w-[1440px] justify-between items-center mx-auto z-50">
        <nav className="hidden md:flex max-w-[450px] w-full justify-between">
          <ul className="dark:text-white text-black flex items-center justify-between max-w-[300px] w-full">
            <Link to="/">
              <strong className="font-bold text-xl cursor-pointer">Store</strong>
            </Link>
            <Link to="/">
              <li className="text-sm font-medium hover:underline capitalize cursor-pointer">
                home
              </li>
            </Link>
            <Link to="/">
              <li className="text-sm font-medium hover:underline capitalize cursor-pointer">
                products
              </li>
            </Link>
            <Link to="/category">
              <li className="text-sm font-medium hover:underline capitalize cursor-pointer">
                categories
              </li>
            </Link>
          </ul>
        </nav>

        <div className="md:hidden flex items-center justify-between w-full">
          <strong className="font-bold text-xl text-black dark:text-white mb-4 cursor-pointer">Store</strong>
          <button onClick={toggleSidebar} aria-label="Toggle Menu" className="text-black dark:text-white">
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          
        </div>
        <div className="hidden md:flex max-w-[400px] w-full justify-end">
          <ul className="flex items-center gap-4 max-w-[300px] w-full justify-between">
            <div
              onClick={() => setIsActive(!isActive)}
              className="relative cursor-pointer w-[110px] h-[45px] dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] rounded-sm flex items-center justify-center "
            >
              {theme === "dark" ? (
                <Moon className="text-white" />
              ) : theme === "light" ? (
                <Sun className="text-black" />
              ) : (
                <Sun className="text-black dark:text-white" />
              )}
              <div
                className={
                  isActive
                    ? "w-[110px] absolute left-[-70px] top-[50px] dark:bg-[#1e3150]  dark:text-white text-black rounded-md p-2 flex flex-col gap-2 z-50 bg-[#f1ecec]"
                    : "hidden"
                }
              >
                <p
                  className="cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] px-[5px] rounded-[5px]"
                  onClick={() => handleThemeChange("light")}
                >
                  Light
                </p>
                <p
                  className="cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] px-[5px] rounded-[5px]"
                  onClick={() => handleThemeChange("dark")}
                >
                  Dark
                </p>
                <p
                  className="cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] px-[5px] rounded-[5px]"
                  onClick={() => handleThemeChange("system")}
                >
                  System
                </p>
              </div>
            </div>


              <Tooltip>

                <TooltipTrigger>

                <Link to="/wishlist">
                  <div className="relative cursor-pointer w-[45px] h-[45px] dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] rounded-sm flex items-center justify-center">
                    <Heart className="dark:hover:bg-[#1E293B] dark:text-white text-black" />
                    {likeCount > 0 && (
                      <div className="absolute bg-[#3576DF] right-0 rounded-full text-[14px] w-5 h-5 top-0 flex justify-center items-center">
                        {likeCount}
                      </div>
                    )}
                  </div>
                </Link>
                </TooltipTrigger>
                  <TooltipContent className="dark:bg-[#020817] bg-white relative top-3 w-[250px] dark:text-white text-black">
                    <div className="">
                      <p className="font-medium mb-2">Wishlis(<span>{likeCount}</span>)</p>
                      {likeCount?
                      <> {likeCount < 4
                          ? likedProducts.map((item: Product) => (
                              <div key={item.id} className="flex gap-3">
                                <img className="w-10 h-12 mb-1" src={item.image} alt={item.title} />
                                <div className="w-[180px] flex flex-col justify-center">
                                  <p className="truncate">{item.title}</p>
                                  <p>${item.price}</p>
                                </div>
                              </div>
                            ))
                          : (
                              <>
                                {likedProducts.slice(0, 3).map((item: Product) => (
                                  <div key={item.id} className="flex gap-3 ">
                                    <img className="w-10 h-12 mb-1" src={item.image} alt={item.title} />
                                    <div className="w-[180px] flex flex-col justify-center">
                                      <p className="text-xs font-medium truncate">{item.title}</p>
                                      <p className="text-xs text-muted-foreground">${item.price}</p>
                                    </div>
                                  </div>
                                ))}
                                <p className="text-center text-muted-foreground">+{likeCount - 3} more items</p>
                              </>
                            )
                        }
                      </> 
                      : <p className="text-sm text-muted-foreground">Your wishlist is empty</p>}
                      <Link to={"/wishlist"}>
                        <Button className="cursor-pointer bg-[#3576DF] hover:bg-[#1668eb] inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground  h-9 rounded-md px-3 w-full mt-2">
                      View Wishlist
                      </Button>
                      </Link>
                    </div>
                  </TooltipContent>
              </Tooltip>

              <Tooltip>

                <TooltipTrigger>

                    <Link to="/cart">
                  <div className="relative cursor-pointer w-[45px] h-[45px] dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] rounded-sm flex items-center justify-center">
                    <ShoppingCart className="dark:hover:bg-[#1E293B] dark:text-white text-black" />
                    {totalItems > 0 && (
                      <div className="absolute bg-[#3576DF] right-0 rounded-full text-[14px] w-5 h-5 top-0 flex justify-center items-center">
                        {totalItems}
                      </div>
                    )}
                  </div>
                </Link>
                </TooltipTrigger>
                  <TooltipContent className="dark:bg-[#020817] bg-white relative top-3 w-[250px] dark:text-white text-black">
                    <div className="">
                      <p className="font-medium mb-2">Cart(<span>{totalItems}</span>)</p>
                      {totalItems ? 
                        <>{cartItems.length < 4
                          ? cartItems.map((item: CartItem) => (
                              <div key={item.product.id} className="flex gap-3">
                                <img className="w-10 h-12 mb-1" src={item.product.image} alt={item.product.title} />
                                <div className="w-[180px] flex flex-col justify-center">
                                  <p className=" text-xs font-medium truncate">{item.product.title}</p>
                                  <p className="text-xs text-muted-foreground">${item.product.price}  ×  {item.quantity}</p>
                                </div>
                              </div>
                            ))
                          : (
                              <>
                                {cartItems.slice(0, 3).map((item: CartItem) => (
                                  <div key={item.product.id} className="flex gap-3 ">
                                    <img className="w-10 h-12 mb-1" src={item.product.image} alt={item.product.title} />
                                    <div className="w-[180px] flex flex-col justify-center">
                                      <p className="text-xs font-medium truncate">{item.product.title}</p>
                                      <p className="text-xs text-muted-foreground">${item.product.price}  × {item.quantity}</p>
                                    </div>
                                  </div>
                                ))}
                                <p className="text-center text-muted-foreground">+{totalItems-3} more items</p>
                              </>
                            )
                        }
                        
                       </> 
                      : <p className="text-sm text-muted-foreground">Your wishlist is empty</p>}
                      <Link to={"/cart"}>
                        <Button className="cursor-pointer bg-[#3576DF] hover:bg-[#1668eb] inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground  h-9 rounded-md px-3 w-full mt-2">
                      View Cart
                      </Button>
                      </Link>
                    </div>
                  </TooltipContent>
              </Tooltip>
              
            
            {user ? (
              <div className="relative w-full">
                <Button
                  onClick={toggleMenu}
                  className="rounded-full   w-[50px] h-[50px] flex justify-center items-center bg-[yellow] hover:bg-[#F1F5F9] cursor-pointer text-black"
                >
                  <span className="text-black uppercase">{user.name}</span>
                </Button>
                {openUserMenu && (
                  <div className="absolute w-full border dark:border-white top-[60px] left-0 bg-white dark:bg-[#020817] z-50 rounded-md">
                    <h1 className="dark:text-white text-black px-2 py-1.5 text-sm font-semibold capitalize">
                      my account
                    </h1>
                    <hr />
                    <Link to="/profile">
                      <p onClick={toggleMenu} className="dark:text-white hover:bg-[#F1F5F9] text-black px-2 py-1.5 cursor-pointer dark:hover:bg-[#1E293B]">
                        Profile
                      </p>
                    </Link>
                    <Link to="/wishlist">
                      <p onClick={toggleMenu} className="dark:text-white hover:bg-[#F1F5F9] text-black px-2 py-1.5 cursor-pointer dark:hover:bg-[#1E293B]">
                        Wishlist
                      </p>
                    </Link>
                    <Link to="/cart">
                      <p onClick={toggleMenu} className="dark:text-white hover:bg-[#F1F5F9] text-black px-2 py-1.5 cursor-pointer dark:hover:bg-[#1E293B]">
                        Cart
                      </p>
                    </Link>
                    <hr />
                    <p
                      onClick={toggleMenu1}
                      className="dark:text-white text-black px-2 py-1.5 hover:bg-[#F1F5F9] cursor-pointer dark:hover:bg-[#1E293B]"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button className="dark:border-white w-[100px] flex justify-between items-center border-[1px] bg-transparent dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] cursor-pointer text-black">
                  <LogInIcon className="w-4 h-4 dark:hover:bg-[#1E293B] dark:text-white hover:bg-[#cfc6c6]" />
                  <span className="dark:text-amber-100 text-black capitalize">
                    Login
                  </span>
                </Button>
              </Link>
            )}
            
          </ul>
          
        </div>
      </header>
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-[#020817] z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="p-4 flex flex-col gap-4 text-black dark:text-white">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="hover:underline">
            Home
          </Link>
          <Link to="/" onClick={() => setSidebarOpen(false)} className="hover:underline">
            Products
          </Link>
          <Link to="/category" onClick={() => setSidebarOpen(false)} className="hover:underline">
            Categories
          </Link>
          <Link to="/wishlist" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 hover:underline">
            Wishlist  {likeCount > 0 && <span>({likeCount})</span>}
          </Link>
          <Link to="/cart" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 hover:underline">
            Cart  {totalItems > 0 && <span>({totalItems})</span>}
          </Link>
          
          

          {user ? (
            <>
              <hr className="border-gray-300 dark:border-gray-600 my-4" />
              <div className="flex flex-col gap-2">
                <Link to="/profile" onClick={() => setSidebarOpen(false)} className="hover:underline">
                  Profile
                </Link>
                <p
                  onClick={() => {
                    setUser(null);
                    setSidebarOpen(false);
                    navigate("/login");
                  }}
                  className="cursor-pointer hover:underline"
                >
                  Logout
                </p>
              </div>
            </>
          ) : (
            <Link to="/login" onClick={() => setSidebarOpen(false)} className="hover:underline">
              Login
            </Link>
          )}
          <hr className="border-gray-300 dark:border-gray-600 my-4" />
          <div onClick={() => setIsActive(!isActive)} className="flex items-center">
            Theme
            <div
              className="relative cursor-pointer w-[45px] h-[45px] dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] rounded-sm flex items-center justify-center"
            > 
              {theme === "dark" ? (
                <Moon className="text-white" />
              ) : theme === "light" ? (
                <Sun className="text-black" />
              ) : (
                <Sun className="text-black dark:text-white" />
              )}
              <div
                className={
                  isActive
                    ? "w-[110px] absolute left-[-55px] top-[50px] dark:bg-transparent border  dark:text-white text-black rounded-md p-2 flex flex-col gap-2 z-50 bg-[#f1ecec]"
                    : "hidden"
                }
              >
                <p
                  className="cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] px-[5px] rounded-[5px]"
                  onClick={() => handleThemeChange("light")}
                >
                  Light
                </p>
                <p
                  className="cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] px-[5px] rounded-[5px]"
                  onClick={() => handleThemeChange("dark")}
                >
                  Dark
                </p>
                <p
                  className="cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] px-[5px] rounded-[5px]"
                  onClick={() => handleThemeChange("system")}
                >
                  System
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-40"
        ></div>
      )}
    </div>
  );
}
