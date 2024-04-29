"use client"
import Twin from "@/components/Twin"



export default function Twinn() {

    var data = {
        "id": "6629a01b02f2c8a41b92ad7a",
        "nozzleTemp": 21,
        "bedTemp": 56,
        "xPos": 197,
        "yPos": 54,
        "zPos": 48,
        "createdAt": "2024-04-25T00:13:15.489Z"
    }
    return (
        <div className="w-screen h-screen">
        <Twin data={data} /></div>
    )
}