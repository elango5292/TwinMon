"use client"

import { FaFireAlt } from "react-icons/fa";
import { MdOutlineSevereCold } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";
import { PiCloudCheckFill } from "react-icons/pi";




export default function DetailsCard(props:any) {
    // console.log("here", props.data)

    return (
        <div className="flex text-stone-900 px-7  flex-col w-full ">
            <div className="text-stone-900 flex flex-row justify-between items-center ">
                <p className="text-lg font-semibold">Machine details</p>
                <p className="text-lg font-semibold">{">"}</p>
            </div>
            <div className="flex flex-row w-full  justify-between">
                <div>
                    <div className="w-full mt-7 h-full ">
                        <div className="h-6">
                            <span className="text-black text-xl font-bold break-words">Name: </span>
                            <span className="text-black text-lg font-medium break-words">{props.devicedata.name}</span>
                        </div>
                        <div className="th-6">
                            <span className="text-black text-xl font-bold break-words">Id: </span>
                            <span className="text-black text-lg font-medium break-words">{props.devicedata.serialNumber}</span>
                        </div>
                        <div className="th-6">
                            <span className="text-black text-xl font-bold break-words">Model: </span>
                            <span className="text-black text-lg font-medium break-words">{props.devicedata.model}</span>
                        </div>
                        <div className="th-6">
                            <span className="text-black text-xl font-bold break-words">Brand: </span>
                            <span className="text-black text-lg font-medium break-words">{props.devicedata.brand}</span>
                        </div>
                    </div>


                </div>

                <div className="flex flex-col">
                    <div className="w-auto h-auto">

                    </div>
                </div>

            </div>

            <div className="mt-5">

                <button className="w-full h-10 bg-[#cacaca] rounded-[45px] text-black font-bold text-lg">Turn off</button>

            </div>
            <div className="w-full flex p-3 flex-col gap-y-2 mt-12  bg-[#cacaca]">
                <div className="th-6">
                    <span className="text-black   break-words">Nozzle Temp: </span>
                    <span className="text-black  font-medium break-words">{props.data?.nozzleTemp}



                    </span>
                    {props.data?.nozzleTemp > 190 ? <FaFireAlt className="text-2xl  animate-ping m-1 inline-flex" /> : props.data?.nozzleTemp < 100 ? <MdOutlineSevereCold className="text-2xl animate-pulse m-1 inline-flex text-[#3489a7]" /> : <PiCloudCheckFill className="text-2xl m-1 text-[#2e9f5f] inline-flex" />}
                </div>

                <div className="th-6">
                    <span className="text-black  break-words">Bed Temp: </span>
                    <span className="text-black font-medium break-words">{props.data?.bedTemp}</span>

                    {props.data?.bedTemp > 190 ? <FaFireAlt className="text-2xl animate-ping m-1 inline-flex" /> : props.data?.bedTemp < 100 ? <MdOutlineSevereCold className="text-2xl animate-pulse m-1 inline-flex text-[#3489a7]" /> : <PiCloudCheckFill className="text-2xl m-1 text-[#2e9f5f] inline-flex" />}
                </div>
                <div className="th-6">
                    <span className="text-black  break-words">Position: </span>
                    <span className="text-black font-medium break-words">({props.data?.xPos},{props.data?.yPos},{props.data?.zPos})</span>
                </div>

            </div>
        </div>
    )
}