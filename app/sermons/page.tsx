"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function SermonsPage(){

  const [sermons,setSermons] = useState<any[]>([]);


  async function loadSermons(){

    const snapshot = await getDocs(
      collection(db,"sermons")
    );


    setSermons(
      snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }))
    );

  }


  useEffect(()=>{
    loadSermons();
  },[]);



  return (

    <main className="min-h-screen bg-gray-100 py-20 px-6">

      <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
        Sermons
      </h1>


      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">


        {sermons.map((sermon)=>(

          <div
            key={sermon.id}
            className="bg-white rounded-xl shadow p-6"
          >

            <h2 className="text-2xl font-bold text-gray-900">
              {sermon.title}
            </h2>


            <p className="text-gray-700 mt-2">
              By {sermon.preacher}
            </p>


            <p className="text-gray-600">
              {sermon.date}
            </p>


            <p className="text-gray-700 mt-4">
              {sermon.description}
            </p>


            {sermon.videoUrl && (

              <div className="mt-5">

                <a
                  href={sermon.videoUrl}
                  target="_blank"
                  className="bg-blue-700 text-white px-5 py-3 rounded inline-block"
                >
                  Watch Sermon
                </a>

              </div>

            )}


          </div>

        ))}


      </div>


    </main>

  );

}
