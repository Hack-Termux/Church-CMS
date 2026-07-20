"use client";

import {useState} from "react";
import {addDoc,collection} from "firebase/firestore";
import {db} from "@/lib/firebase";


export default function PrayerPage(){

const [form,setForm]=useState({
name:"",
request:"",
date:new Date().toLocaleDateString(),
status:"Pending"
});


async function submit(){

await addDoc(
collection(db,"prayerRequests"),
form
);


alert("Prayer request submitted");


setForm({
name:"",
request:"",
date:new Date().toLocaleDateString(),
status:"Pending"
});

}



return(

<main className="min-h-screen bg-gray-100 py-20 px-6">


<div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">


<h1 className="text-3xl font-bold text-gray-900 mb-6">
Prayer Request
</h1>



<input
className="w-full border p-3 mb-4 text-gray-900"
placeholder="Your name (optional)"
value={form.name}
onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}
/>



<textarea
className="w-full border p-3 mb-4 text-gray-900 h-40"
placeholder="Write your prayer request"
value={form.request}
onChange={(e)=>
setForm({
...form,
request:e.target.value
})
}
/>



<button
onClick={submit}
className="bg-blue-700 text-white px-6 py-3 rounded"
>
Submit Prayer
</button>


</div>


</main>

);

}
