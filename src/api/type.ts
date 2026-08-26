export interface PackFromApi {
  id: number;
  title: string;
  description: string;
  pricePerDay: number;
  imageUrl: string;
}

export interface PacksResponse {
  content: PackFromApi[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
