import moment from "moment";

/**
 * Returns the real time difference between now and the creation time of some notification.
 *
 * @param time The time whence some notification has been created.
 */
export const getElapsedTimeFromNow = time => {
  return moment(time).fromNow();
};
