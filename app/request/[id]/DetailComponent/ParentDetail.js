import DetailMap from "./DetailMap";
import { supabase } from "@/lib/supabase";


// get single request
  async function getSingleRequest(id) {
    try{
    const { data, error} = await supabase
      .rpc("get_request_by_id",{request_id: id})

    if(error) {
        throw new Error(error.message)
    }else {
        return data
      }
    }catch(error) {
        throw new Error(error.message)
    }
};




//Get service drivers
async function getServiceDrivers() {
  try{
  const { data, error} = await supabase
    .rpc("fetch_service_drivers")

  if(error) {
      throw new Error(error.message)
  }else {
      return data
    }
  }catch(error) {
      throw new Error(error.message)
  }
}

async function ParentDetail(props) {

  const singleRequestData = await getSingleRequest(props.requestId)
  // const driversData = await getServiceDrivers()
  // const nearbyDrivers = await getNearbyServiceDrivers(props.requestId, 60000)
  // console.log(nearbyDrivers)
  // console.log(nearbyDrivers.length)
  // console.log(driversData)
  console.log(singleRequestData)
  return (
    <div>
      <DetailMap singleRequestData={singleRequestData} 
      requestId={props.requestId}
      // nearbyDrivers={nearbyDrivers} 
      />
    </div>
  )
}

export default ParentDetail
