import { SupabaseClient } from '@supabase/supabase-js'

export const auth = {
    signOut: async (supabase: SupabaseClient) => {
        return await supabase.auth.signOut()
    },

    getUser: async (supabase: SupabaseClient) => {
        return await supabase.auth.getUser()
    },

    signInWithPassword: async (supabase: SupabaseClient, credentials: { email: string; password: string }) => {
        return await supabase.auth.signInWithPassword(credentials)
    },

    signUp: async (supabase: SupabaseClient, credentials: { email: string; password: string; options?: any }) => {
        return await supabase.auth.signUp(credentials)
    },
}
