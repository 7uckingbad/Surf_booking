import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  ReferenceDot,
} from "recharts";
import styles from "./WavesChart.module.scss";
import { getStatusColor } from "../../api/utils/getStatusColor";

interface wavesChartProps {
  chartData: number[];
  status: string;
  description: string;
}

export const WavesChart = ({
  chartData,
  status: weatherStatus,
  description,
}: wavesChartProps) => {
  const maxValue = Math.max(...chartData);
  const maxIndex = chartData.indexOf(maxValue);
  const formattedData = chartData.map((value, index) => ({
    hour: index,
    height: value,
  }));

  return (
    <>
      <section className={styles.wavesChartGrap}>
        <ResponsiveContainer width="100%" height={253}>
          <AreaChart data={formattedData}>
            <YAxis domain={["dataMin - 0.05", "dataMax + 0.05"]} hide />
            <Area
              type="natural"
              dataKey="height"
              stroke="#00bab9"
              fill="#00bab9"
              fillOpacity={0.3}
              isAnimationActive={true}
              animationDuration={1000}
            />
            <ReferenceDot
              x={maxIndex}
              y={maxValue}
              r={5}
              fill={getStatusColor(weatherStatus)}
              stroke="#ffffff"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className={styles.row}></div>
      </section>

      <div className={styles.text}>
        <span
          className={styles.legendDot}
          style={{ backgroundColor: getStatusColor(weatherStatus) }}
        />
        {weatherStatus} {description}
      </div>
    </>
  );
};
