import {useEffect} from 'react'
import Header from "../components/header"
function NotFound() {
    useEffect(()=>{
        document.title = 'Not found - Dogstagram'
    },[])
    return (
        <div className='bg-gray-background'>
            <Header />
            <div className="mx-auth max-w-screen-lg">
                <p className='text-center text-2xl'>
                   Not found!
                </p>

            </div>
            
        </div>
    )
}

export default NotFound
