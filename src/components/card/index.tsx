interface ICard {
    sum: string,
    bgColor: string,
    handleClick: (sum: string) => void
}

export default function Card ({ sum, bgColor, handleClick } : ICard) {

    return (
        <div 
          className={` w-fit min-h-auto flex items-center  flex-col ${bgColor} rounded-[69px] text-white-500 py-1 px-4`}
          onClick={() => handleClick(sum)}>
            <p className=" text-1xl font-bold">{sum} ₹</p>
        </div>
    )
}