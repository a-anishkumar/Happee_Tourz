/**
 * Fix broken package image URLs in Supabase
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

const imageFixes = [
    {
        title: 'Malaysia And Singapore Tour With Cruise',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80'
    },
    {
        title: 'Japan Group Tour Ex BLR',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80'
    },
    {
        title: 'Bali Group Tour Ex CBE',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80'
    },
    {
        title: 'Rajasthan Group Tour Ex BLR',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80'
    },
    {
        title: 'Egypt Group Tour Ex CBE',
        image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80'
    },
    {
        title: 'Vietnam And Cambodia Heritage Group Tour',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80'
    }
]

async function fixImages() {
    console.log('🔧 Fixing package image URLs...\n')

    for (const fix of imageFixes) {
        const { error } = await supabase
            .from('packages')
            .update({ image: fix.image })
            .eq('title', fix.title)

        if (error) {
            console.error(`❌ Failed to update "${fix.title}":`, error.message)
        } else {
            console.log(`✅ Updated: ${fix.title}`)
        }
    }

    console.log('\n✨ Done! All package images updated.')
    process.exit(0)
}

fixImages().catch(err => {
    console.error('❌ Error:', err)
    process.exit(1)
})
