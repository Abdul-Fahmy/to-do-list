interface Props {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: Props) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <>
      <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        <div className="bg-blue-600 h-full transition-[width] duration-500 ease-linear" />
        <span className="text-sm text-white w-full absolute text-center top-0 left-0">
          {percentage}%
        </span>
      </div>
    </>
  );
}
