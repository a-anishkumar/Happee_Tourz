/**
 * scripts/seed.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Run this ONCE after setting up your Supabase tables to:
 *   1. Create the initial admin user (admin@happeetourz.com / admin123)
 *   2. Seed all 6 tour packages from the original JSON data
 *   3. Seed all 6 testimonials from the original JSON data
 *
 * Usage:
 *   cd backend
 *   node scripts/seed.js
 *
 * ⚠️  Make sure your .env is configured first!
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

// ─── Admin User ───────────────────────────────────────────────────────────────

const adminUser = {
    email: 'admin@happeetourz.com',
    password: 'admin123',  // Change this after first login!
}

// ─── Packages ─────────────────────────────────────────────────────────────────

const packages = [
    {
        title: 'Japan Group Tour Ex BLR',
        destination: 'Japan',
        cities: 'Tokyo, Kyoto, Osaka, Nara, Hakone',
        duration: '7 Days / 6 Nights',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        status: 'Active',
        hot_deal: true,
        description: 'Experience the perfect blend of ancient traditions and ultra-modern cities. Visit iconic landmarks including Mt. Fuji, Senso-ji Temple, and the bamboo forests of Arashiyama.',
    },
    {
        title: 'Malaysia And Singapore Tour With Cruise',
        destination: 'Malaysia & Singapore',
        cities: 'Kuala Lumpur, Genting, Singapore, Cruise',
        duration: '7 Days / 6 Nights',
        image: 'https://images.unsplash.com/photo-1525625239114-987448227038?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        status: 'Active',
        hot_deal: false,
        description: 'Explore the vibrant twin cities with a luxury cruise experience. Visit Petronas Towers, Batu Caves, Universal Studios Singapore, and enjoy a spectacular cruise.',
    },
    {
        title: 'Bali Group Tour Ex CBE',
        destination: 'Bali',
        cities: 'Ubud, Kuta, Seminyak, Canggu',
        duration: '6 Days / 5 Nights',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        status: 'Coming Soon',
        hot_deal: false,
        description: 'Discover the island of gods — lush rice terraces, ancient temples, world-class surfing beaches, and vibrant nightlife await you in beautiful Bali.',
    },
    {
        title: 'Rajasthan Group Tour Ex BLR',
        destination: 'Rajasthan, India',
        cities: 'Jaipur, Jodhpur, Udaipur, Jaisalmer',
        duration: '8 Days / 7 Nights',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        status: 'Active',
        hot_deal: true,
        description: 'A royal journey through the Land of Kings. Palace hotels, desert safaris, folk music evenings, and the majestic Amber Fort await on this premium cultural tour.',
    },
    {
        title: 'Egypt Group Tour Ex CBE',
        destination: 'Egypt',
        cities: 'Cairo, Luxor, Aswan, Nile Cruise',
        duration: '9 Days / 8 Nights',
        image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        status: 'Active',
        hot_deal: false,
        description: 'Walk in the footsteps of the Pharaohs. See the Great Pyramids of Giza, the Sphinx, Valley of the Kings, and cruise the legendary Nile River in style.',
    },
    {
        title: 'Vietnam And Cambodia Heritage Group Tour',
        destination: 'Vietnam & Cambodia',
        cities: 'Hanoi, Ha Long Bay, Ho Chi Minh, Siem Reap',
        duration: '10 Days / 9 Nights',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        status: 'Coming Soon',
        hot_deal: false,
        description: 'A spectacular journey through two countries rich in history. Cruise Ha Long Bay, explore the ancient temples of Angkor Wat, and savor incredible street food.',
    },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
    {
        name: 'Devi A',
        date: '2 days ago',
        review: 'I recently visited Tower Place Antarctica with Happee Tourz. We are from First Choi... We had an amazing experience with the team. Highly recommended!',
        image: 'https://i.pravatar.cc/150?u=devi',
        rating: 5,
    },
    {
        name: 'Kumar Durai',
        date: '5 days ago',
        review: 'Wonderful organizations for Thailand trip by our guide Mr. Syed bhai, well planned and well coordinated. Every moment was a joy. Thank you Happee Tourz!',
        image: 'https://i.pravatar.cc/150?u=kumar',
        rating: 5,
    },
    {
        name: 'Vasantakumari Babu',
        date: '1 day ago',
        review: 'We had been to Thailand recently through Happee Tourz And Travels. We had visited Pattaya and Bangkok. The hotels were premium and the food was delicious.',
        image: 'https://i.pravatar.cc/150?u=vasanta',
        rating: 5,
    },
    {
        name: 'Palaniappan Mani',
        date: '3 days ago',
        review: 'Very well organized and executed trips. Good team and good coordination. Really enjoyed our Dubai tour. The desert safari was the highlight!',
        image: 'https://i.pravatar.cc/150?u=palani',
        rating: 5,
    },
    {
        name: 'Anitha Raj',
        date: '1 week ago',
        review: 'Our Europe trip was a dream come true. Everything from visas to sightseeing was perfectly handled by the Happee Tourz team. Excellent service.',
        image: 'https://i.pravatar.cc/150?u=anitha',
        rating: 5,
    },
    {
        name: 'Suresh Kumar',
        date: '2 weeks ago',
        review: 'Professional tour operator. We took the Bali group package and it was worth every penny. The group was fun and the guide was very knowledgeable.',
        image: 'https://i.pravatar.cc/150?u=suresh',
        rating: 5,
    },
]

// ─── Seed Functions ───────────────────────────────────────────────────────────

async function seedAdminUser() {
    console.log('\n👤 Seeding admin user...')

    // Check if admin already exists
    const { data: existing } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', adminUser.email)
        .single()

    if (existing) {
        console.log('  ✅ Admin user already exists, skipping.')
        return
    }

    const password_hash = await bcrypt.hash(adminUser.password, 12)

    const { error } = await supabase
        .from('admin_users')
        .insert([{ email: adminUser.email, password_hash }])

    if (error) {
        console.error('  ❌ Failed to create admin user:', error.message)
    } else {
        console.log(`  ✅ Admin user created: ${adminUser.email} / password: ${adminUser.password}`)
    }
}

async function seedPackages() {
    console.log('\n📦 Seeding packages...')

    const { count } = await supabase
        .from('packages')
        .select('*', { count: 'exact', head: true })

    if (count > 0) {
        console.log(`  ✅ ${count} packages already exist, skipping.`)
        return
    }

    const { error } = await supabase.from('packages').insert(packages)

    if (error) {
        console.error('  ❌ Failed to seed packages:', error.message)
    } else {
        console.log(`  ✅ ${packages.length} packages seeded successfully.`)
    }
}

async function seedTestimonials() {
    console.log('\n💬 Seeding testimonials...')

    const { count } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })

    if (count > 0) {
        console.log(`  ✅ ${count} testimonials already exist, skipping.`)
        return
    }

    const { error } = await supabase.from('testimonials').insert(testimonials)

    if (error) {
        console.error('  ❌ Failed to seed testimonials:', error.message)
    } else {
        console.log(`  ✅ ${testimonials.length} testimonials seeded successfully.`)
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('🌱 Starting Happee Tourz database seed...')
    console.log(`   Supabase URL: ${process.env.SUPABASE_URL}`)

    await seedAdminUser()
    await seedPackages()
    await seedTestimonials()

    console.log('\n✨ Seed complete! Your database is ready.\n')
    process.exit(0)
}

main().catch(err => {
    console.error('\n❌ Seed failed:', err)
    process.exit(1)
})
