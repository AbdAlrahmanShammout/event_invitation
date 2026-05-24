export type CreateHallServiceInput = {
  name: string;
  description?: string;
  address: string;
  email: string;
  phone: string;
  ownerId: number;
};

export type CreateHallWithOwnerServiceInput = {
  hallName: string;
  hallDescription?: string;
  hallAddress: string;
  hallEmail: string;
  hallPhone: string;
  ownerName: string;
  ownerEmail: string;
  ownerPassword: string;
};
