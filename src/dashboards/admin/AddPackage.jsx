import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, Package, ArrowLeft, Upload, CheckCircle2, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const AddPackage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        // Mock API call
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
            setTimeout(() => navigate('/admin/packages'), 2000)
        }, 1500)
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar - Consistent */}
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">GRAND ROYAL TOURS</span>
                    <span className="text-[10px] text-[#e30613] font-medium tracking-[0.2em] mt-1 uppercase">Admin Control Panel</span>
                </div>
            </aside>

            <main className="flex-grow flex flex-col p-12 overflow-y-auto">
                <header className="flex justify-between items-end mb-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4 mb-2">
                            <button onClick={() => navigate('/admin/packages')} className="text-gray-400 hover:text-[#e30613] transition-colors">
                                <ArrowLeft size={24} />
                            </button>
                            <span className="text-[#e30613] font-black text-[10px] uppercase tracking-widest">Inventory Management</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-[#1f2937]">Create New Package</h1>
                        <div className="w-16 h-1.5 bg-[#e30613] rounded-full" />
                    </div>
                </header>

                <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 relative group">

                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 rounded-[2.5rem]"
                            >
                                <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
                                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Package Created Successfully</h3>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Syncing to public website...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Left Column */}
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Package Name*</label>
                                <input type="text" required placeholder="Ex: Japan Group Tour 2026" className="form-input-premium" />
                            </div>

                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Main Destination*</label>
                                <input type="text" required placeholder="Ex: Japan" className="form-input-premium" />
                            </div>

                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Cities Covered</label>
                                <input type="text" placeholder="Ex: Tokyo, Kyoto, Osaka" className="form-input-premium" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2 group/field">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Duration*</label>
                                    <input type="text" required placeholder="Ex: 7 Days / 6 Nights" className="form-input-premium" />
                                </div>
                                <div className="flex flex-col gap-2 group/field">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Current Status</label>
                                    <select className="form-input-premium cursor-pointer">
                                        <option value="Active">Active</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                        <option value="Hot Deal">Hot Deal</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 group/field h-full">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Upload High-Res Image*</label>
                                <div className="border-2 border-dashed border-gray-100 rounded-3xl h-full min-h-[250px] flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-[#e30613]/5 hover:border-[#e30613]/20 transition-all cursor-pointer group/upload">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#e30613] shadow-lg group-hover/upload:scale-110 transition-transform">
                                        <Upload size={24} />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-gray-800">Drag & Drop Image</span>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">PNG, JPG up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Full Width */}
                        <div className="md:col-span-2 flex flex-col gap-4">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Detailed Description</label>
                                <textarea rows="6" placeholder="Describe the itinerary and highlights..." className="form-input-premium resize-none"></textarea>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#e30613] text-white px-10 py-4 rounded-xl font-black text-lg shadow-xl shadow-red-600/20 hover:bg-[#c40510] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : 'Publish Package'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/packages')}
                                    className="bg-gray-100 text-gray-500 px-10 py-4 rounded-xl font-black text-lg hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            {/* Global CSS for form inputs in this page */}
            <style>{`
         .form-input-premium {
            background-color: #f9fafb;
            border: 1px solid #f3f4f6;
            padding: 1rem 1.25rem;
            border-radius: 0.75rem;
            font-size: 0.875rem;
            font-weight: 600;
            color: #1f2937;
            transition: all 0.3s;
         }
         .form-input-premium:focus {
            outline: none;
            background-color: white;
            border-color: #e30613;
            box-shadow: 0 0 0 4px rgba(227, 6, 19, 0.05);
         }
      `}</style>
        </div>
    )
}

export default AddPackage
