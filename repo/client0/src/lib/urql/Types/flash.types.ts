
export interface FlashProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  stock: number;
  image: string;
  endDate: string;
}

export interface FlashSale {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  products: FlashProduct[];
}

export interface FlashSaleResponse {
  meta: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
  flashSales: FlashSale[];
}
