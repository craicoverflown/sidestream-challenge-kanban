import {
  notificationHistory,
  addMessageToNotification
} from "../utils/notificationManager";
import { ICON_TYPE } from "../constants/enums";
import { operator } from "../constants/mockData";

describe("Add notifications", () => {
  const getTemplateMessage = (done, what) =>
    `{name} {surname} has ${done} ${what}`;

  const getExpectedResult = (icon, done, what) => ({
    index: 0,
    text: `${operator.name} ${operator.surname} has ${done} ${what}`,
    iconType: icon
  });

  beforeEach(() => {
    notificationHistory.splice(0, notificationHistory.length);
  });

  describe("Success cases", () => {
    test("Add 'resolve' notification", () => {
      const done = "resolved";
      const what = "Error x";

      addMessageToNotification({
        message: getTemplateMessage(done, what),
        iconType: ICON_TYPE.RESOLVE
      });

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            getExpectedResult(ICON_TYPE.RESOLVE, done, what)
          )
        ])
      );
    });

    test("Add 'unresolve' notification", () => {
      const done = "unresolved";
      const what = "Error x";

      addMessageToNotification({
        message: getTemplateMessage(done, what),
        iconType: ICON_TYPE.UNRESOLVE
      });

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            getExpectedResult(ICON_TYPE.UNRESOLVE, done, what)
          )
        ])
      );
    });

    test("Add 'add' notification", () => {
      const done = "added";
      const what = "Error x";

      addMessageToNotification({
        message: getTemplateMessage(done, what),
        iconType: ICON_TYPE.ADD
      });

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining(getExpectedResult(ICON_TYPE.ADD, done, what))
        ])
      );
    });

    test("Add 'undo' notification", () => {
      const done = "undone";
      const what = "previous action";

      addMessageToNotification({
        message: getTemplateMessage(done, what),
        iconType: ICON_TYPE.UNDO
      });

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining(getExpectedResult(ICON_TYPE.UNDO, done, what))
        ])
      );
    });

    test("Add 'undo all' notification", () => {
      const done = "undone all";
      const what = "actions";

      addMessageToNotification({
        message: getTemplateMessage(done, what),
        iconType: ICON_TYPE.UNDO_ALL
      });

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            getExpectedResult(ICON_TYPE.UNDO_ALL, done, what)
          )
        ])
      );
    });
  });

  describe("Fail cases", () => {
    test("Added notification is not 'resolve'", () => {
      const done = "resolved";
      const what = "Error x";

      addMessageToNotification({
        message: getTemplateMessage("done", "what"),
        iconType: "ICON_TYPE.RESOLVE"
      });

      expect(notificationHistory).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            getExpectedResult(ICON_TYPE.RESOLVE, done, what)
          )
        ])
      );
    });
  });
});
