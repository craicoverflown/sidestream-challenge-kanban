import { transferErrorToAnotherList } from "./errorDataManager";

class ErrorButtonAction {
  constructor(dataSource, dataTarget) {
    this.dataSource = dataSource;
    this.dataTarget = dataTarget;
  }

  handleButtonClick = errorIndex =>
    transferErrorToAnotherList({
      dataSource: this.dataSource,
      dataTarget: this.dataTarget,
      errorIndex,
      rememberAction: true
    });
}

export const buttonAction = (listSource, listTarget) =>
  new ErrorButtonAction(listSource, listTarget);
