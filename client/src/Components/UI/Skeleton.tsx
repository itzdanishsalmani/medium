export function Skeleton(){
return (

<div role="status" className=" animate-pulse">
    <div className="h-3   bg-gray-500 rounded-full w-56 mb-4"></div>
    <div className="h-2.5 bg-gray-500 rounded-full  mb-2.5"></div>
    <div className="h-2.5 bg-gray-500 rounded-full  mb-2.5"></div>
    <div className="h-2.5 bg-gray-500 rounded-full  mb-2.5"></div>
    <div className="h-2.5 bg-gray-500 rounded-full  mb-2.5"></div>
    <span className="sr-only">Loading...</span>
</div>

)
}