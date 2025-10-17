export function isValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
export function isValidPhone(v){ return /^[0-9\-\+\s\(\)]{7,}$/.test(v); }