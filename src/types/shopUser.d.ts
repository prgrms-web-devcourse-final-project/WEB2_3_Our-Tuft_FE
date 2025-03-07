export interface ShopUserData {
  exp: number;
  nickname: string;
  eye: { itemId: number; imageUrl: string };
  mouth: { itemId: number; imageUrl: string };
  skin: { itemId: number; imageUrl: string };
  nickColor: { itemId: number; value: string };
}
