import { transferErrorToAnotherList } from "./errorDataManager";
import { addMessageToNotification } from "./notificationManager";
import { ACTION_TYPE, ICON_TYPE } from "../constants/enums";

export const actionHistory = [];

/**
 * Returns a lambda function that takes the index of the error to shift to another group upon button click.
 *
 * @param dataSource Outbound object with label and list from which the error will depart.
 * @param dataTarget Inbound object with label and list to which the outbound error arrives.
 */
export const errorCardButtonAction = (dataSource, dataTarget) => errorIndex =>
  transferErrorToAnotherList({
    dataSource,
    dataTarget,
    errorIndex,
    rememberAction: true
  });

/**
 * Records a lambda function and its arguments for later usage.
 *
 * @param previousAction A tuple wherein the function arguments are bundled as an object and its lambda function that consumes it as parameter.
 */
export const recordAction = previousAction => {
  actionHistory.push(previousAction);
};

/**
 * Deallocates the latest function call from actionHistory to revert some action.
 *
 * @param actionType Supplies the function call for reversion to determine the notification type.
 */
export const undoAction = ({ actionType = ACTION_TYPE.UNDO } = {}) => {
  const [params, previousAction] = actionHistory.pop();

  if (previousAction) {
    previousAction({ ...params, actionType });
  }
};

/**
 * Deallocate actionHistory entirely to revert all actions.
 */
export const undoAllActions = () => {
  for (var i = actionHistory.length; i > 0; i--) {
    undoAction({ actionType: ACTION_TYPE.UNDO_ALL });
  }

  if (actionHistory.length === 0) {
    addMessageToNotification({
      message: "{name} {surname} reverted all actions.",
      iconType: ICON_TYPE.UNDO_ALL
    });
  }
};
