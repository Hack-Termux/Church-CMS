"use client";

import Link from "next/link";
import Layout from "@/components/admin/Layout";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function Announcements(){

const [items,setItems]=useState<any[]>([]);


async function load(){

const snap=await getDocs(
collection(db,"announcements")
);


setItems(
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
Announcements
</h1>


<Link
href="/admin/announcements/new"
className="bg-blue-700 text-white px-5 py-3 rounded"
>
+ New Announcement
</Link>

</div>



<div className="grid md:grid-cols-2 gap-6">

{items.map(item=>(

<div
key={item.id}
className="bg-white p-6 rounded-xl shadow"
>

<h2 className="text-xl font-bold text-gray-900">
{item.title}
</h2>


<p className="text-gray-700 mt-3">
{item.message}
</p>


<p className="text-gray-500 mt-3">
{item.date}
</p>


</div>

))}

</div>


</Layout>

);

}
