import { FlexRow } from "../../Layouts";

export function ChartTooltipContent({
  active,
  payload,
  valueKey,
  labelKey,
}: any) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;

  return (
    <div className="bg-white p-2 rounded shadow border border-gray-300 min-w-[150px]">
      <FlexRow className="gap-2 items-center">
        <div className="h-2 w-2 rounded-md bg-primary-600" />
        <p className="font-semibold text-sm text-gray-700">
          {data?.[labelKey] || data.label}:{" "}
          <span className="text-primary-600 font-semibold">
            {data?.[valueKey] || data.value}
          </span>
        </p>
      </FlexRow>
      {data.description && (
        <div className="text-sm text-gray-600 mt-1 max-w-[10rem]">
          {data.description}
        </div>
      )}
    </div>
  );
}
