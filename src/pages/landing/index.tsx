import { useEffect, useState } from "react";
import Card from "../../components/card";
import UnAuthLayout from "../../layouts/unauthorized";
import Input from "../../components/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/button";
import Toast from "../../components/styled/toast";

export default function Landing () {
    const [ order, setOrder ] = useState({
        bay: '',
        sum: ''
    });
    const [params] = useSearchParams();
    const bayNumber = params.get('bay');
    const navigate = useNavigate();

    //const [ isInput, setIsInput ] = useState(false);

    const handleOrderClick = (sum: string) => {
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
            <div className=" text-white h-full w-full mt-20">
               <h1 className=" text-3xl text-left mb-5">Select order sum</h1>
                {/* <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit rerum libero doloremque dignissimos fugit at dolorum voluptatem sint neque, repudiandae perferendis nulla alias excepturi vitae, ex eaque nobis delectus beatae?</p>    */}
                <Input value={order} setValue={setOrder}/>
                <div className="mt-5 w-full flex flex-row justify-between mb-5" >
                    <Card sum={'150'} bgColor="bg-primary" prevOrder={order} handleClick={setOrder}/> 
                    <Card sum={'200'} bgColor="bg-primary" prevOrder={order} handleClick={setOrder}/> 
                    <Card sum={'300'} bgColor="bg-primary" prevOrder={order} handleClick={setOrder} /> 
                    <Card sum={'400'} bgColor="bg-primary" prevOrder={order} handleClick={setOrder} /> 
                </div>
                {
                    order.sum && ( 
                        <Button title="Continue" handleClick={handleOrderClick} value={order.sum} />
                    )
                }
                <div className="w-full">
                    <div className=" fixed top-1/2 w-10/12">
                        <Toast title="Cost per 1 minute" body="40 ₹" />
                        {!bayNumber && <Toast title="Please scan QR-code again" body="" /> }
                    </div>
                </div>
            </div>
        </UnAuthLayout>
    )
}