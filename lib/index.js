"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
var AlertIconType;
(function(AlertIconType){
 AlertIconType["Error"]="Error";
 AlertIconType["Warning"]="Warning";
 AlertIconType["Success"]="Success";
 AlertIconType["Info"]="Info";
 AlertIconType["Alert"]="Alert";
})(AlertIconType=exports.AlertIconType||(exports.AlertIconType={}));
var AlertType;
(function(AlertType){
 AlertType["Confirm"]="Confirm";
 AlertType["Alert"]="Alert";
})(AlertType=exports.AlertType||(exports.AlertType={}));
var resources=(function(){
 function resources(){}
 resources.init=function(){
  if(resources._isInit === false){
   resources.sysAlert=window.sysAlert;
   resources.sysMessage=window.sysMessage;
   resources.sysMessageHeader=window.sysMessageHeader;
   resources.sysErrorDetail=window.sysErrorDetail;
   resources.sysErrorDetailText=window.sysErrorDetailText;
   resources.sysErrorDetailCaret=window.sysErrorDetailCaret;
   resources.sysYes=window.sysYes;
   resources.sysNo=window.sysNo;
   resources._isInit=true;
  }
 };
 resources.escape=function(text){
  if(!text){
   return '';
  }
  if(text.indexOf('"')>=0){
    text=text.replace(resources._r3, '&quot;');
  }
  if(text.indexOf('&')>=0){
   text=text.replace(resources._r0,'&amp;');
  }
  if(text.indexOf('>')>=0){
   text=text.replace(resources._r1,'&gt;');
  }
  if(text.indexOf('<')>=0){
   text=text.replace(resources._r2,'&lt;');
  }
  return text;
 };
 resources._isInit=false;
 resources._r0=new RegExp('&','g');
 resources._r1=new RegExp('>','g');
 resources._r2=new RegExp('<','g');
 resources._r3=new RegExp('"','g');
 return resources;
}());
exports.resources=resources;
function showAlert(msg,header,detail,type,iconType,btnLeftText,btnRightText,yesCallback,noCallback){
 resources.init();
 var sysAlert=resources.sysAlert;
 var sysMessage=resources.sysMessage;
 var sysMessageHeader=resources.sysMessageHeader;
 var sysErrorDetail=resources.sysErrorDetail;
 var sysErrorDetailText=resources.sysErrorDetailText;
 var sysYes=resources.sysYes;
 var sysNo=resources.sysNo;
 var sysErrorDetailCaret=resources.sysErrorDetailCaret;
 if(type === AlertType.Alert){
  if(!sysAlert.classList.contains('alert-only')){
   sysAlert.classList.add('alert-only');
  }
 }
 else {
  sysAlert.classList.remove('alert-only');
 }
 if(sysErrorDetail && sysErrorDetailCaret && sysErrorDetailText){
  if(!detail){
   sysErrorDetailCaret.style.display='none';
   sysErrorDetail.style.display='none';
   sysErrorDetailText.innerHTML='';
  }
  else {
   sysErrorDetailCaret.style.display='inline-block';
   sysErrorDetail.style.display='inline-block';
   sysErrorDetailText.innerHTML=resources.escape(detail);
  }
 }
 sysMessage.innerHTML=resources.escape(msg);
 sysMessageHeader.innerHTML=resources.escape(header);
 if(iconType === AlertIconType.Alert){
  if(!sysAlert.classList.contains('warning-icon')){
   sysAlert.classList.add('warning-icon');
  }
  sysAlert.classList.remove('warning-icon');
 }
 else if(iconType === AlertIconType.Error){
  if(!sysAlert.classList.contains('danger-icon')){
   sysAlert.classList.add('danger-icon');
  }
  sysAlert.classList.remove('warning-icon');
 }
 else {
  sysAlert.classList.remove('danger-icon');
  sysAlert.classList.remove('warning-icon');
 }
 var activeElement=window.document.activeElement;
 sysYes.innerHTML=resources.escape(btnRightText);
 sysNo.innerHTML=resources.escape(btnLeftText);
 sysYes['activeElement']=activeElement;
 sysAlert.style.display='flex';
 window.fyesOnClick=yesCallback;
 window.fnoOnClick=noCallback;
 sysYes.focus();
}
exports.showAlert=showAlert;
function confirm(msg,header,yesCallback,btnLeftText,btnRightText,noCallback){
 showAlert(msg,header,null,AlertType.Confirm,AlertIconType.Warning,btnLeftText,btnRightText,yesCallback,noCallback);
}
exports.confirm=confirm;
function alertError(msg,header,detail,callback){
 showAlert(msg,header,detail,AlertType.Alert,AlertIconType.Error,null,null,callback,null);
}
exports.alertError=alertError;
function alertWarning(msg,header,callback){
 showAlert(msg,header,null,AlertType.Alert,AlertIconType.Warning,null,null,callback,null);
}
exports.alertWarning=alertWarning;
function alertInfo(msg,header,callback){
 showAlert(msg,header,null,AlertType.Alert,AlertIconType.Info,null,null,callback,null);
}
exports.alertInfo=alertInfo;
function alertSuccess(msg,detail,callback){
 showAlert(msg,detail,null,AlertType.Alert,AlertIconType.Success,null,null,callback,null);
}
exports.alertSuccess=alertSuccess;
var DefaultAlertService=(function(){
 function DefaultAlertService(){
 }
 DefaultAlertService.prototype.confirm=function(msg,header,yesCallback,btnLeftText,btnRightText,noCallback){
  showAlert(msg,header,null,AlertType.Confirm,AlertIconType.Warning,btnLeftText,btnRightText,yesCallback,noCallback);
 };
 DefaultAlertService.prototype.alertError=function(msg,header,detail,callback){
  showAlert(msg,header,detail,AlertType.Alert,AlertIconType.Error,null,null,callback,null);
 };
 DefaultAlertService.prototype.alertWarning=function(msg,header,callback){
  showAlert(msg,header,null,AlertType.Alert,AlertIconType.Warning,null,null,callback,null);
 };
 DefaultAlertService.prototype.alertInfo=function(msg,header,callback){
  showAlert(msg,header,null,AlertType.Alert,AlertIconType.Info,null,null,callback,null);
 };
 DefaultAlertService.prototype.alertSuccess=function(msg,detail,callback){
  showAlert(msg,detail,null,AlertType.Alert,AlertIconType.Success,null,null,callback,null);
 };
 DefaultAlertService.prototype.showAlert=function(msg,header,detail,type,iconType,btnLeftText,btnRightText,yesCallback,noCallback){
  showAlert(msg,header,detail,type,iconType,btnLeftText,btnRightText,yesCallback,noCallback);
 };
 return DefaultAlertService;
}());
exports.uialert=new DefaultAlertService();
