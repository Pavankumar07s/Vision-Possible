"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["42310"],{93444:function(t,e,a){var i=a(40445),o=a(96196),r=a(77845);let l,n,s=t=>t;class d extends o.WF{render(){return(0,o.qy)(l||(l=s` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,o.AH)(n||(n=s`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}d=(0,i.Cg)([(0,r.EM)("ha-dialog-footer")],d)},76538:function(t,e,a){a(62953);var i=a(40445),o=a(96196),r=a(77845);let l,n,s,d,h,c,p=t=>t;class g extends o.WF{render(){const t=(0,o.qy)(l||(l=p`<div class="header-title"> <slot name="title"></slot> </div>`)),e=(0,o.qy)(n||(n=p`<div class="header-subtitle"> <slot name="subtitle"></slot> </div>`));return(0,o.qy)(s||(s=p` <header class="header"> <div class="header-bar"> <section class="header-navigation-icon"> <slot name="navigationIcon"></slot> </section> <section class="header-content"> ${0} </section> <section class="header-action-items"> <slot name="actionItems"></slot> </section> </div> <slot></slot> </header> `),"above"===this.subtitlePosition?(0,o.qy)(d||(d=p`${0}${0}`),e,t):(0,o.qy)(h||(h=p`${0}${0}`),t,e))}static get styles(){return[(0,o.AH)(c||(c=p`:host{display:block}:host([show-border]){border-bottom:1px solid var(--mdc-dialog-scroll-divider-color,rgba(0,0,0,.12))}.header-bar{display:flex;flex-direction:row;align-items:center;padding:0 var(--ha-space-1);box-sizing:border-box}.header-content{flex:1;padding:10px var(--ha-space-1);display:flex;flex-direction:column;justify-content:center;min-height:var(--ha-space-12);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.header-title{height:var(--ha-dialog-header-title-height,calc(var(--ha-font-size-xl) + var(--ha-space-1)));font-size:var(--ha-font-size-xl);line-height:var(--ha-line-height-condensed);font-weight:var(--ha-font-weight-medium);color:var(--ha-dialog-header-title-color,var(--primary-text-color))}.header-subtitle{font-size:var(--ha-font-size-m);line-height:var(--ha-line-height-normal);color:var(--ha-dialog-header-subtitle-color,var(--secondary-text-color))}@media all and (min-width:450px) and (min-height:500px){.header-bar{padding:0 var(--ha-space-2)}}.header-navigation-icon{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}.header-action-items{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}`))]}constructor(...t){super(...t),this.subtitlePosition="below",this.showBorder=!1}}(0,i.Cg)([(0,r.MZ)({type:String,attribute:"subtitle-position"})],g.prototype,"subtitlePosition",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"show-border"})],g.prototype,"showBorder",void 0),g=(0,i.Cg)([(0,r.EM)("ha-dialog-header")],g)},26300:function(t,e,a){a.r(e),a.d(e,{HaIconButton:function(){return p}});a(62953);var i=a(40445),o=(a(11677),a(96196)),r=a(77845),l=a(32288);a(67094);let n,s,d,h,c=t=>t;class p extends o.WF{focus(){var t;null===(t=this._button)||void 0===t||t.focus()}render(){return(0,o.qy)(n||(n=c` <mwc-icon-button aria-label="${0}" title="${0}" aria-haspopup="${0}" .disabled="${0}"> ${0} </mwc-icon-button> `),(0,l.J)(this.label),(0,l.J)(this.hideTitle?void 0:this.label),(0,l.J)(this.ariaHasPopup),this.disabled,this.path?(0,o.qy)(s||(s=c`<ha-svg-icon .path="${0}"></ha-svg-icon>`),this.path):(0,o.qy)(d||(d=c`<slot></slot>`)))}constructor(...t){super(...t),this.disabled=!1,this.hideTitle=!1}}p.shadowRootOptions={mode:"open",delegatesFocus:!0},p.styles=(0,o.AH)(h||(h=c`:host{display:inline-block;outline:0}:host([disabled]){pointer-events:none}mwc-icon-button{--mdc-theme-on-primary:currentColor;--mdc-theme-text-disabled-on-light:var(--disabled-text-color)}`)),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],p.prototype,"disabled",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],p.prototype,"path",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],p.prototype,"label",void 0),(0,i.Cg)([(0,r.MZ)({type:String,attribute:"aria-haspopup"})],p.prototype,"ariaHasPopup",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"hide-title",type:Boolean})],p.prototype,"hideTitle",void 0),(0,i.Cg)([(0,r.P)("mwc-icon-button",!0)],p.prototype,"_button",void 0),p=(0,i.Cg)([(0,r.EM)("ha-icon-button")],p)},67094:function(t,e,a){a.r(e),a.d(e,{HaSvgIcon:function(){return c}});var i=a(40445),o=a(96196),r=a(77845);let l,n,s,d,h=t=>t;class c extends o.WF{render(){return(0,o.JW)(l||(l=h` <svg viewBox="${0}" preserveAspectRatio="xMidYMid meet" focusable="false" role="img" aria-hidden="true"> <g> ${0} ${0} </g> </svg>`),this.viewBox||"0 0 24 24",this.path?(0,o.JW)(n||(n=h`<path class="primary-path" d="${0}"></path>`),this.path):o.s6,this.secondaryPath?(0,o.JW)(s||(s=h`<path class="secondary-path" d="${0}"></path>`),this.secondaryPath):o.s6)}}c.styles=(0,o.AH)(d||(d=h`:host{display:var(--ha-icon-display,inline-flex);align-items:center;justify-content:center;position:relative;vertical-align:middle;fill:var(--icon-primary-color,currentcolor);width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px)}svg{width:100%;height:100%;pointer-events:none;display:block}path.primary-path{opacity:var(--icon-primary-opactity, 1)}path.secondary-path{fill:var(--icon-secondary-color,currentcolor);opacity:var(--icon-secondary-opactity, .5)}`)),(0,i.Cg)([(0,r.MZ)()],c.prototype,"path",void 0),(0,i.Cg)([(0,r.MZ)({attribute:!1})],c.prototype,"secondaryPath",void 0),(0,i.Cg)([(0,r.MZ)({attribute:!1})],c.prototype,"viewBox",void 0),c=(0,i.Cg)([(0,r.EM)("ha-svg-icon")],c)},75709:function(t,e,a){a.d(e,{h:function(){return f}});a(62953);var i=a(40445),o=a(68846),r=a(92347),l=a(96196),n=a(77845),s=a(63091);let d,h,c,p,g=t=>t;class f extends o.J{updated(t){super.updated(t),(t.has("invalid")||t.has("errorMessage"))&&(this.setCustomValidity(this.invalid?this.errorMessage||this.validationMessage||"Invalid":""),(this.invalid||this.validateOnInitialRender||t.has("invalid")&&void 0!==t.get("invalid"))&&this.reportValidity()),t.has("autocomplete")&&(this.autocomplete?this.formElement.setAttribute("autocomplete",this.autocomplete):this.formElement.removeAttribute("autocomplete")),t.has("autocorrect")&&(!1===this.autocorrect?this.formElement.setAttribute("autocorrect","off"):this.formElement.removeAttribute("autocorrect")),t.has("inputSpellcheck")&&(this.inputSpellcheck?this.formElement.setAttribute("spellcheck",this.inputSpellcheck):this.formElement.removeAttribute("spellcheck"))}renderIcon(t,e=!1){const a=e?"trailing":"leading";return(0,l.qy)(d||(d=g` <span class="mdc-text-field__icon mdc-text-field__icon--${0}" tabindex="${0}"> <slot name="${0}Icon"></slot> </span> `),a,e?1:-1,a)}constructor(...t){super(...t),this.icon=!1,this.iconTrailing=!1,this.autocorrect=!0}}f.styles=[r.R,(0,l.AH)(h||(h=g`.mdc-text-field__input{width:var(--ha-textfield-input-width,100%)}.mdc-text-field:not(.mdc-text-field--with-leading-icon){padding:var(--text-field-padding,0px 16px)}.mdc-text-field__affix--suffix{padding-left:var(--text-field-suffix-padding-left,12px);padding-right:var(--text-field-suffix-padding-right,0px);padding-inline-start:var(--text-field-suffix-padding-left,12px);padding-inline-end:var(--text-field-suffix-padding-right,0px);direction:ltr}.mdc-text-field--with-leading-icon{padding-inline-start:var(--text-field-suffix-padding-left,0px);padding-inline-end:var(--text-field-suffix-padding-right,16px);direction:var(--direction)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:var(--text-field-suffix-padding-left,0px);padding-right:var(--text-field-suffix-padding-right,0px);padding-inline-start:var(--text-field-suffix-padding-left,0px);padding-inline-end:var(--text-field-suffix-padding-right,0px)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--suffix{color:var(--secondary-text-color)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon{color:var(--secondary-text-color)}.mdc-text-field__icon--leading{margin-inline-start:16px;margin-inline-end:8px;direction:var(--direction)}.mdc-text-field__icon--trailing{padding:var(--textfield-icon-trailing-padding,12px)}.mdc-floating-label:not(.mdc-floating-label--float-above){max-width:calc(100% - 16px)}.mdc-floating-label--float-above{max-width:calc((100% - 16px)/ .75);transition:none}input{text-align:var(--text-field-text-align,start)}input[type=color]{height:20px}::-ms-reveal{display:none}:host([no-spinner]) input::-webkit-inner-spin-button,:host([no-spinner]) input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=color]::-webkit-color-swatch-wrapper{padding:0}:host([no-spinner]) input[type=number]{-moz-appearance:textfield}.mdc-text-field__ripple{overflow:hidden}.mdc-text-field{overflow:var(--text-field-overflow)}.mdc-floating-label{padding-inline-end:16px;padding-inline-start:initial;inset-inline-start:16px!important;inset-inline-end:initial!important;transform-origin:var(--float-start);direction:var(--direction);text-align:var(--float-start);box-sizing:border-box;text-overflow:ellipsis}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px - var(--text-field-suffix-padding-left,0px));inset-inline-start:calc(48px + var(--text-field-suffix-padding-left,0px))!important;inset-inline-end:initial!important;direction:var(--direction)}.mdc-text-field__input[type=number]{direction:var(--direction)}.mdc-text-field__affix--prefix{padding-right:var(--text-field-prefix-padding-right,2px);padding-inline-end:var(--text-field-prefix-padding-right,2px);padding-inline-start:initial}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--prefix{color:var(--mdc-text-field-label-ink-color)}#helper-text ha-markdown{display:inline-block}`)),"rtl"===s.G.document.dir?(0,l.AH)(c||(c=g`.mdc-floating-label,.mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field__icon--leading,.mdc-text-field__input[type=number]{direction:rtl;--direction:rtl}`)):(0,l.AH)(p||(p=g``))],(0,i.Cg)([(0,n.MZ)({type:Boolean})],f.prototype,"invalid",void 0),(0,i.Cg)([(0,n.MZ)({attribute:"error-message"})],f.prototype,"errorMessage",void 0),(0,i.Cg)([(0,n.MZ)({type:Boolean})],f.prototype,"icon",void 0),(0,i.Cg)([(0,n.MZ)({type:Boolean})],f.prototype,"iconTrailing",void 0),(0,i.Cg)([(0,n.MZ)()],f.prototype,"autocomplete",void 0),(0,i.Cg)([(0,n.MZ)({type:Boolean})],f.prototype,"autocorrect",void 0),(0,i.Cg)([(0,n.MZ)({attribute:"input-spellcheck"})],f.prototype,"inputSpellcheck",void 0),(0,i.Cg)([(0,n.P)("input")],f.prototype,"formElement",void 0),f=(0,i.Cg)([(0,n.EM)("ha-textfield")],f)},45331:function(t,e,a){a.a(t,async function(t,e){try{a(3362),a(62953);var i=a(40445),o=a(93900),r=a(96196),l=a(77845),n=a(32288),s=a(1087),d=a(59992),h=a(14503),c=(a(76538),a(26300),t([o,d]));[o,d]=c.then?(await c)():c;let p,g,f,m,v,u,x,b=t=>t;const y="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class w extends((0,d.V)(r.WF)){get scrollableElement(){return this.bodyContainer}updated(t){super.updated(t),t.has("open")&&(this._open=this.open)}render(){var t,e;return(0,r.qy)(p||(p=b` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,n.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,n.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?r.s6:(0,r.qy)(g||(g=b` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(t=null===(e=this.hass)||void 0===e?void 0:e.localize("ui.common.close"))&&void 0!==t?t:"Close",y,void 0!==this.headerTitle?(0,r.qy)(f||(f=b`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,r.qy)(m||(m=b`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,r.qy)(v||(v=b`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,r.qy)(u||(u=b`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(t){this._bodyScrolled=t.target.scrollTop>0}_handleKeyDown(t){"Escape"===t.key&&(this._escapePressed=!0)}_handleHide(t){this.preventScrimClose&&this._escapePressed&&t.detail.source===t.target.dialog&&t.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,r.AH)(x||(x=b`
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
      `))]}constructor(...t){super(...t),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,s.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var t;null===(t=this.querySelector("[autofocus]"))||void 0===t||t.focus()})},this._handleAfterShow=()=>{(0,s.r)(this,"after-show")},this._handleAfterHide=t=>{t.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,s.r)(this,"closed"))}}}(0,i.Cg)([(0,l.MZ)({attribute:!1})],w.prototype,"hass",void 0),(0,i.Cg)([(0,l.MZ)({attribute:"aria-labelledby"})],w.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,l.MZ)({attribute:"aria-describedby"})],w.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,l.MZ)({type:Boolean,reflect:!0})],w.prototype,"open",void 0),(0,i.Cg)([(0,l.MZ)({reflect:!0})],w.prototype,"type",void 0),(0,i.Cg)([(0,l.MZ)({type:String,reflect:!0,attribute:"width"})],w.prototype,"width",void 0),(0,i.Cg)([(0,l.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],w.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,l.MZ)({attribute:"header-title"})],w.prototype,"headerTitle",void 0),(0,i.Cg)([(0,l.MZ)({attribute:"header-subtitle"})],w.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,l.MZ)({type:String,attribute:"header-subtitle-position"})],w.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,l.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],w.prototype,"flexContent",void 0),(0,i.Cg)([(0,l.MZ)({type:Boolean,attribute:"without-header"})],w.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,l.wk)()],w.prototype,"_open",void 0),(0,i.Cg)([(0,l.P)(".body")],w.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,l.wk)()],w.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,l.Ls)({passive:!0})],w.prototype,"_handleBodyScroll",null),w=(0,i.Cg)([(0,l.EM)("ha-wa-dialog")],w),e()}catch(p){e(p)}})},26683:function(t,e,a){a.a(t,async function(t,i){try{a.r(e);a(3362),a(62953);var o=a(40445),r=a(96196),l=a(77845),n=a(94333),s=a(32288),d=a(1087),h=a(18350),c=(a(93444),a(76538),a(67094),a(75709),a(45331)),p=t([h,c]);[h,c]=p.then?(await p)():p;let g,f,m,v,u,x,b,y=t=>t;const w="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",_="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class S extends r.WF{async showDialog(t){this._closePromise&&await this._closePromise,this._params=t,this._open=!0}closeDialog(){var t,e;return!this._open||!(null!==(t=this._params)&&void 0!==t&&t.confirmation||null!==(e=this._params)&&void 0!==e&&e.prompt)&&(!this._params||(this._dismiss(),!0))}render(){var t,e;if(!this._params)return r.s6;const a=this._params.confirmation||!!this._params.prompt,i=this._params.title||this._params.confirmation&&this.hass.localize("ui.dialogs.generic.default_confirmation_title");return(0,r.qy)(g||(g=y` <ha-wa-dialog .hass="${0}" .open="${0}" type="${0}" ?prevent-scrim-close="${0}" @closed="${0}" aria-labelledby="dialog-box-title" aria-describedby="dialog-box-description"> <ha-dialog-header slot="header"> ${0} <span class="${0}" slot="title" id="dialog-box-title"> ${0} ${0} </span> </ha-dialog-header> <div id="dialog-box-description"> ${0} ${0} </div> <ha-dialog-footer slot="footer"> ${0} <ha-button slot="primaryAction" @click="${0}" ?autofocus="${0}" variant="${0}"> ${0} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `),this.hass,this._open,a?"alert":"standard",a,this._dialogClosed,a?r.s6:(0,r.qy)(f||(f=y`<slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button></slot>`),null!==(t=null===(e=this.hass)||void 0===e?void 0:e.localize("ui.common.close"))&&void 0!==t?t:"Close",_),(0,n.H)({title:!0,alert:a}),this._params.warning?(0,r.qy)(m||(m=y`<ha-svg-icon .path="${0}" style="color:var(--warning-color)"></ha-svg-icon> `),w):r.s6,i,this._params.text?(0,r.qy)(v||(v=y` <p>${0}</p> `),this._params.text):"",this._params.prompt?(0,r.qy)(u||(u=y` <ha-textfield autofocus value="${0}" .placeholder="${0}" .label="${0}" .type="${0}" .min="${0}" .max="${0}"></ha-textfield> `),(0,s.J)(this._params.defaultValue),this._params.placeholder,this._params.inputLabel?this._params.inputLabel:"",this._params.inputType?this._params.inputType:"text",this._params.inputMin,this._params.inputMax):"",a?(0,r.qy)(x||(x=y` <ha-button slot="secondaryAction" @click="${0}" ?autofocus="${0}" appearance="plain"> ${0} </ha-button> `),this._dismiss,!this._params.prompt&&this._params.destructive,this._params.dismissText?this._params.dismissText:this.hass.localize("ui.common.cancel")):r.s6,this._confirm,!this._params.prompt&&!this._params.destructive,this._params.destructive?"danger":"brand",this._params.confirmText?this._params.confirmText:this.hass.localize("ui.common.ok"))}_cancel(){var t;null!==(t=this._params)&&void 0!==t&&t.cancel&&this._params.cancel()}_dismiss(){this._closeState="canceled",this._cancel(),this._closeDialog()}_confirm(){var t;(this._closeState="confirmed",this._params.confirm)&&this._params.confirm(null===(t=this._textField)||void 0===t?void 0:t.value);this._closeDialog()}_closeDialog(){this._open=!1,this._closePromise=new Promise(t=>{this._closeResolve=t})}_dialogClosed(){var t;(0,d.r)(this,"dialog-closed",{dialog:this.localName}),this._closeState||this._cancel(),this._closeState=void 0,this._params=void 0,this._open=!1,null===(t=this._closeResolve)||void 0===t||t.call(this),this._closeResolve=void 0}constructor(...t){super(...t),this._open=!1}}S.styles=(0,r.AH)(b||(b=y`:host([inert]){pointer-events:initial!important;cursor:initial!important}a{color:var(--primary-color)}p{margin:0;color:var(--primary-text-color)}.no-bottom-padding{padding-bottom:0}.secondary{color:var(--secondary-text-color)}ha-textfield{width:100%}.title.alert{padding:0 var(--ha-space-2)}@media all and (min-width:450px) and (min-height:500px){.title.alert{padding:0 var(--ha-space-1)}}`)),(0,o.Cg)([(0,l.MZ)({attribute:!1})],S.prototype,"hass",void 0),(0,o.Cg)([(0,l.wk)()],S.prototype,"_params",void 0),(0,o.Cg)([(0,l.wk)()],S.prototype,"_open",void 0),(0,o.Cg)([(0,l.wk)()],S.prototype,"_closeState",void 0),(0,o.Cg)([(0,l.P)("ha-textfield")],S.prototype,"_textField",void 0),S=(0,o.Cg)([(0,l.EM)("dialog-box")],S),i()}catch(g){i(g)}})},59992:function(t,e,a){a.a(t,async function(t,i){try{a.d(e,{V:function(){return f}});a(62953);var o=a(40445),r=a(88696),l=a(96196),n=a(94333),s=a(77845),d=t([r]);r=(d.then?(await d)():d)[0];let h,c,p=t=>t;const g=t=>void 0===t?[]:Array.isArray(t)?t:[t],f=t=>{class e extends t{get scrollableElement(){return e.DEFAULT_SCROLLABLE_ELEMENT}firstUpdated(t){var e;null===(e=super.firstUpdated)||void 0===e||e.call(this,t),this.scrollableElement&&this._updateScrollableState(this.scrollableElement),this._attachScrollableElement()}updated(t){var e;null===(e=super.updated)||void 0===e||e.call(this,t),this._attachScrollableElement()}disconnectedCallback(){this._detachScrollableElement(),this._contentScrolled=!1,this._contentScrollable=!1,super.disconnectedCallback()}renderScrollableFades(t=!1){return(0,l.qy)(h||(h=p` <div class="${0}"></div> <div class="${0}"></div> `),(0,n.H)({"fade-top":!0,rounded:t,visible:this._contentScrolled}),(0,n.H)({"fade-bottom":!0,rounded:t,visible:this._contentScrollable}))}static get styles(){var t;const e=Object.getPrototypeOf(this);return[...g(null!==(t=null==e?void 0:e.styles)&&void 0!==t?t:[]),(0,l.AH)(c||(c=p`.fade-bottom,.fade-top{position:absolute;left:0;right:0;height:var(--ha-space-2);pointer-events:none;transition:opacity 180ms ease-in-out;border-radius:var(--ha-border-radius-square);opacity:0;background:linear-gradient(to bottom,var(--ha-color-shadow-scrollable-fade),transparent)}.fade-top{top:0}.fade-bottom{bottom:0;transform:rotate(180deg)}.fade-bottom.visible,.fade-top.visible{opacity:1}.fade-bottom.rounded,.fade-top.rounded{border-radius:var(--ha-card-border-radius,var(--ha-border-radius-lg));border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}.fade-top.rounded{border-top-left-radius:var(--ha-border-radius-square);border-top-right-radius:var(--ha-border-radius-square)}.fade-bottom.rounded{border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}`))]}_attachScrollableElement(){const t=this.scrollableElement;t!==this._scrollTarget&&(this._detachScrollableElement(),t&&(this._scrollTarget=t,t.addEventListener("scroll",this._onScroll,{passive:!0}),this._resize.observe(t),this._updateScrollableState(t)))}_detachScrollableElement(){var t,e;this._scrollTarget&&(this._scrollTarget.removeEventListener("scroll",this._onScroll),null===(t=(e=this._resize).unobserve)||void 0===t||t.call(e,this._scrollTarget),this._scrollTarget=void 0)}_updateScrollableState(t){const e=parseFloat(getComputedStyle(t).getPropertyValue("--safe-area-inset-bottom"))||0,{scrollHeight:a=0,clientHeight:i=0,scrollTop:o=0}=t;this._contentScrollable=a-i>o+e+this.scrollFadeSafeAreaPadding}constructor(...t){super(...t),this._contentScrolled=!1,this._contentScrollable=!1,this._onScroll=t=>{var e;const a=t.currentTarget;this._contentScrolled=(null!==(e=a.scrollTop)&&void 0!==e?e:0)>this.scrollFadeThreshold,this._updateScrollableState(a)},this._resize=new r.P(this,{target:null,callback:t=>{var e;const a=null===(e=t[0])||void 0===e?void 0:e.target;a&&this._updateScrollableState(a)}}),this.scrollFadeSafeAreaPadding=4,this.scrollFadeThreshold=4}}return e.DEFAULT_SCROLLABLE_ELEMENT=null,(0,o.Cg)([(0,s.wk)()],e.prototype,"_contentScrolled",void 0),(0,o.Cg)([(0,s.wk)()],e.prototype,"_contentScrollable",void 0),e};i()}catch(h){i(h)}})},69235:function(t,e,a){a.a(t,async function(t,e){try{a(3362),a(62953);"function"!=typeof window.ResizeObserver&&(window.ResizeObserver=(await a.e("71055").then(a.bind(a,52370))).default),e()}catch(i){e(i)}},1)},14503:function(t,e,a){a.d(e,{RF:function(){return p},dp:function(){return m},kO:function(){return f},nA:function(){return g},og:function(){return c}});var i=a(96196);let o,r,l,n,s,d,h=t=>t;const c=(0,i.AH)(o||(o=h`button.link{background:0 0;color:inherit;border:none;padding:0;font:inherit;text-align:left;text-decoration:underline;cursor:pointer;outline:0}`)),p=(0,i.AH)(r||(r=h`:host{font-family:var(--ha-font-family-body);-webkit-font-smoothing:var(--ha-font-smoothing);-moz-osx-font-smoothing:var(--ha-moz-osx-font-smoothing);font-size:var(--ha-font-size-m);font-weight:var(--ha-font-weight-normal);line-height:var(--ha-line-height-normal)}app-header div[sticky]{height:48px}app-toolbar [main-title]{margin-left:20px;margin-inline-start:20px;margin-inline-end:initial}h1{font-family:var(--ha-font-family-heading);-webkit-font-smoothing:var(--ha-font-smoothing);-moz-osx-font-smoothing:var(--ha-moz-osx-font-smoothing);font-size:var(--ha-font-size-2xl);font-weight:var(--ha-font-weight-normal);line-height:var(--ha-line-height-condensed)}h2{font-family:var(--ha-font-family-body);-webkit-font-smoothing:var(--ha-font-smoothing);-moz-osx-font-smoothing:var(--ha-moz-osx-font-smoothing);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:var(--ha-font-size-xl);font-weight:var(--ha-font-weight-medium);line-height:var(--ha-line-height-normal)}h3{font-family:var(--ha-font-family-body);-webkit-font-smoothing:var(--ha-font-smoothing);-moz-osx-font-smoothing:var(--ha-moz-osx-font-smoothing);font-size:var(--ha-font-size-l);font-weight:var(--ha-font-weight-normal);line-height:var(--ha-line-height-normal)}a{color:var(--primary-color)}.secondary{color:var(--secondary-text-color)}.error{color:var(--error-color)}.warning{color:var(--error-color)}${0} .card-actions a{text-decoration:none}.card-actions .warning{--mdc-theme-primary:var(--error-color)}.layout.horizontal,.layout.vertical{display:flex}.layout.inline{display:inline-flex}.layout.horizontal{flex-direction:row}.layout.vertical{flex-direction:column}.layout.wrap{flex-wrap:wrap}.layout.no-wrap{flex-wrap:nowrap}.layout.center,.layout.center-center{align-items:center}.layout.bottom{align-items:flex-end}.layout.center-center,.layout.center-justified{justify-content:center}.flex{flex:1;flex-basis:0.000000001px}.flex-auto{flex:1 1 auto}.flex-none{flex:none}.layout.justified{justify-content:space-between}`),c),g=(0,i.AH)(l||(l=h`ha-dialog{--mdc-dialog-min-width:400px;--mdc-dialog-max-width:600px;--mdc-dialog-max-width:min(600px, 95vw);--justify-action-buttons:space-between;--dialog-container-padding:var(--safe-area-inset-top, 0) var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0) var(--safe-area-inset-left, 0);--dialog-surface-padding:0px}ha-dialog .form{color:var(--primary-text-color)}a{color:var(--primary-color)}@media all and (max-width:450px),all and (max-height:500px){ha-dialog{--mdc-dialog-min-width:100vw;--mdc-dialog-max-width:100vw;--mdc-dialog-min-height:100vh;--mdc-dialog-min-height:100svh;--mdc-dialog-max-height:100vh;--mdc-dialog-max-height:100svh;--dialog-container-padding:0px;--dialog-surface-padding:var(--safe-area-inset-top, 0) var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0) var(--safe-area-inset-left, 0);--vertical-align-dialog:flex-end;--ha-dialog-border-radius:var(--ha-border-radius-square)}}.error{color:var(--error-color)}`)),f=(0,i.AH)(n||(n=h`ha-dialog{--vertical-align-dialog:flex-start;--dialog-surface-margin-top:var(--ha-space-10);--mdc-dialog-max-height:calc(
      100vh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    );--mdc-dialog-max-height:calc(
      100svh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    )}@media all and (max-width:450px),all and (max-height:500px){ha-dialog{--dialog-surface-margin-top:0px;--mdc-dialog-min-height:100vh;--mdc-dialog-min-height:100svh;--mdc-dialog-max-height:100vh;--mdc-dialog-max-height:100svh}}`)),m=(0,i.AH)(s||(s=h`.ha-scrollbar::-webkit-scrollbar{width:.4rem;height:.4rem}.ha-scrollbar::-webkit-scrollbar-thumb{border-radius:var(--ha-border-radius-sm);background:var(--scrollbar-thumb-color)}.ha-scrollbar{overflow-y:auto;scrollbar-color:var(--scrollbar-thumb-color) transparent;scrollbar-width:thin}`));(0,i.AH)(d||(d=h`body{background-color:var(--primary-background-color);color:var(--primary-text-color);height:calc(100vh - 32px);width:100vw}`))}}]);
//# sourceMappingURL=42310.a9d8c0466492ea44.js.map