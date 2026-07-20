"use client";

import {useState} from "react";
import {addDoc,collection} from "firebase/firestore";
import {db} from "@/lib/firebase";
import Layout from "@/components/admin/Layout";
import {useRouter} from "next/navigation";


export default function NewImage(){

const router=useRouter();


const [form,setForm]=useState({
title:"",
imageUrl:"",
category:""
});



async function save(){

await addDoc(
collection(db,"gallery"),
form
);


alert("Image added");

router.push("/admin/gallery");

}



return(

<Layout>


<h1 className="text-3xl font-bold text-gray-900 mb-8">
Add Gallery Image
</h1>


<div className="bg-white p-6 rounded-xl shadow max-w-xl">


{Object.keys(form).map(field=>(

<input
key={field}
className="w-full border p-3 mb-4 text-gray-900"
placeholder={field}
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
Save Image
</button>


</div>


</Layout>

);

}
