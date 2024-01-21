export type Type = 'Confirm' | 'Alert';
export type IconType = 'Error' | 'Warning' | 'Confirm' | 'Success' | 'Info' | 'Alert';
let init: boolean;
// tslint:disable-next-line:class-name
export class resources {
  static sysAlert: HTMLElement;
  static sysMessage: HTMLElement;
  static sysMessageHeader: HTMLElement;
  static sysErrorDetail: HTMLElement;
  static sysErrorDetailText: HTMLElement;
  static sysYes: HTMLElement;
  static sysNo: HTMLElement;
  static sysErrorDetailCaret: HTMLElement;
  static rightText?: string;
  static leftText?: string;

  static init() {
    if (!init) {
      resources.sysAlert = (window as any).sysAlert;
      resources.sysMessage = (window as any).sysMessage;
      resources.sysMessageHeader = (window as any).sysMessageHeader;
      resources.sysErrorDetail = (window as any).sysErrorDetail;
      resources.sysErrorDetailText = (window as any).sysErrorDetailText;
      resources.sysErrorDetailCaret = (window as any).sysErrorDetailCaret;
      resources.sysYes = (window as any).sysYes;
      resources.sysNo = (window as any).sysNo;

      init = true;
    }
  }

  static escape(text?: string): string {
    if (!text) {
      return '';
    }
    const isIgnore = text.indexOf('<br />') >= 0;

    if (text.indexOf('"') >= 0) {
      text = text.replace(/"/g, '&quot;');
    }
    if (text.indexOf('&') >= 0) {
      text = text.replace(/&/g, '&amp;');
    }
    if (text.indexOf('>') >= 0) {
      text = text.replace(/>/g, '&gt;');
    }
    if (text.indexOf('<') >= 0) {
      text = text.replace(/</g, '&lt;');
    }
    // Ignore escaping if </br> tag is present
    if (isIgnore) {
      text = text.replace(/&lt;br \/&gt;/g, '<br />');
    }
    return text;
  }
}

export function showAlert(msg: string, header?: string, detail?: string, type?: Type, iconType?: IconType, btnLeftText?: string, btnRightText?: string, yesCallback?: () => void, noCallback?: () => void): void {
  resources.init();
  const sysAlert = resources.sysAlert;
  const sysMessage = resources.sysMessage;
  const sysMessageHeader = resources.sysMessageHeader;
  const sysErrorDetail = resources.sysErrorDetail;
  const sysErrorDetailText = resources.sysErrorDetailText;
  const sysYes = resources.sysYes;
  const sysNo = resources.sysNo;
  const sysErrorDetailCaret = resources.sysErrorDetailCaret;

  btnLeftText = btnLeftText ? btnLeftText : resources.leftText;
  btnRightText = btnRightText ? btnRightText : resources.rightText;

  if (type === 'Alert') {
    if (!sysAlert.classList.contains('alert-only')) {
      sysAlert.classList.add('alert-only');
    }
  } else {
    sysAlert.classList.remove('alert-only');
  }
  if (sysErrorDetail && sysErrorDetailCaret && sysErrorDetailText) {
    if (!detail) {
      sysErrorDetailCaret.style.display = 'none';
      sysErrorDetail.style.display = 'none';
      sysErrorDetailText.innerHTML = '';
    } else {
      sysErrorDetailCaret.style.display = 'inline-block';
      sysErrorDetail.style.display = 'inline-block';
      sysErrorDetailText.innerHTML = resources.escape(detail);
    }
  }
  sysMessage.innerHTML = resources.escape(msg);
  sysMessageHeader.innerHTML = resources.escape(header);
  sysAlert.classList.remove('success-icon', 'success-icon',  'info-icon', 'confirm-icon', 'danger-icon', 'warning-icon');
  if (iconType === 'Alert') {
    if (!sysAlert.classList.contains('warning-icon')) {
      sysAlert.classList.add('warning-icon');
    }
  } else if (iconType === 'Success') {
    if (!sysAlert.classList.contains('success-icon')) {
      sysAlert.classList.add('success-icon');
    }
  }  else if (iconType === 'Info') {
    if (!sysAlert.classList.contains('info-icon')) {
      sysAlert.classList.add('info-icon');
    }
  } else if (iconType === 'Confirm') {
    if (!sysAlert.classList.contains('confirm-icon')) {
      sysAlert.classList.add('confirm-icon');
    }
  } else if (iconType === 'Warning') {
    if (!sysAlert.classList.contains('warning-icon')) {
      sysAlert.classList.add('warning-icon');
    }
  } else if (iconType === 'Error') {
    if (!sysAlert.classList.contains('danger-icon')) {
      sysAlert.classList.add('danger-icon');
    }
  }
  const activeElement = (window as any).document.activeElement;
  sysYes.innerHTML = resources.escape(btnRightText);
  sysNo.innerHTML = resources.escape(btnLeftText);
  (sysYes as any)['activeElement'] = activeElement;
  sysAlert.style.display = 'flex';
  (window as any).fyesOnClick = yesCallback;
  (window as any).fnoOnClick = noCallback;
  sysYes.focus();
}

export function confirm(msg: string, header?: string, yesCallback?: () => void, btnLeftText?: string, btnRightText?: string, noCallback?: () => void): void {
  showAlert(msg, header, undefined, 'Confirm', 'Confirm', btnLeftText, btnRightText, yesCallback, noCallback);
}
export function alert(msg: string, header?: string, detail?: string, callback?: () => void): void {
  showAlert(msg, header, detail, 'Alert', 'Error', undefined, undefined, callback, undefined);
}
export function alertError(msg: string, header?: string, detail?: string, callback?: () => void): void {
  showAlert(msg, header, detail, 'Alert', 'Error', undefined, undefined, callback, undefined);
}
export function alertWarning(msg: string, header?: string, callback?: () => void): void {
  showAlert(msg, header, undefined, 'Alert', 'Warning', undefined, undefined, callback, undefined);
}
export function alertInfo(msg: string, header?: string, callback?: () => void): void {
  showAlert(msg, header, undefined, 'Alert', 'Info', undefined, undefined, callback, undefined);
}
export function alertSuccess(msg: string, detail?: string, callback?: () => void): void {
  showAlert(msg, detail, undefined, 'Alert', 'Success', undefined, undefined, callback, undefined);
}
