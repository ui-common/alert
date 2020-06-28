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

export class AlertUtil {
  private static _isInit = false;
  private static _r0 = new RegExp('&', 'gi');
  private static _r1 = new RegExp('>', 'gi');
  private static _r2 = new RegExp('<', 'gi');

  static sysAlert: any;
  static sysMessage: any;
  static sysMessageHeader: any;
  static sysErrorDetail: any;
  static sysErrorDetailText: any;
  static sysYes: any;
  static sysNo: any;
  static sysErrorDetailCaret: any;

  private static init() {
    if (AlertUtil._isInit === false) {
      AlertUtil.sysAlert = (window as any).sysAlert;
      AlertUtil.sysMessage = (window as any).sysMessage;
      AlertUtil.sysMessageHeader = (window as any).sysMessageHeader;
      AlertUtil.sysErrorDetail = (window as any).sysErrorDetail;
      AlertUtil.sysErrorDetailText = (window as any).sysErrorDetailText;
      AlertUtil.sysErrorDetailCaret = (window as any).sysErrorDetailCaret;
      AlertUtil.sysYes = (window as any).sysYes;
      AlertUtil.sysNo = (window as any).sysNo;

      AlertUtil._isInit = true;
    }
  }

  static confirm(msg: string, header: string, yesCallback?: () => void, btnLeftText?: string, btnRightText?: string, noCallback?: () => void) {
    AlertUtil.showAlert(msg, header, null, AlertType.Confirm, AlertIconType.Warning, btnLeftText, btnRightText, yesCallback, noCallback);
  }

  static alertError(msg: string, header?: string, detail?: string, callback?: () => void) {
    AlertUtil.showAlert(msg, header, detail, AlertType.Alert, AlertIconType.Error, null, null, callback, null);
  }

  static alertWarning(msg: string, header?: string, callback?: () => void) {
    AlertUtil.showAlert(msg, header, null, AlertType.Alert, AlertIconType.Warning, null, null, callback, null);
  }

  static alertInfo(msg: string, header?: string, callback?: () => void) {
    AlertUtil.showAlert(msg, header, null, AlertType.Alert, AlertIconType.Info, null, null, callback, null);
  }

  static alertSuccess(msg: string, detail?: string, callback?: () => void) {
    AlertUtil.showAlert(msg, detail, null, AlertType.Alert, AlertIconType.Success, null, null, callback, null);
  }

  static showAlert(msg: string, header?: string, detail?: string, type?: AlertType, iconType?: AlertIconType, btnLeftText?: string, btnRightText?: string, yesCallback?: () => void, noCallback?: () => void) {
    AlertUtil.init();
    const sysAlert = AlertUtil.sysAlert;
    const sysMessage = AlertUtil.sysMessage;
    const sysMessageHeader = AlertUtil.sysMessageHeader;
    const sysErrorDetail = AlertUtil.sysErrorDetail;
    const sysErrorDetailText = AlertUtil.sysErrorDetailText;
    const sysYes = AlertUtil.sysYes;
    const sysNo = AlertUtil.sysNo;
    const sysErrorDetailCaret = AlertUtil.sysErrorDetailCaret;

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
        sysErrorDetailText.innerHTML = AlertUtil.escape(detail);
      }
    }

    sysMessage.innerHTML = AlertUtil.escape(msg);
    sysMessageHeader.innerHTML = AlertUtil.escape(header);
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
    sysYes.innerHTML = AlertUtil.escape(btnRightText);
    sysNo.innerHTML = AlertUtil.escape(btnLeftText);
    sysYes['activeElement'] = activeElement;
    sysAlert.style.display = 'flex';
    (window as any).fyesOnClick = yesCallback;
    (window as any).fnoOnClick = noCallback;
    sysYes.focus();
  }

  private static escape(text: string): string {
    if (!text) return '';
    if (text.indexOf('&') >= 0) {
      text = text.replace(AlertUtil._r0, '&amp;');
    }
    if (text.indexOf('>') >= 0) {
      text = text.replace(AlertUtil._r1, '&gt;');
    }
    if (text.indexOf('<') >= 0) {
      text = text.replace(AlertUtil._r2, '&lt;');
    }
    return text;
  }
}

export interface AlertService {
  confirm(msg: string, header: string, yesCallback?: () => void, btnLeftText?: string, btnRightText?: string, noCallback?: () => void): void;
  alertError(msg: string, header?: string, detail?: string, callback?: () => void): void;
  alertWarning(msg: string, header?: string, callback?: () => void): void;
  alertInfo(msg: string, header?: string, callback?: () => void): void;
  alertSuccess(msg: string, detail?: string, callback?: () => void): void;
  showAlert(msg: string, header?: string, detail?: string, type?: AlertType, iconType?: AlertIconType, btnLeftText?: string, btnRightText?: string, yesCallback?: () => void, noCallback?: () => void): void;
}

class DefaultAlertService implements AlertService {
  confirm(msg: string, header: string, yesCallback?: () => void, btnLeftText?: string, btnRightText?: string, noCallback?: () => void) {
    AlertUtil.showAlert(msg, header, null, AlertType.Confirm, AlertIconType.Warning, btnLeftText, btnRightText, yesCallback, noCallback);
  }

  alertError(msg: string, header?: string, detail?: string, callback?: () => void) {
    AlertUtil.showAlert(msg, header, detail, AlertType.Alert, AlertIconType.Error, null, null, callback, null);
  }

  alertWarning(msg: string, header?: string, callback?: () => void) {
    AlertUtil.showAlert(msg, header, null, AlertType.Alert, AlertIconType.Warning, null, null, callback, null);
  }

  alertInfo(msg: string, header?: string, callback?: () => void) {
    AlertUtil.showAlert(msg, header, null, AlertType.Alert, AlertIconType.Info, null, null, callback, null);
  }

  alertSuccess(msg: string, detail?: string, callback?: () => void) {
    AlertUtil.showAlert(msg, detail, null, AlertType.Alert, AlertIconType.Success, null, null, callback, null);
  }

  showAlert(msg: string, header?: string, detail?: string, type?: AlertType, iconType?: AlertIconType, btnLeftText?: string, btnRightText?: string, yesCallback?: () => void, noCallback?: () => void) {
    AlertUtil.showAlert(msg, header, detail, type, iconType, btnLeftText, btnRightText, yesCallback, noCallback);
  }
}

export const uialert = new DefaultAlertService();
