import React from 'react';
import { 
  BarChart3, Users, Package, ShoppingCart, 
  ArrowUpRight, ArrowDownRight, Activity, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-white rounded-[2.5rem] p-10 border border-ikea-gray shadow-sm hover:shadow-xl transition-all group">
    <div className="flex justify-between items-start mb-8">
       <div className="w-14 h-14 bg-ikea-gray rounded-2xl flex items-center justify-center text-ikea-blue group-hover:bg-ikea-blue group-hover:text-white transition-colors">
          <Icon size={28} />
       </div>
       <div className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}%
       </div>
    </div>
    <h3 className="text-[11px] font-black text-ikea-darkGray uppercase tracking-widest mb-2 opacity-60">{title}</h3>
    <p className="text-4xl font-black text-ikea-black tracking-tighter uppercase">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 md:p-12 space-y-12 text-start">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
         <div>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
               <span className="text-[10px] font-black text-ikea-blue uppercase tracking-widest underline decoration-2 underline-offset-4">System Operational</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-ikea-black tracking-tighter uppercase">Operations Hub</h1>
         </div>
         <div className="bg-ikea-gray px-6 py-4 rounded-2xl border border-ikea-gray flex items-center gap-4">
            <Globe size={18} className="text-ikea-blue" />
            <span className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray">Riyadh HQ Terminal</span>
         </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Revenue" value="450K SAR" change="12.5" icon={BarChart3} trend="up" />
        <StatCard title="Active Deployments" value="128" change="4.2" icon={Package} trend="up" />
        <StatCard title="Human Capital" value="1,042" change="0.8" icon={Users} trend="down" />
        <StatCard title="Success Rate" value="99.2%" change="2.1" icon={Activity} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 pt-12">
         <div className="bg-white rounded-[3.5rem] border border-ikea-gray p-12 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-12">
               <h3 className="text-2xl font-black tracking-tighter uppercase">Recent Activity Registry</h3>
               <button className="text-[11px] font-black text-ikea-blue uppercase tracking-widest hover:underline">Full Log Report</button>
            </div>
            <div className="space-y-6">
               {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-ikea-gray/30 hover:bg-ikea-gray/50 transition-all group">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-ikea-blue shadow-sm group-hover:shadow-md transition-shadow">
                           <ShoppingCart size={20} />
                        </div>
                        <div>
                           <p className="font-black text-sm uppercase tracking-tight">Order Captured #FE-2024-{1000 + i}</p>
                           <p className="text-[10px] font-bold text-ikea-darkGray opacity-60">Verified {i * 12}m ago</p>
                        </div>
                     </div>
                     <span className="text-sm font-black text-ikea-blue">{(Math.random() * 5000 + 1000).toFixed(0)} SAR</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-ikea-black text-white rounded-[3.5rem] p-12 space-y-12">
            <h3 className="text-2xl font-black tracking-tighter uppercase border-b border-white/10 pb-6">System Load</h3>
            <div className="space-y-10">
               {[
                  { label: 'Inventory Distribution', val: 75 },
                  { label: 'Network Latency', val: 12 },
                  { label: 'Logistics Queue', val: 88 },
               ].map((m, i) => (
                  <div key={i} className="space-y-4">
                     <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-60">
                        <span>{m.label}</span>
                        <span>{m.val}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${m.val}%` }}
                           className={`h-full ${m.val > 80 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-ikea-yellow'}`}
                        />
                     </div>
                  </div>
               ))}
            </div>
            <div className="pt-10">
               <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 text-center">FOREST EDGE INDUSTRIAL CORE</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
