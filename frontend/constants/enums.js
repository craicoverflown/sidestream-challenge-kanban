export const COLOUR = Object.freeze({
  RED: "red",
  GREEN: "green",
  YELLOW: "yellow",
  BLUE: "blue"
});

export const FAB_ACTION = Object.freeze({
  UNDO: "Undo",
  UNDO_ALL: "Undo all"
});

export const ERROR_GROUP = Object.freeze({
  RESOLVED: "Resolved",
  UNRESOLVED: "Unresolved",
  BACKLOG: "Backlog"
});

export const ICON_TYPE = Object.freeze({
  ADD: "add",
  RESOLVE: "resolve",
  UNRESOLVE: "unresolve",
  INFO: "info",
  UNDO: "undo",
  UNDO_ALL: "undoAll"
});

export const ICON_PATH = Object.freeze({
  ADD: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  RESOLVE: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z",
  UNRESOLVE:
    "M4.84,1.98L3.43,3.39l10.38,10.38l-1.41,1.41l-4.24-4.24l-1.41,1.41l5.66,5.66l2.83-2.83l6.6,6.6l1.41-1.41L4.84,1.98z M18.05,12.36L23,7.4L21.57,6l-4.94,4.94L18.05,12.36z M17.34,7.4l-1.41-1.41l-2.12,2.12l1.41,1.41L17.34,7.4z M1.08,12.35 l5.66,5.66l1.41-1.41l-5.66-5.66L1.08,12.35z",
  INFO:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  UNDO:
    "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z",
  UNDO_ALL:
    "M6,13c0-1.65,0.67-3.15,1.76-4.24L6.34,7.34C4.9,8.79,4,10.79,4,13c0,4.08,3.05,7.44,7,7.93v-2.02 C8.17,18.43,6,15.97,6,13z M20,13c0-4.42-3.58-8-8-8c-0.06,0-0.12,0.01-0.18,0.01l1.09-1.09L11.5,2.5L8,6l3.5,3.5l1.41-1.41 l-1.08-1.08C11.89,7.01,11.95,7,12,7c3.31,0,6,2.69,6,6c0,2.97-2.17,5.43-5,5.91v2.02C16.95,20.44,20,17.08,20,13z"
});

export const ERROR_FREQUENCY_COLUMN = Object.freeze({
  ERROR_CODE: "Error Code",
  OCCURRENCE: "Occurrence"
});
