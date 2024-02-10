export default function Input (
    {
        value,
        setValue,
        placeholder,
    }: {
        value: {bay: string, sum: string},
        setValue: ({bay, sum} : {bay: string, sum: string}) => void |  null,
        placeholder: string | ''
    }) {

    return (
        <>
            <input
                type="number"
                className=" w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                value={value.sum}
                min={50}
                max={500}
                placeholder={placeholder}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue({...value, sum: event.currentTarget.value})}
            />
        </>
    )
}
