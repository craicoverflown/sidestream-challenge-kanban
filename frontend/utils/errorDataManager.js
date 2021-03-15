import { addMessageToNotification } from "./notificationManager";
import { recordAction } from "./interactionManager";
import { ACTION_TYPE, ICON_TYPE, ERROR_GROUP } from "../constants/enums";

export const transferErrorToAnotherList = ({
  dataSource,
  dataTarget,
  errorIndex,
  positionIndex = -1,
  actionType = ACTION_TYPE.MOVE,
  rememberAction = false
}) => {
  const itemIndex = dataSource.findIndex(item => item.index === errorIndex);

  if (itemIndex > -1) {
    const [item] = dataSource.splice(itemIndex, 1);

    if (positionIndex > -1) {
      dataTarget.splice(positionIndex, 0, item);
    } else {
      dataTarget.push(item);
    }

    // Record the user's action as notification.
    if (actionType === ACTION_TYPE.MOVE || actionType === ACTION_TYPE.UNDO) {
      createNotificationFromShiftedError(item, actionType === ACTION_TYPE.MOVE);
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

const createNotificationFromShiftedError = ({ code, text }, isActionMove) => {
  const [
    source,
    destination,
    notificationIcon
  ] = getSourceAndDestinationFromErrorText(text);

  addMessageToNotification({
    message: `{name} {surname} ${
      isActionMove ? "moved" : "reversed moving"
    } Error Code ${code} from ${source} to ${destination}.`,
    iconType: isActionMove ? notificationIcon : ICON_TYPE.UNDO
  });
};

const getSourceAndDestinationFromErrorText = text => {
  if (isErrorFromGroup(text, ERROR_GROUP.UNRESOLVED)) {
    return [ERROR_GROUP.UNRESOLVED, ERROR_GROUP.RESOLVED, ICON_TYPE.RESOLVE];
  } else if (isErrorFromGroup(text, ERROR_GROUP.RESOLVED)) {
    return [ERROR_GROUP.RESOLVED, ERROR_GROUP.UNRESOLVED, ICON_TYPE.UNRESOLVE];
  } else if (isErrorFromGroup(text, ERROR_GROUP.BACKLOG)) {
    return [ERROR_GROUP.BACKLOG, ERROR_GROUP.UNRESOLVED, ICON_TYPE.ADD];
  }
};

const isErrorFromGroup = (text, group) =>
  text.split("`").includes(group.toLowerCase());
