import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
export default function Login (){
    const [name,setName]=useState("")
    const {setUser}=useUser();
    const handleLogin = () => {
    setUser({
      name:name?.slice(0,2).toUpperCase() ,
      email: name ,
    });
  };
    return <>
        <div className="max-w-[1440px] w-full container mx-auto px-4 py-16 flex justify-center">
            <div className="rounded-lg border text-card-foreground shadow-sm w-full max-w-md">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h1 className="dark:text-white text-black font-semibold tracking-tight text-2xl">Login</h1>
                    <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
                </div>
                <div className="p-6 pt-0 grid gap-y-2.5">
                    <form action="space-y-4" className="grid gap-y-2">
                        <div className="space-y-2">
                            <label className="dark:text-white text-black text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email" >Email</label>
                            <input onChange={(e)=>{setName(e.target.value)}} type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="dark:text-white text-black text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                            <input type="password" className="flex h-10 w-full rounded-md border focus:border-[blue] focus:outline-none bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="••••••••" />
                        </div>
                    </form>
                    <Link to="/">
                        <Button onClick={()=>{handleLogin()}} className="bg-blue-600 hover:bg-blue-700 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full" type="submit">
                            Login
                        </Button>
                    </Link>
                </div>
                <div className=" p-6 grid place-items-center">
                    <p className="text-sm text-muted-foreground" >Don't have an account? <Link to="/register"><span className="cursor-pointer text-[blue] hover:underline">Register</span></Link> </p>
                </div>
            </div>
        </div>
    </>
}