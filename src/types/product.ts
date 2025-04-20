export interface Product {
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  ingredients: string[];
  variants?: { shadeName: string; shadeCode: string }[];
  averagePrice: number;
  eanUpc: string;
  imageUrls: string[];
  userRatings?: { average: number; count: number };
  sellerLinks: { sellerName: string; url: string }[];
}
