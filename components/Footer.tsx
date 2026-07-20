"use client";

import {useEffect,useState} from "react";
import {doc,getDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";


export default function Footer(){

const [footer,setFooter]=useState<any>({
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

setFooter(snap.data());

}

}

load();

},[]);



return(

<footer className="bg-gray-900 text-white py-10 px-6">


<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">


<div>

<h2 className="text-2xl font-bold mb-4">
Grace Church
</h2>


<p className="text-gray-300">
{footer.description}
</p>

</div>



<div>

<h3 className="font-bold text-xl mb-4">
Quick Links
</h3>


<p>About</p>
<p>Ministries</p>
<p>Sermons</p>
<p>Events</p>

</div>



<div>

<h3 className="font-bold text-xl mb-4">
Follow Us
</h3>


{footer.facebook && (
<a href={footer.facebook}>
Facebook
</a>
)}


<br/>


{footer.instagram && (
<a href={footer.instagram}>
Instagram
</a>
)}


<br/>


{footer.youtube && (
<a href={footer.youtube}>
YouTube
</a>
)}


</div>


</div>



<div className="text-center mt-8 border-t border-gray-700 pt-5 text-gray-400">

{footer.copyright}

</div>


</footer>

);

}
