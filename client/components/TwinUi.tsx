"use client"
import { useEffect, useReducer, useState } from "react";
import { LuChevronLeft, LuChevronRight, } from "react-icons/lu";
import { BiJoystickButton, BiSolidJoystickButton } from "react-icons/bi";
import { AirVent, ArrowBigDownDash, ArrowBigUpDash, ChevronDown, ChevronUp, Cone, Cuboid, CuboidIcon, Eye, Fan, Home, LayoutGrid, LocateFixed, Minus, MoveDown, MoveLeft, MoveRight, MoveUp, PenBox, Play, Plus, SquarePower, Thermometer } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import debounce from 'lodash.debounce';
import Dbuttons from "./Dbuttons";
import axios from "axios";

export default function TwinUi(props: any) {
    const data = props.data;
    const [isPanelVisible, setIsPanelVisible] = useState(true);
    const [isDetailVisible, setIsDetailVisible] = useState(true);
    const [stata, setStata] = useState({
        "Nozzle Clog": false,
        "Over Extrution": false,
        "Under Extrution": false,
        "Warping": true,
        "Stringing": false,
        "Poor Adhesion": false,
        "Temperature": false
    })

    useEffect(() => {
        setStata({
            "Warping": data?.prediction[0] == 1 ? true : false,
            "Nozzle Clog": data?.prediction[1] == 1 ? true : false,
            "Over Extrution": data?.prediction[2] == 1 ? true : false,
            "Under Extrution": data?.prediction[3] == 1 ? true : false,

            "Stringing": data?.prediction[4] == 1 ? true : false,
            "Poor Adhesion": data?.prediction[5] == 1 ? true : false,
            "Temperature": data.nozTemp > 250 ? true : false

        })
    }, [data])
    const [tab, setTab] = useState<String>("universal");
    const togglePanel = () => {
        setIsPanelVisible(!isPanelVisible);
    };
    const toggleDetail = () => {
        setIsDetailVisible(!isDetailVisible);
    };

    const anamolys = ["Nozzle Clog", "Over Extrution", "Under Extrution", "Warping", "Stringing", "Poor Adhesion", "Temperature"];
    // const hasIssue = true
    const [onControll, setOnControll] = useState(false);
    // const contapi = "http://192.168.57.81:5000"

    const hasIssue = Object.values(stata).some(value => value === true);
    const controller = debounce(async (cmd: any) => {
        if (onControll === false) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "command": cmd
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("http://192.168.57.97:5000/control", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        }

    }, 1000);
    function UniversalPanel({ stata }: any) {
        const anamolys = ["Nozzle Clog", "Over Extrution", "Under Extrution", "Warping", "Stringing", "Poor Adhesion", "Temperature"];
        const [hasIssue, setHasIssue] = useReducer((prevState: any, newValue: any) => {
            return Object.values(stata).some(value => value === true);
        }, Object.values(stata).some(value => value === true));

        return (
            <>
                <div className="flex flex-col w-full gap-y-[31px] h-auto px-[15px] py-4">
                    <div className="flex flex-row justify-between w-full px-4">

                        <p className="text-xl font-bold text-left text-[#e9e9e9]">Universal Panel</p>
                        <div className="w-[33px]  h-[33px] hover:!bg-[#a1c7e3] cursor-pointer flex flex-row items-center justify-center rounded-[5px] border border-[#A9C1D5] "
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                            }} onClick={() => setTab("controll")}>
                            <BiJoystickButton className="h-[20px] w-[20px]" />

                        </div>
                    </div>

                    <div className="w-full h-auto flex flex-row">
                        <div className="flex flex-col border-r border-[#ACBFD5] w-auto pr-9">
                            <p className="text-lg font-semibold pb-[7px] text-left text-[#e9e9e9]">Device</p>
                            <p className="text-xs text-left pb-[3px] text-[#e9e9e9]">
                                <span className="text-xs font-bold text-left text-[#e9e9e9]">Model:</span>
                                <span className="text-xs font-medium text-left text-[#e9e9e9]"> Ender 3 V2</span>
                            </p>
                            <p className="text-xs text-left  pb-[3px] text-[#e9e9e9]">
                                <span className="text-xs font-bold text-left text-[#e9e9e9]">Brand:</span>
                                <span className="text-xs font-medium text-left text-[#e9e9e9]"> Creality</span>
                            </p>
                            <p className="text-xs text-left  pb-[3px] text-[#e9e9e9]">
                                <span className="text-xs font-bold text-left text-[#e9e9e9]">Serial ID:</span>
                                <span className="text-xs font-medium text-left text-[#e9e9e9]"> A12323234</span>
                            </p>
                            <p className="text-xs text-left  pb-[3px] text-[#e9e9e9]">
                                <span className="text-xs font-bold text-left text-[#e9e9e9]">Name:</span>
                                <span className="text-xs font-medium text-left text-[#e9e9e9]"> 3d Printer 1 </span>
                            </p>

                        </div>
                        <div className="w-auto flex flex-col justify-end items-center gap-y-1 pl-9">
                            <p className="text-[12px] font-light text-left text-[#e9e9e9]">Machine is online</p>
                            <div className="w-auto h-auto">
                                <div
                                    className="w-auto px-2 py-1 cursor-pointer flex flex-row justify-center items-center gap-x-1 h-auto rounded-[10px] bg-[#d9d9d9]/20 border border-[#acbfd5] hover:shadow-custom"
                                >
                                    <SquarePower className="text-[#E9E9E9] h-xs w-xs font-thin" />
                                    <p className=" text-xs font-medium text-[#e9e9e9]">
                                        Turn Off
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className="w-full h-auto flex flex-row items-center gap-x-2">

                        <div className="w-auto px-3 flex flex-row justify-center items-center h-[43.18px] rounded-[10px] border border-[#b4b4b4]/80"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(138,138,138,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(127,127,127,0.5) 100%)",
                            }}>
                            {/* <p className={`bg-[#8EF076]  h-[12px] w-[12px] w-[15px]"} absolute z-10 rounded-full `} /> */}
                            <p className={`${!hasIssue ? "bg-[#8EF076]  h-[12px] w-[12px]" : "bg-[#FC6A6A]  h-[15px] w-[15px]"} h-[12px] w-[12px] absolute z-10 rounded-full `} />
                            <p className={`${!hasIssue ? "bg-[#8EF076]/60 animate-pulse" : "bg-[#FC6A6A]/60 animate-ping"}  rounded-full h-[21px] w-[21px] `} />







                        </div>
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold text-left text-[#e9e9e9]">Universal Status</p>
                            <p className="text-[10px] font-medium text-left text-[#e9e9e9]">{!hasIssue ? "Machine is Normal" : "Machine has issues"}</p>


                        </div>


                    </div>

                    <div className="flex flex-col gap-y-2">

                        <div>
                            <p className="text-lg font-semibold text-left text-[#e9e9e9]">Detailed Status</p>
                        </div>


                        <div className="flex flex-row flex-wrap  w-full h-auto break-before-auto gap-x-2 gap-y-1">


                            {
                                anamolys.map((anamoly) => {
                                    return (
                                        <div id={anamoly + "Label"} className="w-auto px-2 gap-x-2 h-[34px] flex flex-row rounded-[10px] justify-around items-center border border-[#b4b4b4]/80 "
                                            style={{
                                                background:
                                                    "linear-gradient(to bottom, rgba(138,138,138,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(127,127,127,0.5) 100%)",
                                            }}>
                                            <div id={anamoly + "Labels"} className="flex flex-row justify-center items-center">
                                                {/* <p className={`rounded-full h-[16px] w-[16px] bg-[#8EF076]/60`} />
                                                <p className={`rounded-full  absolute h-[10px] w-[10px] bg-[#8EF076]`} /> */}
                                                <p id={`${anamoly}Signal1`} className={`rounded-full h-[16px] w-[16px] ${stata[anamoly] == false ? "bg-[#8EF076]/60 animate-pulse" : "bg-[#FC6A6A]/60 animate-ping"}`} />
                                                <p id={`${anamoly}Signal`} className={`rounded-full  absolute h-[10px] w-[10px] ${stata[anamoly] == false ? "bg-[#8EF076]" : "bg-[#FC6A6A]"}`} />

                                            </div>
                                            <p className="text-xs font-medium whitespace-nowrap text-left text-[#e9e9e9]">{anamoly}</p>

                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>

                </div>
            </>
        )
    }


    function NozzleTab() {
        const nozAnamolys = ["Nozzle Clog", "Over Extrution", "Under Extrution", "Temperature"]
        var temps = [57, 182, 241, 113, 209, 98, 275, 156, 223, 49]
        return (
            <div
                className="w-full h-auto flex flex-col gap-y-6 pt-7 py-4 px-[23px]">

                <div className="flex flex-row justify-between ">
                    <div className="flex flex-row gap-x-5">
                        <div className="flex flex-row items-center gap-x-1">
                            <Cone className="text-[#E9E9E9] h-xs w-xs font-thin rotate-180" />
                            <p className="text-lg font-medium text-left text-[#e9e9e9]">Nozzle</p>
                        </div>
                        <div className="w-[33px]  h-[33px] hover:!bg-[#a1c7e3] cursor-pointer flex flex-row items-center justify-center rounded-[5px] border border-[#A9C1D5] "
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                            }} onClick={() => props.setCam("nozzle")}>
                            <Eye className="h-[20px] w-[20px]" />

                        </div>

                    </div>

                    <div onClick={() => { setTab("universal"); props.setCam("main") }} className="w-[33px]  h-[33px] flex flex-row items-center justify-center rounded-[5px] border border-[#A9C1D5] hover:!bg-[#a1c7e3] cursor-pointer "
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                        }}>
                        <LayoutGrid className="h-[24px] w-[24px]" />


                    </div>




                </div>

                <AreaChart
                    width={464}
                    height={200}
                    data={props.tdata.reverse()}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ABC0D5" stopOpacity={1} />
                            <stop offset="95%" stopColor="#ABC0D5" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                        content={
                            ({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="w-auto px-2 h-[19px] flex flex-row items-center justify-center rounded-md bg-black/20 border border-[#d4d3d3]" >
                                            <p className=" text-[12px] font-light text-left text-[#e5effb]">
                                                {payload[0].value}°C
                                            </p>
                                        </div>)
                                }

                                return <p>null</p>
                            }}
                    />

                    <Area
                        type="monotone"
                        dataKey="nozzleTemp"
                        stroke="#E0E0E0"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                        animationDuration={0}


                    />
                </AreaChart>



                <div className="flex flex-col gap-y-2">

                    <p className="text-xl font-bold text-left text-[#e9e9e9]">Status</p>
                    <div className="flex flex-row flex-wrap  w-full h-auto break-before-auto gap-x-2 gap-y-1">


                        {
                            nozAnamolys.map((anamoly) => {
                                return (
                                    <div className="w-auto px-2 gap-x-2 h-[34px] flex flex-row rounded-[10px] justify-around items-center border border-[#b4b4b4]/80 "
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, rgba(138,138,138,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(127,127,127,0.5) 100%)",
                                        }}>
                                        <div className="flex flex-row justify-center items-center">
                                            <div className={`rounded-full h-[16px] w-[16px] ${stata[anamoly] == false ? "bg-[#8EF076]/60" : "bg-[#FC6A6A]/60 animate-ping"}`} />
                                            <div className={`rounded-full  absolute h-[10px] w-[10px] ${stata[anamoly] == false ? "bg-[#8EF076]" : "bg-[#FC6A6A]"}`} />

                                        </div>
                                        <p className="text-xs font-medium whitespace-nowrap text-left text-[#e9e9e9]">{anamoly}</p>

                                    </div>
                                )
                            })
                        }


                    </div>


                </div>

                <div className="flex flex-col">
                    <p className="text-xl font-bold text-left text-[#e9e9e9]">Details</p>
                    <div>
                        <p className="text-[13px] font-medium text-left text-[#e9e9e9]">Temperature: {data.nozzleTemp}</p>
                        <p className="text-[13px] font-medium text-left text-[#e9e9e9]">X Position: {data.xPos}</p>
                        <p className="text-[13px] font-medium text-left text-[#e9e9e9]">Y Position: {data.yPos}</p>
                        <p className="text-[13px] font-medium text-left text-[#e9e9e9]">Z Position: {data.zPos}</p>
                    </div>

                </div>




            </div>
        )
    }





    function BaseTab() {
        const nozAnamolys = ["Warping", "Stringing", "Poor Adhesion"]
        return (
            <div
                className="w-full h-auto flex flex-col gap-y-6 pt-7 py-4 px-[23px]">

                <div className="flex flex-row justify-between ">
                    <div className="flex flex-row gap-x-5">
                        <div className="flex flex-row items-center gap-x-1">
                            <CuboidIcon className="text-[#E9E9E9] h-xs w-xs font-thin rotate-180" />
                            <p className="text-lg font-medium text-left text-[#e9e9e9]">Bed</p>
                        </div>
                        <div className="w-[33px]  h-[33px] hover:!bg-[#a1c7e3] cursor-pointer flex flex-row items-center justify-center rounded-[5px] border border-[#A9C1D5] "
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                            }}>
                            <Eye className="h-[20px] w-[20px]" />

                        </div>

                    </div>

                    <div onClick={() => setTab("universal")} className="w-[33px]  h-[33px] flex flex-row items-center justify-center rounded-[5px] border border-[#A9C1D5] hover:!bg-[#a1c7e3] cursor-pointer "
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                        }}>
                        <LayoutGrid className="h-[24px] w-[24px]" />


                    </div>




                </div>


                <div className="flex flex-row justify-between h-[200] w-[474px]">

                    {/* <p className="text-xs font-medium rotate-90 p-1 w-auto h-auto  text-[#c8c8c8]">Temperature (C)</p> */}

                    <AreaChart
                        width={464}
                        height={200}
                        data={props.tdata}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ABC0D5" stopOpacity={1} />
                                <stop offset="95%" stopColor="#ABC0D5" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                            content={
                                ({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="w-auto px-2 h-[19px] flex flex-row items-center justify-center rounded-md bg-black/20 border border-[#d4d3d3]" >
                                                <p className=" text-[12px] font-light text-left text-[#e5effb]">
                                                    {payload[0].value}°C
                                                </p>
                                            </div>)
                                    }

                                    return <p>null</p>
                                }}
                        />

                        <Area
                            type="monotone"
                            dataKey="bedTemp"
                            stroke="#E0E0E0"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                            animationDuration={0}
                        />
                    </AreaChart>

                </div>



                <div className="flex flex-col gap-y-2">

                    <p className="text-xl font-bold text-left text-[#e9e9e9]">Status</p>
                    <div className="flex flex-row flex-wrap  w-full h-auto break-before-auto gap-x-2 gap-y-1">


                        {
                            nozAnamolys.map((anamoly) => {
                                return (
                                    <div className="w-auto px-2 gap-x-2 h-[34px] flex flex-row rounded-[10px] justify-around items-center border border-[#b4b4b4]/80 "
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, rgba(138,138,138,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(127,127,127,0.5) 100%)",
                                        }}>
                                        <div className="flex flex-row justify-center items-center">
                                            <div className={`rounded-full h-[16px] w-[16px] ${stata[anamoly] == false ? "bg-[#8EF076]/60" : "bg-[#FC6A6A]/60 animate-ping"}`} />
                                            <div className={`rounded-full  absolute h-[10px] w-[10px] ${stata[anamoly] == false ? "bg-[#8EF076]" : "bg-[#FC6A6A]"}`} />

                                        </div>
                                        <p className="text-xs font-medium whitespace-nowrap text-left text-[#e9e9e9]">{anamoly}</p>

                                    </div>
                                )
                            })
                        }


                    </div>


                </div>

                <div className="flex flex-col">
                    <p className="text-xl font-bold text-left text-[#e9e9e9]">Details</p>
                    <div>
                        <p className="text-[13px] font-medium text-left text-[#e9e9e9]">Temperature: {data.bedTemp}</p>
                        <p className="text-[13px] font-medium text-left text-[#e9e9e9]">Y Position: {data.yPos}</p>

                    </div>

                </div>




            </div>
        )
    }

    function FanTab() {
        const nozAnamolys = ["Nozzle Clog"]
        return (
            <div
                className="w-full h-auto flex flex-col gap-y-6 pt-7 py-4 px-[23px]">

                <div className="flex flex-row justify-between ">
                    <div className="flex flex-row gap-x-5">
                        <div className="flex flex-row items-center gap-x-1">
                            <Fan className="text-[#E9E9E9] h-xs w-xs font-thin rotate-180" />
                            <p className="text-lg font-medium text-left text-[#e9e9e9]">Fan</p>
                        </div>
                        <div className="w-[33px]  h-[33px] hover:!bg-[#a1c7e3] cursor-pointer flex flex-row items-center justify-center rounded-[5px] border border-[#A9C1D5] "
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                            }}>
                            <Eye className="h-[20px] w-[20px]" />

                        </div>

                    </div>

                    <div onClick={() => setTab("universal")} className="w-[33px]  h-[33px] flex flex-row items-center justify-center rounded-[5px] border border-[#A9C1D5] hover:!bg-[#a1c7e3] cursor-pointer "
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                        }}>
                        <LayoutGrid className="h-[24px] w-[24px]" />


                    </div>




                </div>


                <div className="flex flex-row justify-between h-[200] w-[474px]">

                    {/* <p className="text-xs font-medium rotate-90 p-1 w-auto h-auto  text-[#c8c8c8]">Temperature (C)</p> */}

                    <AreaChart
                        width={464}
                        height={200}
                        data={props.tdata}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ABC0D5" stopOpacity={1} />
                                <stop offset="95%" stopColor="#ABC0D5" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                            content={
                                ({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="w-auto px-2 h-[19px] flex flex-row items-center justify-center rounded-md bg-black/20 border border-[#d4d3d3]" >
                                                <p className=" text-[12px] font-light text-left text-[#e5effb]">
                                                    {payload[0].value}
                                                </p>
                                            </div>)
                                    }

                                    return <p>null</p>
                                }}
                        />

                        <Area
                            type="monotone"
                            dataKey="fanSpeed"
                            stroke="#E0E0E0"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                            animationDuration={0}
                        />
                    </AreaChart>

                </div>



                <div className="flex flex-col gap-y-2">

                    <p className="text-xl font-bold text-left text-[#e9e9e9]">Status</p>
                    <div className="flex flex-row flex-wrap  w-full h-auto break-before-auto gap-x-2 gap-y-1">


                        {
                            nozAnamolys.map((anamoly) => {
                                return (
                                    <div className="w-auto px-2 gap-x-2 h-[34px] flex flex-row rounded-[10px] justify-around items-center border border-[#b4b4b4]/80 "
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, rgba(138,138,138,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(127,127,127,0.5) 100%)",
                                        }}>
                                        <div className="flex flex-row justify-center items-center">
                                            <div className={`rounded-full h-[16px] w-[16px] ${stata[anamoly] == false ? "bg-[#8EF076]/60" : "bg-[#FC6A6A]/60 animate-ping"}`} />
                                            <div className={`rounded-full  absolute h-[10px] w-[10px] ${stata[anamoly] == false ? "bg-[#8EF076]" : "bg-[#FC6A6A]"}`} />

                                        </div>
                                        <p className="text-xs font-medium whitespace-nowrap text-left text-[#e9e9e9]">{anamoly}</p>

                                    </div>
                                )
                            })
                        }


                    </div>


                </div>

                <div className="flex flex-col">
                    <p className="text-xl font-bold text-left text-[#e9e9e9]">Details</p>
                    <div>
                        <p className="text-[13px] font-medium text-left text-[#e9e9e9]">Fan Speed: {data.fanSpeed}</p>
                    </div>

                </div>




            </div>
        )
    }





    return (
        <div className=" " {...props}>
            <div className=" h-auto w-auto top-[20vh] absolute left-0  flex flex-row items-center">


                <div
                    className={`h-auto min-w-[350px] w-auto flex flex-row py-1 bg-transparent justify-between rounded-r-[10px] border-l-0 border border-[#c9c9c9]  transition duration-300 ease-in-out ${isPanelVisible ? "" : "transform translate-x-[-90%]"}
`}
                    style={{ background: "linear-gradient(to bottom, #717171 0%, #807f7f 54%, #6f6f6f 100%)" }}
                    onClick={togglePanel}>
                    <>
                        <div className="flex flex-col w-full h-full bg-transparent" onClick={(e) => e.stopPropagation()}>
                            <div className={` ${isPanelVisible ? "w-[95%]" : "w-[0%]"} h-[52px] px-2 hover:bg-[#D3D3D3]/60 cursor-pointer flex flex-row items-center gap-x-2 bg-[#828282]/60 border border-[#454545]/60 `} onClick={() => setTab("nozzle")} >
                                <Cone className="w-6 h-6 my-auto rotate-180  text-[#EFEFEF]" />
                                <p className="text-[15px] font-medium text-left text-[#e9e9e9]">Nozzle (N)</p>

                            </div>
                            <div className="w-[95%] flex flex-row gap-x-2 items-center h-[52px] px-2 hover:bg-[#D3D3D3]/60 cursor-pointer bg-[#828282]/60 border border-[#454545]/60" onClick={() => setTab("base")}>
                                <Cuboid className="w-6 h-6 my-auto rotate-180  text-[#EFEFEF]" />
                                <p className="text-[15px] font-medium text-left text-[#e9e9e9]">Base (B)</p>


                            </div>
                            <div className="w-[95%] flex flex-row gap-x-2 cursor-pointer px-2 hover:bg-[#D3D3D3]/60 items-center  h-[52px] bg-[#828282]/60 border border-[#454545]/60 " onClick={() => setTab("fan")} >
                                <Fan className="w-6 h-6 my-auto rotate-180  text-[#EFEFEF]" />
                                <p className="text-[15px] font-medium text-left text-[#e9e9e9]">Fan (F)</p>


                            </div>
                        </div></>
                    <div className="w-7 my-auto  h-auto">

                        {isPanelVisible ? <LuChevronLeft
                            className={`w-5 h-5 my-auto cursor-pointer  text-[#c9c9c9] hover:h-6 hover:w-6 cursor-pointer"
                        }`}
                            onClick={togglePanel}
                        /> : <LuChevronRight
                            className={`w-5 h-5 my-auto cursor-pointer  text-[#c9c9c9] hover:h-6 hover:w-6 cursor-pointer"
                    }`}
                            onClick={togglePanel}
                        />}


                    </div>
                </div>

            </div>




            {/* right */}
            <div className=" h-auto w-auto absolute top-[15vh] right-[0vw] bg-transparent ">
                <div className={`flex transition duration-300 ease-in-out flex-row ${isDetailVisible ? "" : "transform translate-x-[92%]"}`} >
                    <div className="w-[28px] mt-4 -mr-[1px] flex flex-col justify-center h-[40px] rounded-tl-[10px] rounded-bl-[10px] border border-[#A9C1D5] "
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                        }} onClick={toggleDetail}>
                        {!isDetailVisible ? <LuChevronLeft className="mx-auto my-auto w-5 h-5 text-[#c9c9c9] hover:h-6 hover:w-6 cursor-pointer" /> : <LuChevronRight className="mx-auto my-auto w-5 h-5 text-[#c9c9c9] hover:h-6 hover:w-6 cursor-pointer" />}

                    </div>
                    <div
                        className={`w-[488px] min-h-[600px] z-10 max-h-screen h-auto rounded-l-[10px] border border-r-0 border-[#A9C1D5] backdrop-blur-md `}
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.3) 0%, rgba(128,127,127,0.2) 44%, rgba(78,76,76,0.3) 50%)",
                        }}
                    >
                        {tab === "nozzle" ? <NozzleTab /> : (tab === "base" ? <BaseTab /> : (tab === "fan" ? <FanTab /> : (tab === "universal" ? <UniversalPanel stata={stata} /> : (tab === "controll" && <><ControllPanel stata={stata} data={data} controller={controller} setTab={setTab} /></>))))}

                    </div>

                </div>


            </div>


        </div>
    );
}






