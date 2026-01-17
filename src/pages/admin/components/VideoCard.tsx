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
    onEdit,
    onDelete,
    onView
}: VideoCardProps) {
    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
            {/* Video Preview */}
            <div className="relative w-full h-48 bg-black flex items-center justify-center">
                {thumbnailUrl ? (
                    <img 
                        src={thumbnailUrl} 
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-gray-500 text-center">
                        <p>No thumbnail</p>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-4 line-clamp-2">
                    {title}
                </h3>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                    <Button
                        text="View"
                        size="sm"
                        variant="secondary"
                        onClick={() => onView?.(id)}
                        className="flex-1 min-w-fit"
                    />
                    {onEdit && (
                        <Button
                            text="Edit"
                            size="sm"
                            variant="primary"
                            onClick={() => onEdit(id)}
                            className="flex-1 min-w-fit"
                        />
                    )}
                    {onDelete && (
                        <Button
                            text="Delete"
                            size="sm"
                            variant="danger"
                            onClick={() => onDelete(id)}
                            className="flex-1 min-w-fit"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
