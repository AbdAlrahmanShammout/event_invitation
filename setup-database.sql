-- WhatsApp Invitation Platform Database Setup
-- Run this script in your PostgreSQL database

-- Create database (run this as superuser)
-- CREATE DATABASE whatsapp_invitations;

-- Connect to the database
-- \c whatsapp_invitations;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create halls table
CREATE TABLE IF NOT EXISTS halls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    address VARCHAR(255),
    phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
    "lastLoginAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'partially_sent')),
    "totalRecipients" INTEGER DEFAULT 0,
    "sentCount" INTEGER DEFAULT 0,
    "failedCount" INTEGER DEFAULT 0,
    "sentAt" TIMESTAMP,
    "hallId" UUID NOT NULL REFERENCES halls(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recipients table
CREATE TABLE IF NOT EXISTS recipients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "phoneNumber" VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP,
    "messageId" UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_halls_email ON halls(email);
CREATE INDEX IF NOT EXISTS idx_halls_status ON halls(status);
CREATE INDEX IF NOT EXISTS idx_messages_hall_id ON messages("hallId");
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_recipients_message_id ON recipients("messageId");
CREATE INDEX IF NOT EXISTS idx_recipients_status ON recipients(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_halls_updated_at BEFORE UPDATE ON halls
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipients_updated_at BEFORE UPDATE ON recipients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO halls (email, password, name, description) VALUES 
('admin@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.gS8v.m', 'Sample Event Hall', 'A sample event hall for testing')
ON CONFLICT (email) DO NOTHING;

-- Display table information
\dt

-- Display sample data
SELECT 'Halls' as table_name, COUNT(*) as count FROM halls
UNION ALL
SELECT 'Messages' as table_name, COUNT(*) as count FROM messages
UNION ALL
SELECT 'Recipients' as table_name, COUNT(*) as count FROM recipients; 