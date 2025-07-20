"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var init;
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
      return "";
    }
    var isIgnore = text.indexOf("<br />") >= 0;
    if (text.indexOf('"') >= 0) {
      text = text.replace(/"/g, "&quot;");
    }
    if (text.indexOf("&") >= 0) {
      text = text.replace(/&/g, "&amp;");
    }
    if (text.indexOf(">") >= 0) {
      text = text.replace(/>/g, "&gt;");
    }
    if (text.indexOf("<") >= 0) {
      text = text.replace(/</g, "&lt;");
    }
    if (isIgnore) {
      text = text.replace(/&lt;br \/&gt;/g, "<br />");
    }
    return text;
  };
  return resources;
}());
exports.resources = resources;
function showAlert(msg, header, type, iconType, btnLeftText, btnRightText, yesCallback, noCallback, detail) {
  resources.init();
  var sysAlert = resources.sysAlert;
  var sysMessage = resources.sysMessage;
  var sysMessageHeader = resources.sysMessageHeader;
  var sysErrorDetail = resources.sysErrorDetail;
  var sysErrorDetailText = resources.sysErrorDetailText;
  var sysYes = resources.sysYes;
  var sysNo = resources.sysNo;
  var sysErrorDetailCaret = resources.sysErrorDetailCaret;
  btnLeftText = btnLeftText !== undefined ? btnLeftText : resources.leftText;
  btnRightText = btnRightText !== undefined ? btnRightText : resources.rightText;
  if (type === "Alert") {
    if (!sysAlert.classList.contains("alert-only")) {
      sysAlert.classList.add("alert-only");
    }
  }
  else {
    sysAlert.classList.remove("alert-only");
  }
  if (sysErrorDetail && sysErrorDetailCaret && sysErrorDetailText) {
    if (!detail) {
      sysErrorDetailCaret.style.display = "none";
      sysErrorDetail.style.display = "none";
      sysErrorDetailText.innerHTML = "";
    }
    else {
      sysErrorDetailCaret.style.display = "inline-block";
      sysErrorDetail.style.display = "inline-block";
      sysErrorDetailText.innerHTML = resources.escape(detail);
    }
  }
  sysMessage.innerHTML = resources.escape(msg);
  sysMessageHeader.innerHTML = resources.escape(header);
  sysAlert.classList.remove("success-icon", "success-icon", "info-icon", "confirm-icon", "danger-icon", "warning-icon");
  if (iconType === "Alert") {
    if (!sysAlert.classList.contains("warning-icon")) {
      sysAlert.classList.add("warning-icon");
    }
  }
  else if (iconType === "Success") {
    if (!sysAlert.classList.contains("success-icon")) {
      sysAlert.classList.add("success-icon");
    }
  }
  else if (iconType === "Info") {
    if (!sysAlert.classList.contains("info-icon")) {
      sysAlert.classList.add("info-icon");
    }
  }
  else if (iconType === "Confirm") {
    if (!sysAlert.classList.contains("confirm-icon")) {
      sysAlert.classList.add("confirm-icon");
    }
  }
  else if (iconType === "Warning") {
    if (!sysAlert.classList.contains("warning-icon")) {
      sysAlert.classList.add("warning-icon");
    }
  }
  else if (iconType === "Error") {
    if (!sysAlert.classList.contains("danger-icon")) {
      sysAlert.classList.add("danger-icon");
    }
  }
  var activeElement = window.document.activeElement;
  sysYes.innerHTML = resources.escape(btnRightText);
  sysNo.innerHTML = resources.escape(btnLeftText);
  sysYes["activeElement"] = activeElement;
  sysAlert.style.display = "flex";
  window.fyesOnClick = yesCallback;
  window.fnoOnClick = noCallback;
  sysYes.focus();
}
exports.showAlert = showAlert;
function confirm(msg, yesCallback, header, btnLeftText, btnRightText, noCallback) {
  var l = btnLeftText ? btnLeftText : resources.leftText;
  var r = btnRightText ? btnRightText : resources.rightText;
  var h = header ? header : resources.confirmHeader;
  showAlert(msg, h, "Confirm", "Confirm", l, r, yesCallback, noCallback);
}
exports.confirm = confirm;
function alert(msg, header, callback, detail) {
  showAlert(msg, header, "Alert", "Error", "", "", callback, undefined, detail);
}
exports.alert = alert;
function alertError(msg, callback, header, detail) {
  var h = header ? header : resources.errorHeader;
  showAlert(msg, h, "Alert", "Error", "", "", callback, undefined, detail);
}
exports.alertError = alertError;
function alertWarning(msg, callback, header) {
  var h = header ? header : resources.warningHeader;
  showAlert(msg, h, "Alert", "Warning", "", "", callback, undefined);
}
exports.alertWarning = alertWarning;
function alertInfo(msg, callback, header) {
  var h = header ? header : resources.infoHeader;
  showAlert(msg, h, "Alert", "Info", "", "", callback, undefined);
}
exports.alertInfo = alertInfo;
function alertSuccess(msg, callback, header) {
  var h = header ? header : resources.successHeader;
  showAlert(msg, h, "Alert", "Success", "", "", callback, undefined);
}
exports.alertSuccess = alertSuccess;
