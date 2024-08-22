
import Header from '@/components/header';
import { getServerSideProps } from '@/lib/actions/cheerio';
import axios from 'axios';
import React, { useEffect } from 'react'

const DrugsName = async({params : {nameDrug}} : SearchParamProps) => {
    const data = await getServerSideProps(nameDrug)
    console.log("get data: ", data);
    
  return (
    <div>
        
        <Header/>
        <main className='admin-main'>

        <div className='mt-32' dangerouslySetInnerHTML={{ __html: data.props.content }} />
        </main>
    </div>
  )
}

export default DrugsName