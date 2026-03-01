export const __rspack_esm_id="35131";export const __rspack_esm_ids=["35131"];export const __webpack_modules__={93444(a,e,t){var o=t(62826),i=t(96196),r=t(44457);class s extends i.WF{render(){return i.qy` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `}static get styles(){return[i.AH`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`]}}s=(0,o.Cg)([(0,r.EM)("ha-dialog-footer")],s)},71828(a,e,t){var o=t(62826),i=t(5691),r=t(28522),s=t(96196),l=t(44457);class d extends i.${}d.styles=[r.R,s.AH`:host{--ha-icon-display:block;--md-sys-color-primary:var(--primary-text-color);--md-sys-color-secondary:var(--secondary-text-color);--md-sys-color-surface:var(--card-background-color);--md-sys-color-on-surface:var(--primary-text-color);--md-sys-color-on-surface-variant:var(--secondary-text-color)}`],d=(0,o.Cg)([(0,l.EM)("ha-md-select-option")],d)},37832(a,e,t){var o=t(62826),i=t(73709),r=t(7138),s=t(83538),l=t(96196),d=t(44457);class h extends i.V{}h.styles=[r.R,s.R,l.AH`:host{--ha-icon-display:block;--md-sys-color-primary:var(--primary-text-color);--md-sys-color-secondary:var(--secondary-text-color);--md-sys-color-surface:var(--card-background-color);--md-sys-color-on-surface-variant:var(--secondary-text-color);--md-sys-color-surface-container-highest:var(--input-fill-color);--md-sys-color-on-surface:var(--input-ink-color);--md-sys-color-surface-container:var(--input-fill-color);--md-sys-color-on-secondary-container:var(--primary-text-color);--md-sys-color-secondary-container:var(--input-fill-color);--md-menu-container-color:var(--card-background-color)}`],h=(0,o.Cg)([(0,d.EM)("ha-md-select")],h)},45331(a,e,t){t.a(a,async function(a,e){try{var o=t(62826),i=t(93900),r=t(96196),s=t(44457),l=t(32288),d=t(1087),h=t(59992),n=t(14503),c=(t(76538),t(26300),a([i]));i=(c.then?(await c)():c)[0];const p="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class g extends((0,h.V)(r.WF)){get scrollableElement(){return this.bodyContainer}updated(a){super.updated(a),a.has("open")&&(this._open=this.open)}render(){return r.qy` <wa-dialog .open="${this._open}" .lightDismiss="${!this.preventScrimClose}" without-header aria-labelledby="${(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0))}" aria-describedby="${(0,l.J)(this.ariaDescribedBy)}" @keydown="${this._handleKeyDown}" @wa-hide="${this._handleHide}" @wa-show="${this._handleShow}" @wa-after-show="${this._handleAfterShow}" @wa-after-hide="${this._handleAfterHide}"> ${this.withoutHeader?r.s6:r.qy` <slot name="header"> <ha-dialog-header .subtitlePosition="${this.headerSubtitlePosition}" .showBorder="${this._bodyScrolled}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${this.hass?.localize("ui.common.close")??"Close"}" .path="${p}"></ha-icon-button> </slot> ${void 0!==this.headerTitle?r.qy`<span slot="title" class="title" id="ha-wa-dialog-title"> ${this.headerTitle} </span>`:r.qy`<slot name="headerTitle" slot="title"></slot>`} ${void 0!==this.headerSubtitle?r.qy`<span slot="subtitle">${this.headerSubtitle}</span>`:r.qy`<slot name="headerSubtitle" slot="subtitle"></slot>`} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${this._handleBodyScroll}"> <slot></slot> </div> ${this.renderScrollableFades()} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(a){this._bodyScrolled=a.target.scrollTop>0}_handleKeyDown(a){"Escape"===a.key&&(this._escapePressed=!0)}_handleHide(a){this.preventScrimClose&&this._escapePressed&&a.detail.source===a.target.dialog&&a.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,n.dp,r.AH`
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
      `]}constructor(...a){super(...a),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,d.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{this.querySelector("[autofocus]")?.focus()})},this._handleAfterShow=()=>{(0,d.r)(this,"after-show")},this._handleAfterHide=a=>{a.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,d.r)(this,"closed"))}}}(0,o.Cg)([(0,s.MZ)({attribute:!1})],g.prototype,"hass",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"aria-labelledby"})],g.prototype,"ariaLabelledBy",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"aria-describedby"})],g.prototype,"ariaDescribedBy",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0})],g.prototype,"open",void 0),(0,o.Cg)([(0,s.MZ)({reflect:!0})],g.prototype,"type",void 0),(0,o.Cg)([(0,s.MZ)({type:String,reflect:!0,attribute:"width"})],g.prototype,"width",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],g.prototype,"preventScrimClose",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"header-title"})],g.prototype,"headerTitle",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"header-subtitle"})],g.prototype,"headerSubtitle",void 0),(0,o.Cg)([(0,s.MZ)({type:String,attribute:"header-subtitle-position"})],g.prototype,"headerSubtitlePosition",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],g.prototype,"flexContent",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,attribute:"without-header"})],g.prototype,"withoutHeader",void 0),(0,o.Cg)([(0,s.wk)()],g.prototype,"_open",void 0),(0,o.Cg)([(0,s.P)(".body")],g.prototype,"bodyContainer",void 0),(0,o.Cg)([(0,s.wk)()],g.prototype,"_bodyScrolled",void 0),(0,o.Cg)([(0,s.Ls)({passive:!0})],g.prototype,"_handleBodyScroll",null),g=(0,o.Cg)([(0,s.EM)("ha-wa-dialog")],g),e()}catch(a){e(a)}})},72406(a,e,t){t.a(a,async function(a,o){try{t.r(e),t.d(e,{HuiDialogSelectDashboard:()=>u});t(18111),t(61701);var i=t(62826),r=t(96196),s=t(44457),l=t(1087),d=t(18350),h=(t(93444),t(45331)),n=(t(37832),t(71828),t(65829)),c=t(71730),p=t(99774),g=t(14503),v=t(65063),m=a([d,h,n]);[d,h,n]=m.then?(await m)():m;class u extends r.WF{showDialog(a){this._config=a.lovelaceConfig,this._fromUrlPath=a.urlPath,this._params=a,this._open=!0,this._getDashboards()}closeDialog(){this._open&&(0,l.r)(this,"dialog-closed",{dialog:this.localName}),this._saving=!1,this._dashboards=void 0,this._toUrlPath=void 0,this._open=!1,this._params=void 0}_dialogClosed(){this.closeDialog()}render(){if(!this._params)return r.s6;const a=this._params.header||this.hass.localize("ui.panel.lovelace.editor.select_dashboard.header");return r.qy` <ha-wa-dialog .hass="${this.hass}" .open="${this._open}" header-title="${a}" .preventScrimClose="${this._saving}" @closed="${this._dialogClosed}"> ${this._dashboards&&!this._saving?r.qy` <ha-md-select .label="${this.hass.localize("ui.panel.lovelace.editor.select_view.dashboard_label")}" @change="${this._dashboardChanged}" .value="${this._toUrlPath||""}"> ${this._dashboards.map(a=>r.qy` <ha-md-select-option .disabled="${"storage"!==a.mode||a.url_path===this._fromUrlPath||"lovelace"===a.url_path&&null===this._fromUrlPath}" .value="${a.url_path}">${a.title}</ha-md-select-option> `)} </ha-md-select> `:r.qy`<div class="loading"> <ha-spinner size="medium"></ha-spinner> </div>`} <ha-dialog-footer slot="footer"> <ha-button slot="secondaryAction" appearance="plain" @click="${this.closeDialog}" .disabled="${this._saving}"> ${this.hass.localize("ui.common.cancel")} </ha-button> <ha-button slot="primaryAction" @click="${this._selectDashboard}" .disabled="${!this._config||this._fromUrlPath===this._toUrlPath||this._saving}"> ${this._params.actionLabel||this.hass.localize("ui.common.move")} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `}async _getDashboards(){let a=this._params.dashboards;if(!a)try{a=await(0,c.SJ)(this.hass)}catch(a){console.error("Error fetching dashboards:",a),(0,v.showAlertDialog)(this,{title:this.hass.localize("ui.panel.lovelace.editor.select_dashboard.error_title"),text:this.hass.localize("ui.panel.lovelace.editor.select_dashboard.error_text")})}this._dashboards=[{id:"lovelace",url_path:"lovelace",require_admin:!1,show_in_sidebar:!0,title:this.hass.localize("ui.common.default"),mode:this.hass.panels.lovelace?.config?.mode},...a??[]];const e=(0,p.EN)(this.hass),t=this._fromUrlPath||e;for(const a of this._dashboards)if(a.url_path!==t){this._toUrlPath=a.url_path;break}}async _dashboardChanged(a){const e=a.target.value;e!==this._toUrlPath&&(this._toUrlPath=e)}async _selectDashboard(){this._saving=!0,"lovelace"===this._toUrlPath&&(this._toUrlPath=null),this._params.dashboardSelectedCallback(this._toUrlPath),this.closeDialog()}static get styles(){return[g.nA,r.AH`ha-md-select{width:100%}.loading{display:flex;justify-content:center}`]}constructor(...a){super(...a),this._saving=!1,this._open=!1}}(0,i.Cg)([(0,s.wk)()],u.prototype,"_params",void 0),(0,i.Cg)([(0,s.wk)()],u.prototype,"_dashboards",void 0),(0,i.Cg)([(0,s.wk)()],u.prototype,"_fromUrlPath",void 0),(0,i.Cg)([(0,s.wk)()],u.prototype,"_toUrlPath",void 0),(0,i.Cg)([(0,s.wk)()],u.prototype,"_config",void 0),(0,i.Cg)([(0,s.wk)()],u.prototype,"_saving",void 0),(0,i.Cg)([(0,s.wk)()],u.prototype,"_open",void 0),u=(0,i.Cg)([(0,s.EM)("hui-dialog-select-dashboard")],u),o()}catch(a){o(a)}})}};
//# sourceMappingURL=35131.a305120db7563778.js.map