<template>
  <div>
    <ContentContainer>
      <ErrorGroup
        :name="'Unresolved'"
        :colour="'red'"
        :action="buttonAction('Resolve', unresolved, resolved)"
        :data="unresolved"
      />
      <ErrorGroup
        :name="'Resolved'"
        :colour="'green'"
        :action="buttonAction('Unresolve', resolved, unresolved)"
        :data="resolved"
      >
        <ErrorGroupButton
          :tooltipText="'View number of resolved errors by error code'"
          :data="resolved"
          :onClick="closeModal"
        />
      </ErrorGroup>
      <ErrorGroup
        :name="'Backlog'"
        :colour="'yellow'"
        :action="buttonAction('Start task', backlog, unresolved)"
        :data="backlog"
      />
    </ContentContainer>
    <FloatingActionButtonGroup>
      <FloatingActionButton
        :buttonText="'Undo all actions'"
        :action="undoAllActions"
        :disabled="actionHistory.length > 1"
      />
      <FloatingActionButton
        :buttonText="'Undo previous action'"
        :action="undoAction"
        :disabled="actionHistory.length > 0"
      />
    </FloatingActionButtonGroup>
    <Modal v-if="modalState" :onClose="closeModal">
      <Table>
        <TableHeader :columns="['Error Code', 'Occurrence']" />
        <TableBody :data="errorCount" />
      </Table>
    </Modal>
  </div>
</template>

<script>
import { buttonAction } from "../utils/errorButtonAction";
import {
  actionHistory,
  undoAction,
  undoAllActions
} from "../utils/interactionManager";

export default {
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
      errorCount: []
    };
  }
};
</script>
