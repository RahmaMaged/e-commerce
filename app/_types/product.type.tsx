export type ProductType = {
  id: string;
  imageCover: string;
  description: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  category: CategoryType;
  brand: BrandType;
  ratingsAverage: number;
  limit: number;
};

export type BrandType = {
  _id: string;
  name: string;
  image: string;
  slug: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  image: string;
  slug: string;
};
