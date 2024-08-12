"use client"
import Image from "next/image";
import AddData from "./addData/page";
import VeiwData from "./veiwData/page";
import { useState } from "react";

export default function Home() {
  const [bookToEdit, setBookToEdit] = useState(null);
  
  const handleEditIcon = (data:any) => {
    setBookToEdit(data);
  };
const cancleUpdate=()=>{
  setBookToEdit(null)
}
  return (
    <div className=" bg-black">
      <h1 className=" flex justify-center text-white text-2xl ">
        Crud App with firebase using tailwind css
      </h1>
      <div className=" grid grid-cols-2 lg:grid-cols-2">
        <AddData 
        bookToEdit={bookToEdit} />
        <VeiwData 
        handleEditIcon={handleEditIcon}
        cancelUpdate={cancleUpdate} />
        
      </div>
    </div>
  );
}
