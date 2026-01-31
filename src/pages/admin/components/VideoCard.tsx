import Button from "../../../components/Button"

interface VideoCardProps {
    id: string
    title: string
    videoUrl: string
    thumbnailUrl?: string
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
    onView?: (id: string) => void
}

export default function VideoCard({
    id,
    title,
    videoUrl,
    thumbnailUrl,
    onDelete,
}: VideoCardProps) {
    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
            {/* Video Preview */}
            <div className="relative w-full h-48 bg-black flex items-center justify-center">
                {videoUrl ? (
                    <video 
                        src={videoUrl}
                        controls
                        className="w-full h-full object-cover"
                        poster={thumbnailUrl}
                    />
                ) : (
                    <div className="text-gray-500 text-center">
                        <p>No video</p>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-4 line-clamp-2">
                    {title}
                </h3>
                {/* Actions */}
                <div className="flex justify-end w-full">
                    {onDelete && (
                        <Button
                            text="Delete"
                            size="sm"
                            variant="danger"
                            onClick={() => onDelete(id)}
                            className="min-w-fit"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
