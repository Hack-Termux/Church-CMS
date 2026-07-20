"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";


export default function AboutPage(){

  const [about,setAbout] = useState<any>({
    title:"About Our Church",
    description:"",
    mission:"",
    vision:"",
    pastorName:"",
    pastorMessage:"",
    imageUrl:""
  });



  useEffect(()=>{

    async function load(){

      const snap = await getDoc(
        doc(db,"settings","about")
      );


      if(snap.exists()){

        setAbout(snap.data());

      }

    }


    load();

  },[]);



  return (

    <main className="min-h-screen bg-gray-100 py-20 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">


        {about.imageUrl && (

          <img
            src={about.imageUrl}
            className="w-full h-72 object-cover rounded-xl mb-8"
          />

        )}


        <h1 className="text-4xl font-bold text-gray-900 mb-5">
          {about.title}
        </h1>


        <p className="text-gray-700 text-lg mb-8">
          {about.description}
        </p>



        <div className="grid md:grid-cols-2 gap-6">


          <div className="bg-gray-100 p-6 rounded-xl">

            <h2 className="text-2xl font-bold text-gray-900">
              Mission
            </h2>

            <p className="text-gray-700 mt-3">
              {about.mission}
            </p>

          </div>



          <div className="bg-gray-100 p-6 rounded-xl">

            <h2 className="text-2xl font-bold text-gray-900">
              Vision
            </h2>

            <p className="text-gray-700 mt-3">
              {about.vision}
            </p>

          </div>


        </div>



        <div className="mt-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Pastor {about.pastorName}
          </h2>


          <p className="text-gray-700 mt-3">
            {about.pastorMessage}
          </p>

        </div>


      </div>

    </main>

  );

}
