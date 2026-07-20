"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function EventsPage(){

  const [events,setEvents] = useState<any[]>([]);


  async function loadEvents(){

    const snapshot = await getDocs(
      collection(db,"events")
    );


    setEvents(
      snapshot.docs.map((item)=>({
        id:item.id,
        ...item.data()
      }))
    );

  }


  useEffect(()=>{
    loadEvents();
  },[]);



  return(

    <main className="min-h-screen bg-gray-100 py-20 px-6">

      <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
        Upcoming Events
      </h1>


      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">


        {events.map((event)=>(

          <div
            key={event.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            {event.imageUrl && (
              <img
                src={event.imageUrl}
                className="w-full h-52 object-cover"
              />
            )}


            <div className="p-6">

              <h2 className="text-2xl font-bold text-gray-900">
                {event.title}
              </h2>


              <p className="text-gray-700 mt-3">
                📅 {event.date}
              </p>


              <p className="text-gray-700">
                🕒 {event.time}
              </p>


              <p className="text-gray-700">
                📍 {event.location}
              </p>


              <p className="text-gray-600 mt-4">
                {event.description}
              </p>


            </div>


          </div>

        ))}


      </div>


    </main>

  );

}
