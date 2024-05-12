"use client"
import Twin from "@/components/Twin"
import TwinUi from "@/components/TwinUi"



export default function Twinn() {

    var data =  {
        "id": "66338d76921cef5284d7acb9",
        "nozzleTemp": 178,
        "bedTemp": 600,
        "xPos": 95,
        "yPos": 139,
        "zPos": 0,
        "fanSpeed": 80,
        "printerSpeed": 604,
        "createdAt": "2024-05-02T12:56:22.761Z"
    }
    return (
        <div className="w-screen h-screen ">
        <Twin data={data} />
       
        </div>
    )
}