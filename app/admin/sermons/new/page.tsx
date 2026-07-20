"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Layout from "@/components/admin/Layout";
import { useRouter } from "next/navigation";


export default function NewSermon(){

const router = useRouter();

const [form,setForm]=useState({
 title:"",
 preacher:"",
 date:"",
 videoUrl:"",
 description:""
});


async function save(){

await addDoc(
 collection(db,"sermons"),
 form
);

alert("Sermon added");

router.push("/admin/sermons");

}



return(

<Layout>

<h1 className="text-3xl font-bold text-gray-900 mb-8">
Add Sermon
</h1>


<div className="bg-white p-6 rounded-xl shadow max-w-xl">


{Object.keys(form).map((key)=>(

<input
key={key}
className="w-full border p-3 mb-4 text-gray-900"
placeholder={key}
onChange={(e)=>
setForm({
...form,
[key]:e.target.value
})
}
/>

))}


<button
onClick={save}
className="bg-blue-700 text-white px-6 py-3 rounded"
>
Publish Sermon
</button>


</div>

</Layout>

);

}
