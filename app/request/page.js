import React from 'react'
import ParentRequest from './requestComponents/ParentRequest';


const metadata = {
    title: "Truck Tow App",
    description: "Truck Tow service for you if you stuck with a broken car",
};
function RequestPage() {

    return (
        <>
            <ParentRequest />
        </>
    )
}

export default RequestPage
