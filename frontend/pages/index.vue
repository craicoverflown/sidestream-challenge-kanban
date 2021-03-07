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
      />
      <ErrorGroup
        :name="'Backlog'"
        :colour="'yellow'"
        :action="buttonAction('Start task', backlog, unresolved)"
        :data="backlog"
      />
    </ContentContainer>
    <FloatingActionButton
      :buttonText="'Undo previous action'"
      :action="undoAction"
      :disabled="actionHistory.length > 0"
    />
  </div>
</template>

<script>
import { buttonAction } from "../utils/errorButtonAction";
import { actionHistory, undoAction } from "../utils/interactionManager";

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
  data() {
    return {
      unresolved: [],
      resolved: [],
      backlog: [],
      buttonAction,
      undoAction,
      actionHistory
    };
  }
  // watch: {
  //   isDisabled: function() {
  //     return actionHistory.length === 0;
  //   }
  // }
};
</script>
