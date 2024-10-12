export type Type = "Confirm" | "Alert"
export type IconType = "Error" | "Warning" | "Confirm" | "Success" | "Info" | "Alert"
let init: boolean
// tslint:disable-next-line:class-name
export class resources {
  static sysAlert: HTMLElement
  static sysMessage: HTMLElement
  static sysMessageHeader: HTMLElement
  static sysErrorDetail: HTMLElement
  static sysErrorDetailText: HTMLElement
  static sysYes: HTMLElement
  static sysNo: HTMLElement
  static sysErrorDetailCaret: HTMLElement
  static rightText?: string
  static leftText?: string
  static confirmHeader?: string
  static errorHeader?: string
  static warningHeader?: string
  static infoHeader?: string
  static successHeader?: string

  static init() {
    if (!init) {
      resources.sysAlert = (window as any).sysAlert
      resources.sysMessage = (window as any).sysMessage
      resources.sysMessageHeader = (window as any).sysMessageHeader
      resources.sysErrorDetail = (window as any).sysErrorDetail
      resources.sysErrorDetailText = (window as any).sysErrorDetailText
      resources.sysErrorDetailCaret = (window as any).sysErrorDetailCaret
      resources.sysYes = (window as any).sysYes
      resources.sysNo = (window as any).sysNo

      init = true
    }
  }

  static escape(text?: string): string {
    if (!text) {
      return ""
    }
    const isIgnore = text.indexOf("<br />") >= 0

    if (text.indexOf('"') >= 0) {
      text = text.replace(/"/g, "&quot;")
    }
    if (text.indexOf("&") >= 0) {
      text = text.replace(/&/g, "&amp;")
    }
    if (text.indexOf(">") >= 0) {
      text = text.replace(/>/g, "&gt;")
    }
    if (text.indexOf("<") >= 0) {
      text = text.replace(/</g, "&lt;")
    }
    // Ignore escaping if </br> tag is present
    if (isIgnore) {
      text = text.replace(/&lt;br \/&gt;/g, "<br />")
    }
    return text
  }
}

export function showAlert(
  msg: string,
  header?: string,
  type?: Type,
  iconType?: IconType,
  btnLeftText?: string,
  btnRightText?: string,
  yesCallback?: () => void,
  noCallback?: () => void,
  detail?: string,
): void {
  resources.init()
  const sysAlert = resources.sysAlert
  const sysMessage = resources.sysMessage
  const sysMessageHeader = resources.sysMessageHeader
  const sysErrorDetail = resources.sysErrorDetail
  const sysErrorDetailText = resources.sysErrorDetailText
  const sysYes = resources.sysYes
  const sysNo = resources.sysNo
  const sysErrorDetailCaret = resources.sysErrorDetailCaret

  btnLeftText = btnLeftText !== undefined ? btnLeftText : resources.leftText
  btnRightText = btnRightText !== undefined ? btnRightText : resources.rightText

  if (type === "Alert") {
    if (!sysAlert.classList.contains("alert-only")) {
      sysAlert.classList.add("alert-only")
    }
  } else {
    sysAlert.classList.remove("alert-only")
  }
  if (sysErrorDetail && sysErrorDetailCaret && sysErrorDetailText) {
    if (!detail) {
      sysErrorDetailCaret.style.display = "none"
      sysErrorDetail.style.display = "none"
      sysErrorDetailText.innerHTML = ""
    } else {
      sysErrorDetailCaret.style.display = "inline-block"
      sysErrorDetail.style.display = "inline-block"
      sysErrorDetailText.innerHTML = resources.escape(detail)
    }
  }
  sysMessage.innerHTML = resources.escape(msg)
  sysMessageHeader.innerHTML = resources.escape(header)
  sysAlert.classList.remove("success-icon", "success-icon", "info-icon", "confirm-icon", "danger-icon", "warning-icon")
  if (iconType === "Alert") {
    if (!sysAlert.classList.contains("warning-icon")) {
      sysAlert.classList.add("warning-icon")
    }
  } else if (iconType === "Success") {
    if (!sysAlert.classList.contains("success-icon")) {
      sysAlert.classList.add("success-icon")
    }
  } else if (iconType === "Info") {
    if (!sysAlert.classList.contains("info-icon")) {
      sysAlert.classList.add("info-icon")
    }
  } else if (iconType === "Confirm") {
    if (!sysAlert.classList.contains("confirm-icon")) {
      sysAlert.classList.add("confirm-icon")
    }
  } else if (iconType === "Warning") {
    if (!sysAlert.classList.contains("warning-icon")) {
      sysAlert.classList.add("warning-icon")
    }
  } else if (iconType === "Error") {
    if (!sysAlert.classList.contains("danger-icon")) {
      sysAlert.classList.add("danger-icon")
    }
  }
  const activeElement = (window as any).document.activeElement
  sysYes.innerHTML = resources.escape(btnRightText)
  sysNo.innerHTML = resources.escape(btnLeftText)
  ;(sysYes as any)["activeElement"] = activeElement
  sysAlert.style.display = "flex"
  ;(window as any).fyesOnClick = yesCallback
  ;(window as any).fnoOnClick = noCallback
  sysYes.focus()
}

export function confirm(msg: string, yesCallback?: () => void, header?: string, btnLeftText?: string, btnRightText?: string, noCallback?: () => void): void {
  const l = btnLeftText ? btnLeftText : resources.leftText
  const r = btnRightText ? btnRightText : resources.rightText
  const h = header ? header : resources.confirmHeader
  showAlert(msg, h, "Confirm", "Confirm", l, r, yesCallback, noCallback)
}
export function alert(msg: string, header?: string, callback?: () => void, detail?: string): void {
  showAlert(msg, header, "Alert", "Error", "", "", callback, undefined, detail)
}
export function alertError(msg: string, callback?: () => void, header?: string, detail?: string): void {
  const h = header ? header : resources.errorHeader
  showAlert(msg, h, "Alert", "Error", "", "", callback, undefined, detail)
}
export function alertWarning(msg: string, callback?: () => void, header?: string): void {
  const h = header ? header : resources.warningHeader
  showAlert(msg, h, "Alert", "Warning", "", "", callback, undefined)
}
export function alertInfo(msg: string, callback?: () => void, header?: string): void {
  const h = header ? header : resources.infoHeader
  showAlert(msg, h, "Alert", "Info", "", "", callback, undefined)
}
export function alertSuccess(msg: string, callback?: () => void, header?: string): void {
  const h = header ? header : resources.successHeader
  showAlert(msg, h, "Alert", "Success", "", "", callback, undefined)
}
