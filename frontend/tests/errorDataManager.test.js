import { notificationHistory } from "../utils/notificationManager";
import { ERROR_GROUP, ICON_TYPE, STATE_PHRASE } from "../constants/enums";

const errorDataManager = require("../utils/errorDataManager");

describe("Transfer error from one list to another", () => {
  let unresolved, resolved, backlog;
  const transferErrorToAnotherList = errorDataManager.__get__(
    "transferErrorToAnotherList"
  );

  beforeEach(() => {
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
    resolved = {
      label: ERROR_GROUP.RESOLVED,
      data: [
        { index: 3, code: 21, text: "Error DEF occurred, that is `resolved`" },
        { index: 4, code: 22, text: "Error DEF occurred, that is `resolved`" },
        { index: 5, code: 23, text: "Error DEF occurred, that is `resolved`" }
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
    test("'Unresolved' error is pushed to 'Resolved' group", () => {
      transferErrorToAnotherList({
        dataSource: unresolved,
        dataTarget: resolved,
        errorIndex: 0
      });

      expect(resolved.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 0 })])
      );
    });

    test("'Resolved' error is pushed to 'Unresolved' group", () => {
      transferErrorToAnotherList({
        dataSource: resolved,
        dataTarget: unresolved,
        errorIndex: 3
      });

      expect(unresolved.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 3 })])
      );
    });

    test("'Backlog' error is pushed to 'Unresolved' group", () => {
      transferErrorToAnotherList({
        dataSource: backlog,
        dataTarget: unresolved,
        errorIndex: 6
      });

      expect(unresolved.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 6 })])
      );
    });

    test("'Unresolved' error is pushed to 'Backlog' group", () => {
      transferErrorToAnotherList({
        dataSource: unresolved,
        dataTarget: backlog,
        errorIndex: 0
      });

      expect(backlog.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 0 })])
      );
    });
  });

  describe("Fail cases", () => {
    test("Non-existent 'Unresolved' error is pushed to 'Resolved' group", () => {
      transferErrorToAnotherList({
        dataSource: unresolved,
        dataTarget: resolved,
        errorIndex: 6
      });

      expect(unresolved.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 6 })])
      );

      expect(resolved.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 6 })])
      );
    });

    test("Non-existent 'Resolved' error is pushed to 'Unresolved' group", () => {
      transferErrorToAnotherList({
        dataSource: resolved,
        dataTarget: unresolved,
        errorIndex: 6
      });

      expect(resolved.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 6 })])
      );

      expect(unresolved.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 6 })])
      );
    });

    test("Non-existent 'Backlog' error is pushed to 'Unresolved' group", () => {
      transferErrorToAnotherList({
        dataSource: backlog,
        dataTarget: unresolved,
        errorIndex: 3
      });

      expect(backlog.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 3 })])
      );

      expect(unresolved.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 3 })])
      );
    });

    test("Non-existent 'Unresolved' error is pushed to 'Backlog' group", () => {
      transferErrorToAnotherList({
        dataSource: unresolved,
        dataTarget: backlog,
        errorIndex: 3
      });

      expect(unresolved.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 3 })])
      );

      expect(backlog.data).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ index: 3 })])
      );
    });
  });
});

describe("Get new error status message fragment after error shift", () => {
  const getNewErrorStatusMessageByErrorShift = errorDataManager.__get__(
    "getNewErrorStatusMessageByErrorShift"
  );

  describe("Success cases", () => {
    test("Returns 'resolved' message from 'Unresolved' group", () => {
      expect(
        getNewErrorStatusMessageByErrorShift(
          ERROR_GROUP.UNRESOLVED,
          ERROR_GROUP.RESOLVED
        )
      ).toEqual(STATE_PHRASE.RESOLVED);
    });

    test("Returns 'unresolved' message from 'Resolved' group", () => {
      expect(
        getNewErrorStatusMessageByErrorShift(
          ERROR_GROUP.RESOLVED,
          ERROR_GROUP.UNRESOLVED
        )
      ).toEqual(STATE_PHRASE.UNRESOLVED);
    });

    test("Returns 'unresolved' message from 'Backlog' group", () => {
      expect(
        getNewErrorStatusMessageByErrorShift(
          ERROR_GROUP.BACKLOG,
          ERROR_GROUP.UNRESOLVED
        )
      ).toEqual(STATE_PHRASE.UNRESOLVED);
    });

    test("Returns 'backlog' message from 'Unresolved' group", () => {
      expect(
        getNewErrorStatusMessageByErrorShift(
          ERROR_GROUP.UNRESOLVED,
          ERROR_GROUP.BACKLOG
        )
      ).toEqual(STATE_PHRASE.BACKLOG);
    });
  });

  describe("Fail cases", () => {
    test("Doesn't return 'backlog' or 'unresolved' message from 'Unresolved' group", () => {
      expect(
        getNewErrorStatusMessageByErrorShift(
          ERROR_GROUP.UNRESOLVED,
          ERROR_GROUP.RESOLVED
        )
      ).not.toEqual(STATE_PHRASE.BACKLOG && STATE_PHRASE.UNRESOLVED);
    });

    test("Doesn't return 'backlog' or 'resolved' message from 'Resolved' group", () => {
      expect(
        getNewErrorStatusMessageByErrorShift(
          ERROR_GROUP.RESOLVED,
          ERROR_GROUP.UNRESOLVED
        )
      ).not.toEqual(STATE_PHRASE.BACKLOG && STATE_PHRASE.RESOLVED);
    });

    test("Doesn't return 'resolved' or 'backlog' message from 'Backlog' group", () => {
      expect(
        getNewErrorStatusMessageByErrorShift(
          ERROR_GROUP.BACKLOG,
          ERROR_GROUP.UNRESOLVED
        )
      ).not.toEqual(STATE_PHRASE.RESOLVED && STATE_PHRASE.BACKLOG);
    });

    test("Doesn't return 'resolved' or 'unresolved' message from 'Unresolved' group", () => {
      expect(
        getNewErrorStatusMessageByErrorShift(
          ERROR_GROUP.UNRESOLVED,
          ERROR_GROUP.BACKLOG
        )
      ).not.toEqual(STATE_PHRASE.RESOLVED || STATE_PHRASE.UNRESOLVED);
    });
  });
});

