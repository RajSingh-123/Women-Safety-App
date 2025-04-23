// services/notificationService.js

const axios = require('axios');

/**
 * Sends a notification with the provided data to the specified URL.
 * 
 * @param {string} url - The URL to which the notification is sent.
 * @param {Object} data - The data to send in the notification.
 * @returns {Promise<void>}
 */
const sendNotification = async (url, data) => {
  try {
    await axios.post(url, data);
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = { sendNotification };
