import { FlexColumn } from "@/components/common/Layouts";

const ValueCard = ({
  Icon,
  iconBg,
  iconColor,
  title,
  titleSize = "text-xl",
  description,
}: {
  Icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  titleSize?: string;
  description: string;
}) => (
  <FlexColumn className="gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBg}`}
    >
      <Icon className={`${iconColor} md:h-8 md:w-8 h-6 w-6`} />
    </div>
    <h3 className={`${titleSize} font-bold text-gray-900`}>{title}</h3>
    <p className="text-gray-600">{description}</p>
  </FlexColumn>
);

export default ValueCard;
