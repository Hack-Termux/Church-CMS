"use client";

import {useEffect,useState} from "react";
import {collection,getDocs,updateDoc,doc} from "firebase/firestore";
import {db} from "@/lib/firebase";
import Layout from "@/components/admin/Layout";


export default function PrayerRequests(){

const [requests,setRequests]=useState<any[]>([]);


async function load(){

const snap=await getDocs(
collection(db,"prayerRequests")
);


setRequests(
snap.docs.map(item=>({
id:item.id,
...item.data()
}))
);

}


useEffect(()=>{
load();
},[]);



async function markAnswered(id:string){

await updateDoc(
doc(db,"prayerRequests",id),
{
status:"Answered"
}
);

load();

}



return(

<Layout>


<h1 className="text-3xl font-bold text-gray-900 mb-8">
Prayer Requests
</h1>



<div className="space-y-5">


{requests.map(item=>(

<div
key={item.id}
className="bg-white p-6 rounded-xl shadow"
>


<h2 className="font-bold text-gray-900">
{item.name || "Anonymous"}
</h2>


<p className="text-gray-700 mt-3">
{item.request}
</p>


<p className="text-gray-500 mt-3">
Status: {item.status}
</p>



<button
onClick={()=>markAnswered(item.id)}
className="bg-green-600 text-white px-4 py-2 rounded mt-4"
>
Mark Answered
</button>


</div>

))}


</div>


</Layout>

);

}
