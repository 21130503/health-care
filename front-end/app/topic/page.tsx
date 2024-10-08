import Header from '@/components/header'
import Sidebar from '@/components/ui/sidebar'
import { getAllTopics } from '@/lib/actions/topic.action'
import React from 'react'

const Topic = async() => {
  const topics = await getAllTopics()
  return (
    <div className='h-screen overflow-hidden mx-auto flex max-w-7xl flex-col space-y-14'>
      <Header/>
      <main className='flex-1'>
        <Sidebar topic={topics}/>
      </main>
    </div>
  )
}

export default Topic