"use client";

import {useEffect,useState} from "react";
import Layout from "@/components/admin/Layout";
import {db} from "@/lib/firebase";
import {doc,setDoc,getDoc} from "firebase/firestore";


export default function ContactSettings(){

const [form,setForm]=useState({
phone:"",
email:"",
address:"",
serviceTimes:"",
mapUrl:""
});



useEffect(()=>{

async function load(){

const snap=await getDoc(
doc(db,"settings","contact")
);


if(snap.exists()){
setForm(snap.data() as any);
}

}

load();

},[]);



async function save(){

await setDoc(
doc(db,"settings","contact"),
form
);


alert("Contact details updated");

}



return(

<Layout>

<h1 className="text-3xl font-bold text-gray-900 mb-8">
Contact Settings
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
Save Contact
</button>


</div>


</Layout>

);

}
