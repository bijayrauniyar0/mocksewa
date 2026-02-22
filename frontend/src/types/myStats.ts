import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { ContentType } from "recharts/types/component/Tooltip";

import { IMockTestDetails } from "./home";

export type StatsCardProps = {
  title: string;
  value: number | string;
  Icon: React.ElementType;
  className?: string;
  iconColor: string;
  iconBgColor: string;
};

export interface SessionsBoxProps {
  title: string;
  score: number;
  elapsed_time: number;
  created_at: string;
  className?: string;
}

export interface PerformanceDetailsProps
  extends Omit<SessionsBoxProps, "title"> {
  rank_change: number | string;
}

export interface IPerformanceTrendProps {
  time_period: "all_time" | "last_30_days" | "last_7_days";
}

export interface IFilters {
  timePeriodFilter: string;
}

export interface IChartProps {
  chartData: Record<string, any>[];
  dataKey: string;
  fill?: string;
  tooltip?: ContentType<ValueType, NameType>;
  chartTitle?: string;
  className?: string;
  labelKey?: string;
  chartConfig?: any;
  xAxisInterval?: number;
}

export interface IHistorySession {
  id: number;
  score: number;
  elapsed_time: number;
  created_at: string;
  MockTest: IMockTestDetails;
}
