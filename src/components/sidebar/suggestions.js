import {useState,useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './suggested-profile'

function Suggestions({userId,following}) {
    const[profiles,setProfiles] = useState([])
    
    useEffect(()=>{
    async function suggestedProfiles(){
        const response = await getSuggestedProfiles(userId, following);
        setProfiles(response)
    
    }
    if(userId){
        suggestedProfiles()
    }
    },[userId])

    

        return !profiles ? (
            <Skeleton count={1} height={150} className="mt-5"/>
        ): profiles.length > 0?(
            <div className="rounded flex flex-col">
                <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className=" font-bold text-gray-500">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile)=>{
                    return <SuggestedProfile key={profile.docId} 
                    userDocId={profile.docId} 
                    username={profile.username} 
                    profileId={profile.userId} 
                    userId={userId}/>
                })}
            </div>
            </div>

        ) : null
    
}

export default Suggestions
