const now = new Date();

// Extract time components and pad with leading zeros if needed
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

// Extract date components and pad with leading zeros
const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are 0-based
const year = now.getFullYear();

// Format the final string
module.exports = ` ${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;