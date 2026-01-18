export interface Profile {
    id: string
    email: string
    full_name: string | null
    role: 'owner' | 'consumer'
    avatar_url: string | null
    created_at: string
}
