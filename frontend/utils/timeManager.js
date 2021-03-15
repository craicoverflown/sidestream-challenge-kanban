import moment from "moment";

export const getElapsedTimeFromNow = time => {
  return moment(time).fromNow();
};
