"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["84175"],{93444:function(e,t,a){var o=a(40445),i=a(96196),s=a(77845);let r,l,n=e=>e;class d extends i.WF{render(){return(0,i.qy)(r||(r=n` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,i.AH)(l||(l=n`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}d=(0,o.Cg)([(0,s.EM)("ha-dialog-footer")],d)},45100:function(e,t,a){a.r(t),a.d(t,{HaIconButtonPrev:function(){return d}});a(62953);var o=a(40445),i=a(96196),s=a(77845),r=a(63091);a(26300);let l,n=e=>e;class d extends i.WF{render(){var e;return(0,i.qy)(l||(l=n` <ha-icon-button .disabled="${0}" .label="${0}" .path="${0}"></ha-icon-button> `),this.disabled,this.label||(null===(e=this.hass)||void 0===e?void 0:e.localize("ui.common.back"))||"Back",this._icon)}constructor(...e){super(...e),this.disabled=!1,this._icon="rtl"===r.G.document.dir?"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z":"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"}}(0,o.Cg)([(0,s.MZ)({attribute:!1})],d.prototype,"hass",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean})],d.prototype,"disabled",void 0),(0,o.Cg)([(0,s.MZ)()],d.prototype,"label",void 0),(0,o.Cg)([(0,s.wk)()],d.prototype,"_icon",void 0),d=(0,o.Cg)([(0,s.EM)("ha-icon-button-prev")],d)},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var o=a(40445),i=a(93900),s=a(96196),r=a(77845),l=a(32288),n=a(1087),d=a(59992),h=a(14503),c=(a(76538),a(26300),e([i,d]));[i,d]=c.then?(await c)():c;let p,g,u,f,v,w,m,y=e=>e;const b="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class x extends((0,d.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,s.qy)(p||(p=y` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,l.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?s.s6:(0,s.qy)(g||(g=y` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",b,void 0!==this.headerTitle?(0,s.qy)(u||(u=y`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,s.qy)(f||(f=y`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,s.qy)(v||(v=y`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,s.qy)(w||(w=y`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,s.AH)(m||(m=y`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,o.Cg)([(0,r.MZ)({attribute:!1})],x.prototype,"hass",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],x.prototype,"ariaLabelledBy",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],x.prototype,"ariaDescribedBy",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],x.prototype,"open",void 0),(0,o.Cg)([(0,r.MZ)({reflect:!0})],x.prototype,"type",void 0),(0,o.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],x.prototype,"width",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],x.prototype,"preventScrimClose",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"header-title"})],x.prototype,"headerTitle",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],x.prototype,"headerSubtitle",void 0),(0,o.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],x.prototype,"headerSubtitlePosition",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],x.prototype,"flexContent",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],x.prototype,"withoutHeader",void 0),(0,o.Cg)([(0,r.wk)()],x.prototype,"_open",void 0),(0,o.Cg)([(0,r.P)(".body")],x.prototype,"bodyContainer",void 0),(0,o.Cg)([(0,r.wk)()],x.prototype,"_bodyScrolled",void 0),(0,o.Cg)([(0,r.Ls)({passive:!0})],x.prototype,"_handleBodyScroll",null),x=(0,o.Cg)([(0,r.EM)("ha-wa-dialog")],x),t()}catch(p){t(p)}})},55218:function(e,t,a){a.a(e,async function(e,o){try{a.r(t);a(3362),a(62953);var i=a(40445),s=a(96196),r=a(77845),l=a(1087),n=a(63130),d=a(18350),h=(a(93444),a(26300),a(45100),a(45331)),c=(a(17308),a(2846),a(71418),a(31420)),p=a(14503),g=a(81619),u=e([d,h,c]);[d,h,c]=u.then?(await u)():u;let f,v,w=e=>e;const m="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",y="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z",b="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z";class x extends s.WF{showDialog(e){this._params=e,this._open=!0}closeDialog(){return this._open&&(0,l.r)(this,"dialog-closed",{dialog:this.localName}),this._open=!1,this._params=void 0,!0}render(){var e;return this._params?(0,s.qy)(f||(f=w` <ha-wa-dialog .hass="${0}" .open="${0}" header-title="${0}" prevent-scrim-close @closed="${0}"> <ha-icon-button slot="headerNavigationIcon" data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> <p> ${0} </p> <div class="encryption-key"> <p>${0}</p> <ha-icon-button .path="${0}" @click="${0}"></ha-icon-button> </div> <ha-md-list> <ha-md-list-item> <span slot="headline"> ${0} </span> <span slot="supporting-text"> ${0} </span> <ha-button slot="end" @click="${0}"> <ha-svg-icon .path="${0}" slot="start"></ha-svg-icon> ${0} </ha-button> </ha-md-list-item> </ha-md-list> <ha-dialog-footer slot="footer"> <ha-button slot="primaryAction" @click="${0}"> ${0} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `),this.hass,this._open,this.hass.localize("ui.panel.config.backup.dialogs.show_encryption_key.title"),this.closeDialog,this.hass.localize("ui.common.close"),m,this.hass.localize("ui.panel.config.backup.dialogs.show_encryption_key.description"),null===(e=this._params)||void 0===e?void 0:e.currentKey,y,this._copyKeyToClipboard,this.hass.localize("ui.panel.config.backup.encryption_key.download_emergency_kit"),this.hass.localize("ui.panel.config.backup.encryption_key.download_emergency_kit_description"),this._download,b,this.hass.localize("ui.panel.config.backup.encryption_key.download_emergency_kit_action"),this.closeDialog,this.hass.localize("ui.common.close")):s.s6}async _copyKeyToClipboard(){var e,t;null!==(e=this._params)&&void 0!==e&&e.currentKey&&(await(0,n.l)(null===(t=this._params)||void 0===t?void 0:t.currentKey,this.renderRoot.querySelector("div")),(0,g.P)(this,{message:this.hass.localize("ui.common.copied_clipboard")}))}_download(){var e;null!==(e=this._params)&&void 0!==e&&e.currentKey&&(0,c.Sx)(this.hass,this._params.currentKey,"old")}static get styles(){return[p.RF,p.nA,(0,s.AH)(v||(v=w`ha-wa-dialog{--dialog-content-padding:var(--ha-space-2) var(--ha-space-6)}ha-md-list{background:0 0;--md-list-item-leading-space:0;--md-list-item-trailing-space:0}.encryption-key{border:1px solid var(--divider-color);background-color:var(--primary-background-color);border-radius:var(--ha-border-radius-md);padding:16px;display:flex;flex-direction:row;align-items:center;gap:var(--ha-space-6)}.encryption-key p{margin:0;flex:1;font-size:var(--ha-font-size-xl);font-family:var(--ha-font-family-code);font-style:normal;font-weight:var(--ha-font-weight-normal);line-height:var(--ha-line-height-condensed);text-align:center}.encryption-key ha-icon-button{flex:none;margin:-16px}p{margin-top:0}`))]}constructor(...e){super(...e),this._open=!1}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],x.prototype,"hass",void 0),(0,i.Cg)([(0,r.wk)()],x.prototype,"_open",void 0),(0,i.Cg)([(0,r.wk)()],x.prototype,"_params",void 0),x=(0,i.Cg)([(0,r.EM)("ha-dialog-show-backup-encryption-key")],x),o()}catch(f){o(f)}})},99793:function(e,t,a){var o=a(96196);let i;t.A=(0,o.AH)(i||(i=(e=>e)`:host{--width:31rem;--spacing:var(--wa-space-l);--show-duration:200ms;--hide-duration:200ms;display:none}:host([open]){display:block}.dialog{display:flex;flex-direction:column;top:0;right:0;bottom:0;left:0;width:var(--width);max-width:calc(100% - var(--wa-space-2xl));max-height:calc(100% - var(--wa-space-2xl));background-color:var(--wa-color-surface-raised);border-radius:var(--wa-panel-border-radius);border:none;box-shadow:var(--wa-shadow-l);padding:0;margin:auto}.dialog.show{animation:show-dialog var(--show-duration) ease}.dialog.show::backdrop{animation:show-backdrop var(--show-duration,200ms) ease}.dialog.hide{animation:show-dialog var(--hide-duration) ease reverse}.dialog.hide::backdrop{animation:show-backdrop var(--hide-duration,200ms) ease reverse}.dialog.pulse{animation:pulse 250ms ease}.dialog:focus{outline:0}@media screen and (max-width:420px){.dialog{max-height:80vh}}.open{display:flex;opacity:1}.header{flex:0 0 auto;display:flex;flex-wrap:nowrap;padding-inline-start:var(--spacing);padding-block-end:0;padding-inline-end:calc(var(--spacing) - var(--wa-form-control-padding-block));padding-block-start:calc(var(--spacing) - var(--wa-form-control-padding-block))}.title{align-self:center;flex:1 1 auto;font-family:inherit;font-size:var(--wa-font-size-l);font-weight:var(--wa-font-weight-heading);line-height:var(--wa-line-height-condensed);margin:0}.header-actions{align-self:start;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:end;gap:var(--wa-space-2xs);padding-inline-start:var(--spacing)}.header-actions ::slotted(wa-button),.header-actions wa-button{flex:0 0 auto;display:flex;align-items:center}.body{flex:1 1 auto;display:block;padding:var(--spacing);overflow:auto;-webkit-overflow-scrolling:touch}.body:focus{outline:0}.body:focus-visible{outline:var(--wa-focus-ring);outline-offset:var(--wa-focus-ring-offset)}.footer{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:var(--wa-space-xs);justify-content:end;padding:var(--spacing);padding-block-start:0}.footer ::slotted(wa-button:not(:first-of-type)){margin-inline-start:var(--wa-spacing-xs)}.dialog::backdrop{background-color:var(--wa-color-overlay-modal,rgb(0 0 0 / .25))}@keyframes pulse{0%{scale:1}50%{scale:1.02}100%{scale:1}}@keyframes show-dialog{from{opacity:0;scale:0.8}to{opacity:1;scale:1}}@keyframes show-backdrop{from{opacity:0}to{opacity:1}}@media (forced-colors:active){.dialog{border:solid 1px #fff}}`))},93900:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(27495),a(62953);var o=a(96196),i=a(77845),s=a(94333),r=a(32288),l=a(17051),n=a(42462),d=a(28438),h=a(98779),c=a(27259),p=a(31247),g=a(93949),u=a(92070),f=a(9395),v=a(32510),w=a(17060),m=a(88496),y=a(99793),b=e([m,w]);[m,w]=b.then?(await b)():b;let C,L,$,M=e=>e;var x=Object.defineProperty,k=Object.getOwnPropertyDescriptor,_=(e,t,a,o)=>{for(var i,s=o>1?void 0:o?k(t,a):t,r=e.length-1;r>=0;r--)(i=e[r])&&(s=(o?i(t,a,s):i(s))||s);return o&&s&&x(t,a,s),s};let D=class extends v.A{firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),(0,g.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,g.I7)(this),this.removeOpenListeners()}async requestClose(e){const t=new d.L({source:e});if(this.dispatchEvent(t),t.defaultPrevented)return this.open=!0,void(0,c.Ud)(this.dialog,"pulse");this.removeOpenListeners(),await(0,c.Ud)(this.dialog,"hide"),this.open=!1,this.dialog.close(),(0,g.I7)(this);const a=this.originalTrigger;"function"==typeof(null==a?void 0:a.focus)&&setTimeout(()=>a.focus()),this.dispatchEvent(new l.Z)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(e){e.preventDefault(),this.dialog.classList.contains("hide")||e.target!==this.dialog||this.requestClose(this.dialog)}handleDialogClick(e){const t=e.target.closest('[data-dialog="close"]');t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await(0,c.Ud)(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const e=new h.k;this.dispatchEvent(e),e.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),(0,g.JG)(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&"function"==typeof e.focus?e.focus():this.dialog.focus()}),await(0,c.Ud)(this.dialog,"show"),this.dispatchEvent(new n.q))}render(){var e;const t=!this.withoutHeader,a=this.hasSlotController.test("footer");return(0,o.qy)(C||(C=M` <dialog aria-labelledby="${0}" aria-describedby="${0}" part="dialog" class="${0}" @cancel="${0}" @click="${0}" @pointerdown="${0}"> ${0} <div part="body" class="body"><slot></slot></div> ${0} </dialog> `),null!==(e=this.ariaLabelledby)&&void 0!==e?e:"title",(0,r.J)(this.ariaDescribedby),(0,s.H)({dialog:!0,open:this.open}),this.handleDialogCancel,this.handleDialogClick,this.handleDialogPointerDown,t?(0,o.qy)(L||(L=M` <header part="header" class="header"> <h2 part="title" class="title" id="title"> <slot name="label"> ${0} </slot> </h2> <div part="header-actions" class="header-actions"> <slot name="header-actions"></slot> <wa-button part="close-button" exportparts="base:close-button__base" class="close" appearance="plain" @click="${0}"> <wa-icon name="xmark" label="${0}" library="system" variant="solid"></wa-icon> </wa-button> </div> </header> `),this.label.length>0?this.label:String.fromCharCode(8203),e=>this.requestClose(e.target),this.localize.term("close")):"",a?(0,o.qy)($||($=M` <footer part="footer" class="footer"> <slot name="footer"></slot> </footer> `)):"")}constructor(){super(...arguments),this.localize=new w.c(this),this.hasSlotController=new u.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}};D.css=y.A,_([(0,i.P)(".dialog")],D.prototype,"dialog",2),_([(0,i.MZ)({type:Boolean,reflect:!0})],D.prototype,"open",2),_([(0,i.MZ)({reflect:!0})],D.prototype,"label",2),_([(0,i.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],D.prototype,"withoutHeader",2),_([(0,i.MZ)({attribute:"light-dismiss",type:Boolean})],D.prototype,"lightDismiss",2),_([(0,i.MZ)({attribute:"aria-labelledby"})],D.prototype,"ariaLabelledby",2),_([(0,i.MZ)({attribute:"aria-describedby"})],D.prototype,"ariaDescribedby",2),_([(0,f.w)("open",{waitUntilFirstUpdate:!0})],D.prototype,"handleOpenChange",1),D=_([(0,i.EM)("wa-dialog")],D),document.addEventListener("click",e=>{const t=e.target.closest("[data-dialog]");if(t instanceof Element){const[e,a]=(0,p.v)(t.getAttribute("data-dialog")||"");if("open"===e&&null!=a&&a.length){const e=t.getRootNode().getElementById(a);"wa-dialog"===(null==e?void 0:e.localName)?e.open=!0:console.warn(`A dialog with an ID of "${a}" could not be found in this document.`)}}}),o.S$||document.addEventListener("pointerdown",()=>{}),t()}catch(C){t(C)}})}}]);
//# sourceMappingURL=84175.1a1aa1e26fc665c7.js.map