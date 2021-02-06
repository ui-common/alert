export enum AlertIconType {
  Error = 'Error',
  Warning = 'Warning',
  Success = 'Success',
  Info = 'Info',
  Alert = 'Alert'
}

export enum AlertType {
  Confirm = 'Confirm',
  Alert = 'Alert'
}
let init: boolean;
const r0 = new RegExp('&', 'g');
const r1 = new RegExp('>', 'g');
const r2 = new RegExp('<', 'g');
const r3 = new RegExp('"', 'g');
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

  static escape(text: string): string {
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
  }
}

export function showAlert(msg: string, header?: string, detail?: string, type?: AlertType, iconType?: AlertIconType, btnLeftText?: string, btnRightText?: string, yesCallback?: () => void, noCallback?: () => void): void {
  resources.init();
  const sysAlert = resources.sysAlert;
  const sysMessage = resources.sysMessage;
  const sysMessageHeader = resources.sysMessageHeader;
  const sysErrorDetail = resources.sysErrorDetail;
  const sysErrorDetailText = resources.sysErrorDetailText;
  const sysYes = resources.sysYes;
  const sysNo = resources.sysNo;
  const sysErrorDetailCaret = resources.sysErrorDetailCaret;

  if (type === AlertType.Alert) {
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
  if (iconType === AlertIconType.Alert) {
    if (!sysAlert.classList.contains('warning-icon')) {
      sysAlert.classList.add('warning-icon');
    }
    sysAlert.classList.remove('warning-icon');
  } else if (iconType === AlertIconType.Error) {
    if (!sysAlert.classList.contains('danger-icon')) {
      sysAlert.classList.add('danger-icon');
    }
    sysAlert.classList.remove('warning-icon');
  } else {
    sysAlert.classList.remove('danger-icon');
    sysAlert.classList.remove('warning-icon');
  }
  const activeElement = (window as any).document.activeElement;
  sysYes.innerHTML = resources.escape(btnRightText);
  sysNo.innerHTML = resources.escape(btnLeftText);
  sysYes['activeElement'] = activeElement;
  sysAlert.style.display = 'flex';
  (window as any).fyesOnClick = yesCallback;
  (window as any).fnoOnClick = noCallback;
  sysYes.focus();
}

export function confirm(msg: string, header: string, yesCallback?: () => void, btnLeftText?: string, btnRightText?: string, noCallback?: () => void): void {
  showAlert(msg, header, null, AlertType.Confirm, AlertIconType.Warning, btnLeftText, btnRightText, yesCallback, noCallback);
}
export function alert(msg: string, header?: string, detail?: string, callback?: () => void): void {
  showAlert(msg, header, detail, AlertType.Alert, AlertIconType.Error, null, null, callback, null);
}
export function alertError(msg: string, header?: string, detail?: string, callback?: () => void): void {
  showAlert(msg, header, detail, AlertType.Alert, AlertIconType.Error, null, null, callback, null);
}
export function alertWarning(msg: string, header?: string, callback?: () => void): void {
  showAlert(msg, header, null, AlertType.Alert, AlertIconType.Warning, null, null, callback, null);
}
export function alertInfo(msg: string, header?: string, callback?: () => void): void {
  showAlert(msg, header, null, AlertType.Alert, AlertIconType.Info, null, null, callback, null);
}
export function alertSuccess(msg: string, detail?: string, callback?: () => void): void {
  showAlert(msg, detail, null, AlertType.Alert, AlertIconType.Success, null, null, callback, null);
}
