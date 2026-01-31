
import { useEffect, useRef, useState } from 'react'

interface StoryCardProps {
    id: string
    videoUrl: string
    title?: string
    duration?: number // in seconds
    onEnded?: (id: string) => void
}

export default function StoryCard({ 
    id, 
    videoUrl, 
    onEnded 
}: StoryCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [progress, setProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateProgress = () => {
            const current = (video.currentTime / video.duration) * 100
            setProgress(current)
        }

        const handleEnded = () => {
            setIsPlaying(false)
            if (onEnded) {
                onEnded(id)
            }
        }

        video.addEventListener('timeupdate', updateProgress)
        video.addEventListener('ended', handleEnded)

        return () => {
            video.removeEventListener('timeupdate', updateProgress)
            video.removeEventListener('ended', handleEnded)
        }
    }, [id, onEnded])

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-2xl">
            {/* Video */}
            <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
                onClick={togglePlayPause}
            />

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700 z-10">
                <div
                    className="h-full bg-white transition-all duration-100"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}