describe("Create notification after shifting error", () => {
  const createNotificationTextFromShiftedError = errorDataManager.__get__(
    "createNotificationTextFromShiftedError"
  );

  beforeEach(() => {
    notificationHistory.splice(0, notificationHistory.length);
  });

  describe("Success cases", () => {
    test("Notification contains 'resolve' message", () => {
      createNotificationTextFromShiftedError(
        { code: 200 },
        ERROR_GROUP.UNRESOLVED,
        ERROR_GROUP.RESOLVED,
        true
      );

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.RESOLVE
          }),
          expect.objectContaining({
            text: expect.stringContaining("200")
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.RESOLVED)
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.UNRESOLVED)
          })
        ])
      );
    });

    test("Notification contains 'unresolve' message", () => {
      createNotificationTextFromShiftedError(
        { code: 404 },
        ERROR_GROUP.RESOLVED,
        ERROR_GROUP.UNRESOLVED,
        true
      );

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.UNRESOLVE
          }),
          expect.objectContaining({
            text: expect.stringContaining("404")
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.UNRESOLVED)
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.RESOLVED)
          })
        ])
      );
    });

    test("Notification contains 'add' message", () => {
      createNotificationTextFromShiftedError(
        { code: 201 },
        ERROR_GROUP.BACKLOG,
        ERROR_GROUP.UNRESOLVED,
        true
      );

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.ADD
          }),
          expect.objectContaining({
            text: expect.stringContaining("201")
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

    test("Notification contains 'undo' message", () => {
      createNotificationTextFromShiftedError(
        { code: 202 },
        ERROR_GROUP.UNRESOLVED,
        ERROR_GROUP.BACKLOG,
        false
      );

      expect(notificationHistory).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.UNDO
          }),
          expect.objectContaining({
            text: expect.stringContaining("202")
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.BACKLOG)
          }),
          expect.objectContaining({
            text: expect.stringContaining(ERROR_GROUP.UNRESOLVED)
          })
        ])
      );
    });
  });

  describe("Fail cases", () => {
    test("Notification icon is not 'unresolve', 'add' and 'undo'", () => {
      createNotificationTextFromShiftedError(
        { code: 200 },
        ERROR_GROUP.UNRESOLVED,
        ERROR_GROUP.RESOLVED,
        true
      );

      expect(notificationHistory).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.UNRESOLVE
          }),
          expect.objectContaining({
            iconType: ICON_TYPE.ADD
          }),
          expect.objectContaining({
            iconType: ICON_TYPE.UNDO
          })
        ])
      );
    });

    test("Notification icon is not 'resolve', 'add' and 'undo'", () => {
      createNotificationTextFromShiftedError(
        { code: 404 },
        ERROR_GROUP.RESOLVED,
        ERROR_GROUP.UNRESOLVED,
        true
      );

      expect(notificationHistory).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.RESOLVE
          }),
          expect.objectContaining({
            iconType: ICON_TYPE.ADD
          }),
          expect.objectContaining({
            iconType: ICON_TYPE.UNDO
          })
        ])
      );
    });

    test("Notification icon is not 'resolve', 'unresolve' and 'undo'", () => {
      createNotificationTextFromShiftedError(
        { code: 201 },
        ERROR_GROUP.BACKLOG,
        ERROR_GROUP.UNRESOLVED,
        true
      );

      expect(notificationHistory).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.RESOLVE
          }),
          expect.objectContaining({
            iconType: ICON_TYPE.UNRESOLVE
          }),
          expect.objectContaining({
            iconType: ICON_TYPE.UNDO
          })
        ])
      );
    });

    test("Notification icon is not 'unresolve', 'resolve' and 'add'", () => {
      createNotificationTextFromShiftedError(
        { code: 202 },
        ERROR_GROUP.UNRESOLVED,
        ERROR_GROUP.BACKLOG,
        false
      );

      expect(notificationHistory).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            iconType: ICON_TYPE.UNRESOLVE
          }),
          expect.objectContaining({
            iconType: ICON_TYPE.ADD
          }),
          expect.objectContaining({
            iconType: ICON_TYPE.UNDO
          })
        ])
      );
    });
  });
});

