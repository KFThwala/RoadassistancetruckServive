"use client"
import RequestForm from './RequestForm'
import MapComponent from './MapComponent'
import { useState } from 'react'


function ParentRequest() {

  const [searchLatitude, setSearchLatitude] = useState(null)
  const [searchLatitudeDestination, setSearchLatitudeDestination] = useState(null)
  const [searchLongitude, setSearchLongitude] = useState(null)
  const [searchLongitudeDestination, setSearchLongitudeDestination] = useState(null)

  

  return (
    <div className='flex'>
    <div className='w-1/5'>
          <RequestForm
          searchLatitude = {searchLatitude}
          searchLongitude = {searchLongitude}
          setSearchLatitude = {setSearchLatitude}
          setSearchLongitude = {setSearchLongitude}
          searchLatitudeDestination = {searchLatitudeDestination}
          searchLongitudeDestination = {searchLongitudeDestination}
          setSearchLatitudeDestination = {setSearchLatitudeDestination}
          setSearchLongitudeDestination = {setSearchLongitudeDestination}
        />
    </div>
    <div className='w-4/5'>
        <MapComponent
            searchLatitude = {searchLatitude}
            searchLongitude = {searchLongitude} 
            setSearchLatitude = {setSearchLatitude}
            setSearchLongitude = {setSearchLongitude}
            searchLatitudeDestination = {searchLatitudeDestination}
            searchLongitudeDestination = {searchLongitudeDestination}
            setSearchLatitudeDestination = {setSearchLatitudeDestination}
            setSearchLongitudeDestination = {setSearchLongitudeDestination}
        />
    </div>
</div>
  )
}

export default ParentRequest
