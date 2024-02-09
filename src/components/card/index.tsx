interface ICard {
    sum: string,
    bgColor: string,
    prevOrder: {
        bay: string,
        sum: string
    }
    handleClick: ({bay, sum } : {bay: string, sum: string}) => void
}

export default function Card ({ sum, prevOrder, handleClick } : ICard) {

    return (
        <button
            className="inline-flex items-center justify-center rounded-full bg-[#00A0E3] bg-opacity-20 px-2.5 py-0.5 text-[#00A0E3]"
            onClick={() => handleClick({...prevOrder, sum})}
        >
            <p className='whitespace-nowrap text-sm pr-1 font-bold'>₹</p>
            <p className="whitespace-nowrap text-sm font-bold">{sum}</p>
        </button>
    )
}
