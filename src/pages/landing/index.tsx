import { useEffect, useState } from "react";
import Card from "../../components/card";
import UnAuthLayout from "../../layouts/unauthorized";
import Input from "../../components/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/button";

export default function Landing () {
    const [ order, setOrder ] = useState({
        bay: '',
        sum: ''
    });
    const [params] = useSearchParams();
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
            <main className=" text-white h-full w-full">
                <h1 className=" text-3xl mb-5">Select order sum</h1>
                {/* <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit rerum libero doloremque dignissimos fugit at dolorum voluptatem sint neque, repudiandae perferendis nulla alias excepturi vitae, ex eaque nobis delectus beatae?</p>    */}
                <Input value={order} setValue={setOrder}/>
                <div className="mt-5 w-full flex flex-row justify-between mb-5" >
                    <Card sum={'150'} bgColor="bg-primary" handleClick={handleOrderClick}/> 
                    <Card sum={'200'} bgColor="bg-primary" handleClick={handleOrderClick}/> 
                    <Card sum={'300'} bgColor="bg-primary" handleClick={handleOrderClick} /> 
                    <Card sum={'400'} bgColor="bg-primary" handleClick={handleOrderClick} /> 
                </div>
                {
                    order.sum && ( 
                        <Button title="Continue" handleClick={handleOrderClick} value={order.sum} />
                    )
                }
            </main>
        </UnAuthLayout>
    )
}