import React from 'react'
import { useUserAuth } from '../../context/UserAuthContext'

function Profile() {
  const { user } = useUserAuth();
  return (
    <section class="relative pt-40 pb-24">
      <img src="https://pagedone.io/asset/uploads/1705471739.png" alt="cover-image" class="w-full absolute top-0 left-0 z-0 h-60 object-cover" />
      <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div class="flex items-center justify-center relative z-10 mb-2.5">
          <img src={user?.photoURL || 'https://xsgames.co/randomusers/assets/avatars/pixel/51.jpg'} alt="user-avatar-image" className="border-4 size-28 md:size-36 border-solid border-white rounded-full object-cover" />
        </div>
        <h3 class="text-center font-manrope font-bold text-2xl md:text-4xl leading-10 text-black mb-3">{user.displayName}</h3>
        <p class="font-normal text-base leading-7 text-gray-500 text-center mb-8">{user.email}</p>
      </div>
    </section>
  )
}

export default Profile