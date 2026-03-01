"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["98983"],{93444:function(e,t,a){var o=a(40445),i=a(96196),s=a(77845);let r,l,n=e=>e;class d extends i.WF{render(){return(0,i.qy)(r||(r=n` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,i.AH)(l||(l=n`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}d=(0,o.Cg)([(0,s.EM)("ha-dialog-footer")],d)},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var o=a(40445),i=a(93900),s=a(96196),r=a(77845),l=a(32288),n=a(1087),d=a(59992),h=a(14503),c=(a(76538),a(26300),e([i,d]));[i,d]=c.then?(await c)():c;let p,g,u,v,f,y,w,m=e=>e;const b="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class _ extends((0,d.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,s.qy)(p||(p=m` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,l.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?s.s6:(0,s.qy)(g||(g=m` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",b,void 0!==this.headerTitle?(0,s.qy)(u||(u=m`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,s.qy)(v||(v=m`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,s.qy)(f||(f=m`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,s.qy)(y||(y=m`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,s.AH)(w||(w=m`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,o.Cg)([(0,r.MZ)({attribute:!1})],_.prototype,"hass",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],_.prototype,"ariaLabelledBy",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],_.prototype,"ariaDescribedBy",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],_.prototype,"open",void 0),(0,o.Cg)([(0,r.MZ)({reflect:!0})],_.prototype,"type",void 0),(0,o.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],_.prototype,"width",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],_.prototype,"preventScrimClose",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"header-title"})],_.prototype,"headerTitle",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],_.prototype,"headerSubtitle",void 0),(0,o.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],_.prototype,"headerSubtitlePosition",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],_.prototype,"flexContent",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],_.prototype,"withoutHeader",void 0),(0,o.Cg)([(0,r.wk)()],_.prototype,"_open",void 0),(0,o.Cg)([(0,r.P)(".body")],_.prototype,"bodyContainer",void 0),(0,o.Cg)([(0,r.wk)()],_.prototype,"_bodyScrolled",void 0),(0,o.Cg)([(0,r.Ls)({passive:!0})],_.prototype,"_handleBodyScroll",null),_=(0,o.Cg)([(0,r.EM)("ha-wa-dialog")],_),t()}catch(p){t(p)}})},35930:function(e,t,a){a.a(e,async function(e,o){try{a.r(t);a(3362),a(62953);var i=a(40445),s=a(96196),r=a(77845),l=a(1087),n=(a(38962),a(18350)),d=a(45331),h=(a(93444),a(59241)),c=a(14503),p=a(16536),g=e([n,d,p]);[n,d,p]=g.then?(await g)():g;let u,v,f,y=e=>e;class w extends s.WF{showDialog(e){this._params=e,this._scope=e.scope,this._category=e.entityReg.categories[e.scope],this._error=void 0,this._open=!0}closeDialog(){this._open=!1}_dialogClosed(){this._error="",this._params=void 0,(0,l.r)(this,"dialog-closed",{dialog:this.localName})}render(){if(!this._params)return s.s6;const e=this._params.entityReg.categories[this._params.scope];return(0,s.qy)(u||(u=y` <ha-wa-dialog .hass="${0}" .open="${0}" header-title="${0}" @closed="${0}"> ${0} <div class="form"> <ha-category-picker .hass="${0}" .scope="${0}" .label="${0}" .value="${0}" @value-changed="${0}" autofocus></ha-category-picker> </div> <ha-dialog-footer slot="footer"> <ha-button slot="secondaryAction" appearance="plain" @click="${0}"> ${0} </ha-button> <ha-button slot="primaryAction" @click="${0}" .disabled="${0}"> ${0} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `),this.hass,this._open,e?this.hass.localize("ui.panel.config.category.assign.edit"):this.hass.localize("ui.panel.config.category.assign.assign"),this._dialogClosed,this._error?(0,s.qy)(v||(v=y`<ha-alert alert-type="error">${0}</ha-alert>`),this._error):"",this.hass,this._scope,this.hass.localize("ui.components.category-picker.category"),this._category,this._categoryChanged,this.closeDialog,this.hass.localize("ui.common.cancel"),this._updateEntry,!!this._submitting,this.hass.localize("ui.common.save"))}_categoryChanged(e){e.detail.value||(this._category=void 0),this._category=e.detail.value}async _updateEntry(){this._submitting=!0,this._error=void 0;try{await(0,h.G_)(this.hass,this._params.entityReg.entity_id,{categories:{[this._scope]:this._category||null}}),this.closeDialog()}catch(e){this._error=e.message||this.hass.localize("ui.panel.config.category.assign.unknown_error")}finally{this._submitting=!1}}static get styles(){return[c.nA,(0,s.AH)(f||(f=y`ha-icon-picker,ha-textfield{display:block;margin-bottom:16px}`))]}constructor(...e){super(...e),this._open=!1}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],w.prototype,"hass",void 0),(0,i.Cg)([(0,r.wk)()],w.prototype,"_scope",void 0),(0,i.Cg)([(0,r.wk)()],w.prototype,"_category",void 0),(0,i.Cg)([(0,r.wk)()],w.prototype,"_error",void 0),(0,i.Cg)([(0,r.wk)()],w.prototype,"_params",void 0),(0,i.Cg)([(0,r.wk)()],w.prototype,"_submitting",void 0),(0,i.Cg)([(0,r.wk)()],w.prototype,"_open",void 0),w=(0,i.Cg)([(0,r.EM)("dialog-assign-category")],w),o()}catch(u){o(u)}})},16536:function(e,t,a){a.a(e,async function(e,t){try{a(74423),a(18111),a(22489),a(61701),a(3362),a(17642),a(58004),a(33853),a(45876),a(32475),a(15024),a(31698),a(62953);var o=a(40445),i=a(96196),s=a(77845),r=a(22786),l=a(1087),n=a(38508),d=(a(67094),a(76570)),h=a(54706),c=a(90986),p=e([n]);n=(p.then?(await p)():p)[0];let g,u,v,f,y,w,m=e=>e;const b="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",_="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.44 21.77,11.94 21.41,11.58Z",C="___ADD_NEW___";class x extends((0,h.E)(i.WF)){async open(){var e;await this.updateComplete,await(null===(e=this._picker)||void 0===e?void 0:e.open())}hassSubscribe(){return[(0,d.Ar)(this.hass.connection,this.scope,e=>{this._categories=e})]}render(){const e=this._computeValueRenderer(this._categories);return(0,i.qy)(g||(g=m` <ha-generic-picker .hass="${0}" .autofocus="${0}" .label="${0}" .placeholder="${0}" .value="${0}" .notFoundLabel="${0}" .emptyLabel="${0}" .getItems="${0}" .getAdditionalItems="${0}" .valueRenderer="${0}" .unknownItemText="${0}" @value-changed="${0}"> </ha-generic-picker> `),this.hass,this.autofocus,this.label,this.placeholder,this.value,this._notFoundLabel,this.hass.localize("ui.components.category-picker.no_categories"),this._getItems,this._getAdditionalItems,e,this.hass.localize("ui.components.category-picker.unknown"),this._valueChanged)}_valueChanged(e){e.stopPropagation();const t=e.detail.value;if(t){if(t.startsWith(C)){this.hass.loadFragmentTranslation("config");const e=t.substring(C.length);return void(0,c.S)(this,{scope:this.scope,suggestedName:e,createEntry:async e=>{const t=await(0,d.s_)(this.hass,this.scope,e);return this._setValue(t.category_id),t}})}this._setValue(t)}else this._setValue(void 0)}_setValue(e){this.value=e,setTimeout(()=>{(0,l.r)(this,"value-changed",{value:e}),(0,l.r)(this,"change")},0)}constructor(...e){super(...e),this.noAdd=!1,this.disabled=!1,this.required=!1,this.hassSubscribeRequiredHostProps=["scope"],this._categoryMap=(0,r.A)(e=>e?new Map(e.map(e=>[e.category_id,e])):new Map),this._computeValueRenderer=(0,r.A)(e=>t=>{const a=this._categoryMap(e).get(t);return a?(0,i.qy)(v||(v=m` ${0} <span slot="headline">${0}</span> `),a.icon?(0,i.qy)(f||(f=m`<ha-icon slot="start" .icon="${0}"></ha-icon>`),a.icon):(0,i.qy)(y||(y=m`<ha-svg-icon slot="start" .path="${0}"></ha-svg-icon>`),_),a.name):(0,i.qy)(u||(u=m` <ha-svg-icon slot="start" .path="${0}"></ha-svg-icon> <span slot="headline">${0}</span> `),_,t)}),this._getCategories=(0,r.A)(e=>{if(!e)return;return e.map(e=>({id:e.category_id,primary:e.name,icon:e.icon||void 0,icon_path:e.icon?void 0:_,sorting_label:e.name}))}),this._getItems=()=>this._getCategories(this._categories),this._allCategoryNames=(0,r.A)(e=>e?[...new Set(e.map(e=>e.name.toLowerCase()).filter(Boolean))]:[]),this._getAdditionalItems=e=>{if(this.noAdd)return[];const t=this._allCategoryNames(this._categories);return e&&!t.includes(e.toLowerCase())?[{id:C+e,primary:this.hass.localize("ui.components.category-picker.add_new_sugestion",{name:e}),icon_path:b}]:[{id:C,primary:this.hass.localize("ui.components.category-picker.add_new"),icon_path:b}]},this._notFoundLabel=e=>this.hass.localize("ui.components.category-picker.no_match",{term:(0,i.qy)(w||(w=m`<b>‘${0}’</b>`),e)})}}(0,o.Cg)([(0,s.MZ)({attribute:!1})],x.prototype,"hass",void 0),(0,o.Cg)([(0,s.MZ)()],x.prototype,"scope",void 0),(0,o.Cg)([(0,s.MZ)()],x.prototype,"label",void 0),(0,o.Cg)([(0,s.MZ)()],x.prototype,"value",void 0),(0,o.Cg)([(0,s.MZ)()],x.prototype,"helper",void 0),(0,o.Cg)([(0,s.MZ)()],x.prototype,"placeholder",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,attribute:"no-add"})],x.prototype,"noAdd",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean})],x.prototype,"disabled",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean})],x.prototype,"required",void 0),(0,o.Cg)([(0,s.wk)()],x.prototype,"_categories",void 0),(0,o.Cg)([(0,s.P)("ha-generic-picker")],x.prototype,"_picker",void 0),x=(0,o.Cg)([(0,s.EM)("ha-category-picker")],x),t()}catch(g){t(g)}})},99793:function(e,t,a){var o=a(96196);let i;t.A=(0,o.AH)(i||(i=(e=>e)`:host{--width:31rem;--spacing:var(--wa-space-l);--show-duration:200ms;--hide-duration:200ms;display:none}:host([open]){display:block}.dialog{display:flex;flex-direction:column;top:0;right:0;bottom:0;left:0;width:var(--width);max-width:calc(100% - var(--wa-space-2xl));max-height:calc(100% - var(--wa-space-2xl));background-color:var(--wa-color-surface-raised);border-radius:var(--wa-panel-border-radius);border:none;box-shadow:var(--wa-shadow-l);padding:0;margin:auto}.dialog.show{animation:show-dialog var(--show-duration) ease}.dialog.show::backdrop{animation:show-backdrop var(--show-duration,200ms) ease}.dialog.hide{animation:show-dialog var(--hide-duration) ease reverse}.dialog.hide::backdrop{animation:show-backdrop var(--hide-duration,200ms) ease reverse}.dialog.pulse{animation:pulse 250ms ease}.dialog:focus{outline:0}@media screen and (max-width:420px){.dialog{max-height:80vh}}.open{display:flex;opacity:1}.header{flex:0 0 auto;display:flex;flex-wrap:nowrap;padding-inline-start:var(--spacing);padding-block-end:0;padding-inline-end:calc(var(--spacing) - var(--wa-form-control-padding-block));padding-block-start:calc(var(--spacing) - var(--wa-form-control-padding-block))}.title{align-self:center;flex:1 1 auto;font-family:inherit;font-size:var(--wa-font-size-l);font-weight:var(--wa-font-weight-heading);line-height:var(--wa-line-height-condensed);margin:0}.header-actions{align-self:start;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:end;gap:var(--wa-space-2xs);padding-inline-start:var(--spacing)}.header-actions ::slotted(wa-button),.header-actions wa-button{flex:0 0 auto;display:flex;align-items:center}.body{flex:1 1 auto;display:block;padding:var(--spacing);overflow:auto;-webkit-overflow-scrolling:touch}.body:focus{outline:0}.body:focus-visible{outline:var(--wa-focus-ring);outline-offset:var(--wa-focus-ring-offset)}.footer{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:var(--wa-space-xs);justify-content:end;padding:var(--spacing);padding-block-start:0}.footer ::slotted(wa-button:not(:first-of-type)){margin-inline-start:var(--wa-spacing-xs)}.dialog::backdrop{background-color:var(--wa-color-overlay-modal,rgb(0 0 0 / .25))}@keyframes pulse{0%{scale:1}50%{scale:1.02}100%{scale:1}}@keyframes show-dialog{from{opacity:0;scale:0.8}to{opacity:1;scale:1}}@keyframes show-backdrop{from{opacity:0}to{opacity:1}}@media (forced-colors:active){.dialog{border:solid 1px #fff}}`))},93900:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(27495),a(62953);var o=a(96196),i=a(77845),s=a(94333),r=a(32288),l=a(17051),n=a(42462),d=a(28438),h=a(98779),c=a(27259),p=a(31247),g=a(93949),u=a(92070),v=a(9395),f=a(32510),y=a(17060),w=a(88496),m=a(99793),b=e([w,y]);[w,y]=b.then?(await b)():b;let k,$,M,A=e=>e;var _=Object.defineProperty,C=Object.getOwnPropertyDescriptor,x=(e,t,a,o)=>{for(var i,s=o>1?void 0:o?C(t,a):t,r=e.length-1;r>=0;r--)(i=e[r])&&(s=(o?i(t,a,s):i(s))||s);return o&&s&&_(t,a,s),s};let L=class extends f.A{firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),(0,g.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,g.I7)(this),this.removeOpenListeners()}async requestClose(e){const t=new d.L({source:e});if(this.dispatchEvent(t),t.defaultPrevented)return this.open=!0,void(0,c.Ud)(this.dialog,"pulse");this.removeOpenListeners(),await(0,c.Ud)(this.dialog,"hide"),this.open=!1,this.dialog.close(),(0,g.I7)(this);const a=this.originalTrigger;"function"==typeof(null==a?void 0:a.focus)&&setTimeout(()=>a.focus()),this.dispatchEvent(new l.Z)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(e){e.preventDefault(),this.dialog.classList.contains("hide")||e.target!==this.dialog||this.requestClose(this.dialog)}handleDialogClick(e){const t=e.target.closest('[data-dialog="close"]');t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await(0,c.Ud)(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const e=new h.k;this.dispatchEvent(e),e.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),(0,g.JG)(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&"function"==typeof e.focus?e.focus():this.dialog.focus()}),await(0,c.Ud)(this.dialog,"show"),this.dispatchEvent(new n.q))}render(){var e;const t=!this.withoutHeader,a=this.hasSlotController.test("footer");return(0,o.qy)(k||(k=A` <dialog aria-labelledby="${0}" aria-describedby="${0}" part="dialog" class="${0}" @cancel="${0}" @click="${0}" @pointerdown="${0}"> ${0} <div part="body" class="body"><slot></slot></div> ${0} </dialog> `),null!==(e=this.ariaLabelledby)&&void 0!==e?e:"title",(0,r.J)(this.ariaDescribedby),(0,s.H)({dialog:!0,open:this.open}),this.handleDialogCancel,this.handleDialogClick,this.handleDialogPointerDown,t?(0,o.qy)($||($=A` <header part="header" class="header"> <h2 part="title" class="title" id="title"> <slot name="label"> ${0} </slot> </h2> <div part="header-actions" class="header-actions"> <slot name="header-actions"></slot> <wa-button part="close-button" exportparts="base:close-button__base" class="close" appearance="plain" @click="${0}"> <wa-icon name="xmark" label="${0}" library="system" variant="solid"></wa-icon> </wa-button> </div> </header> `),this.label.length>0?this.label:String.fromCharCode(8203),e=>this.requestClose(e.target),this.localize.term("close")):"",a?(0,o.qy)(M||(M=A` <footer part="footer" class="footer"> <slot name="footer"></slot> </footer> `)):"")}constructor(){super(...arguments),this.localize=new y.c(this),this.hasSlotController=new u.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}};L.css=m.A,x([(0,i.P)(".dialog")],L.prototype,"dialog",2),x([(0,i.MZ)({type:Boolean,reflect:!0})],L.prototype,"open",2),x([(0,i.MZ)({reflect:!0})],L.prototype,"label",2),x([(0,i.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],L.prototype,"withoutHeader",2),x([(0,i.MZ)({attribute:"light-dismiss",type:Boolean})],L.prototype,"lightDismiss",2),x([(0,i.MZ)({attribute:"aria-labelledby"})],L.prototype,"ariaLabelledby",2),x([(0,i.MZ)({attribute:"aria-describedby"})],L.prototype,"ariaDescribedby",2),x([(0,v.w)("open",{waitUntilFirstUpdate:!0})],L.prototype,"handleOpenChange",1),L=x([(0,i.EM)("wa-dialog")],L),document.addEventListener("click",e=>{const t=e.target.closest("[data-dialog]");if(t instanceof Element){const[e,a]=(0,p.v)(t.getAttribute("data-dialog")||"");if("open"===e&&null!=a&&a.length){const e=t.getRootNode().getElementById(a);"wa-dialog"===(null==e?void 0:e.localName)?e.open=!0:console.warn(`A dialog with an ID of "${a}" could not be found in this document.`)}}}),o.S$||document.addEventListener("pointerdown",()=>{}),t()}catch(k){t(k)}})}}]);
//# sourceMappingURL=98983.60df78e5333efefb.js.map