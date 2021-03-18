<template>
  <PageContainer>
    <NavigationBar>
      <NavigationBarNotificationButton
        :onClick="() => toggleModal(MODAL_VIEWS.NOTIFICATIONS)"
        :notificationCount="notificationHistory.length"
      />
      <NavigationBarUserBox :operator="operator" />
    </NavigationBar>

    <ContentContainer>
      <ErrorGroup
        :name="ERROR_GROUP.UNRESOLVED"
        :colour="COLOUR.RED"
        :action="errorCardButtonAction(unresolved, resolved)"
        :data="unresolved.data"
      />
      <ErrorGroup
        :name="ERROR_GROUP.RESOLVED"
        :colour="COLOUR.GREEN"
        :action="errorCardButtonAction(resolved, unresolved)"
        :data="resolved.data"
      >
        <ErrorGroupButton
          :tooltipText="resolvedErrorCountTooltip"
          :onClick="() => toggleModal(MODAL_VIEWS.ERROR_OCCURRENCES)"
        />
      </ErrorGroup>
      <ErrorGroup
        :name="ERROR_GROUP.BACKLOG"
        :colour="COLOUR.YELLOW"
        :action="errorCardButtonAction(backlog, unresolved)"
        :data="backlog.data"
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
    <Modal
      v-if="modalState"
      :modalName="selectedModal"
      :onClose="() => toggleModal()"
    >
      <Table
        v-if="selectedModal === MODAL_VIEWS.ERROR_OCCURRENCES"
        :data="errorCount"
        :columns="[
          ERROR_FREQUENCY_COLUMN.ERROR_CODE,
          ERROR_FREQUENCY_COLUMN.OCCURRENCE
        ]"
      />
      <NotificationWindow
        v-if="selectedModal === MODAL_VIEWS.NOTIFICATIONS"
        :data="notificationHistory"
      />
    </Modal>
  </PageContainer>
</template>

<script>
export { componentDataLayer as default } from "./index";
</script>
