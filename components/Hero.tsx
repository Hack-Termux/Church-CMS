"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";


export default function Hero(){

  const [hero,setHero] = useState({
    title:"Welcome to our church",
    subtitle:"A place of worship, faith and love",
    imageUrl:"",
    buttonText:"Join Us"
  });


  useEffect(()=>{

    async function loadHero(){

      const snap = await getDoc(
        doc(db,"settings","hero")
      );


      if(snap.exists()){

        setHero(snap.data() as any);

      }

    }


    loadHero();

  },[]);



  return (

    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage:`url(${hero.imageUrl})`
      }}
    >

      <div className="bg-black/50 p-8 rounded-xl text-center max-w-3xl">

        <h1 className="text-5xl font-bold text-white mb-5">
          {hero.title}
        </h1>


        <p className="text-xl text-white mb-8">
          {hero.subtitle}
        </p>


        <button className="bg-blue-700 text-white px-8 py-3 rounded-full">
          {hero.buttonText}
        </button>


      </div>


    </section>

  );

}
