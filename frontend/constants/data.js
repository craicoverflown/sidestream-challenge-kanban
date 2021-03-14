import { COLOUR, ERROR_GROUP, ICON_TYPE } from "./enums";

export const buttonData = {
  [ERROR_GROUP.UNRESOLVED]: {
    tooltip: "Mark this error as Resolved.",
    colour: COLOUR.GREEN,
    icon: ICON_TYPE.RESOLVE
  },
  [ERROR_GROUP.RESOLVED]: {
    tooltip: "Mark this error as Unresolved.",
    colour: COLOUR.RED,
    icon: ICON_TYPE.UNRESOLVE
  },
  [ERROR_GROUP.BACKLOG]: {
    tooltip: "Move this error as new task to Unresolved.",
    colour: COLOUR.BLUE,
    icon: ICON_TYPE.ADD
  }
};

export const resolvedErrorCountTooltip =
  "View number of resolved errors by error code.";
