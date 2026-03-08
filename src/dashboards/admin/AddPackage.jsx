import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPackage } from '../../services/api'

const AddPackage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        title: '',
        destination: '',
        cities: '',
        duration: '',
        image: '',
        status: 'Active',
        hot_deal: false,
        description: '',
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await createPackage(form)
            setSuccess(true)
            setTimeout(() => navigate('/admin/packages'), 2000)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create package. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">HAPPEE TOURZ</span>
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

                <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 relative">
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 rounded-[2.5rem]"
                            >
                                <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
                                <h3 className="text-2xl font-black text-gray-800">Package Created Successfully!</h3>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Saved to database...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-xl text-sm font-semibold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-8">
                            <Field label="Package Name*">
                                <input name="title" type="text" required value={form.title} onChange={handleChange} placeholder="Ex: Japan Group Tour 2026" className="form-input-premium" />
                            </Field>
                            <Field label="Main Destination*">
                                <input name="destination" type="text" required value={form.destination} onChange={handleChange} placeholder="Ex: Japan" className="form-input-premium" />
                            </Field>
                            <Field label="Cities Covered">
                                <input name="cities" type="text" value={form.cities} onChange={handleChange} placeholder="Ex: Tokyo, Kyoto, Osaka" className="form-input-premium" />
                            </Field>
                            <Field label="Image URL">
                                <input name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://..." className="form-input-premium" />
                            </Field>
                            <div className="grid grid-cols-2 gap-6">
                                <Field label="Duration*">
                                    <input name="duration" type="text" required value={form.duration} onChange={handleChange} placeholder="Ex: 7 Days / 6 Nights" className="form-input-premium" />
                                </Field>
                                <Field label="Status">
                                    <select name="status" value={form.status} onChange={handleChange} className="form-input-premium cursor-pointer">
                                        <option value="Active">Active</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                    </select>
                                </Field>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input name="hot_deal" type="checkbox" checked={form.hot_deal} onChange={handleChange} className="w-4 h-4 text-[#e30613] rounded" />
                                <span className="text-sm font-bold text-gray-600">Mark as Hot Deal</span>
                            </label>
                        </div>

                        <div className="flex flex-col gap-8">
                            <Field label="Detailed Description" className="h-full">
                                <textarea name="description" rows="10" value={form.description} onChange={handleChange} placeholder="Describe the itinerary and highlights..." className="form-input-premium resize-none h-full" />
                            </Field>
                        </div>

                        <div className="md:col-span-2 flex gap-4 mt-6">
                            <button type="submit" disabled={loading} className="bg-[#e30613] text-white px-10 py-4 rounded-xl font-black text-lg shadow-xl shadow-red-600/20 hover:bg-[#c40510] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                                {loading ? 'Publishing...' : 'Publish Package'}
                            </button>
                            <button type="button" onClick={() => navigate('/admin/packages')} className="bg-gray-100 text-gray-500 px-10 py-4 rounded-xl font-black text-lg hover:bg-gray-200 transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>

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
                    width: 100%;
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

const Field = ({ label, children, className }) => (
    <div className={`flex flex-col gap-2 group/field ${className || ''}`}>
        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">{label}</label>
        {children}
    </div>
)

export default AddPackage
