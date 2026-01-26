// PA-84: Add transaction logging

const fs = require('fs').promises;
const path = require('path');

class TransactionLogger {
  constructor(logDir = './logs') {
    this.logDir = logDir;
    this.ensureLogDirectory();
  }
  
  async ensureLogDirectory() {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create log directory:', error);
    }
  }
  
  async logTransaction(transaction) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      transactionId: transaction.id,
      amount: transaction.amount,
      status: transaction.status,
      paymentMethod: transaction.paymentMethod,
      userId: transaction.userId
    };
    
    const logFile = path.join(this.logDir, `transactions-${new Date().toISOString().split('T')[0]}.log`);
    const logLine = JSON.stringify(logEntry) + '\n';
    
    try {
      await fs.appendFile(logFile, logLine);
    } catch (error) {
      console.error('Failed to write transaction log:', error);
    }
  }
  
  async logPaymentAttempt(attempt) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type: 'PAYMENT_ATTEMPT',
      transactionId: attempt.transactionId,
      amount: attempt.amount,
      status: attempt.status,
      error: attempt.error || null
    };
    
    const logFile = path.join(this.logDir, `transactions-${new Date().toISOString().split('T')[0]}.log`);
    const logLine = JSON.stringify(logEntry) + '\n';
    
    try {
      await fs.appendFile(logFile, logLine);
    } catch (error) {
      console.error('Failed to write payment attempt log:', error);
    }
  }
  
  async logFailure(failure) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type: 'PAYMENT_FAILURE',
      transactionId: failure.transactionId,
      reason: failure.reason,
      errorCode: failure.errorCode,
      userId: failure.userId
    };
    
    const logFile = path.join(this.logDir, `transactions-${new Date().toISOString().split('T')[0]}.log`);
    const logLine = JSON.stringify(logEntry) + '\n';
    
    try {
      await fs.appendFile(logFile, logLine);
    } catch (error) {
      console.error('Failed to write failure log:', error);
    }
  }
}

module.exports = TransactionLogger;
