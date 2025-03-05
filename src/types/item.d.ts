export interface Item {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  nickColor: string | null;
  originalPrice: number;
  discountPrice: number;
  finalPrice: number;
}
