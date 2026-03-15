import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function absoluteFix() {
    console.log('🚀 Starting Absolute Image Fix...\n')

    // 1. Fetch current packages to see what we're dealing with
    const { data: currentPackages } = await supabase.from('packages').select('id, title')

    // 2. Define the fixes
    const fixes = [
        {
            patterns: ['malaysia', 'singapore'],
            image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1080&q=80'
        },
        {
            patterns: ['japan'],
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1080&q=80'
        },
        {
            patterns: ['india', 'rajasthan'],
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1080&q=80'
        },
        {
            patterns: ['bali'],
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1080&q=80'
        },
        {
            patterns: ['egypt'],
            image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1080&q=80'
        },
        {
            patterns: ['vietnam'],
            image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1080&q=80'
        }
    ]

    for (const pkg of currentPackages) {
        const matchingFix = fixes.find(f =>
            f.patterns.some(p => pkg.title.toLowerCase().includes(p))
        )

        if (matchingFix) {
            console.log(`📡 Updating "${pkg.title}" with new image...`)
            const { error } = await supabase
                .from('packages')
                .update({ image: matchingFix.image })
                .eq('id', pkg.id)

            if (error) console.error(`   ❌ Failed: ${error.message}`)
            else console.log('   ✅ Success!')
        }
    }

    console.log('\n✨ Absolute Fix Complete.')
    process.exit(0)
}

absoluteFix()
