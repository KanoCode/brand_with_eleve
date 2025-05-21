export type UpdateUserData = {
  currentPassword: string;
  newUserName: string;
  newPassword: string;
  userName: string;
};

export type GeneralPrice = {
  id?: string;
  generalPercentage: string;
  createdAt?: Date;
  updatedA?: Date;
};

export type ManualPrice = {
  productId: string;
  percent?: string;
  createdAt?: Date;
  updatedA?: Date;
};
export interface ICategory {
  categoryName: string;
  categoryCode: string;
  children: ICategory[];
}

export interface FeaturedProduct {
  productCode: string;
  price: number;
  productName: string;
  manualPrice: number;
  defaultImage: string;
}

export interface ContactDetails {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  organization: string;
  jobTitle: string;
  attachments: any | null;
}

export interface ContactMarkethub {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;

  message: string;
}

export interface ContactUser {
  email: string;
}

export interface partnerLink {
  link: string;
}
