"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Layout from "@/components/admin/Layout";


export default function NewEvent(){

const router = useRouter();


const [form,setForm]=useState({
title:"",
date:"",
time:"",
location:"",
description:"",
imageUrl:""
});



async function createEvent(){

await addDoc(
collection(db,"events"),
form
);


alert("Event created");

router.push("/admin/events");

}



return(

<Layout>

<h1 className="text-3xl font-bold text-gray-900 mb-8">
Create Event
</h1>


<div className="bg-white p-6 rounded-xl shadow max-w-xl">


{Object.keys(form).map((field)=>(

<textarea
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



{form.imageUrl && (

<img
src={form.imageUrl}
className="w-full h-48 object-cover rounded mb-4"
/>

)}



<button
onClick={createEvent}
className="bg-blue-700 text-white px-6 py-3 rounded"
>
Publish Event
</button>


</div>


</Layout>

);

}
