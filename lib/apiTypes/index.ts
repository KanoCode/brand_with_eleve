export type Category = {
  name: string;
  path: string;
  code: string;
  image: string;
};

export type ImageUrl = {
  url: string;
  width: number;
  height: number;
};

export type Image = {
  name: string;
  isDefault: boolean;
  urls: ImageUrl[];
  hasLogo: boolean;
  angle: number | null;
  type: string;
};

export type ColourImage = {
  name: string;
  code: string;
  images: Image[];
};

export type PackagingAndDimension = {
  cartonSizeDimensionL: number;
  cartonSizeDimensionW: number;
  cartonSizeDimensionH: number;
  piecesPerCarton: number;
  cartonWeight: number;
};

export type ProductDimension = {
  length: number;
  width: number;
  weight: number;
};

export type Variant = {
  simpleCode: string;
  fullCode: string;
  codeColour: string;
  codeColourName: string;
  codeSize: string | null;
  codeSizeName: string | null;
  categorisedAttribute: any;
  packagingAndDimension: PackagingAndDimension;
  productDimension: ProductDimension;
  isLogo24: boolean;
  components: any;
};

export type Product = {
  imageUrl: string;
  path: string;
  simpleCode: string;
  fullCode: string;
  productCode: string;
  defaultImage: string;
  categorisedAttribute: any[]; // Replace `any` with the appropriate export type if known.
  gender: string | null;
  material: string;
  fit: string;
  feature: string;
  categories: Category[];
  brand: any | null;
  companionCodes: any | null; // Replace `any` with the appropriate export type if known.
  relatedCodes: any[]; // Replace `any` with the appropriate export type if known.
  matchingCodes: any[]; // Replace `any` with the appropriate export type if known.
  groupingCodes: any[];
  groupingCodeGiftsets: any | null;
  productName: string;
  description: string;
  minimum: number;
  maximum: number;
  incrementedBy: number;
  keywords: string;
  tags: string;
  inventoryType: string;
  behaviour: string;
  madeToOrder: string;
  madeToOrderMessage: string;
  displayCountryOfOrigin: string;
  promotion: string;
  fullBrandingGuide: string;
  logo24BrandingGuide: string | null;
  images: Image[];
  colourImages: ColourImage[];
  isLogo24: boolean;
  logo24Branding: any | null; // Replace `any` with the appropriate  type if known.
  variants: Variant[];
  brandingTemplates: any | null; // Replace `any` with the appropriate type if known.
  decoupled: boolean;
  type: string;
  manualPrice: number;
  price: string;
  currentFeaturedProductCount:number
};

export type SubProduct = {
  price: number;
  simpleCode: string;
  fullCode: string;
  productName: string;
  material: string;
  fit: string;
  color: ColourImage;
  colourImages: ColourImage[];

  categories: Category[];
  brand: any | null;
  imageUrl: string;
  keywords: string;
  promotion: string;
  images: Image[];
  variants: Variant[];
};

export type ManualPrice = {
  price: string;
  productId: string;
};

export type ProductsNavSuspenseProps = {
  categoriesFetched: any[];
};
