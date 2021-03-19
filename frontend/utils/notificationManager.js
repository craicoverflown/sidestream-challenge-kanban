import { operator } from "../constants/mockData";

export const notificationHistory = [];

/**
 * Pushes the new notification to the front of the notification history.
 *
 * @param message Text of the new notification.
 * @param iconType Icon type that predicates the action previously conducted.
 */
export const addMessageToNotification = ({ message, iconType }) =>
  notificationHistory.unshift({
    index: notificationHistory.length,
    time: new Date(),
    text: message
      .replace("{name}", operator.name)
      .replace("{surname}", operator.surname),
    iconType
  });
