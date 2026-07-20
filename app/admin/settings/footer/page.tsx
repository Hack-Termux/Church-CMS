"use client";

import {useEffect,useState} from "react";
import Layout from "@/components/admin/Layout";
import {db} from "@/lib/firebase";
import {doc,getDoc,setDoc} from "firebase/firestore";


export default function FooterSettings(){

const [form,setForm]=useState({
description:"",
copyright:"",
facebook:"",
instagram:"",
youtube:""
});


useEffect(()=>{

async function load(){

const snap=await getDoc(
doc(db,"settings","footer")
);


if(snap.exists()){
setForm(snap.data() as any);
}

}

load();

},[]);



async function save(){

await setDoc(
doc(db,"settings","footer"),
form
);


alert("Footer updated");

}



return(

<Layout>

<h1 className="text-3xl font-bold text-gray-900 mb-8">
Footer Settings
</h1>


<div className="bg-white p-6 rounded-xl shadow max-w-xl">


{Object.keys(form).map(field=>(

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
Save Footer
</button>


</div>


</Layout>

);

}
