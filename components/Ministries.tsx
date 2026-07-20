export default function Ministries() {
  const ministries = [
    {
      title: "Worship Ministry",
      description:
        "Leading the church into God's presence through music, praise, and worship."
    },
    {
      title: "Youth Ministry",
      description:
        "Helping young people grow in faith, leadership, and purpose."
    },
    {
      title: "Outreach Ministry",
      description:
        "Serving communities and sharing God's love through action."
    },
    {
      title: "Children's Ministry",
      description:
        "Building a strong spiritual foundation for the next generation."
    },
    {
      title: "Prayer Ministry",
      description:
        "Creating a community dedicated to prayer and spiritual growth."
    },
    {
      title: "Media Ministry",
      description:
        "Sharing sermons, events, and God's message through digital platforms."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-100">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Our Ministries
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {ministries.map((ministry, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-3 text-blue-700">
                {ministry.title}
              </h3>

              <p className="text-gray-600">
                {ministry.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
