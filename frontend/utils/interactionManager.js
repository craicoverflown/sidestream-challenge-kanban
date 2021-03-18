import { transferErrorToAnotherList } from "./errorDataManager";
import { addMessageToNotification } from "./notificationManager";
import { ACTION_TYPE, ICON_TYPE } from "../constants/enums";

export const actionHistory = [];

export const errorCardButtonAction = (dataSource, dataTarget) => errorIndex =>
  transferErrorToAnotherList({
    dataSource,
    dataTarget,
    errorIndex,
    rememberAction: true
  });

export const recordAction = previousAction => {
  actionHistory.push(previousAction);
};

export const undoAction = (actionType = ACTION_TYPE.UNDO) => {
  const [params, previousAction] = actionHistory.pop();

  if (previousAction) {
    previousAction({ ...params, actionType });
  }
};

export const undoAllActions = () => {
  for (var i = actionHistory.length; i > 0; i--) {
    undoAction({ actionType: ACTION_TYPE.UNDO_ALL });
  }

  if (actionHistory.length === 0) {
    addMessageToNotification({
      message: "{name} {surname} reversed all actions.",
      iconType: ICON_TYPE.UNDO_ALL
    });
  }
};
