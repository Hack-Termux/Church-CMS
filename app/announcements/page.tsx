"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function AnnouncementsPage(){

  const [items,setItems] = useState<any[]>([]);


  async function load(){

    const snapshot = await getDocs(
      collection(db,"announcements")
    );


    setItems(
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
        Announcements
      </h1>



      <div className="max-w-4xl mx-auto space-y-6">


        {items.map((item)=>(

          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-6"
          >

            <h2 className="text-2xl font-bold text-gray-900">
              {item.title}
            </h2>


            <p className="text-gray-700 mt-4">
              {item.message}
            </p>


            <p className="text-gray-500 mt-4">
              {item.date}
            </p>


          </div>

        ))}


      </div>


    </main>

  );

}
