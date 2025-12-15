export type DiscountCoupon = {
  id: string;
  couponCode: string;
  description: string;
  discountAmount: number;
  startingPrice: number;
  beginAt: string;
  expireAt: string;
  isActive: boolean;
};
