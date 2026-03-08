import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        // Mock login
        if (email === 'admin@royal.com' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true')
            navigate('/admin/dashboard')
        } else {
            alert('Invalid credentials')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                    <div className="bg-[#e30613] p-12 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-black/10 translate-y-full hover:translate-y-0 transition-transform duration-700" />
                        <ShieldCheck size={48} className="text-white mx-auto mb-4 relative z-10" />
                        <h2 className="text-white text-3xl font-black relative z-10">Admin Portal</h2>
                        <p className="text-white/70 text-sm font-medium relative z-10 mt-2 uppercase tracking-[0.2em]">Secure Authentication Required</p>
                    </div>

                    <form onSubmit={handleLogin} className="p-12 flex flex-col gap-8">
                        <div className="flex flex-col gap-2 group">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within:text-[#e30613] transition-colors">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-gray-50 border border-gray-100 p-4 pl-12 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:bg-white transition-all"
                                    placeholder="admin@royal.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 group">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within:text-[#e30613] transition-colors">Security Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full bg-gray-50 border border-gray-100 p-4 pl-12 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#e30613] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#e30613] text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-red-600/20 hover:bg-[#c40510] hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Enter Dashboard
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-gray-400 font-bold mt-8 uppercase tracking-widest">
                    Return to <a href="/" className="text-[#e30613] hover:underline">Happee Tourz Homepage</a>
                </p>
            </motion.div>
        </div>
    )
}

export default AdminLogin
