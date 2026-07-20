"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/admin/Layout";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";


export default function HeroSettings(){

  const [form,setForm] = useState({
    title:"",
    subtitle:"",
    imageUrl:"",
    buttonText:""
  });


  useEffect(()=>{

    async function load(){

      const snap = await getDoc(
        doc(db,"settings","hero")
      );

      if(snap.exists()){
        setForm(snap.data() as any);
      }

    }

    load();

  },[]);



  async function save(){

    await setDoc(
      doc(db,"settings","hero"),
      form
    );

    alert("Hero updated");

  }



  return(

    <Layout>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Hero Settings
      </h1>


      <div className="bg-white p-6 rounded-xl shadow max-w-xl">

        {Object.keys(form).map((key)=>(

          <input
            key={key}
            className="w-full border p-3 mb-4 text-gray-900"
            placeholder={key}
            value={(form as any)[key]}
            onChange={(e)=>
              setForm({
                ...form,
                [key]:e.target.value
              })
            }
          />

        ))}


        <button
          onClick={save}
          className="bg-blue-700 text-white px-6 py-3 rounded"
        >
          Save Hero
        </button>


      </div>

    </Layout>

  );
}
