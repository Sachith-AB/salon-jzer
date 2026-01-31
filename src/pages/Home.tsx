import logoVideo from '../assets/videos/logo-video.mp4'
import MainLayout from '../components/MainLayout'
import Title from '../components/Title'
import AboutSection from './AboutSection'
import StorySection from './StorySection'

export default function Home() {
    return (
        <div id="home">
            {/* Video Hero Section */}
            <div className="w-full h-96 md:h-[calc(100vh-80px)] relative overflow-hidden">
                {/* Video Background */}
                <video
                    src={logoVideo}
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
                />
                
                {/* Overlay to darken the background */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
                
                {/* Text Content */}
                <div className="relative z-10 w-full h-full flex items-center">
                    <MainLayout>
                        <Title text='Welcome to' size='sxl' weight={600}/>
                        <Title text='Salon JZER' size='sxl' color='secondary'/>
                        <Title text='Jewel of your beauty...' size='large' weight={500}/>
                    </MainLayout>
                </div>
            </div>

            {/* About Section */}
            <div className='mt-20'>
                <AboutSection />
            </div>

            {/* About Section */}
            <div className='mt-20'>
                <StorySection />
            </div>
        </div>
    )
}
