import { recordAction } from "./interactionManager";

export const transferErrorToAnotherList = ({
  dataSource,
  dataTarget,
  errorIndex,
  positionIndex = -1,
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

    if (rememberAction) {
      recordAction(() =>
        transferErrorToAnotherList({
          dataSource: dataTarget,
          dataTarget: dataSource,
          errorIndex,
          positionIndex: itemIndex
        })
      );
    }
  }
};
