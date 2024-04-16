'use client'
import { useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer, PolylineF} from '@react-google-maps/api';
import { supabase } from '@/lib/supabase';
import StarRating from './StarRating';
import polyline from '@mapbox/polyline';





function DetailMap(props) {

    const mapRef = useRef(null);


    // INPUT DATA
    const [radiusValue, setRadiusValue]  = useState(500000)

    // DRIVERS DATA
    const [nearbyDrivers, setNearbyDrivers] = useState([])

    // Clicked Marker
    const [clickedMarker, setClickedMarker] = useState(null)

    const  [ directionData, setDirectionData] = useState(null);
    const  [ directionServiceDriver, setDirectionServiceDriver] = useState(null);
    const [clickedMarkerCoordinates, setClickedMarkerCoordinates] = useState(null)
    const [serviceDriverPolyline, setServiceDriverPolyline] = useState(null)
    const [serviceDriverDistance, setServiceDriverDistance] = useState(null)
    const [serviceDriverDuration, setServiceDriverDuration] = useState(null)

  
   

    // const [isInfoWindowOpened, setIsInfoWindowOpened] = useState(false)
    const containerStyle = {
        width: '100%',
        height: '90vh'
    };

    const options = {
        madId : "8e2bea29d05ab474",
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        clickableIcons: false,
        streetViewControl: false
    }
    
    const center = {
        lat: -26.20507877601369,
        lng: 28.028347252728643
    };

    const pinIcon = {
    url : '/assets/tow.png',
    scaledSize: {
        width: 50,
        height: 50
    },

    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY 
    });

    useEffect(() => {
        if(props.singleRequestData) {
            console.log(props.singleRequestData[0])
        }
    },[props.singleRequestData])

    const matchOrigin = props.singleRequestData[0].origin.match(
        /POINT\(([^ ]+) ([^ ]+)\)/
    )

    const matchDestination = props.singleRequestData[0].destination.match(
        /POINT\(([^ ]+) ([^ ]+)\)/
    )

    const originLatitude = parseFloat(matchOrigin[2])
    const originLongitude = parseFloat(matchOrigin[1])

    const destinationLatitude = parseFloat(matchDestination[2])
    const destinationLongitude = parseFloat(matchDestination[1])


    // Request directions
    useEffect(() => {
        if(originLatitude !==null &&
        originLongitude !== null &&
        destinationLatitude !== null &&
        destinationLongitude !== null) {

        
        const requestOrigin = {
            lat : originLatitude,
            lng: originLongitude
        };

        const requestDestination = {
            lat: destinationLatitude,
            lng: destinationLongitude
        }

        const directionsService = new window.google.maps.DirectionsService()
        directionsService.route({
            origin: requestOrigin,
            destination: requestDestination,
            travelMode: window.google.maps.TravelMode.DRIVING
        }, (result) => {
            console.log(result)
            setDirectionData(result)
        })
        }
    },  [
        originLatitude,
        originLongitude,
        destinationLatitude, 
        destinationLongitude
    ])

    // service driver Directions
    useEffect(() => {
        if(originLatitude !==null &&
        originLongitude !== null &&
        clickedMarkerCoordinates
    ) {

        
        const requestOrigin = {
            lat : originLatitude,
            lng: originLongitude
        };

        const driverPosition = {
            lat: clickedMarkerCoordinates.lat,
            lng: clickedMarkerCoordinates.lng
        }

        const directionsService = new window.google.maps.DirectionsService()
        directionsService.route({
            origin: requestOrigin,
            destination: driverPosition,
            travelMode: window.google.maps.TravelMode.DRIVING
        }, (result) => {
            console.log(result)
            setDirectionServiceDriver(result)
            setServiceDriverPolyline(polyline.decode(result.routes[0].overview_polyline))
            setServiceDriverDistance(result.routes[0].legs[0].distance.text)
            setServiceDriverDuration(result.routes[0].legs[0].duration.text)
        })
        }
    },  [
        originLatitude,
        originLongitude,
        clickedMarkerCoordinates
    ])

    // handling clicked marker
    function handleClickMarker(id, coords) {
        if(id === clickedMarker) {
            return
        }else {
            setClickedMarker(id)
            setClickedMarkerCoordinates(coords)
        }
    }


    //function to extract coordinates
        const extractCoordinates = (str) => {
            const regex = /POINT\((-?\d+\.\d+)\s(-?\d+\.\d+)\)/
            const matches = str.match(regex)

            if(matches && matches.length === 3) {
                const [, coordTwo, coordOne] = matches;
                return {
                    coordTwo: parseFloat(coordTwo),
                    coordOne: parseFloat(coordOne)
                }
            }
            return null
        }


        useEffect(() => {
            if(props.requestId && radiusValue !== "") {
                async function getNearbyServiceDrivers() {
        try{
        const { data, error} = await supabase
        .rpc("get_nearby_drivers",{ 
            request_id: props.requestId, 
            radius_meters: radiusValue})

        if(error) {
            throw new Error(error.message)
        }else {
            // return data
            console.log(data)
            setNearbyDrivers(data)
        }
            }catch(error) {
            throw new Error(error.message)
            }
        }
            getNearbyServiceDrivers()
        }
    },[props.requestId, radiusValue])
        // get nearby service drivers
    

    function convertingArraysToObject(arrays) {
        const coordinates = arrays.map((coord) => {
            return {
                lat: coord[0],
                lng: coord[1]
            }
        })
        return coordinates
    }

    const [convertedPolyline, setConvertedPolyLine] = useState(null)

    useEffect(() => {
        if(serviceDriverPolyline) {
            setConvertedPolyLine(convertingArraysToObject(serviceDriverPolyline))
        }
    }, [serviceDriverPolyline])

    return isLoaded ? (
        <div className='relative'>
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={options}
            // onClick={() => setIsInfoWindowOpened(false)}
            onLoad={(map) => (mapRef.current = map)}
            onClick={() => setClickedMarker(false)}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            {/* Origin Marker */}
            {originLatitude !== null && originLongitude !== null && (<Marker
        position={{
            lat: originLatitude,
            lng: originLongitude
        }}
        />) }

            {/* Destination Marker */}
            {destinationLatitude !== null && destinationLongitude !== null && (<Marker
        position={{
            lat: destinationLatitude,
            lng: destinationLongitude
        }}
        />) }
            {/* Direction renderer serviceDrivers */}
            {/* {directionServiceDriver !== null && (<DirectionsRenderer directions = {directionServiceDriver} options={{
                polylineOptions: {
                    strokeColor: "blue",
                    strokeWeight: 4
                }
            }} />)} */}

            {/* PolyLines */}

            <PolylineF path={convertedPolyline} options={{
                strokeColor: "blue",
                strokeWeight: 4
            }}/>


            
            
            {/* Directive renderer request*/}
            {directionData !== null && (<DirectionsRenderer directions = {directionData} options={{
                polylineOptions: {
                    strokeColor: "red",
                    strokeWeight: 6
                }
            }} />)}

            {/*Displaying the drivers as markers */}
            {nearbyDrivers.map(driver => {
    const coordinates = extractCoordinates(driver.driver_position);
    return (
        <Marker
            key={driver.id} 
            position={{ lat: coordinates.coordOne, lng: coordinates.coordTwo }}
            icon={pinIcon}
            onClick={() => handleClickMarker(driver.id, {
                lat:coordinates.coordOne,
                lng: coordinates.coordTwo
            })}
        >
            {clickedMarker === driver.id && (
                <InfoWindow position={{ lat: coordinates.coordOne, lng: coordinates.coordTwo }}>
                
                {/* Content for the InfoWindow */}
                <div className="w-80 p-2">
                    <div className="flex items-center mb-2 space-x-5">
                    <img
                        src="https://images.unsplash.com/photo-1696928634052-41aa345ef686?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        className="w-14 h-14 rounded-full"
                    />
                    <div>
                        <h3 className="text-xl font-bold">{driver.driver_username}</h3>
                        <p> ratings: {driver.driver_rating}</p>
                        <StarRating rating={driver.driver_rating}/>
                    </div>
                </div>
                    <p >
                        <span className='font-bold'>{serviceDriverDistance}</span> away
                    </p>
                    <p>
                        we will be there in <span className='font-bold'> {serviceDriverDuration}</span>
                    </p>
                </div>
        </InfoWindow>
            )} 
        </Marker>
    );
})}

            <></>
        </GoogleMap>
        <div className=' flex items-center space-x-2 absolute top-2 left-5 w-1/2 h-10'>
            <input 
                type="number" 
                className='bg-stone-900 text-white p-2 rounded-md w-1/2 h-full'
                placeholder='enter radius(meters)' 
                value={radiusValue}
                onChange={(e) => setRadiusValue(e.target.value)} />
            <button className='px-4 py-2 bg-blue-400 text-white rounded-full'>{nearbyDrivers.length} service cars</button>
        </div>
        </div>

    ) : <></>
    
}

export default DetailMap
