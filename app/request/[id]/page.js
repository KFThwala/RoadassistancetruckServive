import ParentDetail from "./DetailComponent/ParentDetail";


export const metadata = {
    title: "Request Details",
    description: "More info about request made | connect with the driver ",
};

function RequestDetail({params}) {
    console.log(params)
    const requestId = params.id
    return (
        <div>
            <ParentDetail requestId={requestId} />
        </div>
    )
}

export default RequestDetail
