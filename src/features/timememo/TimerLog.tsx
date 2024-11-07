// // import React from 'react'

// const TimerLog = () => {
//     return (
//         <div className="">
//             <div
//                 className={`md:mt-5 mt-2 w-[100%] ${
//                     timerMode === "common" ? "bg-[#212121]" : "bg-[#253349]"
//                 } lg:h-[400px] h-[150px] rounded-xl xl:p-10 p-5 overflow-y-scroll no-bar`}
//             >
//                 {parsedData?.length === 0 ? (
//                     <>
//                         <p className="text-gray-500">
//                             タスクを選択してください
//                         </p>
//                     </>
//                 ) : (
//                     <>
//                         <p>今日の記録</p>
//                     </>
//                 )}
//                 {parsedData?.map((item: PropTodaydata, index: number) => (
//                     <div
//                         key={index}
//                         className="flex md:mt-5 mt-2 border-b pb-1 border-gray-700"
//                     >
//                         <p className="lg:text-md text-xs">{item.created_at}</p>
//                         <div className="ml-5 ">
//                             {formData(item.time_second)}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default TimerLog
