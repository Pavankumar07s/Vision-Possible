export const __rspack_esm_id="7901";export const __rspack_esm_ids=["7901"];export const __webpack_modules__={80785(e,t,a){function o(e){return!!e&&(e instanceof Date&&!isNaN(e.valueOf()))}a.d(t,{A:()=>o})},380(e,t,a){a.d(t,{D:()=>s,P:()=>n});var o=a(58109),i=a(46927),r=a(96029);const n=e=>e.first_weekday===i.zt.language?"weekInfo"in Intl.Locale.prototype?new Intl.Locale(e.language).weekInfo.firstDay%7:(0,o.S)(e.language)%7:r.Z.includes(e.first_weekday)?r.Z.indexOf(e.first_weekday):1,s=e=>{const t=n(e);return r.Z[t]}},72487(e,t,a){a.a(e,async function(e,o){try{a.d(t,{CA:()=>k,Pm:()=>w,Wq:()=>_,Yq:()=>d,fr:()=>y,gu:()=>$,kz:()=>h,sl:()=>g,zB:()=>p});a(18111),a(20116);var i=a(74487),r=a(22786),n=a(46927),s=a(8480),l=e([i,s]);[i,s]=l.then?(await l)():l;(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{weekday:"long",month:"long",day:"numeric",timeZone:(0,s.w)(e.time_zone,t)}));const d=(e,t,a)=>c(t,a.time_zone).format(e),c=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",timeZone:(0,s.w)(e.time_zone,t)})),h=(e,t,a)=>u(t,a.time_zone).format(e),u=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"short",day:"numeric",timeZone:(0,s.w)(e.time_zone,t)})),p=(e,t,a)=>{const o=m(t,a.time_zone);if(t.date_format===n.ow.language||t.date_format===n.ow.system)return o.format(e);const i=o.formatToParts(e),r=i.find(e=>"literal"===e.type)?.value,s=i.find(e=>"day"===e.type)?.value,l=i.find(e=>"month"===e.type)?.value,d=i.find(e=>"year"===e.type)?.value,c=i[i.length-1];let h="literal"===c?.type?c?.value:"";"bg"===t.language&&t.date_format===n.ow.YMD&&(h="");return{[n.ow.DMY]:`${s}${r}${l}${r}${d}${h}`,[n.ow.MDY]:`${l}${r}${s}${r}${d}${h}`,[n.ow.YMD]:`${d}${r}${l}${r}${s}${h}`}[t.date_format]},m=(0,r.A)((e,t)=>{const a=e.date_format===n.ow.system?void 0:e.language;return e.date_format===n.ow.language||(e.date_format,n.ow.system),new Intl.DateTimeFormat(a,{year:"numeric",month:"numeric",day:"numeric",timeZone:(0,s.w)(e.time_zone,t)})}),g=(e,t,a)=>f(t,a.time_zone).format(e),f=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{day:"numeric",month:"short",timeZone:(0,s.w)(e.time_zone,t)})),y=(e,t,a)=>v(t,a.time_zone).format(e),v=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{month:"long",year:"numeric",timeZone:(0,s.w)(e.time_zone,t)})),_=(e,t,a)=>b(t,a.time_zone).format(e),b=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{month:"long",timeZone:(0,s.w)(e.time_zone,t)})),w=(e,t,a)=>x(t,a.time_zone).format(e),x=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{year:"numeric",timeZone:(0,s.w)(e.time_zone,t)})),k=(e,t,a)=>C(t,a.time_zone).format(e),C=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{weekday:"long",timeZone:(0,s.w)(e.time_zone,t)})),$=(e,t,a)=>S(t,a.time_zone).format(e),S=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{weekday:"short",timeZone:(0,s.w)(e.time_zone,t)}));o()}catch(e){o(e)}})},95747(e,t,a){a.a(e,async function(e,o){try{a.d(t,{CL:()=>_,GH:()=>x,Rl:()=>p,ZS:()=>y,aQ:()=>g,r6:()=>h,yg:()=>b});var i=a(74487),r=a(22786),n=a(72487),s=a(30162),l=a(8480),d=a(69543),c=e([i,l,n,s]);[i,l,n,s]=c.then?(await c)():c;const h=(e,t,a)=>u(t,a.time_zone).format(e),u=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:(0,d.J)(e)?"numeric":"2-digit",minute:"2-digit",hourCycle:(0,d.J)(e)?"h12":"h23",timeZone:(0,l.w)(e.time_zone,t)})),p=e=>m().format(e),m=(0,r.A)(()=>new Intl.DateTimeFormat(void 0,{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})),g=(e,t,a)=>f(t,a.time_zone).format(e),f=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"short",day:"numeric",hour:(0,d.J)(e)?"numeric":"2-digit",minute:"2-digit",hourCycle:(0,d.J)(e)?"h12":"h23",timeZone:(0,l.w)(e.time_zone,t)})),y=(e,t,a)=>v(t,a.time_zone).format(e),v=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{month:"short",day:"numeric",hour:(0,d.J)(e)?"numeric":"2-digit",minute:"2-digit",hourCycle:(0,d.J)(e)?"h12":"h23",timeZone:(0,l.w)(e.time_zone,t)})),_=(e,t,a)=>(new Date).getFullYear()===e.getFullYear()?y(e,t,a):g(e,t,a),b=(e,t,a)=>w(t,a.time_zone).format(e),w=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:(0,d.J)(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hourCycle:(0,d.J)(e)?"h12":"h23",timeZone:(0,l.w)(e.time_zone,t)})),x=(e,t,a)=>`${(0,n.zB)(e,t,a)}, ${(0,s.fU)(e,t,a)}`;o()}catch(e){o(e)}})},30162(e,t,a){a.a(e,async function(e,o){try{a.d(t,{LW:()=>g,Xs:()=>p,fU:()=>d,ie:()=>h});var i=a(74487),r=a(22786),n=a(8480),s=a(69543),l=e([i,n]);[i,n]=l.then?(await l)():l;const d=(e,t,a)=>c(t,a.time_zone).format(e),c=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{hour:"numeric",minute:"2-digit",hourCycle:(0,s.J)(e)?"h12":"h23",timeZone:(0,n.w)(e.time_zone,t)})),h=(e,t,a)=>u(t,a.time_zone).format(e),u=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{hour:(0,s.J)(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hourCycle:(0,s.J)(e)?"h12":"h23",timeZone:(0,n.w)(e.time_zone,t)})),p=(e,t,a)=>m(t,a.time_zone).format(e),m=(0,r.A)((e,t)=>new Intl.DateTimeFormat(e.language,{weekday:"long",hour:(0,s.J)(e)?"numeric":"2-digit",minute:"2-digit",hourCycle:(0,s.J)(e)?"h12":"h23",timeZone:(0,n.w)(e.time_zone,t)})),g=(e,t,a)=>f(t,a.time_zone).format(e),f=(0,r.A)((e,t)=>new Intl.DateTimeFormat("en-GB",{hour:"numeric",minute:"2-digit",hour12:!1,timeZone:(0,n.w)(e.time_zone,t)}));o()}catch(e){o(e)}})},98975(e,t,a){a.a(e,async function(e,o){try{a.d(t,{K:()=>d});var i=a(74487),r=a(22786),n=a(63927),s=e([i,n]);[i,n]=s.then?(await s)():s;const l=(0,r.A)(e=>new Intl.RelativeTimeFormat(e.language,{numeric:"auto"})),d=(e,t,a,o=!0)=>{const i=(0,n.x)(e,a,t);return o?l(t).format(i.value,i.unit):Intl.NumberFormat(t.language,{style:"unit",unit:i.unit,unitDisplay:"long"}).format(Math.abs(i.value))};o()}catch(e){o(e)}})},8480(e,t,a){a.a(e,async function(e,o){try{a.d(t,{n:()=>l,w:()=>d});var i=a(74487),r=a(46927),n=e([i]);i=(n.then?(await n)():n)[0];const s=Intl.DateTimeFormat?.().resolvedOptions?.().timeZone,l=s??"UTC",d=(e,t)=>e===r.Wj.local&&s?l:t;o()}catch(e){o(e)}})},69543(e,t,a){a.d(t,{J:()=>r});var o=a(22786),i=a(46927);const r=(0,o.A)(e=>{if(e.time_format===i.Hg.language||e.time_format===i.Hg.system){const t=e.time_format===i.Hg.language?e.language:void 0;return new Date("January 1, 2023 22:00:00").toLocaleString(t).includes("10")}return e.time_format===i.Hg.am_pm})},96029(e,t,a){a.d(t,{Tq:()=>n,Z:()=>i,ZV:()=>o,sj:()=>r});const o=["sun","mon","tue","wed","thu","fri","sat"],i=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],r={0:"sun",1:"mon",2:"tue",3:"wed",4:"thu",5:"fri",6:"sat"},n={sun:"sunday",mon:"monday",tue:"tuesday",wed:"wednesday",thu:"thursday",fri:"friday",sat:"saturday"}},63927(e,t,a){a.a(e,async function(e,o){try{a.d(t,{x:()=>h});var i=a(6946),r=a(52640),n=a(38684),s=a(380);const l=1e3,d=60,c=60*d;function h(e,t=Date.now(),a,o={}){const h={...u,...o||{}},p=(+e-+t)/l;if(Math.abs(p)<h.second)return{value:Math.round(p),unit:"second"};const m=p/d;if(Math.abs(m)<h.minute)return{value:Math.round(m),unit:"minute"};const g=p/c;if(Math.abs(g)<h.hour)return{value:Math.round(g),unit:"hour"};const f=new Date(e),y=new Date(t);f.setHours(0,0,0,0),y.setHours(0,0,0,0);const v=(0,i.c)(f,y);if(0===v)return{value:Math.round(g),unit:"hour"};if(Math.abs(v)<h.day)return{value:v,unit:"day"};const _=(0,s.P)(a),b=(0,r.k)(f,{weekStartsOn:_}),w=(0,r.k)(y,{weekStartsOn:_}),x=(0,n.I)(b,w);if(0===x)return{value:v,unit:"day"};if(Math.abs(x)<h.week)return{value:x,unit:"week"};const k=f.getFullYear()-y.getFullYear(),C=12*k+f.getMonth()-y.getMonth();return 0===C?{value:x,unit:"week"}:Math.abs(C)<h.month||0===k?{value:C,unit:"month"}:{value:Math.round(k),unit:"year"}}const u={second:59,minute:59,hour:22,day:5,week:4,month:11};o()}catch(p){o(p)}})},93444(e,t,a){var o=a(62826),i=a(96196),r=a(44457);class n extends i.WF{render(){return i.qy` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `}static get styles(){return[i.AH`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`]}}n=(0,o.Cg)([(0,r.EM)("ha-dialog-footer")],n)},76538(e,t,a){var o=a(62826),i=a(96196),r=a(44457);class n extends i.WF{render(){const e=i.qy`<div class="header-title"> <slot name="title"></slot> </div>`,t=i.qy`<div class="header-subtitle"> <slot name="subtitle"></slot> </div>`;return i.qy` <header class="header"> <div class="header-bar"> <section class="header-navigation-icon"> <slot name="navigationIcon"></slot> </section> <section class="header-content"> ${"above"===this.subtitlePosition?i.qy`${t}${e}`:i.qy`${e}${t}`} </section> <section class="header-action-items"> <slot name="actionItems"></slot> </section> </div> <slot></slot> </header> `}static get styles(){return[i.AH`:host{display:block}:host([show-border]){border-bottom:1px solid var(--mdc-dialog-scroll-divider-color,rgba(0,0,0,.12))}.header-bar{display:flex;flex-direction:row;align-items:center;padding:0 var(--ha-space-1);box-sizing:border-box}.header-content{flex:1;padding:10px var(--ha-space-1);display:flex;flex-direction:column;justify-content:center;min-height:var(--ha-space-12);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.header-title{height:var(--ha-dialog-header-title-height,calc(var(--ha-font-size-xl) + var(--ha-space-1)));font-size:var(--ha-font-size-xl);line-height:var(--ha-line-height-condensed);font-weight:var(--ha-font-weight-medium);color:var(--ha-dialog-header-title-color,var(--primary-text-color))}.header-subtitle{font-size:var(--ha-font-size-m);line-height:var(--ha-line-height-normal);color:var(--ha-dialog-header-subtitle-color,var(--secondary-text-color))}@media all and (min-width:450px) and (min-height:500px){.header-bar{padding:0 var(--ha-space-2)}}.header-navigation-icon{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}.header-action-items{flex:none;min-width:var(--ha-space-2);height:100%;display:flex;flex-direction:row}`]}constructor(...e){super(...e),this.subtitlePosition="below",this.showBorder=!1}}(0,o.Cg)([(0,r.MZ)({type:String,attribute:"subtitle-position"})],n.prototype,"subtitlePosition",void 0),(0,o.Cg)([(0,r.MZ)({type:Boolean,reflect:!0,attribute:"show-border"})],n.prototype,"showBorder",void 0),n=(0,o.Cg)([(0,r.EM)("ha-dialog-header")],n)},2846(e,t,a){a.d(t,{G:()=>d,J:()=>l});var o=a(62826),i=a(97154),r=a(82553),n=a(96196),s=a(44457);a(54276);const l=[r.R,n.AH`:host{--ha-icon-display:block;--md-sys-color-primary:var(--primary-text-color);--md-sys-color-secondary:var(--secondary-text-color);--md-sys-color-surface:var(--card-background-color);--md-sys-color-on-surface:var(--primary-text-color);--md-sys-color-on-surface-variant:var(--secondary-text-color)}md-item{overflow:var(--md-item-overflow,hidden);align-items:var(--md-item-align-items,center);gap:var(--ha-md-list-item-gap,16px)}`];class d extends i.n{renderRipple(){return"text"===this.type?n.s6:n.qy`<ha-ripple part="ripple" for="item" ?disabled="${this.disabled&&"link"!==this.type}"></ha-ripple>`}}d.styles=l,d=(0,o.Cg)([(0,s.EM)("ha-md-list-item")],d)},17308(e,t,a){var o=a(62826),i=a(49838),r=a(11245),n=a(96196),s=a(44457);class l extends i.B{}l.styles=[r.R,n.AH`:host{--md-sys-color-surface:var(--card-background-color)}`],l=(0,o.Cg)([(0,s.EM)("ha-md-list")],l)},54276(e,t,a){var o=a(62826),i=a(76482),r=a(91382),n=a(96245),s=a(96196),l=a(44457);class d extends r.n{attach(e){super.attach(e),this.attachableTouchController.attach(e)}disconnectedCallback(){super.disconnectedCallback(),this.hovered=!1,this.pressed=!1}detach(){super.detach(),this.attachableTouchController.detach()}_onTouchControlChange(e,t){e?.removeEventListener("touchend",this._handleTouchEnd),t?.addEventListener("touchend",this._handleTouchEnd)}constructor(...e){super(...e),this.attachableTouchController=new i.i(this,this._onTouchControlChange.bind(this)),this._handleTouchEnd=()=>{this.disabled||super.endPressAnimation()}}}d.styles=[n.R,s.AH`:host{--md-ripple-hover-opacity:var(--ha-ripple-hover-opacity, 0.08);--md-ripple-pressed-opacity:var(--ha-ripple-pressed-opacity, 0.12);--md-ripple-hover-color:var(
          --ha-ripple-hover-color,
          var(--ha-ripple-color, var(--secondary-text-color))
        );--md-ripple-pressed-color:var(
          --ha-ripple-pressed-color,
          var(--ha-ripple-color, var(--secondary-text-color))
        )}`],d=(0,o.Cg)([(0,l.EM)("ha-ripple")],d)},45331(e,t,a){a.a(e,async function(e,t){try{var o=a(62826),i=a(93900),r=a(96196),n=a(44457),s=a(32288),l=a(1087),d=a(59992),c=a(14503),h=(a(76538),a(26300),e([i]));i=(h.then?(await h)():h)[0];const u="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class p extends((0,d.V)(r.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){return r.qy` <wa-dialog .open="${this._open}" .lightDismiss="${!this.preventScrimClose}" without-header aria-labelledby="${(0,s.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0))}" aria-describedby="${(0,s.J)(this.ariaDescribedBy)}" @keydown="${this._handleKeyDown}" @wa-hide="${this._handleHide}" @wa-show="${this._handleShow}" @wa-after-show="${this._handleAfterShow}" @wa-after-hide="${this._handleAfterHide}"> ${this.withoutHeader?r.s6:r.qy` <slot name="header"> <ha-dialog-header .subtitlePosition="${this.headerSubtitlePosition}" .showBorder="${this._bodyScrolled}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${this.hass?.localize("ui.common.close")??"Close"}" .path="${u}"></ha-icon-button> </slot> ${void 0!==this.headerTitle?r.qy`<span slot="title" class="title" id="ha-wa-dialog-title"> ${this.headerTitle} </span>`:r.qy`<slot name="headerTitle" slot="title"></slot>`} ${void 0!==this.headerSubtitle?r.qy`<span slot="subtitle">${this.headerSubtitle}</span>`:r.qy`<slot name="headerSubtitle" slot="subtitle"></slot>`} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${this._handleBodyScroll}"> <slot></slot> </div> ${this.renderScrollableFades()} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,c.dp,r.AH`
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
      `]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,l.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{this.querySelector("[autofocus]")?.focus()})},this._handleAfterShow=()=>{(0,l.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,l.r)(this,"closed"))}}}(0,o.Cg)([(0,n.MZ)({attribute:!1})],p.prototype,"hass",void 0),(0,o.Cg)([(0,n.MZ)({attribute:"aria-labelledby"})],p.prototype,"ariaLabelledBy",void 0),(0,o.Cg)([(0,n.MZ)({attribute:"aria-describedby"})],p.prototype,"ariaDescribedBy",void 0),(0,o.Cg)([(0,n.MZ)({type:Boolean,reflect:!0})],p.prototype,"open",void 0),(0,o.Cg)([(0,n.MZ)({reflect:!0})],p.prototype,"type",void 0),(0,o.Cg)([(0,n.MZ)({type:String,reflect:!0,attribute:"width"})],p.prototype,"width",void 0),(0,o.Cg)([(0,n.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],p.prototype,"preventScrimClose",void 0),(0,o.Cg)([(0,n.MZ)({attribute:"header-title"})],p.prototype,"headerTitle",void 0),(0,o.Cg)([(0,n.MZ)({attribute:"header-subtitle"})],p.prototype,"headerSubtitle",void 0),(0,o.Cg)([(0,n.MZ)({type:String,attribute:"header-subtitle-position"})],p.prototype,"headerSubtitlePosition",void 0),(0,o.Cg)([(0,n.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],p.prototype,"flexContent",void 0),(0,o.Cg)([(0,n.MZ)({type:Boolean,attribute:"without-header"})],p.prototype,"withoutHeader",void 0),(0,o.Cg)([(0,n.wk)()],p.prototype,"_open",void 0),(0,o.Cg)([(0,n.P)(".body")],p.prototype,"bodyContainer",void 0),(0,o.Cg)([(0,n.wk)()],p.prototype,"_bodyScrolled",void 0),(0,o.Cg)([(0,n.Ls)({passive:!0})],p.prototype,"_handleBodyScroll",null),p=(0,o.Cg)([(0,n.EM)("ha-wa-dialog")],p),t()}catch(e){t(e)}})},31420(e,t,a){a.a(e,async function(e,o){try{a.d(t,{Bi:()=>B,Dt:()=>K,EB:()=>D,IW:()=>z,P_:()=>C,SG:()=>S,Sx:()=>j,T2:()=>y,Xm:()=>_,Ye:()=>v,Zm:()=>E,cq:()=>W,dH:()=>T,en:()=>G,gb:()=>b,gv:()=>M,jU:()=>I,kI:()=>A,mF:()=>F,mu:()=>$,oJ:()=>Z,pI:()=>x,pL:()=>Y,q5:()=>P,q7:()=>L,qk:()=>f,sp:()=>U,uM:()=>N,v3:()=>q,xN:()=>V,yL:()=>w,yj:()=>J,zZ:()=>k});a(16573),a(78100),a(77936),a(18111),a(22489),a(20116),a(7588),a(61701),a(37467),a(44732),a(79577),a(41549),a(49797),a(49631),a(35623),a(14603),a(47566),a(98721);var i=a(22711),r=a(97732),n=a(6226),s=a(22786),l=a(80785),d=a(95747),c=a(30162),h=a(36918),u=a(30039),p=a(39889),m=a(95350),g=e([i,d,c]);[i,d,c]=g.then?(await g)():g;var f=function(e){return e.NEVER="never",e.DAILY="daily",e.CUSTOM_DAYS="custom_days",e}({});const y=["mon","tue","wed","thu","fri","sat","sun"],v=e=>e.sort((e,t)=>y.indexOf(e)-y.indexOf(t)),_=e=>e.callWS({type:"backup/config/info"}),b=(e,t)=>e.callWS({type:"backup/config/update",...t}),w=(e,t,a)=>`/api/backup/download/${e}?agent_id=${t}${a?`&password=${a}`:""}`,x=e=>e.callWS({type:"backup/info"}),k=(e,t)=>e.callWS({type:"backup/details",backup_id:t}),C=e=>e.callWS({type:"backup/agents/info"}),$=(e,t)=>e.callWS({type:"backup/delete",backup_id:t}),S=(e,t)=>e.callWS({type:"backup/generate",...t}),z=e=>e.callWS({type:"backup/generate_with_automatic_settings"}),T=(e,t)=>e.callWS({type:"backup/restore",...t}),A=async(e,t,a)=>{const o=new FormData;o.append("file",t);const i=new URLSearchParams;return a.forEach(e=>{i.append("agent_id",e)}),(0,p.QE)(e.fetchWithAuth(`/api/backup/upload?${i.toString()}`,{method:"POST",body:o}))},D=e=>{const t=e.find(B);if(t)return t;const a=e.find(I);return a||e[0]},E=(e,t,a,o)=>e.callWS({type:"backup/can_decrypt_on_download",backup_id:t,agent_id:a,password:o}),M="backup.local",F="hassio.local",Z="cloud.cloud",B=e=>[M,F].includes(e),I=e=>{const[t,a]=e.split(".");return"hassio"===t&&"local"!==a},L=(e,t,a)=>{if(B(t))return e("ui.panel.config.backup.agents.local_agent");const o=a.find(e=>e.agent_id===t),i=t.split(".")[0],r=o?o.name:t.split(".")[1];if(I(t))return r;const n=(0,m.p$)(e,i);return a.filter(e=>e.agent_id.split(".")[0]===i).length>1?`${n}: ${r}`:n},q=e=>Math.max(...Object.values(e.agents).map(e=>e.size)),H=["automatic","app_update","manual"],P=(0,i.z)(e=>e?H:H.filter(e=>"app_update"!==e)),U=(e,t)=>e.with_automatic_settings?"automatic":!t||null==e.extra_metadata?.["supervisor.addon_update"]&&null==e.extra_metadata?.["supervisor.app_update"]?"manual":"app_update",J=(e,t)=>{const a=B(e),o=B(t),i=I(e),r=I(t),n=(e,t)=>e?1:t?2:3,s=n(a,i),l=n(o,r);return s!==l?s-l:e.localeCompare(t)},W=()=>{const e="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t="xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx";let a="";const o=new Uint8Array(34);return crypto.getRandomValues(o),o.forEach((o,i)=>{a+="-"===t[i]?"-":e[o%36]}),a},R=(e,t)=>"data:text/plain;charset=utf-8,"+encodeURIComponent(`${e.localize("ui.panel.config.backup.emergency_kit_file.title")}\n\n${e.localize("ui.panel.config.backup.emergency_kit_file.description")}\n\n${e.localize("ui.panel.config.backup.emergency_kit_file.date")} ${(0,d.r6)(new Date,e.locale,e.config)}\n\n${e.localize("ui.panel.config.backup.emergency_kit_file.instance")}\n${e.config.location_name}\n\n${e.localize("ui.panel.config.backup.emergency_kit_file.url")}\n${e.auth.data.hassUrl}\n\n${e.localize("ui.panel.config.backup.emergency_kit_file.encryption_key")}\n${t}\n\n${e.localize("ui.panel.config.backup.emergency_kit_file.more_info",{link:(0,h.o)(e,"/more-info/backup-emergency-kit")})}`),O=(e,t)=>`home_assistant_backup_emergency_kit_${t?`${t}_`:""}${(0,d.GH)(new Date,e.locale,e.config).replace(",","").replace(" ","_")}.txt`,j=(e,t,a)=>(0,u.R)(R(e,t),O(e,a)),N=(0,r.g)((0,n.a)(new Date,4),45),Y=(0,r.g)((0,n.a)(new Date,5),45),G=(0,s.A)((e,t,a)=>{if((0,l.A)(a))return(0,c.fU)(a,e,t);if("string"==typeof a&&a){const o=a.split(":"),i=(0,r.g)((0,n.a)(new Date,parseInt(o[0])),parseInt(o[1]));return(0,c.fU)(i,e,t)}return`${(0,c.fU)(N,e,t)} - ${(0,c.fU)(Y,e,t)}`}),V="application/x-tar",K={file:void 0};o()}catch(e){o(e)}})},26581(e,t,a){a.d(t,{r:()=>i,y:()=>o});const o=async e=>e.callWS({type:"hassio/update/config/info"}),i=async(e,t)=>e.callWS({type:"hassio/update/config/update",...t})},59992(e,t,a){a.d(t,{V:()=>l});var o=a(62826),i=a(88696),r=a(96196),n=a(94333),s=a(44457);const l=e=>{class t extends e{get scrollableElement(){return t.DEFAULT_SCROLLABLE_ELEMENT}firstUpdated(e){super.firstUpdated?.(e),this.scrollableElement&&this._updateScrollableState(this.scrollableElement),this._attachScrollableElement()}updated(e){super.updated?.(e),this._attachScrollableElement()}disconnectedCallback(){this._detachScrollableElement(),this._contentScrolled=!1,this._contentScrollable=!1,super.disconnectedCallback()}renderScrollableFades(e=!1){return r.qy` <div class="${(0,n.H)({"fade-top":!0,rounded:e,visible:this._contentScrolled})}"></div> <div class="${(0,n.H)({"fade-bottom":!0,rounded:e,visible:this._contentScrollable})}"></div> `}static get styles(){const e=Object.getPrototypeOf(this);var t;return[...void 0===(t=e?.styles??[])?[]:Array.isArray(t)?t:[t],r.AH`.fade-bottom,.fade-top{position:absolute;left:0;right:0;height:var(--ha-space-2);pointer-events:none;transition:opacity 180ms ease-in-out;border-radius:var(--ha-border-radius-square);opacity:0;background:linear-gradient(to bottom,var(--ha-color-shadow-scrollable-fade),transparent)}.fade-top{top:0}.fade-bottom{bottom:0;transform:rotate(180deg)}.fade-bottom.visible,.fade-top.visible{opacity:1}.fade-bottom.rounded,.fade-top.rounded{border-radius:var(--ha-card-border-radius,var(--ha-border-radius-lg));border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}.fade-top.rounded{border-top-left-radius:var(--ha-border-radius-square);border-top-right-radius:var(--ha-border-radius-square)}.fade-bottom.rounded{border-bottom-left-radius:var(--ha-border-radius-square);border-bottom-right-radius:var(--ha-border-radius-square)}`]}_attachScrollableElement(){const e=this.scrollableElement;e!==this._scrollTarget&&(this._detachScrollableElement(),e&&(this._scrollTarget=e,e.addEventListener("scroll",this._onScroll,{passive:!0}),this._resize.observe(e),this._updateScrollableState(e)))}_detachScrollableElement(){this._scrollTarget&&(this._scrollTarget.removeEventListener("scroll",this._onScroll),this._resize.unobserve?.(this._scrollTarget),this._scrollTarget=void 0)}_updateScrollableState(e){const t=parseFloat(getComputedStyle(e).getPropertyValue("--safe-area-inset-bottom"))||0,{scrollHeight:a=0,clientHeight:o=0,scrollTop:i=0}=e;this._contentScrollable=a-o>i+t+this.scrollFadeSafeAreaPadding}constructor(...e){super(...e),this._contentScrolled=!1,this._contentScrollable=!1,this._onScroll=e=>{const t=e.currentTarget;this._contentScrolled=(t.scrollTop??0)>this.scrollFadeThreshold,this._updateScrollableState(t)},this._resize=new i.P(this,{target:null,callback:e=>{const t=e[0]?.target;t&&this._updateScrollableState(t)}}),this.scrollFadeSafeAreaPadding=4,this.scrollFadeThreshold=4}}return t.DEFAULT_SCROLLABLE_ELEMENT=null,(0,o.Cg)([(0,s.wk)()],t.prototype,"_contentScrolled",void 0),(0,o.Cg)([(0,s.wk)()],t.prototype,"_contentScrollable",void 0),t}},56588(e,t,a){a.a(e,async function(e,o){try{a.r(t),a.d(t,{DialogLabsPreviewFeatureEnable:()=>g});var i=a(62826),r=a(96196),n=a(44457),s=a(36312),l=a(98975),d=a(1087),c=a(18350),h=(a(93444),a(45331)),u=(a(17308),a(2846),a(59646),a(31420)),p=a(26581),m=e([c,h,u,l]);[c,h,u,l]=m.then?(await m)():m;class g extends r.WF{async showDialog(e){this._params=e,this._createBackup=!1,this._open=!0,this._fetchBackupConfig(),(0,s.x)(this.hass,"hassio")&&this._fetchUpdateBackupConfig()}closeDialog(){return this._open=!1,!0}_dialogClosed(){this._params=void 0,this._backupConfig=void 0,this._createBackup=!1,(0,d.r)(this,"dialog-closed",{dialog:this.localName})}async _fetchBackupConfig(){try{const{config:e}=await(0,u.Xm)(this.hass);this._backupConfig=e}catch(e){console.error(e)}}async _fetchUpdateBackupConfig(){try{const e=await(0,p.y)(this.hass);this._createBackup=e.core_backup_before_update}catch(e){console.error(e)}}_computeCreateBackupTexts(){if(!this._backupConfig||!this._backupConfig.automatic_backups_configured||!this._backupConfig.create_backup.password||0===this._backupConfig.create_backup.agent_ids.length)return{title:this.hass.localize("ui.panel.config.labs.create_backup.manual"),description:this.hass.localize("ui.panel.config.labs.create_backup.manual_description")};const e=this._backupConfig.last_completed_automatic_backup?new Date(this._backupConfig.last_completed_automatic_backup):null,t=new Date;return{title:this.hass.localize("ui.panel.config.labs.create_backup.automatic"),description:e?this.hass.localize("ui.panel.config.labs.create_backup.automatic_description_last",{relative_time:(0,l.K)(e,this.hass.locale,t,!0)}):this.hass.localize("ui.panel.config.labs.create_backup.automatic_description_none")}}_createBackupChanged(e){this._createBackup=e.target.checked}_handleCancel(){this.closeDialog()}_handleConfirm(){this._params&&this._params.onConfirm(this._createBackup),this.closeDialog()}render(){if(!this._params)return r.s6;const e=this._computeCreateBackupTexts();return r.qy` <ha-wa-dialog .hass="${this.hass}" .open="${this._open}" header-title="${this.hass.localize("ui.panel.config.labs.enable_title")}" @closed="${this._dialogClosed}"> <p> ${this.hass.localize(`component.${this._params.preview_feature.domain}.preview_features.${this._params.preview_feature.preview_feature}.enable_confirmation`)||this.hass.localize("ui.panel.config.labs.enable_confirmation")} </p> ${e?r.qy` <ha-md-list> <ha-md-list-item> <span slot="headline">${e.title}</span> ${e.description?r.qy` <span slot="supporting-text"> ${e.description} </span> `:r.s6} <ha-switch slot="end" .checked="${this._createBackup}" @change="${this._createBackupChanged}"></ha-switch> </ha-md-list-item> </ha-md-list> `:r.s6} <ha-dialog-footer slot="footer"> <ha-button slot="secondaryAction" appearance="plain" @click="${this._handleCancel}"> ${this.hass.localize("ui.common.cancel")} </ha-button> <ha-button slot="primaryAction" appearance="filled" variant="brand" @click="${this._handleConfirm}"> ${this.hass.localize("ui.panel.config.labs.enable")} </ha-button> </ha-dialog-footer> </ha-wa-dialog> `}constructor(...e){super(...e),this._createBackup=!1,this._open=!1}}g.styles=r.AH`ha-wa-dialog{--dialog-content-padding:0}p{margin:0 var(--ha-space-6) var(--ha-space-6);color:var(--secondary-text-color)}ha-md-list{background:0 0;--md-list-item-leading-space:var(--ha-space-6);--md-list-item-trailing-space:var(--ha-space-6);margin:0;padding:0;border-top:var(--ha-border-width-sm) solid var(--divider-color)}`,(0,i.Cg)([(0,n.MZ)({attribute:!1})],g.prototype,"hass",void 0),(0,i.Cg)([(0,n.wk)()],g.prototype,"_params",void 0),(0,i.Cg)([(0,n.wk)()],g.prototype,"_backupConfig",void 0),(0,i.Cg)([(0,n.wk)()],g.prototype,"_createBackup",void 0),(0,i.Cg)([(0,n.wk)()],g.prototype,"_open",void 0),g=(0,i.Cg)([(0,n.EM)("dialog-labs-preview-feature-enable")],g),o()}catch(e){o(e)}})},26528(e,t,a){a.d(t,{v:()=>o});const o=async(e,t,a={})=>(e.expired&&await e.refreshAccessToken(),a.credentials="same-origin",a.headers||(a.headers={}),a.headers||(a.headers={}),a.headers.authorization=`Bearer ${e.accessToken}`,fetch(t,a))},30039(e,t,a){a.d(t,{R:()=>o});const o=(e,t="")=>{const a=document.createElement("a");a.target="_blank",a.href=e,a.download=t,a.style.display="none",document.body.appendChild(a),a.dispatchEvent(new MouseEvent("click")),document.body.removeChild(a)}},39889(e,t,a){a.d(t,{Ay:()=>r,QE:()=>i,qB:()=>n});a(33110);if(66649!=a.j)var o=a(26528);const i=async e=>{let t;try{t=await e}catch(e){throw{error:"Request error",status_code:void 0,body:void 0}}let a=null;const o=t.headers.get("content-type");if(o&&o.includes("application/json"))try{a=await t.json()}catch(e){throw{error:"Unable to parse JSON response",status_code:e.status,body:null}}else a=await t.text();if(!t.ok)throw{error:`Response error: ${t.status}`,status_code:t.status,body:a};return a};async function r(e,t,a,r,n){const s=`${e.data.hassUrl}/api/${a}`,l={method:t,headers:n||{}};return r&&(l.headers["Content-Type"]="application/json;charset=UTF-8",l.body=JSON.stringify(r)),i((0,o.v)(e,s,l))}async function n(e,t,a,i,r,n){const s=`${e.data.hassUrl}/api/${a}`,l={method:t,headers:r||{},signal:n};return i&&(l.headers["Content-Type"]="application/json;charset=UTF-8",l.body=JSON.stringify(i)),(0,o.v)(e,s,l)}}};
//# sourceMappingURL=7901.4ca49739e2168793.js.map