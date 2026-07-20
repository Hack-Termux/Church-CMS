"use client";

import {useEffect,useState} from "react";
import Layout from "@/components/admin/Layout";
import StatCard from "@/components/admin/StatCard";
import {collection,getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase";


export default function Admin(){


const [stats,setStats]=useState({
events:0,
sermons:0,
announcements:0,
prayers:0,
gallery:0
});



useEffect(()=>{


async function loadStats(){


const events = await getDocs(
collection(db,"events")
);


const sermons = await getDocs(
collection(db,"sermons")
);


const announcements = await getDocs(
collection(db,"announcements")
);


const prayers = await getDocs(
collection(db,"prayerRequests")
);


const gallery = await getDocs(
collection(db,"gallery")
);



setStats({

events:events.size,
sermons:sermons.size,
announcements:announcements.size,
prayers:prayers.size,
gallery:gallery.size

});


}


loadStats();


},[]);



return(

<Layout>


<h1 className="text-3xl font-bold text-gray-900 mb-8">
Dashboard
</h1>



<div className="grid md:grid-cols-5 gap-5">


<StatCard
title="Events"
value={stats.events}
/>


<StatCard
title="Sermons"
value={stats.sermons}
/>


<StatCard
title="Announcements"
value={stats.announcements}
/>


<StatCard
title="Prayer Requests"
value={stats.prayers}
/>


<StatCard
title="Gallery"
value={stats.gallery}
/>



</div>



</Layout>

);

}
