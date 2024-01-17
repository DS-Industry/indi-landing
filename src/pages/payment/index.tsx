import { useLocation, useNavigate } from "react-router-dom"
import  Logo from "./../../assets/logo.png";
import UnAuthLayout from "../../layouts/unauthorized";
import { useEffect } from "react";
import Button from "../../components/button";
import Human from "./../../assets/Saly-34.png";
import axios from "axios";
import api from "../../api";

declare global {
    interface Window {
      // ⚠️ notice that "Window" is capitalized here
      Razorpay: any;
    }
  }

export default function Payment () {

    function loadScript(src: string) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state || !state.sum || !state.box) {
            console.log(state);
            navigate('/')
        }
    }, [])

    const handleClick = () => {
        const getOrderIdAsync = async () => {
            try {
                console.log('here');
                const scriptResponse = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
                if (!scriptResponse) throw new Error('Load script error');
                console.log('here 2');
                const orderResponse = await api.post("order/create", {
                    amount: state.sum * 100 
                });

                if (!orderResponse) throw new Error('Get order id error');
                const { orderId } = orderResponse.data;

                const options = {
                    "key": `${import.meta.env.VITE_RAZORPAY_KEY_SECRET}`, // Enter the Key ID generated from the Dashboard
                    "key_id" : `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
                    "amount": state.sum * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "MOY-KA!DS",
                    "description": "Test Transaction",
                    "image": { Logo },
                    "order_id": `${orderId}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response: any){
        
                        const result = await axios.post("order/check", {
                            response,
                            orderId: orderId,
                            deviceId: state.box,
                            amount: state.sum
                        });
                        alert(result.data.signatureIsValid);
                    },
                    "prefill": {
                        "name": "Test test",
                        "email": "test@test.com",
                        "contact": "9000090000"
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#0B68E1"
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                console.log(error);
            }
        }
        getOrderIdAsync();
    }

    return (
        <div className=" text-white h-full">
            <UnAuthLayout>
                <div className="flex flex-col bg-white-600 pb-12 rounded-3xl shadow-2xl">
                    <div className=" w-full flex justify-center items-center mt-10">
                        <img src={Human} alt="human" className=" w-32 shadow-[-15px_15px_25px_-5px_rgb(0,0,0,0.2)] rounded-3xl" />
                    </div>
                    <div className=" w-full flex flex-col items-start px-5 mb-5 mt-10">
                        <p className=" font-bold">Your selection:</p>
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