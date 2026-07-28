export interface WeatherStatus {
  date: string;
  status: string;
  description: string;
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Good Waves":
      return "#00bab9";
    case "Huge Swell":
      return "#F44336";
    case "Flat":
      return "#F9C732";
    default:
      return "#9ca3af";
  }
};
