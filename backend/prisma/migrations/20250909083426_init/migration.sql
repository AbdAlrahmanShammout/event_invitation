-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('SUPER_ADMIN', 'HALL_ADMIN', 'HALL_EMPLOYEE');

-- CreateEnum
CREATE TYPE "public"."HallStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "hall_id" BIGINT,
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."halls" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "public"."HallStatus" NOT NULL DEFAULT 'INACTIVE',
    "owner_id" BIGINT NOT NULL,
    "balance" BIGINT NOT NULL,

    CONSTRAINT "halls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitations" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "hallId" BIGINT NOT NULL,
    "creatorId" BIGINT NOT NULL,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitation_message" (
    "id" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "invitation_id" BIGINT NOT NULL,

    CONSTRAINT "invitation_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitation_recipient" (
    "id" BIGINT NOT NULL,
    "invitation_id" BIGINT NOT NULL,
    "invitation_message_id" BIGINT NOT NULL,
    "recipient_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "message_status" "public"."MessageStatus" NOT NULL DEFAULT 'PENDING',
    "send_at" TIMESTAMP(3) NOT NULL,
    "sent_at" TIMESTAMP(3),

    CONSTRAINT "invitation_recipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."halls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."halls" ADD CONSTRAINT "halls_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitations" ADD CONSTRAINT "invitations_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "public"."halls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitations" ADD CONSTRAINT "invitations_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation_message" ADD CONSTRAINT "invitation_message_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation_recipient" ADD CONSTRAINT "invitation_recipient_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation_recipient" ADD CONSTRAINT "invitation_recipient_invitation_message_id_fkey" FOREIGN KEY ("invitation_message_id") REFERENCES "public"."invitation_message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
