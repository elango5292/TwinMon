"use client"

import LineCard from "@/components/LineCard"
import DetailsCard
 from "@/components/DetailsCard"

 import LineChart from "@/components/LineChart"

 import axios from "axios"
 import { useState,useEffect, use } from "react"
 import Twin from "@/components/Twin"
import Anamolycard from "@/components/Anamolycard"

export default function Dashboard() {

    let machines = [
        { name: "Printer", status: "Online" },
    ];

    const [data, setData] = useState();
    const [chData, setChData] = useState();
    const [deviceData, setDeviceData] = useState([]);
    const [showTwins, setShowTwins] = useState(true);


    useEffect(() => {
        axios.get("/api/device?id=662934110e202414b52e57a9").then((response) => {
    
          setDeviceData(response.data);
        });
    
        axios.get("/api/printer?t=1").then((response) => {
          setData(response.data[0]);
          // console.log("1",response.data[0]);
   
        });
        axios.get("/api/printer?t=10").then((response) => {
            setChData(response.data);
            // console.log("10",response.data);
          });
    
       

        // const interval = setInterval(() => {
        //   axios.get("/api/printer?t=1").then((response) => {
        //     setData(response.data[0]);
      
        //   });
        // axios.get("/api/printer?t=10").then((response) => {
        //     setChData(response.data);
        //     // console.log("10",response.data);
        //   });
        // }, 1000);
    
        // return () => clearInterval(interval);
      }, []);

  

    return (
        <>
        
        <div className="flex flex-col bg-white">
            <div className="flex flex-row px-7 justify-between py-4 "> 
            <>
            <h2 className="text-3xl font-bold text-stone-900">
                3d Printing Line
                </h2></>
            <div className="w-[68.39px] h-[39px] relative">
<div className="w-[68.39px] h-[34.48px] left-0 top-[4.52px] absolute bg-neutral-800 rounded-[53px]"></div>
<div className="w-[26.57px] h-[26.57px] left-[3.96px] top-[9.04px] absolute bg-white rounded-full"></div>
<div className="w-[19.22px] h-[19.22px] left-[39px] top-[12.43px] absolute"></div>
<div className="w-[15.26px] h-[15.26px] left-[10.17px] top-[14.70px] absolute"></div>
<div className="w-[9.04px] h-[9.04px] left-[12.43px] top-0 absolute bg-yellow-200 rounded-full border-4 border-yellow-600"></div>
</div>
            </div>
   
   <div className="flex flex-row px-7">
       <LineCard machines={machines}/>

<DetailsCard devicedata={deviceData} data={data}/>   


</div>    
<div className="mx-auto">
<Anamolycard data={data}/>
</div>
        </div>
        <div className="h-auto w-auto bg-white">
       
      
      {chData && <LineChart data={chData}/>}
      <Twin data={data}/>

       </div>
        
        
        </>
    )
}