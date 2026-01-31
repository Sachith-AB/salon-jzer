import { useMemo } from "react"
import StoryCard from "./components/StoryCard";
import { useFetchVideos } from "../helper/fetchVideo";

export default function StorySection() {
    const { videos } = useFetchVideos()

    const storyVideo = useMemo(() => {
        return videos.map((video) => (
            <StoryCard
                key={video.id}
                id={video.id}
                videoUrl={video.video_url}
                title={video.title}
            />
        ))
    }, [videos])

    return (
        <div className="py-12 bg-gray-950">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-white mb-8">Our Stories</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
                        {storyVideo}
                    </div>
            </div>
        </div>
    )
}
