import {
  Building2,
  ShieldCheck,
  Users,
  BarChart3,
} from "lucide-react";


const Trustedcustomers = () => {
    return (
        <div>
            

<section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
  <div className="max-w-7xl mx-auto px-4">

    {/* Section Header */}
    <div className="text-center mb-14">
      <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-semibold">
        Platform Insights
      </span>

      <h2 className="mt-5 text-4xl md:text-5xl font-black text-white">
        Trusted Rental Platform
      </h2>

      <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
        Thousands of property owners and tenants trust our platform
        every day to find the perfect rental solution.
      </p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Rental Statistics */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5">
            <BarChart3 className="text-blue-400" size={28} />
          </div>

          <h3 className="text-4xl font-black text-white">
            5K+
          </h3>

          <p className="text-slate-400 mt-2">
            Rental Statistics
          </p>
        </div>
      </div>

      {/* Trusted Owners */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5">
            <ShieldCheck className="text-emerald-400" size={28} />
          </div>

          <h3 className="text-4xl font-black text-white">
            2K+
          </h3>

          <p className="text-slate-400 mt-2">
            Trusted Owners
          </p>
        </div>
      </div>

      {/* Happy Tenants */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-5">
            <Users className="text-purple-400" size={28} />
          </div>

          <h3 className="text-4xl font-black text-white">
            10K+
          </h3>

          <p className="text-slate-400 mt-2">
            Happy Tenants
          </p>
        </div>
      </div>

      {/* Available Properties */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-5">
            <Building2 className="text-orange-400" size={28} />
          </div>

          <h3 className="text-4xl font-black text-white">
            3.5K+
          </h3>

          <p className="text-slate-400 mt-2">
            Available Properties
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
            
        </div>
    );
};

export default Trustedcustomers;