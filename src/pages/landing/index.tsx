import { useEffect, useState } from "react";
import Card from "../../components/card";
import UnAuthLayout from "../../layouts/unauthorized";
import Input from "../../components/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import PayLogo from "../../assets/pay_online_color.png";

export default function Landing() {
  const [order, setOrder] = useState({
    bay: "",
    sum: "",
  });
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);

  const handleOrderClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    sum: string
  ) => {
    event.preventDefault();
    setOrder({ ...order, sum });
    navigate("/pay", { state: { sum, box: order.bay } });
  };

  useEffect(() => {
    let timeOutId: NodeJS.Timeout;
    const bay = params.get("bay");
    if (bay) {
      setOrder({ ...order, bay });
    } else {
      setIsError(true);
      timeOutId = setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <UnAuthLayout>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Pay Online
          </h1>
          <div className="flex justify-center pt-2">
            <img
              src={PayLogo}
              width="38"
              height="38"
              className="object-contain"
            />
          </div>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Enter the amount you want enter on the terminal and select most
            convenient payment method for you
          </p>

          <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">Select amount</p>
            <div>
              <div className="relative">
                <Input
                  value={order}
                  setValue={setOrder}
                  placeholder={"Amount"}
                />
              </div>
            </div>

            <div className="flex flex-row justify-between flex-wrap ">
              <Card
                sum={"100"}
                bgColor="bg-primary"
                prevOrder={order}
                handleClick={setOrder}
              />
              <Card
                sum={"150"}
                bgColor="bg-primary"
                prevOrder={order}
                handleClick={setOrder}
              />
              <Card
                sum={"200"}
                bgColor="bg-primary"
                prevOrder={order}
                handleClick={setOrder}
              />
              <Card
                sum={"300"}
                bgColor="bg-primary"
                prevOrder={order}
                handleClick={setOrder}
              />
            </div>
            {order.sum && (
              <button
                className="block w-full rounded-lg bg-[#009ADC] px-5 py-3 text-sm font-medium text-[#FCFDFF]"
                onClick={(event) => handleOrderClick(event, order.sum)}
              >
                Continue
              </button>
            )}
          </div>
        </div>
        <div className="bg-white flex flex-col justify-center mt-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Prices
            </h2>
            <p className="mt-4 text-gray-500 sm:text-xl">
              You're charged based on the time spent in the wash bay. Our fair
              per-minute pricing encourages prompt cleaning while ensuring value
              for your money.
            </p>
          </div>
          <div className="flex flex-row justify-between px-20">
            <div className="flex flex-col rounded-lg px-4 py-8 text-center">
              <dt className="order-last text-sm font-medium text-gray-500">
                Car Wash
              </dt>
              <dd className="text-1xl font-extrabold text-blue-600 md:text-4xl">
                ₹40 /min
              </dd>
            </div>
            <div className="flex flex-col rounded-lg px-4 py-8 text-center">
              <dt className="order-last text-sm font-medium text-gray-500">
                Vacuum
              </dt>
              <dd className="text-1xl font-extrabold text-blue-600 md:text-4xl">
                ₹10 / 3 min.
              </dd>
            </div>
          </div>
        </div>
      </div>

      <div
        role="alert"
        className={` ${
          isError ? " visible absolute top-3 " : " invisible"
        } w-full flex justify-center `}
      >
        <div className=" rounded border-s-4 border-red-500 bg-error-50 p-4 mx-2 border-l-error-500 z-30 md:w-1/2 sm:w-full flex justify-between items-start">
          <div className=" flex flex-col">
            <div className="flex flex-row items-center gap-2 text-error-800 mx-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>

              <strong className="block font-medium">
                Something went wrong
              </strong>
            </div>

            <p className="mt-2 text-sm text-error-700">
              Maybe you don`t select bay number. Please try again later.
            </p>
          </div>
          <button
            className="text-gray-500 transition hover:text-gray-600"
            onClick={() => setIsError(false)}
          >
            <span className="sr-only">Dismiss popup</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </UnAuthLayout>
  );
}
