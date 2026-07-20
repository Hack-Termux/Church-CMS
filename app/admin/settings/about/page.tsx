"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/admin/Layout";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";


export default function AboutSettings(){

const [form,setForm]=useState({
title:"",
description:"",
mission:"",
vision:"",
pastorName:"",
pastorMessage:"",
imageUrl:""
});


useEffect(()=>{

async function load(){

const snap = await getDoc(
doc(db,"settings","about")
);

if(snap.exists()){
setForm(snap.data() as any);
}

}

load();

},[]);



async function save(){

await setDoc(
doc(db,"settings","about"),
form
);

alert("About page updated");

}



return(

<Layout>

<h1 className="text-3xl font-bold text-gray-900 mb-8">
About Church Settings
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


<button
onClick={save}
className="bg-blue-700 text-white px-6 py-3 rounded"
>
Save About
</button>


</div>

</Layout>

);

}
