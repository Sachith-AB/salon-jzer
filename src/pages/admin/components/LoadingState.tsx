export default function LoadingState() {
    return (
        <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-white border-t-primary rounded-full animate-spin"></div>
                <p className="text-white font-medium">Loading videos...</p>
            </div>
        </div>
    )
}
