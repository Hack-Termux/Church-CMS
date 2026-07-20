"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function GalleryPage(){

  const [images,setImages] = useState<any[]>([]);


  async function load(){

    const snapshot = await getDocs(
      collection(db,"gallery")
    );


    setImages(
      snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }))
    );

  }


  useEffect(()=>{
    load();
  },[]);



  return(

    <main className="min-h-screen bg-gray-100 py-20 px-6">


      <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
        Church Gallery
      </h1>



      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">


        {images.map((image)=>(

          <div
            key={image.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >


            <img
              src={image.imageUrl}
              className="w-full h-64 object-cover"
            />


            <div className="p-4">

              <h2 className="text-xl font-bold text-gray-900">
                {image.title}
              </h2>


              <p className="text-gray-600">
                {image.category}
              </p>

            </div>


          </div>

        ))}


      </div>


    </main>

  );

}
