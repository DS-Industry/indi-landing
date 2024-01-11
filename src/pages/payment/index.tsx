import { useLocation, useNavigate } from "react-router-dom"
import UnAuthLayout from "../../layouts/unauthorized";
import { useEffect } from "react";
import Button from "../../components/button";
import Human from "./../../assets/Saly-34.png";

export default function Payment () {

    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state || !state.sum || !state.box) {
            console.log(state);
            navigate('/')
        }
    }, [])

    const handleClick = () => {}

    return (
        <div className=" text-white h-full">
            <UnAuthLayout>
                <div className="flex flex-col bg-white-600 pb-12 rounded-3xl shadow-2xl">
                    <div className=" w-full flex justify-center items-center mt-10">
                        <img src={Human} alt="human" className=" w-32 shadow-[-15px_15px_25px_-5px_rgb(0,0,0,0.2)] rounded-3xl" />
                    </div>
                    <div className=" w-full flex flex-col items-start px-5 mb-5 mt-10">
                        <p className=" font-bold">Your selection:</p>
                        <div className=" flex flex-row justify-between w-full mt-3 font-sans-light " >
                            <p>Box</p>
                            <p className=" font-sans-regular font-bold">{state.box}</p>
                        </div>
                        <div className=" flex flex-row justify-between w-full font-sans-light " >
                            <p>Amount to pay</p>
                            <p className=" font-sans-regular font-bold">{state.sum} ₹</p>
                        </div>
                    </div>
                    <div className=" mt-16">
                        <Button value="" handleClick={handleClick} title="Pay"/>
                    </div>
                </div>
            </UnAuthLayout>
        </div>
    )
}