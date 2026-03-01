export const __rspack_esm_id="21099";export const __rspack_esm_ids=["21099"];export const __webpack_modules__={58139(e,t,a){a.d(t,{d:()=>i});const i=async(e,t)=>new Promise(a=>{const i=t(e,e=>{i(),a(e)})})},93444(e,t,a){var i=a(62826),o=a(96196),s=a(44457);class r extends o.WF{render(){return o.qy` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `}static get styles(){return[o.AH`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`]}}r=(0,i.Cg)([(0,s.EM)("ha-dialog-footer")],r)},64138(e,t,a){a.a(e,async function(e,i){try{a.r(t),a.d(t,{HaIconPicker:()=>b});a(44114),a(18111),a(22489),a(7588),a(61701),a(13579);var o=a(62826),s=a(96196),r=a(44457),l=a(22786),n=a(1087),d=a(57769),h=(a(75064),a(38508)),c=(a(88945),e([h]));h=(c.then?(await c)():c)[0];let p=[],g=!1;const u=(e,t)=>{const a=`${t}:${e.name}`,i=e.name,o=i.split("-"),s=e.keywords??[],r={iconName:i};return o.forEach((e,t)=>{r[`part${t}`]=e}),s.forEach((e,t)=>{r[`keyword${t}`]=e}),{id:a,primary:a,icon:a,search_labels:r,sorting_label:a}},f=async()=>{g=!0;const e=await a.e("81340").then(a.t.bind(a,25143,19));p=e.default.map(e=>u(e,"mdi"));const t=[];Object.keys(d.y).forEach(e=>{t.push(v(e))}),(await Promise.all(t)).forEach(e=>{p.push(...e)})},v=async e=>{try{const t=d.y[e].getIconList;if("function"!=typeof t)return[];return(await t()).map(t=>u(t,e))}catch(t){return console.warn(`Unable to load icon list for ${e} iconset`),[]}},m=e=>s.qy` <ha-combo-box-item type="button"> <ha-icon .icon="${e.id}" slot="start"></ha-icon> ${e.id} </ha-combo-box-item> `;class b extends s.WF{render(){return s.qy` <ha-generic-picker .hass="${this.hass}" allow-custom-value .getItems="${this._getIconPickerItems}" .helper="${this.helper}" .disabled="${this.disabled}" .required="${this.required}" .errorMessage="${this.errorMessage}" .invalid="${this.invalid}" .rowRenderer="${m}" .icon="${this._icon}" .label="${this.label}" .value="${this._value}" .searchFn="${this._filterIcons}" popover-placement="bottom-start" @value-changed="${this._valueChanged}"> <slot name="start"></slot> </ha-generic-picker> `}firstUpdated(){g||f().then(()=>{this._getIconPickerItems=()=>p,this.requestUpdate()})}_valueChanged(e){e.stopPropagation(),this._setValue(e.detail.value)}_setValue(e){this.value=e,(0,n.r)(this,"value-changed",{value:this._value},{bubbles:!1,composed:!1})}get _icon(){return this.value?.length?this.value:this.placeholder}get _value(){return this.value||""}constructor(...e){super(...e),this.disabled=!1,this.required=!1,this.invalid=!1,this._getIconPickerItems=()=>p,this._filterIcons=(0,l.A)((e,t,a)=>{const i=e.toLowerCase().replace(/\s+/g,"-"),o=a?.length?a:t;if(!i.length)return o;const s=[];for(const e of o){const t=(e.id.split(":")[1]||e.id).toLowerCase().split("-"),a=e.search_labels?Object.values(e.search_labels).filter(e=>null!==e).map(e=>e.toLowerCase()):[],o=e.id.toLowerCase();t.includes(i)?s.push({item:e,rank:1}):a.includes(i)?s.push({item:e,rank:2}):o.includes(i)?s.push({item:e,rank:3}):a.some(e=>e.includes(i))&&s.push({item:e,rank:4})}return s.sort((e,t)=>e.rank-t.rank).map(e=>e.item)})}}b.styles=s.AH`ha-generic-picker{width:100%;display:block}`,(0,o.Cg)([(0,r.MZ)({attribute:!1})],b.prototype,"hass",void 0),(0,o.Cg)([(0,r.MZ)()],b.prototype,"value",void 0),(0,o.Cg)([(0,r.MZ)()],b.prototype,"label",void 0),(0,o.Cg)([(0,r.MZ)()],b.prototype,"helper",void 0),(0,o.Cg)([(0,r.MZ)()],b.prototype,"placeholder",void 0),(0,o.Cg)([(0,r.MZ)({attribute:"error-message"})],b.prototype,"errorMessage",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],b.prototype,"disabled",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],b.prototype,"required",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean})],b.prototype,"invalid",void 0),b=(0,o.Cg)([(0,r.EM)("ha-icon-picker")],b),i()}catch(e){i(e)}})},63891(e,t,a){var i=a(62826),o=a(96196),s=a(44457),r=a(49142),l=(a(34296),a(67094),a(1087)),n=a(36312);class d extends o.WF{firstUpdated(e){super.firstUpdated(e),this.hass&&(0,n.x)(this.hass,"ai_task")&&(0,r.sG)(this.hass).then(e=>{this._aiPrefs=e})}render(){if(!this._aiPrefs||!this._aiPrefs.gen_data_entity_id)return o.s6;let e;switch(this._state.status){case"error":e=this.hass.localize("ui.components.suggest_with_ai.error");break;case"done":e=this.hass.localize("ui.components.suggest_with_ai.done");break;case"suggesting":e=this.hass.localize(`ui.components.suggest_with_ai.suggesting_${this._state.suggestionIndex}`);break;default:e=this.hass.localize("ui.components.suggest_with_ai.label")}return o.qy` <ha-assist-chip @click="${this._suggest}" .label="${e}" ?active="${"suggesting"===this._state.status}" class="${"error"===this._state.status?"error":"done"===this._state.status?"done":""}" style="${this._minWidth?`min-width: ${this._minWidth}`:""}"> <ha-svg-icon slot="icon" .path="${"M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z"}"></ha-svg-icon> </ha-assist-chip> `}async _suggest(){if(!this.generateTask||"suggesting"===this._state.status)return;const e=this.shadowRoot?.querySelector("ha-assist-chip");e&&(this._minWidth=`${e.offsetWidth}px`),this._state={status:"suggesting",suggestionIndex:1};try{this._intervalId=window.setInterval(()=>{this._state={...this._state,suggestionIndex:this._state.suggestionIndex%3+1}},3e3);const e=await this.generateTask();let t;if("data"!==e.type)throw new Error("Unsupported task type");t=await(0,r.Pj)(this.hass,e.task),(0,l.r)(this,"suggestion",t),this._state={...this._state,status:"done"}}catch(e){console.error("Error generating AI suggestion:",e),this._state={...this._state,status:"error"}}finally{this._intervalId&&(clearInterval(this._intervalId),this._intervalId=void 0),setTimeout(()=>{this._state={...this._state,status:"idle"},this._minWidth=void 0},3e3)}}constructor(...e){super(...e),this._state={status:"idle",suggestionIndex:1}}}d.styles=o.AH`ha-assist-chip[active]{animation:pulse-glow 1.5s ease-in-out infinite}ha-assist-chip.error{box-shadow:0 0 12px 4px rgba(var(--rgb-error-color),.8)}ha-assist-chip.done{box-shadow:0 0 12px 4px rgba(var(--rgb-primary-color),.8)}@keyframes pulse-glow{0%{box-shadow:0 0 0 0 rgba(var(--rgb-primary-color),0)}50%{box-shadow:0 0 8px 2px rgba(var(--rgb-primary-color),.6)}100%{box-shadow:0 0 0 0 rgba(var(--rgb-primary-color),0)}}`,(0,i.Cg)([(0,s.MZ)({attribute:!1})],d.prototype,"hass",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"task-type"})],d.prototype,"taskType",void 0),(0,i.Cg)([(0,s.MZ)({attribute:!1})],d.prototype,"generateTask",void 0),(0,i.Cg)([(0,s.wk)()],d.prototype,"_aiPrefs",void 0),(0,i.Cg)([(0,s.wk)()],d.prototype,"_state",void 0),(0,i.Cg)([(0,s.wk)()],d.prototype,"_minWidth",void 0),d=(0,i.Cg)([(0,s.EM)("ha-suggest-with-ai-button")],d)},45331(e,t,a){a.a(e,async function(e,t){try{var i=a(62826),o=a(93900),s=a(96196),r=a(44457),l=a(32288),n=a(1087),d=a(59992),h=a(14503),c=(a(76538),a(26300),e([o]));o=(c.then?(await c)():c)[0];const p="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class g extends((0,d.V)(s.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){return s.qy` <wa-dialog .open="${this._open}" .lightDismiss="${!this.preventScrimClose}" without-header aria-labelledby="${(0,l.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0))}" aria-describedby="${(0,l.J)(this.ariaDescribedBy)}" @keydown="${this._handleKeyDown}" @wa-hide="${this._handleHide}" @wa-show="${this._handleShow}" @wa-after-show="${this._handleAfterShow}" @wa-after-hide="${this._handleAfterHide}"> ${this.withoutHeader?s.s6:s.qy` <slot name="header"> <ha-dialog-header .subtitlePosition="${this.headerSubtitlePosition}" .showBorder="${this._bodyScrolled}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${this.hass?.localize("ui.common.close")??"Close"}" .path="${p}"></ha-icon-button> </slot> ${void 0!==this.headerTitle?s.qy`<span slot="title" class="title" id="ha-wa-dialog-title"> ${this.headerTitle} </span>`:s.qy`<slot name="headerTitle" slot="title"></slot>`} ${void 0!==this.headerSubtitle?s.qy`<span slot="subtitle">${this.headerSubtitle}</span>`:s.qy`<slot name="headerSubtitle" slot="subtitle"></slot>`} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${this._handleBodyScroll}"> <slot></slot> </div> ${this.renderScrollableFades()} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,h.dp,s.AH`
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
      `]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,n.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{this.querySelector("[autofocus]")?.focus()})},this._handleAfterShow=()=>{(0,n.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,n.r)(this,"closed"))}}}(0,i.Cg)([(0,r.MZ)({attribute:!1})],g.prototype,"hass",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-labelledby"})],g.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"aria-describedby"})],g.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],g.prototype,"open",void 0),(0,i.Cg)([(0,r.MZ)({reflect:!0})],g.prototype,"type",void 0),(0,i.Cg)([(0,r.MZ)({type:String,reflect:!0,attribute:"width"})],g.prototype,"width",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],g.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-title"})],g.prototype,"headerTitle",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"header-subtitle"})],g.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,r.MZ)({type:String,attribute:"header-subtitle-position"})],g.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],g.prototype,"flexContent",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"without-header"})],g.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,r.wk)()],g.prototype,"_open",void 0),(0,i.Cg)([(0,r.P)(".body")],g.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,r.wk)()],g.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,r.Ls)({passive:!0})],g.prototype,"_handleBodyScroll",null),g=(0,i.Cg)([(0,r.EM)("ha-wa-dialog")],g),t()}catch(e){t(e)}})},49142(e,t,a){a.d(t,{HU:()=>s,Pj:()=>r,sG:()=>o,xW:()=>i});var i=function(e){return e[e.GENERATE_DATA=1]="GENERATE_DATA",e[e.SUPPORT_ATTACHMENTS=2]="SUPPORT_ATTACHMENTS",e[e.GENERATE_IMAGE=4]="GENERATE_IMAGE",e}({});const o=e=>e.callWS({type:"ai_task/preferences/get"}),s=(e,t)=>e.callWS({type:"ai_task/preferences/set",...t}),r=async(e,t)=>(await e.callService("ai_task","generate_data",t,void 0,!0,!0)).response},42961(e,t,a){a.d(t,{e:()=>l});var i=a(35518),o=a(9899);const s=e=>e.sendMessagePromise({type:"config/floor_registry/list"}),r=(e,t)=>e.subscribeEvents((0,o.s)(()=>s(e).then(e=>t.setState(e,!0)),500,!0),"floor_registry_updated"),l=(e,t)=>(0,i.N)("_floorRegistry",s,r,e,t)},36215(e,t,a){a.a(e,async function(e,i){try{a.d(t,{Fn:()=>c,q3:()=>h});a(18111),a(22489),a(20116),a(61701);var o=a(74487),s=a(53289),r=a(91536),l=e([o]);o=(l.then?(await l)():l)[0];const n={name:!0,description:!0,categories:!0,labels:!0},d=new Intl.ListFormat("en",{style:"long",type:"conjunction"});async function h(e,t,a,i,o=[],l=n){const[h,c]=await Promise.all([l.categories?(0,r.jE)(e,a):Promise.resolve(void 0),l.floor?(0,r.q6)(e):Promise.resolve(void 0)]),p={...l.name&&{name:{description:`The name of the ${a}`,required:!0,selector:{text:{}}}},...l.description&&{description:{description:`A short description of the ${a}`,required:!1,selector:{text:{}}}},...l.labels&&{labels:{description:`Labels for the ${a}`,required:!1,selector:{text:{multiple:!0}}}},...l.categories&&h&&{category:{description:`The category of the ${a}`,required:!1,selector:{select:{options:Object.entries(h).map(([e,t])=>({value:e,label:t}))}}}},...l.floor&&c&&{floor:{description:`The floor of the ${a}`,required:!1,selector:{select:{options:Object.values(c).map(e=>({value:e.floor_id,label:e.name}))}}}}},g=[l.name?"a name":null,l.description?"a description":null,l.categories?"a category":null,l.labels?"labels":null,l.floor?"a floor":null].filter(e=>null!==e),u=[l.categories?"category":null,l.labels?"labels":null,l.floor?"floor":null].filter(e=>null!==e),f=d.format(u);return{type:"data",task:{task_name:`frontend__${a}__save`,instructions:[`Suggest in language "${t}" ${g.length?d.format(g):"suggestions"} for the following Home Assistant ${a}.`,"",l.name?`The name should be relevant to the ${a}'s purpose.`:`The suggestions should be relevant to the ${a}'s purpose.`,...o.length?[...l.name?[`The name should be in same style and sentence capitalization as existing ${a}s.`]:[],...l.categories||l.labels||l.floor?[`Suggest ${f} if relevant to the ${a}'s purpose.`,`Only suggest ${f} that are already used by existing ${a}s.`]:[]]:l.name?[`The name should be short, descriptive, sentence case, and written in the language ${t}.`]:[],...l.description?[`If the ${a} contains 5+ steps, include a short description.`]:[],"",`For inspiration, here are existing ${a}s:`,o.join("\n"),"",`The ${a} configuration is as follows:`,"",`${(0,s.dump)(i)}`].join("\n"),structure:p}}}async function c(e,t,a,i=n){const[o,s,l]=await Promise.all([i.categories?(0,r.jE)(e,t):Promise.resolve(void 0),i.labels?(0,r.wR)(e):Promise.resolve(void 0),i.floor?(0,r.q6)(e):Promise.resolve(void 0)]),d={name:i.name?a.data.name:void 0,description:i.description?a.data.description:void 0};if(i.categories&&o&&a.data.category){const e=Object.entries(o).find(([,e])=>e===a.data.category)?.[0];e&&(d.category=e)}if(i.labels&&s&&a.data.labels?.length){const e=Object.fromEntries(a.data.labels.map(e=>[e,void 0]));let t=a.data.labels.length;for(const[a,i]of Object.entries(s))if(i in e&&void 0===e[i]&&(e[i]=a,t--,0===t))break;const i=Object.values(e).filter(e=>void 0!==e);i.length&&(d.labels=i)}if(i.floor&&l&&a.data.floor){const e=a.data.floor in l?a.data.floor:Object.entries(l).find(([,e])=>e.name===a.data.floor)?.[0];e&&(d.floor=e)}return d}i()}catch(p){i(p)}})},91536(e,t,a){a.d(t,{RF:()=>g,U3:()=>u,jE:()=>h,q6:()=>p,wR:()=>c});a(18111),a(61701);var i=a(58139),o=a(52927),s=a(76570),r=a(59241),l=a(42961),n=a(92557);const d=e=>e.catch(e=>(console.error("Error fetching data for suggestion: ",e),{})),h=(e,t)=>d((0,s.AH)(e,t).then(e=>Object.fromEntries(e.map(e=>[e.category_id,e.name])))),c=e=>d((0,i.d)(e,n.o5).then(e=>Object.fromEntries(e.map(e=>[e.label_id,e.name])))),p=e=>d((0,i.d)(e,l.e).then(e=>Object.fromEntries(e.map(e=>[e.floor_id,e])))),g=e=>d((0,i.d)(e,o.ft).then(e=>Object.fromEntries(e.map(e=>[e.area_id,e])))),u=e=>d((0,i.d)(e,r.Bz).then(e=>Object.fromEntries(e.map(e=>[e.entity_id,e]))))},97268(e,t,a){a.d(t,{U:()=>r,m:()=>s});a(44114),a(18111),a(22489),a(61701),a(18237);var i=a(71727),o=a(91536);const s=async(e,t,a)=>{const[s,r,l]=await Promise.all([(0,o.jE)(e,a),(0,o.U3)(e),(0,o.wR)(e)]);return Object.values(r).reduce((e,o)=>{if(!o||(0,i.m)(o.entity_id)!==a)return e;const r=t[o.entity_id];if(!r||r.attributes.restored||!r.attributes.friendly_name)return e;let n=`- ${r.attributes.friendly_name}`;const d=o.categories[a];if(d&&s[d]&&(n+=` (category: ${s[d]})`),o.labels.length){const e=o.labels.map(e=>l[e]).filter(Boolean);e.length&&(n+=` (labels: ${e.join(", ")})`)}return e.push(n),e},[])},r=async e=>{const[t,a,i]=await Promise.all([(0,o.wR)(e),(0,o.q6)(e),(0,o.RF)(e)]);return Object.values(i).reduce((e,i)=>{if(!i.floor_id)return e;const o=a[i.floor_id]?.name,s=i.labels.map(e=>t[e]).filter(Boolean);return e.push(`- ${i.name} (${o?`floor: ${o}`:"no floor"}${s.length?`, labels: ${s.join(", ")}`:""})`),e},[])}}};
//# sourceMappingURL=21099.0a82eddfdb3ed5ee.js.map