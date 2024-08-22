"use client"
import axios from 'axios';
import React, { useEffect } from 'react'

const Drugs = () => {
    useEffect(() => {
        const loadData =async () => {
            const {data} = await axios.get('https://www.drugs.com/paracetamol.html',{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log("data: ", data);
            
        }
        loadData();
    }, []);
  return (
    <div>Drugs</div>
  )
}

export default Drugs