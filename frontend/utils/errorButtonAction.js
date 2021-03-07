class ErrorButtonAction {
  constructor(name, dataSource, dataTarget) {
    this.name = name;
    this.dataSource = dataSource;
    this.dataTarget = dataTarget;
  }

  transferError = index => {
    const itemIndex = this.dataSource.findIndex(item => item.index === index);

    if (itemIndex > -1) {
      const [item] = this.dataSource.splice(itemIndex, 1);
      this.dataTarget.push(item);
    }
  };
}

export const buttonAction = (name, listSource, listTarget) =>
  new ErrorButtonAction(name, listSource, listTarget);
