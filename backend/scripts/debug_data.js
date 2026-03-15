import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function debugData() {
    const { data, error } = await supabase.from('packages').select('id, title, image')
    if (error) {
        console.error(error)
        return
    }
    console.log('DATA_START')
    console.log(JSON.stringify(data))
    console.log('DATA_END')
}

debugData()
