"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["90001"],{14693:function(e,t,a){a.a(e,async function(e,t){try{a(62953);var o=a(40445),i=a(96196),r=a(77845),s=a(71769),l=a(99611),d=(a(76538),a(26300),a(45331)),h=e([l,d]);[l,d]=h.then?(await h)():h;let n,c,p,u,v,g,m,b,f=e=>e;const y="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class w extends i.WF{connectedCallback(){super.connectedCallback(),this._unsubMediaQuery=(0,s.m)("(max-width: 870px), (max-height: 500px)",e=>{this._modeSet&&this.blockModeChange||(this._mode=e?"bottom-sheet":"dialog",this._modeSet=!0)})}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._unsubMediaQuery)||void 0===e||e.call(this),this._unsubMediaQuery=void 0,this._modeSet=!1}render(){var e,t;return"bottom-sheet"===this._mode?(0,i.qy)(n||(n=f` <ha-bottom-sheet .open="${0}" flexcontent> ${0} <slot></slot> <slot name="footer" slot="footer"></slot> </ha-bottom-sheet> `),this.open,this.withoutHeader?i.s6:(0,i.qy)(c||(c=f`<ha-dialog-header slot="header" .subtitlePosition="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-drawer="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header>`),this.headerSubtitlePosition,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",y,void 0!==this.headerTitle?(0,i.qy)(p||(p=f`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,i.qy)(u||(u=f`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,i.qy)(v||(v=f`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,i.qy)(g||(g=f`<slot name="headerSubtitle" slot="subtitle"></slot>`)))):(0,i.qy)(m||(m=f` <ha-wa-dialog .hass="${0}" .open="${0}" .width="${0}" .ariaLabelledBy="${0}" .ariaDescribedBy="${0}" .headerTitle="${0}" .headerSubtitle="${0}" .headerSubtitlePosition="${0}" flexcontent .withoutHeader="${0}"> <slot name="headerNavigationIcon" slot="headerNavigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> <slot name="headerTitle" slot="headerTitle"></slot> <slot name="headerSubtitle" slot="headerSubtitle"></slot> <slot name="headerActionItems" slot="headerActionItems"></slot> <slot></slot> <slot name="footer" slot="footer"></slot> </ha-wa-dialog> `),this.hass,this.open,this.width,this.ariaLabelledBy,this.ariaDescribedBy,this.headerTitle,this.headerSubtitle,this.headerSubtitlePosition,this.withoutHeader,this.hass.localize("ui.common.close"),y)}static get styles(){return[(0,i.AH)(b||(b=f`ha-bottom-sheet{--ha-bottom-sheet-surface-background:var(
            --ha-dialog-surface-background,
            var(--card-background-color, var(--ha-color-surface-default))
          )}`))]}constructor(...e){super(...e),this.open=!1,this.width="medium",this.headerSubtitlePosition="below",this.blockModeChange=!1,this.withoutHeader=!1,this._mode="dialog",this._modeSet=!1}}(0,o.Cg)([(0,r.MZ)({attribute:!1})],w.prototype,"hass",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],w.prototype,"ariaLabelledBy",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],w.prototype,"ariaDescribedBy",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],w.prototype,"open",void 0),(0,o.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],w.prototype,"width",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"header-title"})],w.prototype,"headerTitle",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],w.prototype,"headerSubtitle",void 0),(0,o.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],w.prototype,"headerSubtitlePosition",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,attribute:"block-mode-change"})],w.prototype,"blockModeChange",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],w.prototype,"withoutHeader",void 0),(0,o.Cg)([(0,r.wk)()],w.prototype,"_mode",void 0),w=(0,o.Cg)([(0,r.EM)("ha-adaptive-dialog")],w),t()}catch(n){t(n)}})},76538:function(e,t,a){a(62953);var o=a(40445),i=a(96196),r=a(77845);let s,l,d,h,n,c,p=e=>e;class u extends i.WF{render(){const e=(0,i.qy)(s||(s=p`<div class="header-title"> <slot name="title"></slot> </div>`)),t=(0,i.qy)(l||(l=p`<div class="header-subtitle"> <slot name="subtitle"></slot> </div>`));return(0,i.qy)(d||(d=p` <header class="header"> <div class="header-bar"> <section class="header-navigation-icon"> <slot name="navigationIcon"></slot> </section> <section class="header-content"> ${0} </section> <section class="header-action-items"> <slot name="actionItems"></slot> </section> </div> <slot></slot> </header> `),"above"===this.subtitlePosition?(0,i.qy)(h||(h=p`${0}${0}`),t,e):(0,i.qy)(n||(n=p`${0}${0}`),e,t))}static get styles(){return[(0,i.AH)(c||(c=p`:host{display:block}:host([show-border]){border-bottom:1px solid var(--mdc-dialog-scroll-divider-color,rgba(0,0,0,.12))}.header-bar{display:flex;flex-direction:row;align-items:center;padding:0 var(--ha-space-1);box-sizing:border-box}.header-content{flex:1;padding:10px var(--ha-space-1);display:flex;flex-direction:column;justify-content:center;min-height:var(--ha-space-12);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.header-title{height:var(--ha-dialog-header-title-height,calc(var(--ha-font-size-xl) + var(--ha-space-1)));font-size:var(--ha-font-size-xl);line-height:var(--ha-line-height-condensed);font-weight:var(--ha-font-weight-medium);color:var(--ha-dialog-header-title-color,var(--primary-text-color))}.header-subtitle{font-size:var(--ha-font-size-m);line-height:var(--ha-line-height-normal);color:var(--ha-dialog-header-subtitle-color,var(--secondary-text-color))}@media all and (min-width:450px) and (min-height:500px){.header-bar{padding:0 var(--ha-space-2)}}.header-navigation-icon{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}.header-action-items{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}`))]}constructor(...e){super(...e),this.subtitlePosition="below",this.showBorder=!1}}(0,o.Cg)([(0,r.MZ)({type:String,attribute:"subtitle-position"})],u.prototype,"subtitlePosition",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"show-border"})],u.prototype,"showBorder",void 0),u=(0,o.Cg)([(0,r.EM)("ha-dialog-header")],u)},2846:function(e,t,a){a.d(t,{G:function(){return p},J:function(){return c}});var o=a(40445),i=a(97154),r=a(82553),s=a(96196),l=a(77845);a(54276);let d,h,n=e=>e;const c=[r.R,(0,s.AH)(d||(d=n`:host{--ha-icon-display:block;--md-sys-color-primary:var(--primary-text-color);--md-sys-color-secondary:var(--secondary-text-color);--md-sys-color-surface:var(--card-background-color);--md-sys-color-on-surface:var(--primary-text-color);--md-sys-color-on-surface-variant:var(--secondary-text-color)}md-item{overflow:var(--md-item-overflow,hidden);align-items:var(--md-item-align-items,center);gap:var(--ha-md-list-item-gap,16px)}`))];class p extends i.n{renderRipple(){return"text"===this.type?s.s6:(0,s.qy)(h||(h=n`<ha-ripple part="ripple" for="item" ?disabled="${0}"></ha-ripple>`),this.disabled&&"link"!==this.type)}}p.styles=c,p=(0,o.Cg)([(0,l.EM)("ha-md-list-item")],p)},54276:function(e,t,a){a(62953);var o=a(40445),i=a(76482),r=a(91382),s=a(96245),l=a(96196),d=a(77845);let h;class n extends r.n{attach(e){super.attach(e),this.attachableTouchController.attach(e)}disconnectedCallback(){super.disconnectedCallback(),this.hovered=!1,this.pressed=!1}detach(){super.detach(),this.attachableTouchController.detach()}_onTouchControlChange(e,t){null==e||e.removeEventListener("touchend",this._handleTouchEnd),null==t||t.addEventListener("touchend",this._handleTouchEnd)}constructor(...e){super(...e),this.attachableTouchController=new i.i(this,this._onTouchControlChange.bind(this)),this._handleTouchEnd=()=>{this.disabled||super.endPressAnimation()}}}n.styles=[s.R,(0,l.AH)(h||(h=(e=>e)`:host{--md-ripple-hover-opacity:var(--ha-ripple-hover-opacity, 0.08);--md-ripple-pressed-opacity:var(--ha-ripple-pressed-opacity, 0.12);--md-ripple-hover-color:var(
          --ha-ripple-hover-color,
          var(--ha-ripple-color, var(--secondary-text-color))
        );--md-ripple-pressed-color:var(
          --ha-ripple-pressed-color,
          var(--ha-ripple-color, var(--secondary-text-color))
        )}`))],n=(0,o.Cg)([(0,d.EM)("ha-ripple")],n)},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var o=a(40445),i=a(93900),r=a(96196),s=a(77845),l=a(32288),d=a(1087),h=a(59992),n=a(14503),c=(a(76538),a(26300),e([i,h]));[i,h]=c.then?(await c)():c;let p,u,v,g,m,b,f,y=e=>e;const w="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class x extends((0,h.V)(r.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,r.qy)(p||(p=y` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,l.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?r.s6:(0,r.qy)(u||(u=y` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",w,void 0!==this.headerTitle?(0,r.qy)(v||(v=y`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,r.qy)(g||(g=y`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,r.qy)(m||(m=y`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,r.qy)(b||(b=y`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,n.dp,(0,r.AH)(f||(f=y`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,d.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,d.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,d.r)(this,"closed"))}}}(0,o.Cg)([(0,s.MZ)({attribute:!1})],x.prototype,"hass",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"aria-labelledby"})],x.prototype,"ariaLabelledBy",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"aria-describedby"})],x.prototype,"ariaDescribedBy",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0})],x.prototype,"open",void 0),(0,o.Cg)([(0,s.MZ)({reflect:!0})],x.prototype,"type",void 0),(0,o.Cg)([(0,s.MZ)({type:String,reflect:!0,attribute:"width"})],x.prototype,"width",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],x.prototype,"preventScrimClose",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"header-title"})],x.prototype,"headerTitle",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"header-subtitle"})],x.prototype,"headerSubtitle",void 0),(0,o.Cg)([(0,s.MZ)({type:String,attribute:"header-subtitle-position"})],x.prototype,"headerSubtitlePosition",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],x.prototype,"flexContent",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,attribute:"without-header"})],x.prototype,"withoutHeader",void 0),(0,o.Cg)([(0,s.wk)()],x.prototype,"_open",void 0),(0,o.Cg)([(0,s.P)(".body")],x.prototype,"bodyContainer",void 0),(0,o.Cg)([(0,s.wk)()],x.prototype,"_bodyScrolled",void 0),(0,o.Cg)([(0,s.Ls)({passive:!0})],x.prototype,"_handleBodyScroll",null),x=(0,o.Cg)([(0,s.EM)("ha-wa-dialog")],x),t()}catch(p){t(p)}})},47351:function(e,t,a){a.d(t,{PS:function(){return i},Tv:function(){return l},VR:function(){return r},lE:function(){return d}});a(74423),a(3362),a(17642),a(58004),a(33853),a(45876),a(32475),a(15024),a(31698),a(62953);var o=a(62384);const i=e=>e.data,r=e=>"object"==typeof e?"object"==typeof e.body?e.body.message||"Unknown error, see supervisor logs":e.body||e.message||"Unknown error, see supervisor logs":e,s=new Set([502,503,504]),l=e=>!!(e&&e.status_code&&s.has(e.status_code))||!(!e||!e.message||!e.message.includes("ERR_CONNECTION_CLOSED")&&!e.message.includes("ERR_CONNECTION_RESET")),d=async(e,t)=>(0,o.v)(e.config.version,2021,2,4)?e.callWS({type:"supervisor/api",endpoint:`/${t}/stats`,method:"get"}):i(await e.callApi("GET",`hassio/${t}/stats`))},69235:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);"function"!=typeof window.ResizeObserver&&(window.ResizeObserver=(await a.e("71055").then(a.bind(a,52370))).default),t()}catch(o){t(o)}},1)}}]);
//# sourceMappingURL=90001.9ebd2528dd6d8ede.js.map