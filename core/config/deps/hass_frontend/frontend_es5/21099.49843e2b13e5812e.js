"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["21099"],{58139:function(e,t,a){a.d(t,{d:function(){return i}});a(3362);const i=async(e,t)=>new Promise(a=>{const i=t(e,e=>{i(),a(e)})})},93444:function(e,t,a){var i=a(40445),o=a(96196),s=a(77845);let r,n,l=e=>e;class d extends o.WF{render(){return(0,o.qy)(r||(r=l` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,o.AH)(n||(n=l`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}d=(0,i.Cg)([(0,s.EM)("ha-dialog-footer")],d)},64138:function(e,t,a){a.a(e,async function(e,i){try{a.r(t),a.d(t,{HaIconPicker:function(){return x}});a(74423),a(44114),a(26910),a(18111),a(22489),a(7588),a(61701),a(13579),a(3362),a(27495),a(25440),a(62953);var o=a(40445),s=a(96196),r=a(77845),n=a(22786),l=a(1087),d=a(57769),h=(a(75064),a(38508)),c=(a(88945),e([h]));h=(c.then?(await c)():c)[0];let u,g,p,f=e=>e,v=[],m=!1;const b=(e,t)=>{var a;const i=`${t}:${e.name}`,o=e.name,s=o.split("-"),r=null!==(a=e.keywords)&&void 0!==a?a:[],n={iconName:o};return s.forEach((e,t)=>{n[`part${t}`]=e}),r.forEach((e,t)=>{n[`keyword${t}`]=e}),{id:i,primary:i,icon:i,search_labels:n,sorting_label:i}},y=async()=>{m=!0;const e=await a.e("81340").then(a.t.bind(a,25143,19));v=e.default.map(e=>b(e,"mdi"));const t=[];Object.keys(d.y).forEach(e=>{t.push(w(e))}),(await Promise.all(t)).forEach(e=>{v.push(...e)})},w=async e=>{try{const t=d.y[e].getIconList;if("function"!=typeof t)return[];return(await t()).map(t=>b(t,e))}catch(t){return console.warn(`Unable to load icon list for ${e} iconset`),[]}},_=e=>(0,s.qy)(u||(u=f` <ha-combo-box-item type="button"> <ha-icon .icon="${0}" slot="start"></ha-icon> ${0} </ha-combo-box-item> `),e.id,e.id);class x extends s.WF{render(){return(0,s.qy)(g||(g=f` <ha-generic-picker .hass="${0}" allow-custom-value .getItems="${0}" .helper="${0}" .disabled="${0}" .required="${0}" .errorMessage="${0}" .invalid="${0}" .rowRenderer="${0}" .icon="${0}" .label="${0}" .value="${0}" .searchFn="${0}" popover-placement="bottom-start" @value-changed="${0}"> <slot name="start"></slot> </ha-generic-picker> `),this.hass,this._getIconPickerItems,this.helper,this.disabled,this.required,this.errorMessage,this.invalid,_,this._icon,this.label,this._value,this._filterIcons,this._valueChanged)}firstUpdated(){m||y().then(()=>{this._getIconPickerItems=()=>v,this.requestUpdate()})}_valueChanged(e){e.stopPropagation(),this._setValue(e.detail.value)}_setValue(e){this.value=e,(0,l.r)(this,"value-changed",{value:this._value},{bubbles:!1,composed:!1})}get _icon(){var e;return null!==(e=this.value)&&void 0!==e&&e.length?this.value:this.placeholder}get _value(){return this.value||""}constructor(...e){super(...e),this.disabled=!1,this.required=!1,this.invalid=!1,this._getIconPickerItems=()=>v,this._filterIcons=(0,n.A)((e,t,a)=>{const i=e.toLowerCase().replace(/\s+/g,"-"),o=null!=a&&a.length?a:t;if(!i.length)return o;const s=[];for(const r of o){const e=(r.id.split(":")[1]||r.id).toLowerCase().split("-"),t=r.search_labels?Object.values(r.search_labels).filter(e=>null!==e).map(e=>e.toLowerCase()):[],a=r.id.toLowerCase();e.includes(i)?s.push({item:r,rank:1}):t.includes(i)?s.push({item:r,rank:2}):a.includes(i)?s.push({item:r,rank:3}):t.some(e=>e.includes(i))&&s.push({item:r,rank:4})}return s.sort((e,t)=>e.rank-t.rank).map(e=>e.item)})}}x.styles=(0,s.AH)(p||(p=f`ha-generic-picker{width:100%;display:block}`)),(0,o.Cg)([(0,r.MZ)({attribute:!1})],x.prototype,"hass",void 0),(0,o.Cg)([(0,r.MZ)()],x.prototype,"value",void 0),(0,o.Cg)([(0,r.MZ)()],x.prototype,"label",void 0),(0,o.Cg)([(0,r.MZ)()],x.prototype,"helper",void 0),(0,o.Cg)([(0,r.MZ)()],x.prototype,"placeholder",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"error-message"})],x.prototype,"errorMessage",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],x.prototype,"disabled",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],x.prototype,"required",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],x.prototype,"invalid",void 0),x=(0,o.Cg)([(0,r.EM)("ha-icon-picker")],x),i()}catch(u){i(u)}})},63891:function(e,t,a){a(16280),a(3362),a(62953);var i=a(40445),o=a(96196),s=a(77845),r=a(49142),n=(a(34296),a(67094),a(1087)),l=a(36312);let d,h,c=e=>e;class u extends o.WF{firstUpdated(e){super.firstUpdated(e),this.hass&&(0,l.x)(this.hass,"ai_task")&&(0,r.sG)(this.hass).then(e=>{this._aiPrefs=e})}render(){if(!this._aiPrefs||!this._aiPrefs.gen_data_entity_id)return o.s6;let e;switch(this._state.status){case"error":e=this.hass.localize("ui.components.suggest_with_ai.error");break;case"done":e=this.hass.localize("ui.components.suggest_with_ai.done");break;case"suggesting":e=this.hass.localize(`ui.components.suggest_with_ai.suggesting_${this._state.suggestionIndex}`);break;default:e=this.hass.localize("ui.components.suggest_with_ai.label")}return(0,o.qy)(d||(d=c` <ha-assist-chip @click="${0}" .label="${0}" ?active="${0}" class="${0}" style="${0}"> <ha-svg-icon slot="icon" .path="${0}"></ha-svg-icon> </ha-assist-chip> `),this._suggest,e,"suggesting"===this._state.status,"error"===this._state.status?"error":"done"===this._state.status?"done":"",this._minWidth?`min-width: ${this._minWidth}`:"","M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z")}async _suggest(){var e;if(!this.generateTask||"suggesting"===this._state.status)return;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("ha-assist-chip");t&&(this._minWidth=`${t.offsetWidth}px`),this._state={status:"suggesting",suggestionIndex:1};try{this._intervalId=window.setInterval(()=>{this._state=Object.assign(Object.assign({},this._state),{},{suggestionIndex:this._state.suggestionIndex%3+1})},3e3);const e=await this.generateTask();let t;if("data"!==e.type)throw new Error("Unsupported task type");t=await(0,r.Pj)(this.hass,e.task),(0,n.r)(this,"suggestion",t),this._state=Object.assign(Object.assign({},this._state),{},{status:"done"})}catch(a){console.error("Error generating AI suggestion:",a),this._state=Object.assign(Object.assign({},this._state),{},{status:"error"})}finally{this._intervalId&&(clearInterval(this._intervalId),this._intervalId=void 0),setTimeout(()=>{this._state=Object.assign(Object.assign({},this._state),{},{status:"idle"}),this._minWidth=void 0},3e3)}}constructor(...e){super(...e),this._state={status:"idle",suggestionIndex:1}}}u.styles=(0,o.AH)(h||(h=c`ha-assist-chip[active]{animation:pulse-glow 1.5s ease-in-out infinite}ha-assist-chip.error{box-shadow:0 0 12px 4px rgba(var(--rgb-error-color),.8)}ha-assist-chip.done{box-shadow:0 0 12px 4px rgba(var(--rgb-primary-color),.8)}@keyframes pulse-glow{0%{box-shadow:0 0 0 0 rgba(var(--rgb-primary-color),0)}50%{box-shadow:0 0 8px 2px rgba(var(--rgb-primary-color),.6)}100%{box-shadow:0 0 0 0 rgba(var(--rgb-primary-color),0)}}`)),(0,i.Cg)([(0,s.MZ)({attribute:!1})],u.prototype,"hass",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"task-type"})],u.prototype,"taskType",void 0),(0,i.Cg)([(0,s.MZ)({attribute:!1})],u.prototype,"generateTask",void 0),(0,i.Cg)([(0,s.wk)()],u.prototype,"_aiPrefs",void 0),(0,i.Cg)([(0,s.wk)()],u.prototype,"_state",void 0),(0,i.Cg)([(0,s.wk)()],u.prototype,"_minWidth",void 0),u=(0,i.Cg)([(0,s.EM)("ha-suggest-with-ai-button")],u)},45331:function(e,t,a){a.a(e,async function(e,t){try{a(3362),a(62953);var i=a(40445),o=a(93900),s=a(96196),r=a(77845),n=a(32288),l=a(1087),d=a(59992),h=a(14503),c=(a(76538),a(26300),e([o,d]));[o,d]=c.then?(await c)():c;let u,g,p,f,v,m,b,y=e=>e;const w="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class _ extends((0,d.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,s.qy)(u||(u=y` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,n.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,n.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?s.s6:(0,s.qy)(g||(g=y` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",w,void 0!==this.headerTitle?(0,s.qy)(p||(p=y`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,s.qy)(f||(f=y`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,s.qy)(v||(v=y`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,s.qy)(m||(m=y`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,(0,s.AH)(b||(b=y`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,l.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,l.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,l.r)(this,"closed"))}}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],_.prototype,"hass",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],_.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],_.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],_.prototype,"open",void 0),(0,i.Cg)([(0,r.MZ)({reflect:!0})],_.prototype,"type",void 0),(0,i.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],_.prototype,"width",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],_.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-title"})],_.prototype,"headerTitle",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],_.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],_.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],_.prototype,"flexContent",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],_.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,r.wk)()],_.prototype,"_open",void 0),(0,i.Cg)([(0,r.P)(".body")],_.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,r.wk)()],_.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,r.Ls)({passive:!0})],_.prototype,"_handleBodyScroll",null),_=(0,i.Cg)([(0,r.EM)("ha-wa-dialog")],_),t()}catch(u){t(u)}})},49142:function(e,t,a){a.d(t,{HU:function(){return s},Pj:function(){return r},sG:function(){return o},xW:function(){return i}});a(3362);var i=function(e){return e[e.GENERATE_DATA=1]="GENERATE_DATA",e[e.SUPPORT_ATTACHMENTS=2]="SUPPORT_ATTACHMENTS",e[e.GENERATE_IMAGE=4]="GENERATE_IMAGE",e}({});const o=e=>e.callWS({type:"ai_task/preferences/get"}),s=(e,t)=>e.callWS(Object.assign({type:"ai_task/preferences/set"},t)),r=async(e,t)=>(await e.callService("ai_task","generate_data",t,void 0,!0,!0)).response},42961:function(e,t,a){a.d(t,{e:function(){return n}});var i=a(70570),o=a(9899);const s=e=>e.sendMessagePromise({type:"config/floor_registry/list"}),r=(e,t)=>e.subscribeEvents((0,o.s)(()=>s(e).then(e=>t.setState(e,!0)),500,!0),"floor_registry_updated"),n=(e,t)=>(0,i.N)("_floorRegistry",s,r,e,t)},36215:function(e,t,a){a.a(e,async function(e,i){try{a.d(t,{Fn:function(){return u},q3:function(){return c}});a(89463),a(18111),a(22489),a(20116),a(61701),a(53921),a(3362),a(62953);var o=a(74487),s=a(53289),r=a(91536),n=e([o]);o=(n.then?(await n)():n)[0];const d={name:!0,description:!0,categories:!0,labels:!0},h=new Intl.ListFormat("en",{style:"long",type:"conjunction"});async function c(e,t,a,i,o=[],n=d){const[l,c]=await Promise.all([n.categories?(0,r.jE)(e,a):Promise.resolve(void 0),n.floor?(0,r.q6)(e):Promise.resolve(void 0)]),u=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},n.name&&{name:{description:`The name of the ${a}`,required:!0,selector:{text:{}}}}),n.description&&{description:{description:`A short description of the ${a}`,required:!1,selector:{text:{}}}}),n.labels&&{labels:{description:`Labels for the ${a}`,required:!1,selector:{text:{multiple:!0}}}}),n.categories&&l&&{category:{description:`The category of the ${a}`,required:!1,selector:{select:{options:Object.entries(l).map(([e,t])=>({value:e,label:t}))}}}}),n.floor&&c&&{floor:{description:`The floor of the ${a}`,required:!1,selector:{select:{options:Object.values(c).map(e=>({value:e.floor_id,label:e.name}))}}}}),g=[n.name?"a name":null,n.description?"a description":null,n.categories?"a category":null,n.labels?"labels":null,n.floor?"a floor":null].filter(e=>null!==e),p=[n.categories?"category":null,n.labels?"labels":null,n.floor?"floor":null].filter(e=>null!==e),f=h.format(p);return{type:"data",task:{task_name:`frontend__${a}__save`,instructions:[`Suggest in language "${t}" ${g.length?h.format(g):"suggestions"} for the following Home Assistant ${a}.`,"",n.name?`The name should be relevant to the ${a}'s purpose.`:`The suggestions should be relevant to the ${a}'s purpose.`,...o.length?[...n.name?[`The name should be in same style and sentence capitalization as existing ${a}s.`]:[],...n.categories||n.labels||n.floor?[`Suggest ${f} if relevant to the ${a}'s purpose.`,`Only suggest ${f} that are already used by existing ${a}s.`]:[]]:n.name?[`The name should be short, descriptive, sentence case, and written in the language ${t}.`]:[],...n.description?[`If the ${a} contains 5+ steps, include a short description.`]:[],"",`For inspiration, here are existing ${a}s:`,o.join("\n"),"",`The ${a} configuration is as follows:`,"",`${(0,s.dump)(i)}`].join("\n"),structure:u}}}async function u(e,t,a,i=d){var o;const[s,n,l]=await Promise.all([i.categories?(0,r.jE)(e,t):Promise.resolve(void 0),i.labels?(0,r.wR)(e):Promise.resolve(void 0),i.floor?(0,r.q6)(e):Promise.resolve(void 0)]),h={name:i.name?a.data.name:void 0,description:i.description?a.data.description:void 0};if(i.categories&&s&&a.data.category){var c;const e=null===(c=Object.entries(s).find(([,e])=>e===a.data.category))||void 0===c?void 0:c[0];e&&(h.category=e)}if(i.labels&&n&&null!==(o=a.data.labels)&&void 0!==o&&o.length){const e=Object.fromEntries(a.data.labels.map(e=>[e,void 0]));let t=a.data.labels.length;for(const[a,o]of Object.entries(n))if(o in e&&void 0===e[o]&&(e[o]=a,t--,0===t))break;const i=Object.values(e).filter(e=>void 0!==e);i.length&&(h.labels=i)}if(i.floor&&l&&a.data.floor){var u;const e=a.data.floor in l?a.data.floor:null===(u=Object.entries(l).find(([,e])=>e.name===a.data.floor))||void 0===u?void 0:u[0];e&&(h.floor=e)}return h}i()}catch(l){i(l)}})},91536:function(e,t,a){a.d(t,{RF:function(){return g},U3:function(){return p},jE:function(){return h},q6:function(){return u},wR:function(){return c}});a(18111),a(61701),a(53921);var i=a(58139),o=a(53641),s=a(76570),r=a(59241),n=a(42961),l=a(92557);const d=e=>e.catch(e=>(console.error("Error fetching data for suggestion: ",e),{})),h=(e,t)=>d((0,s.AH)(e,t).then(e=>Object.fromEntries(e.map(e=>[e.category_id,e.name])))),c=e=>d((0,i.d)(e,l.o5).then(e=>Object.fromEntries(e.map(e=>[e.label_id,e.name])))),u=e=>d((0,i.d)(e,n.e).then(e=>Object.fromEntries(e.map(e=>[e.floor_id,e])))),g=e=>d((0,i.d)(e,o.ft).then(e=>Object.fromEntries(e.map(e=>[e.area_id,e])))),p=e=>d((0,i.d)(e,r.Bz).then(e=>Object.fromEntries(e.map(e=>[e.entity_id,e]))))},97268:function(e,t,a){a.d(t,{U:function(){return r},m:function(){return s}});a(44114),a(72712),a(18111),a(22489),a(61701),a(18237),a(3362),a(62953);var i=a(71727),o=a(91536);const s=async(e,t,a)=>{const[s,r,n]=await Promise.all([(0,o.jE)(e,a),(0,o.U3)(e),(0,o.wR)(e)]);return Object.values(r).reduce((e,o)=>{if(!o||(0,i.m)(o.entity_id)!==a)return e;const r=t[o.entity_id];if(!r||r.attributes.restored||!r.attributes.friendly_name)return e;let l=`- ${r.attributes.friendly_name}`;const d=o.categories[a];if(d&&s[d]&&(l+=` (category: ${s[d]})`),o.labels.length){const e=o.labels.map(e=>n[e]).filter(Boolean);e.length&&(l+=` (labels: ${e.join(", ")})`)}return e.push(l),e},[])},r=async e=>{const[t,a,i]=await Promise.all([(0,o.wR)(e),(0,o.q6)(e),(0,o.RF)(e)]);return Object.values(i).reduce((e,i)=>{var o;if(!i.floor_id)return e;const s=null===(o=a[i.floor_id])||void 0===o?void 0:o.name,r=i.labels.map(e=>t[e]).filter(Boolean);return e.push(`- ${i.name} (${s?`floor: ${s}`:"no floor"}${r.length?`, labels: ${r.join(", ")}`:""})`),e},[])}}}]);
//# sourceMappingURL=21099.49843e2b13e5812e.js.map