# Tab closer

This extension automatically closes specified browser tabs after a 2.5 second delay. This delay should be enough time for the service to launch.

## How to use

Load this as an unpacked extension in a Chromium browser.

Edit `host_permissions` in `manifest.json` and the `targets` array in `background.js` to change the sites that get closed.
