"use client"
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const Home = () => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const route = useRouter()
  useEffect(()=>{
    const user = Cookies.get('user')
    console.log("user", user);
    
    if(user){
      setCurrentUser(JSON.parse(user))
    }
    else{
      route.push('/login')
    }
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home