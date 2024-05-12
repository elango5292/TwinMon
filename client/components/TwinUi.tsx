"use client"
import { useState } from "react";
import { LuChevronLeft, LuChevronRight, } from "react-icons/lu";
import { Cone, Cuboid, Eye, Fan, LayoutGrid, SquarePower } from 'lucide-react';

export default function TwinUi(props: any) {
    const data = props.data;
    const [isPanelVisible, setIsPanelVisible] = useState(true);
    const [isDetailVisible, setIsDetailVisible] = useState(true);
    const [stata, setStata] = useState({
        "Nozzle Clog": false,
        "Over Extrution": false,
        "Under Extrution": false,
        "Warping": false,
        "Stringing": false,
        "Poor Adhesion": false,
        "Temperature": false
    })
    const [tab, setTab] = useState<String>("universal");
    const togglePanel = () => {
        setIsPanelVisible(!isPanelVisible);
    };
    const toggleDetail = () => {
        setIsDetailVisible(!isDetailVisible);
    };
    const anamolys = ["Nozzle Clog", "Over Extrution", "Under Extrution", "Warping", "Stringing", "Poor Adhesion", "Temperature"];
    const hasIssue = Object.values(stata).some(value => value === true);

    const bgColorMain =  hasIssue ? '#8EF076' : '#FC6A6A';


    function UniversalPanel() {
        return (
            <>
                <div className="flex flex-col w-full gap-y-[31px] h-auto px-[15px] py-4">

                    <p className="text-xl font-bold text-left text-[#e9e9e9]">Universal Panel</p>

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

                        <div className="w-[46px] flex flex-row justify-center items-center h-[43.18px] rounded-[10px] border border-[#b4b4b4]/80"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(138,138,138,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(127,127,127,0.5) 100%)",
                            }}>

                            <div className={`bg-${!hasIssue  ? "[#8EF076]  h-[12px] w-[12px]" : "[#FC6A6A]  h-[15px] w-[15px]"} absolute z-10 rounded-full `} />
                            <div className={`bg-${ !hasIssue  ? "[#8EF076]/60" : "[#FC6A6A]/60 animate-ping"} rounded-full h-[21px] w-[21px] `} />







                        </div>
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold text-left text-[#e9e9e9]">Universal Status</p>
                            <p className="text-[10px] font-medium text-left text-[#e9e9e9]">Machine is Normal</p>


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
                                        <div className="w-auto px-2 gap-x-2 h-[34px] flex flex-row rounded-[10px] justify-around items-center border border-[#b4b4b4]/80 "
                                            style={{
                                                background:
                                                    "linear-gradient(to bottom, rgba(138,138,138,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(127,127,127,0.5) 100%)",
                                            }}>
                                            <div className="flex flex-row justify-center items-center">
                                                <div className={`rounded-full h-[16px] w-[16px] bg-${stata[anamoly] == false ? "[#8EF076]/60" : "[#FC6A6A]/60 animate-ping"}`} />
                                                <div className={`rounded-full  absolute h-[10px] w-[10px] bg-${stata[anamoly] == false ? "[#8EF076]" : "[#FC6A6A]"}`} />

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


    function NozzleTab(){
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
                        <div className="w-[33px]  h-[33px] hover:!bg-[#a1c7e3] cursor-pointer flex flex-row items-center justify-center rounded-[5px] border border-[#bcbcbc] "
  style={{
    background:
      "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
  }}>
     <Eye className="h-[20px] w-[20px]" />

                        </div>

                    </div>

                    <div onClick={()=>setTab("universal")} className="w-[33px]  h-[33px] flex flex-row items-center justify-center rounded-[5px] border border-[#bcbcbc] hover:!bg-[#a1c7e3] cursor-pointer "
  style={{
    background:
      "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
  }}>
    <LayoutGrid className="h-[24px] w-[24px]" />
     

                        </div>
                    

                    

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
                    <div className={`rounded-full h-[16px] w-[16px] bg-${stata[anamoly] == false ? "[#8EF076]/60" : "[#FC6A6A]/60 animate-ping"}`} />
                    <div className={`rounded-full  absolute h-[10px] w-[10px] bg-${stata[anamoly] == false ? "[#8EF076]" : "[#FC6A6A]"}`} />

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
    function BaseTab(){
        return (
            <p>Base</p>
        )
    }

    function FanTab(){
        return (
            <p>Fan</p>
        )
    }


    return (
        <div className="w-full h-full " {...props}>
            <div className=" h-auto w-auto absolute top-[20%] left-[0%]  flex flex-row items-center">


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
                            className={`w-5 h-5 my-auto  text-[#c9c9c9] hover:h-6 hover:w-6 cursor-pointer"
                        }`}
                            onClick={togglePanel}
                        /> : <LuChevronRight
                            className={`w-5 h-5 my-auto  text-[#c9c9c9] hover:h-6 hover:w-6 cursor-pointer"
                    }`}
                            onClick={togglePanel}
                        />}


                    </div>
                </div>

            </div>





            <div className=" h-auto w-auto absolute top-[15%] right-[0%] ">
                <div className={`flex transition duration-300 ease-in-out flex-row ${isDetailVisible ? "" : "transform translate-x-[90%]"}`} >
                    <div className="w-[28px] mt-4 -mr-[1px] flex flex-col justify-center h-[40px] rounded-tl-[10px] rounded-bl-[10px] border border-[#bcbcbc] "
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 54%, rgba(78,76,76,0.5) 100%)",
                        }} onClick={toggleDetail}>
                        {!isDetailVisible ? <LuChevronLeft className="mx-auto my-auto w-5 h-5 text-[#c9c9c9] hover:h-6 hover:w-6 cursor-pointer" /> : <LuChevronRight className="mx-auto my-auto w-5 h-5 text-[#c9c9c9] hover:h-6 hover:w-6 cursor-pointer" />}

                    </div>
                    <div
                        className={`w-[488px] min-h-[600px] z-10 max-h-screen h-auto rounded-l-[10px] border border-r-0 border-[#bcbcbc]  `}
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(68,68,68,0.5) 0%, rgba(128,127,127,0.5) 44%, rgba(78,76,76,0.5) 80%)",
                        }}
                    >
                        {tab === "nozzle" ? <NozzleTab /> : (tab === "base" ? <BaseTab /> :(tab==="fan" ? <FanTab />:(tab==="universal" ? <UniversalPanel />:<></>)))}
                        
                    </div>

                </div>


            </div>


        </div>
    );
}