describe("Get notification icon by action from error group", () => {
  const getNotificationIconByErrorShift = errorDataManager.__get__(
    "getNotificationIconByErrorShift"
  );

  describe("Success cases", () => {
    test("Returns 'resolve' icon from 'Unresolved' group", () => {
      expect(
        getNotificationIconByErrorShift(
          ERROR_GROUP.UNRESOLVED,
          ERROR_GROUP.RESOLVED
        )
      ).toEqual(ICON_TYPE.RESOLVE);
    });

    test("Returns 'unresolve' icon from 'Resolved' group", () => {
      expect(
        getNotificationIconByErrorShift(
          ERROR_GROUP.RESOLVED,
          ERROR_GROUP.UNRESOLVED
        )
      ).toEqual(ICON_TYPE.UNRESOLVE);
    });

    test("Returns 'add' icon from 'Backlog' group", () => {
      expect(
        getNotificationIconByErrorShift(
          ERROR_GROUP.BACKLOG,
          ERROR_GROUP.UNRESOLVED
        )
      ).toEqual(ICON_TYPE.ADD);
    });
  });

  describe("Fail cases", () => {
    test("Doesn't return 'add' or 'unresolve' icon from 'Unresolved' group", () => {
      expect(
        getNotificationIconByErrorShift(
          ERROR_GROUP.UNRESOLVED,
          ERROR_GROUP.RESOLVED
        )
      ).not.toEqual(ICON_TYPE.ADD && ICON_TYPE.UNRESOLVE);
    });

    test("Doesn't return 'add' or 'resolve' icon from 'Resolved' group", () => {
      expect(
        getNotificationIconByErrorShift(
          ERROR_GROUP.RESOLVED,
          ERROR_GROUP.UNRESOLVED
        )
      ).not.toEqual(ICON_TYPE.ADD && ICON_TYPE.RESOLVE);
    });

    test("Doesn't return 'resolve' or 'unresolve' icon from 'Resolved' group", () => {
      expect(
        getNotificationIconByErrorShift(
          ERROR_GROUP.BACKLOG,
          ERROR_GROUP.UNRESOLVED
        )
      ).not.toEqual(ICON_TYPE.UNRESOLVE && ICON_TYPE.RESOLVE);
    });
  });
});

describe("Amend error status message after error shift", () => {
  const updateErrorMessage = errorDataManager.__get__("updateErrorMessage");
  const template = "Error ABC occurred, ";

  describe("Success cases", () => {
    test("Returns 'resolved' message from 'Unresolved' group", () => {
      expect(
        updateErrorMessage(
          { text: template + STATE_PHRASE.UNRESOLVED },
          ERROR_GROUP.UNRESOLVED,
          ERROR_GROUP.RESOLVED
        )
      ).toEqual(template + STATE_PHRASE.RESOLVED);
    });

    test("Returns 'unresolved' message from 'Resolved' group", () => {
      expect(
        updateErrorMessage(
          { text: template + STATE_PHRASE.RESOLVED },
          ERROR_GROUP.RESOLVED,
          ERROR_GROUP.UNRESOLVED
        )
      ).toEqual(template + STATE_PHRASE.UNRESOLVED);
    });

    test("Returns 'unresolved' message from 'Backlog' group", () => {
      expect(
        updateErrorMessage(
          { text: template + STATE_PHRASE.BACKLOG },
          ERROR_GROUP.BACKLOG,
          ERROR_GROUP.UNRESOLVED
        )
      ).toEqual(template + STATE_PHRASE.UNRESOLVED);
    });
  });

  describe("Fail cases", () => {
    test("Doesn't return 'backlog' or 'unresolved' message from 'Unresolved' group", () => {
      expect(
        updateErrorMessage(
          { text: template + STATE_PHRASE.UNRESOLVED },
          ERROR_GROUP.UNRESOLVED,
          ERROR_GROUP.RESOLVED
        )
      ).not.toEqual(
        template + STATE_PHRASE.BACKLOG && template + STATE_PHRASE.UNRESOLVED
      );
    });

    test("Doesn't return 'backlog' or 'resolved' message from 'Resolved' group", () => {
      expect(
        updateErrorMessage(
          { text: template + STATE_PHRASE.RESOLVED },
          ERROR_GROUP.RESOLVED,
          ERROR_GROUP.UNRESOLVED
        )
      ).not.toEqual(
        template + STATE_PHRASE.BACKLOG && template + STATE_PHRASE.RESOLVED
      );
    });

    test("Doesn't return 'resolved' or 'backlog' message from 'Backlog' group", () => {
      expect(
        updateErrorMessage(
          { text: template + STATE_PHRASE.BACKLOG },
          ERROR_GROUP.BACKLOG,
          ERROR_GROUP.UNRESOLVED
        )
      ).not.toEqual(
        template + STATE_PHRASE.RESOLVED && template + STATE_PHRASE.BACKLOG
      );
    });
  });
});
