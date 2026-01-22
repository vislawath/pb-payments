// PA-85: Optimize payment query performance

/**
 * Optimized query to get payment history for a user
 * Uses indexes on user_id and created_at
 */
async function getUserPaymentHistory(userId, limit = 50, offset = 0) {
  const query = `
    SELECT 
      transaction_id,
      amount,
      status,
      created_at,
      payment_method
    FROM payments
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;
  
  // This query will use idx_payments_user_date index
  return await db.query(query, [userId, limit, offset]);
}

/**
 * Optimized query to get payments by status
 * Uses index on status
 */
async function getPaymentsByStatus(status, limit = 100) {
  const query = `
    SELECT 
      transaction_id,
      amount,
      user_id,
      created_at
    FROM payments
    WHERE status = $1
    ORDER BY created_at DESC
    LIMIT $2
  `;
  
  // This query will use idx_payments_status index
  return await db.query(query, [status, limit]);
}

module.exports = {
  getUserPaymentHistory,
  getPaymentsByStatus
};
