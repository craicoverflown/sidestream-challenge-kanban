import { ERROR_GROUP, ICON_TYPE, STATE_PHRASE } from "../constants/enums";

const errorDataManager = require("../utils/errorDataManager");

describe("Get new error status message for next error group", () => {
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

describe("Update error message for error shift", () => {
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
