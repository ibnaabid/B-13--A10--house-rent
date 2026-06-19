const homes = [
  {
    title: "Modern Apartment",
    price: "$500/month",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    title: "Luxury Villa",
    price: "$1200/month",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
  },
  {
    title: "Family House",
    price: "$800/month",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  },
];

const PopularHomes = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <h2 className="text-3xl font-black text-center text-slate-900">
          Popular Homes
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {homes.map((home, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={home.img}
                alt={home.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-bold text-lg">{home.title}</h3>
                <p className="text-blue-600 font-semibold mt-2">
                  {home.price}
                </p>

                <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularHomes;