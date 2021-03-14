// Data layer for index.vue
import {
  COLOUR,
  ICON_TYPE,
  FAB_ACTION,
  ERROR_GROUP,
  ERROR_FREQUENCY_COLUMN
} from "../constants/enums";
import { resolvedErrorCountTooltip } from "../constants/data";
import { buttonAction } from "../utils/errorButtonAction";
import {
  actionHistory,
  undoAction,
  undoAllActions
} from "../utils/interactionManager";

export const componentDataLayer = {
  async asyncData({ $axios }) {
    try {
      const { resolved, unresolved, backlog } = await $axios.$get(
        "http://localhost:8000/get_lists"
      );
      return { resolved, unresolved, backlog };
    } catch (error) {
      console.log(
        `Couldn't get error lists:\n${error}\nDid you start the API?`
      );
      console.log(
        "HINT: You can comment out the full `asyncData` method and work with mocked data for UI/UX development, if you want to."
      );
    }
  },
  methods: {
    // Control toggle for modal state
    closeModal: function() {
      this.modalState = !this.modalState;
    }
  },
  watch: {
    // Observe modal state change for triggering post request on counting error code occurrences.
    modalState: async function(newState) {
      if (newState) {
        try {
          this.errorCount = await this.$axios.$post(
            "http://localhost:8000/count_resolved_error_code_occurrences",
            this.resolved
          );
        } catch (error) {
          console.log(
            `Couldn't get error code occurrences:\n${error}\nDid you start the API?`
          );
        }
      }
    }
  },
  data() {
    return {
      unresolved: [],
      resolved: [],
      backlog: [],
      buttonAction,
      undoAction,
      undoAllActions,
      actionHistory,
      modalState: false,
      errorCount: [],
      resolvedErrorCountTooltip,
      COLOUR,
      ICON_TYPE,
      FAB_ACTION,
      ERROR_GROUP,
      ERROR_FREQUENCY_COLUMN
    };
  }
};
