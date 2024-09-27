'use strict';

const myScript = {
  id: "ywm-content-script",
  js: ['content/content.js'],
  css: ['content/content.css'],
  persistAcrossSessions: false,
  matches: ["https://*.mail.yahoo.com/*"],
  runAt: "document_start"
};

const filter = {
  ids: [myScript.id]
};

const removeRuleIds = [1];

function addSessionRule() {
  return chrome.declarativeNetRequest.updateSessionRules({
    addRules: [{
      "id": 1,
      "action": { "type": "block" },
      "condition": {
        "regexFilter": "^https://(?:norrin\\.)?(alpha-|canary-)?(gpt|gam)\\.mail\\.(aol|yahoo|yahoosandbox)\\.net/(?:tbl/)?sandbox[?#]",
        "resourceTypes": ["sub_frame"],
        "requestMethods": ["get"],
        "initiatorDomains": ["mail.yahoo.com"]
      }
    }],
    removeRuleIds
  });
}

async function reloadTabs() {
  const tabs = await chrome.tabs.query({
    url: "https://*.mail.yahoo.com/*",
  });
  for (const tab of tabs) {
    await chrome.tabs.reload(tab.id);
  }
}

function setBadge(enabled) {
  return chrome.action.setBadgeText({text: enabled ? "on" : "off"});
}

chrome.action.onClicked.addListener(async () => {
  let enabled = true;
  const scripts = await chrome.scripting.getRegisteredContentScripts(filter);
  if (!scripts.length) {
    await chrome.scripting.registerContentScripts([myScript]);
    await addSessionRule();
  } else {
    await chrome.scripting.unregisterContentScripts(filter);
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds
    });
    enabled = false;
  }
  await setBadge(enabled);
  await chrome.storage.session.set({enabled});
  reloadTabs();
});

chrome.storage.sync.onChanged.addListener(async changes => {
  changes.openInFullWide.oldValue ??= false;
  if (changes.openInFullWide.newValue != changes.openInFullWide.oldValue) {
    const res = await chrome.storage.session.get({
      enabled: true
    });
    if (res.enabled) {
      reloadTabs();
    }
  }
});

async function init() {
  const res = await chrome.storage.session.get({
    initialized: false
  });
  if (res.initialized) {
    return;
  }
  await chrome.storage.session.set({
    initialized: true
  });
  const scripts = await chrome.scripting.getRegisteredContentScripts(filter);
  if (!scripts.length) {
    await chrome.scripting.registerContentScripts([myScript]);
  }
  await addSessionRule();
  await setBadge(true);
  reloadTabs();
}

// This is needed, so the background script starts correctly on startup.
chrome.runtime.onStartup.addListener(() => {});

chrome.runtime.onInstalled.addListener(async details => {
  if (details.reason == "install") {
    await chrome.runtime.openOptionsPage();
  }
});

init();
