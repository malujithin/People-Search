// show a notification after 15 seconds (the notification
// permission must be granted first)
setTimeout(() => {
    self.registration.showNotification('Notification from PWA!');
}, 15000);

// register a custom navigation route
const customRoute = new workbox.routing.NavigationRoute(({ event }) => {
    // ...
});
workbox.routing.registerRoute(customRoute);
