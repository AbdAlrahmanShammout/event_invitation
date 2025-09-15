export type CreateHallServiceInput = {
  name: string;
  description?: string;
  address: string;
  email: string;
  phone: string;
  ownerId: bigint;
};
