/**
 * services/inquiryService.js
 * All Supabase queries for the inquiries table.
 */

import supabase from '../config/supabase.js'

/**
 * Insert a new inquiry submitted from the public contact/inquiry form
 */
export const createInquiry = async (payload) => {
    const { data, error } = await supabase
        .from('inquiries')
        .insert([payload])
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Fetch all inquiries for the admin dashboard (newest first)
 */
export const getAllInquiries = async () => {
    const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

/**
 * Delete an inquiry by ID
 */
export const deleteInquiry = async (id) => {
    const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}
