// Utility Functions Module
// Common helper functions for the application

/**
 * Format date to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

/**
 * Format date and time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date and time
 */
export function formatDateTime(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} Is valid email
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number
 * @returns {boolean} Is valid phone
 */
export function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
}

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * Get current time in HH:MM:SS format
 * @returns {string} Current time
 */
export function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { hour12: false });
}

/**
 * Calculate time remaining
 * @param {string} startTime - Start time ISO string
 * @param {number} durationMinutes - Duration in minutes
 * @returns {Object} Time remaining details
 */
export function calculateTimeRemaining(startTime, durationMinutes) {
    const start = new Date(startTime).getTime();
    const now = new Date().getTime();
    const duration = durationMinutes * 60 * 1000;
    const end = start + duration;
    const remaining = end - now;

    if (remaining <= 0) {
        return { expired: true, minutes: 0, seconds: 0 };
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    return {
        expired: false,
        minutes: minutes,
        seconds: seconds,
        totalSeconds: Math.floor(remaining / 1000),
        display: `${minutes}:${String(seconds).padStart(2, '0')}`
    };
}

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @returns {any} Stored value
 */
export function getFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Notification type (success, error, info, warning)
 */
export function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        animation: slideIn 0.3s ease-in-out;
        font-size: 14px;
        max-width: 300px;
    `;

    const bgColors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };

    toast.style.backgroundColor = bgColors[type] || bgColors.info;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Redirect to page
 * @param {string} url - URL to redirect to
 */
export function redirect(url) {
    window.location.href = url;
}

/**
 * Check if user is on mobile
 * @returns {boolean} Is mobile device
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
