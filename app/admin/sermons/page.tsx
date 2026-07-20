"use client";

import Link from "next/link";
import Layout from "@/components/admin/Layout";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function Sermons(){

  const [sermons,setSermons] = useState<any[]>([]);


  async function load(){

    const snap = await getDocs(
      collection(db,"sermons")
    );


    setSermons(
      snap.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }))
    );

  }


  useEffect(()=>{
    load();
  },[]);



  return(
    <Layout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Sermons
        </h1>


        <Link
          href="/admin/sermons/new"
          className="bg-blue-700 text-white px-5 py-3 rounded"
        >
          + Add Sermon
        </Link>

      </div>


      <div className="grid md:grid-cols-2 gap-6">

        {sermons.map((sermon)=>(

          <div
            key={sermon.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-xl font-bold text-gray-900">
              {sermon.title}
            </h2>

            <p className="text-gray-700">
              {sermon.preacher}
            </p>

            <p className="text-gray-600">
              {sermon.date}
            </p>

          </div>

        ))}

      </div>

    </Layout>
  );

}
