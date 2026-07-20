"use client";

import {useState} from "react";
import {addDoc,collection} from "firebase/firestore";
import {db} from "@/lib/firebase";
import Layout from "@/components/admin/Layout";
import {useRouter} from "next/navigation";


export default function NewAnnouncement(){

const router=useRouter();


const [form,setForm]=useState({
title:"",
message:"",
date:""
});


async function save(){

await addDoc(
collection(db,"announcements"),
form
);


alert("Announcement published");

router.push("/admin/announcements");

}



return(

<Layout>

<h1 className="text-3xl font-bold text-gray-900 mb-8">
New Announcement
</h1>


<div className="bg-white p-6 rounded-xl shadow max-w-xl">


{Object.keys(form).map(field=>(

<textarea
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
Publish
</button>


</div>

</Layout>

);

}
