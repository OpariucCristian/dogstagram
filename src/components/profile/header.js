import { useState,useEffect } from "react"
import PropTypes from 'prop-types'
import Skeleton from "react-loading-skeleton"
import useUser from '../../hooks/use-user'
import {isUserFollowingProfile, toggleFollow} from '../../services/firebase'

export default function ProfileHeader({photosCount, followerCount, setFollowerCount, profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username : profileUsername
  }}){
    const {user} = useUser()
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeButtonFollow = user.username && user.username !== profileUsername

    const handleToggleFollow = async()=>{
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        })
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId)
        //isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId
    }

    useEffect(()=>{
        const isLoggedInUserFollowingProfile = async () =>{
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId)
            setIsFollowingProfile(!!isFollowing)
        }

        if(user.username && profileUserId){
            isLoggedInUserFollowingProfile()
        }
    },[user.username, profileUserId])

    return (
       <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${fullName} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex items-start justify-start flex-col col-span-2">
        <div className="container flex items-center ">
          <p className="text-2xl">{profileUsername}</p>
          {activeButtonFollow && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeButtonFollow && (
              <button
                className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8 ml-3"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleToggleFollow();
                  }
                }}
              >
                {isFollowingProfile ? 'Unfollow' : 'Follow'}
              </button>
            )
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId : PropTypes.string,
        userId : PropTypes.string,
        fullName : PropTypes.string,
        following : PropTypes.array,
        followers : PropTypes.array,
        username : PropTypes.string

    }).isRequired
}