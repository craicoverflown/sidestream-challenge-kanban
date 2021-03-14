<template>
  <div>
    <ContentContainer>
      <ErrorGroup
        :name="ERROR_GROUP.UNRESOLVED"
        :colour="COLOUR.RED"
        :action="buttonAction(unresolved, resolved)"
        :data="unresolved"
      />
      <ErrorGroup
        :name="ERROR_GROUP.RESOLVED"
        :colour="COLOUR.GREEN"
        :action="buttonAction(resolved, unresolved)"
        :data="resolved"
      >
        <ErrorGroupButton
          :tooltipText="resolvedErrorCountTooltip"
          :data="resolved"
          :onClick="closeModal"
        />
      </ErrorGroup>
      <ErrorGroup
        :name="ERROR_GROUP.BACKLOG"
        :colour="COLOUR.YELLOW"
        :action="buttonAction(backlog, unresolved)"
        :data="backlog"
      />
    </ContentContainer>
    <FloatingActionButtonGroup>
      <FloatingActionButton
        :tooltipText="FAB_ACTION.UNDO_ALL"
        :action="undoAllActions"
        :isVisible="actionHistory.length > 1"
        :iconType="ICON_TYPE.UNDO_ALL"
      />
      <FloatingActionButton
        :tooltipText="FAB_ACTION.UNDO"
        :action="undoAction"
        :isVisible="actionHistory.length > 0"
        :iconType="ICON_TYPE.UNDO"
      />
    </FloatingActionButtonGroup>
    <Modal v-if="modalState" :onClose="closeModal">
      <Table>
        <TableHeader
          :columns="[
            ERROR_FREQUENCY_COLUMN.ERROR_CODE,
            ERROR_FREQUENCY_COLUMN.OCCURRENCE
          ]"
        />
        <TableBody :data="errorCount" />
      </Table>
    </Modal>
  </div>
</template>

<script>
export { componentDataLayer as default } from "./index";
</script>
