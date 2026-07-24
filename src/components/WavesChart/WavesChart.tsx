import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import styles from "./WavesChart.module.scss";

interface wavesChartProps {
  chartData: number[];
}

export const WavesChart = ({ chartData }: wavesChartProps) => {
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
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className={styles.row}></div>
      </section>

      <div className={styles.text}>Good Waves Perfect for everyone</div>
    </>
  );
};
