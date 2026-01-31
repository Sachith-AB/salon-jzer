import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { supabase } from '../../supabaseClient'
import { useFetchVideos } from '../../helper/fetchVideo'
import Title from '../../components/Title'
import Button from '../../components/Button'
import LoadingState from './components/LoadingState'
import EmptyState from './components/EmptyState'
import VideoCard from './components/VideoCard'
import ConfirmationModal from '../../components/ConfirmationModal'
import type { Video } from '../../interfaces/Video'

export default function AdminDashboard() {
    const navigate = useNavigate()
    const { videos, loading, error, refetch } = useFetchVideos()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [videoToDelete, setVideoToDelete] = useState<Video | null>(null)
    const handleDelete = async (id: string) => {
        const video = videos.find(v => v.id === id)
        if (video) {
            setVideoToDelete(video)
            setDeleteModalOpen(true)
        }
    }

    const confirmDelete = async () => {
        if (!videoToDelete) return

        try {
            const { error: deleteError } = await supabase
                .storage
                .from('videos')
                .remove([videoToDelete.name])

            if (deleteError) throw deleteError

            setDeleteModalOpen(false)
            setVideoToDelete(null)
            toast.success('Video deleted successfully!')
            refetch()
        } catch (err) {
            console.error('Error deleting video:', err)
            toast.error('Failed to delete video from storage')
        }
    }

    const cancelDelete = () => {
        setDeleteModalOpen(false)
        setVideoToDelete(null)
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
                        onClick={() => navigate("/admin-upload")}
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
                            onClick={refetch}
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
                        onAction={() => navigate("/admin-upload")}
                    />
                ) : (
                    <>
                        {/* Videos Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    id={video.id}
                                    title={video.title}
                                    videoUrl={video.video_url}
                                    thumbnailUrl={video.thumbnail_url}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            {
                deleteModalOpen && (
                    <ConfirmationModal onConfirm={confirmDelete} onCancel={cancelDelete}/>
                )
            }
        </div>
    )
}
