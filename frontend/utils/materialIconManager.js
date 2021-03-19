import { ICON_TYPE, ICON_PATH, COLOUR } from "../constants/enums";

/**
 * Returns the d value of the material icon that is to be injected into the MaterialIcon component based on the passed iconType.
 *
 * @param iconType Routes the iconType to its proprietary iconPath.
 */
export const getMaterialIconByType = iconType =>
  ICON_PATH[Object.keys(ICON_TYPE).find(key => ICON_TYPE[key] === iconType)];

/**
 * Returns the colour of the notification icon based on the passed iconType.
 *
 * @param iconType Routes the iconType to its icon colour.
 */
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
