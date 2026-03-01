"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["35131"],{93444:function(a,t,e){var o=e(40445),i=e(96196),r=e(77845);let s,l,d=a=>a;class h extends i.WF{render(){return(0,i.qy)(s||(s=d` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,i.AH)(l||(l=d`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}h=(0,o.Cg)([(0,r.EM)("ha-dialog-footer")],h)},71828:function(a,t,e){var o=e(40445),i=e(5691),r=e(28522),s=e(96196),l=e(77845);let d;class h extends i.${}h.styles=[r.R,(0,s.AH)(d||(d=(a=>a)`:host{--ha-icon-display:block;--md-sys-color-primary:var(--primary-text-color);--md-sys-color-secondary:var(--secondary-text-color);--md-sys-color-surface:var(--card-background-color);--md-sys-color-on-surface:var(--primary-text-color);--md-sys-color-on-surface-variant:var(--secondary-text-color)}`))],h=(0,o.Cg)([(0,l.EM)("ha-md-select-option")],h)},37832:function(a,t,e){var o=e(40445),i=e(73709),r=e(7138),s=e(83538),l=e(96196),d=e(77845);let h;class n extends i.V{}n.styles=[r.R,s.R,(0,l.AH)(h||(h=(a=>a)`:host{--ha-icon-display:block;--md-sys-color-primary:var(--primary-text-color);--md-sys-color-secondary:var(--secondary-text-color);--md-sys-color-surface:var(--card-background-color);--md-sys-color-on-surface-variant:var(--secondary-text-color);--md-sys-color-surface-container-highest:var(--input-fill-color);--md-sys-color-on-surface:var(--input-ink-color);--md-sys-color-surface-container:var(--input-fill-color);--md-sys-color-on-secondary-container:var(--primary-text-color);--md-sys-color-secondary-container:var(--input-fill-color);--md-menu-container-color:var(--card-background-color)}`))],n=(0,o.Cg)([(0,d.EM)("ha-md-select")],n)},45331:function(a,t,e){e.a(a,async function(a,t){try{e(3362),e(62953);var o=e(40445),i=e(93900),r=e(96196),s=e(77845),l=e(32288),d=e(1087),h=e(59992),n=e(14503),c=(e(76538),e(26300),a([i,h]));[i,h]=c.then?(await c)():c;let p,g,v,u,f,m,y,w=a=>a;const b="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class _ extends((0,h.V)(r.WF)){get scrollableElement(){return this.bodyContainer}updated(a){super.updated(a),a.has("open")&&(this._open=this.open)}render(){var a,t;return(0,r.qy)(p||(p=w` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,l.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?r.s6:(0,r.qy)(g||(g=w` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(a=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==a?a:"Close",b,void 0!==this.headerTitle?(0,r.qy)(v||(v=w`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,r.qy)(u||(u=w`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,r.qy)(f||(f=w`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,r.qy)(m||(m=w`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(a){this._bodyScrolled=a.target.scrollTop>0}_handleKeyDown(a){"Escape"===a.key&&(this._escapePressed=!0)}_handleHide(a){this.preventScrimClose&&this._escapePressed&&a.detail.source===a.target.dialog&&a.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,n.dp,(0,r.AH)(y||(y=w`
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
      `))]}constructor(...a){super(...a),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,d.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var a;null===(a=this.querySelector("[autofocus]"))||void 0===a||a.focus()})},this._handleAfterShow=()=>{(0,d.r)(this,"after-show")},this._handleAfterHide=a=>{a.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,d.r)(this,"closed"))}}}(0,o.Cg)([(0,s.MZ)({attribute:!1})],_.prototype,"hass",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"aria-labelledby"})],_.prototype,"ariaLabelledBy",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"aria-describedby"})],_.prototype,"ariaDescribedBy",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0})],_.prototype,"open",void 0),(0,o.Cg)([(0,s.MZ)({reflect:!0})],_.prototype,"type",void 0),(0,o.Cg)([(0,s.MZ)({type:String,reflect:!0,attribute:"width"})],_.prototype,"width",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],_.prototype,"preventScrimClose",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"header-title"})],_.prototype,"headerTitle",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"header-subtitle"})],_.prototype,"headerSubtitle",void 0),(0,o.Cg)([(0,s.MZ)({type:String,attribute:"header-subtitle-position"})],_.prototype,"headerSubtitlePosition",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],_.prototype,"flexContent",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,attribute:"without-header"})],_.prototype,"withoutHeader",void 0),(0,o.Cg)([(0,s.wk)()],_.prototype,"_open",void 0),(0,o.Cg)([(0,s.P)(".body")],_.prototype,"bodyContainer",void 0),(0,o.Cg)([(0,s.wk)()],_.prototype,"_bodyScrolled",void 0),(0,o.Cg)([(0,s.Ls)({passive:!0})],_.prototype,"_handleBodyScroll",null),_=(0,o.Cg)([(0,s.EM)("ha-wa-dialog")],_),t()}catch(p){t(p)}})},72406:function(a,t,e){e.a(a,async function(a,o){try{e.r(t),e.d(t,{HuiDialogSelectDashboard:function(){return x}});e(18111),e(61701),e(3362),e(62953);var i=e(40445),r=e(96196),s=e(77845),l=e(1087),d=e(18350),h=(e(93444),e(45331)),n=(e(37832),e(71828),e(65829)),c=e(71730),p=e(99774),g=e(14503),v=e(65063),u=a([d,h,n]);[d,h,n]=u.then?(await u)():u;let f,m,y,w,b,_=a=>a;class x extends r.WF{showDialog(a){this._config=a.lovelaceConfig,this._fromUrlPath=a.urlPath,this._params=a,this._open=!0,this._getDashboards()}closeDialog(){this._open&&(0,l.r)(this,"dialog-closed",{dialog:this.localName}),this._saving=!1,this._dashboards=void 0,this._toUrlPath=void 0,this._open=!1,this._params=void 0}_dialogClosed(){this.closeDialog()}render(){if(!this._params)return r.s6;const a=this._params.header||this.hass.localize("ui.panel.lovelace.editor.select_dashboard.header");return(0,r.qy)(f||(f=_` <ha-wa-dialog .hass="${0}" .open="${0}" header-title="${0}" .preventScrimClose="${0}" @closed="${0}"> ${0} <ha-dialog-footer slot="footer"> <ha-button slot="secondaryAction" appearance="plain" @click="${0}" .disabled="${0}"> ${0} </ha-button> <ha-button slot="primaryAction" @click="${0}" .disabled="${0}"> ${0} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `),this.hass,this._open,a,this._saving,this._dialogClosed,this._dashboards&&!this._saving?(0,r.qy)(m||(m=_` <ha-md-select .label="${0}" @change="${0}" .value="${0}"> ${0} </ha-md-select> `),this.hass.localize("ui.panel.lovelace.editor.select_view.dashboard_label"),this._dashboardChanged,this._toUrlPath||"",this._dashboards.map(a=>(0,r.qy)(y||(y=_` <ha-md-select-option .disabled="${0}" .value="${0}">${0}</ha-md-select-option> `),"storage"!==a.mode||a.url_path===this._fromUrlPath||"lovelace"===a.url_path&&null===this._fromUrlPath,a.url_path,a.title))):(0,r.qy)(w||(w=_`<div class="loading"> <ha-spinner size="medium"></ha-spinner> </div>`)),this.closeDialog,this._saving,this.hass.localize("ui.common.cancel"),this._selectDashboard,!this._config||this._fromUrlPath===this._toUrlPath||this._saving,this._params.actionLabel||this.hass.localize("ui.common.move"))}async _getDashboards(){var a;let t=this._params.dashboards;if(!t)try{t=await(0,c.SJ)(this.hass)}catch(i){console.error("Error fetching dashboards:",i),(0,v.showAlertDialog)(this,{title:this.hass.localize("ui.panel.lovelace.editor.select_dashboard.error_title"),text:this.hass.localize("ui.panel.lovelace.editor.select_dashboard.error_text")})}this._dashboards=[{id:"lovelace",url_path:"lovelace",require_admin:!1,show_in_sidebar:!0,title:this.hass.localize("ui.common.default"),mode:null===(a=this.hass.panels.lovelace)||void 0===a||null===(a=a.config)||void 0===a?void 0:a.mode},...null!=t?t:[]];const e=(0,p.EN)(this.hass),o=this._fromUrlPath||e;for(const r of this._dashboards)if(r.url_path!==o){this._toUrlPath=r.url_path;break}}async _dashboardChanged(a){const t=a.target.value;t!==this._toUrlPath&&(this._toUrlPath=t)}async _selectDashboard(){this._saving=!0,"lovelace"===this._toUrlPath&&(this._toUrlPath=null),this._params.dashboardSelectedCallback(this._toUrlPath),this.closeDialog()}static get styles(){return[g.nA,(0,r.AH)(b||(b=_`ha-md-select{width:100%}.loading{display:flex;justify-content:center}`))]}constructor(...a){super(...a),this._saving=!1,this._open=!1}}(0,i.Cg)([(0,s.wk)()],x.prototype,"_params",void 0),(0,i.Cg)([(0,s.wk)()],x.prototype,"_dashboards",void 0),(0,i.Cg)([(0,s.wk)()],x.prototype,"_fromUrlPath",void 0),(0,i.Cg)([(0,s.wk)()],x.prototype,"_toUrlPath",void 0),(0,i.Cg)([(0,s.wk)()],x.prototype,"_config",void 0),(0,i.Cg)([(0,s.wk)()],x.prototype,"_saving",void 0),(0,i.Cg)([(0,s.wk)()],x.prototype,"_open",void 0),x=(0,i.Cg)([(0,s.EM)("hui-dialog-select-dashboard")],x),o()}catch(f){o(f)}})}}]);
//# sourceMappingURL=35131.85d2f7fbf97d096a.js.map