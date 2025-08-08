import { Search,Filter } from "lucide-react"
import Card from "../Card/Card";
import { useState } from "react";
interface Product {
    title: string;
    category: string;
}

interface SearchFilterProps {
    products1: Product[];
}

export default function SearchFilter({products1}: SearchFilterProps) {
    const [category, setCategory] = useState("All category");
    const [name1, setName1] = useState("");
    const [isfilter,setisfilter]=useState(false);
    
    const searchProducts = products1?.filter((product) => {
    const search = name1.toLowerCase();
    const title = product?.title.toLowerCase();
  return title.includes(search) && (category === "All category" || product?.category.toLowerCase() === category.toLowerCase());
});
    
    return <>
        <div className="max-w-[1440px] w-full mx-auto p-4">
            <h1 className="max-w-[1440px] w-full dark:text-white text-3xl text-black font-bold mb-8"><strong>Online Store</strong></h1>
            <div className="flex justify-between items-end">
                <form className="flex items-center justify-between max-w-[1240px] w-full bg-transparent border border-gray-600 rounded-md">
                    <Search className="text-gray-400 ml-1.5" />
                    <input type="search" onInput={(e)=>{setName1(e?.target?.value)}} placeholder="Search for products..." className="w-full h-[50px] px-4 rounded-md  dark:text-white text-black placeholder:text-gray-400 focus:outline-none " />
                </form>
                <div onClick={()=>{setisfilter(!isfilter)}} className="relative flex items-center justify-between px-[10px]  w-[155px] bg-transparent border-[1px] border-[#a1a1a1] h-[50px] rounded-md mt-4 cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#cfc6c6]">
                    <Filter className="text-gray-400" />
                    <span className="dark:text-white text-black">Filter</span>
                <div onClick={(e)=>{setCategory(e.target.childNodes[0].data)}} className={ isfilter?`absolute top-[59px] left-[-45px] bg-white dark:bg-[#17191d] w-[200px] rounded-md shadow-lg z-40 group-hover:block flex flex-col flex-2` :"hidden"}>
                        <p className="py-2 cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#dfe0e4] dark:text-white text-black rounded-[8px] px-[20px] capitalize">All category</p>
                        
                        <p className="py-2 cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#dfe0e4] dark:text-white text-black rounded-[8px] px-[20px] capitalize">jewelery</p>
                        <p className="py-2 cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#dfe0e4] dark:text-white text-black rounded-[8px] px-[20px] capitalize">men's clothing</p>
                        <p className="py-2 cursor-pointer dark:hover:bg-[#1E293B] hover:bg-[#dfe0e4] dark:text-white text-black rounded-[8px] px-[20px] capitalize">women's clothing</p>
                    </div>
                </div> 
            </div>
        </div>
        <Card searchProducts={searchProducts}/>
    </>
}