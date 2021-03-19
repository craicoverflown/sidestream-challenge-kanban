import { addMessageToNotification } from "./notificationManager";
import { recordAction } from "./interactionManager";
import {
  ACTION_TYPE,
  ICON_TYPE,
  ERROR_GROUP,
  STATE_PHRASE
} from "../constants/enums";

/**
 * Moves an error from one error group to another.
 *
 * @param dataSource Outbound object with label and list from which the error will depart.
 * @param dataTarget Inbound object with label and list to which the outbound error arrives.
 * @param errorIndex Index position of the selected outbound error.
 * @param positionIndex Index position of the inbound list where the outbound error will be inserted.
 * @param actionType Type of action that determines the type of the notification.
 * @param rememberAction Flag for enabling a reversion of this operation later on.
 */
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

/**
 * Returns the changed error text of some error upon error group shift.
 *
 * @param text Takes the text of some error to update its status based on its next error group.
 * @param sourceLabel The label of the outbound error group.
 * @param destinationLabel The label of the inbound error group.
 */
const updateErrorMessage = ({ text }, sourceLabel, destinationLabel) =>
  [
    text.split(", ")[0],
    getNewErrorStatusMessageByErrorShift(sourceLabel, destinationLabel)
  ].join(", ");

/**
 * Creates a notification based on message and its icon.
 *
 * @param code Takes the code of some error to create a notification for it.
 * @param sourceLabel The label of the outbound error group.
 * @param destinationLabel The label of the inbound error group.
 */
const createNotificationTextFromShiftedError = (
  { code },
  source,
  destination,
  isActionMove
) => {
  const notificationIcon = getNotificationIconTypeByErrorShift(
    source,
    destination
  );

  addMessageToNotification({
    message: `{name} {surname} moved Error Code ${code} from ${source} to ${destination}.`,
    iconType: isActionMove ? notificationIcon : ICON_TYPE.UNDO
  });
};

/**
 * Returns a state phrase as a means of updating an error's text that is to be shifted.
 *
 * @param sourceLabel The label of the outbound error group.
 * @param destinationLabel The label of the inbound error group.
 */
const getNewErrorStatusMessageByErrorShift = (
  sourceLabel,
  destinationLabel
) => {
  if (
    sourceLabel === ERROR_GROUP.UNRESOLVED &&
    destinationLabel === ERROR_GROUP.RESOLVED
  ) {
    return STATE_PHRASE.RESOLVED;
  } else if (
    sourceLabel === ERROR_GROUP.UNRESOLVED &&
    destinationLabel === ERROR_GROUP.BACKLOG
  ) {
    return STATE_PHRASE.BACKLOG;
  } else {
    return STATE_PHRASE.UNRESOLVED;
  }
};

/**
 * Returns a notification icon type as a means of updating an error's text that is to be shifted.
 *
 * @param sourceLabel The label of the outbound error group.
 * @param destinationLabel The label of the inbound error group.
 */
const getNotificationIconTypeByErrorShift = (sourceLabel, destinationLabel) => {
  if (
    sourceLabel === ERROR_GROUP.UNRESOLVED &&
    destinationLabel === ERROR_GROUP.RESOLVED
  ) {
    return ICON_TYPE.RESOLVE;
  } else if (
    sourceLabel === ERROR_GROUP.RESOLVED &&
    destinationLabel === ERROR_GROUP.UNRESOLVED
  ) {
    return ICON_TYPE.UNRESOLVE;
  } else {
    return ICON_TYPE.ADD;
  }
};
