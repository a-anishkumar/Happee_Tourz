import React from 'react'
import PackageCard from './PackageCard'
import { motion } from 'framer-motion'

const PackageGrid = ({ items, title, subtitle }) => {
    return (
        <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
            <div className="container">
                {(title || subtitle) && (
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        {subtitle && (
                            <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] mb-3 px-3 py-1 bg-red-50 rounded-full inline-block">
                                {subtitle}
                            </span>
                        )}
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1f2937] mt-3">
                                {title}
                            </h2>
                        )}
                        <div className="w-16 h-1.5 bg-[#e30613] mt-4 rounded-full mx-auto" />
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <PackageCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PackageGrid
