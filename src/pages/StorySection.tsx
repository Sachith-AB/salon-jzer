import { useMemo } from "react"
import StoryCard from "./components/StoryCard";
import { useFetchVideos } from "../helper/fetchVideo";
import MainLayout from "../components/MainLayout";
import Title from "../components/Title";

export default function StorySection() {
    const { videos } = useFetchVideos()

    const storyVideo = useMemo(() => {
        return videos.map((video) => (
            <div className="w-[250px] shrink-0">
                <StoryCard
                    key={video.id}
                    id={video.id}
                    videoUrl={video.video_url}
                    title={video.title}
                />
            </div>
        ))
    }, [videos])

    return (
        <div className="py-12">
            <div className="w-full">
                <MainLayout>
                    <Title text="Our Stories" size="txl" color="white" weight={600}/>
                </MainLayout>
                <div className="flex gap-6 overflow-x-auto no-scrollbar">
                    {storyVideo}
                </div>
            </div>
        </div>
    )
}
