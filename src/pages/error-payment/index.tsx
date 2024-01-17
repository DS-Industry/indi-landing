import UnAuthLayout from "../../layouts/unauthorized";
import { MdErrorOutline } from "react-icons/md";

export default function ErrorPayment () {
    return (
        <UnAuthLayout>
            <main className=" w-full h-screen flex items-center justify-center">
                    <div className=" w-full flex flex-col items-center">
                        <MdErrorOutline className=" h-44 w-44 text-error "/>   
                        <p className=" text-4xl text-error font-sans-light"> PAYMENT ERROR</p>
                    </div>
            </main>
        </UnAuthLayout>
    )
}