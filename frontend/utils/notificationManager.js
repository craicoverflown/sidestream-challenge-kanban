import { operator } from "../constants/mockData";

export const notificationHistory = [];

export const addMessageToNotification = ({ message, iconType }) =>
  notificationHistory.unshift({
    index: notificationHistory.length + 1,
    time: new Date(),
    text: message
      .replace("{name}", operator.name)
      .replace("{surname}", operator.surname),
    iconType
  });
