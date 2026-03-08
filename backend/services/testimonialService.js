/**
 * services/testimonialService.js
 * All Supabase queries for the testimonials table.
 */

import supabase from '../config/supabase.js'

export const getAllTestimonials = async () => {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

export const getTestimonialById = async (id) => {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

export const createTestimonial = async (payload) => {
    const { data, error } = await supabase
        .from('testimonials')
        .insert([payload])
        .select()
        .single()

    if (error) throw error
    return data
}

export const updateTestimonial = async (id, payload) => {
    const { data, error } = await supabase
        .from('testimonials')
        .update(payload)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

export const deleteTestimonial = async (id) => {
    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}
