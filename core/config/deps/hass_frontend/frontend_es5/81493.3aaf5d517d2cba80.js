"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["81493"],{93444:function(e,t,a){var i=a(40445),o=a(96196),s=a(77845);let r,l,n=e=>e;class d extends o.WF{render(){return(0,o.qy)(r||(r=n` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,o.AH)(l||(l=n`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}d=(0,i.Cg)([(0,s.EM)("ha-dialog-footer")],d)},71418:function(e,t,a){a(62953);var i=a(40445),o=a(96196),s=a(77845);a(26300),a(75709);let r,l,n,d=e=>e;class h extends o.WF{render(){var e;return(0,o.qy)(r||(r=d`<ha-textfield .invalid="${0}" .errorMessage="${0}" .icon="${0}" .iconTrailing="${0}" .autocomplete="${0}" .autocorrect="${0}" .inputSpellcheck="${0}" .value="${0}" .placeholder="${0}" .label="${0}" .disabled="${0}" .required="${0}" .minLength="${0}" .maxLength="${0}" .outlined="${0}" .helper="${0}" .validateOnInitialRender="${0}" .validationMessage="${0}" .autoValidate="${0}" .pattern="${0}" .size="${0}" .helperPersistent="${0}" .charCounter="${0}" .endAligned="${0}" .prefix="${0}" .name="${0}" .inputMode="${0}" .readOnly="${0}" .autocapitalize="${0}" .type="${0}" .suffix="${0}" @input="${0}" @change="${0}"></ha-textfield> <ha-icon-button .label="${0}" @click="${0}" .path="${0}"></ha-icon-button>`),this.invalid,this.errorMessage,this.icon,this.iconTrailing,this.autocomplete,this.autocorrect,this.inputSpellcheck,this.value,this.placeholder,this.label,this.disabled,this.required,this.minLength,this.maxLength,this.outlined,this.helper,this.validateOnInitialRender,this.validationMessage,this.autoValidate,this.pattern,this.size,this.helperPersistent,this.charCounter,this.endAligned,this.prefix,this.name,this.inputMode,this.readOnly,this.autocapitalize,this._unmaskedPassword?"text":"password",(0,o.qy)(l||(l=d`<div style="width:24px"></div>`)),this._handleInputEvent,this._handleChangeEvent,(null===(e=this.hass)||void 0===e?void 0:e.localize(this._unmaskedPassword?"ui.components.selectors.text.hide_password":"ui.components.selectors.text.show_password"))||(this._unmaskedPassword?"Hide password":"Show password"),this._toggleUnmaskedPassword,this._unmaskedPassword?"M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z":"M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z")}focus(){this._textField.focus()}checkValidity(){return this._textField.checkValidity()}reportValidity(){return this._textField.reportValidity()}setCustomValidity(e){return this._textField.setCustomValidity(e)}layout(){return this._textField.layout()}_toggleUnmaskedPassword(){this._unmaskedPassword=!this._unmaskedPassword}_handleInputEvent(e){this.value=e.target.value}_handleChangeEvent(e){this.value=e.target.value,this._reDispatchEvent(e)}_reDispatchEvent(e){const t=new Event(e.type,e);this.dispatchEvent(t)}constructor(...e){super(...e),this.icon=!1,this.iconTrailing=!1,this.autocorrect=!0,this.value="",this.placeholder="",this.label="",this.disabled=!1,this.required=!1,this.minLength=-1,this.maxLength=-1,this.outlined=!1,this.helper="",this.validateOnInitialRender=!1,this.validationMessage="",this.autoValidate=!1,this.pattern="",this.size=null,this.helperPersistent=!1,this.charCounter=!1,this.endAligned=!1,this.prefix="",this.suffix="",this.name="",this.readOnly=!1,this.autocapitalize="",this._unmaskedPassword=!1}}h.styles=(0,o.AH)(n||(n=d`:host{display:block;position:relative}ha-textfield{width:100%}ha-icon-button{position:absolute;top:8px;right:8px;inset-inline-start:initial;inset-inline-end:8px;--mdc-icon-button-size:40px;--mdc-icon-size:20px;color:var(--secondary-text-color);direction:var(--direction)}`)),(0,i.Cg)([(0,s.MZ)({attribute:!1})],h.prototype,"hass",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"invalid",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"error-message"})],h.prototype,"errorMessage",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"icon",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"iconTrailing",void 0),(0,i.Cg)([(0,s.MZ)()],h.prototype,"autocomplete",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"autocorrect",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"input-spellcheck"})],h.prototype,"inputSpellcheck",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],h.prototype,"value",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],h.prototype,"placeholder",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],h.prototype,"label",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,reflect:!0})],h.prototype,"disabled",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"required",void 0),(0,i.Cg)([(0,s.MZ)({type:Number})],h.prototype,"minLength",void 0),(0,i.Cg)([(0,s.MZ)({type:Number})],h.prototype,"maxLength",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,reflect:!0})],h.prototype,"outlined",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],h.prototype,"helper",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"validateOnInitialRender",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],h.prototype,"validationMessage",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"autoValidate",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],h.prototype,"pattern",void 0),(0,i.Cg)([(0,s.MZ)({type:Number})],h.prototype,"size",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"helperPersistent",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"charCounter",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"endAligned",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],h.prototype,"prefix",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],h.prototype,"suffix",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],h.prototype,"name",void 0),(0,i.Cg)([(0,s.MZ)({type:String,attribute:"input-mode"})],h.prototype,"inputMode",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],h.prototype,"readOnly",void 0),(0,i.Cg)([(0,s.MZ)({attribute:!1,type:String})],h.prototype,"autocapitalize",void 0),(0,i.Cg)([(0,s.wk)()],h.prototype,"_unmaskedPassword",void 0),(0,i.Cg)([(0,s.P)("ha-textfield")],h.prototype,"_textField",void 0),(0,i.Cg)([(0,s.Ls)({passive:!0})],h.prototype,"_handleInputEvent",null),(0,i.Cg)([(0,s.Ls)({passive:!0})],h.prototype,"_handleChangeEvent",null),h=(0,i.Cg)([(0,s.EM)("ha-password-field")],h)},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var i=a(40445),o=a(93900),s=a(96196),r=a(77845),l=a(32288),n=a(1087),d=a(59992),h=a(14503),p=(a(76538),a(26300),e([o,d]));[o,d]=p.then?(await p)():p;let c,g,u,v,y,f,w,m=e=>e;const b="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class C extends((0,d.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,s.qy)(c||(c=m` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,l.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?s.s6:(0,s.qy)(g||(g=m` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",b,void 0!==this.headerTitle?(0,s.qy)(u||(u=m`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,s.qy)(v||(v=m`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,s.qy)(y||(y=m`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,s.qy)(f||(f=m`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,s.AH)(w||(w=m`
        wa-dialog {
          --full-width: var(
            --ha-dialog-width-full,
            min(95vw, var(--safe-width))
          );
          --width: min(var(--ha-dialog-width-md, 580px), var(--full-width));
          --spacing: var(--dialog-content-padding, var(--ha-space-6));
          --show-duration: var(--ha-dialog-show-duration, 200ms);
          --hide-duration: var(--ha-dialog-hide-duration, 200ms);
          --ha-dialog-surface-background: var(
            --card-background-color,
            var(--ha-color-surface-default)
          );
          --wa-color-surface-raised: var(
            --ha-dialog-surface-background,
            var(--card-background-color, var(--ha-color-surface-default))
          );
          --wa-panel-border-radius: var(
            --ha-dialog-border-radius,
            var(--ha-border-radius-3xl)
          );
          max-width: var(--ha-dialog-max-width, var(--safe-width));
        }
        @media (prefers-reduced-motion: reduce) {
          wa-dialog {
            --show-duration: 0ms;
            --hide-duration: 0ms;
          }
        }

        :host([width="small"]) wa-dialog {
          --width: min(var(--ha-dialog-width-sm, 320px), var(--full-width));
        }

        :host([width="large"]) wa-dialog {
          --width: min(var(--ha-dialog-width-lg, 1024px), var(--full-width));
        }

        :host([width="full"]) wa-dialog {
          --width: var(--full-width);
        }

        wa-dialog::part(dialog) {
          color: var(--primary-text-color);
          min-width: var(--width, var(--full-width));
          max-width: var(--width, var(--full-width));
          max-height: var(
            --ha-dialog-max-height,
            calc(var(--safe-height) - var(--ha-space-20))
          );
          min-height: var(--ha-dialog-min-height);
          margin-top: var(--dialog-surface-margin-top, auto);
          /* Used to offset the dialog from the safe areas when space is limited */
          transform: translate(
            calc(
              var(--safe-area-offset-left, 0px) - var(
                  --safe-area-offset-right,
                  0px
                )
            ),
            calc(
              var(--safe-area-offset-top, 0px) - var(
                  --safe-area-offset-bottom,
                  0px
                )
            )
          );
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        @media all and (max-width: 450px), all and (max-height: 500px) {
          :host([type="standard"]) {
            --ha-dialog-border-radius: 0;

            wa-dialog {
              /* Make the container fill the whole screen width and not the safe width */
              --full-width: var(--ha-dialog-width-full, 100vw);
              --width: var(--full-width);
            }

            wa-dialog::part(dialog) {
              /* Make the dialog fill the whole screen height and not the safe height */
              min-height: var(--ha-dialog-min-height, 100vh);
              min-height: var(--ha-dialog-min-height, 100dvh);
              max-height: var(--ha-dialog-max-height, 100vh);
              max-height: var(--ha-dialog-max-height, 100dvh);
              margin-top: 0;
              margin-bottom: 0;
              /* Use safe area as padding instead of the container size */
              padding-top: var(--safe-area-inset-top);
              padding-bottom: var(--safe-area-inset-bottom);
              padding-left: var(--safe-area-inset-left);
              padding-right: var(--safe-area-inset-right);
              /* Reset the transform to center the dialog */
              transform: none;
            }
          }
        }

        .header-title-container {
          display: flex;
          align-items: center;
        }

        .header-title {
          margin: 0;
          margin-bottom: 0;
          color: var(--ha-dialog-header-title-color, var(--primary-text-color));
          font-size: var(
            --ha-dialog-header-title-font-size,
            var(--ha-font-size-2xl)
          );
          line-height: var(
            --ha-dialog-header-title-line-height,
            var(--ha-line-height-condensed)
          );
          font-weight: var(
            --ha-dialog-header-title-font-weight,
            var(--ha-font-weight-normal)
          );
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: var(--ha-space-3);
        }

        wa-dialog::part(body) {
          padding: 0;
          display: flex;
          flex-direction: column;
          max-width: 100%;
          overflow: hidden;
        }

        .content-wrapper {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .body {
          position: var(--dialog-content-position, relative);
          padding: var(
            --dialog-content-padding,
            0 var(--ha-space-6) var(--ha-space-6) var(--ha-space-6)
          );
          overflow: auto;
          flex-grow: 1;
        }
        :host([flexcontent]) .body {
          max-width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        wa-dialog::part(footer) {
          padding: 0;
        }

        ::slotted([slot="footer"]) {
          display: flex;
          padding: var(--ha-space-3) var(--ha-space-4) var(--ha-space-4)
            var(--ha-space-4);
          gap: var(--ha-space-3);
          justify-content: flex-end;
          align-items: center;
          width: 100%;
        }
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],C.prototype,"hass",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],C.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],C.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],C.prototype,"open",void 0),(0,i.Cg)([(0,r.MZ)({reflect:!0})],C.prototype,"type",void 0),(0,i.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],C.prototype,"width",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],C.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-title"})],C.prototype,"headerTitle",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],C.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],C.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],C.prototype,"flexContent",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],C.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,r.wk)()],C.prototype,"_open",void 0),(0,i.Cg)([(0,r.P)(".body")],C.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,r.wk)()],C.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,r.Ls)({passive:!0})],C.prototype,"_handleBodyScroll",null),C=(0,i.Cg)([(0,r.EM)("ha-wa-dialog")],C),t()}catch(c){t(c)}})},44244:function(e,t,a){a.a(e,async function(e,i){try{a.r(t);a(3362),a(62953);var o=a(40445),s=a(96196),r=a(77845),l=a(1087),n=(a(38962),a(18350)),d=(a(93444),a(45331)),h=(a(71418),a(31420)),p=a(14503),c=a(63993),g=e([n,d,h,c]);[n,d,h,c]=g.then?(await g)():g;let u,v,y,f,w=e=>e;class m extends s.WF{showDialog(e){this._open=!0,this._params=e}closeDialog(){return this._open=!1,!0}_dialogClosed(){this._open&&(0,l.r)(this,"dialog-closed",{dialog:this.localName}),this._open=!1,this._params=void 0,this._encryptionKey="",this._error=""}render(){return this._params?(0,s.qy)(u||(u=w` <ha-wa-dialog .hass="${0}" .open="${0}" header-title="${0}" prevent-scrim-close @closed="${0}"> <p> ${0} </p> <p> ${0} </p> <ha-password-field .label="${0}" @input="${0}"></ha-password-field> ${0} <ha-dialog-footer slot="footer"> <ha-button slot="secondaryAction" appearance="plain" @click="${0}"> ${0} </ha-button> <ha-button slot="primaryAction" @click="${0}"> ${0} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `),this.hass,this._open,this.hass.localize("ui.panel.config.backup.dialogs.download.title"),this._dialogClosed,this.hass.localize("ui.panel.config.backup.dialogs.download.description"),this.hass.localize("ui.panel.config.backup.dialogs.download.download_backup_encrypted",{download_it_encrypted:(0,s.qy)(v||(v=w`<button class="link" @click="${0}"> ${0} </button>`),this._downloadEncrypted,this.hass.localize("ui.panel.config.backup.dialogs.download.download_it_encrypted"))}),this.hass.localize("ui.panel.config.backup.dialogs.download.encryption_key"),this._keyChanged,this._error?(0,s.qy)(y||(y=w`<ha-alert alert-type="error">${0}</ha-alert>`),this._error):s.s6,this._cancel,this.hass.localize("ui.common.cancel"),this._submit,this.hass.localize("ui.panel.config.backup.dialogs.download.download")):s.s6}_cancel(){this.closeDialog()}async _submit(){if(""!==this._encryptionKey)try{await(0,h.Zm)(this.hass,this._params.backup.backup_id,this._agentId,this._encryptionKey),(0,c.s)(this.hass,this._params.backup.backup_id,this._agentId,this._encryptionKey),this.closeDialog()}catch(e){"password_incorrect"===(null==e?void 0:e.code)?this._error=this.hass.localize("ui.panel.config.backup.dialogs.download.incorrect_encryption_key"):"decrypt_not_supported"===(null==e?void 0:e.code)?this._error=this.hass.localize("ui.panel.config.backup.dialogs.download.decryption_not_supported"):alert(e.message)}}_keyChanged(e){this._encryptionKey=e.currentTarget.value,this._error=""}get _agentId(){var e;return null!==(e=this._params)&&void 0!==e&&e.agentId?this._params.agentId:(0,h.EB)(Object.keys(this._params.backup.agents))}async _downloadEncrypted(){(0,c.s)(this.hass,this._params.backup.backup_id,this._agentId),this.closeDialog()}static get styles(){return[p.RF,p.nA,(0,s.AH)(f||(f=w`ha-wa-dialog{--dialog-content-padding:var(--ha-space-2) var(--ha-space-6)}button.link{background:0 0;border:none;padding:0;font-size:var(--ha-font-size-m);color:var(--primary-color);text-decoration:underline;cursor:pointer}`))]}constructor(...e){super(...e),this._open=!1,this._encryptionKey="",this._error=""}}(0,o.Cg)([(0,r.MZ)({attribute:!1})],m.prototype,"hass",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_open",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_params",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_encryptionKey",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_error",void 0),m=(0,o.Cg)([(0,r.EM)("ha-dialog-download-decrypted-backup")],m),i()}catch(u){i(u)}})},99793:function(e,t,a){var i=a(96196);let o;t.A=(0,i.AH)(o||(o=(e=>e)`:host{--width:31rem;--spacing:var(--wa-space-l);--show-duration:200ms;--hide-duration:200ms;display:none}:host([open]){display:block}.dialog{display:flex;flex-direction:column;top:0;right:0;bottom:0;left:0;width:var(--width);max-width:calc(100% - var(--wa-space-2xl));max-height:calc(100% - var(--wa-space-2xl));background-color:var(--wa-color-surface-raised);border-radius:var(--wa-panel-border-radius);border:none;box-shadow:var(--wa-shadow-l);padding:0;margin:auto}.dialog.show{animation:show-dialog var(--show-duration) ease}.dialog.show::backdrop{animation:show-backdrop var(--show-duration,200ms) ease}.dialog.hide{animation:show-dialog var(--hide-duration) ease reverse}.dialog.hide::backdrop{animation:show-backdrop var(--hide-duration,200ms) ease reverse}.dialog.pulse{animation:pulse 250ms ease}.dialog:focus{outline:0}@media screen and (max-width:420px){.dialog{max-height:80vh}}.open{display:flex;opacity:1}.header{flex:0 0 auto;display:flex;flex-wrap:nowrap;padding-inline-start:var(--spacing);padding-block-end:0;padding-inline-end:calc(var(--spacing) - var(--wa-form-control-padding-block));padding-block-start:calc(var(--spacing) - var(--wa-form-control-padding-block))}.title{align-self:center;flex:1 1 auto;font-family:inherit;font-size:var(--wa-font-size-l);font-weight:var(--wa-font-weight-heading);line-height:var(--wa-line-height-condensed);margin:0}.header-actions{align-self:start;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:end;gap:var(--wa-space-2xs);padding-inline-start:var(--spacing)}.header-actions ::slotted(wa-button),.header-actions wa-button{flex:0 0 auto;display:flex;align-items:center}.body{flex:1 1 auto;display:block;padding:var(--spacing);overflow:auto;-webkit-overflow-scrolling:touch}.body:focus{outline:0}.body:focus-visible{outline:var(--wa-focus-ring);outline-offset:var(--wa-focus-ring-offset)}.footer{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:var(--wa-space-xs);justify-content:end;padding:var(--spacing);padding-block-start:0}.footer ::slotted(wa-button:not(:first-of-type)){margin-inline-start:var(--wa-spacing-xs)}.dialog::backdrop{background-color:var(--wa-color-overlay-modal,rgb(0 0 0 / .25))}@keyframes pulse{0%{scale:1}50%{scale:1.02}100%{scale:1}}@keyframes show-dialog{from{opacity:0;scale:0.8}to{opacity:1;scale:1}}@keyframes show-backdrop{from{opacity:0}to{opacity:1}}@media (forced-colors:active){.dialog{border:solid 1px #fff}}`))},93900:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(27495),a(62953);var i=a(96196),o=a(77845),s=a(94333),r=a(32288),l=a(17051),n=a(42462),d=a(28438),h=a(98779),p=a(27259),c=a(31247),g=a(93949),u=a(92070),v=a(9395),y=a(32510),f=a(17060),w=a(88496),m=a(99793),b=e([w,f]);[w,f]=b.then?(await b)():b;let k,$,M,Z=e=>e;var C=Object.defineProperty,_=Object.getOwnPropertyDescriptor,x=(e,t,a,i)=>{for(var o,s=i>1?void 0:i?_(t,a):t,r=e.length-1;r>=0;r--)(o=e[r])&&(s=(i?o(t,a,s):o(s))||s);return i&&s&&C(t,a,s),s};let L=class extends y.A{firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),(0,g.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,g.I7)(this),this.removeOpenListeners()}async requestClose(e){const t=new d.L({source:e});if(this.dispatchEvent(t),t.defaultPrevented)return this.open=!0,void(0,p.Ud)(this.dialog,"pulse");this.removeOpenListeners(),await(0,p.Ud)(this.dialog,"hide"),this.open=!1,this.dialog.close(),(0,g.I7)(this);const a=this.originalTrigger;"function"==typeof(null==a?void 0:a.focus)&&setTimeout(()=>a.focus()),this.dispatchEvent(new l.Z)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(e){e.preventDefault(),this.dialog.classList.contains("hide")||e.target!==this.dialog||this.requestClose(this.dialog)}handleDialogClick(e){const t=e.target.closest('[data-dialog="close"]');t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await(0,p.Ud)(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const e=new h.k;this.dispatchEvent(e),e.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),(0,g.JG)(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&"function"==typeof e.focus?e.focus():this.dialog.focus()}),await(0,p.Ud)(this.dialog,"show"),this.dispatchEvent(new n.q))}render(){var e;const t=!this.withoutHeader,a=this.hasSlotController.test("footer");return(0,i.qy)(k||(k=Z` <dialog aria-labelledby="${0}" aria-describedby="${0}" part="dialog" class="${0}" @cancel="${0}" @click="${0}" @pointerdown="${0}"> ${0} <div part="body" class="body"><slot></slot></div> ${0} </dialog> `),null!==(e=this.ariaLabelledby)&&void 0!==e?e:"title",(0,r.J)(this.ariaDescribedby),(0,s.H)({dialog:!0,open:this.open}),this.handleDialogCancel,this.handleDialogClick,this.handleDialogPointerDown,t?(0,i.qy)($||($=Z` <header part="header" class="header"> <h2 part="title" class="title" id="title"> <slot name="label"> ${0} </slot> </h2> <div part="header-actions" class="header-actions"> <slot name="header-actions"></slot> <wa-button part="close-button" exportparts="base:close-button__base" class="close" appearance="plain" @click="${0}"> <wa-icon name="xmark" label="${0}" library="system" variant="solid"></wa-icon> </wa-button> </div> </header> `),this.label.length>0?this.label:String.fromCharCode(8203),e=>this.requestClose(e.target),this.localize.term("close")):"",a?(0,i.qy)(M||(M=Z` <footer part="footer" class="footer"> <slot name="footer"></slot> </footer> `)):"")}constructor(){super(...arguments),this.localize=new f.c(this),this.hasSlotController=new u.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}};L.css=m.A,x([(0,o.P)(".dialog")],L.prototype,"dialog",2),x([(0,o.MZ)({type:Boolean,reflect:!0})],L.prototype,"open",2),x([(0,o.MZ)({reflect:!0})],L.prototype,"label",2),x([(0,o.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],L.prototype,"withoutHeader",2),x([(0,o.MZ)({attribute:"light-dismiss",type:Boolean})],L.prototype,"lightDismiss",2),x([(0,o.MZ)({attribute:"aria-labelledby"})],L.prototype,"ariaLabelledby",2),x([(0,o.MZ)({attribute:"aria-describedby"})],L.prototype,"ariaDescribedby",2),x([(0,v.w)("open",{waitUntilFirstUpdate:!0})],L.prototype,"handleOpenChange",1),L=x([(0,o.EM)("wa-dialog")],L),document.addEventListener("click",e=>{const t=e.target.closest("[data-dialog]");if(t instanceof Element){const[e,a]=(0,c.v)(t.getAttribute("data-dialog")||"");if("open"===e&&null!=a&&a.length){const e=t.getRootNode().getElementById(a);"wa-dialog"===(null==e?void 0:e.localName)?e.open=!0:console.warn(`A dialog with an ID of "${a}" could not be found in this document.`)}}}),i.S$||document.addEventListener("pointerdown",()=>{}),t()}catch(k){t(k)}})}}]);
//# sourceMappingURL=81493.3aaf5d517d2cba80.js.map