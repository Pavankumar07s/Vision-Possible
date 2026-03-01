"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["25291"],{93444:function(e,t,a){var i=a(40445),o=a(96196),s=a(77845);let r,l,n=e=>e;class d extends o.WF{render(){return(0,o.qy)(r||(r=n` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,o.AH)(l||(l=n`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}d=(0,i.Cg)([(0,s.EM)("ha-dialog-footer")],d)},64138:function(e,t,a){a.a(e,async function(e,i){try{a.r(t),a.d(t,{HaIconPicker:function(){return x}});a(74423),a(44114),a(26910),a(18111),a(22489),a(7588),a(61701),a(13579),a(3362),a(27495),a(25440),a(62953);var o=a(40445),s=a(96196),r=a(77845),l=a(22786),n=a(1087),d=a(57769),h=(a(75064),a(38508)),c=(a(88945),e([h]));h=(c.then?(await c)():c)[0];let p,g,u,v=e=>e,f=[],m=!1;const w=(e,t)=>{var a;const i=`${t}:${e.name}`,o=e.name,s=o.split("-"),r=null!==(a=e.keywords)&&void 0!==a?a:[],l={iconName:o};return s.forEach((e,t)=>{l[`part${t}`]=e}),r.forEach((e,t)=>{l[`keyword${t}`]=e}),{id:i,primary:i,icon:i,search_labels:l,sorting_label:i}},y=async()=>{m=!0;const e=await a.e("81340").then(a.t.bind(a,25143,19));f=e.default.map(e=>w(e,"mdi"));const t=[];Object.keys(d.y).forEach(e=>{t.push(b(e))}),(await Promise.all(t)).forEach(e=>{f.push(...e)})},b=async e=>{try{const t=d.y[e].getIconList;if("function"!=typeof t)return[];return(await t()).map(t=>w(t,e))}catch(t){return console.warn(`Unable to load icon list for ${e} iconset`),[]}},_=e=>(0,s.qy)(p||(p=v` <ha-combo-box-item type="button"> <ha-icon .icon="${0}" slot="start"></ha-icon> ${0} </ha-combo-box-item> `),e.id,e.id);class x extends s.WF{render(){return(0,s.qy)(g||(g=v` <ha-generic-picker .hass="${0}" allow-custom-value .getItems="${0}" .helper="${0}" .disabled="${0}" .required="${0}" .errorMessage="${0}" .invalid="${0}" .rowRenderer="${0}" .icon="${0}" .label="${0}" .value="${0}" .searchFn="${0}" popover-placement="bottom-start" @value-changed="${0}"> <slot name="start"></slot> </ha-generic-picker> `),this.hass,this._getIconPickerItems,this.helper,this.disabled,this.required,this.errorMessage,this.invalid,_,this._icon,this.label,this._value,this._filterIcons,this._valueChanged)}firstUpdated(){m||y().then(()=>{this._getIconPickerItems=()=>f,this.requestUpdate()})}_valueChanged(e){e.stopPropagation(),this._setValue(e.detail.value)}_setValue(e){this.value=e,(0,n.r)(this,"value-changed",{value:this._value},{bubbles:!1,composed:!1})}get _icon(){var e;return null!==(e=this.value)&&void 0!==e&&e.length?this.value:this.placeholder}get _value(){return this.value||""}constructor(...e){super(...e),this.disabled=!1,this.required=!1,this.invalid=!1,this._getIconPickerItems=()=>f,this._filterIcons=(0,l.A)((e,t,a)=>{const i=e.toLowerCase().replace(/\s+/g,"-"),o=null!=a&&a.length?a:t;if(!i.length)return o;const s=[];for(const r of o){const e=(r.id.split(":")[1]||r.id).toLowerCase().split("-"),t=r.search_labels?Object.values(r.search_labels).filter(e=>null!==e).map(e=>e.toLowerCase()):[],a=r.id.toLowerCase();e.includes(i)?s.push({item:r,rank:1}):t.includes(i)?s.push({item:r,rank:2}):a.includes(i)?s.push({item:r,rank:3}):t.some(e=>e.includes(i))&&s.push({item:r,rank:4})}return s.sort((e,t)=>e.rank-t.rank).map(e=>e.item)})}}x.styles=(0,s.AH)(u||(u=v`ha-generic-picker{width:100%;display:block}`)),(0,o.Cg)([(0,r.MZ)({attribute:!1})],x.prototype,"hass",void 0),(0,o.Cg)([(0,r.MZ)()],x.prototype,"value",void 0),(0,o.Cg)([(0,r.MZ)()],x.prototype,"label",void 0),(0,o.Cg)([(0,r.MZ)()],x.prototype,"helper",void 0),(0,o.Cg)([(0,r.MZ)()],x.prototype,"placeholder",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"error-message"})],x.prototype,"errorMessage",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],x.prototype,"disabled",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],x.prototype,"required",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],x.prototype,"invalid",void 0),x=(0,o.Cg)([(0,r.EM)("ha-icon-picker")],x),i()}catch(p){i(p)}})},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var i=a(40445),o=a(93900),s=a(96196),r=a(77845),l=a(32288),n=a(1087),d=a(59992),h=a(14503),c=(a(76538),a(26300),e([o,d]));[o,d]=c.then?(await c)():c;let p,g,u,v,f,m,w,y=e=>e;const b="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class _ extends((0,d.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,s.qy)(p||(p=y` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,l.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?s.s6:(0,s.qy)(g||(g=y` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",b,void 0!==this.headerTitle?(0,s.qy)(u||(u=y`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,s.qy)(v||(v=y`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,s.qy)(f||(f=y`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,s.qy)(m||(m=y`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,s.AH)(w||(w=y`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],_.prototype,"hass",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],_.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],_.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],_.prototype,"open",void 0),(0,i.Cg)([(0,r.MZ)({reflect:!0})],_.prototype,"type",void 0),(0,i.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],_.prototype,"width",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],_.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-title"})],_.prototype,"headerTitle",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],_.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],_.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],_.prototype,"flexContent",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],_.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,r.wk)()],_.prototype,"_open",void 0),(0,i.Cg)([(0,r.P)(".body")],_.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,r.wk)()],_.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,r.Ls)({passive:!0})],_.prototype,"_handleBodyScroll",null),_=(0,i.Cg)([(0,r.EM)("ha-wa-dialog")],_),t()}catch(p){t(p)}})},81574:function(e,t,a){a.a(e,async function(e,i){try{a.r(t);a(3362),a(42762),a(62953);var o=a(40445),s=a(96196),r=a(77845),l=a(1087),n=(a(38962),a(45331)),d=(a(93444),a(64138)),h=a(18350),c=(a(75709),a(14503)),p=e([n,d,h]);[n,d,h]=p.then?(await p)():p;let g,u,v,f=e=>e;class m extends s.WF{async showDialog(e){this._params=e,this._error=void 0,this._open=!0,this._params.entry?(this._name=this._params.entry.name||"",this._icon=this._params.entry.icon||null):(this._name=this._params.suggestedName||"",this._icon=null),await this.updateComplete}closeDialog(){this._open=!1}_dialogClosed(){this._error="",this._params=void 0,(0,l.r)(this,"dialog-closed",{dialog:this.localName})}render(){if(!this._params)return s.s6;const e=this._params.entry,t=!this._isNameValid();return(0,s.qy)(g||(g=f` <ha-wa-dialog .hass="${0}" .open="${0}" header-title="${0}" @closed="${0}"> ${0} <div class="form"> <ha-textfield .value="${0}" @input="${0}" .label="${0}" .validationMessage="${0}" required autofocus></ha-textfield> <ha-icon-picker .hass="${0}" .value="${0}" @value-changed="${0}" .label="${0}"></ha-icon-picker> </div> <ha-dialog-footer slot="footer"> <ha-button slot="secondaryAction" appearance="plain" @click="${0}"> ${0} </ha-button> <ha-button slot="primaryAction" @click="${0}" .disabled="${0}"> ${0} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `),this.hass,this._open,e?this.hass.localize("ui.panel.config.category.editor.edit"):this.hass.localize("ui.panel.config.category.editor.create"),this._dialogClosed,this._error?(0,s.qy)(u||(u=f`<ha-alert alert-type="error">${0}</ha-alert>`),this._error):"",this._name,this._nameChanged,this.hass.localize("ui.panel.config.category.editor.name"),this.hass.localize("ui.panel.config.category.editor.required_error_msg"),this.hass,this._icon,this._iconChanged,this.hass.localize("ui.panel.config.category.editor.icon"),this.closeDialog,this.hass.localize("ui.common.cancel"),this._updateEntry,t||!!this._submitting,e?this.hass.localize("ui.common.save"):this.hass.localize("ui.common.add"))}_isNameValid(){return""!==this._name.trim()}_nameChanged(e){this._error=void 0,this._name=e.target.value}_iconChanged(e){this._error=void 0,this._icon=e.detail.value}async _updateEntry(){const e=!this._params.entry;let t;this._submitting=!0;try{const a={name:this._name.trim(),icon:this._icon||(e?void 0:null)};t=e?await this._params.createEntry(a):await this._params.updateEntry(a),this.closeDialog()}catch(a){this._error=a.message||this.hass.localize("ui.panel.config.category.editor.unknown_error")}finally{this._submitting=!1}return t}static get styles(){return[c.nA,(0,s.AH)(v||(v=f`ha-icon-picker,ha-textfield{display:block;margin-bottom:16px}`))]}constructor(...e){super(...e),this._open=!1}}(0,o.Cg)([(0,r.MZ)({attribute:!1})],m.prototype,"hass",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_name",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_icon",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_error",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_params",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_submitting",void 0),(0,o.Cg)([(0,r.wk)()],m.prototype,"_open",void 0),m=(0,o.Cg)([(0,r.EM)("dialog-category-registry-detail")],m),i()}catch(g){i(g)}})},99793:function(e,t,a){var i=a(96196);let o;t.A=(0,i.AH)(o||(o=(e=>e)`:host{--width:31rem;--spacing:var(--wa-space-l);--show-duration:200ms;--hide-duration:200ms;display:none}:host([open]){display:block}.dialog{display:flex;flex-direction:column;top:0;right:0;bottom:0;left:0;width:var(--width);max-width:calc(100% - var(--wa-space-2xl));max-height:calc(100% - var(--wa-space-2xl));background-color:var(--wa-color-surface-raised);border-radius:var(--wa-panel-border-radius);border:none;box-shadow:var(--wa-shadow-l);padding:0;margin:auto}.dialog.show{animation:show-dialog var(--show-duration) ease}.dialog.show::backdrop{animation:show-backdrop var(--show-duration,200ms) ease}.dialog.hide{animation:show-dialog var(--hide-duration) ease reverse}.dialog.hide::backdrop{animation:show-backdrop var(--hide-duration,200ms) ease reverse}.dialog.pulse{animation:pulse 250ms ease}.dialog:focus{outline:0}@media screen and (max-width:420px){.dialog{max-height:80vh}}.open{display:flex;opacity:1}.header{flex:0 0 auto;display:flex;flex-wrap:nowrap;padding-inline-start:var(--spacing);padding-block-end:0;padding-inline-end:calc(var(--spacing) - var(--wa-form-control-padding-block));padding-block-start:calc(var(--spacing) - var(--wa-form-control-padding-block))}.title{align-self:center;flex:1 1 auto;font-family:inherit;font-size:var(--wa-font-size-l);font-weight:var(--wa-font-weight-heading);line-height:var(--wa-line-height-condensed);margin:0}.header-actions{align-self:start;display:flex;flex-shrink:0;flex-wrap:wrap;justify-content:end;gap:var(--wa-space-2xs);padding-inline-start:var(--spacing)}.header-actions ::slotted(wa-button),.header-actions wa-button{flex:0 0 auto;display:flex;align-items:center}.body{flex:1 1 auto;display:block;padding:var(--spacing);overflow:auto;-webkit-overflow-scrolling:touch}.body:focus{outline:0}.body:focus-visible{outline:var(--wa-focus-ring);outline-offset:var(--wa-focus-ring-offset)}.footer{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:var(--wa-space-xs);justify-content:end;padding:var(--spacing);padding-block-start:0}.footer ::slotted(wa-button:not(:first-of-type)){margin-inline-start:var(--wa-spacing-xs)}.dialog::backdrop{background-color:var(--wa-color-overlay-modal,rgb(0 0 0 / .25))}@keyframes pulse{0%{scale:1}50%{scale:1.02}100%{scale:1}}@keyframes show-dialog{from{opacity:0;scale:0.8}to{opacity:1;scale:1}}@keyframes show-backdrop{from{opacity:0}to{opacity:1}}@media (forced-colors:active){.dialog{border:solid 1px #fff}}`))},93900:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(27495),a(62953);var i=a(96196),o=a(77845),s=a(94333),r=a(32288),l=a(17051),n=a(42462),d=a(28438),h=a(98779),c=a(27259),p=a(31247),g=a(93949),u=a(92070),v=a(9395),f=a(32510),m=a(17060),w=a(88496),y=a(99793),b=e([w,m]);[w,m]=b.then?(await b)():b;let k,$,M,L=e=>e;var _=Object.defineProperty,x=Object.getOwnPropertyDescriptor,C=(e,t,a,i)=>{for(var o,s=i>1?void 0:i?x(t,a):t,r=e.length-1;r>=0;r--)(o=e[r])&&(s=(i?o(t,a,s):o(s))||s);return i&&s&&_(t,a,s),s};let q=class extends f.A{firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),(0,g.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,g.I7)(this),this.removeOpenListeners()}async requestClose(e){const t=new d.L({source:e});if(this.dispatchEvent(t),t.defaultPrevented)return this.open=!0,void(0,c.Ud)(this.dialog,"pulse");this.removeOpenListeners(),await(0,c.Ud)(this.dialog,"hide"),this.open=!1,this.dialog.close(),(0,g.I7)(this);const a=this.originalTrigger;"function"==typeof(null==a?void 0:a.focus)&&setTimeout(()=>a.focus()),this.dispatchEvent(new l.Z)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(e){e.preventDefault(),this.dialog.classList.contains("hide")||e.target!==this.dialog||this.requestClose(this.dialog)}handleDialogClick(e){const t=e.target.closest('[data-dialog="close"]');t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await(0,c.Ud)(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const e=new h.k;this.dispatchEvent(e),e.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),(0,g.JG)(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&"function"==typeof e.focus?e.focus():this.dialog.focus()}),await(0,c.Ud)(this.dialog,"show"),this.dispatchEvent(new n.q))}render(){var e;const t=!this.withoutHeader,a=this.hasSlotController.test("footer");return(0,i.qy)(k||(k=L` <dialog aria-labelledby="${0}" aria-describedby="${0}" part="dialog" class="${0}" @cancel="${0}" @click="${0}" @pointerdown="${0}"> ${0} <div part="body" class="body"><slot></slot></div> ${0} </dialog> `),null!==(e=this.ariaLabelledby)&&void 0!==e?e:"title",(0,r.J)(this.ariaDescribedby),(0,s.H)({dialog:!0,open:this.open}),this.handleDialogCancel,this.handleDialogClick,this.handleDialogPointerDown,t?(0,i.qy)($||($=L` <header part="header" class="header"> <h2 part="title" class="title" id="title"> <slot name="label"> ${0} </slot> </h2> <div part="header-actions" class="header-actions"> <slot name="header-actions"></slot> <wa-button part="close-button" exportparts="base:close-button__base" class="close" appearance="plain" @click="${0}"> <wa-icon name="xmark" label="${0}" library="system" variant="solid"></wa-icon> </wa-button> </div> </header> `),this.label.length>0?this.label:String.fromCharCode(8203),e=>this.requestClose(e.target),this.localize.term("close")):"",a?(0,i.qy)(M||(M=L` <footer part="footer" class="footer"> <slot name="footer"></slot> </footer> `)):"")}constructor(){super(...arguments),this.localize=new m.c(this),this.hasSlotController=new u.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=e=>{"Escape"===e.key&&this.open&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}};q.css=y.A,C([(0,o.P)(".dialog")],q.prototype,"dialog",2),C([(0,o.MZ)({type:Boolean,reflect:!0})],q.prototype,"open",2),C([(0,o.MZ)({reflect:!0})],q.prototype,"label",2),C([(0,o.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],q.prototype,"withoutHeader",2),C([(0,o.MZ)({attribute:"light-dismiss",type:Boolean})],q.prototype,"lightDismiss",2),C([(0,o.MZ)({attribute:"aria-labelledby"})],q.prototype,"ariaLabelledby",2),C([(0,o.MZ)({attribute:"aria-describedby"})],q.prototype,"ariaDescribedby",2),C([(0,v.w)("open",{waitUntilFirstUpdate:!0})],q.prototype,"handleOpenChange",1),q=C([(0,o.EM)("wa-dialog")],q),document.addEventListener("click",e=>{const t=e.target.closest("[data-dialog]");if(t instanceof Element){const[e,a]=(0,p.v)(t.getAttribute("data-dialog")||"");if("open"===e&&null!=a&&a.length){const e=t.getRootNode().getElementById(a);"wa-dialog"===(null==e?void 0:e.localName)?e.open=!0:console.warn(`A dialog with an ID of "${a}" could not be found in this document.`)}}}),i.S$||document.addEventListener("pointerdown",()=>{}),t()}catch(k){t(k)}})}}]);
//# sourceMappingURL=25291.7aefb95aa67f38ab.js.map