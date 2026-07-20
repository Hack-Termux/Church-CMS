"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {collection,getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase";
import Layout from "@/components/admin/Layout";


export default function Gallery(){

const [images,setImages]=useState<any[]>([]);


async function load(){

const snap=await getDocs(
collection(db,"gallery")
);


setImages(
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
Gallery
</h1>


<Link
href="/admin/gallery/new"
className="bg-blue-700 text-white px-5 py-3 rounded"
>
+ Add Image
</Link>

</div>



<div className="grid md:grid-cols-3 gap-6">

{images.map(image=>(

<div
key={image.id}
className="bg-white rounded-xl shadow overflow-hidden"
>


<img
src={image.imageUrl}
className="w-full h-48 object-cover"
/>


<div className="p-4">

<h2 className="font-bold text-gray-900">
{image.title}
</h2>

<p className="text-gray-600">
{image.category}
</p>

</div>


</div>

))}


</div>


</Layout>

);

}