function ControllPanel(props: any) {
    const data = props.data
    const [customCode, setCustomCode] = useState("")
    const [fanSpeed, setFanSpeed] = useState(data.fanSpeed)
    const [nozTemp, setNozTemp] = useState(data.nozzleTemp)
    const [bedTemp, setBedTemp] = useState(data.bedTemp)
    const [pos, setPos] = useState({ "x": data.xPos, "y": data.yPos, "z": data.zPos })

    useEffect(() => {
        props.controller(`M106 S${fanSpeed}`)

    }, [fanSpeed])

    useEffect(() => {
        props.controller(`M104 S${nozTemp}`)

    }, [nozTemp])
    useEffect(() => {
        props.controller(`M140 S${bedTemp}`)

    }, [bedTemp])

    useEffect(() => {
        props.controller(`G1 X${pos.x} Z${pos.z} Y${pos.y}`)

    }, [pos])
    




    return (
        <div
            className="w-full h-auto flex flex-col gap-y-6 pt-7 py-4 ">

            {/* top head */}
            <div className="flex flex-row justify-between px-[23px] ">
                <div className="flex flex-row gap-x-5">
                    <div className="flex flex-row items-center gap-x-1">
                        <BiSolidJoystickButton className="text-[#E9E9E9] h-xs w-xs font-thin rotate-180" />
                        <p className="text-lg font-medium text-left text-[#e9e9e9]">Control Panel</p>
                    </div>

                </div>

                <div onClick={() => { props.setTab("universal"); props.setCam("main") }} className="w-[33px]  h-[33px] flex flex-row items-center justify-center rounded-[5px] border border-[#A9C1D5] hover:!bg-[#a1c7e3] cursor-pointer "
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                    }}>
                    <LayoutGrid className="h-[24px] w-[24px]" />


                </div>




            </div>

            <div className="w-full h-[1px] bg-[#CFD7E0] my-1" />

            {/* position */}
            <>
                <div className="px-[23px]">
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-row gap-x-[2px]">

                            <div className="flex flex-col gap-y-">
                                <div
                                    className="w-[47px] h-11 rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, x: (parseInt(pos.x) - 1).toString(), y: (parseInt(pos.y) + 1).toString() })}
                                >
                                    <ChevronUp className="h-[24px] mt-2 mx-auto w-[24px] -rotate-45 " />

                                </div>
                                <div
                                    className="w-[47px] h-[50px] rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, x: (parseInt(pos.x) - 1).toString() })}
                                >

                                    <MoveLeft className="h-[24px] mt-3 mx-auto w-[18px] text-bold " />


                                </div>
                                <div
                                    className="w-[47px] h-11 rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, x: (parseInt(pos.x) - 1).toString(), y: (parseInt(pos.y) - 1).toString() })}
                                >

                                    <ChevronDown className="h-[24px] mt-2 mx-auto w-[24px] rotate-45 " />

                                </div>
                            </div>



                            <div className="flex flex-col gap-y-">
                                <div
                                    className="w-[47px] h-[94px] rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, y: (parseInt(pos.y) + 1).toString() })}
                                >
                                    <MoveUp className="h-[24px] mt-4 mx-auto w-[18px]  " />


                                </div>

                                <div
                                    className="w-[47px] h-11 rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, y: (parseInt(pos.y) - 1).toString() })}
                                >

                                    <MoveDown className="h-[24px] mt-2 mx-auto w-[18px]  " />

                                </div>
                            </div>


                            <div className="flex flex-col gap-y-">
                                <div
                                    className="w-[47px] h-11 rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, x: (parseInt(pos.x) + 1).toString(), y: (parseInt(pos.y) + 1).toString() })}
                                >

                                    <ChevronUp className="h-[24px] mt-2 mx-auto w-[24px] rotate-45 " />

                                </div>
                                <div
                                    className="w-[47px] h-[50px] rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, x: (parseInt(pos.x) + 1).toString() })}
                                >

                                    <MoveRight className="h-[24px] mt-3 mx-auto w-[18px]  " />
                                </div>
                                <div
                                    className="w-[47px] h-11 rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, x: (parseInt(pos.x) + 1).toString(), y: (parseInt(pos.y) - 1).toString() })}
                                >


                                    <ChevronDown className="h-[24px] mt-2 mx-auto w-[24px] -rotate-45 " />
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-">
                                <div
                                    className="w-[47px] h-[69px] ml-2 rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, x: (parseInt(pos.z) + 1).toString() })}
                                >
                                    <ArrowBigUpDash className="h-[24px] mt-3 mx-auto w-[18px]  " />

                                </div>
                                <div
                                    className="w-[47px] h-[69px] ml-2 rounded-[5px] border border-[#ACBFD5] shadow-[0px_2px_0px_0_#abc0d6] hover:!shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, rgba(68,68,68,0.4) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                    }} onClick={() => setPos({ ...pos, z: (parseInt(pos.z) - 1).toString() })}
                                >
                                    <ArrowBigDownDash className="h-[24px] mt-3 mx-auto w-[18px]  " />

                                </div>

                            </div>

                        </div>



                        <div className="flex flex-col gap-y-2 ml-9 items-center w-auto">

                            <div className="flex flex-row items-center">
                                <LocateFixed className="h-[20px] w-[20px]" />
                                <p className="text-sm">Position</p>

                            </div>
                            <div className="flex flex-row">
                                <div className="flex flex-col gap-y-1 items-center ">
                                    <p className="text-[10px] font-bold text-left text-[#e4effd]">X</p>
                                    <input type="number" max="220" min="1" value={pos.x} onChange={(e) => setPos({ ...pos, x: e.target.value })}
                                        className="w-[33px] h-[33px] text-[10px] font-medium text-center rounded-[5px] border border-[#ACC0D6] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                                        }}
                                    ></input>

                                </div>

                                <div className="flex flex-col gap-y-1 items-center ">
                                    <p className="text-[10px] font-bold text-left text-[#e4effd]">Y</p>
                                    <input type="number" max="220" min="1" value={pos.y} onChange={(e) => setPos({ ...pos, y: e.target.value })}
                                        className="w-[33px] h-[33px] text-[10px] font-medium text-center rounded-[5px] border border-[#ACC0D6] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                                        }}
                                    ></input>

                                </div>

                                <div className="flex flex-col gap-y-1 items-center ">
                                    <p className="text-[10px] font-bold text-left text-[#e4effd]">Z</p>
                                    <input type="number" max="220" min="1" value={pos.z} onChange={(e) => setPos({ ...pos, z: e.target.value })}
                                        className="w-[33px] h-[33px] text-[10px] font-medium text-center rounded-[5px] border border-[#ACC0D6] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                                        }}
                                    ></input>

                                </div></div>

                            <div
                                className="w-auto gap-x-2 cursor-pointer h-auto p-2 felx inline-flex items-center justify-center rounded-[5px] border border-[#ACC0D6] shadow-[0px_2px_0px_0_#abc0d6] hover:shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, rgba(68,68,68,0.2) 0%, rgba(177,177,177,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                                }} onClick={() => { setPos({ "x": "0", "y": "0", "z": "0" }) }}
                            >
                                <Home />
                                <>
                                    <p className="text-xs font-medium">Auto Home</p></>

                            </div>

                        </div>
                    </div>
                </div>


                <div className="flex flex-row gap-x-4 mx-auto">

                    <div
                        className="w-auto gap-x-2 cursor-pointer h-auto px-2 py-1 felx inline-flex items-center justify-center rounded-[5px] border border-[#ACC0D6] shadow-[0px_2px_0px_0_#abc0d6] hover:shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.2) 0%, rgba(177,177,177,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                        }}
                    >
                        <img src="/PLA.svg" className="w-auto h-5" />
                        <>
                            <p className="text-xs font-medium bg-gradient-to-b from-[#e3e7ea]  to-[#FFF] inline-block text-transparent bg-clip-text">Preheat PLA</p></>

                    </div>

                    <div
                        className="w-auto gap-x-2 cursor-pointer h-auto p-2 felx inline-flex items-center justify-center rounded-[5px] border border-[#ACC0D6] shadow-[0px_2px_0px_0_#abc0d6] hover:shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.2) 0%, rgba(177,177,177,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                        }}
                    >
                        <img src="/ABS.svg" className="w-auto h-5" />
                        <>
                            <p className="text-xs font-medium">Preheat ABS</p></>

                    </div>

                    <div
                        className="w-auto gap-x-2 cursor-pointer h-auto p-2 felx inline-flex items-center justify-center rounded-[5px] border border-[#ACC0D6] shadow-[0px_2px_0px_0_#abc0d6] hover:shadow-[0px_2px_0px_0_#abc0d6,0px_6px_14.399999618530273px_3px_rgba(255,243,243,0.25)]"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.2) 0%, rgba(177,177,177,0.5) 54%, rgba(78,76,76,0.2) 100%)",
                        }}
                    >
                        <AirVent className="w-auto h-5" />
                        <>
                            <p className="text-xs font-medium">Cool Down</p></>

                    </div>


                </div>
            </>

            <div className="w-full h-[1px] bg-[#CFD7E0] my-2" />
            {/* temperature */}

            <div className="flex flex-col px-[23px]">
                <div className="flex flex-row">
                    <Thermometer className="w-auto h-5" />
                    <p className="text-base font-semibold text-left text-[#e9e9e9]">Temperature</p>

                </div>

                <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 my-3">
                    {/* each */}
                    <div className="flex flex-row gap-x-2">
                        <p className="text-sm  text-left text-[#e9e9e9]">Nozzle Temp:</p>
                        <div className="flex flex-row items-center ">
                            <button>
                                <Minus className="w-[21px] h-[25px] rounded-l-[3px] -mr-[1px] bg-gradient-to-b hover:bg-[#cfd2d6] from-[#b1bed2]/50 to-[#b1bed2]/50 border border-[#A9C1D5] " /></button>
                            <input className="w-[50px] max-h-[25px] text-xs align-middle py-1 text-center   bg-[#b1bed2]/[0.08] border border-[#A9C1D5] px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" value={nozTemp} onChange={(e) => setNozTemp(e.target.value)}>


                            </input>
                            <button>
                                <Plus className="w-[21px] h-[25px] rounded-r-[3px] -ml-[1px] hover:bg-[#cfd2d6] bg-gradient-to-b from-[#b1bed2]/50 to-[#b1bed2]/50 border border-[#A9C1D5] " />
                            </button>
                        </div>

                    </div>

                    <div className="flex flex-row gap-x-2">
                        <p className="text-sm  text-left text-[#e9e9e9]">Bed Temp:</p>
                        <div className="flex flex-row items-center ">
                            <button>
                                <Minus className="w-[21px] h-[25px] rounded-l-[3px] -mr-[1px] bg-gradient-to-b hover:bg-[#cfd2d6] from-[#b1bed2]/50 to-[#b1bed2]/50 border border-[#A9C1D5] " /></button>
                            <input className="w-[50px] max-h-[25px] text-xs align-middle py-1 text-center   bg-[#b1bed2]/[0.08] border border-[#A9C1D5] px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" value={bedTemp} onChange={(e) => setBedTemp(e.target.value)}>


                            </input>
                            <button>
                                <Plus className="w-[21px] h-[25px] rounded-r-[3px] -ml-[1px] hover:bg-[#cfd2d6] bg-gradient-to-b from-[#b1bed2]/50 to-[#b1bed2]/50 border border-[#A9C1D5] " />
                            </button>
                        </div>

                    </div>

                    <div className="flex flex-row gap-x-2">
                        <p className="text-sm  text-left text-[#e9e9e9]">Fan speed:</p>
                        <div className="flex flex-row items-center ">
                            <button>
                                <Minus className="w-[21px] h-[25px] rounded-l-[3px] -mr-[1px] bg-gradient-to-b hover:bg-[#cfd2d6] from-[#b1bed2]/50 to-[#b1bed2]/50 border border-[#A9C1D5] " /></button>
                            <input className="w-[50px] max-h-[25px] text-xs align-middle py-1 text-center   bg-[#b1bed2]/[0.08] border border-[#A9C1D5] px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" value={fanSpeed} onChange={(e) => setFanSpeed(parseInt(e.target.value))}>


                            </input>
                            <button>
                                <Plus className="w-[21px] h-[25px] rounded-r-[3px] -ml-[1px] hover:bg-[#cfd2d6] bg-gradient-to-b from-[#b1bed2]/50 to-[#b1bed2]/50 border border-[#A9C1D5] " />
                            </button>
                        </div>

                    </div>


                </div>
            </div>

            <div className="w-full h-[1px] bg-[#CFD7E0] my-1" />
            {/* custom */}
            <div className="flex flex-col gap-y-2 px-[23px] mb-4">
                <div className="flex flex-row items-center gap-x-1">
                    <PenBox className="w-[18px] h-[18px]"></PenBox>
                    <p className="text-sm font-semibold text-left text-[#e9e9e9]">G-Code:</p>
                </div>
                <div className="flex flex-row gap-x-1">
                    <>
                        <input key="customCodeinput" onChange={(e) => setCustomCode(e.target.value)} value={customCode} placeholder="M 423.." className="w-[164px] px-1 h-7 rounded-[5px] placeholder:text-[#c6c6c6] text-[#d3d3d3] border border-[#A9C1D5]"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(116,116,116,0.2) 0%, rgba(128,127,127,0.3) 54%, rgba(170,168,168,0.2) 100%)",
                                boxShadow: "0px 2px 0px 0 rgba(255,255,255,0.25)",
                            }}></input>
                    </>
                    <button onClick={() => { props.controller(customCode) }} className="w-[30px] h-7 rounded-[5px] border border-[#A9C1D5] shadow-[0_2px_0px_0_rgba(255,255,255,0.25)] hover:shadow-[0px_4px_4px_0_rgba(255,255,255,0.25),0_2px_0px_0_rgba(255,255,255,0.25)]"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(116,116,116,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(170,168,168,0.5) 100%)",

                        }}>
                        <Play className="w-[18px] h-[18px] mx-auto my-auto" />

                    </button>

                </div>

            </div>




        </div>
    )

}
