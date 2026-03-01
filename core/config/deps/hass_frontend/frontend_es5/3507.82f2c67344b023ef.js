"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["3507"],{77090:function(t,e,a){a.d(e,{s:function(){return i}});const i=t=>!(!t.detail.selected||"property"!==t.detail.source)&&(t.currentTarget.selected=!1,!0)},45331:function(t,e,a){a.a(t,async function(t,e){try{a(3362),a(62953);var i=a(40445),o=a(93900),s=a(96196),n=a(77845),r=a(32288),l=a(1087),d=a(59992),c=a(14503),h=(a(76538),a(26300),t([o,d]));[o,d]=h.then?(await h)():h;let p,u,g,f,v,m,y,b=t=>t;const w="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class _ extends((0,d.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(t){super.updated(t),t.has("open")&&(this._open=this.open)}render(){var t,e;return(0,s.qy)(p||(p=b` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,r.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,r.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?s.s6:(0,s.qy)(u||(u=b` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(t=null===(e=this.hass)||void 0===e?void 0:e.localize("ui.common.close"))&&void 0!==t?t:"Close",w,void 0!==this.headerTitle?(0,s.qy)(g||(g=b`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,s.qy)(f||(f=b`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,s.qy)(v||(v=b`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,s.qy)(m||(m=b`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(t){this._bodyScrolled=t.target.scrollTop>0}_handleKeyDown(t){"Escape"===t.key&&(this._escapePressed=!0)}_handleHide(t){this.preventScrimClose&&this._escapePressed&&t.detail.source===t.target.dialog&&t.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,c.dp,(0,s.AH)(y||(y=b`
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
      `))]}constructor(...t){super(...t),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,l.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var t;null===(t=this.querySelector("[autofocus]"))||void 0===t||t.focus()})},this._handleAfterShow=()=>{(0,l.r)(this,"after-show")},this._handleAfterHide=t=>{t.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,l.r)(this,"closed"))}}}(0,i.Cg)([(0,n.MZ)({attribute:!1})],_.prototype,"hass",void 0),(0,i.Cg)([(0,n.MZ)({attribute:"aria-labelledby"})],_.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,n.MZ)({attribute:"aria-describedby"})],_.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,n.MZ)({type:Boolean,reflect:!0})],_.prototype,"open",void 0),(0,i.Cg)([(0,n.MZ)({reflect:!0})],_.prototype,"type",void 0),(0,i.Cg)([(0,n.MZ)({type:String,reflect:!0,attribute:"width"})],_.prototype,"width",void 0),(0,i.Cg)([(0,n.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],_.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,n.MZ)({attribute:"header-title"})],_.prototype,"headerTitle",void 0),(0,i.Cg)([(0,n.MZ)({attribute:"header-subtitle"})],_.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,n.MZ)({type:String,attribute:"header-subtitle-position"})],_.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,n.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],_.prototype,"flexContent",void 0),(0,i.Cg)([(0,n.MZ)({type:Boolean,attribute:"without-header"})],_.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,n.wk)()],_.prototype,"_open",void 0),(0,i.Cg)([(0,n.P)(".body")],_.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,n.wk)()],_.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,n.Ls)({passive:!0})],_.prototype,"_handleBodyScroll",null),_=(0,i.Cg)([(0,n.EM)("ha-wa-dialog")],_),e()}catch(p){e(p)}})},10139:function(t,e,a){a.d(e,{I$:function(){return c},I3:function(){return m},PV:function(){return v},Po:function(){return u},RK:function(){return _},TB:function(){return h},TH:function(){return w},T_:function(){return b},am:function(){return n},jR:function(){return d},ng:function(){return r},nx:function(){return y},o9:function(){return l}});a(74423);var i=a(28978),o=a(88249),s=a(59241);const n=(t,e)=>t.callWS({type:"device_automation/action/list",device_id:e}),r=(t,e)=>t.callWS({type:"device_automation/condition/list",device_id:e}),l=(t,e)=>t.callWS({type:"device_automation/trigger/list",device_id:e}).then(t=>(0,o.vO)(t)),d=(t,e)=>t.callWS({type:"device_automation/action/capabilities",action:e}),c=(t,e)=>t.callWS({type:"device_automation/condition/capabilities",condition:e}),h=(t,e)=>t.callWS({type:"device_automation/trigger/capabilities",trigger:e}),p=["device_id","domain","entity_id","type","subtype","event","condition","trigger"],u=(t,e,a)=>{if(typeof e!=typeof a)return!1;for(const r in e){var i,o;if(p.includes(r))if("entity_id"!==r||(null===(i=e[r])||void 0===i?void 0:i.includes("."))===(null===(o=a[r])||void 0===o?void 0:o.includes("."))){if(!Object.is(e[r],a[r]))return!1}else if(!g(t,e[r],a[r]))return!1}for(const r in a){var s,n;if(p.includes(r))if("entity_id"!==r||(null===(s=e[r])||void 0===s?void 0:s.includes("."))===(null===(n=a[r])||void 0===n?void 0:n.includes("."))){if(!Object.is(e[r],a[r]))return!1}else if(!g(t,e[r],a[r]))return!1}return!0},g=(t,e,a)=>{if(!e||!a)return!1;if(e.includes(".")){const a=(0,s.Ox)(t)[e];if(!a)return!1;e=a.id}if(a.includes(".")){const e=(0,s.Ox)(t)[a];if(!e)return!1;a=e.id}return e===a},f=(t,e,a)=>{if(!a)return"<"+t.localize("ui.panel.config.automation.editor.unknown_entity")+">";if(a.includes(".")){const e=t.states[a];return e?(0,i.u)(e):a}const o=(0,s.P9)(e)[a];return o?(0,s.jh)(t,o)||a:"<"+t.localize("ui.panel.config.automation.editor.unknown_entity")+">"},v=(t,e,a)=>t.localize(`component.${a.domain}.device_automation.action_type.${a.type}`,{entity_name:f(t,e,a.entity_id),subtype:a.subtype?t.localize(`component.${a.domain}.device_automation.action_subtype.${a.subtype}`)||a.subtype:""})||(a.subtype?`"${a.subtype}" ${a.type}`:a.type),m=(t,e,a)=>t.localize(`component.${a.domain}.device_automation.condition_type.${a.type}`,{entity_name:f(t,e,a.entity_id),subtype:a.subtype?t.localize(`component.${a.domain}.device_automation.condition_subtype.${a.subtype}`)||a.subtype:""})||(a.subtype?`"${a.subtype}" ${a.type}`:a.type),y=(t,e,a)=>t.localize(`component.${a.domain}.device_automation.trigger_type.${a.type}`,{entity_name:f(t,e,a.entity_id),subtype:a.subtype?t.localize(`component.${a.domain}.device_automation.trigger_subtype.${a.subtype}`)||a.subtype:""})||(a.subtype?`"${a.subtype}" ${a.type}`:a.type),b=(t,e)=>a=>t.localize(`component.${e.domain}.device_automation.extra_fields.${a.name}`)||a.name,w=(t,e)=>a=>t.localize(`component.${e.domain}.device_automation.extra_fields_descriptions.${a.name}`),_=(t,e)=>{var a,i,o,s;return null===(a=t.metadata)||void 0===a||!a.secondary||null!==(i=e.metadata)&&void 0!==i&&i.secondary?null!==(o=t.metadata)&&void 0!==o&&o.secondary||null===(s=e.metadata)||void 0===s||!s.secondary?0:-1:1}},59992:function(t,e,a){a.a(t,async function(t,i){try{a.d(e,{V:function(){return g}});a(62953);var o=a(40445),s=a(88696),n=a(96196),r=a(94333),l=a(77845),d=t([s]);s=(d.then?(await d)():d)[0];let c,h,p=t=>t;const u=t=>void 0===t?[]:Array.isArray(t)?t:[t],g=t=>{class e extends t{get scrollableElement(){return e.DEFAULT_SCROLLABLE_ELEMENT}firstUpdated(t){var e;null===(e=super.firstUpdated)||void 0===e||e.call(this,t),this.scrollableElement&&this._updateScrollableState(this.scrollableElement),this._attachScrollableElement()}updated(t){var e;null===(e=super.updated)||void 0===e||e.call(this,t),this._attachScrollableElement()}disconnectedCallback(){this._detachScrollableElement(),this._contentScrolled=!1,this._contentScrollable=!1,super.disconnectedCallback()}renderScrollableFades(t=!1){return(0,n.qy)(c||(c=p` <div class="${0}"></div> <div class="${0}"></div> `),(0,r.H)({"fade-top":!0,rounded:t,visible:this._contentScrolled}),(0,r.H)({"fade-bottom":!0,rounded:t,visible:this._contentScrollable}))}static get styles(){var t;const e=Object.getPrototypeOf(this);return[...u(null!==(t=null==e?void 0:e.styles)&&void 0!==t?t:[]),(0,n.AH)(h||(h=p`.fade-bottom,.fade-top{position:absolute;left:0;right:0;height:var(--ha-space-2);pointer-events:none;transition:opacity 180ms ease-in-out;border-radius:var(--ha-border-radius-square);opacity:0;background:linear-gradient(to bottom,var(--ha-color-shadow-scrollable-fade),transparent)}.fade-top{top:0}.fade-bottom{bottom:0;transform:rotate(180deg)}.fade-bottom.visible,.fade-top.visible{opacity:1}.fade-bottom.rounded,.fade-top.rounded{border-radius:var(--ha-card-border-radius,var(--ha-border-radius-lg));border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}.fade-top.rounded{border-top-left-radius:var(--ha-border-radius-square);border-top-right-radius:var(--ha-border-radius-square)}.fade-bottom.rounded{border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}`))]}_attachScrollableElement(){const t=this.scrollableElement;t!==this._scrollTarget&&(this._detachScrollableElement(),t&&(this._scrollTarget=t,t.addEventListener("scroll",this._onScroll,{passive:!0}),this._resize.observe(t),this._updateScrollableState(t)))}_detachScrollableElement(){var t,e;this._scrollTarget&&(this._scrollTarget.removeEventListener("scroll",this._onScroll),null===(t=(e=this._resize).unobserve)||void 0===t||t.call(e,this._scrollTarget),this._scrollTarget=void 0)}_updateScrollableState(t){const e=parseFloat(getComputedStyle(t).getPropertyValue("--safe-area-inset-bottom"))||0,{scrollHeight:a=0,clientHeight:i=0,scrollTop:o=0}=t;this._contentScrollable=a-i>o+e+this.scrollFadeSafeAreaPadding}constructor(...t){super(...t),this._contentScrolled=!1,this._contentScrollable=!1,this._onScroll=t=>{var e;const a=t.currentTarget;this._contentScrolled=(null!==(e=a.scrollTop)&&void 0!==e?e:0)>this.scrollFadeThreshold,this._updateScrollableState(a)},this._resize=new s.P(this,{target:null,callback:t=>{var e;const a=null===(e=t[0])||void 0===e?void 0:e.target;a&&this._updateScrollableState(a)}}),this.scrollFadeSafeAreaPadding=4,this.scrollFadeThreshold=4}}return e.DEFAULT_SCROLLABLE_ELEMENT=null,(0,o.Cg)([(0,l.wk)()],e.prototype,"_contentScrolled",void 0),(0,o.Cg)([(0,l.wk)()],e.prototype,"_contentScrollable",void 0),e};i()}catch(c){i(c)}})},80830:function(t,e,a){a.a(t,async function(t,i){try{a.r(e),a.d(e,{DialogDeviceAutomation:function(){return k}});a(26910),a(3362),a(62953);var o=a(40445),s=a(96196),n=a(77845),r=a(1087),l=a(77090),d=(a(43661),a(8630),a(28732),a(45331)),c=a(88249),h=a(10139),p=a(84025),u=a(14503),g=t([d]);d=(g.then?(await g)():g)[0];let f,v,m,y,b,w,_=t=>t;const x="M4 2A2 2 0 0 0 2 4V12H4V8H6V12H8V4A2 2 0 0 0 6 2H4M4 4H6V6H4M22 15.5V14A2 2 0 0 0 20 12H16V22H20A2 2 0 0 0 22 20V18.5A1.54 1.54 0 0 0 20.5 17A1.54 1.54 0 0 0 22 15.5M20 20H18V18H20V20M20 16H18V14H20M5.79 21.61L4.21 20.39L18.21 2.39L19.79 3.61Z",C="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z",$="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z",S="M12,5A2,2 0 0,1 14,7C14,7.24 13.96,7.47 13.88,7.69C17.95,8.5 21,11.91 21,16H3C3,11.91 6.05,8.5 10.12,7.69C10.04,7.47 10,7.24 10,7A2,2 0 0,1 12,5M22,19H2V17H22V19Z";class k extends s.WF{async showDialog(t){this._params=t,this._open=!0,await this.updateComplete}closeDialog(){this._open=!1}_dialogClosed(){this._params=void 0,(0,r.r)(this,"dialog-closed",{dialog:this.localName})}firstUpdated(t){super.firstUpdated(t),this.hass.loadBackendTranslation("device_automation")}updated(t){if(super.updated(t),!t.has("_params"))return;if(this._triggers=[],this._conditions=[],this._actions=[],!this._params)return;const{device:e,script:a}=this._params;(0,h.am)(this.hass,e.id).then(t=>{this._actions=t.sort(h.RK)}),a||((0,h.o9)(this.hass,e.id).then(t=>{this._triggers=t.sort(h.RK)}),(0,h.ng)(this.hass,e.id).then(t=>{this._conditions=t.sort(h.RK)}))}render(){if(!this._params)return s.s6;const t=this._params.script?"script":"automation",e=this.hass.localize(`ui.panel.config.devices.${t}.create`,{type:this.hass.localize(`ui.panel.config.devices.type.${this._params.device.entry_type||"device"}`)});return(0,s.qy)(f||(f=_` <ha-wa-dialog .hass="${0}" .open="${0}" header-title="${0}" @closed="${0}"> <ha-list innerRole="listbox" itemRoles="option" innerAriaLabel="Create new automation" rootTabbable autofocus> ${0} ${0} ${0} ${0} <ha-list-item hasmeta twoline graphic="icon" @request-selected="${0}"> <ha-svg-icon slot="graphic" .path="${0}"></ha-svg-icon> ${0} <span slot="secondary"> ${0} </span> <ha-icon-next slot="meta"></ha-icon-next> </ha-list-item> </ha-list> </ha-wa-dialog> `),this.hass,this._open,e,this._dialogClosed,this._triggers.length?(0,s.qy)(v||(v=_` <ha-list-item hasmeta twoline graphic="icon" .type="${0}" @request-selected="${0}"> <ha-svg-icon slot="graphic" .path="${0}"></ha-svg-icon> ${0} <span slot="secondary"> ${0} </span> <ha-icon-next slot="meta"></ha-icon-next> </ha-list-item> `),"trigger",this._handleRowClick,C,this.hass.localize("ui.panel.config.devices.automation.triggers.title"),this.hass.localize("ui.panel.config.devices.automation.triggers.description")):s.s6,this._conditions.length?(0,s.qy)(m||(m=_` <ha-list-item hasmeta twoline graphic="icon" .type="${0}" @request-selected="${0}"> <ha-svg-icon slot="graphic" .path="${0}"></ha-svg-icon> ${0} <span slot="secondary"> ${0} </span> <ha-icon-next slot="meta"></ha-icon-next> </ha-list-item> `),"condition",this._handleRowClick,x,this.hass.localize("ui.panel.config.devices.automation.conditions.title"),this.hass.localize("ui.panel.config.devices.automation.conditions.description")):s.s6,this._actions.length?(0,s.qy)(y||(y=_` <ha-list-item hasmeta twoline graphic="icon" .type="${0}" @request-selected="${0}"> <ha-svg-icon slot="graphic" .path="${0}"></ha-svg-icon> ${0} <span slot="secondary"> ${0} </span> <ha-icon-next slot="meta"></ha-icon-next> </ha-list-item> `),"action",this._handleRowClick,S,this.hass.localize(`ui.panel.config.devices.${t}.actions.title`),this.hass.localize(`ui.panel.config.devices.${t}.actions.description`)):s.s6,this._triggers.length||this._conditions.length||this._actions.length?(0,s.qy)(b||(b=_`<li divider role="separator"></li>`)):s.s6,this._handleRowClick,$,this.hass.localize(`ui.panel.config.devices.${t}.new.title`),this.hass.localize(`ui.panel.config.devices.${t}.new.description`))}static get styles(){return[u.RF,u.nA,(0,s.AH)(w||(w=_`ha-wa-dialog{--dialog-content-padding:0;--mdc-dialog-max-height:60vh}@media all and (min-width:550px){ha-wa-dialog{--mdc-dialog-min-width:500px}}ha-icon-next{width:24px}`))]}constructor(...t){super(...t),this._triggers=[],this._conditions=[],this._actions=[],this._open=!1,this._handleRowClick=t=>{if(!(0,l.s)(t)||!this._params)return;const e=t.currentTarget.type,a=this._params.script;if(this.closeDialog(),a){const t={};"action"===e&&(t.sequence=[this._actions[0]]),(0,p.AM)(t,!0)}else{const t={};"trigger"===e&&(t.triggers=[this._triggers[0]]),"condition"===e&&(t.conditions=[this._conditions[0]]),"action"===e&&(t.actions=[this._actions[0]]),(0,c.mX)(t,!0)}}}}(0,o.Cg)([(0,n.MZ)({attribute:!1})],k.prototype,"hass",void 0),(0,o.Cg)([(0,n.wk)()],k.prototype,"_triggers",void 0),(0,o.Cg)([(0,n.wk)()],k.prototype,"_conditions",void 0),(0,o.Cg)([(0,n.wk)()],k.prototype,"_actions",void 0),(0,o.Cg)([(0,n.wk)()],k.prototype,"_params",void 0),(0,o.Cg)([(0,n.wk)()],k.prototype,"_open",void 0),k=(0,o.Cg)([(0,n.EM)("dialog-device-automation")],k),i()}catch(f){i(f)}})},99793:function(t,e,a){var i=a(96196);let o;e.A=(0,i.AH)(o||(o=(t=>t)`:host{--width:31rem;--spacing:var(--wa-space-l);--show-duration:200ms;--hide-duration:200ms;display:none}:host([open]){display:block}.dialog{display:flex;flex-direction:column;top:0;right:0;bottom:0;left:0;width:var(--width);max-width:calc(100% - var(--wa-space-2xl));max-height:calc(100% - var(--wa-space-2xl));background-color:var(--wa-color-surface-raised);border-radius:var(--wa-panel-border-radius);border:none;box-shadow:var(--wa-shadow-l);padding:0;margin:auto}.dialog.show{animation:show-dialog var(--show-duration) ease}.dialog.show::backdrop{animation:show-backdrop var(--show-duration,200ms) ease}.dialog.hide{animation:show-dialog var(--hide-duration) ease reverse}.dialog.hide::backdrop{animation:show-backdrop var(--hide-duration,200ms) ease reverse}.dialog.pulse{animation:pulse 250ms ease}.dialog:focus{outline:0}@media screen and (max-width:420px){.dialog{max-height:80vh}}.open{display:flex;opacity:1}.header{flex:0 0 auto;display:flex;flex-wrap:nowrap;padding-inline-start:var(--spacing);padding-block-end:0;padding-inline-end:calc(var(--spacing) - var(--wa-form-control-padding-block));padding-block-start:calc(var(--spacing) - var(--wa-form-control-padding-block))}.title{align-self:center;flex:1 1 auto;font-family:inherit;font-size:var(--wa-font-size-l);font-weight:var(--wa-font-weight-heading);line-height:var(--wa-line-height-condensed);margin:0}.header-actions{align-self:start;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:end;gap:var(--wa-space-2xs);padding-inline-start:var(--spacing)}.header-actions ::slotted(wa-button),.header-actions wa-button{flex:0 0 auto;display:flex;align-items:center}.body{flex:1 1 auto;display:block;padding:var(--spacing);overflow:auto;-webkit-overflow-scrolling:touch}.body:focus{outline:0}.body:focus-visible{outline:var(--wa-focus-ring);outline-offset:var(--wa-focus-ring-offset)}.footer{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:var(--wa-space-xs);justify-content:end;padding:var(--spacing);padding-block-start:0}.footer ::slotted(wa-button:not(:first-of-type)){margin-inline-start:var(--wa-spacing-xs)}.dialog::backdrop{background-color:var(--wa-color-overlay-modal,rgb(0 0 0 / .25))}@keyframes pulse{0%{scale:1}50%{scale:1.02}100%{scale:1}}@keyframes show-dialog{from{opacity:0;scale:0.8}to{opacity:1;scale:1}}@keyframes show-backdrop{from{opacity:0}to{opacity:1}}@media (forced-colors:active){.dialog{border:solid 1px #fff}}`))},93900:function(t,e,a){a.a(t,async function(t,e){try{a(3362),a(27495),a(62953);var i=a(96196),o=a(77845),s=a(94333),n=a(32288),r=a(17051),l=a(42462),d=a(28438),c=a(98779),h=a(27259),p=a(31247),u=a(93949),g=a(92070),f=a(9395),v=a(32510),m=a(17060),y=a(88496),b=a(99793),w=t([y,m]);[y,m]=w.then?(await w)():w;let $,S,k,L=t=>t;var _=Object.defineProperty,x=Object.getOwnPropertyDescriptor,C=(t,e,a,i)=>{for(var o,s=i>1?void 0:i?x(e,a):e,n=t.length-1;n>=0;n--)(o=t[n])&&(s=(i?o(e,a,s):o(s))||s);return i&&s&&_(e,a,s),s};let E=class extends v.A{firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),(0,u.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,u.I7)(this),this.removeOpenListeners()}async requestClose(t){const e=new d.L({source:t});if(this.dispatchEvent(e),e.defaultPrevented)return this.open=!0,void(0,h.Ud)(this.dialog,"pulse");this.removeOpenListeners(),await(0,h.Ud)(this.dialog,"hide"),this.open=!1,this.dialog.close(),(0,u.I7)(this);const a=this.originalTrigger;"function"==typeof(null==a?void 0:a.focus)&&setTimeout(()=>a.focus()),this.dispatchEvent(new r.Z)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),this.dialog.classList.contains("hide")||t.target!==this.dialog||this.requestClose(this.dialog)}handleDialogClick(t){const e=t.target.closest('[data-dialog="close"]');e&&(t.stopPropagation(),this.requestClose(e))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await(0,h.Ud)(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const t=new c.k;this.dispatchEvent(t),t.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),(0,u.JG)(this),requestAnimationFrame(()=>{const t=this.querySelector("[autofocus]");t&&"function"==typeof t.focus?t.focus():this.dialog.focus()}),await(0,h.Ud)(this.dialog,"show"),this.dispatchEvent(new l.q))}render(){var t;const e=!this.withoutHeader,a=this.hasSlotController.test("footer");return(0,i.qy)($||($=L` <dialog aria-labelledby="${0}" aria-describedby="${0}" part="dialog" class="${0}" @cancel="${0}" @click="${0}" @pointerdown="${0}"> ${0} <div part="body" class="body"><slot></slot></div> ${0} </dialog> `),null!==(t=this.ariaLabelledby)&&void 0!==t?t:"title",(0,n.J)(this.ariaDescribedby),(0,s.H)({dialog:!0,open:this.open}),this.handleDialogCancel,this.handleDialogClick,this.handleDialogPointerDown,e?(0,i.qy)(S||(S=L` <header part="header" class="header"> <h2 part="title" class="title" id="title"> <slot name="label"> ${0} </slot> </h2> <div part="header-actions" class="header-actions"> <slot name="header-actions"></slot> <wa-button part="close-button" exportparts="base:close-button__base" class="close" appearance="plain" @click="${0}"> <wa-icon name="xmark" label="${0}" library="system" variant="solid"></wa-icon> </wa-button> </div> </header> `),this.label.length>0?this.label:String.fromCharCode(8203),t=>this.requestClose(t.target),this.localize.term("close")):"",a?(0,i.qy)(k||(k=L` <footer part="footer" class="footer"> <slot name="footer"></slot> </footer> `)):"")}constructor(){super(...arguments),this.localize=new m.c(this),this.hasSlotController=new g.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=t=>{"Escape"===t.key&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}};E.css=b.A,C([(0,o.P)(".dialog")],E.prototype,"dialog",2),C([(0,o.MZ)({type:Boolean,reflect:!0})],E.prototype,"open",2),C([(0,o.MZ)({reflect:!0})],E.prototype,"label",2),C([(0,o.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],E.prototype,"withoutHeader",2),C([(0,o.MZ)({attribute:"light-dismiss",type:Boolean})],E.prototype,"lightDismiss",2),C([(0,o.MZ)({attribute:"aria-labelledby"})],E.prototype,"ariaLabelledby",2),C([(0,o.MZ)({attribute:"aria-describedby"})],E.prototype,"ariaDescribedby",2),C([(0,f.w)("open",{waitUntilFirstUpdate:!0})],E.prototype,"handleOpenChange",1),E=C([(0,o.EM)("wa-dialog")],E),document.addEventListener("click",t=>{const e=t.target.closest("[data-dialog]");if(e instanceof Element){const[t,a]=(0,p.v)(e.getAttribute("data-dialog")||"");if("open"===t&&null!=a&&a.length){const t=e.getRootNode().getElementById(a);"wa-dialog"===(null==t?void 0:t.localName)?t.open=!0:console.warn(`A dialog with an ID of "${a}" could not be found in this document.`)}}}),i.S$||document.addEventListener("pointerdown",()=>{}),e()}catch($){e($)}})},31247:function(t,e,a){a.d(e,{v:function(){return i}});a(18111),a(22489),a(61701),a(42762);function i(t){return t.split(" ").map(t=>t.trim()).filter(t=>""!==t)}},93949:function(t,e,a){a.d(e,{Rt:function(){return n},I7:function(){return s},JG:function(){return o}});a(27495),a(17642),a(58004),a(33853),a(45876),a(32475),a(15024),a(31698),a(25440),a(62953);const i=new Set;function o(t){if(i.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){const t=function(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}()+function(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}();let e=getComputedStyle(document.documentElement).scrollbarGutter;e&&"auto"!==e||(e="stable"),t<2&&(e=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",e),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${t}px`)}}function s(t){i.delete(t),0===i.size&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function n(t,e,a="vertical",i="smooth"){const o=function(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}(t,e),s=o.top+e.scrollTop,n=o.left+e.scrollLeft,r=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,d=e.scrollTop,c=e.scrollTop+e.offsetHeight;"horizontal"!==a&&"both"!==a||(n<r?e.scrollTo({left:n,behavior:i}):n+t.clientWidth>l&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:i})),"vertical"!==a&&"both"!==a||(s<d?e.scrollTo({top:s,behavior:i}):s+t.clientHeight>c&&e.scrollTo({top:s-e.offsetHeight+t.clientHeight,behavior:i}))}}}]);
//# sourceMappingURL=3507.82f2c67344b023ef.js.map