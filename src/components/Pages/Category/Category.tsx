import { Button } from "@/components/ui/button"
export default function Category(){

    return <>
        <div className=" max-w-[1440px] w-full mx-auto px-[15px]">
            <h1 className="text-3xl font-bold mb-8">Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div  className="dark:bg-transparent p-6 rounded-lg border cursor-pointer text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold mb-2 capitalize">electronics</h4>
                    <p className="text-muted-foreground mb-4">Browse all electronics products</p>
                    <Button  className="dark:hover:bg-[#1E293B] hover:bg-[#F1F5F9] cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium    border border-input bg-background dark:text-white text-black h-10 px-4 py-2 w-full">View Products</Button>
                </div>
                <div className="p-6 rounded-lg border dark:bg-transparent cursor-pointer text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold mb-2 capitalize">jewelery</h4>
                    <p className="text-muted-foreground mb-4">Browse all jewelery products</p>
                    <Button  className="dark:hover:bg-[#1E293B] hover:bg-[#F1F5F9] cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium    border border-input bg-background dark:text-white text-black h-10 px-4 py-2 w-full">View Products</Button>
                </div>
                <div className="p-6 rounded-lg border dark:bg-transparent cursor-pointer text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold mb-2 capitalize">men's clothing</h4>
                    <p className="text-muted-foreground mb-4">Browse all men's clothing products</p>
                    <Button className="dark:hover:bg-[#1E293B] hover:bg-[#F1F5F9] cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium    border border-input bg-background dark:text-white text-black h-10 px-4 py-2 w-full">View Products</Button>
                </div>
                <div className="p-6 rounded-lg border dark:bg-transparent cursor-pointer text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold mb-2 capitalize">women's clothing</h4>
                    <p className="text-muted-foreground mb-4">Browse all women's clothing products</p>
                    <Button className="dark:hover:bg-[#1E293B] hover:bg-[#F1F5F9] cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium    border border-input bg-background dark:text-white text-black h-10 px-4 py-2 w-full">View Products</Button>
                </div>
            </div>
        </div>
    </>
}