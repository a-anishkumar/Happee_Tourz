import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, Package, MessageSquare, Users, Settings, LogOut, Key, Shield, User, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { changePassword } from '../../services/api'

const AdminSettings = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) navigate('/admin/login')
    }, [navigate])

    const handleInputChange = (e) => {
        setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' })
            return
        }

        setLoading(true)
        setMessage({ type: '', text: '' })

        try {
            await changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            })
            setMessage({ type: 'success', text: 'Password updated successfully! Redirecting to login...' })
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })

            // Logout after password change for security
            setTimeout(() => {
                localStorage.removeItem('adminToken')
                navigate('/admin/login')
            }, 3000)
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Failed to update password. Please check your current password.'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">Happee Tourz</span>
                    <span className="text-[10px] text-[#e30613] font-medium tracking-[0.2em] mt-1 uppercase">Admin Control Panel</span>
                </div>

                <nav className="flex flex-col gap-4">
                    <SidebarLink to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" />
                    <SidebarLink to="/admin/packages" icon={<Package size={20} />} label="Manage Packages" />
                    <SidebarLink to="/admin/testimonials" icon={<MessageSquare size={20} />} label="Manage Testimonials" />
                    <SidebarLink to="/admin/inquiries" icon={<Users size={20} />} label="User Inquiries" />
                    <SidebarLink to="/admin/settings" icon={<Settings size={20} />} label="Site Settings" active />
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-3 text-gray-500 hover:text-[#e30613] font-bold text-sm tracking-widest uppercase transition-all"
                >
                    <LogOut size={20} />
                    Logout Securely
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col p-12 overflow-y-auto">
                <header className="flex flex-col gap-2 mb-12">
                    <h1 className="text-4xl font-extrabold text-[#1f2937]">Site Settings</h1>
                    <div className="w-16 h-1.5 bg-[#e30613] rounded-full" />
                </header>

                <div className="max-w-4xl flex flex-col gap-12">
                    {/* Account Section */}
                    <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                                <User size={24} />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-extrabold text-[#1f2937]">Administrator Account</h2>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile Information</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Admin Email</label>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold text-gray-700">
                                    admin@happeetourz.com
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Role</label>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold text-[#e30613] flex items-center gap-2">
                                    <Shield size={16} />
                                    Super Administrator
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Security Section */}
                    <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-50 text-[#e30613] p-3 rounded-2xl">
                                <Key size={24} />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-extrabold text-[#1f2937]">Security & Password</h2>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Update your login credentials</span>
                            </div>
                        </div>

                        {message.text && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                                    }`}
                            >
                                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                {message.text}
                            </motion.div>
                        )}

                        <form onSubmit={handlePasswordChange} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    required
                                    value={passwords.currentPassword}
                                    onChange={handleInputChange}
                                    className="p-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e30613]/10 focus:border-[#e30613] transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        required
                                        value={passwords.newPassword}
                                        onChange={handleInputChange}
                                        className="p-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e30613]/10 focus:border-[#e30613] transition-all"
                                        placeholder="Min. 6 characters"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        value={passwords.confirmPassword}
                                        onChange={handleInputChange}
                                        className="p-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e30613]/10 focus:border-[#e30613] transition-all"
                                        placeholder="Repeat new password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 btn-red py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 disabled:opacity-50 transition-all font-black uppercase tracking-widest text-sm"
                            >
                                {loading ? 'Updating Credentials...' : 'Save New Password'}
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Shield size={18} />}
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    )
}

const SidebarLink = ({ to, icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-4 p-4 rounded-xl font-bold text-sm tracking-widest transition-all ${active
            ? 'bg-[#e30613] text-white shadow-xl shadow-red-600/20'
            : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
    >
        {icon}
        {label}
    </Link>
)

export default AdminSettings
