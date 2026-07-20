export default function About() {
  return (
    <section className="py-20 px-6 bg-white">

      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-6 text-gray-900">
          About Grace Church
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Grace Church is a community built on faith, love, and service.
          Our mission is to help people discover God's purpose,
          grow spiritually, and impact the world around them.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To spread God's word and serve people with love.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To build a strong faith community that transforms lives.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">
              Our Values
            </h3>
            <p className="text-gray-600">
              Faith, integrity, compassion, and service.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
