"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["56060"],{38962:function(e,t,a){a.r(t);a(62953);var i=a(40445),o=a(96196),r=a(77845),s=a(94333),l=a(1087);a(26300),a(67094);let n,d,h,c,p=e=>e;const u={info:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",warning:"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",error:"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",success:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"};class g extends o.WF{render(){return(0,o.qy)(n||(n=p` <div class="issue-type ${0}" role="alert"> <div class="icon ${0}"> <slot name="icon"> <ha-svg-icon .path="${0}"></ha-svg-icon> </slot> </div> <div class="${0}"> <div class="main-content"> ${0} <slot></slot> </div> <div class="action"> <slot name="action"> ${0} </slot> </div> </div> </div> `),(0,s.H)({[this.alertType]:!0}),this.title?"":"no-title",u[this.alertType],(0,s.H)({content:!0,narrow:this.narrow}),this.title?(0,o.qy)(d||(d=p`<div class="title">${0}</div>`),this.title):o.s6,this.dismissable?(0,o.qy)(h||(h=p`<ha-icon-button @click="${0}" label="Dismiss alert" .path="${0}"></ha-icon-button>`),this._dismissClicked,"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"):o.s6)}_dismissClicked(){(0,l.r)(this,"alert-dismissed-clicked")}constructor(...e){super(...e),this.title="",this.alertType="info",this.dismissable=!1,this.narrow=!1}}g.styles=(0,o.AH)(c||(c=p`.issue-type{position:relative;padding:8px;display:flex}.icon{height:var(--ha-alert-icon-size,24px);width:var(--ha-alert-icon-size,24px)}.issue-type::after{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.12;pointer-events:none;content:"";border-radius:var(--ha-border-radius-sm)}.icon.no-title{align-self:center}.content{display:flex;justify-content:space-between;align-items:center;width:100%;text-align:var(--float-start)}.content.narrow{flex-direction:column;align-items:flex-end}.action{z-index:1;width:min-content;--mdc-theme-primary:var(--primary-text-color)}.main-content{overflow-wrap:anywhere;word-break:break-word;line-height:normal;margin-left:8px;margin-right:0;margin-inline-start:8px;margin-inline-end:8px}.title{margin-top:2px;font-weight:var(--ha-font-weight-bold)}.action ha-icon-button{--mdc-theme-primary:var(--primary-text-color);--mdc-icon-button-size:36px}.issue-type.info>.icon{color:var(--info-color)}.issue-type.info::after{background-color:var(--info-color)}.issue-type.warning>.icon{color:var(--warning-color)}.issue-type.warning::after{background-color:var(--warning-color)}.issue-type.error>.icon{color:var(--error-color)}.issue-type.error::after{background-color:var(--error-color)}.issue-type.success>.icon{color:var(--success-color)}.issue-type.success::after{background-color:var(--success-color)}:host ::slotted(ul){margin:0;padding-inline-start:20px}`)),(0,i.Cg)([(0,r.MZ)()],g.prototype,"title",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"alert-type"})],g.prototype,"alertType",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],g.prototype,"dismissable",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],g.prototype,"narrow",void 0),g=(0,i.Cg)([(0,r.EM)("ha-alert")],g)},76538:function(e,t,a){a(62953);var i=a(40445),o=a(96196),r=a(77845);let s,l,n,d,h,c,p=e=>e;class u extends o.WF{render(){const e=(0,o.qy)(s||(s=p`<div class="header-title"> <slot name="title"></slot> </div>`)),t=(0,o.qy)(l||(l=p`<div class="header-subtitle"> <slot name="subtitle"></slot> </div>`));return(0,o.qy)(n||(n=p` <header class="header"> <div class="header-bar"> <section class="header-navigation-icon"> <slot name="navigationIcon"></slot> </section> <section class="header-content"> ${0} </section> <section class="header-action-items"> <slot name="actionItems"></slot> </section> </div> <slot></slot> </header> `),"above"===this.subtitlePosition?(0,o.qy)(d||(d=p`${0}${0}`),t,e):(0,o.qy)(h||(h=p`${0}${0}`),e,t))}static get styles(){return[(0,o.AH)(c||(c=p`:host{display:block}:host([show-border]){border-bottom:1px solid var(--mdc-dialog-scroll-divider-color,rgba(0,0,0,.12))}.header-bar{display:flex;flex-direction:row;align-items:center;padding:0 var(--ha-space-1);box-sizing:border-box}.header-content{flex:1;padding:10px var(--ha-space-1);display:flex;flex-direction:column;justify-content:center;min-height:var(--ha-space-12);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.header-title{height:var(--ha-dialog-header-title-height,calc(var(--ha-font-size-xl) + var(--ha-space-1)));font-size:var(--ha-font-size-xl);line-height:var(--ha-line-height-condensed);font-weight:var(--ha-font-weight-medium);color:var(--ha-dialog-header-title-color,var(--primary-text-color))}.header-subtitle{font-size:var(--ha-font-size-m);line-height:var(--ha-line-height-normal);color:var(--ha-dialog-header-subtitle-color,var(--secondary-text-color))}@media all and (min-width:450px) and (min-height:500px){.header-bar{padding:0 var(--ha-space-2)}}.header-navigation-icon{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}.header-action-items{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}`))]}constructor(...e){super(...e),this.subtitlePosition="below",this.showBorder=!1}}(0,i.Cg)([(0,r.MZ)({type:String,attribute:"subtitle-position"})],u.prototype,"subtitlePosition",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"show-border"})],u.prototype,"showBorder",void 0),u=(0,i.Cg)([(0,r.EM)("ha-dialog-header")],u)},65829:function(e,t,a){a.a(e,async function(e,i){try{a.r(t),a.d(t,{HaSpinner:function(){return c}});var o=a(40445),r=a(55262),s=a(96196),l=a(77845),n=e([r]);r=(n.then?(await n)():n)[0];let d,h=e=>e;class c extends r.A{updated(e){if(super.updated(e),e.has("size"))switch(this.size){case"tiny":this.style.setProperty("--ha-spinner-size","16px");break;case"small":this.style.setProperty("--ha-spinner-size","28px");break;case"medium":this.style.setProperty("--ha-spinner-size","48px");break;case"large":this.style.setProperty("--ha-spinner-size","68px");break;case void 0:this.style.removeProperty("--ha-progress-ring-size")}}static get styles(){return[r.A.styles,(0,s.AH)(d||(d=h`:host{--indicator-color:var(
            --ha-spinner-indicator-color,
            var(--primary-color)
          );--track-color:var(--ha-spinner-divider-color, var(--divider-color));--track-width:4px;--speed:3.5s;font-size:var(--ha-spinner-size, 48px)}`))]}}(0,o.Cg)([(0,l.MZ)()],c.prototype,"size",void 0),c=(0,o.Cg)([(0,l.EM)("ha-spinner")],c),i()}catch(d){i(d)}})},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var i=a(40445),o=a(93900),r=a(96196),s=a(77845),l=a(32288),n=a(1087),d=a(59992),h=a(14503),c=(a(76538),a(26300),e([o,d]));[o,d]=c.then?(await c)():c;let p,u,g,v,b,f,m,y=e=>e;const w="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class _ extends((0,d.V)(r.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,r.qy)(p||(p=y` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,l.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?r.s6:(0,r.qy)(u||(u=y` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",w,void 0!==this.headerTitle?(0,r.qy)(g||(g=y`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,r.qy)(v||(v=y`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,r.qy)(b||(b=y`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,r.qy)(f||(f=y`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,r.AH)(m||(m=y`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,i.Cg)([(0,s.MZ)({attribute:!1})],_.prototype,"hass",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"aria-labelledby"})],_.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"aria-describedby"})],_.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,reflect:!0})],_.prototype,"open",void 0),(0,i.Cg)([(0,s.MZ)({reflect:!0})],_.prototype,"type",void 0),(0,i.Cg)([(0,s.MZ)({type:String,reflect:!0,attribute:"width"})],_.prototype,"width",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],_.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"header-title"})],_.prototype,"headerTitle",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"header-subtitle"})],_.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,s.MZ)({type:String,attribute:"header-subtitle-position"})],_.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],_.prototype,"flexContent",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,attribute:"without-header"})],_.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,s.wk)()],_.prototype,"_open",void 0),(0,i.Cg)([(0,s.P)(".body")],_.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,s.wk)()],_.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,s.Ls)({passive:!0})],_.prototype,"_handleBodyScroll",null),_=(0,i.Cg)([(0,s.EM)("ha-wa-dialog")],_),t()}catch(p){t(p)}})},30884:function(e,t,a){a.d(t,{A:function(){return i},K:function(){return o}});const i=(e,t,a)=>e.connection.subscribeMessage(t,{type:"backup/subscribe_events"},{preCheck:a}),o={manager_state:"idle"}},25069:function(e,t,a){a.a(e,async function(e,i){try{a.r(t);a(3362),a(62953);var o=a(40445),r=a(96196),s=a(77845),l=a(1087),n=(a(38962),a(45331)),d=a(65829),h=a(30884),c=a(14503),p=e([n,d]);[n,d]=p.then?(await p)():p;let u,g,v,b,f=e=>e;class m extends r.WF{async showDialog(e){this._open=!0,this._loadBackupState(),this._title=e.title,this._backupState=e.initialBackupState,this._actionOnIdle=e.action}closeDialog(){this._open=!1}_dialogClosed(){this._backupEventsSubscription&&(this._backupEventsSubscription.then(e=>{e()}),this._backupEventsSubscription=void 0),(0,l.r)(this,"dialog-closed",{dialog:this.localName})}_getWaitMessage(){switch(this._backupState){case"create_backup":return this.hass.localize("ui.dialogs.restart.wait_for_backup");case"receive_backup":return this.hass.localize("ui.dialogs.restart.wait_for_upload");case"restore_backup":return this.hass.localize("ui.dialogs.restart.wait_for_restore");default:return""}}render(){const e=this._getWaitMessage();return(0,r.qy)(u||(u=f` <ha-wa-dialog .hass="${0}" .open="${0}" .headerTitle="${0}" width="medium" @closed="${0}"> <div class="content"> ${0} </div> </ha-wa-dialog> `),this.hass,this._open,this._title,this._dialogClosed,this._error?(0,r.qy)(g||(g=f`<ha-alert alert-type="error">${0}</ha-alert> `),this.hass.localize("ui.dialogs.restart.error_backup_state",{error:this._error})):(0,r.qy)(v||(v=f` <ha-spinner></ha-spinner> ${0} `),e))}async _loadBackupState(){try{this._backupEventsSubscription=(0,h.A)(this.hass,async e=>{var t;(this._backupState=e.manager_state,"idle"===this._backupState)&&(this.closeDialog(),await(null===(t=this._actionOnIdle)||void 0===t?void 0:t.call(this)))})}catch(e){this._error=e.message||e}}static get styles(){return[c.RF,c.nA,(0,r.AH)(b||(b=f`ha-wa-dialog{--dialog-content-padding:0}.content{display:flex;flex-direction:column;align-items:center;padding:24px;gap:32px}`))]}constructor(...e){super(...e),this._open=!1,this._title=""}}(0,o.Cg)([(0,s.MZ)({attribute:!1})],m.prototype,"hass",void 0),(0,o.Cg)([(0,s.wk)()],m.prototype,"_open",void 0),(0,o.Cg)([(0,s.wk)()],m.prototype,"_title",void 0),(0,o.Cg)([(0,s.wk)()],m.prototype,"_error",void 0),(0,o.Cg)([(0,s.wk)()],m.prototype,"_backupState",void 0),m=(0,o.Cg)([(0,s.EM)("dialog-restart-wait")],m),i()}catch(u){i(u)}})},59992:function(e,t,a){a.a(e,async function(e,i){try{a.d(t,{V:function(){return g}});a(62953);var o=a(40445),r=a(88696),s=a(96196),l=a(94333),n=a(77845),d=e([r]);r=(d.then?(await d)():d)[0];let h,c,p=e=>e;const u=e=>void 0===e?[]:Array.isArray(e)?e:[e],g=e=>{class t extends e{get scrollableElement(){return t.DEFAULT_SCROLLABLE_ELEMENT}firstUpdated(e){var t;null===(t=super.firstUpdated)||void 0===t||t.call(this,e),this.scrollableElement&&this._updateScrollableState(this.scrollableElement),this._attachScrollableElement()}updated(e){var t;null===(t=super.updated)||void 0===t||t.call(this,e),this._attachScrollableElement()}disconnectedCallback(){this._detachScrollableElement(),this._contentScrolled=!1,this._contentScrollable=!1,super.disconnectedCallback()}renderScrollableFades(e=!1){return(0,s.qy)(h||(h=p` <div class="${0}"></div> <div class="${0}"></div> `),(0,l.H)({"fade-top":!0,rounded:e,visible:this._contentScrolled}),(0,l.H)({"fade-bottom":!0,rounded:e,visible:this._contentScrollable}))}static get styles(){var e;const t=Object.getPrototypeOf(this);return[...u(null!==(e=null==t?void 0:t.styles)&&void 0!==e?e:[]),(0,s.AH)(c||(c=p`.fade-bottom,.fade-top{position:absolute;left:0;right:0;height:var(--ha-space-2);pointer-events:none;transition:opacity 180ms ease-in-out;border-radius:var(--ha-border-radius-square);opacity:0;background:linear-gradient(to bottom,var(--ha-color-shadow-scrollable-fade),transparent)}.fade-top{top:0}.fade-bottom{bottom:0;transform:rotate(180deg)}.fade-bottom.visible,.fade-top.visible{opacity:1}.fade-bottom.rounded,.fade-top.rounded{border-radius:var(--ha-card-border-radius,var(--ha-border-radius-lg));border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}.fade-top.rounded{border-top-left-radius:var(--ha-border-radius-square);border-top-right-radius:var(--ha-border-radius-square)}.fade-bottom.rounded{border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}`))]}_attachScrollableElement(){const e=this.scrollableElement;e!==this._scrollTarget&&(this._detachScrollableElement(),e&&(this._scrollTarget=e,e.addEventListener("scroll",this._onScroll,{passive:!0}),this._resize.observe(e),this._updateScrollableState(e)))}_detachScrollableElement(){var e,t;this._scrollTarget&&(this._scrollTarget.removeEventListener("scroll",this._onScroll),null===(e=(t=this._resize).unobserve)||void 0===e||e.call(t,this._scrollTarget),this._scrollTarget=void 0)}_updateScrollableState(e){const t=parseFloat(getComputedStyle(e).getPropertyValue("--safe-area-inset-bottom"))||0,{scrollHeight:a=0,clientHeight:i=0,scrollTop:o=0}=e;this._contentScrollable=a-i>o+t+this.scrollFadeSafeAreaPadding}constructor(...e){super(...e),this._contentScrolled=!1,this._contentScrollable=!1,this._onScroll=e=>{var t;const a=e.currentTarget;this._contentScrolled=(null!==(t=a.scrollTop)&&void 0!==t?t:0)>this.scrollFadeThreshold,this._updateScrollableState(a)},this._resize=new r.P(this,{target:null,callback:e=>{var t;const a=null===(t=e[0])||void 0===t?void 0:t.target;a&&this._updateScrollableState(a)}}),this.scrollFadeSafeAreaPadding=4,this.scrollFadeThreshold=4}}return t.DEFAULT_SCROLLABLE_ELEMENT=null,(0,o.Cg)([(0,n.wk)()],t.prototype,"_contentScrolled",void 0),(0,o.Cg)([(0,n.wk)()],t.prototype,"_contentScrollable",void 0),t};i()}catch(h){i(h)}})},69235:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);"function"!=typeof window.ResizeObserver&&(window.ResizeObserver=(await a.e("71055").then(a.bind(a,52370))).default),t()}catch(i){t(i)}},1)}}]);
//# sourceMappingURL=56060.84f4727597345c89.js.map