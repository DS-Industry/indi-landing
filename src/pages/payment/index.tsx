import { useLocation, useNavigate } from "react-router-dom"
import  Logo from "./../../assets/logo.png";
import UnAuthLayout from "../../layouts/unauthorized";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Human from "./../../assets/Saly-34.png";
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
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        if (!state || (state && (!state.sum || !state.box))) navigate(`/`)
    }, [])

    const handleClick = () => {
        const getOrderIdAsync = async () => {
            try {
                console.log('here');
                setLoading(true);
                const scriptResponse = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
                if (!scriptResponse) {
                    navigate('/error');
                }
                const orderResponse = await api.post("order/create", {
                    amount: state.sum * 100 
                });
                setLoading(false);

                if (!orderResponse) {
                    navigate('/error');
                }
                const { orderId } = orderResponse.data;

                const options = {
                    "key": `${import.meta.env.VITE_RAZORPAY_KEY_SECRET}`, // Enter the Key ID generated from the Dashboard
                    "key_id" : `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
                    "amount": state.sum * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "MOY-KA!DS",
                    "description": "Transaction",
                    "image": { Logo },
                    "order_id": `${orderId}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response: any){
                        try {
                            await api.post("order/check", {
                                response,
                                orderId: orderId,
                                deviceId: state.box,
                                amount: state.sum
                            });
                            navigate('/success')
                            
                        } catch (e) {
                            navigate('/error')
                        }
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
                <div className="flex flex-col bg-white-600 pb-12 rounded-3xl shadow-2xl mt-20">
                    <div className=" w-full flex justify-center items-center mt-10">
                        <img src={Human} alt="human" className=" w-32 rounded-3xl" />
                    </div>
                    <div className=" w-full flex flex-col items-start px-5 mb-5 mt-10">
                        <p className=" font-bold">Your selection:</p>
                        <div className=" flex flex-row justify-between w-full font-sans-light " >
                            <p>Amount to pay</p>
                            <p className=" font-sans-regular font-bold">{state && state.sum} ₹</p>
                        </div>
                    </div>
                    <div className=" mt-16 flex w-full justify-center"> {
                        !loading ? (
                            <Button value="" handleClick={handleClick} title="Pay"/>
                        ) : (
                            <button type="button" className="bg-primary text-white-500 w-72 h-12 text-lg mt-5 rounded-3xl px-3 font-inter-regular flex items-center justify-center" disabled>
                                <div className=" animate-spin flex items-center justify-center rounded-full w-6 h-6 bg-gradient-to-tr from-toastPrimary to-toastSecondary mr-5">
                                    <div className="h-4 w-4 rounded-full bg-white-600"></div>
                                </div>
                                Loading...
                          </button>
                        )
                    }
                    </div>
                </div>
            </UnAuthLayout>
        </div>
    )
}