"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/admin/Layout";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";


export default function Settings(){

  const [churchName,setChurchName] = useState("");
  const [logoUrl,setLogoUrl] = useState("");
  const [saving,setSaving] = useState(false);


  useEffect(()=>{

    async function loadSettings(){

      const snap = await getDoc(
        doc(db,"settings","church")
      );


      if(snap.exists()){

        const data = snap.data();

        setChurchName(data.name || "");
        setLogoUrl(data.logoUrl || "");

      }

    }

    loadSettings();

  },[]);



  async function save(){

    try{

      setSaving(true);


      await setDoc(
        doc(db,"settings","church"),
        {
          name: churchName,
          logoUrl: logoUrl
        }
      );


      alert("Church settings saved");


    }catch(error){

      alert("Error saving settings");

    }


    setSaving(false);

  }



  return(

    <Layout>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Church Settings
      </h1>


      <div className="bg-white p-6 rounded-xl shadow max-w-xl">


        <label className="text-gray-700">
          Church Name
        </label>

        <input
          className="w-full border p-3 mb-5 text-gray-900"
          value={churchName}
          onChange={(e)=>setChurchName(e.target.value)}
        />


        <label className="text-gray-700">
          Logo URL
        </label>

        <input
          className="w-full border p-3 mb-5 text-gray-900"
          value={logoUrl}
          onChange={(e)=>setLogoUrl(e.target.value)}
        />


        {logoUrl && (
          <img
            src={logoUrl}
            className="w-24 h-24 object-cover rounded-full mb-5"
          />
        )}


        <button
          onClick={save}
          className="bg-blue-700 text-white px-6 py-3 rounded"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>


      </div>

    </Layout>

  );
}
