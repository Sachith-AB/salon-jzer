
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
    title, 
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
        <div className="relative w-[400px] h-[400px] bg-black rounded-lg overflow-hidden shadow-2xl">
            {/* Video */}
            <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
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

            {/* Top Overlay - Title & Close */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-20">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        {title && (
                            <p className="text-white font-semibold text-sm truncate">
                                {title}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Play/Pause Button - Shown on hover or when paused */}
            <div
                className="absolute inset-0 flex items-center justify-center z-30 cursor-pointer group"
                onClick={togglePlayPause}
            >
                {!isPlaying && (
                    <div className="bg-white/30 hover:bg-white/50 rounded-full p-4 transition-colors">
                        <svg
                            className="w-12 h-12 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent z-10" />
        </div>
    )
}
