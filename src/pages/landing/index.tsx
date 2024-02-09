import { useEffect, useState } from "react";
import Card from "../../components/card";
import UnAuthLayout from "../../layouts/unauthorized";
import Input from "../../components/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/button";
import Toast from "../../components/styled/toast";
import PayLogo from "../../assets/pay_online_color.png"

export default function Landing () {
    const [ order, setOrder ] = useState({
        bay: '',
        sum: ''
    });
    const [params] = useSearchParams();
    const bayNumber = params.get('bay');
    const navigate = useNavigate();

    //const [ isInput, setIsInput ] = useState(false);

    const handleOrderClick = (event: any, sum: string) => {
        event.preventDefault();
        setOrder({...order, sum})
        navigate('/pay', { state: { sum, box: order.bay } });

    }

    useEffect(() => {
        const bay = params.get('bay');
        if(bay) {
            setOrder({...order, bay})
        }
    }, [])

    return (
        <UnAuthLayout>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Pay Online</h1>
                    <div className="flex justify-center pt-2">
                        <img src={PayLogo} width='38' height='38' className='object-contain'/>
                    </div>
                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Enter the amount you want enter on the terminal and select most convenient payment method for you
                    </p>

                    <div  className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Select amount</p>
                        <div>

                            <div className="relative">
                                <Input value={order} setValue={setOrder} placeholder={"Amount"}/>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between flex-wrap '>
                            <Card sum={'100'} bgColor="bg-primary" prevOrder={order} handleClick={setOrder}/>
                            <Card sum={'150'} bgColor="bg-primary" prevOrder={order} handleClick={setOrder}/>
                            <Card sum={'200'} bgColor="bg-primary" prevOrder={order} handleClick={setOrder}/>
                            <Card sum={'300'} bgColor="bg-primary" prevOrder={order} handleClick={setOrder}/>
                        </div>
                        {
                            order.sum && (
                                <button
                                    className="block w-full rounded-lg bg-[#009ADC] px-5 py-3 text-sm font-medium text-[#FCFDFF]"
                                    onClick={(event) => handleOrderClick(event, order.sum)}
                                >
                                    Continue
                                </button>
                            )
                        }


                    </div>
                </div>
                <div className="bg-white flex flex-col justify-center mt-10">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Prices</h2>
                            <p className="mt-4 text-gray-500 sm:text-xl">
                                You're charged based on the time spent in the wash bay. Our fair per-minute pricing encourages prompt cleaning while ensuring value for your money.
                            </p>
                        </div>
                        <div className="flex flex-row justify-between px-20">
                                <div className="flex flex-col rounded-lg px-4 py-8 text-center">
                                    <dt className="order-last text-sm font-medium text-gray-500">Car Wash</dt>
                                    <dd className="text-1xl font-extrabold text-blue-600 md:text-4xl">₹40 /min</dd>
                                </div>
                                <div className="flex flex-col rounded-lg px-4 py-8 text-center">
                                    <dt className="order-last text-sm font-medium text-gray-500">Vacuum</dt>
                                    <dd className="text-1xl font-extrabold text-blue-600 md:text-4xl">₹10 /min</dd>
                                </div>
                        </div>
                </div>
            </div>
        </UnAuthLayout>
    )
}
