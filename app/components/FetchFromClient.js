
"use client"

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react'

// Create a single supabase client for interacting with your database


function FetchFromClient() {

    const [drivers, setDrivers] = useState([])
    
    useEffect( () => {
        async function getDrivers() {
            try {
                const { data, error} = await supabase.from("test_table").select()
                console.log(data)
                setDrivers(data)
            }catch(error) {
                console.error(error)
            }
        };
        getDrivers()
    }, [])
;

    return (
        <div>
            {drivers.map((driver) => (
                <h5 key={driver.id}>Name: {driver.name} *** Distance: {driver.distance}</h5>
            ))}
        </div>
    )
}

export default FetchFromClient
