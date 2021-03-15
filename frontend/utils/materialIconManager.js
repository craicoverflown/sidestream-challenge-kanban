import { ICON_TYPE, ICON_PATH, COLOUR } from "../constants/enums";

export const getMaterialIconByType = iconType =>
  ICON_PATH[Object.keys(ICON_TYPE).find(key => ICON_TYPE[key] === iconType)];

export const getColourByIconType = iconType => {
  switch (iconType) {
    case ICON_TYPE.RESOLVE:
      return COLOUR.GREEN;
    case ICON_TYPE.UNRESOLVE:
      return COLOUR.RED;
    default:
      return COLOUR.BLUE;
  }
};
