export default (app) => {

  app.put(
    `/tenant/:tenantId/notification/:id`,
    require("./notificationUpdate").default
  );

  app.post(
    `/tenant/:tenantId/notification`,
    require("./notificationCreate").default
  );

  app.delete(
    `/tenant/:tenantId/notification`,
    require("./notificationDestroy").default
  );

  app.get(
    `/tenant/:tenantId/notification/admin`,
    require("./notificationListAdmin").default
  );

  app.get(
    `/tenant/:tenantId/notification/autocomplete`,
    require("./notificationAutocomplete").default
  );
  app.get(
    `/tenant/:tenantId/notification`,
    require("./notificationList").default
  );



    app.get(
    `/tenant/:tenantId/countUnreadByUser`,
    require("./notificationUnread").default
  );
  app.post(
    `/tenant/:tenantId/makeAsRead`,
    require("./notificationStatus").default
  );

  app.post(
    `/tenant/:tenantId/makeAllAsRead`,
    require("./notificationMarkAllRead").default
  );



  app.get(
    `/tenant/:tenantId/notification/:id`,
    require("./notificationFind").default
  );
};
