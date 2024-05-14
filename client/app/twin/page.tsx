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

    var tdata = [
        {
            "id": "66338d76921cef5284d7acb9",
            "nozzleTemp": 178,
            "bedTemp": 600,
            "xPos": 95,
            "yPos": 139,
            "zPos": 0,
            "fanSpeed": 80,
            "printerSpeed": 604,
            "createdAt": "2024-05-02T12:56:22.761Z"
        },
        {
            "id": "66338d74921cef5284d7acb8",
            "nozzleTemp": 178,
            "bedTemp": 600,
            "xPos": 95,
            "yPos": 139,
            "zPos": 0,
            "fanSpeed": 80,
            "printerSpeed": 604,
            "createdAt": "2024-05-02T12:56:20.801Z"
        },
        {
            "id": "66338d65921cef5284d7acb7",
            "nozzleTemp": 201,
            "bedTemp": 50,
            "xPos": 56,
            "yPos": 139,
            "zPos": 0,
            "fanSpeed": 0,
            "printerSpeed": 597,
            "createdAt": "2024-05-02T12:56:05.964Z"
        },
        {
            "id": "66338d64921cef5284d7acb6",
            "nozzleTemp": 200,
            "bedTemp": 50,
            "xPos": 95,
            "yPos": 137,
            "zPos": 0,
            "fanSpeed": 0,
            "printerSpeed": 584,
            "createdAt": "2024-05-02T12:56:04.017Z"
        },
        {
            "id": "66338d63921cef5284d7acb5",
            "nozzleTemp": 200,
            "bedTemp": 50,
            "xPos": 57,
            "yPos": 134,
            "zPos": 0,
            "fanSpeed": 0,
            "printerSpeed": 589,
            "createdAt": "2024-05-02T12:56:03.051Z"
        },
        {
            "id": "66338d61921cef5284d7acb4",
            "nozzleTemp": 199,
            "bedTemp": 50,
            "xPos": 57,
            "yPos": 132,
            "zPos": 0,
            "fanSpeed": 0,
            "printerSpeed": 589,
            "createdAt": "2024-05-02T12:56:01.322Z"
        },
        {
            "id": "66338d5e921cef5284d7acb3",
            "nozzleTemp": 198,
            "bedTemp": 50,
            "xPos": 57,
            "yPos": 130,
            "zPos": 0,
            "fanSpeed": 0,
            "printerSpeed": 588,
            "createdAt": "2024-05-02T12:55:58.993Z"
        },
        {
            "id": "66338d5b921cef5284d7acb2",
            "nozzleTemp": 127,
            "bedTemp": 586,
            "xPos": 80,
            "yPos": 136,
            "zPos": 0,
            "fanSpeed": 80,
            "printerSpeed": 567,
            "createdAt": "2024-05-02T12:55:55.927Z"
        },
        {
            "id": "66338d5a921cef5284d7acb1",
            "nozzleTemp": 126,
            "bedTemp": 585,
            "xPos": 80,
            "yPos": 136,
            "zPos": 0,
            "fanSpeed": 80,
            "printerSpeed": 567,
            "createdAt": "2024-05-02T12:55:54.153Z"
        },
        {
            "id": "66338d57921cef5284d7acb0",
            "nozzleTemp": 125,
            "bedTemp": 584,
            "xPos": 80,
            "yPos": 136,
            "zPos": 0,
            "fanSpeed": 80,
            "printerSpeed": 567,
            "createdAt": "2024-05-02T12:55:51.120Z"
        }
    ]
    return (
        <div className="w-screen h-screen ">
        <Twin data={data} tdata={tdata} />
       
        </div>
    )
}