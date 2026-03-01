"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["11444"],{66033:function(e,t,a){a.d(t,{L:function(){return i}});const i=(e,t)=>{const a=e.floor_id;return{area:e,floor:(a?t[a]:void 0)||null}}},66086:function(e,t,a){a.a(e,async function(e,t){try{a(74423),a(18111),a(22489),a(61701),a(3362),a(62953);var i=a(40445),s=a(96196),o=a(77845),r=a(22786),l=a(1087),d=a(65522),n=a(55931),h=a(66033),c=a(49852),p=a(53641),u=a(65063),g=a(34023),v=(a(75064),a(38508)),y=(a(26300),a(67094),e([v]));v=(y.then?(await y)():y)[0];let m,f,_,b,w,C,$,x=e=>e;const k="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",M="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.9 21.11 2 20 2M4 6L6 4H10.9L4 10.9V6M4 13.7L13.7 4H18.6L4 18.6V13.7M20 18L18 20H13.1L20 13.1V18M20 10.3L10.3 20H5.4L20 5.4V10.3Z",L="___ADD_NEW___";class A extends s.WF{async open(){var e;await this.updateComplete,await(null===(e=this._picker)||void 0===e?void 0:e.open())}render(){var e;const t=null!==(e=this.label)&&void 0!==e?e:this.hass.localize("ui.components.area-picker.area"),a=this._computeValueRenderer(this.hass.areas);let i=t;if(this.value&&t){const e=this.hass.areas[this.value];if(e){const{floor:t}=(0,h.L)(e,this.hass.floors);t&&(i=void 0)}}return(0,s.qy)(m||(m=x` <ha-generic-picker .hass="${0}" .autofocus="${0}" .label="${0}" .helper="${0}" .notFoundLabel="${0}" .emptyLabel="${0}" .disabled="${0}" .required="${0}" .value="${0}" .getItems="${0}" .getAdditionalItems="${0}" .valueRenderer="${0}" .addButtonLabel="${0}" .searchKeys="${0}" .unknownItemText="${0}" @value-changed="${0}"> </ha-generic-picker> `),this.hass,this.autofocus,i,this.helper,this._notFoundLabel,this.hass.localize("ui.components.area-picker.no_areas"),this.disabled,this.required,this.value,this._getItems,this._getAdditionalItems,a,this.addButtonLabel,c.P,this.hass.localize("ui.components.area-picker.unknown"),this._valueChanged)}_valueChanged(e){e.stopPropagation();const t=e.detail.value;if(t){if(t.startsWith(L)){this.hass.loadFragmentTranslation("config");const e=t.substring(L.length);return void(0,g.J)(this,{suggestedName:e,createEntry:async e=>{try{const t=await(0,p.L3)(this.hass,e);this._setValue(t.area_id)}catch(t){(0,u.showAlertDialog)(this,{title:this.hass.localize("ui.components.area-picker.failed_create_area"),text:t.message})}}})}this._setValue(t)}else this._setValue(void 0)}_setValue(e){this.value=e,(0,l.r)(this,"value-changed",{value:e}),(0,l.r)(this,"change")}constructor(...e){super(...e),this.noAdd=!1,this.disabled=!1,this.required=!1,this._getAreasMemoized=(0,r.A)(c.j),this._computeValueRenderer=(0,r.A)(e=>e=>{const t=this.hass.areas[e];if(!t)return(0,s.qy)(f||(f=x` <ha-svg-icon slot="start" .path="${0}"></ha-svg-icon> <span slot="headline">${0}</span> `),M,t);const{floor:a}=(0,h.L)(t,this.hass.floors),i=t?(0,d.A)(t):void 0,o=a?(0,n.X)(a):void 0,r=t.icon;return(0,s.qy)(_||(_=x` ${0} <span slot="headline">${0}</span> ${0} `),r?(0,s.qy)(b||(b=x`<ha-icon slot="start" .icon="${0}"></ha-icon>`),r):(0,s.qy)(w||(w=x`<ha-svg-icon slot="start" .path="${0}"></ha-svg-icon>`),M),i,o?(0,s.qy)(C||(C=x`<span slot="supporting-text">${0}</span>`),o):s.s6)}),this._getItems=()=>this._getAreasMemoized(this.hass.areas,this.hass.floors,this.hass.devices,this.hass.entities,this.hass.states,this.includeDomains,this.excludeDomains,this.includeDeviceClasses,this.deviceFilter,this.entityFilter,this.excludeAreas),this._allAreaNames=(0,r.A)(e=>Object.values(e).map(e=>{var t;return null===(t=(0,d.A)(e))||void 0===t?void 0:t.toLowerCase()}).filter(Boolean)),this._getAdditionalItems=e=>{if(this.noAdd)return[];const t=this._allAreaNames(this.hass.areas);return e&&!t.includes(e.toLowerCase())?[{id:L+e,primary:this.hass.localize("ui.components.area-picker.add_new_sugestion",{name:e}),icon_path:k}]:[{id:L,primary:this.hass.localize("ui.components.area-picker.add_new"),icon_path:k}]},this._notFoundLabel=e=>this.hass.localize("ui.components.area-picker.no_match",{term:(0,s.qy)($||($=x`<b>‘${0}’</b>`),e)})}}(0,i.Cg)([(0,o.MZ)({attribute:!1})],A.prototype,"hass",void 0),(0,i.Cg)([(0,o.MZ)()],A.prototype,"label",void 0),(0,i.Cg)([(0,o.MZ)()],A.prototype,"value",void 0),(0,i.Cg)([(0,o.MZ)()],A.prototype,"helper",void 0),(0,i.Cg)([(0,o.MZ)()],A.prototype,"placeholder",void 0),(0,i.Cg)([(0,o.MZ)({type:Boolean,attribute:"no-add"})],A.prototype,"noAdd",void 0),(0,i.Cg)([(0,o.MZ)({type:Array,attribute:"include-domains"})],A.prototype,"includeDomains",void 0),(0,i.Cg)([(0,o.MZ)({type:Array,attribute:"exclude-domains"})],A.prototype,"excludeDomains",void 0),(0,i.Cg)([(0,o.MZ)({type:Array,attribute:"include-device-classes"})],A.prototype,"includeDeviceClasses",void 0),(0,i.Cg)([(0,o.MZ)({type:Array,attribute:"exclude-areas"})],A.prototype,"excludeAreas",void 0),(0,i.Cg)([(0,o.MZ)({attribute:!1})],A.prototype,"deviceFilter",void 0),(0,i.Cg)([(0,o.MZ)({attribute:!1})],A.prototype,"entityFilter",void 0),(0,i.Cg)([(0,o.MZ)({type:Boolean})],A.prototype,"disabled",void 0),(0,i.Cg)([(0,o.MZ)({type:Boolean})],A.prototype,"required",void 0),(0,i.Cg)([(0,o.MZ)({attribute:"add-button-label"})],A.prototype,"addButtonLabel",void 0),(0,i.Cg)([(0,o.P)("ha-generic-picker")],A.prototype,"_picker",void 0),A=(0,i.Cg)([(0,o.EM)("ha-area-picker")],A),t()}catch(m){t(m)}})},93444:function(e,t,a){var i=a(40445),s=a(96196),o=a(77845);let r,l,d=e=>e;class n extends s.WF{render(){return(0,s.qy)(r||(r=d` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,s.AH)(l||(l=d`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}n=(0,i.Cg)([(0,o.EM)("ha-dialog-footer")],n)},2846:function(e,t,a){a.d(t,{G:function(){return p},J:function(){return c}});var i=a(40445),s=a(97154),o=a(82553),r=a(96196),l=a(77845);a(54276);let d,n,h=e=>e;const c=[o.R,(0,r.AH)(d||(d=h`:host{--ha-icon-display:block;--md-sys-color-primary:var(--primary-text-color);--md-sys-color-secondary:var(--secondary-text-color);--md-sys-color-surface:var(--card-background-color);--md-sys-color-on-surface:var(--primary-text-color);--md-sys-color-on-surface-variant:var(--secondary-text-color)}md-item{overflow:var(--md-item-overflow,hidden);align-items:var(--md-item-align-items,center);gap:var(--ha-md-list-item-gap,16px)}`))];class p extends s.n{renderRipple(){return"text"===this.type?r.s6:(0,r.qy)(n||(n=h`<ha-ripple part="ripple" for="item" ?disabled="${0}"></ha-ripple>`),this.disabled&&"link"!==this.type)}}p.styles=c,p=(0,i.Cg)([(0,l.EM)("ha-md-list-item")],p)},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var i=a(40445),s=a(93900),o=a(96196),r=a(77845),l=a(32288),d=a(1087),n=a(59992),h=a(14503),c=(a(76538),a(26300),e([s,n]));[s,n]=c.then?(await c)():c;let p,u,g,v,y,m,f,_=e=>e;const b="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class w extends((0,n.V)(o.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,o.qy)(p||(p=_` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,l.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?o.s6:(0,o.qy)(u||(u=_` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",b,void 0!==this.headerTitle?(0,o.qy)(g||(g=_`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,o.qy)(v||(v=_`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,o.qy)(y||(y=_`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,o.qy)(m||(m=_`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,o.AH)(f||(f=_`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,d.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,d.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,d.r)(this,"closed"))}}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],w.prototype,"hass",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],w.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],w.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],w.prototype,"open",void 0),(0,i.Cg)([(0,r.MZ)({reflect:!0})],w.prototype,"type",void 0),(0,i.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],w.prototype,"width",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],w.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-title"})],w.prototype,"headerTitle",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],w.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],w.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],w.prototype,"flexContent",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],w.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,r.wk)()],w.prototype,"_open",void 0),(0,i.Cg)([(0,r.P)(".body")],w.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,r.wk)()],w.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,r.Ls)({passive:!0})],w.prototype,"_handleBodyScroll",null),w=(0,i.Cg)([(0,r.EM)("ha-wa-dialog")],w),t()}catch(p){t(p)}})},49852:function(e,t,a){a.d(t,{P:function(){return n},j:function(){return d}});a(74423),a(18111),a(81148),a(22489),a(61701),a(13579);var i=a(65522),s=a(71727),o=a(55931),r=a(66033),l=a(28989);const d=(e,t,a,d,n,h,c,p,u,g,v,y="")=>{let m,f,_={};const b=Object.values(e),w=Object.values(a),C=Object.values(d);(h||c||p||u||g)&&(_=(0,l.g2)(C),m=w,f=C.filter(e=>e.area_id),h&&(m=m.filter(e=>{const t=_[e.id];return!(!t||!t.length)&&_[e.id].some(e=>h.includes((0,s.m)(e.entity_id)))}),f=f.filter(e=>h.includes((0,s.m)(e.entity_id)))),c&&(m=m.filter(e=>{const t=_[e.id];return!t||!t.length||C.every(e=>!c.includes((0,s.m)(e.entity_id)))}),f=f.filter(e=>!c.includes((0,s.m)(e.entity_id)))),p&&(m=m.filter(e=>{const t=_[e.id];return!(!t||!t.length)&&_[e.id].some(e=>{const t=n[e.entity_id];return!!t&&(t.attributes.device_class&&p.includes(t.attributes.device_class))})}),f=f.filter(e=>{const t=n[e.entity_id];return t.attributes.device_class&&p.includes(t.attributes.device_class)})),u&&(m=m.filter(e=>u(e))),g&&(m=m.filter(e=>{const t=_[e.id];return!(!t||!t.length)&&_[e.id].some(e=>{const t=n[e.entity_id];return!!t&&g(t)})}),f=f.filter(e=>{const t=n[e.entity_id];return!!t&&g(t)})));let $,x=b;m&&($=m.filter(e=>e.area_id).map(e=>e.area_id)),f&&($=(null!=$?$:[]).concat(f.filter(e=>e.area_id).map(e=>e.area_id))),$&&(x=x.filter(e=>$.includes(e.area_id))),v&&(x=x.filter(e=>!v.includes(e.area_id)));return x.map(e=>{const{floor:a}=(0,r.L)(e,t),s=a?(0,o.X)(a):void 0,l=(0,i.A)(e);return{id:`${y}${e.area_id}`,primary:l||e.area_id,secondary:s,icon:e.icon||void 0,icon_path:e.icon?void 0:"M20 2H4C2.9 2 2 2.9 2 4V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.9 21.11 2 20 2M4 6L6 4H10.9L4 10.9V6M4 13.7L13.7 4H18.6L4 18.6V13.7M20 18L18 20H13.1L20 13.1V18M20 10.3L10.3 20H5.4L20 5.4V10.3Z",search_labels:{areaId:e.area_id,aliases:e.aliases.join(" ")}}})},n=[{name:"primary",weight:10},{name:"search_labels.aliases",weight:8},{name:"secondary",weight:6},{name:"search_labels.domain",weight:4},{name:"search_labels.areaId",weight:2}]},34023:function(e,t,a){a.d(t,{E:function(){return s},J:function(){return o}});a(3362),a(62953);var i=a(1087);const s=()=>Promise.all([a.e("73126"),a.e("44533"),a.e("92769"),a.e("62453"),a.e("85010"),a.e("80995"),a.e("10417"),a.e("36105"),a.e("26233"),a.e("39005"),a.e("8851"),a.e("66201"),a.e("21099"),a.e("99038"),a.e("71769"),a.e("53353")]).then(a.bind(a,39803)),o=(e,t)=>{(0,i.r)(e,"show-dialog",{dialogTag:"dialog-area-registry-detail",dialogImport:s,dialogParams:t})}},22756:function(e,t,a){a.a(e,async function(e,i){try{a.r(t);a(3362),a(42762),a(62953);var s=a(40445),o=a(96196),r=a(77845),l=a(1087),d=a(79),n=(a(38962),a(66086)),h=a(45331),c=(a(93444),a(18350)),p=a(50176),u=(a(75709),a(14503)),g=e([n,h,c,p]);[n,h,c,p]=g.then?(await g)():g;let v,y,m,f=e=>e;class _ extends o.WF{async showDialog(e){this._params=e,this._error=void 0,this._nameByUser=this._params.device.name_by_user||"",this._areaId=this._params.device.area_id||"",this._labels=this._params.device.labels||[],this._disabledBy=this._params.device.disabled_by,this._open=!0,await this.updateComplete}closeDialog(){this._open=!1}_dialogClosed(){this._error="",this._params=void 0,(0,l.r)(this,"dialog-closed",{dialog:this.localName})}render(){if(!this._params)return o.s6;const e=this._params.device;return(0,o.qy)(v||(v=f` <ha-wa-dialog .hass="${0}" .open="${0}" header-title="${0}" prevent-scrim-close @closed="${0}"> <div> ${0} <div class="form"> <ha-textfield autofocus .value="${0}" @input="${0}" .label="${0}" .placeholder="${0}" .disabled="${0}"></ha-textfield> <ha-area-picker .hass="${0}" .value="${0}" @value-changed="${0}"></ha-area-picker> <ha-labels-picker .hass="${0}" .value="${0}" @value-changed="${0}"></ha-labels-picker> <div class="row"> <ha-switch .checked="${0}" .disabled="${0}" @change="${0}"> </ha-switch> <div> <div> ${0} </div> <div class="secondary"> ${0} ${0} </div> </div> </div> </div> </div> <ha-dialog-footer slot="footer"> <ha-button slot="secondaryAction" @click="${0}" .disabled="${0}" appearance="plain"> ${0} </ha-button> <ha-button slot="primaryAction" @click="${0}" .disabled="${0}"> ${0} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `),this.hass,this._open,(0,d.T)(e,this.hass),this._dialogClosed,this._error?(0,o.qy)(y||(y=f`<ha-alert alert-type="error">${0}</ha-alert> `),this._error):"",this._nameByUser,this._nameChanged,this.hass.localize("ui.dialogs.device-registry-detail.name"),e.name||"",this._submitting,this.hass,this._areaId,this._areaPicked,this.hass,this._labels,this._labelsChanged,!this._disabledBy,"config_entry"===this._params.device.disabled_by,this._disabledByChanged,this.hass.localize("ui.dialogs.device-registry-detail.enabled_label",{type:this.hass.localize(`ui.dialogs.device-registry-detail.type.${e.entry_type||"device"}`)}),this._disabledBy&&"user"!==this._disabledBy?this.hass.localize("ui.dialogs.device-registry-detail.enabled_cause",{type:this.hass.localize(`ui.dialogs.device-registry-detail.type.${e.entry_type||"device"}`),cause:this.hass.localize(`config_entry.disabled_by.${this._disabledBy}`)}):"",this.hass.localize("ui.dialogs.device-registry-detail.enabled_description"),this.closeDialog,this._submitting,this.hass.localize("ui.common.cancel"),this._updateEntry,this._submitting,this.hass.localize("ui.dialogs.device-registry-detail.update"))}_nameChanged(e){this._error=void 0,this._nameByUser=e.target.value}_areaPicked(e){this._areaId=e.detail.value}_labelsChanged(e){this._labels=e.detail.value}_disabledByChanged(e){this._disabledBy=e.target.checked?null:"user"}async _updateEntry(){this._submitting=!0;try{await this._params.updateEntry({name_by_user:this._nameByUser.trim()||null,area_id:this._areaId||null,labels:this._labels||null,disabled_by:this._disabledBy||null}),this.closeDialog()}catch(e){this._error=e.message||this.hass.localize("ui.dialogs.device-registry-detail.unknown_error")}finally{this._submitting=!1}}static get styles(){return[u.RF,u.nA,(0,o.AH)(m||(m=f`ha-button.warning{margin-right:auto;margin-inline-end:auto;margin-inline-start:initial}ha-area-picker,ha-labels-picker,ha-textfield{display:block;margin-bottom:16px}ha-switch{margin-right:16px;margin-inline-end:16px;margin-inline-start:initial;direction:var(--direction)}.row{margin-top:8px;color:var(--primary-text-color);display:flex;align-items:center}`))]}constructor(...e){super(...e),this._open=!1,this._submitting=!1}}(0,s.Cg)([(0,r.MZ)({attribute:!1})],_.prototype,"hass",void 0),(0,s.Cg)([(0,r.wk)()],_.prototype,"_open",void 0),(0,s.Cg)([(0,r.wk)()],_.prototype,"_nameByUser",void 0),(0,s.Cg)([(0,r.wk)()],_.prototype,"_error",void 0),(0,s.Cg)([(0,r.wk)()],_.prototype,"_params",void 0),(0,s.Cg)([(0,r.wk)()],_.prototype,"_areaId",void 0),(0,s.Cg)([(0,r.wk)()],_.prototype,"_labels",void 0),(0,s.Cg)([(0,r.wk)()],_.prototype,"_disabledBy",void 0),(0,s.Cg)([(0,r.wk)()],_.prototype,"_submitting",void 0),_=(0,s.Cg)([(0,r.EM)("dialog-device-registry-detail")],_),i()}catch(v){i(v)}})},69569:function(e,t,a){a.d(t,{f:function(){return o}});a(3362),a(62953);var i=a(1087);const s=()=>Promise.all([a.e("92769"),a.e("62453"),a.e("79406"),a.e("26233"),a.e("39005"),a.e("92678")]).then(a.bind(a,427)),o=(e,t)=>{(0,i.r)(e,"show-dialog",{dialogTag:"dialog-label-detail",dialogImport:s,dialogParams:t})}}}]);
//# sourceMappingURL=11444.eb9f16f6fadb2241.js.map