"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["11345"],{57237:function(e,t,a){a.d(t,{d:function(){return i}});const i=e=>e.stopPropagation()},38962:function(e,t,a){a.r(t);a(62953);var i=a(40445),o=a(96196),s=a(77845),r=a(94333),n=a(1087);a(26300),a(67094);let d,l,h,c,p=e=>e;const g={info:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",warning:"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",error:"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",success:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"};class u extends o.WF{render(){return(0,o.qy)(d||(d=p` <div class="issue-type ${0}" role="alert"> <div class="icon ${0}"> <slot name="icon"> <ha-svg-icon .path="${0}"></ha-svg-icon> </slot> </div> <div class="${0}"> <div class="main-content"> ${0} <slot></slot> </div> <div class="action"> <slot name="action"> ${0} </slot> </div> </div> </div> `),(0,r.H)({[this.alertType]:!0}),this.title?"":"no-title",g[this.alertType],(0,r.H)({content:!0,narrow:this.narrow}),this.title?(0,o.qy)(l||(l=p`<div class="title">${0}</div>`),this.title):o.s6,this.dismissable?(0,o.qy)(h||(h=p`<ha-icon-button @click="${0}" label="Dismiss alert" .path="${0}"></ha-icon-button>`),this._dismissClicked,"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"):o.s6)}_dismissClicked(){(0,n.r)(this,"alert-dismissed-clicked")}constructor(...e){super(...e),this.title="",this.alertType="info",this.dismissable=!1,this.narrow=!1}}u.styles=(0,o.AH)(c||(c=p`.issue-type{position:relative;padding:8px;display:flex}.icon{height:var(--ha-alert-icon-size,24px);width:var(--ha-alert-icon-size,24px)}.issue-type::after{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.12;pointer-events:none;content:"";border-radius:var(--ha-border-radius-sm)}.icon.no-title{align-self:center}.content{display:flex;justify-content:space-between;align-items:center;width:100%;text-align:var(--float-start)}.content.narrow{flex-direction:column;align-items:flex-end}.action{z-index:1;width:min-content;--mdc-theme-primary:var(--primary-text-color)}.main-content{overflow-wrap:anywhere;word-break:break-word;line-height:normal;margin-left:8px;margin-right:0;margin-inline-start:8px;margin-inline-end:8px}.title{margin-top:2px;font-weight:var(--ha-font-weight-bold)}.action ha-icon-button{--mdc-theme-primary:var(--primary-text-color);--mdc-icon-button-size:36px}.issue-type.info>.icon{color:var(--info-color)}.issue-type.info::after{background-color:var(--info-color)}.issue-type.warning>.icon{color:var(--warning-color)}.issue-type.warning::after{background-color:var(--warning-color)}.issue-type.error>.icon{color:var(--error-color)}.issue-type.error::after{background-color:var(--error-color)}.issue-type.success>.icon{color:var(--success-color)}.issue-type.success::after{background-color:var(--success-color)}:host ::slotted(ul){margin:0;padding-inline-start:20px}`)),(0,i.Cg)([(0,s.MZ)()],u.prototype,"title",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"alert-type"})],u.prototype,"alertType",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],u.prototype,"dismissable",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],u.prototype,"narrow",void 0),u=(0,i.Cg)([(0,s.EM)("ha-alert")],u)},93444:function(e,t,a){var i=a(40445),o=a(96196),s=a(77845);let r,n,d=e=>e;class l extends o.WF{render(){return(0,o.qy)(r||(r=d` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,o.AH)(n||(n=d`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}l=(0,i.Cg)([(0,s.EM)("ha-dialog-footer")],l)},76538:function(e,t,a){a(62953);var i=a(40445),o=a(96196),s=a(77845);let r,n,d,l,h,c,p=e=>e;class g extends o.WF{render(){const e=(0,o.qy)(r||(r=p`<div class="header-title"> <slot name="title"></slot> </div>`)),t=(0,o.qy)(n||(n=p`<div class="header-subtitle"> <slot name="subtitle"></slot> </div>`));return(0,o.qy)(d||(d=p` <header class="header"> <div class="header-bar"> <section class="header-navigation-icon"> <slot name="navigationIcon"></slot> </section> <section class="header-content"> ${0} </section> <section class="header-action-items"> <slot name="actionItems"></slot> </section> </div> <slot></slot> </header> `),"above"===this.subtitlePosition?(0,o.qy)(l||(l=p`${0}${0}`),t,e):(0,o.qy)(h||(h=p`${0}${0}`),e,t))}static get styles(){return[(0,o.AH)(c||(c=p`:host{display:block}:host([show-border]){border-bottom:1px solid var(--mdc-dialog-scroll-divider-color,rgba(0,0,0,.12))}.header-bar{display:flex;flex-direction:row;align-items:center;padding:0 var(--ha-space-1);box-sizing:border-box}.header-content{flex:1;padding:10px var(--ha-space-1);display:flex;flex-direction:column;justify-content:center;min-height:var(--ha-space-12);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.header-title{height:var(--ha-dialog-header-title-height,calc(var(--ha-font-size-xl) + var(--ha-space-1)));font-size:var(--ha-font-size-xl);line-height:var(--ha-line-height-condensed);font-weight:var(--ha-font-weight-medium);color:var(--ha-dialog-header-title-color,var(--primary-text-color))}.header-subtitle{font-size:var(--ha-font-size-m);line-height:var(--ha-line-height-normal);color:var(--ha-dialog-header-subtitle-color,var(--secondary-text-color))}@media all and (min-width:450px) and (min-height:500px){.header-bar{padding:0 var(--ha-space-2)}}.header-navigation-icon{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}.header-action-items{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}`))]}constructor(...e){super(...e),this.subtitlePosition="below",this.showBorder=!1}}(0,i.Cg)([(0,s.MZ)({type:String,attribute:"subtitle-position"})],g.prototype,"subtitlePosition",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"show-border"})],g.prototype,"showBorder",void 0),g=(0,i.Cg)([(0,s.EM)("ha-dialog-header")],g)},70947:function(e,t,a){var i=a(40445),o=a(79265),s=(a(94100),a(96196)),r=a(77845);a(67094);let n,d,l=e=>e;class h extends o.A{renderCheckboxIcon(){return(0,s.qy)(n||(n=l` <ha-svg-icon id="check" part="checkmark" .path="${0}"></ha-svg-icon> `),this.checked?"M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z":"M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z")}static get styles(){return[o.A.styles,(0,s.AH)(d||(d=l`:host{min-height:var(--ha-space-10)}#check{visibility:visible;flex-shrink:0}#icon ::slotted(*){color:var(--ha-color-on-neutral-normal)}:host([variant=danger]) #icon ::slotted(*){color:var(--ha-color-on-danger-quiet)}`))]}}h=(0,i.Cg)([(0,r.EM)("ha-dropdown-item")],h)},29823:function(e,t,a){a.a(e,async function(e,t){try{a(62953);var i=a(40445),o=a(52254),s=a(96196),r=a(77845),n=e([o]);o=(n.then?(await n)():n)[0];let d,l=e=>e;class h extends o.A{static get styles(){return[o.A.styles,(0,s.AH)(d||(d=l`:host{font-size:var(--ha-dropdown-font-size, var(--ha-font-size-m));--wa-color-surface-raised:var(
            --card-background-color,
            var(--ha-dialog-surface-background, var(--mdc-theme-surface, #fff)),
          )}#menu{padding:var(--ha-space-1)}`))]}constructor(...e){super(...e),this.dropdownTag="ha-dropdown",this.dropdownItemTag="ha-dropdown-item"}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],h.prototype,"dropdownTag",void 0),(0,i.Cg)([(0,r.MZ)({attribute:!1})],h.prototype,"dropdownItemTag",void 0),h=(0,i.Cg)([(0,r.EM)("ha-dropdown")],h),t()}catch(d){t(d)}})},43661:function(e,t,a){a.r(t),a.d(t,{HaIconNext:function(){return n}});a(62953);var i=a(40445),o=a(77845),s=a(63091),r=a(67094);class n extends r.HaSvgIcon{constructor(...e){super(...e),this.path="rtl"===s.G.document.dir?"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z":"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}}(0,i.Cg)([(0,o.MZ)()],n.prototype,"path",void 0),n=(0,i.Cg)([(0,o.EM)("ha-icon-next")],n)},77729:function(e,t,a){a.a(e,async function(e,t){try{a(89463),a(74423),a(44114),a(26910),a(18111),a(22489),a(61701),a(3362),a(62953);var i=a(40445),o=a(88696),s=a(96196),r=a(77845),n=a(94333),d=a(32288),l=a(4937),h=a(3890),c=a(22786),p=a(1087),g=a(57237),u=a(52220),v=(a(88945),a(26300),a(43661),a(17308),a(2846),a(85938),a(67094),e([o]));o=(v.then?(await v)():v)[0];let m,y,b,f,w,_,x,C,M,k,A,$=e=>e;const S="M21 11H3V9H21V11M21 13H3V15H21V13Z",L="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",I="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z";class Z extends s.WF{render(){const e=this._allItems(this.items,this.value.hidden,this.value.order),t=this._showIcon.value;return(0,s.qy)(m||(m=$` <ha-sortable draggable-selector=".draggable" handle-selector=".handle" @item-moved="${0}"> <ha-md-list> ${0} </ha-md-list> </ha-sortable> `),this._itemMoved,(0,l.u)(e,e=>e.value,(e,a)=>{const i=!this.value.hidden.includes(e.value),{label:o,value:r,description:l,icon:c,iconPath:p,disableSorting:u,disableHiding:v}=e;return(0,s.qy)(y||(y=$` <ha-md-list-item type="button" @click="${0}" .value="${0}" class="${0}" @keydown="${0}" .idx="${0}"> <span slot="headline">${0}</span> ${0} ${0} ${0} ${0} ${0} ${0} </ha-md-list-item> `),this.showNavigationButton?this._navigate:void 0,r,(0,n.H)({hidden:!i,draggable:i&&!u,"drag-selected":this._dragIndex===a}),i&&!u?this._listElementKeydown:void 0,a,o,l?(0,s.qy)(b||(b=$`<span slot="supporting-text">${0}</span>`),l):s.s6,t?c?(0,s.qy)(f||(f=$` <ha-icon class="icon" .icon="${0}" slot="start"></ha-icon> `),(0,h.T)(c,"")):p?(0,s.qy)(w||(w=$` <ha-svg-icon class="icon" .path="${0}" slot="start"></ha-svg-icon> `),p):s.s6:s.s6,this.showNavigationButton?(0,s.qy)(_||(_=$` <ha-icon-next slot="end"></ha-icon-next> <div slot="end" class="separator"></div> `)):s.s6,this.actionsRenderer?(0,s.qy)(x||(x=$` <div slot="end" @click="${0}"> ${0} </div> `),g.d,this.actionsRenderer(e)):s.s6,i&&v?s.s6:(0,s.qy)(C||(C=$`<ha-icon-button .path="${0}" slot="end" .label="${0}" .value="${0}" @click="${0}" .disabled="${0}"></ha-icon-button>`),i?L:I,this.hass.localize("ui.components.items-display-editor."+(i?"hide":"show"),{label:o}),r,this._toggle,v||!1),i&&!u?(0,s.qy)(M||(M=$` <ha-svg-icon tabindex="${0}" .idx="${0}" @keydown="${0}" class="handle" .path="${0}" slot="end"></ha-svg-icon> `),(0,d.J)(this.showNavigationButton?"0":void 0),a,this.showNavigationButton?this._dragHandleKeydown:void 0,S):(0,s.qy)(k||(k=$`<ha-svg-icon slot="end"></ha-svg-icon>`)))}))}_toggle(e){e.stopPropagation(),this._dragIndex=null;const t=e.currentTarget.value,a=this._hiddenItems(this.items,this.value.hidden).map(e=>e.value);a.includes(t)?a.splice(a.indexOf(t),1):a.push(t);const i=this._visibleItems(this.items,a,this.value.order).map(e=>e.value);this.value={hidden:a,order:i},(0,p.r)(this,"value-changed",{value:this.value})}_itemMoved(e){e.stopPropagation();const{oldIndex:t,newIndex:a}=e.detail;this._moveItem(t,a)}_moveItem(e,t){if(e===t)return;const a=this._visibleItems(this.items,this.value.hidden,this.value.order).map(e=>e.value),i=a.splice(e,1)[0];a.splice(t,0,i),this.value=Object.assign(Object.assign({},this.value),{},{order:a}),(0,p.r)(this,"value-changed",{value:this.value})}_navigate(e){const t=e.currentTarget.value;(0,p.r)(this,"item-display-navigate-clicked",{value:t}),e.stopPropagation()}_dragHandleKeydown(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),null===this._dragIndex?(this._dragIndex=e.target.idx,this.addEventListener("keydown",this._sortKeydown)):(this.removeEventListener("keydown",this._sortKeydown),this._dragIndex=null))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._sortKeydown)}constructor(...e){super(...e),this.items=[],this.showNavigationButton=!1,this.dontSortVisible=!1,this.value={order:[],hidden:[]},this._dragIndex=null,this._showIcon=new o.P(this,{callback:e=>{var t;return(null===(t=e[0])||void 0===t?void 0:t.contentRect.width)>450}}),this._visibleItems=(0,c.A)((e,t,a)=>{const i=(0,u.u1)(a),o=e.filter(e=>!t.includes(e.value));return this.dontSortVisible?[...o.filter(e=>!e.disableSorting),...o.filter(e=>e.disableSorting)]:o.sort((e,t)=>e.disableSorting&&!t.disableSorting?-1:i(e.value,t.value))}),this._allItems=(0,c.A)((e,t,a)=>[...this._visibleItems(e,t,a),...this._hiddenItems(e,t)]),this._hiddenItems=(0,c.A)((e,t)=>e.filter(e=>t.includes(e.value))),this._maxSortableIndex=(0,c.A)((e,t)=>e.filter(e=>!e.disableSorting&&!t.includes(e.value)).length-1),this._keyActivatedMove=(e,t=!1)=>{const a=this._dragIndex;"ArrowUp"===e.key?this._dragIndex=Math.max(0,this._dragIndex-1):this._dragIndex=Math.min(this._maxSortableIndex(this.items,this.value.hidden),this._dragIndex+1),this._moveItem(a,this._dragIndex),setTimeout(async()=>{var e;await this.updateComplete;const a=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(`ha-md-list-item:nth-child(${this._dragIndex+1})`);null==a||a.focus(),t&&(this._dragIndex=null)})},this._sortKeydown=e=>{null===this._dragIndex||"ArrowUp"!==e.key&&"ArrowDown"!==e.key?null!==this._dragIndex&&"Escape"===e.key&&(e.preventDefault(),e.stopPropagation(),this._dragIndex=null,this.removeEventListener("keydown",this._sortKeydown)):(e.preventDefault(),this._keyActivatedMove(e))},this._listElementKeydown=e=>{!e.altKey||"ArrowUp"!==e.key&&"ArrowDown"!==e.key?(!this.showNavigationButton&&"Enter"===e.key||" "===e.key)&&this._dragHandleKeydown(e):(e.preventDefault(),this._dragIndex=e.target.idx,this._keyActivatedMove(e,!0))}}}Z.styles=(0,s.AH)(A||(A=$`:host{display:block}.handle{cursor:move;padding:8px;margin:-8px}.separator{width:1px;background-color:var(--divider-color);height:21px;margin:0 -4px}ha-md-list{padding:0}ha-md-list-item{--md-list-item-top-space:0;--md-list-item-bottom-space:0;--md-list-item-leading-space:8px;--md-list-item-trailing-space:8px;--md-list-item-two-line-container-height:48px;--md-list-item-one-line-container-height:48px}ha-md-list-item.drag-selected{--md-focus-ring-color:rgba(var(--rgb-accent-color), 0.6);border-radius:var(--ha-border-radius-md);outline:solid;outline-color:rgba(var(--rgb-accent-color),.6);outline-offset:-2px;outline-width:2px;background-color:rgba(var(--rgb-accent-color),.08)}ha-md-list-item ha-icon-button{margin-left:-12px;margin-right:-12px}ha-md-list-item.hidden{--md-list-item-label-text-color:var(--disabled-text-color);--md-list-item-supporting-text-color:var(--disabled-text-color)}ha-md-list-item.hidden .icon{color:var(--disabled-text-color)}`)),(0,i.Cg)([(0,r.MZ)({attribute:!1})],Z.prototype,"hass",void 0),(0,i.Cg)([(0,r.MZ)({attribute:!1})],Z.prototype,"items",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"show-navigation-button"})],Z.prototype,"showNavigationButton",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"dont-sort-visible"})],Z.prototype,"dontSortVisible",void 0),(0,i.Cg)([(0,r.MZ)({attribute:!1})],Z.prototype,"value",void 0),(0,i.Cg)([(0,r.MZ)({attribute:!1})],Z.prototype,"actionsRenderer",void 0),(0,i.Cg)([(0,r.wk)()],Z.prototype,"_dragIndex",void 0),Z=(0,i.Cg)([(0,r.EM)("ha-items-display-editor")],Z),t()}catch(m){t(m)}})},85938:function(e,t,a){a(18111),a(22489),a(3362),a(46058),a(62953);var i=a(40445),o=a(96196),s=a(77845),r=a(1087);let n,d=e=>e;class l extends o.WF{updated(e){e.has("disabled")&&(this.disabled?this._destroySortable():this._createSortable())}disconnectedCallback(){super.disconnectedCallback(),this._shouldBeDestroy=!0,setTimeout(()=>{this._shouldBeDestroy&&(this._destroySortable(),this._shouldBeDestroy=!1)},1)}connectedCallback(){super.connectedCallback(),this._shouldBeDestroy=!1,this.hasUpdated&&!this.disabled&&this._createSortable()}createRenderRoot(){return this}render(){return this.noStyle?o.s6:(0,o.qy)(n||(n=d` <style>.sortable-fallback{display:none!important}.sortable-ghost{box-shadow:0 0 0 2px var(--primary-color);background:rgba(var(--rgb-primary-color),.25);border-radius:var(--ha-border-radius-sm);opacity:.4}.sortable-drag{border-radius:var(--ha-border-radius-sm);opacity:1;background:var(--card-background-color);box-shadow:0px 4px 8px 3px #00000026;cursor:grabbing}</style> `))}async _createSortable(){if(this._sortable)return;const e=this.children[0];if(!e)return;const t=(await Promise.all([a.e("85283"),a.e("70322")]).then(a.bind(a,80745))).default,i=Object.assign(Object.assign({scroll:!0,forceAutoScrollFallback:!0,scrollSpeed:20,animation:150},this.options),{},{onChoose:this._handleChoose,onStart:this._handleStart,onEnd:this._handleEnd,onUpdate:this._handleUpdate,onAdd:this._handleAdd,onRemove:this._handleRemove});this.draggableSelector&&(i.draggable=this.draggableSelector),this.handleSelector&&(i.handle=this.handleSelector),void 0!==this.invertSwap&&(i.invertSwap=this.invertSwap),this.group&&(i.group=this.group),this.filter&&(i.filter=this.filter),this._sortable=new t(e,i)}_destroySortable(){this._sortable&&(this._sortable.destroy(),this._sortable=void 0)}constructor(...e){super(...e),this.disabled=!1,this.noStyle=!1,this.invertSwap=!1,this.rollback=!0,this._shouldBeDestroy=!1,this._handleUpdate=e=>{(0,r.r)(this,"item-moved",{newIndex:e.newIndex,oldIndex:e.oldIndex})},this._handleAdd=e=>{(0,r.r)(this,"item-added",{index:e.newIndex,data:e.item.sortableData,item:e.item})},this._handleRemove=e=>{(0,r.r)(this,"item-removed",{index:e.oldIndex})},this._handleEnd=async e=>{(0,r.r)(this,"drag-end"),this.rollback&&e.item.placeholder&&(e.item.placeholder.replaceWith(e.item),delete e.item.placeholder)},this._handleStart=()=>{(0,r.r)(this,"drag-start")},this._handleChoose=e=>{this.rollback&&(e.item.placeholder=document.createComment("sort-placeholder"),e.item.after(e.item.placeholder))}}}(0,i.Cg)([(0,s.MZ)({type:Boolean})],l.prototype,"disabled",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,attribute:"no-style"})],l.prototype,"noStyle",void 0),(0,i.Cg)([(0,s.MZ)({type:String,attribute:"draggable-selector"})],l.prototype,"draggableSelector",void 0),(0,i.Cg)([(0,s.MZ)({type:String,attribute:"handle-selector"})],l.prototype,"handleSelector",void 0),(0,i.Cg)([(0,s.MZ)({type:String,attribute:"filter"})],l.prototype,"filter",void 0),(0,i.Cg)([(0,s.MZ)({type:String})],l.prototype,"group",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,attribute:"invert-swap"})],l.prototype,"invertSwap",void 0),(0,i.Cg)([(0,s.MZ)({attribute:!1})],l.prototype,"options",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean})],l.prototype,"rollback",void 0),l=(0,i.Cg)([(0,s.EM)("ha-sortable")],l)},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var i=a(40445),o=a(93900),s=a(96196),r=a(77845),n=a(32288),d=a(1087),l=a(59992),h=a(14503),c=(a(76538),a(26300),e([o,l]));[o,l]=c.then?(await c)():c;let p,g,u,v,m,y,b,f=e=>e;const w="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class _ extends((0,l.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,s.qy)(p||(p=f` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,n.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,n.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?s.s6:(0,s.qy)(g||(g=f` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",w,void 0!==this.headerTitle?(0,s.qy)(u||(u=f`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,s.qy)(v||(v=f`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,s.qy)(m||(m=f`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,s.qy)(y||(y=f`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,s.AH)(b||(b=f`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,d.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,d.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,d.r)(this,"closed"))}}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],_.prototype,"hass",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],_.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],_.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],_.prototype,"open",void 0),(0,i.Cg)([(0,r.MZ)({reflect:!0})],_.prototype,"type",void 0),(0,i.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],_.prototype,"width",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],_.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-title"})],_.prototype,"headerTitle",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],_.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],_.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],_.prototype,"flexContent",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],_.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,r.wk)()],_.prototype,"_open",void 0),(0,i.Cg)([(0,r.P)(".body")],_.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,r.wk)()],_.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,r.Ls)({passive:!0})],_.prototype,"_handleBodyScroll",null),_=(0,i.Cg)([(0,r.EM)("ha-wa-dialog")],_),t()}catch(p){t(p)}})},93576:function(e,t,a){a.a(e,async function(e,i){try{a.r(t);a(74423),a(18111),a(22489),a(3362),a(17642),a(58004),a(33853),a(45876),a(32475),a(15024),a(31698),a(58335),a(62953);var o=a(40445),s=a(43306),r=a(96196),n=a(77845),d=a(22786),l=a(1087),h=(a(38962),a(18350)),c=(a(93444),a(29823)),p=(a(70947),a(44010),a(26300),a(77729)),g=a(14240),u=a(65829),v=(a(67094),a(45331)),m=a(48250),y=a(99774),b=a(65063),f=e([s,h,c,p,u,v,g]);[s,h,c,p,u,v,g]=f.then?(await f)():f;let w,_,x,C,M,k=e=>e;const A="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",$="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z";class S extends r.WF{async showDialog(){this._open=!0,this._getData()}async _getData(){try{const e=await(0,m.aI)(this.hass.connection,"sidebar");if(this._order=null==e?void 0:e.panelOrder,this._hidden=null==e?void 0:e.hiddenPanels,!this._order){const e=localStorage.getItem("sidebarPanelOrder");this._migrateToUserData=!!e,this._order=e?JSON.parse(e):[]}if(!this._hidden){const e=localStorage.getItem("sidebarHiddenPanels");this._migrateToUserData=this._migrateToUserData||!!e,this._hidden=e?JSON.parse(e):[]}}catch(e){this._error=e.message||e}}_dialogClosed(){this._open=!1,(0,l.r)(this,"dialog-closed",{dialog:this.localName})}closeDialog(){this._open=!1}_renderContent(){if(!this._order||!this._hidden)return(0,r.qy)(w||(w=k`<ha-fade-in .delay="${0}"><ha-spinner size="large"></ha-spinner></ha-fade-in>`),500);if(this._error)return(0,r.qy)(_||(_=k`<ha-alert alert-type="error">${0}</ha-alert>`),this._error);const e=this._panels(this.hass.panels),t=(0,y.EN)(this.hass),[a,i]=(0,g.computePanels)(this.hass.panels,t,this._order,this._hidden,this.hass.locale),o=new Set(this._order),s=new Set(this._hidden);for(const r of e)!1!==r.default_visible||o.has(r.url_path)||s.has(r.url_path)||s.add(r.url_path);s.has(t)&&s.delete(t);const n=Array.from(s),d=[...a,...e.filter(e=>n.includes(e.url_path)),...i].map(e=>({value:e.url_path,label:((0,y.hL)(this.hass,e)||e.url_path)+""+(t===e.url_path?" (default)":""),icon:(0,y.Q)(e),iconPath:(0,y.FW)(e),disableHiding:e.url_path===t}));return(0,r.qy)(x||(x=k` <ha-items-display-editor .hass="${0}" .value="${0}" .items="${0}" @value-changed="${0}" dont-sort-visible> </ha-items-display-editor> `),this.hass,{order:this._order,hidden:n},d,this._changed)}render(){const e=this.hass.localize("ui.sidebar.edit_sidebar");return(0,r.qy)(C||(C=k` <ha-wa-dialog .hass="${0}" .open="${0}" header-title="${0}" header-subtitle="${0}" @closed="${0}"> <ha-dropdown slot="headerActionItems" placement="bottom-end"> <ha-icon-button slot="trigger" .label="${0}" .path="${0}"></ha-icon-button> <ha-dropdown-item @click="${0}"> <ha-svg-icon slot="icon" .path="${0}"></ha-svg-icon> ${0} </ha-dropdown-item> </ha-dropdown> <div class="content">${0}</div> <ha-dialog-footer slot="footer"> <ha-button slot="secondaryAction" appearance="plain" @click="${0}"> ${0} </ha-button> <ha-button slot="primaryAction" .disabled="${0}" @click="${0}"> ${0} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `),this.hass,this._open,e,this._migrateToUserData?"":this.hass.localize("ui.sidebar.edit_subtitle"),this._dialogClosed,this.hass.localize("ui.common.menu"),A,this._resetToDefaults,$,this.hass.localize("ui.sidebar.reset_to_defaults"),this._renderContent(),this.closeDialog,this.hass.localize("ui.common.cancel"),!this._order||!this._hidden,this._save,this.hass.localize("ui.common.save"))}_changed(e){const{order:t=[],hidden:a=[]}=e.detail.value;this._order=[...t],this._hidden=[...a]}async _save(){if(this._migrateToUserData){if(!(await(0,b.dk)(this,{destructive:!0,text:this.hass.localize("ui.sidebar.migrate_to_user_data")})))return}try{await(0,m.Bp)(this.hass.connection,"sidebar",{panelOrder:this._order,hiddenPanels:this._hidden})}catch(e){return void(this._error=e.message||e)}this.closeDialog()}constructor(...e){super(...e),this._open=!1,this._migrateToUserData=!1,this._panels=(0,d.A)(e=>e?Object.values(e):[]),this._resetToDefaults=async()=>{if(await(0,b.dk)(this,{text:this.hass.localize("ui.sidebar.reset_confirmation"),confirmText:this.hass.localize("ui.common.reset")})){this._order=[],this._hidden=[];try{await(0,m.Bp)(this.hass.connection,"sidebar",{})}catch(e){this._error=e.message||e}this.closeDialog()}}}}S.styles=(0,r.AH)(M||(M=k`ha-wa-dialog{max-height:90%;--dialog-content-padding:var(--ha-space-2) var(--ha-space-6)}@media all and (max-width:580px),all and (max-height:500px){ha-wa-dialog{min-width:100%;min-height:100%}}ha-fade-in{display:flex;justify-content:center;align-items:center}`)),(0,o.Cg)([(0,n.MZ)({attribute:!1})],S.prototype,"hass",void 0),(0,o.Cg)([(0,n.wk)()],S.prototype,"_open",void 0),(0,o.Cg)([(0,n.wk)()],S.prototype,"_order",void 0),(0,o.Cg)([(0,n.wk)()],S.prototype,"_hidden",void 0),(0,o.Cg)([(0,n.wk)()],S.prototype,"_error",void 0),(0,o.Cg)([(0,n.wk)()],S.prototype,"_migrateToUserData",void 0),S=(0,o.Cg)([(0,n.EM)("dialog-edit-sidebar")],S),i()}catch(w){i(w)}})}}]);
//# sourceMappingURL=11345.c3c1b491d87c3322.js.map