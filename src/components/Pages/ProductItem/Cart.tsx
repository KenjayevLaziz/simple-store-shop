import { Button } from "@/components/ui/button";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { MoveRight, Archive } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

export default function Cart() {
  const navigite = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setCartItems,
  }: {
    cartItems: CartItem[];
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  } = useCart();

  const totalPrice: number = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = (): void => {
    setCartItems([]);
  };

  return (
    <div className="p-4 max-w-[1440px] w-full mx-auto">
      {cartItems.length ? (
        <h1 className="text-2xl dark:text-white text-black font-bold mb-8 capitalize mt-5">
          shopping cart
        </h1>
      ) : null}
      {cartItems.length === 0 ? (
        <div className="max-w-[900px] w-full mx-auto flex flex-col pt-[100px] min-h-[50vh] items-center">
          <h1 className="text-center dark:text-white text-black text-2xl font-bold mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Add some products to your cart to see them here.
          </p>
          <Link to="/">
            <Button className="dark:text-white text-black cursor-pointer text-center mx-auto bg-[#3576DF]">
              Contuine shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="max-w-[900px] w-full flex flex-col justify-between">
            <div className="">
              {cartItems.map(({ product, quantity }: CartItem) => (
                <div className="" key={product.id}>
                  <div className="flex justify-between items-start mx-auto ">
                    <div className=" flex justify-between p-4 max-w-[900px] w-full">
                      <div className="flex items-center justify-between gap-x-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className=" w-20 h-20 object-cover mb-2"
                        />
                        <div className="">
                          <h2
                            onClick={() => {
                              navigite(`/product/${product.id}`);
                            }}
                            className="dark:text-white text-black hover:underline cursor-pointer font-medium"
                          >
                            {product.title}
                          </h2>
                          <p className="text-sm text-muted-foreground my-1">
                            ${product.price}
                          </p>

                          <div className="flex items-center ">
                            <button
                              onClick={() => {
                                decreaseQuantity(product.id);
                              }}
                              className="dark:text-white text-black cursor-pointer text-center px-3 pb-2 pt-0 text-xl  font-medium rounded-md  bg-transparent border hover:bg-[#1E293B] "
                            >
                              -
                            </button>
                            <span className="dark:text-white text-black px-4 py-1 text-2xl font-medium w-[45px]">
                              {quantity}
                            </span>
                            <button
                              onClick={() => {
                                increaseQuantity(product.id);
                              }}
                              className="dark:text-white text-black cursor-pointer px-3 pb-2 pt-0 text-xl  font-medium rounded-md  bg-transparent border hover:bg-[#1E293B]"
                            >
                              +
                            </button>
                            <button
                              className="dark:text-white text-black ml-4 cursor-pointer"
                              onClick={() => removeFromCart(product.id)}
                            >
                              <Archive />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="font-medium">
                        ${quantity * product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-4">
              <Button
                onClick={() => {
                  handleCheckout();
                }}
                className="dark:text-white text-black capitalize bg-transparent hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]  border cursor-pointer"
              >
                clear cart
              </Button>
              <Link to="/">
                <Button className="dark:text-white text-black hover:bg-[#F1F5F9] capitalize bg-transparent  border cursor-pointer dar:hover:bg-[#1E293B] ">
                  continue shopping
                </Button>
              </Link>
            </div>
          </div>

          <div className="max-w-[400px] w-full">
            <div className="grid items-center p-4 rounded-2xl dark:bg-[#0D1526] bg-[#F1F5F9] gap-y-5">
              <h1 className="dark:text-white text-black font-semibold text-lg mb-4">Order Summary</h1>
              <p className="dark:text-white text-black capitalize flex justify-between w-full">
                Subtotal <span>${totalPrice.toFixed(2)}</span>
              </p>
              <p className="dark:text-white text-black capitalize flex justify-between w-full">
                Shipping <span>free</span>
              </p>
              <p className="dark:text-white text-black capitalize flex justify-between w-full">
                Tax <span>${(totalPrice / 10).toFixed(2)}</span>
              </p>
              <hr />
              <p className="dark:text-white text-black capitalize flex justify-between w-full">
                Total <span>${(totalPrice * 1.1).toFixed(2)}</span>
              </p>
              <Button
                onClick={() => {
                  handleCheckout();
                }}
                className="bg-[#3b82f6] text-black hover:bg-[#3677E1] cursor-pointer"
              >
                checkout <MoveRight />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
