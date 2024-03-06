import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./../../assets/logo.png";
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

export default function Payment() {
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!state || (state && (!state.sum || !state.box))) navigate(`/`);
  }, []);

  const handleClick = () => {
    setLoading(true);
    const getOrderIdAsync = async () => {
      try {
        const scriptResponse = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!scriptResponse) {
          navigate("/error");
        }
        const orderResponse = await api.post("order/create", {
          amount: state.sum * 100,
        });
        setLoading(false);

        if (!orderResponse) {
          navigate("/error");
        }
        const { orderId } = orderResponse.data.data;
        const options = {
          key: import.meta.env.VITE_RP_KEY_ID, // Enter the Key ID generated from the Dashboard
          // key_id: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
          amount: state.sum * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "MOY-KA!DS",
          description: "Transaction",
          image: { Logo },
          order_id: `${orderId}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (response: any) {
            try {
              await api.post("order/check", {
                response,
                orderId: orderId,
                deviceId: state.box,
                amount: state.sum,
              });
              navigate("/success");
            } catch (e) {
              navigate("/error");
            }
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#0B68E1",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.log(error);
      }
    };
    getOrderIdAsync();
  };

  return (
    <UnAuthLayout>
      <div className=" flex items-center justify-center w-full mb-28">
        <div className="flex flex-col bg-white-600 sm:w-full md:w-1/3 mx-5 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <div className=" w-full flex justify-center items-center mt-5">
            <img src={Human} alt="human" className=" w-40 rounded-3xl" />
          </div>
          {/*          <div className=" w-full flex flex-col items-start px-5 mb-5 mt-10">
            <p className=" font-bold">Your selection:</p>
                     <div className=" flex flex-row justify-between w-full font-sans-light ">
              <p>Amount to pay</p>
              <p className=" font-sans-regular font-bold">
                {state && state.sum} ₹
              </p>
            </div>
          </div>*/}
          <div className="flex flex-col sm:justify-start md:items-center items-start text-sm">
            <p className=" font-bold text-gray-900 text-xl">Your selection:</p>
            <div className=" flex flex-row sm:justify-between md:justify-center w-full gap-5 mt-2">
              <p className="text-gray-700 sm:col-span-2 font-light text-gray-500 md:text-base sm:text-lg">
                Amount to pay
              </p>
              <p className="text-gray-700 sm:col-span-2 text-gray-500 md:text-base sm:text-lg">
                {state && state.sum} ₹
              </p>
            </div>
          </div>

          <div className=" mt-16 flex w-full justify-center">
            {" "}
            {!loading ? (
              <Button value="" handleClick={handleClick} title="Pay" />
            ) : (
              <button
                type="button"
                className="rounded-lg bg-[#009ADC] px-5 py-3 text-md font-medium text-[#FCFDFF] w-full flex items-center justify-center"
                disabled
              >
                <div className=" animate-spin flex items-center justify-center rounded-full w-6 h-6 bg-gradient-to-tr from-toastPrimary to-toastSecondary mr-5">
                  <div className="h-4 w-4 rounded-full bg-white-600"></div>
                </div>
                <p className=" text-[#FCFDFF]">Loading...</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
}
