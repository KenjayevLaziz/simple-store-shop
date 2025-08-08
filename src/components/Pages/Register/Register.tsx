import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
export default function Register() {
    const {setUser}=useUser();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const handleLogin = () => {
    
    setUser({
      name:name?.split(" ")[0][0]+""+name?.split(" ")[name?.split(" ").length-1][0],
      email: email ,
    });
  };
    return <>
        <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="rounded-lg border  text-card-foreground shadow-sm w-full max-w-md p-6">
                <div className="flex flex-col space-y-1.5 pb-6">
                    <h1 className="font-semibold tracking-tight text-2xl">Create an Account</h1>
                    <p className="text-sm text-muted-foreground">Enter your details to create a new account</p>
                </div>
                <div className="pb-6">
                    <form className="pb-6 space-y-4 grid gap-y-2">
                        <div className="space-y-2 grid gap-y-1">
                            <label htmlFor="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
                            <input onChange={(e)=>{setName(e.target.value)}} type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2 grid gap-y-1">
                            <label htmlFor="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2 grid gap-y-1">
                            <label htmlFor="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                            <input type="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2 grid gap-y-1">
                            <label htmlFor="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Confirm Password</label>
                            <input type="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="••••••••" />
                        </div>
                        
                    </form>

                    <Link to="/">
                        <Button onClick={()=>{handleLogin()}} className="bg-blue-600 w-full hover:bg-blue-700 cursor-pointer">
                                Register
                        </Button>
                    </Link>
                </div>
                <p className="text-sm text-muted-foreground text-center">Already have an account? <Link to="/login"><span className="text-[blue] hover:underline">Login</span></Link></p>
            </div>
        </div>
    </>
}