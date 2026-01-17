import MainLayout from '../components/MainLayout'
import Title from '../components/Title'
import logo from '../assets/logo.jpeg'

export default function AboutSection() {
    const description = "Welcome to Salon JZER, where beauty meets precision and care. Our salon is dedicated to providing an exceptional experience for every client, combining the latest techniques with a personalized approach. Whether you're looking for a fresh hairstyle, professional skincare, or complete grooming services, our team of skilled professionals ensures quality, comfort, and style at every visit. At Salon JZER, we believe in enhancing your natural beauty while delivering a relaxing and enjoyable experience. Stay tuned as we prepare to open our doors and introduce you to a new standard of salon excellence."

    return (
        <div id="about" className="w-full py-16">
            <MainLayout>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left side - Image Space */}
                    <div className="flex items-center justify-center">
                        <div className="w-full h-96 bg-accent/20 rounded-lg flex items-center justify-center border-2 border-accent/30">
                            <img src={logo} alt="logo" className='h-full w-full object-cover'/>
                        </div>
                    </div>

                    {/* Right side - Description */}
                    <div className="flex flex-col gap-4">
                        <Title text="About Salon JZER" size="fvxl" color="white"/>
                        <div className="mb-6">
                            <Title text={description} size="dxl" color="accent" weight={400}/>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}
