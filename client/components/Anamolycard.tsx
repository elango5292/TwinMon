"use client"

export default function Anamolycard({data}: any) {
    // console.log("from anamoly",data)
    // ['Warping', 'Nozzle Clogging', 'Over Extrusion', 'Under Extrusion']
    return (
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container grid gap-6 px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md  text-[#000]">
              <div className="p-6 flex flex-col items-start gap-4">
                
                {data?.prediction[0]==1?<>
                    <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFCDD2] animate-ping flex items-center justify-center">
                    <BoldIcon className="w-5 h-5 text-[#C62828]" />
                  </div>
                  <span className="text-[#C62828] font-semibold">Warning!</span>
                </div>
                </>:<>
                    <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C6E8C6] flex items-center justify-center">
                    <BoldIcon className="w-5 h-5 text-[#2E7D32]" />
                  </div>
                  <span className="text-[#2E7D32] font-semibold">Normal</span>
                </div>
                </>}
              
                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">Warping</h3>
                </div>
              </div>
              
            </div>
            <div className="bg-white rounded-lg shadow-md  text-[#000]">
              <div className="p-6 flex flex-col items-start gap-4">


              {data?.prediction[1]==1?<>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFCDD2] animate-ping flex items-center justify-center">
                    <CogIcon className="w-5 h-5 text-[#C62828]" />
                  </div>
                  <span className="text-[#C62828] font-semibold">Warning!</span>
                </div></>:<>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C6E8C6] flex items-center justify-center">
                    <CogIcon className="w-5 h-5 text-[#2E7D32]" />
                  </div>
                  <span className="text-[#2E7D32] font-semibold">Normal</span>
                </div></>
                    }




                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">Nozzle Clogging</h3>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md  text-[#000]">
              <div className="p-6 flex flex-col items-start gap-4">
                


              {data?.prediction[2]==1?<>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFCDD2] animate-ping flex items-center justify-center">
                    <TrendingUpIcon className="w-5 h-5 text-[#C62828]" />
                  </div>
                  <span className="text-[#C62828] font-semibold">Warning!</span>
                </div>
</>:<>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C6E8C6] flex items-center justify-center">
                    <TrendingUpIcon className="w-5 h-5 text-[#2E7D32]" />
                  </div>
                  <span className="text-[#2E7D32] font-semibold">Normal</span>
                </div>
</>
                }




                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">Over Extrusion</h3>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md  text-[#000]">
              <div className="p-6 flex flex-col items-start gap-4">

              {data?.prediction[3]==1?<>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full animate-ping bg-[#FFCDD2] flex items-center justify-center">
                    <TrendingDownIcon className="w-5 h-5 text-[#C62828]" />
                  </div>
                  <span className="text-[#C62828] font-semibold">Warning!</span>
                </div></>:<>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C6E8C6] flex items-center justify-center">
                    <TrendingDownIcon className="w-5 h-5 text-[#2E7D32]" />
                  </div>
                  <span className="text-[#2E7D32] font-semibold">Normal</span>
                </div></>

              }
                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">Under Extrusion</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  function BoldIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 12a4 4 0 0 0 0-8H6v8" />
        <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
      </svg>
    )
  }
  
  
  function CogIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 2v2" />
        <path d="M12 22v-2" />
        <path d="m17 20.66-1-1.73" />
        <path d="M11 10.27 7 3.34" />
        <path d="m20.66 17-1.73-1" />
        <path d="m3.34 7 1.73 1" />
        <path d="M14 12h8" />
        <path d="M2 12h2" />
        <path d="m20.66 7-1.73 1" />
        <path d="m3.34 17 1.73-1" />
        <path d="m17 3.34-1 1.73" />
        <path d="m11 13.73-4 6.93" />
      </svg>
    )
  }
  
  
  function TrendingDownIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
        <polyline points="16 17 22 17 22 11" />
      </svg>
    )
  }
  
  
  function TrendingUpIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    )
  }