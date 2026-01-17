export default function LoadingState() {
    return (
        <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-primary rounded-full animate-spin"></div>
                <p className="text-gray-400 font-medium">Loading videos...</p>
            </div>
        </div>
    )
}
