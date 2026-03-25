import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Lock, User, ShieldAlert, ArrowRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError('Access Denied: Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ikea-black flex items-center justify-center p-6 f-sans">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-ikea-blue" />
        
        <div className="w-16 h-16 bg-ikea-gray rounded-2xl flex items-center justify-center text-ikea-blue mb-10">
           <ShieldAlert size={32} />
        </div>

        <h1 className="text-4xl font-black text-ikea-black tracking-tighter mb-4 uppercase">Command Center</h1>
        <p className="text-ikea-darkGray mb-12 font-medium">Access Restricted to Authorized Personnel Only</p>

        <form onSubmit={handleLogin} className="space-y-8 text-start">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">Identifier</label>
            <div className="relative">
              <User size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-ikea-darkGray" />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-ikea-gray py-5 pl-16 pr-8 rounded-2xl outline-none font-black"
                placeholder="system@forestedge.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">Access Code</label>
            <div className="relative">
              <Lock size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-ikea-darkGray" />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-ikea-gray py-5 pl-16 pr-8 rounded-2xl outline-none font-black"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-[11px] font-black uppercase text-center">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-ikea-blue text-white py-6 rounded-full font-black uppercase tracking-widest hover:bg-[#00478b] transition-all flex items-center justify-center gap-4 shadow-xl"
          >
            {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : 'INITIALIZE SESSION'}
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
