import { Button } from "@/components/ui/button";
import { useUser } from "../../context/UserContext";
import { useLikedProducts } from "../../context/LikedProductsContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
type User = {
  name: string;
  email: string;
} | null;

export default function Profile() {
  const { likeCount }: { likeCount: number } = useLikedProducts();
  const { user, setUser }: { user: User; setUser: (u: User) => void } = useUser();
  const { totalItems }: { totalItems: number } = useCart();
  const naviget = useNavigate();

  function handleCheckout(): void {
    setUser(null);
    naviget("/login");
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">my acaunt</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-lg border bg-transparent text-card-foreground shadow-sm md:col-span-1">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex flex-col items-center mb-4">
                <p className="relative w-24 h-24 flex rounded-full justify-center items-center text-4xl bg-[#d84315] overflow-hidden mb-4">
                  {user?.name}
                </p>
                <p className="text-2xl font-semibold leading-none tracking-tight mb-1.5">
                  {user?.name}
                </p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div className="flex items-center p-6 pt-0">
                <Button
                  onClick={() => {
                    handleCheckout();
                  }}
                  className="text-white capitalize hover:bg-[#1E293B] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background cursor-pointer hover:text-accent-foreground h-10 px-4 py-2 w-full"
                >
                  logout
                </Button>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="inline-flex items-center justify-between  rounded-md bg-[#1E293B] py-1 px-2 text-muted-foreground mb-4">
              <button className="cursor-pointer bg-[#020817] inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                Overview
              </button>
              <button className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                Orders
              </button>
              <button className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                Settings
              </button>
            </div>
            <div className="rounded-lg border bg-transparent text-card-foreground shadow-sm py-5 px-2">
              <div className="mb-7">
                <h1 className="text-2xl font-semibold leading-none tracking-tight mb-2">
                  Account Overview
                </h1>
                <p className="text-sm text-muted-foreground">
                  Summary of your account activity
                </p>
              </div>
              <div className="pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-transparent text-card-foreground shadow-sm">
                    <h1 className="font-semibold tracking-tight text-lg">
                      Wishlist
                    </h1>
                    <p className="text-3xl font-bold">{likeCount}</p>
                    <p className="text-sm text-muted-foreground">
                      Items saved for later
                    </p>
                  </div>
                  <div className="rounded-lg border bg-transparent p-4 text-card-foreground shadow-sm">
                    <h1 className="font-semibold tracking-tight text-lg">
                      Cart
                    </h1>
                    <p className="text-3xl font-bold">{totalItems}</p>
                    <p className="text-sm text-muted-foreground">
                      Items in your cart
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
