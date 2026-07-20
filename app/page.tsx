"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Link from "next/link";
import {useEffect,useState} from "react";
import {collection,getDocs,limit,query} from "firebase/firestore";
import {db} from "@/lib/firebase";


export default function Home(){

const [events,setEvents]=useState<any[]>([]);
const [sermons,setSermons]=useState<any[]>([]);
const [announcements,setAnnouncements]=useState<any[]>([]);



useEffect(()=>{


async function load(){

const eventsSnap=await getDocs(
query(collection(db,"events"),limit(3))
);


const sermonsSnap=await getDocs(
query(collection(db,"sermons"),limit(3))
);


const announcementSnap=await getDocs(
query(collection(db,"announcements"),limit(3))
);



setEvents(
eventsSnap.docs.map(doc=>({
id:doc.id,
...doc.data()
}))
);


setSermons(
sermonsSnap.docs.map(doc=>({
id:doc.id,
...doc.data()
}))
);


setAnnouncements(
announcementSnap.docs.map(doc=>({
id:doc.id,
...doc.data()
}))
);


}


load();


},[]);



return(

<>

<Navbar/>

<Hero/>


{/* Events */}

<section className="py-16 bg-gray-100 px-6">

<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
Upcoming Events
</h2>


<div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

{events.map(event=>(

<div key={event.id}
className="bg-white p-5 rounded-xl shadow">

<h3 className="font-bold text-xl text-gray-900">
{event.title}
</h3>

<p className="text-gray-700">
📅 {event.date}
</p>

</div>

))}

</div>

</section>



{/* Sermons */}

<section className="py-16 px-6">

<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
Latest Sermons
</h2>


<div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

{sermons.map(sermon=>(

<div key={sermon.id}
className="bg-white p-5 rounded-xl shadow">

<h3 className="font-bold text-xl text-gray-900">
{sermon.title}
</h3>

<p className="text-gray-700">
By {sermon.preacher}
</p>

</div>

))}

</div>

</section>



{/* Announcements */}

<section className="py-16 bg-gray-100 px-6">

<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
Announcements
</h2>


<div className="max-w-4xl mx-auto space-y-5">

{announcements.map(item=>(

<div key={item.id}
className="bg-white p-5 rounded-xl shadow">

<h3 className="font-bold text-xl text-gray-900">
{item.title}
</h3>

<p className="text-gray-700">
{item.message}
</p>

</div>

))}

</div>

</section>


</>

);

}
