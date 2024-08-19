"use client"
import { Topic } from '@/types/appwrite.types'
import React, { useState } from 'react'
import ContentTopic from './contentTopic'

interface Props {
    topic : Array<Topic>
}
const Sidebar = ({topic}: Props) => {
    const [topicId ,setTopicId] = useState<number>(1)
  return (
    <div className='px-14'>
        <section className='flex gap-8'>
            {
                topic.map((item)=>{
                    return (
                        <div onClick={()=>setTopicId(item.id)} key={item.id} 
                        className={
                            topicId === item.id? 
                            'cursor-pointer border border-amber-500 rounded-3xl  shadow-xl px-4 py-2' : 
                            'cursor-pointer border rounded-3xl  shadow-xl px-4 py-2'
                        }>
                            {item.name}
                        </div>
                    )
                })
            }
        </section>
        <section className='mt-4'>
            <ContentTopic idTopic={topicId}/>
        </section>
    </div>
  )
}

export default Sidebar