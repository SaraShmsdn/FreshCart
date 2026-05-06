export interface ProductType {
  id: string,
  title: string,
  imageCover: string,
  images: string[],
  description: string,
  price: number,
  ratingsAverage: number,
  ratingsQuantity: number,
  quantity: number,
  priceAfterDiscount?: number,
  category: CategoryType,
  brand: BrandType, 
  count : number
}

export interface CategoryType {
  _id: string,
  name: string,
  slug: string,
  image: string
}

export interface BrandType {
  _id: string,
  name: string,
  slug: string,
  image: string
}