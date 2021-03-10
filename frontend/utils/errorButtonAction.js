import { transferErrorToAnotherList } from "./dataManager";

class ErrorButtonAction {
  constructor(name, dataSource, dataTarget) {
    this.name = name;
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

export const buttonAction = (name, listSource, listTarget) =>
  new ErrorButtonAction(name, listSource, listTarget);
