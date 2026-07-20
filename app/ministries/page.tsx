"use client";

import {useEffect,useState} from "react";
import {collection,getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase";


export default function MinistriesPage(){

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

<main className="min-h-screen bg-gray-100 py-20 px-6">


<h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
Our Ministries
</h1>



<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">


{ministries.map(item=>(

<div
key={item.id}
className="bg-white rounded-xl shadow overflow-hidden"
>


{item.imageUrl && (

<img
src={item.imageUrl}
className="w-full h-52 object-cover"
/>

)}



<div className="p-6">


<h2 className="text-2xl font-bold text-gray-900">
{item.name}
</h2>


<p className="text-blue-700 mt-2">
{item.category}
</p>


<p className="text-gray-700 mt-3">
{item.description}
</p>


<p className="text-gray-600 mt-4">
Leader: {item.leader}
</p>


</div>


</div>

))}


</div>


</main>

);

}
