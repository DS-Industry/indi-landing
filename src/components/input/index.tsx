export default function Input (
    {
        value, 
        setValue, 
    }: { 
        value: {bay: string, sum: string}, 
        setValue: ({bay, sum} : {bay: string, sum: string}) => void |  null, 
    }) {

    return (
        <>
            <input 
                type="number" 
                className=" border-b h-fit border-primary w-full text-center px-5  text-black outline-none text-4xl font-black font-inter-bold"
                value={value.sum} 
                min={50}
                max={500}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue({...value, sum: event.currentTarget.value})}
            />
        </>
    )
}