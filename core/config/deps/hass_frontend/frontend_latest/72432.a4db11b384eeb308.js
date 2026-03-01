export const __rspack_esm_id="72432";export const __rspack_esm_ids=["72432"];export const __webpack_modules__={38962(t,e,a){a.r(e);var o=a(62826),i=a(96196),r=a(44457),s=a(94333),l=a(1087);a(26300),a(67094);const n={info:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",warning:"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",error:"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",success:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"};class d extends i.WF{render(){return i.qy` <div class="issue-type ${(0,s.H)({[this.alertType]:!0})}" role="alert"> <div class="icon ${this.title?"":"no-title"}"> <slot name="icon"> <ha-svg-icon .path="${n[this.alertType]}"></ha-svg-icon> </slot> </div> <div class="${(0,s.H)({content:!0,narrow:this.narrow})}"> <div class="main-content"> ${this.title?i.qy`<div class="title">${this.title}</div>`:i.s6} <slot></slot> </div> <div class="action"> <slot name="action"> ${this.dismissable?i.qy`<ha-icon-button @click="${this._dismissClicked}" label="Dismiss alert" .path="${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}"></ha-icon-button>`:i.s6} </slot> </div> </div> </div> `}_dismissClicked(){(0,l.r)(this,"alert-dismissed-clicked")}constructor(...t){super(...t),this.title="",this.alertType="info",this.dismissable=!1,this.narrow=!1}}d.styles=i.AH`.issue-type{position:relative;padding:8px;display:flex}.icon{height:var(--ha-alert-icon-size,24px);width:var(--ha-alert-icon-size,24px)}.issue-type::after{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.12;pointer-events:none;content:"";border-radius:var(--ha-border-radius-sm)}.icon.no-title{align-self:center}.content{display:flex;justify-content:space-between;align-items:center;width:100%;text-align:var(--float-start)}.content.narrow{flex-direction:column;align-items:flex-end}.action{z-index:1;width:min-content;--mdc-theme-primary:var(--primary-text-color)}.main-content{overflow-wrap:anywhere;word-break:break-word;line-height:normal;margin-left:8px;margin-right:0;margin-inline-start:8px;margin-inline-end:8px}.title{margin-top:2px;font-weight:var(--ha-font-weight-bold)}.action ha-icon-button{--mdc-theme-primary:var(--primary-text-color);--mdc-icon-button-size:36px}.issue-type.info>.icon{color:var(--info-color)}.issue-type.info::after{background-color:var(--info-color)}.issue-type.warning>.icon{color:var(--warning-color)}.issue-type.warning::after{background-color:var(--warning-color)}.issue-type.error>.icon{color:var(--error-color)}.issue-type.error::after{background-color:var(--error-color)}.issue-type.success>.icon{color:var(--success-color)}.issue-type.success::after{background-color:var(--success-color)}:host ::slotted(ul){margin:0;padding-inline-start:20px}`,(0,o.Cg)([(0,r.MZ)()],d.prototype,"title",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"alert-type"})],d.prototype,"alertType",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],d.prototype,"dismissable",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],d.prototype,"narrow",void 0),d=(0,o.Cg)([(0,r.EM)("ha-alert")],d)},76538(t,e,a){var o=a(62826),i=a(96196),r=a(44457);class s extends i.WF{render(){const t=i.qy`<div class="header-title"> <slot name="title"></slot> </div>`,e=i.qy`<div class="header-subtitle"> <slot name="subtitle"></slot> </div>`;return i.qy` <header class="header"> <div class="header-bar"> <section class="header-navigation-icon"> <slot name="navigationIcon"></slot> </section> <section class="header-content"> ${"above"===this.subtitlePosition?i.qy`${e}${t}`:i.qy`${t}${e}`} </section> <section class="header-action-items"> <slot name="actionItems"></slot> </section> </div> <slot></slot> </header> `}static get styles(){return[i.AH`:host{display:block}:host([show-border]){border-bottom:1px solid var(--mdc-dialog-scroll-divider-color,rgba(0,0,0,.12))}.header-bar{display:flex;flex-direction:row;align-items:center;padding:0 var(--ha-space-1);box-sizing:border-box}.header-content{flex:1;padding:10px var(--ha-space-1);display:flex;flex-direction:column;justify-content:center;min-height:var(--ha-space-12);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.header-title{height:var(--ha-dialog-header-title-height,calc(var(--ha-font-size-xl) + var(--ha-space-1)));font-size:var(--ha-font-size-xl);line-height:var(--ha-line-height-condensed);font-weight:var(--ha-font-weight-medium);color:var(--ha-dialog-header-title-color,var(--primary-text-color))}.header-subtitle{font-size:var(--ha-font-size-m);line-height:var(--ha-line-height-normal);color:var(--ha-dialog-header-subtitle-color,var(--secondary-text-color))}@media all and (min-width:450px) and (min-height:500px){.header-bar{padding:0 var(--ha-space-2)}}.header-navigation-icon{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}.header-action-items{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}`]}constructor(...t){super(...t),this.subtitlePosition="below",this.showBorder=!1}}(0,o.Cg)([(0,r.MZ)({type:String,attribute:"subtitle-position"})],s.prototype,"subtitlePosition",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"show-border"})],s.prototype,"showBorder",void 0),s=(0,o.Cg)([(0,r.EM)("ha-dialog-header")],s)},26300(t,e,a){a.r(e),a.d(e,{HaIconButton:()=>l});var o=a(62826),i=(a(11677),a(96196)),r=a(44457),s=a(32288);a(67094);class l extends i.WF{focus(){this._button?.focus()}render(){return i.qy` <mwc-icon-button aria-label="${(0,s.J)(this.label)}" title="${(0,s.J)(this.hideTitle?void 0:this.label)}" aria-haspopup="${(0,s.J)(this.ariaHasPopup)}" .disabled="${this.disabled}"> ${this.path?i.qy`<ha-svg-icon .path="${this.path}"></ha-svg-icon>`:i.qy`<slot></slot>`} </mwc-icon-button> `}constructor(...t){super(...t),this.disabled=!1,this.hideTitle=!1}}l.shadowRootOptions={mode:"open",delegatesFocus:!0},l.styles=i.AH`:host{display:inline-block;outline:0}:host([disabled]){pointer-events:none}mwc-icon-button{--mdc-theme-on-primary:currentColor;--mdc-theme-text-disabled-on-light:var(--disabled-text-color)}`,(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],l.prototype,"disabled",void 0),(0,o.Cg)([(0,r.MZ)({type:String})],l.prototype,"path",void 0),(0,o.Cg)([(0,r.MZ)({type:String})],l.prototype,"label",void 0),(0,o.Cg)([(0,r.MZ)({type:String,attribute:"aria-haspopup"})],l.prototype,"ariaHasPopup",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"hide-title",type:Boolean})],l.prototype,"hideTitle",void 0),(0,o.Cg)([(0,r.P)("mwc-icon-button",!0)],l.prototype,"_button",void 0),l=(0,o.Cg)([(0,r.EM)("ha-icon-button")],l)},67094(t,e,a){a.r(e),a.d(e,{HaSvgIcon:()=>s});var o=a(62826),i=a(96196),r=a(44457);class s extends i.WF{render(){return i.JW` <svg viewBox="${this.viewBox||"0 0 24 24"}" preserveAspectRatio="xMidYMid meet" focusable="false" role="img" aria-hidden="true"> <g> ${this.path?i.JW`<path class="primary-path" d="${this.path}"></path>`:i.s6} ${this.secondaryPath?i.JW`<path class="secondary-path" d="${this.secondaryPath}"></path>`:i.s6} </g> </svg>`}}s.styles=i.AH`:host{display:var(--ha-icon-display,inline-flex);align-items:center;justify-content:center;position:relative;vertical-align:middle;fill:var(--icon-primary-color,currentcolor);width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px)}svg{width:100%;height:100%;pointer-events:none;display:block}path.primary-path{opacity:var(--icon-primary-opactity, 1)}path.secondary-path{fill:var(--icon-secondary-color,currentcolor);opacity:var(--icon-secondary-opactity, .5)}`,(0,o.Cg)([(0,r.MZ)()],s.prototype,"path",void 0),(0,o.Cg)([(0,r.MZ)({attribute:!1})],s.prototype,"secondaryPath",void 0),(0,o.Cg)([(0,r.MZ)({attribute:!1})],s.prototype,"viewBox",void 0),s=(0,o.Cg)([(0,r.EM)("ha-svg-icon")],s)},45331(t,e,a){a.a(t,async function(t,e){try{var o=a(62826),i=a(93900),r=a(96196),s=a(44457),l=a(32288),n=a(1087),d=a(59992),h=a(14503),c=(a(76538),a(26300),t([i]));i=(c.then?(await c)():c)[0];const p="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class g extends((0,d.V)(r.WF)){get scrollableElement(){return this.bodyContainer}updated(t){super.updated(t),t.has("open")&&(this._open=this.open)}render(){return r.qy` <wa-dialog .open="${this._open}" .lightDismiss="${!this.preventScrimClose}" without-header aria-labelledby="${(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0))}" aria-describedby="${(0,l.J)(this.ariaDescribedBy)}" @keydown="${this._handleKeyDown}" @wa-hide="${this._handleHide}" @wa-show="${this._handleShow}" @wa-after-show="${this._handleAfterShow}" @wa-after-hide="${this._handleAfterHide}"> ${this.withoutHeader?r.s6:r.qy` <slot name="header"> <ha-dialog-header .subtitlePosition="${this.headerSubtitlePosition}" .showBorder="${this._bodyScrolled}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${this.hass?.localize("ui.common.close")??"Close"}" .path="${p}"></ha-icon-button> </slot> ${void 0!==this.headerTitle?r.qy`<span slot="title" class="title" id="ha-wa-dialog-title"> ${this.headerTitle} </span>`:r.qy`<slot name="headerTitle" slot="title"></slot>`} ${void 0!==this.headerSubtitle?r.qy`<span slot="subtitle">${this.headerSubtitle}</span>`:r.qy`<slot name="headerSubtitle" slot="subtitle"></slot>`} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${this._handleBodyScroll}"> <slot></slot> </div> ${this.renderScrollableFades()} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(t){this._bodyScrolled=t.target.scrollTop>0}_handleKeyDown(t){"Escape"===t.key&&(this._escapePressed=!0)}_handleHide(t){this.preventScrimClose&&this._escapePressed&&t.detail.source===t.target.dialog&&t.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,r.AH`
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
      `]}constructor(...t){super(...t),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{this.querySelector("[autofocus]")?.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=t=>{t.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,o.Cg)([(0,s.MZ)({attribute:!1})],g.prototype,"hass",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"aria-labelledby"})],g.prototype,"ariaLabelledBy",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"aria-describedby"})],g.prototype,"ariaDescribedBy",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0})],g.prototype,"open",void 0),(0,o.Cg)([(0,s.MZ)({reflect:!0})],g.prototype,"type",void 0),(0,o.Cg)([(0,s.MZ)({type:String,reflect:!0,attribute:"width"})],g.prototype,"width",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],g.prototype,"preventScrimClose",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"header-title"})],g.prototype,"headerTitle",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"header-subtitle"})],g.prototype,"headerSubtitle",void 0),(0,o.Cg)([(0,s.MZ)({type:String,attribute:"header-subtitle-position"})],g.prototype,"headerSubtitlePosition",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],g.prototype,"flexContent",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,attribute:"without-header"})],g.prototype,"withoutHeader",void 0),(0,o.Cg)([(0,s.wk)()],g.prototype,"_open",void 0),(0,o.Cg)([(0,s.P)(".body")],g.prototype,"bodyContainer",void 0),(0,o.Cg)([(0,s.wk)()],g.prototype,"_bodyScrolled",void 0),(0,o.Cg)([(0,s.Ls)({passive:!0})],g.prototype,"_handleBodyScroll",null),g=(0,o.Cg)([(0,s.EM)("ha-wa-dialog")],g),e()}catch(t){e(t)}})},9555(t,e,a){a.a(t,async function(t,o){try{a.r(e);a(18111),a(61701);var i=a(62826),r=a(96196),s=a(44457),l=a(1087),n=(a(38962),a(67094),a(45331)),d=a(41570),h=t([n]);n=(h.then?(await h)():h)[0];const c="__CTRL_CMD__",p=[{titleTranslationKey:"ui.dialogs.shortcuts.searching.title",items:[{textTranslationKey:"ui.dialogs.shortcuts.searching.on_any_page"},{shortcut:[c,"K"],descriptionTranslationKey:"ui.dialogs.shortcuts.searching.search"},{shortcut:["C"],descriptionTranslationKey:"ui.dialogs.shortcuts.searching.search_command"},{shortcut:["E"],descriptionTranslationKey:"ui.dialogs.shortcuts.searching.search_entities"},{shortcut:["D"],descriptionTranslationKey:"ui.dialogs.shortcuts.searching.search_devices"},{textTranslationKey:"ui.dialogs.shortcuts.searching.on_pages_with_tables"},{shortcut:[c,"F"],descriptionTranslationKey:"ui.dialogs.shortcuts.searching.search_in_table"}]},{titleTranslationKey:"ui.dialogs.shortcuts.assist.title",items:[{shortcut:["A"],descriptionTranslationKey:"ui.dialogs.shortcuts.assist.open_assist"}]},{titleTranslationKey:"ui.dialogs.shortcuts.automation_script.title",items:[{shortcut:[c,"C"],descriptionTranslationKey:"ui.dialogs.shortcuts.automation_script.copy"},{shortcut:[c,"X"],descriptionTranslationKey:"ui.dialogs.shortcuts.automation_script.cut"},{shortcut:[c,{shortcutTranslationKey:"ui.dialogs.shortcuts.keys.del"}],descriptionTranslationKey:"ui.dialogs.shortcuts.automation_script.delete"},{shortcut:[c,"V"],descriptionTranslationKey:"ui.dialogs.shortcuts.automation_script.paste"},{shortcut:[c,"S"],descriptionTranslationKey:"ui.dialogs.shortcuts.automation_script.save"},{shortcut:[c,"Z"],descriptionTranslationKey:"ui.dialogs.shortcuts.automation_script.undo"},{shortcut:[c,"Y"],descriptionTranslationKey:"ui.dialogs.shortcuts.automation_script.redo"}]},{titleTranslationKey:"ui.dialogs.shortcuts.charts.title",items:[{shortcut:[c,{shortcutTranslationKey:"ui.dialogs.shortcuts.shortcuts.drag"}],descriptionTranslationKey:"ui.dialogs.shortcuts.charts.drag_to_zoom"},{shortcut:[c,{shortcutTranslationKey:"ui.dialogs.shortcuts.shortcuts.scroll_wheel"}],descriptionTranslationKey:"ui.dialogs.shortcuts.charts.scroll_to_zoom"},{shortcut:[{shortcutTranslationKey:"ui.dialogs.shortcuts.shortcuts.double_click"}],descriptionTranslationKey:"ui.dialogs.shortcuts.charts.double_click"}]},{titleTranslationKey:"ui.dialogs.shortcuts.other.title",items:[{shortcut:["M"],descriptionTranslationKey:"ui.dialogs.shortcuts.other.my_link"},{shortcut:["Shift","/"],descriptionTranslationKey:"ui.dialogs.shortcuts.other.show_shortcuts"}]}];class g extends r.WF{async showDialog(){this._open=!0}_dialogClosed(){this._open=!1,(0,l.r)(this,"dialog-closed",{dialog:this.localName})}async closeDialog(){return this._open=!1,!0}_renderShortcut(t,e){return r.qy` <div class="shortcut"> ${t.map(t=>r.qy`<span>${t===c?d.c?"⌘":this.hass.localize("ui.dialogs.shortcuts.keys.ctrl"):"string"==typeof t?t:this.hass.localize(t.shortcutTranslationKey)}</span>`)} ${this.hass.localize(e)} </div> `}render(){return r.qy` <ha-wa-dialog .open="${this._open}" @closed="${this._dialogClosed}" .headerTitle="${this.hass.localize("ui.dialogs.shortcuts.title")}"> <div class="content"> ${p.map(t=>r.qy` <h3>${this.hass.localize(t.titleTranslationKey)}</h3> <div class="items"> ${t.items.map(t=>"shortcut"in t?this._renderShortcut(t.shortcut,t.descriptionTranslationKey):r.qy`<p> ${this.hass.localize(t.textTranslationKey)} </p>`)} </div> `)} </div> <ha-alert slot="footer"> ${this.hass.localize("ui.dialogs.shortcuts.enable_shortcuts_hint",{user_profile:r.qy`<a href="/profile/general#shortcuts">${this.hass.localize("ui.dialogs.shortcuts.enable_shortcuts_hint_user_profile")}</a>`})} </ha-alert> </ha-wa-dialog> `}constructor(...t){super(...t),this._open=!1}}g.styles=[r.AH`.shortcut{display:flex;flex-direction:row;align-items:center;gap:var(--ha-space-2);margin:4px 0}span{padding:8px;border:1px solid var(--outline-color);border-radius:var(--ha-border-radius-md)}.items p{margin-bottom:8px}ha-svg-icon{width:12px}ha-alert a{color:var(--primary-color)}`],(0,i.Cg)([(0,s.MZ)({attribute:!1})],g.prototype,"hass",void 0),(0,i.Cg)([(0,s.wk)()],g.prototype,"_open",void 0),g=(0,i.Cg)([(0,s.EM)("dialog-shortcuts")],g),o()}catch(t){o(t)}})},59992(t,e,a){a.d(e,{V:()=>n});var o=a(62826),i=a(88696),r=a(96196),s=a(94333),l=a(44457);const n=t=>{class e extends t{get scrollableElement(){return e.DEFAULT_SCROLLABLE_ELEMENT}firstUpdated(t){super.firstUpdated?.(t),this.scrollableElement&&this._updateScrollableState(this.scrollableElement),this._attachScrollableElement()}updated(t){super.updated?.(t),this._attachScrollableElement()}disconnectedCallback(){this._detachScrollableElement(),this._contentScrolled=!1,this._contentScrollable=!1,super.disconnectedCallback()}renderScrollableFades(t=!1){return r.qy` <div class="${(0,s.H)({"fade-top":!0,rounded:t,visible:this._contentScrolled})}"></div> <div class="${(0,s.H)({"fade-bottom":!0,rounded:t,visible:this._contentScrollable})}"></div> `}static get styles(){const t=Object.getPrototypeOf(this);var e;return[...void 0===(e=t?.styles??[])?[]:Array.isArray(e)?e:[e],r.AH`.fade-bottom,.fade-top{position:absolute;left:0;right:0;height:var(--ha-space-2);pointer-events:none;transition:opacity 180ms ease-in-out;border-radius:var(--ha-border-radius-square);opacity:0;background:linear-gradient(to bottom,var(--ha-color-shadow-scrollable-fade),transparent)}.fade-top{top:0}.fade-bottom{bottom:0;transform:rotate(180deg)}.fade-bottom.visible,.fade-top.visible{opacity:1}.fade-bottom.rounded,.fade-top.rounded{border-radius:var(--ha-card-border-radius,var(--ha-border-radius-lg));border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}.fade-top.rounded{border-top-left-radius:var(--ha-border-radius-square);border-top-right-radius:var(--ha-border-radius-square)}.fade-bottom.rounded{border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}`]}_attachScrollableElement(){const t=this.scrollableElement;t!==this._scrollTarget&&(this._detachScrollableElement(),t&&(this._scrollTarget=t,t.addEventListener("scroll",this._onScroll,{passive:!0}),this._resize.observe(t),this._updateScrollableState(t)))}_detachScrollableElement(){this._scrollTarget&&(this._scrollTarget.removeEventListener("scroll",this._onScroll),this._resize.unobserve?.(this._scrollTarget),this._scrollTarget=void 0)}_updateScrollableState(t){const e=parseFloat(getComputedStyle(t).getPropertyValue("--safe-area-inset-bottom"))||0,{scrollHeight:a=0,clientHeight:o=0,scrollTop:i=0}=t;this._contentScrollable=a-o>i+e+this.scrollFadeSafeAreaPadding}constructor(...t){super(...t),this._contentScrolled=!1,this._contentScrollable=!1,this._onScroll=t=>{const e=t.currentTarget;this._contentScrolled=(e.scrollTop??0)>this.scrollFadeThreshold,this._updateScrollableState(e)},this._resize=new i.P(this,{target:null,callback:t=>{const e=t[0]?.target;e&&this._updateScrollableState(e)}}),this.scrollFadeSafeAreaPadding=4,this.scrollFadeThreshold=4}}return e.DEFAULT_SCROLLABLE_ELEMENT=null,(0,o.Cg)([(0,l.wk)()],e.prototype,"_contentScrolled",void 0),(0,o.Cg)([(0,l.wk)()],e.prototype,"_contentScrollable",void 0),e}},14503(t,e,a){a.d(e,{RF:()=>r,dp:()=>n,kO:()=>l,nA:()=>s,og:()=>i});var o=a(96196);const i=o.AH`button.link{background:0 0;color:inherit;border:none;padding:0;font:inherit;text-align:left;text-decoration:underline;cursor:pointer;outline:0}`,r=o.AH`:host{font-family:var(--ha-font-family-body);-webkit-font-smoothing:var(--ha-font-smoothing);-moz-osx-font-smoothing:var(--ha-moz-osx-font-smoothing);font-size:var(--ha-font-size-m);font-weight:var(--ha-font-weight-normal);line-height:var(--ha-line-height-normal)}app-header div[sticky]{height:48px}app-toolbar [main-title]{margin-left:20px;margin-inline-start:20px;margin-inline-end:initial}h1{font-family:var(--ha-font-family-heading);-webkit-font-smoothing:var(--ha-font-smoothing);-moz-osx-font-smoothing:var(--ha-moz-osx-font-smoothing);font-size:var(--ha-font-size-2xl);font-weight:var(--ha-font-weight-normal);line-height:var(--ha-line-height-condensed)}h2{font-family:var(--ha-font-family-body);-webkit-font-smoothing:var(--ha-font-smoothing);-moz-osx-font-smoothing:var(--ha-moz-osx-font-smoothing);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:var(--ha-font-size-xl);font-weight:var(--ha-font-weight-medium);line-height:var(--ha-line-height-normal)}h3{font-family:var(--ha-font-family-body);-webkit-font-smoothing:var(--ha-font-smoothing);-moz-osx-font-smoothing:var(--ha-moz-osx-font-smoothing);font-size:var(--ha-font-size-l);font-weight:var(--ha-font-weight-normal);line-height:var(--ha-line-height-normal)}a{color:var(--primary-color)}.secondary{color:var(--secondary-text-color)}.error{color:var(--error-color)}.warning{color:var(--error-color)}${i} .card-actions a{text-decoration:none}.card-actions .warning{--mdc-theme-primary:var(--error-color)}.layout.horizontal,.layout.vertical{display:flex}.layout.inline{display:inline-flex}.layout.horizontal{flex-direction:row}.layout.vertical{flex-direction:column}.layout.wrap{flex-wrap:wrap}.layout.no-wrap{flex-wrap:nowrap}.layout.center,.layout.center-center{align-items:center}.layout.bottom{align-items:flex-end}.layout.center-center,.layout.center-justified{justify-content:center}.flex{flex:1;flex-basis:0.000000001px}.flex-auto{flex:1 1 auto}.flex-none{flex:none}.layout.justified{justify-content:space-between}`,s=o.AH`ha-dialog{--mdc-dialog-min-width:400px;--mdc-dialog-max-width:600px;--mdc-dialog-max-width:min(600px, 95vw);--justify-action-buttons:space-between;--dialog-container-padding:var(--safe-area-inset-top, 0) var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0) var(--safe-area-inset-left, 0);--dialog-surface-padding:0px}ha-dialog .form{color:var(--primary-text-color)}a{color:var(--primary-color)}@media all and (max-width:450px),all and (max-height:500px){ha-dialog{--mdc-dialog-min-width:100vw;--mdc-dialog-max-width:100vw;--mdc-dialog-min-height:100vh;--mdc-dialog-min-height:100svh;--mdc-dialog-max-height:100vh;--mdc-dialog-max-height:100svh;--dialog-container-padding:0px;--dialog-surface-padding:var(--safe-area-inset-top, 0) var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0) var(--safe-area-inset-left, 0);--vertical-align-dialog:flex-end;--ha-dialog-border-radius:var(--ha-border-radius-square)}}.error{color:var(--error-color)}`,l=o.AH`ha-dialog{--vertical-align-dialog:flex-start;--dialog-surface-margin-top:var(--ha-space-10);--mdc-dialog-max-height:calc(
      100vh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    );--mdc-dialog-max-height:calc(
      100svh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    )}@media all and (max-width:450px),all and (max-height:500px){ha-dialog{--dialog-surface-margin-top:0px;--mdc-dialog-min-height:100vh;--mdc-dialog-min-height:100svh;--mdc-dialog-max-height:100vh;--mdc-dialog-max-height:100svh}}`,n=o.AH`.ha-scrollbar::-webkit-scrollbar{width:.4rem;height:.4rem}.ha-scrollbar::-webkit-scrollbar-thumb{border-radius:var(--ha-border-radius-sm);background:var(--scrollbar-thumb-color)}.ha-scrollbar{overflow-y:auto;scrollbar-color:var(--scrollbar-thumb-color) transparent;scrollbar-width:thin}`;o.AH`body{background-color:var(--primary-background-color);color:var(--primary-text-color);height:calc(100vh - 32px);width:100vw}`},41570(t,e,a){a.d(e,{c:()=>o});const o=/Mac/i.test(navigator.userAgent)}};
//# sourceMappingURL=72432.a4db11b384eeb308.js.map