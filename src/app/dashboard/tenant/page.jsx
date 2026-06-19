

const page = () => {
    return (
        <div>
            <div className="grid md:grid-cols-3 gap-6">

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h3 className="text-slate-400">Total Bookings</h3>
    <h1 className="text-4xl font-bold text-white mt-2">12</h1>
  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h3 className="text-slate-400">Favorites</h3>
    <h1 className="text-4xl font-bold text-pink-500 mt-2">8</h1>
  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h3 className="text-slate-400">Paid Amount</h3>
    <h1 className="text-4xl font-bold text-green-500 mt-2">
      ৳25,000
    </h1>
  </div>

</div>
            
        </div>
    );
};

export default page;