import UnAuthLayout from "../../layouts/unauthorized";
import { MdErrorOutline } from "react-icons/md";

export default function ErrorPayment() {
  return (
    <UnAuthLayout>
      <main className=" w-full h-auto flex items-center justify-center">
        <div className=" w-full flex flex-col items-center">
          <MdErrorOutline className=" h-44 w-44 text-error-700 " />
          <p className=" text-4xl text-error-700 font-sans-light">
            {" "}
            PAYMENT ERROR
          </p>
        </div>
      </main>
    </UnAuthLayout>
  );
}
