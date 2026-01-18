import { SupabaseClient } from '@supabase/supabase-js'
import { Profile } from '../types'

export const users = {
    getUsers: async (supabase: SupabaseClient) => {
        return await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false })
            .returns<Profile[]>()
    },

    getUserProfile: async (supabase: SupabaseClient, userId: string) => {
        return await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()
    },

    updateUserRole: async (supabase: SupabaseClient, userId: string, newRole: 'owner' | 'consumer') => {
        return await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', userId)
    }
}
