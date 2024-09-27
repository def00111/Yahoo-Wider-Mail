"use strict";

var saving = false;

function $(id) {
  return document.getElementById(id);
}

function onError(error) {
  alert(error.toString());
  console.error(error);
}

chrome.storage.sync.get({openInFullWide: false}).then(pref => {
  if (pref.openInFullWide) {
    $("openInFullWide").checked = true;
  }
  $("saveButton").disabled = false;
}).catch(onError);

$("optionsForm").addEventListener("submit", evt => {
  evt.preventDefault();

  if (saving) {
    return;
  }
  saving = true;

  chrome.storage.sync.set({
    openInFullWide: $("openInFullWide").checked
  })
  .then(() => {
    $("saveHint").classList.remove("hidden");
  })
  .catch(onError)
  .finally(() => {
    setTimeout(() => {
      if (!$("saveHint").classList.contains("hidden")) {
        $("saveHint").classList.add("hidden");
      }
      saving = false;
    }, 300);
  });
});
