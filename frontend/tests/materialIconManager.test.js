import { COLOUR, ICON_PATH, ICON_TYPE } from "../constants/enums";
import {
  getColourByIconType,
  getMaterialIconByIconType
} from "../utils/materialIconManager";

describe("Get colour by icon type", () => {
  describe("Success cases", () => {
    test("The colour for 'resolve' icon is green", () => {
      expect(getColourByIconType(ICON_TYPE.RESOLVE)).toEqual(COLOUR.GREEN);
    });

    test("The colour for 'unresolve' icon is red", () => {
      expect(getColourByIconType(ICON_TYPE.UNRESOLVE)).toEqual(COLOUR.RED);
    });

    test("The colour for 'add', 'undo' and 'undo all' icons are blue", () => {
      expect(getColourByIconType(ICON_TYPE.ADD)).toEqual(COLOUR.BLUE);
      expect(getColourByIconType(ICON_TYPE.UNDO)).toEqual(COLOUR.BLUE);
      expect(getColourByIconType(ICON_TYPE.UNDO_ALL)).toEqual(COLOUR.BLUE);
    });
  });

  describe("Fail cases", () => {
    test("The colour for 'resolve' icon is not red or blue", () => {
      expect(getColourByIconType(ICON_TYPE.RESOLVE)).not.toEqual(COLOUR.RED);
      expect(getColourByIconType(ICON_TYPE.RESOLVE)).not.toEqual(COLOUR.BLUE);
    });

    test("The colour for 'unresolve' icon is not green or blue", () => {
      expect(getColourByIconType(ICON_TYPE.UNRESOLVE)).not.toEqual(
        COLOUR.GREEN
      );
      expect(getColourByIconType(ICON_TYPE.UNRESOLVE)).not.toEqual(COLOUR.BLUE);
    });

    test("The colour for 'add', 'undo' and 'undo all' icons are not red or green", () => {
      expect(getColourByIconType(ICON_TYPE.ADD)).not.toEqual(COLOUR.RED);
      expect(getColourByIconType(ICON_TYPE.ADD)).not.toEqual(COLOUR.GREEN);
      expect(getColourByIconType(ICON_TYPE.UNDO)).not.toEqual(COLOUR.RED);
      expect(getColourByIconType(ICON_TYPE.UNDO)).not.toEqual(COLOUR.GREEN);
      expect(getColourByIconType(ICON_TYPE.UNDO_ALL)).not.toEqual(COLOUR.RED);
      expect(getColourByIconType(ICON_TYPE.UNDO_ALL)).not.toEqual(COLOUR.GREEN);
    });
  });
});

describe("Get material icon by icon type", () => {
  describe("Success cases", () => {
    test("Retrieve 'resolve' icon from ICON_PATH", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.RESOLVE)).toEqual(
        ICON_PATH.RESOLVE
      );
    });

    test("Retrieve 'unresolve' icon from ICON_PATH", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.UNRESOLVE)).toEqual(
        ICON_PATH.UNRESOLVE
      );
    });

    test("Retrieve 'add' icon from ICON_PATH", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.ADD)).toEqual(ICON_PATH.ADD);
    });

    test("Retrieve 'undo' icon from ICON_PATH", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.UNDO)).toEqual(ICON_PATH.UNDO);
    });

    test("Retrieve 'undo all' icon from ICON_PATH", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.UNDO_ALL)).toEqual(
        ICON_PATH.UNDO_ALL
      );
    });

    test("Retrieve 'notification' icon from ICON_PATH", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.NOTIFICATION)).toEqual(
        ICON_PATH.NOTIFICATION
      );
    });

    test("Retrieve 'generic avatar' icon from ICON_PATH", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.GENERIC_AVATAR)).toEqual(
        ICON_PATH.GENERIC_AVATAR
      );
    });

    test("Retrieve 'info' icon from ICON_PATH", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.INFO)).toEqual(ICON_PATH.INFO);
    });
  });

  describe("Fail cases", () => {
    test("Retrieved 'resolve' icon is not any other string", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.RESOLVE)).not.toEqual(
        "ICON_PATH.RESOLVE"
      );
    });

    test("Retrieved 'unresolve' icon is not any other string", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.UNRESOLVE)).not.toEqual(
        "ICON_PATH.UNRESOLVE"
      );
    });

    test("Retrieved 'add' icon is not any other string", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.ADD)).not.toEqual(
        "ICON_PATH.ADD"
      );
    });

    test("Retrieved 'undo' icon is not any other string", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.UNDO)).not.toEqual(
        "ICON_PATH.UNDO"
      );
    });

    test("Retrieved 'undo all' icon is not any other string", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.UNDO_ALL)).not.toEqual(
        "ICON_PATH.UNDO_ALL"
      );
    });

    test("Retrieved 'notification' icon is not any other string", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.NOTIFICATION)).not.toEqual(
        "ICON_PATH.NOTIFICATION"
      );
    });

    test("Retrieved 'generic avatar' icon is not any other string", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.GENERIC_AVATAR)).not.toEqual(
        "ICON_PATH.GENERIC_AVATAR"
      );
    });

    test("Retrieved 'info' icon is not any other string", () => {
      expect(getMaterialIconByIconType(ICON_TYPE.INFO)).not.toEqual(
        "ICON_PATH.INFO"
      );
    });
  });
});
