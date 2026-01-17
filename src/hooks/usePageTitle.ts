import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function usePageTitle() {
    const location = useLocation()

    useEffect(() => {
        const pathName = location.pathname
        const pageName = pathName === '/' ? 'Home' : pathName.substring(1).charAt(0).toUpperCase() + pathName.substring(2)
        
        document.title = `Salon JZER | ${pageName}`
    }, [location.pathname])
}
