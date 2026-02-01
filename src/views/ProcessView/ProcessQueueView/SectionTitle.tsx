export default function SectionTitle({ title, count }: { title: string; count: number }) {
  return (
    <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
      {title} <span className="text-sm font-normal text-gray-500">({count})</span>
    </h3>
  );
}
