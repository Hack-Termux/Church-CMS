"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";


function EditEvent(){

const params = useSearchParams();
const router = useRouter();

const id = params.get("id");


const [event,setEvent] = useState({
title:"",
date:"",
description:"",
image:""
});


useEffect(()=>{

async function load(){

if(!id) return;

const snap = await getDoc(
doc(db,"events",id)
);


if(snap.exists()){

setEvent(snap.data() as any);

}

}

load();

},[id]);



async function save(){

if(!id) return;

await updateDoc(
doc(db,"events",id),
event
);

alert("Event updated");

router.push("/admin/events");

}



return(

<div className="p-6">

<h1 className="text-3xl font-bold mb-6">
Edit Event
</h1>


<div className="bg-white p-6 rounded-xl shadow max-w-xl">


<input
className="w-full border p-3 mb-4"
placeholder="Event title"
value={event.title}
onChange={(e)=>
setEvent({...event,title:e.target.value})
}
/>


<input
className="w-full border p-3 mb-4"
placeholder="Date"
value={event.date}
onChange={(e)=>
setEvent({...event,date:e.target.value})
}
/>


<textarea
className="w-full border p-3 mb-4"
placeholder="Description"
value={event.description}
onChange={(e)=>
setEvent({...event,description:e.target.value})
}
/>


<input
className="w-full border p-3 mb-4"
placeholder="Image URL"
value={event.image}
onChange={(e)=>
setEvent({...event,image:e.target.value})
}
/>


<button
onClick={save}
className="bg-blue-700 text-white px-6 py-3 rounded"
>
Save Changes
</button>


</div>

</div>

);

}



export default function Page(){

return(

<Suspense fallback={<div>Loading...</div>}>

<EditEvent />

</Suspense>

);

}
