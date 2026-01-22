// PA-83: Fix payment validation bug for international cards

/**
 * Validates credit card number using Luhn algorithm
 * Supports both domestic and international card formats
 */
function validateCardNumber(cardNumber) {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  
  // Check if it's a valid length (13-19 digits for international cards)
  if (!/^\d{13,19}$/.test(cleaned)) {
    return false;
  }
  
  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Validates card expiry date
 */
function validateExpiryDate(expiryDate) {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiryDate)) {
    return false;
  }
  
  const [month, year] = expiryDate.split('/');
  const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
  const now = new Date();
  
  return expiry > now;
}

/**
 * Detect card type for better validation
 */
function detectCardType(cardNumber) {
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  
  if (/^4/.test(cleaned)) return 'VISA';
  if (/^5[1-5]/.test(cleaned)) return 'MASTERCARD';
  if (/^3[47]/.test(cleaned)) return 'AMEX';
  if (/^6/.test(cleaned)) return 'DISCOVER';
  
  return 'UNKNOWN';
}

module.exports = {
  validateCardNumber,
  validateExpiryDate,
  detectCardType
};
