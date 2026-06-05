import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

const Features = () => {
  const features = [
    { 
      id: 1, 
      title: "Free Shipping", 
      desc: "On orders over 500 EGP", 
      icon: <Truck size={35} strokeWidth={1.5} /> 
    },
    { 
      id: 2, 
      title: "Secure Payment", 
      desc: "100% secure transactions", 
      icon: <ShieldCheck size={35} strokeWidth={1.5} /> 
    },
    { 
      id: 3, 
      title: "Easy Returns", 
      desc: "14 day return policy", 
      icon: <RefreshCw size={35} strokeWidth={1.5} /> 
    },
    { 
      id: 4, 
      title: "24/7 Support", 
      desc: "Dedicated support team", 
      icon: <Headphones size={35} strokeWidth={1.5} /> 
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div 
            key={f.id} 
            className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
          >
            {/* أيقونة خضراء */}
            <div className="text-green-600 mt-1 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg leading-tight">{f.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;