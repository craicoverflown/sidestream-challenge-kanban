export const actionHistory = [];

export const recordAction = previousAction => {
  actionHistory.push(previousAction);
};

export const undoAction = () => {
  const previousAction = actionHistory.pop();

  if (previousAction) {
    previousAction();
  }
};
