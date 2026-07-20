"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSearchParams, useRouter } from "next/navigation";
import Layout from "@/components/admin/Layout";


export default function EditEvent(){

  const params = useSearchParams();
  const router = useRouter();

  const id = params.get("id");


  const [form,setForm] = useState({
    title:"",
    date:"",
    time:"",
    location:"",
    description:""
  });


  useEffect(()=>{

    async function load(){

      if(!id) return;

      const snap = await getDoc(
        doc(db,"events",id)
      );

      if(snap.exists()){
        setForm(snap.data() as any);
      }

    }

    load();

  },[id]);



  async function update(){

    if(!id) return;

    await updateDoc(
      doc(db,"events",id),
      form
    );

    alert("Event updated");

    router.push("/admin/events");

  }



  return(
    <Layout>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Edit Event
      </h1>


      <div className="bg-white p-6 rounded-xl shadow max-w-xl">


        {Object.keys(form).map((field)=>(
          <input
            key={field}
            className="w-full border p-3 mb-4 text-gray-900"
            placeholder={field}
            value={(form as any)[field]}
            onChange={(e)=>
              setForm({
                ...form,
                [field]:e.target.value
              })
            }
          />
        ))}


        <button
          onClick={update}
          className="bg-blue-700 text-white px-6 py-3 rounded"
        >
          Save Changes
        </button>


      </div>


    </Layout>
  );
}
