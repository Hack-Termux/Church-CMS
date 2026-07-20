import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function Events() {
  const snapshot = await getDocs(collection(db, "events"));

  const events = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {events.map((event: any) => (
            <div key={event.id} className="p-6 rounded-xl shadow bg-gray-50">

              <h3 className="text-xl font-bold text-blue-700">
                {event.title}
              </h3>

              <p>📅 {event.date}</p>
              <p>🕒 {event.time}</p>
              <p>📍 {event.location}</p>

              <p className="mt-4 text-gray-600">
                {event.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
