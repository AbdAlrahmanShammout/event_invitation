export enum InvitationStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  SENDING = 'SENDING',
  COMPLETED = 'COMPLETED',
  COMPLETED_WITH_ERRORS = 'COMPLETED_WITH_ERRORS',
}

export const InvitationStatusDescription = {
  [InvitationStatus.DRAFT]: 'Invitation is being prepared - needs recipients and messages',
  [InvitationStatus.PENDING_APPROVAL]: 'Invitation is ready for admin review and approval',
  [InvitationStatus.APPROVED]: 'Invitation has been approved and is ready to send',
  [InvitationStatus.SENDING]: 'Messages are currently being sent to recipients',
  [InvitationStatus.COMPLETED]: 'All messages have been sent successfully',
  [InvitationStatus.COMPLETED_WITH_ERRORS]: 'Sending completed but some recipients failed',
} as const;
