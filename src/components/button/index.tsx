export default function Button ({title, handleClick, value} : {title: string, handleClick: (value: string) => void, value: string}) {
    return (
        <button 
            onClick={() => handleClick(value)}
            className=" bg-primary text-white-500 w-72 h-12 text-xl mt-5 rounded-3xl px-3 font-inter-regular">
            {title}
        </button>
    )
}