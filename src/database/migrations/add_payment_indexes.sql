-- PA-85: Optimize payment query performance

-- Add index on transaction_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id 
ON payments(transaction_id);

-- Add index on user_id for user-specific queries
CREATE INDEX IF NOT EXISTS idx_payments_user_id 
ON payments(user_id);

-- Add composite index for date range queries
CREATE INDEX IF NOT EXISTS idx_payments_user_date 
ON payments(user_id, created_at);

-- Add index on status for filtering
CREATE INDEX IF NOT EXISTS idx_payments_status 
ON payments(status);

-- Add index on amount for analytics queries
CREATE INDEX IF NOT EXISTS idx_payments_amount 
ON payments(amount);
