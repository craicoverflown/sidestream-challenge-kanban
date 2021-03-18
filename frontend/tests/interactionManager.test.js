import { notificationHistory } from "../utils/notificationManager";
import {
  ACTION_TYPE,
  ERROR_GROUP,
  ICON_TYPE,
  STATE_PHRASE
} from "../constants/enums";
import { transferErrorToAnotherList } from "../utils/errorDataManager";
import {
  actionHistory,
  recordAction,
  undoAction,
  undoAllActions
} from "../utils/interactionManager";

describe("Undo previous method(s)", () => {
  let unresolved, backlog;

  beforeEach(() => {
    actionHistory.splice(0, actionHistory.length);
    notificationHistory.splice(0, notificationHistory.length);
    unresolved = {
      label: ERROR_GROUP.UNRESOLVED,
      data: [
        {
          index: 0,
          code: 11,
          text: "Error ABC occurred, that is `unresolved`"
        },
        {
          index: 1,
          code: 12,
          text: "Error ABC occurred, that is `unresolved`"
        },
        { index: 2, code: 13, text: "Error ABC occurred, that is `unresolved`" }
      ]
    };
    backlog = {
      label: ERROR_GROUP.BACKLOG,
      data: [
        {
          index: 6,
          code: 31,
          text: "Error XYZ occurred, that is in the `backlog`"
        },
        {
          index: 7,
          code: 32,
          text: "Error XYZ occurred, that is in the `backlog`"
        },
        {
          index: 8,
          code: 33,
          text: "Error XYZ occurred, that is in the `backlog`"
        }
      ]
    };
  });

  describe("Success cases", () => {
    test("Error with index 0 from 'Unresolved' group is returned to 'Backlog' group at position 1", () => {
      const expectedArg = {
        dataSource: unresolved,
        dataTarget: backlog,
        errorIndex: 0,
        positionIndex: 1
      };
      const tupleAction = [expectedArg, arg => transferErrorToAnotherList(arg)];

      recordAction(tupleAction);

      expect(actionHistory).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([expect.objectContaining(expectedArg)])
        ])
      );

      undoAction({ actionType: ACTION_TYPE.UNDO });

      expect(backlog.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            index: 0,
            code: 11,
            text: expect.stringContaining(STATE_PHRASE.BACKLOG)
          })
        ])
      );

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.UNDO
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.UNRESOLVED)
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.BACKLOG)
          })
        ])
      );
    });

    test("Undo all error shifts from 'Unresolved' group to 'Backlog' group", () => {
      const tupleActions = index => [
        {
          dataSource: unresolved,
          dataTarget: backlog,
          errorIndex: index,
          positionIndex: index + 1
        },
        arg => transferErrorToAnotherList(arg)
      ];

      for (var i = 0; i < unresolved.data.length; i++) {
        recordAction(tupleActions(i));
      }

      expect(actionHistory).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              dataSource: unresolved,
              dataTarget: backlog,
              errorIndex: 0,
              positionIndex: 1
            })
          ]),
          expect.arrayContaining([
            expect.objectContaining({
              dataSource: unresolved,
              dataTarget: backlog,
              errorIndex: 1,
              positionIndex: 2
            })
          ]),
          expect.arrayContaining([
            expect.objectContaining({
              dataSource: unresolved,
              dataTarget: backlog,
              errorIndex: 2,
              positionIndex: 3
            })
          ])
        ])
      );

      undoAllActions();

      expect(backlog.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            index: 0,
            code: 11,
            text: expect.stringContaining(STATE_PHRASE.BACKLOG)
          }),
          expect.objectContaining({
            index: 1,
            code: 12,
            text: expect.stringContaining(STATE_PHRASE.BACKLOG)
          }),
          expect.objectContaining({
            index: 2,
            code: 13,
            text: expect.stringContaining(STATE_PHRASE.BACKLOG)
          })
        ])
      );

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.UNDO_ALL
          })
        ])
      );
    });
  });

  describe("Fail cases", () => {
    test("Non-existent error with index 3 from 'Unresolved' group is recorded but not moved", () => {
      const expectedArg = {
        dataSource: unresolved,
        dataTarget: backlog,
        errorIndex: 3,
        positionIndex: 1
      };
      const tupleAction = [expectedArg, arg => transferErrorToAnotherList(arg)];

      recordAction(tupleAction);

      expect(actionHistory).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([expect.objectContaining(expectedArg)])
        ])
      );

      undoAction();

      const expectedError = {
        index: 3,
        code: 21,
        text: expect.stringContaining(STATE_PHRASE.RESOLVED)
      };

      expect(unresolved.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining(expectedError)])
      );

      expect(backlog.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining(expectedError)])
      );

      expect(notificationHistory).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.UNDO
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.UNRESOLVED)
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.BACKLOG)
          })
        ])
      );
    });
  });
});
