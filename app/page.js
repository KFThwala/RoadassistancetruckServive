// import FetchFromClient from "./components/FetchFromClient"
// import FetchFromServer from "./components/FetchFromServer"
import Link from "next/link"

function Home() {
  return (
    <main className="flex items center justify-center my-24">
      {/* <h1>Home Page</h1> */}
      {/* <FetchFromClient /> */}
      {/* <FetchFromServer /> */}

      <Link className="bg-blue-600 px-6 py-2 text-white font-bold rounded-2xl"href="./request">Make A request</Link>
    </main>
  )
}

export default Home
