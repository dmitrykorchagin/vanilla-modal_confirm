$.confirm = function(options) {
  return new Promise((resovle, reject) => {
    const modal = $.modal({
      title: options.title,
      width: '400px',
      closable: false,
      center: true,
      content: options.content,
      onClose() {
        modal.destroy();
      },
      footerButtons: [
        {
          text: 'Cancel',
          classes: 'btn-secondary',
          handler() {
            modal.close();
            reject();
          }
        },
        {
          text: 'Delete',
          classes: 'btn-danger',
          handler() {
            modal.close();
            resovle();
          }
        }
      ]
    });

    setTimeout(() => {
      modal.open();
    }, 100);
  });
};
