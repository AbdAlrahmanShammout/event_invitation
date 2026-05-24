-- CreateEnum
CREATE TYPE "public"."HallAccountStatus" AS ENUM ('active', 'frozen', 'suspended');

-- CreateEnum
CREATE TYPE "public"."HallCreditTransactionType" AS ENUM ('recharge', 'debit', 'refund', 'adjustment');

-- CreateTable
CREATE TABLE "public"."hall_account_states" (
    "id" SERIAL NOT NULL,
    "hall_id" INTEGER NOT NULL,
    "status" "public"."HallAccountStatus" NOT NULL DEFAULT 'active',
    "reason" TEXT,
    "changed_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hall_account_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hall_credit_balances" (
    "hall_id" INTEGER NOT NULL,
    "available_credits" INTEGER NOT NULL DEFAULT 0,
    "reserved_credits" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hall_credit_balances_pkey" PRIMARY KEY ("hall_id")
);

-- CreateTable
CREATE TABLE "public"."hall_credit_transactions" (
    "id" SERIAL NOT NULL,
    "hall_id" INTEGER NOT NULL,
    "type" "public"."HallCreditTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "balance_after" INTEGER NOT NULL,
    "performed_by_id" INTEGER,
    "reference" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hall_credit_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hall_account_states_hall_id_key" ON "public"."hall_account_states"("hall_id");

-- AddForeignKey
ALTER TABLE "public"."hall_account_states" ADD CONSTRAINT "hall_account_states_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."halls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hall_account_states" ADD CONSTRAINT "hall_account_states_changed_by_id_fkey" FOREIGN KEY ("changed_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hall_credit_balances" ADD CONSTRAINT "hall_credit_balances_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."halls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hall_credit_transactions" ADD CONSTRAINT "hall_credit_transactions_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "public"."halls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hall_credit_transactions" ADD CONSTRAINT "hall_credit_transactions_performed_by_id_fkey" FOREIGN KEY ("performed_by_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
