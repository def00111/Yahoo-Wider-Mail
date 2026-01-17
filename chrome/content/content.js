(() => {
  'use strict';

  const sel1 = `div[data-test-id="mail-right-rail"]:has(div[data-test-id="gam-iframe"]:only-child) div[data-test-id="comms-properties-bar"]`;
  const sel2 = `#app > section[role="banner"]`;
  const sel3 = `div[data-test-id="message-toolbar"] button[data-test-id="checkbox"]`;

  let container = null;

  const fireResizeEvent = () => requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));

  const $ = (sel, el = document) => el.querySelector(sel);

  CSS.minimize = s => {
    s = s.trim();
    s = s.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
    // now all comments, newlines and tabs have been removed
    s = s.replace( / {2,}/g, ' ' );
    // now there are no more than single adjacent spaces left
    s = s.replace( / ([{:}]) /g, '$1' );
    s = s.replace( / ?\+ (?!\d)/g, '+' );
    s = s.replace( /([:;,>~]) /g, '$1' );
    s = s.replace( / ([!>])/g, '$1' );
    return s;
  };

  const cssText = (o => `
    ${o.a}:has(${o.b}):has(+ ${o.c} ${o.d} + ${o.e}),
    ${o.a}:has(> div > div[data-test-id]):has(+ ${o.c} ${o.e}:only-child) {
      border-right: none !important;
    }
    ${o.a}:has(${o.b} > div${o.h}:not(.I_ZkbNhI)) + ${o.c}:has(${o.d} + ${o.e}) ${o.f},
    ${o.a}:has(div${o.h}.I_T) + ${o.c}:has(${o.e}:only-child) ${o.f},
    ${o.a}:has(${o.b}):has(div${o.h}.I_T) + ${o.c}:has(${o.d} + ${o.e}) ${o.f},
    ${o.a}:has(> ${o.n}:not(.I_ZkbNhI) > div[data-test-id]) + ${o.c}:has(${o.e}:only-child) ${o.f} {
      background-color: transparent !important;
      border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    ${o.a}:has(${o.b}) + ${o.c}:has(${o.d} + ${o.e}) ${o.f},
    ${o.a}:has(> div > div[data-test-id]) + ${o.c}:has(${o.e}:only-child) ${o.f} {
      border-left: 1px solid #e0e4e9;
      position: absolute;
      right: 0;
    }
    ${o.a}:has(${o.b}):has(+ ${o.c} ${o.d} + ${o.e}) div${o.g},
    ${o.a}:has(+ ${o.c} ${o.e}:only-child) div${o.g} {
      box-sizing: border-box;
    }
    div:is(${o.g}, [data-test-id="travel-header"]) + div[data-test-id="mail-reader-toolbar"] > div${o.h} {
      max-width: none !important;
    }
    ${o.a}:has(+ ${o.c} ${o.e}:only-child) div:is(${o.h}, ${o.g}, ${o.k}, ${o.q}),
    ${o.a}:has(+ ${o.c} ${o.e}:only-child) > div > div > ${o.j} > div:not(${o.k}):has(> div > ${o.i}),
    ${o.a}:has(+ ${o.c} ${o.e}:only-child) > div > div > div:has(> div > ${o.i}),
    ${o.a}:has(+ ${o.c} ${o.e}:only-child) > ${o.n} > ${o.o} > ${o.p} > .compose-header div:is(${o.l}, ${o.m}),
    ${o.a}:has(${o.b}):has(+ ${o.c} ${o.d} + ${o.e}) div:is(${o.h}, ${o.g}, ${o.k}, ${o.q}),
    ${o.a}:has(${o.b}):has(+ ${o.c} ${o.d} + ${o.e}) > div > div > ${o.j} > div:not(${o.k}):has(> div > ${o.i}),
    ${o.a}:has(${o.b}):has(+ ${o.c} ${o.d} + ${o.e}) > div > div > div:has(> div > ${o.i}),
    ${o.a}:has(${o.b}):has(+ ${o.c} ${o.d} + ${o.e}) > ${o.n} > ${o.o} > ${o.p} > .compose-header div:is(${o.l}, ${o.m}) {
      max-width: calc(100% - var(--ywm-comms-properties-bar-width));
    }
    ${o.a}:has(+ ${o.c} ${o.e}:only-child) > div > div > div > div.R_qc:has(> ${o.i}),
    ${o.a}:has(${o.b}):has(+ ${o.c} ${o.d} + ${o.e}) > div > div > div > div.R_qc:has(> ${o.i}) { /* d/subscriptions/ */
      right: calc(var(--ywm-comms-properties-bar-width) + 20px);
    }
    ${o.a}:has(> ${o.n} > ${o.o} > ${o.p} > .compose-header) + ${o.c}:has(${o.e}:only-child) ${o.f}:not(.I_ZkbNhI),
    ${o.a}:has(> ${o.n}.I_ZkbNhI > div[data-test-id]) + ${o.c}:has(${o.e}:only-child) ${o.f}:not(.I_ZkbNhI),
    ${o.a}:has(${o.b}):has(> ${o.n}.I_ZkbNhI > div[data-test-id]) + ${o.c}:has(${o.d} + ${o.e}) ${o.f}:not(.I_ZkbNhI) {
      background-color: #fff !important;
      border-bottom: 1px solid #e0e4e9 !important;
      & > div > div > ${o.i} > button.cdPFi_ZkbNhI.C_ZOHqTQ {
        fill: inherit !important;
        color: inherit !important;
      }
      & > div[data-test-id="comms-properties"] > * {
        fill: #979ea8 !important;
        color: #fff !important;
      }
    }
  `)({
    a: "#mail-app-component",
    b: `div[data-test-id="message-group-view"]`,
    c: `div[data-test-id="mail-right-rail"]`,
    d: `div[data-test-id="contact-card"]`,
    e: `div[data-test-id="gam-iframe"]`,
    f: `div[data-test-id="comms-properties-bar"]`,
    g: `[data-test-id="search-header"]`,
    h: `[data-test-id="message-toolbar"]`,
    i: `div[data-test-id="popover-container"]`,
    j: `div[data-test-id="mail-reader"]`,
    k: `[data-test-id="photos-header"]`,
    l: `[data-test-id="compose-header-top-bar"]`,
    m: `[data-test-id="container-from"]`,
    n: `div[data-test-id="mail-app-main-content"]`,
    o: `div[data-test-id="compose-styler"]`,
    p: `div[data-test-id="compose"]`,
    q: `[data-test-id="travel-heading"]`,
  });

  const cssText2 = `${sel2} > div.H_3n1j3 { height: %height%px !important; }`;

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
      const styleEl = document.createElement("style");
      styleEl.id = "ywm-style3";
      styleEl.textContent = CSS.minimize(cssText);
      document.head.append(styleEl);
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
      styleEl.textContent = CSS.minimize(cssText2.replace("%height%", height));
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
        styleEl.textContent = CSS.minimize(cssText2.replace("%height%", height));
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
