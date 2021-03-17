import { addMessageToNotification } from "./notificationManager";
import { recordAction } from "./interactionManager";
import {
  ACTION_TYPE,
  ICON_TYPE,
  ERROR_GROUP,
  STATE_PHRASE
} from "../constants/enums";

export const transferErrorToAnotherList = ({
  dataSource,
  dataTarget,
  errorIndex,
  positionIndex = -1,
  actionType = ACTION_TYPE.MOVE,
  rememberAction = false
}) => {
  const { label: labelSource, data: listSource } = dataSource;
  const { label: labelTarget, data: listTarget } = dataTarget;

  const itemIndex = listSource.findIndex(item => item.index === errorIndex);

  if (itemIndex > -1) {
    const [item] = listSource.splice(itemIndex, 1);

    item.text = updateErrorMessage(item, labelSource, labelTarget);

    if (positionIndex > -1) {
      listTarget.splice(positionIndex, 0, item);
    } else {
      listTarget.push(item);
    }

    // Record the user's action as notification.
    if (actionType === ACTION_TYPE.MOVE || actionType === ACTION_TYPE.UNDO) {
      createNotificationTextFromShiftedError(
        item,
        labelSource,
        labelTarget,
        actionType === ACTION_TYPE.MOVE
      );
    }

    // Record this action as a means of reversing it on demand.
    if (rememberAction) {
      recordAction([
        {
          dataSource: dataTarget,
          dataTarget: dataSource,
          errorIndex,
          positionIndex: itemIndex
        },
        arg => transferErrorToAnotherList(arg)
      ]);
    }
  }
};

const updateErrorMessage = ({ text }, source, destination) =>
  [
    text.split(", ")[0],
    getNewErrorStatusMessageByErrorShift(source, destination)
  ].join(", ");

const createNotificationTextFromShiftedError = (
  { code },
  source,
  destination,
  isActionMove
) => {
  const notificationIcon = getNotificationIconByErrorShift(source, destination);

  addMessageToNotification({
    message: `{name} {surname} moved Error Code ${code} from ${source} to ${destination}.`,
    iconType: isActionMove ? notificationIcon : ICON_TYPE.UNDO
  });
};

const getNewErrorStatusMessageByErrorShift = (source, destination) => {
  if (
    source === ERROR_GROUP.UNRESOLVED &&
    destination === ERROR_GROUP.RESOLVED
  ) {
    return STATE_PHRASE.RESOLVED;
  } else if (
    source === ERROR_GROUP.UNRESOLVED &&
    destination === ERROR_GROUP.BACKLOG
  ) {
    return STATE_PHRASE.BACKLOG;
  } else {
    return STATE_PHRASE.UNRESOLVED;
  }
};

const getNotificationIconByErrorShift = (source, destination) => {
  if (
    source === ERROR_GROUP.UNRESOLVED &&
    destination === ERROR_GROUP.RESOLVED
  ) {
    return ICON_TYPE.RESOLVE;
  } else if (
    source === ERROR_GROUP.RESOLVED &&
    destination === ERROR_GROUP.UNRESOLVED
  ) {
    return ICON_TYPE.UNRESOLVE;
  } else {
    return ICON_TYPE.ADD;
  }
};
