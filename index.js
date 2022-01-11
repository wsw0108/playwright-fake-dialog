const path = require('path');

function launch(_electron, options) {
  options = options || {};
  options.args = options.args || [];
  options.args.unshift(path.join(__dirname, 'preload.js'));
  options.args.unshift('--require');
  return _electron.launch(options);
}

function ipcRendererSendSyncAsync(page, message, ...args) {
  return page.evaluate(
    ({ message, args }) => {
      const { ipcRenderer } = require('electron');
      return ipcRenderer.sendSync(message, ...args);
    },
    { message, args }
  );
}

function mock(page, options) {
  return ipcRendererSendSyncAsync(page, 'PLAYWRIGHT_FAKE_DIALOG/SEND', options);
}

module.exports = { launch, mock };
