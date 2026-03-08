import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, ArrowUp } from 'lucide-react'

const Footer = () => {
    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Company', path: '/company' },
        { name: 'Group Tour Packages', path: '/group-tour-packages' },
        { name: 'Tour Packages', path: '/tour-packages' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Contact', path: '/contact' },
    ]

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="w-full bg-[#1e2229] text-gray-300">
            {/* Main Footer Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px 40px' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* About Column */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-white leading-none">Happee Tourz</span>
                        <span className="text-sm font-bold text-white leading-tight">and Travels</span>
                        <span className="text-[10px] text-[#e30613] font-medium tracking-[0.2em] mt-1">ERODE · TAMIL NADU</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Your trusted travel partner based in Erode, Tamil Nadu. Specializing in domestic and international tours — group tours, family holidays, honeymoon packages, and customized travel experiences crafted to create lifelong memories.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-5">
                    <h4 className="text-white text-lg font-bold border-b-2 border-[#e30613] pb-2 w-fit">Quick Links</h4>
                    <ul className="flex flex-col gap-3">
                        {quickLinks.map((link) => (
                            <li key={link.name}>
                                <Link to={link.path} className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-5">
                    <h4 className="text-white text-lg font-bold border-b-2 border-[#e30613] pb-2 w-fit">Contact Us</h4>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-[#e30613] shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Call Us</span>
                                <a href="tel:+919159973503" className="text-sm text-white font-bold hover:text-[#e30613] transition-colors">+91 91599 73503</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-[#e30613] shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Email Us</span>
                                <a href="mailto:info@happeetourz.com" className="text-sm text-gray-400 hover:text-white transition-colors">info@happeetourz.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-800 py-5">
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}
                    className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">
                    <span>© Copyright 2026 Happee Tourz and Travels. All rights reserved.</span>
                    <div className="flex gap-4 uppercase font-bold tracking-widest text-[#e30613] text-[10px]">
                        <span className="cursor-pointer hover:text-red-400 transition-colors">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-red-400 transition-colors">Terms & Conditions</span>
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
                <button
                    onClick={scrollToTop}
                    className="bg-[#e30613] text-white p-3 rounded shadow-lg hover:bg-[#c40510] transition-colors"
                >
                    <ArrowUp size={20} />
                </button>
                <a
                    href="https://wa.me/919159973503"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </a>
            </div>
        </footer>
    )
}

export default Footer
