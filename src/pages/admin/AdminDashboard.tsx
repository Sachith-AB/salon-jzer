import { useState, useEffect } from 'react'
import Title from '../../components/Title'
import Button from '../../components/Button'
import LoadingState from './components/LoadingState'
import EmptyState from './components/EmptyState'
import { supabase } from '../../supabaseClient'
import VideoCard from './components/VideoCard'

interface Video {
    id: string
    name: string
    title: string
    video_url: string
    thumbnail_url?: string
    created_at: string
}

export default function AdminDashboard() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchVideos()
    }, [])

    const fetchVideos = async () => {
        try {
            setLoading(true)
            setError(null)

            const { data, error: fetchError } = await supabase
                .storage
                .from('videos')
                .list()

            if (fetchError) throw fetchError
console.log(data)

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
        } catch (err) {
            console.error('Error fetching videos:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch videos from storage')
        } finally {
            setLoading(false)
        }
    }
    const handleDelete = async (id: string) => {
        const video = videos.find(v => v.id === id)
        if (!video) return
        
        if (!window.confirm(`Delete "${video.title}"?`)) return

        try {
            const { error: deleteError } = await supabase
                .storage
                .from('videos')
                .remove([video.name])

            if (deleteError) throw deleteError

            setVideos(videos.filter(v => v.id !== id))
        } catch (err) {
            console.error('Error deleting video:', err)
            alert('Failed to delete video from storage')
        }
    }

    const handleEdit = (id: string) => {
        // Navigate to edit page or open modal
        console.log('Edit video:', id)
        // You can implement navigation here
    }

    const handleView = (id: string) => {
        // Navigate to view page or open modal
        console.log('View video:', id)
        // You can implement navigation here
    }

    return (
        <div className="min-h-screen bg-gray-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <Title
                        text="Video Management"
                        size="fvxl"
                        color="white"
                        weight={700}
                    />
                    <p className="text-gray-400 mt-2 mb-6">Manage and organize all videos in your collection</p>
                </div>

                {/* Action Button */}
                <div className="mb-8">
                    <Button
                        text="Upload New Video"
                        variant="primary"
                        size="lg"
                        onClick={() => console.log('Navigate to upload')}
                    />
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-4 rounded-lg mb-6">
                        <p className="font-semibold">Error</p>
                        <p>{error}</p>
                        <Button
                            text="Retry"
                            size="sm"
                            variant="accent"
                            onClick={fetchVideos}
                            className="mt-4"
                        />
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <LoadingState />
                ) : videos.length === 0 ? (
                    <EmptyState
                        title="No videos yet"
                        description="Start by uploading your first video to get started."
                        actionText="Upload Video"
                        onAction={() => console.log('Navigate to upload')}
                    />
                ) : (
                    <>
                        {/* Video Stats */}
                        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
                            <p className="text-gray-300">
                                <span className="font-semibold text-white">{videos.length}</span> video{videos.length !== 1 ? 's' : ''} found
                            </p>
                        </div>

                        {/* Videos Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    id={video.id}
                                    title={video.title}
                                    videoUrl={video.video_url}
                                    thumbnailUrl={video.thumbnail_url}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onView={handleView}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
