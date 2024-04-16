"use client"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect, useState } from "react";

function PlacesLocationDestination(props) {
    const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    } = usePlacesAutocomplete({
    
    requestOptions: {
        /* Define search scope here */
        componentRestrictions: {country: 'ZA'},

            //sw , 27.927675728499445,
            //ne , 
        // locationRestriction: {
        //     north: -26.371598148880416, // for east longitude restriction
        //     east: 28.228399998057828 , // for east longitude restriction
        //     south: -26.1370754996276 , // for east longitude restriction
        //     west: 27.927675728499445 , // for east longitude restriction
        //         }
    },
    debounce: 300,
    });
    const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
    });

    const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    };

    const handleSelect =
    ({ description }) =>
    () => {
        // When the user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
        props.setSearchLatitudeDestination(lat),
        props.setSearchLongitudeDestination(lng)
        });
    };

    useEffect(() => {
        if(props.searchLatitudeDestination && props.searchLatitudeDestination) {
            console.log(`Retrieved ${props.searchLatitudeDestination} and ${props.searchLongitudeDestination}`)
        }
    }, [props.searchLatitudeDestination, props.searchLongitudeDestination])

    const renderSuggestions = () =>
    data.map((suggestion) => {
        const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
        <li className="my-2 bg-blue-200" key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
        );
    });

    return (
    <div ref={ref}>
        <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        className="p-4 bg-black my-2 h-10 rounded-xl text-white w-full"
        placeholder="Your Destination"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
    );
};

export default PlacesLocationDestination

