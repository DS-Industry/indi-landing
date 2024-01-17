import { BiInfoCircle } from "react-icons/bi";

export default function Toast ({ title, body } : {title: string, body: string}) {
    return (
        <div className=" w-full flex justify-center h-16">
            <div className=" text-black flex flex-row justify-start w-full items-start mt-2 bg-toastSecondary rounded-lg shadow-[0px_2px_3px_1px_rgb(0,0,0,0.3)]" >
                <div className=" w-3 h-14 bg-toastPrimary rounded-l-lg">
                    <p className=" invisible ">T</p>
                </div>
                <div className=" h-12 w-8 flex items-center justify-center text-4xl ml-4 mr-4 text-toastPrimary pt-2">
                    <BiInfoCircle />
                </div>
                <div className=" flex flex-row items-center justify-between w-full h-14 pr-2 font-inter-regular text-md">
                    <p>{title}</p>
                    <p>{body}</p>
                </div>
            </div>
        </div>
    )
}