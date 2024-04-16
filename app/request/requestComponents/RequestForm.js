import PlacesLocation from "./PlacesLocation"
import PlacesLocationDestination from "./PlaceLocationDestination"
import { supabase } from "@/lib/supabase"


function RequestForm(props) {
    async function formSubmit(e) {
        e.preventDefault(); 
        const { data, error } = await supabase.from('requests').insert(
            {
            origin: `POINT(${props.searchLongitude} ${props.searchLatitude})`,
            destination:`POINT(${props.searchLongitudeDestination} ${props.searchLatitudeDestination})`
            },
        ).select()
        if(error) {
            console.log(error)
            
        }else {
            // console.log("The form has been submitted ")
            // console.log(data[0].id)
            window.location.href = `/request/${data[0].id}`
        }
    }


        return (
        <form onSubmit={formSubmit} className="flex flex-col mt-5 mx-2">
            <PlacesLocation
                searchLatitude = {props.searchLatitude}
                searchLongitude = {props.searchLongitude}
                setSearchLatitude = {props.setSearchLatitude}
                setSearchLongitude = {props.setSearchLongitude}
            />

            {props.searchLatitude && props.searchLongitude &&  (<PlacesLocationDestination 
                searchLatitudeDestination = {props.searchLatitudeDestination}
                searchLongitudeDestination = {props.searchLongitudeDestination}
                setSearchLatitudeDestination = {props.setSearchLatitudeDestination}
                setSearchLongitudeDestination = {props.setSearchLongitudeDestination}
            />)}

            <button disabled={
                props.searchLatitude &&
                 props.searchLongitude && 
                 props.searchLatitudeDestination && 
                 props.searchLongitudeDestination ? false : true} 
                 className="bg-blue-600 font-bold my-2 py-2 rounded-2xl text-white w-32 mx-auto disabled:cursor-not-allowed disabled:bg-blue-200 " type="submit">Submit</button>
        </form>
    )
}

export default RequestForm
