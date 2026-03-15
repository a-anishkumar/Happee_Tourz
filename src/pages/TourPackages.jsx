import React, { useState, useEffect } from 'react'
import PackageCard from '../components/PackageCard'
import { getPackages } from '../services/api'
import { Search, Filter, Loader2 } from 'lucide-react'

const TourPackages = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('All')
    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true)
                const data = await getPackages()
                setPackages(data)
            } catch (err) {
                console.error('Error fetching packages:', err)
                setError('Failed to load packages. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        fetchPackages()
    }, [])

    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = (pkg.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (pkg.destination || '').toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filter === 'All' || pkg.status === filter || (filter === 'International' && pkg.destination !== 'India')
        return matchesSearch && matchesFilter
    })

    const categories = ['All', 'Active', 'Coming Soon', 'International', 'India']

    return (
        <div className="flex flex-col w-full bg-white min-h-screen">
            {/* Hero Banner */}
            <section
                className="relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e2229 0%, #2d3748 50%, #1e2229 100%)' }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}
                    className="relative z-10 flex flex-col items-center gap-10">
                    <div className="text-center flex flex-col gap-4">
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.4em] px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-2xl border border-white/20 inline-block mx-auto">Our Packages</span>
                        <h1 className="text-white text-4xl md:text-5xl font-black">All Tour Packages</h1>
                        <p className="text-gray-400 font-medium max-w-xl mx-auto">
                            Explore our wide range of meticulously planned tours designed to create sweet memories for a lifetime.
                        </p>
                    </div>

                    <div className="w-full max-w-3xl flex flex-col gap-5">
                        <div className="relative group/search">
                            <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/search:text-[#e30613] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by destination or package name..."
                                className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-5 pl-14 rounded-2xl text-white font-medium focus:outline-none focus:ring-4 focus:ring-[#e30613]/20 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all ${filter === cat
                                        ? 'bg-[#e30613] text-white shadow-xl shadow-red-600/20'
                                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid */}
            <div className="py-16 flex-grow">
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-40">
                            <Loader2 size={48} className="animate-spin text-[#e30613]" />
                            <p className="font-bold text-gray-800">Loading amazing tours...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-40">
                            <h3 className="text-2xl font-black text-red-600 tracking-tight">{error}</h3>
                        </div>
                    ) : filteredPackages.length > 0 ? (
                        <>
                            <p className="text-sm text-gray-500 font-semibold mb-8">{filteredPackages.length} Packages Found</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPackages.map((item) => (
                                    <PackageCard key={item.id} item={item} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 gap-6 opacity-40">
                            <Filter size={64} className="text-[#e30613]" />
                            <h3 className="text-2xl font-black text-gray-800 tracking-tight">No matching packages found</h3>
                            <button onClick={() => { setSearchTerm(''); setFilter('All') }} className="text-[#e30613] font-bold underline">Reset Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TourPackages
