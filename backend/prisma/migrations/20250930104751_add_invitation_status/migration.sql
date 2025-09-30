-- CreateEnum
CREATE TYPE "public"."InvitationStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'SENDING', 'COMPLETED', 'COMPLETED_WITH_ERRORS');

-- AlterTable
ALTER TABLE "public"."invitations" ADD COLUMN     "status" "public"."InvitationStatus" NOT NULL DEFAULT 'DRAFT';
