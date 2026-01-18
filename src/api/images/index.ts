import { SupabaseClient } from '@supabase/supabase-js'

export const images = {
    // Placeholder for image related operations
    // Will be implemented when refactoring ImageManager to match its specific needs
    uploadImage: async (supabase: SupabaseClient, bucket: string, path: string, file: File) => {
        return await supabase.storage.from(bucket).upload(path, file)
    },

    getPublicUrl: (supabase: SupabaseClient, bucket: string, path: string) => {
        return supabase.storage.from(bucket).getPublicUrl(path)
    },

    deleteImage: async (supabase: SupabaseClient, bucket: string, path: string) => {
        return await supabase.storage.from(bucket).remove([path])
    },

    listImages: async (supabase: SupabaseClient, bucket: string, path: string = '', options?: any) => {
        return await supabase.storage.from(bucket).list(path, options)
    }
}
