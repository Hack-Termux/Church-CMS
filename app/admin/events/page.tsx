"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "@/components/admin/Layout";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
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


  async function deleteEvent(id:string){

    await deleteDoc(
      doc(db,"events",id)
    );

    loadEvents();

  }


  useEffect(()=>{
    loadEvents();
  },[]);



  return(
    <Layout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Events
        </h1>


        <Link
          href="/admin/events/new"
          className="bg-blue-700 text-white px-5 py-3 rounded"
        >
          + Add Event
        </Link>

      </div>


      <div className="grid md:grid-cols-2 gap-6">


        {events.map((event)=>(

          <div
            key={event.id}
            className="bg-white rounded-xl shadow p-6"
          >

            {event.imageUrl && (
              <img
                src={event.imageUrl}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}


            <h2 className="text-xl font-bold text-gray-900">
              {event.title}
            </h2>


            <p className="text-gray-700">
              📅 {event.date}
            </p>


            <p className="text-gray-700">
              📍 {event.location}
            </p>


            <p className="text-gray-600 mt-3">
              {event.description}
            </p>


            <div className="flex gap-3 mt-5">

              <Link
                href={`/admin/events/edit?id=${event.id}`}
                className="bg-blue-700 text-white px-4 py-2 rounded"
              >
                Edit
              </Link>


              <button
                onClick={()=>deleteEvent(event.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>


          </div>

        ))}


      </div>


    </Layout>
  );

}
