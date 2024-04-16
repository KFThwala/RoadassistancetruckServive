
import React from 'react'
import { supabase } from '@/lib/supabase';
// import { useEffect, useState } from 'react'

async function getDrivers() {
    try{
    const { data, error} = await supabase.from("test_table").select();
    if(error) {
        throw new Error(error.message)
    }else {
        return data
    }
    
    }catch(error) {
        throw new Error(error.message)
    }
}

async function FetchFromServer() {
// Create a single supabase client for interacting with your database
    const drivers = await getDrivers()
    return (
            <div>
                {drivers.map((driver) => (
                    <h5 key={driver.id}>Name: {driver.name} *** Distance: {driver.distance}</h5>
                ))}
            </div>
        )
    }


export default FetchFromServer
