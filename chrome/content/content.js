(() => {
  'use strict';

  const sel1 = `div[data-test-id="mail-right-rail"]:has(div:only-child > iframe#gpt-iframe) div[data-test-id="comms-properties-bar"]`;
  const sel2 = `#app > section[role="banner"]`;
  const sel3 = `div[data-test-id="message-toolbar"] button[data-test-id="checkbox"]`;

  let container = null;

  const fireResizeEvent = () => requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));

  const $ = (sel, el = document) => el.querySelector(sel);

  const cssText = `${sel2} > div.H_3n1j3 { height: %height%px !important; }`;

  const addStyles = el => {
    let styleEl = $("#ywm-style1", document.head);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "ywm-style1";
      document.head.append(styleEl);
    }
    const style = window.getComputedStyle(el);
    const borderBottomWidth = parseFloat(style.borderBottomWidth);
    const width = parseInt(style.width, 10);
    styleEl.textContent = `:root { --ywm-comms-properties-bar-width: ${width + borderBottomWidth}px; }`;
    if (!$("#ywm-style3", document.head)) {
      const linkEl = document.createElement("link");
      linkEl.id = "ywm-style3";
      linkEl.rel = "stylesheet";
      linkEl.href = chrome.runtime.getURL("content/content2.css");
      document.head.append(linkEl);
    }
  };

  const observer = new MutationObserver(() => {
    const node = $(sel1, container);
    if (node) {
      observer.disconnect();
      delete observer._observing;
      addStyles(node);
    }
  });
  observer._observing = false;

  const observer2 = new MutationObserver(() => {
    const section = $(sel2, container);
    if (section) {
      if (resizeObserver3._observing) {
        resizeObserver3.disconnect();
        resizeObserver3._observing = false;
      }
      resizeObserver3.observe(section);
      resizeObserver3._observing = true;
    }
    const button = $(sel3, container);
    if (button) {
      if (observer3._observing) {
        observer3.disconnect();
        observer3._observing = false;
      }
      observer3.observe(button, {
        attributeFilter: ["aria-checked"]
      });
      observer3._observing = true;
    }
  });
  observer2._observing = false;

  const observer3 = new MutationObserver(([m]) => {
    const buttons = container.querySelectorAll(
      `div[data-test-id="message-toolbar"] div.cZW7ROP_A button`
    );
    if (!buttons.length) {
      return;
    }
    const ariaChecked = m.target.getAttribute("aria-checked");
    for (const button of buttons) {
      if (ariaChecked == "false") {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    }
  });
  observer3._observing = false;

  const resizeObserver = new ResizeObserver(([entry]) => {
    const { height } = entry.contentRect;
    if (height > 0) {
      const styleEl = $("#ywm-style2", document.head);
      styleEl.textContent = cssText.replace("%height%", height);
      resizeObserver.unobserve(entry.target);
      delete resizeObserver._observing;
    }
  });
  resizeObserver._observing = false;

  const resizeObserver2 = new ResizeObserver(fireResizeEvent);
  resizeObserver2._observing = false;

  const resizeObserver3 = new ResizeObserver(fireResizeEvent);
  resizeObserver3._observing = false;

  const run = () => {
    container = container ?? $("#mail-app-container");
    if (container) {
      const node = $(sel1, container);
      if (node) {
        addStyles(node);
      } else {
        if (!observer._observing) {
          observer.observe(container, {
            childList: true,
            subtree: true
          });
          observer._observing = true;
        }
      }
      const section = $(sel2, container);
      if (section && !resizeObserver3._observing) {
        resizeObserver3.observe(section);
        resizeObserver3._observing = true;
      }
      if (!observer2._observing) {
        observer2.observe(container, { childList: true });
        observer2._observing = true;
      }
      const button = $(sel3, container);
      if (button && !observer3._observing) {
        observer3.observe(button, {
          attributeFilter: ["aria-checked"]
        });
        observer3._observing = true;
      }
    }
    const wrap = $("#ybar-inner-wrap");
    if (wrap && !$("#ywm-style2", document.head)) {
      const styleEl = document.createElement("style");
      styleEl.id = "ywm-style2";
      document.head.append(styleEl);
      const { height } = wrap.getBoundingClientRect();
      if (height > 0) {
        styleEl.textContent = cssText.replace("%height%", height);
      } else {
        if (!resizeObserver._observing) {
          resizeObserver.observe(wrap);
          resizeObserver._observing = true;
        }
      }
    }
    const header = $("#norrin-ybar-header");
    if (header && !resizeObserver2._observing) {
      resizeObserver2.observe(header);
      resizeObserver2._observing = true;
    }
  };

  if (document.readyState != "loading") {
    run();
  }
  document.onreadystatechange = run;

  chrome.storage.sync.get({openInFullWide: false}).then(pref => {
    if (pref.openInFullWide) {
      document.documentElement.setAttribute("openinfullwide", true);
    }
  });
})();
