// PA-87: Update payment error messages

const ERROR_MESSAGES = {
  INVALID_CARD: {
    code: 'INVALID_CARD',
    message: 'The card number you entered is invalid. Please check and try again.',
    userFriendly: 'Your card number appears to be incorrect. Please verify the number and try again.'
  },
  
  EXPIRED_CARD: {
    code: 'EXPIRED_CARD',
    message: 'The card has expired.',
    userFriendly: 'Your card has expired. Please use a different payment method.'
  },
  
  INSUFFICIENT_FUNDS: {
    code: 'INSUFFICIENT_FUNDS',
    message: 'Insufficient funds in the account.',
    userFriendly: 'Your payment could not be processed due to insufficient funds. Please check your account balance or use a different payment method.'
  },
  
  DECLINED: {
    code: 'CARD_DECLINED',
    message: 'The card was declined by the bank.',
    userFriendly: 'Your card was declined. Please contact your bank or try a different payment method.'
  },
  
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    message: 'Network error occurred during payment processing.',
    userFriendly: 'We encountered a network issue. Please try again in a moment.'
  },
  
  INVALID_AMOUNT: {
    code: 'INVALID_AMOUNT',
    message: 'The payment amount is invalid.',
    userFriendly: 'The payment amount is invalid. Please check the amount and try again.'
  },
  
  CVV_INVALID: {
    code: 'CVV_INVALID',
    message: 'The CVV code is invalid.',
    userFriendly: 'The security code (CVV) on your card is incorrect. Please check and try again.'
  }
};

function getErrorMessage(errorCode) {
  return ERROR_MESSAGES[errorCode] || {
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred.',
    userFriendly: 'We encountered an unexpected error. Please try again or contact support if the problem persists.'
  };
}

function formatErrorResponse(errorCode, details = {}) {
  const error = getErrorMessage(errorCode);
  return {
    error: {
      code: error.code,
      message: error.userFriendly,
      details: details,
      timestamp: new Date().toISOString()
    }
  };
}

module.exports = {
  ERROR_MESSAGES,
  getErrorMessage,
  formatErrorResponse
};
