import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/example");
  //     console.log(response.data); // Handle the response data
  //     const responseData = await response.json();
  //     setData(responseData);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   // This effect will run only once, when the component mounts
  //   fetchData();
  // }, []); // Empty dependency array ensures it runs only onc

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>Welcome to GrubGuru</h1>
        <Link href="/authorization">Create Account</Link>
      </div>
      <div>
        <button onClick={fetchData}>Fetch Data</button>
        {data ? <div>Data: {JSON.stringify(data)}</div> : <div>Loading...</div>}
      </div>
    </main>
  );
}
