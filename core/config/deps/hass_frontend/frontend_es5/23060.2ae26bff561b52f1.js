"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["23060"],{45331:function(e,a,t){t.a(e,async function(e,a){try{t(3362),t(62953);var i=t(40445),o=t(93900),s=t(96196),l=t(77845),r=t(32288),n=t(1087),d=t(59992),h=t(14503),c=(t(76538),t(26300),e([o,d]));[o,d]=c.then?(await c)():c;let p,g,u,f,w,v,m,b=e=>e;const y="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class x extends((0,d.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,a;return(0,s.qy)(p||(p=b` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,r.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,r.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?s.s6:(0,s.qy)(g||(g=b` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(a=this.hass)||void 0===a?void 0:a.localize("ui.common.close"))&&void 0!==e?e:"Close",y,void 0!==this.headerTitle?(0,s.qy)(u||(u=b`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,s.qy)(f||(f=b`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,s.qy)(w||(w=b`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,s.qy)(v||(v=b`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,s.AH)(m||(m=b`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,i.Cg)([(0,l.MZ)({attribute:!1})],x.prototype,"hass",void 0),(0,i.Cg)([(0,l.MZ)({attribute:"aria-labelledby"})],x.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,l.MZ)({attribute:"aria-describedby"})],x.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,l.MZ)({type:Boolean,reflect:!0})],x.prototype,"open",void 0),(0,i.Cg)([(0,l.MZ)({reflect:!0})],x.prototype,"type",void 0),(0,i.Cg)([(0,l.MZ)({type:String,reflect:!0,attribute:"width"})],x.prototype,"width",void 0),(0,i.Cg)([(0,l.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],x.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,l.MZ)({attribute:"header-title"})],x.prototype,"headerTitle",void 0),(0,i.Cg)([(0,l.MZ)({attribute:"header-subtitle"})],x.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,l.MZ)({type:String,attribute:"header-subtitle-position"})],x.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,l.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],x.prototype,"flexContent",void 0),(0,i.Cg)([(0,l.MZ)({type:Boolean,attribute:"without-header"})],x.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,l.wk)()],x.prototype,"_open",void 0),(0,i.Cg)([(0,l.P)(".body")],x.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,l.wk)()],x.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,l.Ls)({passive:!0})],x.prototype,"_handleBodyScroll",null),x=(0,i.Cg)([(0,l.EM)("ha-wa-dialog")],x),a()}catch(p){a(p)}})},35167:function(e,a,t){t.a(e,async function(e,i){try{t.r(a);t(3362),t(62953);var o=t(40445),s=t(96196),l=t(77845),r=t(1087),n=(t(43661),t(17308),t(45331)),d=(t(2846),t(67094),t(14503)),h=e([n]);n=(h.then?(await h)():h)[0];let c,p,g=e=>e;const u="M18,11V12.5C21.19,12.5 23.09,16.05 21.33,18.71L20.24,17.62C21.06,15.96 19.85,14 18,14V15.5L15.75,13.25L18,11M18,22V20.5C14.81,20.5 12.91,16.95 14.67,14.29L15.76,15.38C14.94,17.04 16.15,19 18,19V17.5L20.25,19.75L18,22M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14C13.36,20.45 12.86,19.77 12.5,19H5V8H19V10.59C19.71,10.7 20.39,10.94 21,11.31V5A2,2 0 0,0 19,3Z",f="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";class w extends s.WF{showDialog(e){this._opened=!0,this._params=e}closeDialog(){return this._opened=!1,!0}_dialogClosed(){var e;null!==(e=this._params)&&void 0!==e&&e.cancel&&this._params.cancel(),this._params=void 0,(0,r.r)(this,"dialog-closed",{dialog:this.localName})}render(){return this._params?(0,s.qy)(c||(c=g` <ha-wa-dialog .hass="${0}" .open="${0}" header-title="${0}" @closed="${0}"> <ha-md-list innerRole="listbox" itemRoles="option" .innerAriaLabel="${0}" rootTabbable> <ha-md-list-item @click="${0}" type="button" .disabled="${0}"> <ha-svg-icon slot="start" .path="${0}"></ha-svg-icon> <span slot="headline"> ${0} </span> <span slot="supporting-text"> ${0} </span> <ha-icon-next slot="end"></ha-icon-next> </ha-md-list-item> <ha-md-list-item @click="${0}" type="button"> <ha-svg-icon slot="start" .path="${0}"></ha-svg-icon> <span slot="headline"> ${0} </span> <span slot="supporting-text"> ${0} </span> <ha-icon-next slot="end"></ha-icon-next> </ha-md-list-item> </ha-md-list> </ha-wa-dialog> `),this.hass,this._opened,this.hass.localize("ui.panel.config.backup.dialogs.new.title"),this._dialogClosed,this.hass.localize("ui.panel.config.backup.dialogs.new.options"),this._automatic,!this._params.config.create_backup.password,u,this.hass.localize("ui.panel.config.backup.dialogs.new.automatic.title"),this.hass.localize("ui.panel.config.backup.dialogs.new.automatic.description"),this._manual,f,this.hass.localize("ui.panel.config.backup.dialogs.new.manual.title"),this.hass.localize("ui.panel.config.backup.dialogs.new.manual.description")):s.s6}async _manual(){var e,a;null===(e=(a=this._params).submit)||void 0===e||e.call(a,"manual"),this.closeDialog()}async _automatic(){var e,a;null===(e=(a=this._params).submit)||void 0===e||e.call(a,"automatic"),this.closeDialog()}static get styles(){return[d.RF,d.nA,(0,s.AH)(p||(p=g`ha-wa-dialog{--dialog-content-padding:0}ha-md-list{background:0 0}ha-icon-next{width:24px}`))]}constructor(...e){super(...e),this._opened=!1}}(0,o.Cg)([(0,l.MZ)({attribute:!1})],w.prototype,"hass",void 0),(0,o.Cg)([(0,l.wk)()],w.prototype,"_opened",void 0),(0,o.Cg)([(0,l.wk)()],w.prototype,"_params",void 0),w=(0,o.Cg)([(0,l.EM)("ha-dialog-new-backup")],w),i()}catch(c){i(c)}})},99793:function(e,a,t){var i=t(96196);let o;a.A=(0,i.AH)(o||(o=(e=>e)`:host{--width:31rem;--spacing:var(--wa-space-l);--show-duration:200ms;--hide-duration:200ms;display:none}:host([open]){display:block}.dialog{display:flex;flex-direction:column;top:0;right:0;bottom:0;left:0;width:var(--width);max-width:calc(100% - var(--wa-space-2xl));max-height:calc(100% - var(--wa-space-2xl));background-color:var(--wa-color-surface-raised);border-radius:var(--wa-panel-border-radius);border:none;box-shadow:var(--wa-shadow-l);padding:0;margin:auto}.dialog.show{animation:show-dialog var(--show-duration) ease}.dialog.show::backdrop{animation:show-backdrop var(--show-duration,200ms) ease}.dialog.hide{animation:show-dialog var(--hide-duration) ease reverse}.dialog.hide::backdrop{animation:show-backdrop var(--hide-duration,200ms) ease reverse}.dialog.pulse{animation:pulse 250ms ease}.dialog:focus{outline:0}@media screen and (max-width:420px){.dialog{max-height:80vh}}.open{display:flex;opacity:1}.header{flex:0 0 auto;display:flex;flex-wrap:nowrap;padding-inline-start:var(--spacing);padding-block-end:0;padding-inline-end:calc(var(--spacing) - var(--wa-form-control-padding-block));padding-block-start:calc(var(--spacing) - var(--wa-form-control-padding-block))}.title{align-self:center;flex:1 1 auto;font-family:inherit;font-size:var(--wa-font-size-l);font-weight:var(--wa-font-weight-heading);line-height:var(--wa-line-height-condensed);margin:0}.header-actions{align-self:start;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:end;gap:var(--wa-space-2xs);padding-inline-start:var(--spacing)}.header-actions ::slotted(wa-button),.header-actions wa-button{flex:0 0 auto;display:flex;align-items:center}.body{flex:1 1 auto;display:block;padding:var(--spacing);overflow:auto;-webkit-overflow-scrolling:touch}.body:focus{outline:0}.body:focus-visible{outline:var(--wa-focus-ring);outline-offset:var(--wa-focus-ring-offset)}.footer{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:var(--wa-space-xs);justify-content:end;padding:var(--spacing);padding-block-start:0}.footer ::slotted(wa-button:not(:first-of-type)){margin-inline-start:var(--wa-spacing-xs)}.dialog::backdrop{background-color:var(--wa-color-overlay-modal,rgb(0 0 0 / .25))}@keyframes pulse{0%{scale:1}50%{scale:1.02}100%{scale:1}}@keyframes show-dialog{from{opacity:0;scale:0.8}to{opacity:1;scale:1}}@keyframes show-backdrop{from{opacity:0}to{opacity:1}}@media (forced-colors:active){.dialog{border:solid 1px #fff}}`))},93900:function(e,a,t){t.a(e,async function(e,a){try{t(3362),t(27495),t(62953);var i=t(96196),o=t(77845),s=t(94333),l=t(32288),r=t(17051),n=t(42462),d=t(28438),h=t(98779),c=t(27259),p=t(31247),g=t(93949),u=t(92070),f=t(9395),w=t(32510),v=t(17060),m=t(88496),b=t(99793),y=e([m,v]);[m,v]=y.then?(await y)():y;let _,$,L,D=e=>e;var x=Object.defineProperty,C=Object.getOwnPropertyDescriptor,k=(e,a,t,i)=>{for(var o,s=i>1?void 0:i?C(a,t):a,l=e.length-1;l>=0;l--)(o=e[l])&&(s=(i?o(a,t,s):o(s))||s);return i&&s&&x(a,t,s),s};let M=class extends w.A{firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),(0,g.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,g.I7)(this),this.removeOpenListeners()}async requestClose(e){const a=new d.L({source:e});if(this.dispatchEvent(a),a.defaultPrevented)return this.open=!0,void(0,c.Ud)(this.dialog,"pulse");this.removeOpenListeners(),await(0,c.Ud)(this.dialog,"hide"),this.open=!1,this.dialog.close(),(0,g.I7)(this);const t=this.originalTrigger;"function"==typeof(null==t?void 0:t.focus)&&setTimeout(()=>t.focus()),this.dispatchEvent(new r.Z)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(e){e.preventDefault(),this.dialog.classList.contains("hide")||e.target!==this.dialog||this.requestClose(this.dialog)}handleDialogClick(e){const a=e.target.closest('[data-dialog="close"]');a&&(e.stopPropagation(),this.requestClose(a))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await(0,c.Ud)(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const e=new h.k;this.dispatchEvent(e),e.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),(0,g.JG)(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&"function"==typeof e.focus?e.focus():this.dialog.focus()}),await(0,c.Ud)(this.dialog,"show"),this.dispatchEvent(new n.q))}render(){var e;const a=!this.withoutHeader,t=this.hasSlotController.test("footer");return(0,i.qy)(_||(_=D` <dialog aria-labelledby="${0}" aria-describedby="${0}" part="dialog" class="${0}" @cancel="${0}" @click="${0}" @pointerdown="${0}"> ${0} <div part="body" class="body"><slot></slot></div> ${0} </dialog> `),null!==(e=this.ariaLabelledby)&&void 0!==e?e:"title",(0,l.J)(this.ariaDescribedby),(0,s.H)({dialog:!0,open:this.open}),this.handleDialogCancel,this.handleDialogClick,this.handleDialogPointerDown,a?(0,i.qy)($||($=D` <header part="header" class="header"> <h2 part="title" class="title" id="title"> <slot name="label"> ${0} </slot> </h2> <div part="header-actions" class="header-actions"> <slot name="header-actions"></slot> <wa-button part="close-button" exportparts="base:close-button__base" class="close" appearance="plain" @click="${0}"> <wa-icon name="xmark" label="${0}" library="system" variant="solid"></wa-icon> </wa-button> </div> </header> `),this.label.length>0?this.label:String.fromCharCode(8203),e=>this.requestClose(e.target),this.localize.term("close")):"",t?(0,i.qy)(L||(L=D` <footer part="footer" class="footer"> <slot name="footer"></slot> </footer> `)):"")}constructor(){super(...arguments),this.localize=new v.c(this),this.hasSlotController=new u.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}};M.css=b.A,k([(0,o.P)(".dialog")],M.prototype,"dialog",2),k([(0,o.MZ)({type:Boolean,reflect:!0})],M.prototype,"open",2),k([(0,o.MZ)({reflect:!0})],M.prototype,"label",2),k([(0,o.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],M.prototype,"withoutHeader",2),k([(0,o.MZ)({attribute:"light-dismiss",type:Boolean})],M.prototype,"lightDismiss",2),k([(0,o.MZ)({attribute:"aria-labelledby"})],M.prototype,"ariaLabelledby",2),k([(0,o.MZ)({attribute:"aria-describedby"})],M.prototype,"ariaDescribedby",2),k([(0,f.w)("open",{waitUntilFirstUpdate:!0})],M.prototype,"handleOpenChange",1),M=k([(0,o.EM)("wa-dialog")],M),document.addEventListener("click",e=>{const a=e.target.closest("[data-dialog]");if(a instanceof Element){const[e,t]=(0,p.v)(a.getAttribute("data-dialog")||"");if("open"===e&&null!=t&&t.length){const e=a.getRootNode().getElementById(t);"wa-dialog"===(null==e?void 0:e.localName)?e.open=!0:console.warn(`A dialog with an ID of "${t}" could not be found in this document.`)}}}),i.S$||document.addEventListener("pointerdown",()=>{}),a()}catch(_){a(_)}})}}]);
//# sourceMappingURL=23060.2ae26bff561b52f1.js.map