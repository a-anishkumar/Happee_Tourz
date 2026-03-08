/**
 * services/packageService.js
 * All Supabase queries for the packages table.
 */

import supabase from '../config/supabase.js'

/**
 * Fetch all packages, ordered by creation date (newest first)
 */
export const getAllPackages = async () => {
    const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

/**
 * Fetch a single package by ID
 */
export const getPackageById = async (id) => {
    const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

/**
 * Create a new package
 * @param {Object} payload - Package fields from the request body
 */
export const createPackage = async (payload) => {
    const { data, error } = await supabase
        .from('packages')
        .insert([payload])
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Update an existing package
 * @param {string} id - Package UUID
 * @param {Object} payload - Fields to update
 */
export const updatePackage = async (id, payload) => {
    const { data, error } = await supabase
        .from('packages')
        .update(payload)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

/**
 * Delete a package by ID
 * @param {string} id - Package UUID
 */
export const deletePackage = async (id) => {
    const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}
