-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('super_admin', 'hall_admin', 'hall_employee');

-- CreateEnum
CREATE TYPE "public"."HallStatus" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('holding', 'pending', 'sent', 'delivered', 'read', 'failed');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "last_login_at" TIMESTAMP(3),
    "hall_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."halls" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "public"."HallStatus" NOT NULL DEFAULT 'inactive',
    "owner_id" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "halls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "event_date" TIMESTAMP(3) NOT NULL,
    "max_guests_allowed" INTEGER NOT NULL,
    "hall_id" INTEGER NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitation_message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "invitation_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitation_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitation_recipient" (
    "id" SERIAL NOT NULL,
    "invitation_id" INTEGER NOT NULL,
    "invitation_message_id" INTEGER,
    "recipient_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "message_status" "public"."MessageStatus" NOT NULL DEFAULT 'holding',
    "send_at" TIMESTAMP(3),
    "sent_at" TIMESTAMP(3),
    "submitted_at" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitation_recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."whatsapp_sessions" (
    "id" SERIAL NOT NULL,
    "hall_id" INTEGER NOT NULL,
    "session_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "qr_code" TEXT,
    "phone_number" TEXT,
    "session_data" JSONB,
    "last_seen" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "whatsapp_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_sessions_hall_id_key" ON "public"."whatsapp_sessions"("hall_id");

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_sessions_session_id_key" ON "public"."whatsapp_sessions"("session_id");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."halls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."halls" ADD CONSTRAINT "halls_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitations" ADD CONSTRAINT "invitations_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."halls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitations" ADD CONSTRAINT "invitations_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation_message" ADD CONSTRAINT "invitation_message_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation_recipient" ADD CONSTRAINT "invitation_recipient_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation_recipient" ADD CONSTRAINT "invitation_recipient_invitation_message_id_fkey" FOREIGN KEY ("invitation_message_id") REFERENCES "public"."invitation_message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."whatsapp_sessions" ADD CONSTRAINT "whatsapp_sessions_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."halls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
