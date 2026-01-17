import logo from './../assets/logo.jpeg'
import { Link, useLocation } from 'react-router-dom'
import MainLayout from './MainLayout'
import { useState, useEffect } from 'react'
import useIsMobile from '../hooks/useIsMobile'
import { MdMenu, MdClose } from 'react-icons/md'

export default function CustomHeader() {
    const navLinks = ['Home', 'About', 'Hair Styles', 'Contact'];
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about']
            const headerHeight = 100

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
                        setActiveSection(section.charAt(0).toUpperCase() + section.slice(1))
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (link: string) => {
        setMenuOpen(false)
        
        if (link === 'About') {
            const aboutSection = document.getElementById('about')
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' })
            }
        } else if (link === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const isLinkActive = (link: string) => {
        return activeSection === link
    }

    const mobileViewMenuItem = () => {
        return (
            <nav className="flex flex-col gap-3">
                {navLinks.map((link) => {
                    const active = isLinkActive(link)
                    
                    return (
                        <button
                            key={link}
                            onClick={() => handleNavClick(link)}
                            className={active ? 'text-secondary transition-all font-semibold text-left' : 'text-accent hover:text-white transition-all text-left'}
                        >
                            {link}
                        </button>
                    )
                })}
            </nav>
        )
    }
    
    return (
        <div className="w-full bg-primary text-white fixed top-0 left-0 right-0 z-40 shadow-lg">
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
                                    const active = isLinkActive(link)
                                    
                                    return (
                                        <button
                                            key={link}
                                            onClick={() => handleNavClick(link)}
                                            className={active ? 'text-secondary' : 'text-accent hover:text-white'}
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
