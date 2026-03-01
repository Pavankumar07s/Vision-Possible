"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["86310"],{63130:function(e,t,a){a.d(t,{l:function(){return o}});a(3362);const o=async(e,t)=>{if(navigator.clipboard)try{return void(await navigator.clipboard.writeText(e))}catch(i){}const a=null!=t?t:document.body,o=document.createElement("textarea");o.value=e,a.appendChild(o),o.select(),document.execCommand("copy"),a.removeChild(o)}},93444:function(e,t,a){var o=a(40445),i=a(96196),r=a(77845);let l,s,n=e=>e;class d extends i.WF{render(){return(0,i.qy)(l||(l=n` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,i.AH)(s||(s=n`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}d=(0,o.Cg)([(0,r.EM)("ha-dialog-footer")],d)},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var o=a(40445),i=a(93900),r=a(96196),l=a(77845),s=a(32288),n=a(1087),d=a(59992),h=a(14503),c=(a(76538),a(26300),e([i,d]));[i,d]=c.then?(await c)():c;let p,u,g,f,v,m,b,w=e=>e;const y="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class x extends((0,d.V)(r.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,r.qy)(p||(p=w` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,s.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,s.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?r.s6:(0,r.qy)(u||(u=w` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",y,void 0!==this.headerTitle?(0,r.qy)(g||(g=w`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,r.qy)(f||(f=w`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,r.qy)(v||(v=w`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,r.qy)(m||(m=w`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,r.AH)(b||(b=w`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,o.Cg)([(0,l.MZ)({attribute:!1})],x.prototype,"hass",void 0),(0,o.Cg)([(0,l.MZ)({attribute:"aria-labelledby"})],x.prototype,"ariaLabelledBy",void 0),(0,o.Cg)([(0,l.MZ)({attribute:"aria-describedby"})],x.prototype,"ariaDescribedBy",void 0),(0,o.Cg)([(0,l.MZ)({type:Boolean,reflect:!0})],x.prototype,"open",void 0),(0,o.Cg)([(0,l.MZ)({reflect:!0})],x.prototype,"type",void 0),(0,o.Cg)([(0,l.MZ)({type:String,reflect:!0,attribute:"width"})],x.prototype,"width",void 0),(0,o.Cg)([(0,l.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],x.prototype,"preventScrimClose",void 0),(0,o.Cg)([(0,l.MZ)({attribute:"header-title"})],x.prototype,"headerTitle",void 0),(0,o.Cg)([(0,l.MZ)({attribute:"header-subtitle"})],x.prototype,"headerSubtitle",void 0),(0,o.Cg)([(0,l.MZ)({type:String,attribute:"header-subtitle-position"})],x.prototype,"headerSubtitlePosition",void 0),(0,o.Cg)([(0,l.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],x.prototype,"flexContent",void 0),(0,o.Cg)([(0,l.MZ)({type:Boolean,attribute:"without-header"})],x.prototype,"withoutHeader",void 0),(0,o.Cg)([(0,l.wk)()],x.prototype,"_open",void 0),(0,o.Cg)([(0,l.P)(".body")],x.prototype,"bodyContainer",void 0),(0,o.Cg)([(0,l.wk)()],x.prototype,"_bodyScrolled",void 0),(0,o.Cg)([(0,l.Ls)({passive:!0})],x.prototype,"_handleBodyScroll",null),x=(0,o.Cg)([(0,l.EM)("ha-wa-dialog")],x),t()}catch(p){t(p)}})},59992:function(e,t,a){a.a(e,async function(e,o){try{a.d(t,{V:function(){return g}});a(62953);var i=a(40445),r=a(88696),l=a(96196),s=a(94333),n=a(77845),d=e([r]);r=(d.then?(await d)():d)[0];let h,c,p=e=>e;const u=e=>void 0===e?[]:Array.isArray(e)?e:[e],g=e=>{class t extends e{get scrollableElement(){return t.DEFAULT_SCROLLABLE_ELEMENT}firstUpdated(e){var t;null===(t=super.firstUpdated)||void 0===t||t.call(this,e),this.scrollableElement&&this._updateScrollableState(this.scrollableElement),this._attachScrollableElement()}updated(e){var t;null===(t=super.updated)||void 0===t||t.call(this,e),this._attachScrollableElement()}disconnectedCallback(){this._detachScrollableElement(),this._contentScrolled=!1,this._contentScrollable=!1,super.disconnectedCallback()}renderScrollableFades(e=!1){return(0,l.qy)(h||(h=p` <div class="${0}"></div> <div class="${0}"></div> `),(0,s.H)({"fade-top":!0,rounded:e,visible:this._contentScrolled}),(0,s.H)({"fade-bottom":!0,rounded:e,visible:this._contentScrollable}))}static get styles(){var e;const t=Object.getPrototypeOf(this);return[...u(null!==(e=null==t?void 0:t.styles)&&void 0!==e?e:[]),(0,l.AH)(c||(c=p`.fade-bottom,.fade-top{position:absolute;left:0;right:0;height:var(--ha-space-2);pointer-events:none;transition:opacity 180ms ease-in-out;border-radius:var(--ha-border-radius-square);opacity:0;background:linear-gradient(to bottom,var(--ha-color-shadow-scrollable-fade),transparent)}.fade-top{top:0}.fade-bottom{bottom:0;transform:rotate(180deg)}.fade-bottom.visible,.fade-top.visible{opacity:1}.fade-bottom.rounded,.fade-top.rounded{border-radius:var(--ha-card-border-radius,var(--ha-border-radius-lg));border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}.fade-top.rounded{border-top-left-radius:var(--ha-border-radius-square);border-top-right-radius:var(--ha-border-radius-square)}.fade-bottom.rounded{border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}`))]}_attachScrollableElement(){const e=this.scrollableElement;e!==this._scrollTarget&&(this._detachScrollableElement(),e&&(this._scrollTarget=e,e.addEventListener("scroll",this._onScroll,{passive:!0}),this._resize.observe(e),this._updateScrollableState(e)))}_detachScrollableElement(){var e,t;this._scrollTarget&&(this._scrollTarget.removeEventListener("scroll",this._onScroll),null===(e=(t=this._resize).unobserve)||void 0===e||e.call(t,this._scrollTarget),this._scrollTarget=void 0)}_updateScrollableState(e){const t=parseFloat(getComputedStyle(e).getPropertyValue("--safe-area-inset-bottom"))||0,{scrollHeight:a=0,clientHeight:o=0,scrollTop:i=0}=e;this._contentScrollable=a-o>i+t+this.scrollFadeSafeAreaPadding}constructor(...e){super(...e),this._contentScrolled=!1,this._contentScrollable=!1,this._onScroll=e=>{var t;const a=e.currentTarget;this._contentScrolled=(null!==(t=a.scrollTop)&&void 0!==t?t:0)>this.scrollFadeThreshold,this._updateScrollableState(a)},this._resize=new r.P(this,{target:null,callback:e=>{var t;const a=null===(t=e[0])||void 0===t?void 0:t.target;a&&this._updateScrollableState(a)}}),this.scrollFadeSafeAreaPadding=4,this.scrollFadeThreshold=4}}return t.DEFAULT_SCROLLABLE_ELEMENT=null,(0,i.Cg)([(0,n.wk)()],t.prototype,"_contentScrolled",void 0),(0,i.Cg)([(0,n.wk)()],t.prototype,"_contentScrollable",void 0),t};o()}catch(h){o(h)}})},82277:function(e,t,a){a.a(e,async function(e,o){try{a.r(t);a(3362);var i=a(40445),r=a(96196),l=a(77845),s=a(1087),n=a(63130),d=a(18350),h=(a(93444),a(76538),a(26300),a(45331)),c=a(14503),p=a(81619),u=e([d,h]);[d,h]=u.then?(await u)():u;let g,f,v=e=>e;const m="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",b="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";class w extends r.WF{async showDialog(e){this._params=e}closeDialog(){this._params=void 0,(0,s.r)(this,"dialog-closed",{dialog:this.localName})}render(){return this._params?(0,r.qy)(g||(g=v` <ha-wa-dialog open @closed="${0}" header-title="${0}"> <ha-dialog-header slot="heading"> <ha-icon-button slot="navigationIcon" dialogAction="cancel" .label="${0}" .path="${0}"></ha-icon-button> <span slot="title"> ${0} </span> </ha-dialog-header> <div class="content"> <p> ${0} </p> <div class="key-row"> <div class="key-container"> <code>${0}</code> </div> <ha-icon-button @click="${0}" .label="${0}" .path="${0}"></ha-icon-button> </div> </div> <ha-dialog-footer slot="footer"> <ha-button slot="primaryAction" data-dialog="close"> ${0} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `),this.closeDialog,this.hass.localize("ui.panel.config.devices.esphome.encryption_key_title"),this.hass.localize("ui.common.close"),m,this.hass.localize("ui.panel.config.devices.esphome.encryption_key_title"),this.hass.localize("ui.panel.config.devices.esphome.encryption_key_description"),this._params.encryption_key,this._copyToClipboard,this.hass.localize("ui.common.copy"),b,this.hass.localize("ui.common.close")):r.s6}async _copyToClipboard(){var e;null!==(e=this._params)&&void 0!==e&&e.encryption_key&&(await(0,n.l)(this._params.encryption_key),(0,p.P)(this,{message:this.hass.localize("ui.common.copied_clipboard")}))}static get styles(){return[c.nA,(0,r.AH)(f||(f=v`.content{display:flex;flex-direction:column;gap:var(--ha-space-6)}.key-row{display:flex;gap:var(--ha-space-2);align-items:center}.key-container{flex:1;border-radius:var(--ha-space-2);border:1px solid var(--divider-color);background-color:var(--code-editor-background-color,var(--secondary-background-color));padding:var(--ha-space-3);overflow:auto}p{margin:0;color:var(--secondary-text-color);line-height:var(--ha-line-height-condensed)}`))]}}(0,i.Cg)([(0,l.MZ)({attribute:!1})],w.prototype,"hass",void 0),(0,i.Cg)([(0,l.wk)()],w.prototype,"_params",void 0),w=(0,i.Cg)([(0,l.EM)("dialog-esphome-encryption-key")],w),o()}catch(g){o(g)}})},99793:function(e,t,a){var o=a(96196);let i;t.A=(0,o.AH)(i||(i=(e=>e)`:host{--width:31rem;--spacing:var(--wa-space-l);--show-duration:200ms;--hide-duration:200ms;display:none}:host([open]){display:block}.dialog{display:flex;flex-direction:column;top:0;right:0;bottom:0;left:0;width:var(--width);max-width:calc(100% - var(--wa-space-2xl));max-height:calc(100% - var(--wa-space-2xl));background-color:var(--wa-color-surface-raised);border-radius:var(--wa-panel-border-radius);border:none;box-shadow:var(--wa-shadow-l);padding:0;margin:auto}.dialog.show{animation:show-dialog var(--show-duration) ease}.dialog.show::backdrop{animation:show-backdrop var(--show-duration,200ms) ease}.dialog.hide{animation:show-dialog var(--hide-duration) ease reverse}.dialog.hide::backdrop{animation:show-backdrop var(--hide-duration,200ms) ease reverse}.dialog.pulse{animation:pulse 250ms ease}.dialog:focus{outline:0}@media screen and (max-width:420px){.dialog{max-height:80vh}}.open{display:flex;opacity:1}.header{flex:0 0 auto;display:flex;flex-wrap:nowrap;padding-inline-start:var(--spacing);padding-block-end:0;padding-inline-end:calc(var(--spacing) - var(--wa-form-control-padding-block));padding-block-start:calc(var(--spacing) - var(--wa-form-control-padding-block))}.title{align-self:center;flex:1 1 auto;font-family:inherit;font-size:var(--wa-font-size-l);font-weight:var(--wa-font-weight-heading);line-height:var(--wa-line-height-condensed);margin:0}.header-actions{align-self:start;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:end;gap:var(--wa-space-2xs);padding-inline-start:var(--spacing)}.header-actions ::slotted(wa-button),.header-actions wa-button{flex:0 0 auto;display:flex;align-items:center}.body{flex:1 1 auto;display:block;padding:var(--spacing);overflow:auto;-webkit-overflow-scrolling:touch}.body:focus{outline:0}.body:focus-visible{outline:var(--wa-focus-ring);outline-offset:var(--wa-focus-ring-offset)}.footer{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:var(--wa-space-xs);justify-content:end;padding:var(--spacing);padding-block-start:0}.footer ::slotted(wa-button:not(:first-of-type)){margin-inline-start:var(--wa-spacing-xs)}.dialog::backdrop{background-color:var(--wa-color-overlay-modal,rgb(0 0 0 / .25))}@keyframes pulse{0%{scale:1}50%{scale:1.02}100%{scale:1}}@keyframes show-dialog{from{opacity:0;scale:0.8}to{opacity:1;scale:1}}@keyframes show-backdrop{from{opacity:0}to{opacity:1}}@media (forced-colors:active){.dialog{border:solid 1px #fff}}`))},93900:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(27495),a(62953);var o=a(96196),i=a(77845),r=a(94333),l=a(32288),s=a(17051),n=a(42462),d=a(28438),h=a(98779),c=a(27259),p=a(31247),u=a(93949),g=a(92070),f=a(9395),v=a(32510),m=a(17060),b=a(88496),w=a(99793),y=e([b,m]);[b,m]=y.then?(await y)():y;let C,S,L,E=e=>e;var x=Object.defineProperty,_=Object.getOwnPropertyDescriptor,k=(e,t,a,o)=>{for(var i,r=o>1?void 0:o?_(t,a):t,l=e.length-1;l>=0;l--)(i=e[l])&&(r=(o?i(t,a,r):i(r))||r);return o&&r&&x(t,a,r),r};let $=class extends v.A{firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),(0,u.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,u.I7)(this),this.removeOpenListeners()}async requestClose(e){const t=new d.L({source:e});if(this.dispatchEvent(t),t.defaultPrevented)return this.open=!0,void(0,c.Ud)(this.dialog,"pulse");this.removeOpenListeners(),await(0,c.Ud)(this.dialog,"hide"),this.open=!1,this.dialog.close(),(0,u.I7)(this);const a=this.originalTrigger;"function"==typeof(null==a?void 0:a.focus)&&setTimeout(()=>a.focus()),this.dispatchEvent(new s.Z)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(e){e.preventDefault(),this.dialog.classList.contains("hide")||e.target!==this.dialog||this.requestClose(this.dialog)}handleDialogClick(e){const t=e.target.closest('[data-dialog="close"]');t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await(0,c.Ud)(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const e=new h.k;this.dispatchEvent(e),e.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),(0,u.JG)(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&"function"==typeof e.focus?e.focus():this.dialog.focus()}),await(0,c.Ud)(this.dialog,"show"),this.dispatchEvent(new n.q))}render(){var e;const t=!this.withoutHeader,a=this.hasSlotController.test("footer");return(0,o.qy)(C||(C=E` <dialog aria-labelledby="${0}" aria-describedby="${0}" part="dialog" class="${0}" @cancel="${0}" @click="${0}" @pointerdown="${0}"> ${0} <div part="body" class="body"><slot></slot></div> ${0} </dialog> `),null!==(e=this.ariaLabelledby)&&void 0!==e?e:"title",(0,l.J)(this.ariaDescribedby),(0,r.H)({dialog:!0,open:this.open}),this.handleDialogCancel,this.handleDialogClick,this.handleDialogPointerDown,t?(0,o.qy)(S||(S=E` <header part="header" class="header"> <h2 part="title" class="title" id="title"> <slot name="label"> ${0} </slot> </h2> <div part="header-actions" class="header-actions"> <slot name="header-actions"></slot> <wa-button part="close-button" exportparts="base:close-button__base" class="close" appearance="plain" @click="${0}"> <wa-icon name="xmark" label="${0}" library="system" variant="solid"></wa-icon> </wa-button> </div> </header> `),this.label.length>0?this.label:String.fromCharCode(8203),e=>this.requestClose(e.target),this.localize.term("close")):"",a?(0,o.qy)(L||(L=E` <footer part="footer" class="footer"> <slot name="footer"></slot> </footer> `)):"")}constructor(){super(...arguments),this.localize=new m.c(this),this.hasSlotController=new g.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}};$.css=w.A,k([(0,i.P)(".dialog")],$.prototype,"dialog",2),k([(0,i.MZ)({type:Boolean,reflect:!0})],$.prototype,"open",2),k([(0,i.MZ)({reflect:!0})],$.prototype,"label",2),k([(0,i.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],$.prototype,"withoutHeader",2),k([(0,i.MZ)({attribute:"light-dismiss",type:Boolean})],$.prototype,"lightDismiss",2),k([(0,i.MZ)({attribute:"aria-labelledby"})],$.prototype,"ariaLabelledby",2),k([(0,i.MZ)({attribute:"aria-describedby"})],$.prototype,"ariaDescribedby",2),k([(0,f.w)("open",{waitUntilFirstUpdate:!0})],$.prototype,"handleOpenChange",1),$=k([(0,i.EM)("wa-dialog")],$),document.addEventListener("click",e=>{const t=e.target.closest("[data-dialog]");if(t instanceof Element){const[e,a]=(0,p.v)(t.getAttribute("data-dialog")||"");if("open"===e&&null!=a&&a.length){const e=t.getRootNode().getElementById(a);"wa-dialog"===(null==e?void 0:e.localName)?e.open=!0:console.warn(`A dialog with an ID of "${a}" could not be found in this document.`)}}}),o.S$||document.addEventListener("pointerdown",()=>{}),t()}catch(C){t(C)}})},31247:function(e,t,a){a.d(t,{v:function(){return o}});a(18111),a(22489),a(61701),a(42762);function o(e){return e.split(" ").map(e=>e.trim()).filter(e=>""!==e)}},93949:function(e,t,a){a.d(t,{Rt:function(){return l},I7:function(){return r},JG:function(){return i}});a(27495),a(17642),a(58004),a(33853),a(45876),a(32475),a(15024),a(31698),a(25440),a(62953);const o=new Set;function i(e){if(o.add(e),!document.documentElement.classList.contains("wa-scroll-lock")){const e=function(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}()+function(){const e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(e)||!e?0:e}();let t=getComputedStyle(document.documentElement).scrollbarGutter;t&&"auto"!==t||(t="stable"),e<2&&(t=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",t),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function r(e){o.delete(e),0===o.size&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function l(e,t,a="vertical",o="smooth"){const i=function(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}(e,t),r=i.top+t.scrollTop,l=i.left+t.scrollLeft,s=t.scrollLeft,n=t.scrollLeft+t.offsetWidth,d=t.scrollTop,h=t.scrollTop+t.offsetHeight;"horizontal"!==a&&"both"!==a||(l<s?t.scrollTo({left:l,behavior:o}):l+e.clientWidth>n&&t.scrollTo({left:l-t.offsetWidth+e.clientWidth,behavior:o})),"vertical"!==a&&"both"!==a||(r<d?t.scrollTo({top:r,behavior:o}):r+e.clientHeight>h&&t.scrollTo({top:r-t.offsetHeight+e.clientHeight,behavior:o}))}}}]);
//# sourceMappingURL=86310.64c0b977494dff9d.js.map