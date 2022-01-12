function mock(electronApp, options) {
  // idea from https://github.com/microsoft/playwright/issues/8278#issuecomment-1009957411 by MikeJerred
  return electronApp.evaluate(
    ({ dialog }, options) => {
      options.forEach(v => {
        if (!dialog[v.method]) {
          throw new Error(`can't find ${v.method} on dialog module.`)
        }
        if (v.method.endsWith('Sync')) {
          dialog[v.method] = () => v.value;
        } else {
          dialog[v.method] = Promise.resolve(v.value);
        }
      });
    },
    options
  );
}

module.exports = { mock };
