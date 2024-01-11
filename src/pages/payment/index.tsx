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

    const handleClick = () => {

    }

    return (
        <div className=" text-white h-full">
            <UnAuthLayout>
                <div className="flex flex-col bg-white-600 pb-48 rounded-3xl">
                    <div className=" w-full flex justify-center items-center">
                        <img src={Human} alt="human" className=" w-40 h-40" />
                    </div>
                    <div className=" w-full flex flex-col items-start px-5 mb-5">
                        <p className=" font-bold">Your selection:</p>
                        <div className=" flex flex-row justify-between w-full" >
                            <p>Box</p>
                            <p className=" font-bold">{state.box}</p>
                        </div>
                        <div className=" flex flex-row justify-between w-full" >
                            <p>Amount to pay</p>
                            <p className=" font-bold">{state.sum} ₹</p>
                        </div>
                    </div>
                    <div>
                        <Button value="" handleClick={handleClick} title="Pay"/>
                    </div>
                </div>
            </UnAuthLayout>
        </div>
    )
}