"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var init;
var r0 = new RegExp('&', 'g');
var r1 = new RegExp('>', 'g');
var r2 = new RegExp('<', 'g');
var r3 = new RegExp('"', 'g');
var resources = (function () {
  function resources() {
  }
  resources.init = function () {
    if (!init) {
      resources.sysAlert = window.sysAlert;
      resources.sysMessage = window.sysMessage;
      resources.sysMessageHeader = window.sysMessageHeader;
      resources.sysErrorDetail = window.sysErrorDetail;
      resources.sysErrorDetailText = window.sysErrorDetailText;
      resources.sysErrorDetailCaret = window.sysErrorDetailCaret;
      resources.sysYes = window.sysYes;
      resources.sysNo = window.sysNo;
      init = true;
    }
  };
  resources.escape = function (text) {
    if (!text) {
      return '';
    }
    if (text.indexOf('"') >= 0) {
      text = text.replace(r3, '&quot;');
    }
    if (text.indexOf('&') >= 0) {
      text = text.replace(r0, '&amp;');
    }
    if (text.indexOf('>') >= 0) {
      text = text.replace(r1, '&gt;');
    }
    if (text.indexOf('<') >= 0) {
      text = text.replace(r2, '&lt;');
    }
    return text;
  };
  return resources;
}());
exports.resources = resources;
function showAlert(msg, header, detail, type, iconType, btnLeftText, btnRightText, yesCallback, noCallback) {
  resources.init();
  var sysAlert = resources.sysAlert;
  var sysMessage = resources.sysMessage;
  var sysMessageHeader = resources.sysMessageHeader;
  var sysErrorDetail = resources.sysErrorDetail;
  var sysErrorDetailText = resources.sysErrorDetailText;
  var sysYes = resources.sysYes;
  var sysNo = resources.sysNo;
  var sysErrorDetailCaret = resources.sysErrorDetailCaret;
  if (type === 'Alert') {
    if (!sysAlert.classList.contains('alert-only')) {
      sysAlert.classList.add('alert-only');
    }
  }
  else {
    sysAlert.classList.remove('alert-only');
  }
  if (sysErrorDetail && sysErrorDetailCaret && sysErrorDetailText) {
    if (!detail) {
      sysErrorDetailCaret.style.display = 'none';
      sysErrorDetail.style.display = 'none';
      sysErrorDetailText.innerHTML = '';
    }
    else {
      sysErrorDetailCaret.style.display = 'inline-block';
      sysErrorDetail.style.display = 'inline-block';
      sysErrorDetailText.innerHTML = resources.escape(detail);
    }
  }
  sysMessage.innerHTML = resources.escape(msg);
  sysMessageHeader.innerHTML = resources.escape(header);
  if (iconType === 'Alert') {
    if (!sysAlert.classList.contains('warning-icon')) {
      sysAlert.classList.add('warning-icon');
    }
    sysAlert.classList.remove('warning-icon');
  }
  else if (iconType === 'Error') {
    if (!sysAlert.classList.contains('danger-icon')) {
      sysAlert.classList.add('danger-icon');
    }
    sysAlert.classList.remove('warning-icon');
  }
  else {
    sysAlert.classList.remove('danger-icon');
    sysAlert.classList.remove('warning-icon');
  }
  var activeElement = window.document.activeElement;
  sysYes.innerHTML = resources.escape(btnRightText);
  sysNo.innerHTML = resources.escape(btnLeftText);
  sysYes['activeElement'] = activeElement;
  sysAlert.style.display = 'flex';
  window.fyesOnClick = yesCallback;
  window.fnoOnClick = noCallback;
  sysYes.focus();
}
exports.showAlert = showAlert;
function confirm(msg, header, yesCallback, btnLeftText, btnRightText, noCallback) {
  showAlert(msg, header, undefined, 'Confirm', 'Warning', btnLeftText, btnRightText, yesCallback, noCallback);
}
exports.confirm = confirm;
function alert(msg, header, detail, callback) {
  showAlert(msg, header, detail, 'Alert', 'Error', undefined, undefined, callback, undefined);
}
exports.alert = alert;
function alertError(msg, header, detail, callback) {
  showAlert(msg, header, detail, 'Alert', 'Error', undefined, undefined, callback, undefined);
}
exports.alertError = alertError;
function alertWarning(msg, header, callback) {
  showAlert(msg, header, undefined, 'Alert', 'Warning', undefined, undefined, callback, undefined);
}
exports.alertWarning = alertWarning;
function alertInfo(msg, header, callback) {
  showAlert(msg, header, undefined, 'Alert', 'Info', undefined, undefined, callback, undefined);
}
exports.alertInfo = alertInfo;
function alertSuccess(msg, detail, callback) {
  showAlert(msg, detail, undefined, 'Alert', 'Success', undefined, undefined, callback, undefined);
}
exports.alertSuccess = alertSuccess;
