# Tab closer

This extension automatically closes specified browser tabs after a 2.5 second delay. This delay should be enough time for the service to launch.

## How to use

Load this as an unpacked extension in a Chromium browser.

Edit [`host_permissions` in `manifest.json`](https://github.com/ericwbailey/tab-closer/blob/main/Source/manifest.json#L10-L12) and [the `targets` array in `background.js`](https://github.com/ericwbailey/tab-closer/blob/main/Source/background.js#L3-L5) to change the sites that get closed.
