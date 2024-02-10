export default function Button({
  title,
  handleClick,
  value,
}: {
  title: string;
  handleClick: (value: string) => void;
  value: string;
}) {
  return (
    <button
      onClick={() => handleClick(value)}
      className="rounded-lg bg-[#009ADC] px-5 py-3 text-lg font-medium text-[#FCFDFF] w-full"
    >
      {title}
    </button>
  );
}
