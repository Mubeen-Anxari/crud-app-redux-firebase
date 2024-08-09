import Image from "next/image";
import AddData from "./addData/page";
import VeiwData from "./veiwData/page";

export default function Home() {
  return (
   <div className=" bg-black">
    <h1 className=" flex justify-center text-white text-2xl ">Crud App with firebase using tailwind css</h1>
   <div className=" grid grid-cols-2 lg:grid-cols-2">
   <AddData/>
   <VeiwData/>
   </div>
   </div>
  );
}
