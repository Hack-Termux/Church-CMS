"use client";

import {useEffect,useState} from "react";
import {doc,getDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";


export default function ContactPage(){

const [contact,setContact]=useState<any>({
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

setContact(snap.data());

}

}

load();

},[]);



return(

<main className="min-h-screen bg-gray-100 py-20 px-6">


<div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">


<h1 className="text-4xl font-bold text-gray-900 mb-8">
Contact Us
</h1>



<div className="space-y-5 text-gray-700">


<p>
📞 <b>Phone:</b> {contact.phone}
</p>


<p>
✉️ <b>Email:</b> {contact.email}
</p>


<p>
📍 <b>Address:</b> {contact.address}
</p>


<p>
⛪ <b>Service Times:</b> {contact.serviceTimes}
</p>


</div>



{contact.mapUrl && (

<a
href={contact.mapUrl}
target="_blank"
className="inline-block mt-8 bg-blue-700 text-white px-6 py-3 rounded"
>
Open Map
</a>

)}



</div>


</main>

);

}
