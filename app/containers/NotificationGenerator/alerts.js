export const showAlert = function(level, options) {
  if (('Notification' in window)) {
    /* eslint-disable no-new */
    const { body, tag } = options;
    const isDangerLevel = level === 'danger';
    const icon = isDangerLevel ? '/img/danger.png' : '/img/warning.png';
    const title = isDangerLevel ? 'Danger' : 'Warning';

    const alertNotification = new Notification(title, {
      body,
      icon,
      tag
    });
    alertNotification.onclick = function(event) {
      event.preventDefault();
      event.stopPropagation();
      window.focus();
      this.close();
    };
  }
};
