import { supabase } from "../supabaseClient"
import { useEffect, useState } from "react"

interface Video {
    id: string
    name: string
    title: string
    video_url: string
    thumbnail_url?: string
    created_at: string
}

export const useFetchVideos = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [videos, setVideos] = useState<Video[]>([])

    const fetchVideos = async () => {
        try {
            setLoading(true)
            setError(null)

            const { data, error: fetchError } = await supabase
                .storage
                .from('videos')
                .list()

            if (fetchError) throw fetchError

            // Add minimum delay to ensure loading state is visible
            await new Promise(resolve => setTimeout(resolve, 500))

            const videoList = (data || [])
                .filter(file => !file.name.startsWith('.'))
                .map((file) => {
                    const publicUrl = supabase.storage
                        .from('videos')
                        .getPublicUrl(file.name).data.publicUrl

                    return {
                        id: file.id,
                        name: file.name,
                        title: file.name.replace(/\.[^/.]+$/, ''),
                        video_url: publicUrl,
                        thumbnail_url: undefined,
                        created_at: file.created_at || new Date().toISOString()
                    }
                })
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

            setVideos(videoList)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error('Error fetching videos:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch videos from storage')
        }
    }

    useEffect(() => {
        fetchVideos()
    }, [])

    return { videos, loading, error, refetch: fetchVideos }
}

// Legacy function for backward compatibility
export const fetchVideos = async (setLoading: (value: boolean) => void, setError: (value: string | null) => void, setVideos: (value: Video[]) => void) => {
    try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
            .storage
            .from('videos')
            .list()

        if (fetchError) throw fetchError

        const videoList = (data || [])
            .filter(file => !file.name.startsWith('.'))
            .map((file) => {
                const publicUrl = supabase.storage
                    .from('videos')
                    .getPublicUrl(file.name).data.publicUrl

                return {
                    id: file.id,
                    name: file.name,
                    title: file.name.replace(/\.[^/.]+$/, ''),
                    video_url: publicUrl,
                    thumbnail_url: undefined,
                    created_at: file.created_at || new Date().toISOString()
                }
            })
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

        setVideos(videoList)
        setLoading(false)
    } catch (err) {
        setLoading(false)
        console.error('Error fetching videos:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch videos from storage')
    } 
}