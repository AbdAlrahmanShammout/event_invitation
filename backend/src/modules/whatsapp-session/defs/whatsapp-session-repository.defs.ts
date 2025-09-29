export interface UpdateSessionStatusRepoInput {
  isActive?: boolean;
  phoneNumber?: string | null;
  qrCode?: string | null;
  lastSeen?: Date;
}
