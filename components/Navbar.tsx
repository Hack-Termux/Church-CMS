"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function Navbar(){

  const [churchName,setChurchName] = useState("Grace Church");
  const [logo,setLogo] = useState("");
  const [open,setOpen] = useState(false);


  const links = [
    {name:"Home", path:"/"},
    {name:"About", path:"/about"},
    {name:"Ministries", path:"/ministries"},
    {name:"Sermons", path:"/sermons"},
    {name:"Events", path:"/events"},
    {name:"Gallery", path:"/gallery"},
    {name:"Prayer", path:"/prayer"},
    {name:"Contact", path:"/contact"},
  ];



  useEffect(()=>{

    async function loadSettings(){

      const snap = await getDoc(
        doc(db,"settings","church")
      );


      if(snap.exists()){

        const data=snap.data();

        setChurchName(data.name || "Grace Church");
        setLogo(data.logoUrl || "");

      }

    }

    loadSettings();

  },[]);



  return(

    <nav className="bg-white shadow fixed top-0 w-full z-50">


      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


        <Link href="/" className="flex items-center gap-3">

          {logo && (
            <img
              src={logo}
              className="w-10 h-10 rounded-full"
            />
          )}

          <h1 className="text-xl font-bold text-gray-900">
            {churchName}
          </h1>

        </Link>



        {/* Desktop */}

        <div className="hidden md:flex gap-6 text-gray-700">

          {links.map(link=>(
            <Link
              key={link.name}
              href={link.path}
            >
              {link.name}
            </Link>
          ))}

        </div>



        {/* Mobile Button */}

        <button
          onClick={()=>setOpen(!open)}
          className="md:hidden text-gray-900 text-3xl"
        >
          ☰
        </button>


      </div>



      {/* Mobile Menu */}

      {open && (

        <div className="md:hidden bg-white shadow px-6 py-5 space-y-4">


          {links.map(link=>(

            <Link
              key={link.name}
              href={link.path}
              onClick={()=>setOpen(false)}
              className="block text-gray-900"
            >
              {link.name}
            </Link>

          ))}


        </div>

      )}


    </nav>

  );

}
