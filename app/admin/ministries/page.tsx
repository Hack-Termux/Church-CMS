"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {collection,getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase";
import Layout from "@/components/admin/Layout";


export default function Ministries(){

const [ministries,setMinistries]=useState<any[]>([]);


async function load(){

const snap=await getDocs(
collection(db,"ministries")
);


setMinistries(
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
Ministries
</h1>


<Link
href="/admin/ministries/new"
className="bg-blue-700 text-white px-5 py-3 rounded"
>
+ Add Ministry
</Link>


</div>



<div className="grid md:grid-cols-3 gap-6">


{ministries.map(item=>(

<div
key={item.id}
className="bg-white rounded-xl shadow overflow-hidden"
>


{item.imageUrl && (

<img
src={item.imageUrl}
className="w-full h-48 object-cover"
/>

)}


<div className="p-5">

<h2 className="text-xl font-bold text-gray-900">
{item.name}
</h2>


<p className="text-gray-700">
Leader: {item.leader}
</p>


<p className="text-gray-600 mt-2">
{item.description}
</p>


</div>


</div>

))}


</div>


</Layout>

);

}
