"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["80957"],{58349:function(e,t,i){i(3362),i(62953);var a=i(40445),s=i(36387),o=i(34875),r=i(7731),n=i(96196),l=i(77845),d=i(94333),h=i(1087);i(9503);let c,p,g=e=>e;class m extends s.h{async onChange(e){super.onChange(e),(0,h.r)(this,e.type)}render(){const e={"mdc-deprecated-list-item__graphic":this.left,"mdc-deprecated-list-item__meta":!this.left},t=this.renderText(),i=this.graphic&&"control"!==this.graphic&&!this.left?this.renderGraphic():n.s6,a=this.hasMeta&&this.left?this.renderMeta():n.s6,s=this.renderRipple();return(0,n.qy)(c||(c=g` ${0} ${0} ${0} <span class="${0}"> <ha-checkbox reducedTouchTarget tabindex="${0}" .checked="${0}" .indeterminate="${0}" ?disabled="${0}" @change="${0}"> </ha-checkbox> </span> ${0} ${0}`),s,i,this.left?"":t,(0,d.H)(e),this.tabindex,this.selected,this.indeterminate,this.disabled||this.checkboxDisabled,this.onChange,this.left?t:"",a)}constructor(...e){super(...e),this.checkboxDisabled=!1,this.indeterminate=!1}}m.styles=[r.R,o.R,(0,n.AH)(p||(p=g`:host{--mdc-theme-secondary:var(--primary-color)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic{margin-inline-end:var(--mdc-list-item-graphic-margin,16px);margin-inline-start:0px;direction:var(--direction)}.mdc-deprecated-list-item__meta{flex-shrink:0;direction:var(--direction);margin-inline-start:auto;margin-inline-end:0}.mdc-deprecated-list-item__graphic{margin-top:var(--check-list-item-graphic-margin-top)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{margin-inline-start:0;margin-inline-end:var(--mdc-list-item-graphic-margin,32px)}`))],(0,a.Cg)([(0,l.MZ)({type:Boolean,attribute:"checkbox-disabled"})],m.prototype,"checkboxDisabled",void 0),(0,a.Cg)([(0,l.MZ)({type:Boolean})],m.prototype,"indeterminate",void 0),m=(0,a.Cg)([(0,l.EM)("ha-check-list-item")],m)},9503:function(e,t,i){var a=i(40445),s=i(69162),o=i(47191),r=i(96196),n=i(77845);let l;class d extends s.L{}d.styles=[o.R,(0,r.AH)(l||(l=(e=>e)`:host{--mdc-theme-secondary:var(--primary-color)}`))],d=(0,a.Cg)([(0,n.EM)("ha-checkbox")],d)},93444:function(e,t,i){var a=i(40445),s=i(96196),o=i(77845);let r,n,l=e=>e;class d extends s.WF{render(){return(0,s.qy)(r||(r=l` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,s.AH)(n||(n=l`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}d=(0,a.Cg)([(0,o.EM)("ha-dialog-footer")],d)},76538:function(e,t,i){i(62953);var a=i(40445),s=i(96196),o=i(77845);let r,n,l,d,h,c,p=e=>e;class g extends s.WF{render(){const e=(0,s.qy)(r||(r=p`<div class="header-title"> <slot name="title"></slot> </div>`)),t=(0,s.qy)(n||(n=p`<div class="header-subtitle"> <slot name="subtitle"></slot> </div>`));return(0,s.qy)(l||(l=p` <header class="header"> <div class="header-bar"> <section class="header-navigation-icon"> <slot name="navigationIcon"></slot> </section> <section class="header-content"> ${0} </section> <section class="header-action-items"> <slot name="actionItems"></slot> </section> </div> <slot></slot> </header> `),"above"===this.subtitlePosition?(0,s.qy)(d||(d=p`${0}${0}`),t,e):(0,s.qy)(h||(h=p`${0}${0}`),e,t))}static get styles(){return[(0,s.AH)(c||(c=p`:host{display:block}:host([show-border]){border-bottom:1px solid var(--mdc-dialog-scroll-divider-color,rgba(0,0,0,.12))}.header-bar{display:flex;flex-direction:row;align-items:center;padding:0 var(--ha-space-1);box-sizing:border-box}.header-content{flex:1;padding:10px var(--ha-space-1);display:flex;flex-direction:column;justify-content:center;min-height:var(--ha-space-12);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.header-title{height:var(--ha-dialog-header-title-height,calc(var(--ha-font-size-xl) + var(--ha-space-1)));font-size:var(--ha-font-size-xl);line-height:var(--ha-line-height-condensed);font-weight:var(--ha-font-weight-medium);color:var(--ha-dialog-header-title-color,var(--primary-text-color))}.header-subtitle{font-size:var(--ha-font-size-m);line-height:var(--ha-line-height-normal);color:var(--ha-dialog-header-subtitle-color,var(--secondary-text-color))}@media all and (min-width:450px) and (min-height:500px){.header-bar{padding:0 var(--ha-space-2)}}.header-navigation-icon{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}.header-action-items{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}`))]}constructor(...e){super(...e),this.subtitlePosition="below",this.showBorder=!1}}(0,a.Cg)([(0,o.MZ)({type:String,attribute:"subtitle-position"})],g.prototype,"subtitlePosition",void 0),(0,a.Cg)([(0,o.MZ)({type:Boolean,reflect:!0,attribute:"show-border"})],g.prototype,"showBorder",void 0),g=(0,a.Cg)([(0,o.EM)("ha-dialog-header")],g)},67505:function(e,t,i){var a=i(40445),s=i(96196),o=i(77845);i(67094);let r,n,l=e=>e;class d extends s.WF{render(){return this.hass?(0,s.qy)(r||(r=l` <ha-svg-icon .path="${0}"></ha-svg-icon> <span class="prefix">${0}</span> <span class="text"><slot></slot></span> `),"M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z",this.hass.localize("ui.panel.config.tips.tip")):s.s6}}d.styles=(0,s.AH)(n||(n=l`:host{display:block;text-align:center}.text{direction:var(--direction);margin-left:2px;margin-inline-start:2px;margin-inline-end:initial;color:var(--secondary-text-color)}.prefix{font-weight:var(--ha-font-weight-medium)}`)),(0,a.Cg)([(0,o.MZ)({attribute:!1})],d.prototype,"hass",void 0),d=(0,a.Cg)([(0,o.EM)("ha-tip")],d)},45331:function(e,t,i){i.a(e,async function(e,t){try{i(3362),i(62953);var a=i(40445),s=i(93900),o=i(96196),r=i(77845),n=i(32288),l=i(1087),d=i(59992),h=i(14503),c=(i(76538),i(26300),e([s,d]));[s,d]=c.then?(await c)():c;let p,g,m,u,f,v,_,w=e=>e;const y="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class b extends((0,d.V)(o.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,o.qy)(p||(p=w` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,n.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,n.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?o.s6:(0,o.qy)(g||(g=w` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",y,void 0!==this.headerTitle?(0,o.qy)(m||(m=w`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,o.qy)(u||(u=w`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,o.qy)(f||(f=w`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,o.qy)(v||(v=w`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,o.AH)(_||(_=w`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,l.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,l.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,l.r)(this,"closed"))}}}(0,a.Cg)([(0,r.MZ)({attribute:!1})],b.prototype,"hass",void 0),(0,a.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],b.prototype,"ariaLabelledBy",void 0),(0,a.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],b.prototype,"ariaDescribedBy",void 0),(0,a.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],b.prototype,"open",void 0),(0,a.Cg)([(0,r.MZ)({reflect:!0})],b.prototype,"type",void 0),(0,a.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],b.prototype,"width",void 0),(0,a.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],b.prototype,"preventScrimClose",void 0),(0,a.Cg)([(0,r.MZ)({attribute:"header-title"})],b.prototype,"headerTitle",void 0),(0,a.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],b.prototype,"headerSubtitle",void 0),(0,a.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],b.prototype,"headerSubtitlePosition",void 0),(0,a.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],b.prototype,"flexContent",void 0),(0,a.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],b.prototype,"withoutHeader",void 0),(0,a.Cg)([(0,r.wk)()],b.prototype,"_open",void 0),(0,a.Cg)([(0,r.P)(".body")],b.prototype,"bodyContainer",void 0),(0,a.Cg)([(0,r.wk)()],b.prototype,"_bodyScrolled",void 0),(0,a.Cg)([(0,r.Ls)({passive:!0})],b.prototype,"_handleBodyScroll",null),b=(0,a.Cg)([(0,r.EM)("ha-wa-dialog")],b),t()}catch(p){t(p)}})},71084:function(e,t,i){i.a(e,async function(e,a){try{i.r(t);i(44114),i(18111),i(22489),i(7588),i(3362),i(17642),i(58004),i(33853),i(45876),i(32475),i(15024),i(31698),i(62953);var s=i(40445),o=i(81446),r=i(96196),n=i(77845),l=i(4937),d=i(36312),h=i(1087),c=i(3129),p=i(53072),g=i(17022),m=i(65063),u=i(18350),f=(i(58349),i(45331)),v=(i(76538),i(93444),i(26300),i(8630),i(65829)),_=(i(67094),i(67505),i(45098)),w=i(62176),y=e([u,f,v,_,w]);[u,f,v,_,w]=y.then?(await y)():y;let b,x,$,C,k,M,S,A,H,L,z,I,q,Z=e=>e;const V="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",D="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",E="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",B="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z";class P extends r.WF{showDialog(e){this._params=e,this._refreshMedia(),this._open=!0}closeDialog(){return this._open=!1,!0}_dialogClosed(){this._filesChanged&&this._params.onClose&&this._params.onClose(),this._params=void 0,this._currentItem=void 0,this._uploading=!1,this._deleting=!1,this._filesChanged=!1,(0,h.r)(this,"dialog-closed",{dialog:this.localName})}willUpdate(){var e;this._filteredChildren=(null===(e=this._currentItem)||void 0===e||null===(e=e.children)||void 0===e?void 0:e.filter(e=>!e.can_expand))||[],0===this._filteredChildren.length&&0!==this._selected.size&&(this._selected=new Set)}render(){var e,t,i;if(!this._params)return r.s6;let a=0;return(0,r.qy)(b||(b=Z` <ha-wa-dialog .hass="${0}" .open="${0}" ?prevent-scrim-close="${0}" @closed="${0}"> <ha-dialog-header slot="header"> ${0} <span class="title" slot="title" id="dialog-box-title"> ${0} </span> ${0} </ha-dialog-header> ${0} ${0} </ha-wa-dialog> `),this.hass,this._open,this._uploading||this._deleting,this._dialogClosed,this._uploading||this._deleting?r.s6:(0,r.qy)(x||(x=Z`<slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button></slot>`),null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",V),this.hass.localize("ui.components.media-browser.file_management.title"),0===this._selected.size?(0,r.qy)($||($=Z`<ha-media-upload-button .hass="${0}" .currentItem="${0}" @uploading="${0}" @media-refresh="${0}" slot="actionItems"></ha-media-upload-button>`),this.hass,this._params.currentItem,this._startUploading,this._doneUploading):(0,r.qy)(C||(C=Z`<ha-button variant="danger" slot="actionItems" .disabled="${0}" @click="${0}"> <ha-svg-icon .path="${0}" slot="start"></ha-svg-icon> ${0} </ha-button>`),this._deleting,this._handleDelete,D,this.hass.localize("ui.components.media-browser.file_management."+(this._deleting?"deleting":"delete"),{count:this._selected.size})),this._currentItem?this._filteredChildren.length?(0,r.qy)(A||(A=Z` <div class="buttons" slot="footer"> <ha-button appearance="filled" @click="${0}" .disabled="${0}"> <ha-svg-icon .path="${0}" slot="start"></ha-svg-icon> ${0} </ha-button> <ha-button appearance="filled" @click="${0}" .disabled="${0}"> <ha-svg-icon .path="${0}" slot="start"></ha-svg-icon> ${0} </ha-button> </div> <ha-list multi @selected="${0}"> ${0} </ha-list> `),this._handleDeselectAll,0===this._selected.size,E,this.hass.localize("ui.components.media-browser.file_management.deselect_all"),this._handleSelectAll,this._selected.size===this._filteredChildren.length,B,this.hass.localize("ui.components.media-browser.file_management.select_all"),this._handleSelected,(0,l.u)(this._filteredChildren,e=>e.media_content_id,e=>{const t=(0,r.qy)(H||(H=Z` <ha-svg-icon slot="graphic" .path="${0}"></ha-svg-icon> `),p.EC["directory"===e.media_class&&e.children_media_class||e.media_class].icon);return(0,r.qy)(L||(L=Z` <ha-check-list-item ${0} graphic="icon" .disabled="${0}" .selected="${0}" .item="${0}"> ${0} ${0} </ha-check-list-item> `),(0,o.i0)({id:e.media_content_id,skipInitial:!0}),this._uploading||this._deleting,this._selected.has(a++),e,t,e.title)})):(0,r.qy)(M||(M=Z`<div class="no-items"> <p> ${0} </p> ${0} </div>`),this.hass.localize("ui.components.media-browser.file_management.no_items"),null!==(i=this._currentItem)&&void 0!==i&&null!==(i=i.children)&&void 0!==i&&i.length?(0,r.qy)(S||(S=Z`<span class="folders">${0}</span>`),this.hass.localize("ui.components.media-browser.file_management.folders_not_supported")):""):(0,r.qy)(k||(k=Z` <div class="refresh"> <ha-spinner></ha-spinner> </div> `)),(0,d.x)(this.hass,"hassio")?(0,r.qy)(z||(z=Z`<ha-tip .hass="${0}"> ${0} </ha-tip>`),this.hass,this.hass.localize("ui.components.media-browser.file_management.tip_media_storage",{storage:(0,r.qy)(I||(I=Z`<a href="/config/storage" @click="${0}"> ${0}</a>`),this.closeDialog,this.hass.localize("ui.components.media-browser.file_management.tip_storage_panel"))})):r.s6)}_handleSelected(e){this._selected=e.detail.index}_startUploading(){this._uploading=!0,this._filesChanged=!0}_doneUploading(){this._uploading=!1,this._refreshMedia()}_handleDeselectAll(){this._selected.size&&(this._selected=new Set)}_handleSelectAll(){this._selected=new Set([...Array(this._filteredChildren.length).keys()])}async _handleDelete(){if(!(await(0,m.dk)(this,{text:this.hass.localize("ui.components.media-browser.file_management.confirm_delete",{count:this._selected.size}),warning:!0})))return;this._filesChanged=!0,this._deleting=!0;const e=[];let t=0;this._currentItem.children.forEach(i=>{i.can_expand||this._selected.has(t++)&&e.push(i)});try{await Promise.all(e.map(async e=>{if((0,g.Jz)(e.media_content_id))await(0,g.WI)(this.hass,e.media_content_id);else if((0,g.iY)(e.media_content_id)){const t=(0,c.pD)(e.media_content_id);t&&await(0,c.vS)(this.hass,t)}this._currentItem=Object.assign(Object.assign({},this._currentItem),{},{children:this._currentItem.children.filter(t=>t!==e)})}))}finally{this._deleting=!1,this._selected=new Set}}async _refreshMedia(){this._selected=new Set,this._currentItem=void 0,this._currentItem=await(0,g.Fn)(this.hass,this._params.currentItem.media_content_id)}static get styles(){return[(0,r.AH)(q||(q=Z`ha-wa-dialog{--dialog-content-padding:0}ha-dialog-header ha-button,ha-dialog-header ha-media-upload-button{--mdc-theme-primary:var(--primary-text-color);margin:6px;display:block}ha-tip{margin:16px}.refresh{display:flex;height:200px;justify-content:center;align-items:center}.buttons{display:flex;justify-content:center;width:100%}.no-items{text-align:center;padding:16px}.folders{color:var(--secondary-text-color);font-style:italic}`))]}constructor(...e){super(...e),this._uploading=!1,this._deleting=!1,this._selected=new Set,this._open=!1,this._filteredChildren=[],this._filesChanged=!1}}(0,s.Cg)([(0,n.MZ)({attribute:!1})],P.prototype,"hass",void 0),(0,s.Cg)([(0,n.wk)()],P.prototype,"_currentItem",void 0),(0,s.Cg)([(0,n.wk)()],P.prototype,"_params",void 0),(0,s.Cg)([(0,n.wk)()],P.prototype,"_uploading",void 0),(0,s.Cg)([(0,n.wk)()],P.prototype,"_deleting",void 0),(0,s.Cg)([(0,n.wk)()],P.prototype,"_selected",void 0),(0,s.Cg)([(0,n.wk)()],P.prototype,"_open",void 0),(0,s.Cg)([(0,n.wk)()],P.prototype,"_filteredChildren",void 0),P=(0,s.Cg)([(0,n.EM)("dialog-media-manage")],P),a()}catch(b){a(b)}})},62176:function(e,t,i){i.a(e,async function(e,t){try{i(3362),i(62953);var a=i(40445),s=i(96196),o=i(77845),r=i(1087),n=i(17022),l=i(65063),d=i(18350),h=(i(67094),e([d]));d=(h.then?(await h)():h)[0];let c,p=e=>e;const g="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z";class m extends s.WF{render(){return this.currentItem&&(0,n.Jz)(this.currentItem.media_content_id||"")?(0,s.qy)(c||(c=p` <ha-button .disabled="${0}" @click="${0}" .loading="${0}"> <ha-svg-icon .path="${0}" slot="start"></ha-svg-icon> ${0} </ha-button> `),this._uploading>0,this._startUpload,this._uploading>0,g,this._uploading>0?this.hass.localize("ui.components.media-browser.file_management.uploading",{count:this._uploading}):this.hass.localize("ui.components.media-browser.file_management.add_media")):s.s6}async _startUpload(){if(this._uploading>0)return;const e=document.createElement("input");e.type="file",e.accept="audio/*,video/*,image/*",e.multiple=!0,e.addEventListener("change",async()=>{(0,r.r)(this,"uploading");const t=e.files;document.body.removeChild(e);const i=this.currentItem.media_content_id;for(let e=0;e<t.length;e++){this._uploading=t.length-e;try{await(0,n.VA)(this.hass,i,t[e])}catch(a){(0,l.showAlertDialog)(this,{text:this.hass.localize("ui.components.media-browser.file_management.upload_failed",{reason:a.message||a})});break}}this._uploading=0,(0,r.r)(this,"media-refresh")},{once:!0}),e.style.display="none",document.body.append(e),e.click()}constructor(...e){super(...e),this._uploading=0}}(0,a.Cg)([(0,o.MZ)({attribute:!1})],m.prototype,"hass",void 0),(0,a.Cg)([(0,o.MZ)({attribute:!1})],m.prototype,"currentItem",void 0),(0,a.Cg)([(0,o.wk)()],m.prototype,"_uploading",void 0),m=(0,a.Cg)([(0,o.EM)("ha-media-upload-button")],m),t()}catch(c){t(c)}})},3129:function(e,t,i){i.d(t,{AP:function(){return s},M5:function(){return d},Q0:function(){return r},mF:function(){return n},pD:function(){return o},vS:function(){return l}});i(16280),i(3362);const a="/api/image/serve/",s="media-source://image_upload",o=e=>{let t;if(e.startsWith(a)){t=e.substring(17);const i=t.indexOf("/");i>=0&&(t=t.substring(0,i))}else e.startsWith(s)&&(t=e.substring(s.length+1));return t},r=(e,t,i=!1)=>{if(!i&&!t)throw new Error("Size must be provided if original is false");return i?`/api/image/serve/${e}/original`:`/api/image/serve/${e}/${t}x${t}`},n=async(e,t)=>{const i=new FormData;i.append("file",t);const a=await e.fetchWithAuth("/api/image/upload",{method:"POST",body:i});if(413===a.status)throw new Error(`Uploaded image is too large (${t.name})`);if(200!==a.status)throw new Error("Unknown error");return a.json()},l=(e,t)=>e.callWS({type:"image/delete",image_id:t}),d=async(e,t)=>{const i=await fetch(e.hassUrl(t));if(!i.ok)throw new Error(`Failed to fetch image: ${i.statusText?i.statusText:i.status}`);return i.blob()}}}]);
//# sourceMappingURL=80957.30abaaa94b1e3111.js.map