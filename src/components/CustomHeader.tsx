import logo from './../assets/logo.jpeg'
import MainLayout from './MainLayout'
import { useState, useEffect } from 'react'
import useIsMobile from '../hooks/useIsMobile'
import { MdMenu, MdClose } from 'react-icons/md'

export default function CustomHeader() {
    const navLinks = ['Home', 'About', 'Contact', 'Services'];
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => ({
                name: link,
                element: document.getElementById(link.toLowerCase())
            })).filter(s => s.element !== null);

            let currentSection = 'Home';
            
            for (const section of sections) {
                const rect = section.element!.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2) {
                    currentSection = section.name;
                }
            }
            
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionName: string) => {
        const element = document.getElementById(sectionName.toLowerCase());
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    const mobileViewMenuItem = () => {
        return (
            <nav className="flex flex-col gap-3">
                {navLinks.map((link) => {
                    const isActive = activeSection === link;
                    
                    return (
                        <button
                            key={link} 
                            onClick={() => scrollToSection(link)}
                            className={isActive ? 'text-secondary transition-colors text-left' : 'text-accent hover:text-secondary transition-colors text-left'}
                        >
                            {link}
                        </button>
                    )
                })}
            </nav>
        )
    }
    
    return (
        <div className="w-full bg-primary text-white fixed z-50 top-0">
            <MainLayout>
                <div className="flex items-center justify-between py-4">
                    {/* Left side - Logo */}
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-16 w-16" />
                    </div>
                    
                    {/* Right side - Navigation */}
                    {
                        isMobile ? (
                            <button onClick={() => setMenuOpen(!menuOpen)}>
                                {menuOpen ? <MdClose size={32} /> : <MdMenu size={32} />}
                            </button>
                        ) : (
                            <nav className="flex gap-6">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link;
                                    
                                    return (
                                        <button
                                            key={link} 
                                            onClick={() => scrollToSection(link)}
                                            className={isActive ? 'text-secondary transition-colors' : 'text-accent hover:text-secondary transition-colors'}
                                        >
                                            {link}
                                        </button>
                                    )
                                })}
                            </nav>
                        )
                    }
                </div>
            </MainLayout>
            
            {/* Mobile Menu - Absolute Positioned */}
            {isMobile && menuOpen && (
                <div className="absolute top-full left-0 w-full bg-primary/95 backdrop-blur-xs border-b border-accent/30 z-50 p-4">
                    {mobileViewMenuItem()}
                </div>
            )}
        </div>
    )
}