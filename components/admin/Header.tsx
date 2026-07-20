"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import {doc,getDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";


export default function Header(){

const [profile,setProfile]=useState<any>({
name:"Admin",
imageUrl:""
});


useEffect(()=>{

async function load(){

const snap=await getDoc(
doc(db,"admins","profile")
);


if(snap.exists()){

setProfile(snap.data());

}

}

load();

},[]);



return(

<header className="bg-white shadow p-4 flex justify-between items-center">


<div>

<h1 className="text-xl font-bold text-gray-900">
Welcome, {profile.name}
</h1>

<p className="text-gray-600">
Church Administrator
</p>

</div>



<Link
href="/admin/profile"
className="flex items-center gap-3"
>


{profile.imageUrl ? (

<img
src={profile.imageUrl}
className="w-12 h-12 rounded-full object-cover"
/>

):(

<div className="w-12 h-12 rounded-full bg-gray-300"/>

)}


</Link>


</header>

);

}
