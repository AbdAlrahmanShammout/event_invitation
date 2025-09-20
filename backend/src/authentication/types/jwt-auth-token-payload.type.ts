export interface JwtAuthTokenPayload {
  userId: number;
  userEmail: string;
  userHallId?: number;
}
