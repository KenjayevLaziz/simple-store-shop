import { Moon, Sun, Heart, ShoppingCart, LogInIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useLikedProducts } from "../context/LikedProductsContext";

interface User {
  name: string;
  [key: string]: unknown; 
}

export default function Header() {
  const { setUser, user } = useUser() as {
    setUser: (user: User | null) => void;
    user: User | null;
  };

  const { likeCount } = useLikedProducts() as { likeCount: number };
  const { totalItems } = useCart() as { totalItems: number };

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

  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const toggleMenu1 = () => {
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="dark:bg-[#020817] bg-white text-white w-full fixed mx-auto top-0 left-0 right-0 z-50 border-b-white">
      <header className="text-white p-4 flex w-full max-w-[1440px] justify-between items-center mx-auto top-0 left-0 right-0 z-50 border-b-white">

        <nav className="flex max-w-[450px] w-full justify-between">
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


        <div className="max-w-[400px] w-full flex justify-end">
          <ul className="flex items-center gap-4 max-w-[300px] w-full justify-between">

            <div
              onClick={() => setIsActive(!isActive)}
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
                    ? "w-[110px] absolute left-[-70px] top-[50px] dark:bg-[#1e3150]  dark:text-white text-black rounded-md p-2 flex flex-col gap-2 z-150 bg-[#f1ecec]"
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

            {likeCount ? (
              <Link to="/wishlist">
                <div className="relative cursor-pointer w-[45px] h-[45px] dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] rounded-sm flex items-center justify-center">
                  <Heart className="dark:hover:bg-[#1E293B] dark:text-white text-black" />
                  <div className="absolute bg-[#3576DF] right-0 rounded-full text-[14px] w-5 h-5 top-0 flex justify-center items-center">
                    {likeCount}
                  </div>
                </div>
              </Link>
            ) : (
              <Link to="/wishlist">
                <div className="cursor-pointer w-[45px] h-[45px] dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] rounded-sm flex items-center justify-center">
                  <Heart className="dark:hover:bg-[#1E293B] dark:text-white text-black" />
                </div>
              </Link>
            )}

            {totalItems ? (
              <Link to="/cart">
                <div className="relative cursor-pointer w-[45px] h-[45px] dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] rounded-sm flex items-center justify-center">
                  <ShoppingCart className="dark:hover:bg-[#1E293B] dark:text-white text-black" />
                  <div className="absolute bg-[#3576DF] right-0 rounded-full text-[14px] w-5 h-5 top-0 flex justify-center items-center">
                    {totalItems}
                  </div>
                </div>
              </Link>
            ) : (
              <Link to="/cart">
                <div className="cursor-pointer w-[45px] h-[45px] dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6] rounded-sm flex items-center justify-center">
                  <ShoppingCart className="dark:hover:bg-[#1E293B] dark:text-white text-black" />
                </div>
              </Link>
            )}

            {user ? (
              <div className="relative w-full">
                <Button
                  onClick={() => {
                    toggleMenu();
                  }}
                  className="rounded-full w-[50px] h-[50px] flex justify-center items-center bg-[yellow] cursor-pointer text-black"
                >
                  <span className="text-black uppercase"> {user?.name}</span>
                </Button>
                {open ? (
                  <div className="absolute w-full border dark:*border-white top-[60px] left-0 bg-white dark:bg-[#020817] z-50 rounded-md">
                    <h1 className="px-2 py-1.5 text-sm font-semibold capitalize">
                      my account
                    </h1>
                    <hr />
                    <Link to="/profile">
                      <p
                        onClick={() => {
                          toggleMenu();
                        }}
                        className="px-2 py-1.5 cursor-pointer hover:bg-[#1E293B]"
                      >
                        Profile
                      </p>
                    </Link>
                    <Link to="/wishlist">
                      <p
                        onClick={() => {
                          toggleMenu();
                        }}
                        className="px-2 py-1.5 cursor-pointer hover:bg-[#1E293B]"
                      >
                        Wishlist
                      </p>
                    </Link>
                    <Link to="/cart">
                      <p
                        onClick={() => {
                          toggleMenu();
                        }}
                        className="px-2 py-1.5 cursor-pointer hover:bg-[#1E293B]"
                      >
                        Cart
                      </p>
                    </Link>
                    <hr />
                    <p
                      onClick={() => {
                        toggleMenu1();
                      }}
                      className="px-2 py-1.5 cursor-pointer hover:bg-[#1E293B]"
                    >
                      Logout
                    </p>
                  </div>
                ) : null}
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
      <hr />
    </div>
  );
}
