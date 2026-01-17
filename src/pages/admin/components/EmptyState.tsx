import Button from '../../../components/Button'

interface EmptyStateProps {
    title: string
    description?: string
    actionText?: string
    onAction?: () => void
}

export default function EmptyState({
    title,
    description,
    actionText,
    onAction
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center max-w-md">
                <h3 className="text-2xl font-bold text-white mb-2">
                    {title}
                </h3>
                {description && (
                    <p className="text-gray-400 mb-6">
                        {description}
                    </p>
                )}
                {actionText && onAction && (
                    <Button
                        text={actionText}
                        onClick={onAction}
                        variant="primary"
                    />
                )}
            </div>
        </div>
    )
}
