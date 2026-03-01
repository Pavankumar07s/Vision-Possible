export const __rspack_esm_id="3507";export const __rspack_esm_ids=["3507"];export const __webpack_modules__={77090(e,t,a){a.d(t,{s:()=>i});const i=e=>!(!e.detail.selected||"property"!==e.detail.source)&&(e.currentTarget.selected=!1,!0)},45331(e,t,a){a.a(e,async function(e,t){try{var i=a(62826),o=a(93900),s=a(96196),r=a(44457),l=a(32288),n=a(1087),d=a(59992),c=a(14503),h=(a(76538),a(26300),e([o]));o=(h.then?(await h)():h)[0];const p="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class g extends((0,d.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){return s.qy` <wa-dialog .open="${this._open}" .lightDismiss="${!this.preventScrimClose}" without-header aria-labelledby="${(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0))}" aria-describedby="${(0,l.J)(this.ariaDescribedBy)}" @keydown="${this._handleKeyDown}" @wa-hide="${this._handleHide}" @wa-show="${this._handleShow}" @wa-after-show="${this._handleAfterShow}" @wa-after-hide="${this._handleAfterHide}"> ${this.withoutHeader?s.s6:s.qy` <slot name="header"> <ha-dialog-header .subtitlePosition="${this.headerSubtitlePosition}" .showBorder="${this._bodyScrolled}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${this.hass?.localize("ui.common.close")??"Close"}" .path="${p}"></ha-icon-button> </slot> ${void 0!==this.headerTitle?s.qy`<span slot="title" class="title" id="ha-wa-dialog-title"> ${this.headerTitle} </span>`:s.qy`<slot name="headerTitle" slot="title"></slot>`} ${void 0!==this.headerSubtitle?s.qy`<span slot="subtitle">${this.headerSubtitle}</span>`:s.qy`<slot name="headerSubtitle" slot="subtitle"></slot>`} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${this._handleBodyScroll}"> <slot></slot> </div> ${this.renderScrollableFades()} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,c.dp,s.AH`
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
      `]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{this.querySelector("[autofocus]")?.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],g.prototype,"hass",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],g.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],g.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],g.prototype,"open",void 0),(0,i.Cg)([(0,r.MZ)({reflect:!0})],g.prototype,"type",void 0),(0,i.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],g.prototype,"width",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],g.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-title"})],g.prototype,"headerTitle",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],g.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],g.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],g.prototype,"flexContent",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],g.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,r.wk)()],g.prototype,"_open",void 0),(0,i.Cg)([(0,r.P)(".body")],g.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,r.wk)()],g.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,r.Ls)({passive:!0})],g.prototype,"_handleBodyScroll",null),g=(0,i.Cg)([(0,r.EM)("ha-wa-dialog")],g),t()}catch(e){t(e)}})},10139(e,t,a){a.d(t,{I$:()=>c,I3:()=>v,PV:()=>f,Po:()=>g,RK:()=>_,TB:()=>h,TH:()=>w,T_:()=>y,am:()=>r,jR:()=>d,ng:()=>l,nx:()=>b,o9:()=>n});var i=a(28978),o=a(88249),s=a(59241);const r=(e,t)=>e.callWS({type:"device_automation/action/list",device_id:t}),l=(e,t)=>e.callWS({type:"device_automation/condition/list",device_id:t}),n=(e,t)=>e.callWS({type:"device_automation/trigger/list",device_id:t}).then(e=>(0,o.vO)(e)),d=(e,t)=>e.callWS({type:"device_automation/action/capabilities",action:t}),c=(e,t)=>e.callWS({type:"device_automation/condition/capabilities",condition:t}),h=(e,t)=>e.callWS({type:"device_automation/trigger/capabilities",trigger:t}),p=["device_id","domain","entity_id","type","subtype","event","condition","trigger"],g=(e,t,a)=>{if(typeof t!=typeof a)return!1;for(const i in t)if(p.includes(i))if("entity_id"!==i||t[i]?.includes(".")===a[i]?.includes(".")){if(!Object.is(t[i],a[i]))return!1}else if(!u(e,t[i],a[i]))return!1;for(const i in a)if(p.includes(i))if("entity_id"!==i||t[i]?.includes(".")===a[i]?.includes(".")){if(!Object.is(t[i],a[i]))return!1}else if(!u(e,t[i],a[i]))return!1;return!0},u=(e,t,a)=>{if(!t||!a)return!1;if(t.includes(".")){const a=(0,s.Ox)(e)[t];if(!a)return!1;t=a.id}if(a.includes(".")){const t=(0,s.Ox)(e)[a];if(!t)return!1;a=t.id}return t===a},m=(e,t,a)=>{if(!a)return"<"+e.localize("ui.panel.config.automation.editor.unknown_entity")+">";if(a.includes(".")){const t=e.states[a];return t?(0,i.u)(t):a}const o=(0,s.P9)(t)[a];return o?(0,s.jh)(e,o)||a:"<"+e.localize("ui.panel.config.automation.editor.unknown_entity")+">"},f=(e,t,a)=>e.localize(`component.${a.domain}.device_automation.action_type.${a.type}`,{entity_name:m(e,t,a.entity_id),subtype:a.subtype?e.localize(`component.${a.domain}.device_automation.action_subtype.${a.subtype}`)||a.subtype:""})||(a.subtype?`"${a.subtype}" ${a.type}`:a.type),v=(e,t,a)=>e.localize(`component.${a.domain}.device_automation.condition_type.${a.type}`,{entity_name:m(e,t,a.entity_id),subtype:a.subtype?e.localize(`component.${a.domain}.device_automation.condition_subtype.${a.subtype}`)||a.subtype:""})||(a.subtype?`"${a.subtype}" ${a.type}`:a.type),b=(e,t,a)=>e.localize(`component.${a.domain}.device_automation.trigger_type.${a.type}`,{entity_name:m(e,t,a.entity_id),subtype:a.subtype?e.localize(`component.${a.domain}.device_automation.trigger_subtype.${a.subtype}`)||a.subtype:""})||(a.subtype?`"${a.subtype}" ${a.type}`:a.type),y=(e,t)=>a=>e.localize(`component.${t.domain}.device_automation.extra_fields.${a.name}`)||a.name,w=(e,t)=>a=>e.localize(`component.${t.domain}.device_automation.extra_fields_descriptions.${a.name}`),_=(e,t)=>e.metadata?.secondary&&!t.metadata?.secondary?1:!e.metadata?.secondary&&t.metadata?.secondary?-1:0},59992(e,t,a){a.d(t,{V:()=>n});var i=a(62826),o=a(88696),s=a(96196),r=a(94333),l=a(44457);const n=e=>{class t extends e{get scrollableElement(){return t.DEFAULT_SCROLLABLE_ELEMENT}firstUpdated(e){super.firstUpdated?.(e),this.scrollableElement&&this._updateScrollableState(this.scrollableElement),this._attachScrollableElement()}updated(e){super.updated?.(e),this._attachScrollableElement()}disconnectedCallback(){this._detachScrollableElement(),this._contentScrolled=!1,this._contentScrollable=!1,super.disconnectedCallback()}renderScrollableFades(e=!1){return s.qy` <div class="${(0,r.H)({"fade-top":!0,rounded:e,visible:this._contentScrolled})}"></div> <div class="${(0,r.H)({"fade-bottom":!0,rounded:e,visible:this._contentScrollable})}"></div> `}static get styles(){const e=Object.getPrototypeOf(this);var t;return[...void 0===(t=e?.styles??[])?[]:Array.isArray(t)?t:[t],s.AH`.fade-bottom,.fade-top{position:absolute;left:0;right:0;height:var(--ha-space-2);pointer-events:none;transition:opacity 180ms ease-in-out;border-radius:var(--ha-border-radius-square);opacity:0;background:linear-gradient(to bottom,var(--ha-color-shadow-scrollable-fade),transparent)}.fade-top{top:0}.fade-bottom{bottom:0;transform:rotate(180deg)}.fade-bottom.visible,.fade-top.visible{opacity:1}.fade-bottom.rounded,.fade-top.rounded{border-radius:var(--ha-card-border-radius,var(--ha-border-radius-lg));border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}.fade-top.rounded{border-top-left-radius:var(--ha-border-radius-square);border-top-right-radius:var(--ha-border-radius-square)}.fade-bottom.rounded{border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}`]}_attachScrollableElement(){const e=this.scrollableElement;e!==this._scrollTarget&&(this._detachScrollableElement(),e&&(this._scrollTarget=e,e.addEventListener("scroll",this._onScroll,{passive:!0}),this._resize.observe(e),this._updateScrollableState(e)))}_detachScrollableElement(){this._scrollTarget&&(this._scrollTarget.removeEventListener("scroll",this._onScroll),this._resize.unobserve?.(this._scrollTarget),this._scrollTarget=void 0)}_updateScrollableState(e){const t=parseFloat(getComputedStyle(e).getPropertyValue("--safe-area-inset-bottom"))||0,{scrollHeight:a=0,clientHeight:i=0,scrollTop:o=0}=e;this._contentScrollable=a-i>o+t+this.scrollFadeSafeAreaPadding}constructor(...e){super(...e),this._contentScrolled=!1,this._contentScrollable=!1,this._onScroll=e=>{const t=e.currentTarget;this._contentScrolled=(t.scrollTop??0)>this.scrollFadeThreshold,this._updateScrollableState(t)},this._resize=new o.P(this,{target:null,callback:e=>{const t=e[0]?.target;t&&this._updateScrollableState(t)}}),this.scrollFadeSafeAreaPadding=4,this.scrollFadeThreshold=4}}return t.DEFAULT_SCROLLABLE_ELEMENT=null,(0,i.Cg)([(0,l.wk)()],t.prototype,"_contentScrolled",void 0),(0,i.Cg)([(0,l.wk)()],t.prototype,"_contentScrollable",void 0),t}},80830(e,t,a){a.a(e,async function(e,i){try{a.r(t),a.d(t,{DialogDeviceAutomation:()=>y});var o=a(62826),s=a(96196),r=a(44457),l=a(1087),n=a(77090),d=(a(43661),a(8630),a(28732),a(45331)),c=a(88249),h=a(10139),p=a(84025),g=a(14503),u=e([d]);d=(u.then?(await u)():u)[0];const m="M4 2A2 2 0 0 0 2 4V12H4V8H6V12H8V4A2 2 0 0 0 6 2H4M4 4H6V6H4M22 15.5V14A2 2 0 0 0 20 12H16V22H20A2 2 0 0 0 22 20V18.5A1.54 1.54 0 0 0 20.5 17A1.54 1.54 0 0 0 22 15.5M20 20H18V18H20V20M20 16H18V14H20M5.79 21.61L4.21 20.39L18.21 2.39L19.79 3.61Z",f="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z",v="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z",b="M12,5A2,2 0 0,1 14,7C14,7.24 13.96,7.47 13.88,7.69C17.95,8.5 21,11.91 21,16H3C3,11.91 6.05,8.5 10.12,7.69C10.04,7.47 10,7.24 10,7A2,2 0 0,1 12,5M22,19H2V17H22V19Z";class y extends s.WF{async showDialog(e){this._params=e,this._open=!0,await this.updateComplete}closeDialog(){this._open=!1}_dialogClosed(){this._params=void 0,(0,l.r)(this,"dialog-closed",{dialog:this.localName})}firstUpdated(e){super.firstUpdated(e),this.hass.loadBackendTranslation("device_automation")}updated(e){if(super.updated(e),!e.has("_params"))return;if(this._triggers=[],this._conditions=[],this._actions=[],!this._params)return;const{device:t,script:a}=this._params;(0,h.am)(this.hass,t.id).then(e=>{this._actions=e.sort(h.RK)}),a||((0,h.o9)(this.hass,t.id).then(e=>{this._triggers=e.sort(h.RK)}),(0,h.ng)(this.hass,t.id).then(e=>{this._conditions=e.sort(h.RK)}))}render(){if(!this._params)return s.s6;const e=this._params.script?"script":"automation",t=this.hass.localize(`ui.panel.config.devices.${e}.create`,{type:this.hass.localize(`ui.panel.config.devices.type.${this._params.device.entry_type||"device"}`)});return s.qy` <ha-wa-dialog .hass="${this.hass}" .open="${this._open}" header-title="${t}" @closed="${this._dialogClosed}"> <ha-list innerRole="listbox" itemRoles="option" innerAriaLabel="Create new automation" rootTabbable autofocus> ${this._triggers.length?s.qy` <ha-list-item hasmeta twoline graphic="icon" .type="${"trigger"}" @request-selected="${this._handleRowClick}"> <ha-svg-icon slot="graphic" .path="${f}"></ha-svg-icon> ${this.hass.localize("ui.panel.config.devices.automation.triggers.title")} <span slot="secondary"> ${this.hass.localize("ui.panel.config.devices.automation.triggers.description")} </span> <ha-icon-next slot="meta"></ha-icon-next> </ha-list-item> `:s.s6} ${this._conditions.length?s.qy` <ha-list-item hasmeta twoline graphic="icon" .type="${"condition"}" @request-selected="${this._handleRowClick}"> <ha-svg-icon slot="graphic" .path="${m}"></ha-svg-icon> ${this.hass.localize("ui.panel.config.devices.automation.conditions.title")} <span slot="secondary"> ${this.hass.localize("ui.panel.config.devices.automation.conditions.description")} </span> <ha-icon-next slot="meta"></ha-icon-next> </ha-list-item> `:s.s6} ${this._actions.length?s.qy` <ha-list-item hasmeta twoline graphic="icon" .type="${"action"}" @request-selected="${this._handleRowClick}"> <ha-svg-icon slot="graphic" .path="${b}"></ha-svg-icon> ${this.hass.localize(`ui.panel.config.devices.${e}.actions.title`)} <span slot="secondary"> ${this.hass.localize(`ui.panel.config.devices.${e}.actions.description`)} </span> <ha-icon-next slot="meta"></ha-icon-next> </ha-list-item> `:s.s6} ${this._triggers.length||this._conditions.length||this._actions.length?s.qy`<li divider role="separator"></li>`:s.s6} <ha-list-item hasmeta twoline graphic="icon" @request-selected="${this._handleRowClick}"> <ha-svg-icon slot="graphic" .path="${v}"></ha-svg-icon> ${this.hass.localize(`ui.panel.config.devices.${e}.new.title`)} <span slot="secondary"> ${this.hass.localize(`ui.panel.config.devices.${e}.new.description`)} </span> <ha-icon-next slot="meta"></ha-icon-next> </ha-list-item> </ha-list> </ha-wa-dialog> `}static get styles(){return[g.RF,g.nA,s.AH`ha-wa-dialog{--dialog-content-padding:0;--mdc-dialog-max-height:60vh}@media all and (min-width:550px){ha-wa-dialog{--mdc-dialog-min-width:500px}}ha-icon-next{width:24px}`]}constructor(...e){super(...e),this._triggers=[],this._conditions=[],this._actions=[],this._open=!1,this._handleRowClick=e=>{if(!(0,n.s)(e)||!this._params)return;const t=e.currentTarget.type,a=this._params.script;if(this.closeDialog(),a){const e={};"action"===t&&(e.sequence=[this._actions[0]]),(0,p.AM)(e,!0)}else{const e={};"trigger"===t&&(e.triggers=[this._triggers[0]]),"condition"===t&&(e.conditions=[this._conditions[0]]),"action"===t&&(e.actions=[this._actions[0]]),(0,c.mX)(e,!0)}}}}(0,o.Cg)([(0,r.MZ)({attribute:!1})],y.prototype,"hass",void 0),(0,o.Cg)([(0,r.wk)()],y.prototype,"_triggers",void 0),(0,o.Cg)([(0,r.wk)()],y.prototype,"_conditions",void 0),(0,o.Cg)([(0,r.wk)()],y.prototype,"_actions",void 0),(0,o.Cg)([(0,r.wk)()],y.prototype,"_params",void 0),(0,o.Cg)([(0,r.wk)()],y.prototype,"_open",void 0),y=(0,o.Cg)([(0,r.EM)("dialog-device-automation")],y),i()}catch(e){i(e)}})},99793(e,t,a){a.d(t,{A:()=>i});const i=a(96196).AH`:host{--width:31rem;--spacing:var(--wa-space-l);--show-duration:200ms;--hide-duration:200ms;display:none}:host([open]){display:block}.dialog{display:flex;flex-direction:column;top:0;right:0;bottom:0;left:0;width:var(--width);max-width:calc(100% - var(--wa-space-2xl));max-height:calc(100% - var(--wa-space-2xl));background-color:var(--wa-color-surface-raised);border-radius:var(--wa-panel-border-radius);border:none;box-shadow:var(--wa-shadow-l);padding:0;margin:auto}.dialog.show{animation:show-dialog var(--show-duration) ease}.dialog.show::backdrop{animation:show-backdrop var(--show-duration,200ms) ease}.dialog.hide{animation:show-dialog var(--hide-duration) ease reverse}.dialog.hide::backdrop{animation:show-backdrop var(--hide-duration,200ms) ease reverse}.dialog.pulse{animation:pulse 250ms ease}.dialog:focus{outline:0}@media screen and (max-width:420px){.dialog{max-height:80vh}}.open{display:flex;opacity:1}.header{flex:0 0 auto;display:flex;flex-wrap:nowrap;padding-inline-start:var(--spacing);padding-block-end:0;padding-inline-end:calc(var(--spacing) - var(--wa-form-control-padding-block));padding-block-start:calc(var(--spacing) - var(--wa-form-control-padding-block))}.title{align-self:center;flex:1 1 auto;font-family:inherit;font-size:var(--wa-font-size-l);font-weight:var(--wa-font-weight-heading);line-height:var(--wa-line-height-condensed);margin:0}.header-actions{align-self:start;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:end;gap:var(--wa-space-2xs);padding-inline-start:var(--spacing)}.header-actions ::slotted(wa-button),.header-actions wa-button{flex:0 0 auto;display:flex;align-items:center}.body{flex:1 1 auto;display:block;padding:var(--spacing);overflow:auto;-webkit-overflow-scrolling:touch}.body:focus{outline:0}.body:focus-visible{outline:var(--wa-focus-ring);outline-offset:var(--wa-focus-ring-offset)}.footer{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:var(--wa-space-xs);justify-content:end;padding:var(--spacing);padding-block-start:0}.footer ::slotted(wa-button:not(:first-of-type)){margin-inline-start:var(--wa-spacing-xs)}.dialog::backdrop{background-color:var(--wa-color-overlay-modal,rgb(0 0 0 / .25))}@keyframes pulse{0%{scale:1}50%{scale:1.02}100%{scale:1}}@keyframes show-dialog{from{opacity:0;scale:0.8}to{opacity:1;scale:1}}@keyframes show-backdrop{from{opacity:0}to{opacity:1}}@media (forced-colors:active){.dialog{border:solid 1px #fff}}`},93900(e,t,a){a.a(e,async function(e,t){try{var i=a(96196),o=a(44457),s=a(94333),r=a(32288),l=a(17051),n=a(42462),d=a(28438),c=a(98779),h=a(27259),p=a(31247),g=a(93949),u=a(92070),m=a(9395),f=a(32510),v=a(17060),b=a(88496),y=a(99793),w=e([b,v]);[b,v]=w.then?(await w)():w;var _=Object.defineProperty,x=Object.getOwnPropertyDescriptor,C=(e,t,a,i)=>{for(var o,s=i>1?void 0:i?x(t,a):t,r=e.length-1;r>=0;r--)(o=e[r])&&(s=(i?o(t,a,s):o(s))||s);return i&&s&&_(t,a,s),s};let $=class extends f.A{firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),(0,g.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,g.I7)(this),this.removeOpenListeners()}async requestClose(e){const t=new d.L({source:e});if(this.dispatchEvent(t),t.defaultPrevented)return this.open=!0,void(0,h.Ud)(this.dialog,"pulse");this.removeOpenListeners(),await(0,h.Ud)(this.dialog,"hide"),this.open=!1,this.dialog.close(),(0,g.I7)(this);const a=this.originalTrigger;"function"==typeof a?.focus&&setTimeout(()=>a.focus()),this.dispatchEvent(new l.Z)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(e){e.preventDefault(),this.dialog.classList.contains("hide")||e.target!==this.dialog||this.requestClose(this.dialog)}handleDialogClick(e){const t=e.target.closest('[data-dialog="close"]');t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await(0,h.Ud)(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const e=new c.k;this.dispatchEvent(e),e.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),(0,g.JG)(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&"function"==typeof e.focus?e.focus():this.dialog.focus()}),await(0,h.Ud)(this.dialog,"show"),this.dispatchEvent(new n.q))}render(){const e=!this.withoutHeader,t=this.hasSlotController.test("footer");return i.qy` <dialog aria-labelledby="${this.ariaLabelledby??"title"}" aria-describedby="${(0,r.J)(this.ariaDescribedby)}" part="dialog" class="${(0,s.H)({dialog:!0,open:this.open})}" @cancel="${this.handleDialogCancel}" @click="${this.handleDialogClick}" @pointerdown="${this.handleDialogPointerDown}"> ${e?i.qy` <header part="header" class="header"> <h2 part="title" class="title" id="title"> <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(8203)} </slot> </h2> <div part="header-actions" class="header-actions"> <slot name="header-actions"></slot> <wa-button part="close-button" exportparts="base:close-button__base" class="close" appearance="plain" @click="${e=>this.requestClose(e.target)}"> <wa-icon name="xmark" label="${this.localize.term("close")}" library="system" variant="solid"></wa-icon> </wa-button> </div> </header> `:""} <div part="body" class="body"><slot></slot></div> ${t?i.qy` <footer part="footer" class="footer"> <slot name="footer"></slot> </footer> `:""} </dialog> `}constructor(){super(...arguments),this.localize=new v.c(this),this.hasSlotController=new u.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}};$.css=y.A,C([(0,o.P)(".dialog")],$.prototype,"dialog",2),C([(0,o.MZ)({type:Boolean,reflect:!0})],$.prototype,"open",2),C([(0,o.MZ)({reflect:!0})],$.prototype,"label",2),C([(0,o.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],$.prototype,"withoutHeader",2),C([(0,o.MZ)({attribute:"light-dismiss",type:Boolean})],$.prototype,"lightDismiss",2),C([(0,o.MZ)({attribute:"aria-labelledby"})],$.prototype,"ariaLabelledby",2),C([(0,o.MZ)({attribute:"aria-describedby"})],$.prototype,"ariaDescribedby",2),C([(0,m.w)("open",{waitUntilFirstUpdate:!0})],$.prototype,"handleOpenChange",1),$=C([(0,o.EM)("wa-dialog")],$),document.addEventListener("click",e=>{const t=e.target.closest("[data-dialog]");if(t instanceof Element){const[e,a]=(0,p.v)(t.getAttribute("data-dialog")||"");if("open"===e&&a?.length){const e=t.getRootNode().getElementById(a);"wa-dialog"===e?.localName?e.open=!0:console.warn(`A dialog with an ID of "${a}" could not be found in this document.`)}}}),i.S$||document.addEventListener("pointerdown",()=>{}),t()}catch(e){t(e)}})},31247(e,t,a){a.d(t,{v:()=>i});a(18111),a(22489),a(61701);function i(e){return e.split(" ").map(e=>e.trim()).filter(e=>""!==e)}},93949(e,t,a){a.d(t,{Rt:()=>r,I7:()=>s,JG:()=>o});a(17642),a(58004),a(33853),a(45876),a(32475),a(15024),a(31698);const i=new Set;function o(e){if(i.add(e),!document.documentElement.classList.contains("wa-scroll-lock")){const e=function(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}()+function(){const e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(e)||!e?0:e}();let t=getComputedStyle(document.documentElement).scrollbarGutter;t&&"auto"!==t||(t="stable"),e<2&&(t=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",t),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function s(e){i.delete(e),0===i.size&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function r(e,t,a="vertical",i="smooth"){const o=function(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}(e,t),s=o.top+t.scrollTop,r=o.left+t.scrollLeft,l=t.scrollLeft,n=t.scrollLeft+t.offsetWidth,d=t.scrollTop,c=t.scrollTop+t.offsetHeight;"horizontal"!==a&&"both"!==a||(r<l?t.scrollTo({left:r,behavior:i}):r+e.clientWidth>n&&t.scrollTo({left:r-t.offsetWidth+e.clientWidth,behavior:i})),"vertical"!==a&&"both"!==a||(s<d?t.scrollTo({top:s,behavior:i}):s+e.clientHeight>c&&t.scrollTo({top:s-t.offsetHeight+e.clientHeight,behavior:i}))}}};
//# sourceMappingURL=3507.e29fb0a1da04156b.js.map