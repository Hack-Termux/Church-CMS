"use client";

import {useEffect,useState} from "react";
import Layout from "@/components/admin/Layout";
import {db} from "@/lib/firebase";
import {doc,getDoc,setDoc} from "firebase/firestore";


export default function Profile(){

const [form,setForm]=useState({
name:"",
email:"",
imageUrl:""
});


useEffect(()=>{

async function load(){

const snap=await getDoc(
doc(db,"admins","profile")
);


if(snap.exists()){
setForm(snap.data() as any);
}

}

load();

},[]);



async function save(){

await setDoc(
doc(db,"admins","profile"),
form
);


alert("Profile updated");

}



return(

<Layout>

<h1 className="text-3xl font-bold text-gray-900 mb-8">
Admin Profile
</h1>


<div className="bg-white p-6 rounded-xl shadow max-w-xl">


{form.imageUrl && (

<img
src={form.imageUrl}
className="w-24 h-24 rounded-full object-cover mb-5"
/>

)}



<input
className="w-full border p-3 mb-4 text-gray-900"
placeholder="Name"
value={form.name}
onChange={(e)=>
setForm({...form,name:e.target.value})
}
/>



<input
className="w-full border p-3 mb-4 text-gray-900"
placeholder="Email"
value={form.email}
onChange={(e)=>
setForm({...form,email:e.target.value})
}
/>



<input
className="w-full border p-3 mb-4 text-gray-900"
placeholder="Profile Image URL"
value={form.imageUrl}
onChange={(e)=>
setForm({...form,imageUrl:e.target.value})
}
/>



<button
onClick={save}
className="bg-blue-700 text-white px-6 py-3 rounded"
>
Save Profile
</button>


</div>


</Layout>

);

}
