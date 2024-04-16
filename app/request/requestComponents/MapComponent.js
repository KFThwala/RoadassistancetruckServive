'use client'
import { useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer} from '@react-google-maps/api';


function MapComponent(props) {

    const mapRef = useRef(null);

    const [isInfoWindowOpened, setIsInfoWindowOpened] = useState(false)
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
    url : '/assets/location.png',
    scaledSize: {
        width: 50,
        height: 50
    },

    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY 
    });

    function panToUser() {
        const newPosition = {
            lat: props.searchLatitude,
            lng: props.searchLongitude
        };
        const map = mapRef.current;
        map.panTo(newPosition);
    }

    const  [ directionData, setDirectionData] = useState(null);

    useEffect(() => {
        if(props.searchLatitude !==null &&
        props.searchLongitude !== null &&
        props.searchLatitudeDestination !== null &&
        props.searchLongitudeDestination !== null) {

        
        const requestOrigin = {
            lat : props.searchLatitude,
            lng: props.searchLongitude
        };

        const requestDestination = {
            lat: props.searchLatitudeDestination,
            lng: props.searchLongitudeDestination
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
        props.searchLatitude,
        props.searchLongitude,
        props.searchLatitudeDestination, 
        props.searchLongitudeDestination
    ])

    


    useEffect(() => {
        if (props.searchLatitude !== null && props.searchLongitude !== null) {
            panToUser()
        }
    }, [props.searchLatitude, props.searchLongitude])
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={options}
            onClick={() => setIsInfoWindowOpened(false)}
            onLoad={(map) => (mapRef.current = map)}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            {props.searchLatitude !== null && props.searchLongitude !== null && (<Marker
        position={{
            lat: props.searchLatitude,
            lng: props.searchLongitude
        }}
        
        />) }
            {/* Directive renderer */}
            {directionData !== null && (<DirectionsRenderer directions = {directionData} options={{
                polylineOptions: {
                    strokeColor: "red",
                    strokeWeight: 6
                }
            }} />)}
            <></>
        </GoogleMap>
    ) : <></>
    
}

export default MapComponent
