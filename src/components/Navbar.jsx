import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Company', path: '/company' },
        { name: 'Group Tour Packages', path: '/group-tour-packages' },
        { name: 'Tour Packages', path: '/tour-packages' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Contact', path: '/contact' },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <header className="w-full">
            {/* Main Nav */}
            <nav className={`w-full bg-white transition-all duration-300 shadow-sm ${isScrolled ? 'fixed top-0 z-50 py-2' : 'relative py-4'}`}>
                <div className="container flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center h-12">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-[#e30613] leading-none">Happee Tourz</span>
                            <span className="text-[11px] font-bold text-gray-700 leading-tight">and Travels</span>
                            <span className="text-[9px] text-gray-400 font-medium tracking-[0.15em]">ERODE · TAMIL NADU</span>
                        </div>
                    </Link>

                    {/* Nav Links Desktop */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-semibold relative transition-colors ${isActive(link.path) ? 'text-[#e30613]' : 'text-gray-700 hover:text-[#e30613]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="hidden lg:flex items-center gap-3 border-l pl-6 border-gray-200">
                        <div className="bg-[#e30613]/5 p-2 rounded-full">
                            <Phone className="text-[#e30613]" size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-semibold">To More Inquiry</span>
                            <span className="text-sm font-bold text-[#e30613]">+91 91599 73503</span>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 z-50 animate-fade-in shadow-xl">
                        <div className="container py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-base font-bold flex items-center justify-between ${isActive(link.path) ? 'text-[#e30613]' : 'text-gray-700'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100 mt-2">
                                <div className="flex items-center gap-3">
                                    <Phone className="text-[#e30613]" size={20} />
                                    <span className="font-bold">+91 91599 73503</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar
