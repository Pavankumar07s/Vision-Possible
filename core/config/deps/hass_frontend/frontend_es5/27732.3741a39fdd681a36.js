(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["27732"],{5745:function(e,t,a){"use strict";var i=a(40445),o=a(82339),r=a(77845);class s extends o.Y{}s=(0,i.Cg)([(0,r.EM)("ha-chip-set")],s)},38962:function(e,t,a){"use strict";a.r(t);a(62953);var i=a(40445),o=a(96196),r=a(77845),s=a(94333),n=a(1087);a(26300),a(67094);let l,d,c,h,p=e=>e;const u={info:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",warning:"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",error:"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",success:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"};class f extends o.WF{render(){return(0,o.qy)(l||(l=p` <div class="issue-type ${0}" role="alert"> <div class="icon ${0}"> <slot name="icon"> <ha-svg-icon .path="${0}"></ha-svg-icon> </slot> </div> <div class="${0}"> <div class="main-content"> ${0} <slot></slot> </div> <div class="action"> <slot name="action"> ${0} </slot> </div> </div> </div> `),(0,s.H)({[this.alertType]:!0}),this.title?"":"no-title",u[this.alertType],(0,s.H)({content:!0,narrow:this.narrow}),this.title?(0,o.qy)(d||(d=p`<div class="title">${0}</div>`),this.title):o.s6,this.dismissable?(0,o.qy)(c||(c=p`<ha-icon-button @click="${0}" label="Dismiss alert" .path="${0}"></ha-icon-button>`),this._dismissClicked,"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"):o.s6)}_dismissClicked(){(0,n.r)(this,"alert-dismissed-clicked")}constructor(...e){super(...e),this.title="",this.alertType="info",this.dismissable=!1,this.narrow=!1}}f.styles=(0,o.AH)(h||(h=p`.issue-type{position:relative;padding:8px;display:flex}.icon{height:var(--ha-alert-icon-size,24px);width:var(--ha-alert-icon-size,24px)}.issue-type::after{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.12;pointer-events:none;content:"";border-radius:var(--ha-border-radius-sm)}.icon.no-title{align-self:center}.content{display:flex;justify-content:space-between;align-items:center;width:100%;text-align:var(--float-start)}.content.narrow{flex-direction:column;align-items:flex-end}.action{z-index:1;width:min-content;--mdc-theme-primary:var(--primary-text-color)}.main-content{overflow-wrap:anywhere;word-break:break-word;line-height:normal;margin-left:8px;margin-right:0;margin-inline-start:8px;margin-inline-end:8px}.title{margin-top:2px;font-weight:var(--ha-font-weight-bold)}.action ha-icon-button{--mdc-theme-primary:var(--primary-text-color);--mdc-icon-button-size:36px}.issue-type.info>.icon{color:var(--info-color)}.issue-type.info::after{background-color:var(--info-color)}.issue-type.warning>.icon{color:var(--warning-color)}.issue-type.warning::after{background-color:var(--warning-color)}.issue-type.error>.icon{color:var(--error-color)}.issue-type.error::after{background-color:var(--error-color)}.issue-type.success>.icon{color:var(--success-color)}.issue-type.success::after{background-color:var(--success-color)}:host ::slotted(ul){margin:0;padding-inline-start:20px}`)),(0,i.Cg)([(0,r.MZ)()],f.prototype,"title",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"alert-type"})],f.prototype,"alertType",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],f.prototype,"dismissable",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],f.prototype,"narrow",void 0),f=(0,i.Cg)([(0,r.EM)("ha-alert")],f)},93444:function(e,t,a){"use strict";var i=a(40445),o=a(96196),r=a(77845);let s,n,l=e=>e;class d extends o.WF{render(){return(0,o.qy)(s||(s=l` <footer> <slot name="secondaryAction"></slot> <slot name="primaryAction"></slot> </footer> `))}static get styles(){return[(0,o.AH)(n||(n=l`footer{display:flex;gap:var(--ha-space-3);justify-content:flex-end;align-items:center;width:100%}`))]}}d=(0,i.Cg)([(0,r.EM)("ha-dialog-footer")],d)},44010:function(e,t,a){"use strict";a(62953);var i=a(40445),o=a(4042),r=a(77845);class s extends o.A{constructor(...e){super(...e),this.name="fadeIn",this.fill="both",this.play=!0,this.iterations=1}}(0,i.Cg)([(0,r.MZ)()],s.prototype,"name",void 0),(0,i.Cg)([(0,r.MZ)()],s.prototype,"fill",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],s.prototype,"play",void 0),(0,i.Cg)([(0,r.MZ)({type:Number})],s.prototype,"iterations",void 0),s=(0,i.Cg)([(0,r.EM)("ha-fade-in")],s)},88945:function(e,t,a){"use strict";a.r(t),a.d(t,{HaIcon:function(){return k}});a(74423),a(3362),a(62953);var i=a(40445),o=a(96196),r=a(77845),s=a(1087),n=a(9899),l=a(57769),d=(a(44114),a(18111),a(7588),a(96167),a(95192)),c=a(22786),h=a(7553);const p=JSON.parse('{"version":"7.4.47","parts":[{"file":"7a7139d465f1f41cb26ab851a17caa21a9331234"},{"start":"account-supervisor-circle-","file":"9561286c4c1021d46b9006596812178190a7cc1c"},{"start":"alpha-r-c","file":"eb466b7087fb2b4d23376ea9bc86693c45c500fa"},{"start":"arrow-decision-o","file":"4b3c01b7e0723b702940c5ac46fb9e555646972b"},{"start":"baby-f","file":"2611401d85450b95ab448ad1d02c1a432b409ed2"},{"start":"battery-hi","file":"89bcd31855b34cd9d31ac693fb073277e74f1f6a"},{"start":"blur-r","file":"373709cd5d7e688c2addc9a6c5d26c2d57c02c48"},{"start":"briefcase-account-","file":"a75956cf812ee90ee4f656274426aafac81e1053"},{"start":"calendar-question-","file":"3253f2529b5ebdd110b411917bacfacb5b7063e6"},{"start":"car-lig","file":"74566af3501ad6ae58ad13a8b6921b3cc2ef879d"},{"start":"cellphone-co","file":"7677f1cfb2dd4f5562a2aa6d3ae43a2e6997b21a"},{"start":"circle-slice-2","file":"70d08c50ec4522dd75d11338db57846588263ee2"},{"start":"cloud-co","file":"141d2bfa55ca4c83f4bae2812a5da59a84fec4ff"},{"start":"cog-s","file":"5a640365f8e47c609005d5e098e0e8104286d120"},{"start":"cookie-l","file":"dd85b8eb8581b176d3acf75d1bd82e61ca1ba2fc"},{"start":"currency-eur-","file":"15362279f4ebfc3620ae55f79d2830ad86d5213e"},{"start":"delete-o","file":"239434ab8df61237277d7599ebe066c55806c274"},{"start":"draw-","file":"5605918a592070803ba2ad05a5aba06263da0d70"},{"start":"emoticon-po","file":"a838cfcec34323946237a9f18e66945f55260f78"},{"start":"fan","file":"effd56103b37a8c7f332e22de8e4d67a69b70db7"},{"start":"file-question-","file":"b2424b50bd465ae192593f1c3d086c5eec893af8"},{"start":"flask-off-","file":"3b76295cde006a18f0301dd98eed8c57e1d5a425"},{"start":"food-s","file":"1c6941474cbeb1755faaaf5771440577f4f1f9c6"},{"start":"gamepad-u","file":"c6efe18db6bc9654ae3540c7dee83218a5450263"},{"start":"google-f","file":"df341afe6ad4437457cf188499cb8d2df8ac7b9e"},{"start":"head-c","file":"282121c9e45ed67f033edcc1eafd279334c00f46"},{"start":"home-pl","file":"27e8e38fc7adcacf2a210802f27d841b49c8c508"},{"start":"inbox-","file":"0f0316ec7b1b7f7ce3eaabce26c9ef619b5a1694"},{"start":"key-v","file":"ea33462be7b953ff1eafc5dac2d166b210685a60"},{"start":"leaf-circle-","file":"33db9bbd66ce48a2db3e987fdbd37fb0482145a4"},{"start":"lock-p","file":"b89e27ed39e9d10c44259362a4b57f3c579d3ec8"},{"start":"message-s","file":"7b5ab5a5cadbe06e3113ec148f044aa701eac53a"},{"start":"moti","file":"01024d78c248d36805b565e343dd98033cc3bcaf"},{"start":"newspaper-variant-o","file":"22a6ec4a4fdd0a7c0acaf805f6127b38723c9189"},{"start":"on","file":"c73d55b412f394e64632e2011a59aa05e5a1f50d"},{"start":"paw-ou","file":"3f669bf26d16752dc4a9ea349492df93a13dcfbf"},{"start":"pigg","file":"0c24edb27eb1c90b6e33fc05f34ef3118fa94256"},{"start":"printer-pos-sy","file":"41a55cda866f90b99a64395c3bb18c14983dcf0a"},{"start":"read","file":"c7ed91552a3a64c9be88c85e807404cf705b7edf"},{"start":"robot-vacuum-variant-o","file":"917d2a35d7268c0ea9ad9ecab2778060e19d90e0"},{"start":"sees","file":"6e82d9861d8fac30102bafa212021b819f303bdb"},{"start":"shoe-f","file":"e2fe7ce02b5472301418cc90a0e631f187b9f238"},{"start":"snowflake-m","file":"a28ba9f5309090c8b49a27ca20ff582a944f6e71"},{"start":"st","file":"7e92d03f095ec27e137b708b879dfd273bd735ab"},{"start":"su","file":"61c74913720f9de59a379bdca37f1d2f0dc1f9db"},{"start":"tag-plus-","file":"8f3184156a4f38549cf4c4fffba73a6a941166ae"},{"start":"timer-a","file":"baab470d11cfb3a3cd3b063ee6503a77d12a80d0"},{"start":"transit-d","file":"8561c0d9b1ac03fab360fd8fe9729c96e8693239"},{"start":"vector-arrange-b","file":"c9a3439257d4bab33d3355f1f2e11842e8171141"},{"start":"water-ou","file":"02dbccfb8ca35f39b99f5a085b095fc1275005a0"},{"start":"webc","file":"57bafd4b97341f4f2ac20a609d023719f23a619c"},{"start":"zip","file":"65ae094e8263236fa50486584a08c03497a38d93"}]}'),u=(0,c.A)(async()=>{const e=(0,d.y$)("hass-icon-db","mdi-icon-store"),t=await(0,d.Jt)("_version",e);return t?t!==p.version&&(await(0,d.IU)(e),(0,d.hZ)("_version",p.version,e)):(0,d.hZ)("_version",p.version,e),e}),f=["mdi","hass","hassio","hademo"];let g=[];a(67094);let v,m,y,b=e=>e;const w={},_={},C=(0,n.s)(()=>(async e=>{const t=Object.keys(e),a=await Promise.allSettled(Object.values(e));(await u())("readwrite",i=>{a.forEach((a,o)=>{"fulfilled"===a.status&&Object.entries(a.value).forEach(([e,t])=>{i.put(t,e)}),delete e[t[o]]})})})(_),2e3),x={};class k extends o.WF{willUpdate(e){super.willUpdate(e),e.has("icon")&&(this._path=void 0,this._secondaryPath=void 0,this._viewBox=void 0,this._loadIcon())}render(){return this.icon?this._legacy?(0,o.qy)(v||(v=b` <iron-icon .icon="${0}"></iron-icon>`),this.icon):(0,o.qy)(m||(m=b`<ha-svg-icon .path="${0}" .secondaryPath="${0}" .viewBox="${0}"></ha-svg-icon>`),this._path,this._secondaryPath,this._viewBox):o.s6}async _loadIcon(){if(!this.icon)return;const e=this.icon,[t,i]=this.icon.split(":",2);let o,r=i;if(!t||!r)return;if(!f.includes(t)){const a=l.y[t];return a?void(a&&"function"==typeof a.getIcon&&this._setCustomPath(a.getIcon(r),e)):void(this._legacy=!0)}if(this._legacy=!1,r in w){const e=w[r];let a;e.newName?(a=`Icon ${t}:${r} was renamed to ${t}:${e.newName}, please change your config, it will be removed in version ${e.removeIn}.`,r=e.newName):a=`Icon ${t}:${r} was removed from MDI, please replace this icon with an other icon in your config, it will be removed in version ${e.removeIn}.`,console.warn(a),(0,s.r)(this,"write_log",{level:"warning",message:a})}if(r in x)return void(this._path=x[r]);if("home-assistant"===r){const t=(await a.e("58781").then(a.bind(a,53580))).mdiHomeAssistant;return this.icon===e&&(this._path=t),void(x[r]=t)}try{o=await(e=>new Promise((t,a)=>{if(g.push([e,t,a]),g.length>1)return;const i=u();(0,h.h)(1e3,(async()=>{(await i)("readonly",e=>{for(const[t,a,i]of g)(0,d.Yd)(e.get(t)).then(e=>a(e)).catch(e=>i(e));g=[]})})()).catch(e=>{for(const[,,t]of g)t(e);g=[]})}))(r)}catch(v){o=void 0}if(o)return this.icon===e&&(this._path=o),void(x[r]=o);const n=(e=>{let t;for(const a of p.parts){if(void 0!==a.start&&e<a.start)break;t=a}return t.file})(r);if(n in _)return void this._setPath(_[n],r,e);const c=fetch(`/static/mdi/${n}.json`).then(e=>e.json());_[n]=c,this._setPath(c,r,e),c.catch(()=>{delete _[n]}),C()}async _setCustomPath(e,t){const a=await e;this.icon===t&&(this._path=a.path,this._secondaryPath=a.secondaryPath,this._viewBox=a.viewBox)}async _setPath(e,t,a){try{const i=await e;this.icon===a&&(this._path=i[t]),x[t]=i[t]}catch(i){}}constructor(...e){super(...e),this._legacy=!1}}k.styles=(0,o.AH)(y||(y=b`:host{fill:currentcolor}`)),(0,i.Cg)([(0,r.MZ)()],k.prototype,"icon",void 0),(0,i.Cg)([(0,r.wk)()],k.prototype,"_path",void 0),(0,i.Cg)([(0,r.wk)()],k.prototype,"_secondaryPath",void 0),(0,i.Cg)([(0,r.wk)()],k.prototype,"_viewBox",void 0),(0,i.Cg)([(0,r.wk)()],k.prototype,"_legacy",void 0),k=(0,i.Cg)([(0,r.EM)("ha-icon")],k)},69709:function(e,t,a){"use strict";var i=a(59787),o=(a(74423),a(72712),a(18111),a(22489),a(61701),a(18237),a(3362),a(27495),a(62953),a(40445)),r=a(96196),s=a(77845),n=a(1420),l=a(30015),d=a.n(l),c=a(1087),h=(a(3296),a(27208),a(48408),a(14603),a(47566),a(98721),a(2209));let p;var u=a(996);let f,g=e=>e;const v=e=>(0,r.qy)(f||(f=g`${0}`),e),m=new u.G(1e3),y={reType:(0,i.A)(/((\[!(caution|important|note|tip|warning)\])(?:\s|\\n)?)/i,{input:1,type:3}),typeToHaAlert:{caution:"error",important:"info",note:"info",tip:"success",warning:"warning"}};class b extends r.mN{disconnectedCallback(){if(super.disconnectedCallback(),this.cache){const e=this._computeCacheKey();m.set(e,this.innerHTML)}}createRenderRoot(){return this}update(e){super.update(e),void 0!==this.content&&(this._renderPromise=this._render())}async getUpdateComplete(){return await super.getUpdateComplete(),await this._renderPromise,!0}willUpdate(e){if(!this.innerHTML&&this.cache){const e=this._computeCacheKey();m.has(e)&&((0,r.XX)(v((0,n._)(m.get(e))),this.renderRoot),this._resize())}}_computeCacheKey(){return d()({content:this.content,allowSvg:this.allowSvg,allowDataUrl:this.allowDataUrl,breaks:this.breaks})}async _render(){const e=await(async(e,t,i)=>(p||(p=(0,h.LV)(new Worker(new URL(a.p+a.u("55640"),a.b)))),p.renderMarkdown(e,t,i)))(String(this.content),{breaks:this.breaks,gfm:!0},{allowSvg:this.allowSvg,allowDataUrl:this.allowDataUrl});(0,r.XX)(v((0,n._)(e.join(""))),this.renderRoot),this._resize();const t=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT,null);for(;t.nextNode();){const e=t.currentNode;if(e instanceof HTMLAnchorElement&&e.host!==document.location.host)e.target="_blank",e.rel="noreferrer noopener";else if(e instanceof HTMLImageElement)this.lazyImages&&(e.loading="lazy"),e.addEventListener("load",this._resize);else if(e instanceof HTMLQuoteElement){var i;const a=(null===(i=e.firstElementChild)||void 0===i||null===(i=i.firstChild)||void 0===i?void 0:i.textContent)&&y.reType.exec(e.firstElementChild.firstChild.textContent);if(a){const{type:i}=a.groups,o=document.createElement("ha-alert");o.alertType=y.typeToHaAlert[i.toLowerCase()],o.append(...Array.from(e.childNodes).map(e=>{const t=Array.from(e.childNodes);if(!this.breaks&&t.length){var i;const e=t[0];e.nodeType===Node.TEXT_NODE&&e.textContent===a.input&&null!==(i=e.textContent)&&void 0!==i&&i.includes("\n")&&(e.textContent=e.textContent.split("\n").slice(1).join("\n"))}return t}).reduce((e,t)=>e.concat(t),[]).filter(e=>e.textContent&&e.textContent!==a.input)),t.parentNode().replaceChild(o,e)}}else e instanceof HTMLElement&&["ha-alert","ha-qr-code","ha-icon","ha-svg-icon"].includes(e.localName)&&a(96175)(`./${e.localName}`)}}constructor(...e){super(...e),this.allowSvg=!1,this.allowDataUrl=!1,this.breaks=!1,this.lazyImages=!1,this.cache=!1,this._renderPromise=Promise.resolve(),this._resize=()=>(0,c.r)(this,"content-resize")}}(0,o.Cg)([(0,s.MZ)()],b.prototype,"content",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"allow-svg",type:Boolean})],b.prototype,"allowSvg",void 0),(0,o.Cg)([(0,s.MZ)({attribute:"allow-data-url",type:Boolean})],b.prototype,"allowDataUrl",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean})],b.prototype,"breaks",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean,attribute:"lazy-images"})],b.prototype,"lazyImages",void 0),(0,o.Cg)([(0,s.MZ)({type:Boolean})],b.prototype,"cache",void 0),b=(0,o.Cg)([(0,s.EM)("ha-markdown-element")],b)},3587:function(e,t,a){"use strict";a(3362),a(62953);var i=a(40445),o=a(96196),r=a(77845);a(69709);let s,n,l=e=>e;class d extends o.WF{async getUpdateComplete(){var e;const t=await super.getUpdateComplete();return await(null===(e=this._markdownElement)||void 0===e?void 0:e.updateComplete),t}render(){return this.content?(0,o.qy)(s||(s=l`<ha-markdown-element .content="${0}" .allowSvg="${0}" .allowDataUrl="${0}" .breaks="${0}" .lazyImages="${0}" .cache="${0}"></ha-markdown-element>`),this.content,this.allowSvg,this.allowDataUrl,this.breaks,this.lazyImages,this.cache):o.s6}constructor(...e){super(...e),this.allowSvg=!1,this.allowDataUrl=!1,this.breaks=!1,this.lazyImages=!1,this.cache=!1}}d.styles=(0,o.AH)(n||(n=l`
    :host {
      display: block;
    }
    ha-markdown-element {
      -ms-user-select: text;
      -webkit-user-select: text;
      -moz-user-select: text;
    }
    ha-markdown-element > *:first-child {
      margin-top: 0;
    }
    ha-markdown-element > *:last-child {
      margin-bottom: 0;
    }
    ha-alert {
      display: block;
      margin: var(--ha-space-1) 0;
    }
    a {
      color: var(--markdown-link-color, var(--primary-color));
    }
    img {
      background-color: var(--markdown-image-background-color);
      border-radius: var(--markdown-image-border-radius);
      max-width: 100%;
    }
    p:first-child > img:first-child {
      vertical-align: top;
    }
    p:first-child > img:last-child {
      vertical-align: top;
    }
    ha-markdown-element > :is(ol, ul) {
      padding-inline-start: var(--markdown-list-indent, revert);
    }
    li {
      &:has(input[type="checkbox"]) {
        list-style: none;
        & > input[type="checkbox"] {
          margin-left: 0;
        }
      }
    }
    svg {
      background-color: var(--markdown-svg-background-color, none);
      color: var(--markdown-svg-color, none);
    }
    code,
    pre {
      background-color: var(--markdown-code-background-color, none);
      border-radius: var(--ha-border-radius-sm);
      color: var(--markdown-code-text-color, inherit);
    }
    code {
      font-size: var(--ha-font-size-s);
      padding: 0.2em 0.4em;
    }
    pre code {
      padding: 0;
    }
    pre {
      padding: var(--ha-space-4);
      overflow: auto;
      line-height: var(--ha-line-height-condensed);
      font-family: var(--ha-font-family-code);
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: initial;
    }
    h2 {
      font-size: var(--ha-font-size-xl);
      font-weight: var(--ha-font-weight-bold);
    }
    hr {
      border-color: var(--divider-color);
      border-bottom: none;
      margin: var(--ha-space-4) 0;
    }
    table[role="presentation"] {
      --markdown-table-border-collapse: separate;
      --markdown-table-border-width: attr(border, 0);
      --markdown-table-padding-inline: 0;
      --markdown-table-padding-block: 0;
      th {
        vertical-align: attr(valign, middle);
      }
      td {
        vertical-align: attr(valign, middle);
      }
    }
    table {
      border-collapse: var(--markdown-table-border-collapse, collapse);
    }
    div:has(> table) {
      overflow: auto;
    }
    th {
      text-align: var(--markdown-table-text-align, start);
    }
    td,
    th {
      border-width: var(--markdown-table-border-width, 1px);
      border-style: var(--markdown-table-border-style, solid);
      border-color: var(--markdown-table-border-color, var(--divider-color));
      padding-inline: var(--markdown-table-padding-inline, 0.5em);
      padding-block: var(--markdown-table-padding-block, 0.25em);
    }
    blockquote {
      border-left: 4px solid var(--divider-color);
      margin-inline: 0;
      padding-inline: 1em;
    }
  `)),(0,i.Cg)([(0,r.MZ)()],d.prototype,"content",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"allow-svg",type:Boolean})],d.prototype,"allowSvg",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"allow-data-url",type:Boolean})],d.prototype,"allowDataUrl",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],d.prototype,"breaks",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,attribute:"lazy-images"})],d.prototype,"lazyImages",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],d.prototype,"cache",void 0),(0,i.Cg)([(0,r.P)("ha-markdown-element")],d.prototype,"_markdownElement",void 0),d=(0,i.Cg)([(0,r.EM)("ha-markdown")],d)},2846:function(e,t,a){"use strict";a.d(t,{G:function(){return p},J:function(){return h}});var i=a(40445),o=a(97154),r=a(82553),s=a(96196),n=a(77845);a(54276);let l,d,c=e=>e;const h=[r.R,(0,s.AH)(l||(l=c`:host{--ha-icon-display:block;--md-sys-color-primary:var(--primary-text-color);--md-sys-color-secondary:var(--secondary-text-color);--md-sys-color-surface:var(--card-background-color);--md-sys-color-on-surface:var(--primary-text-color);--md-sys-color-on-surface-variant:var(--secondary-text-color)}md-item{overflow:var(--md-item-overflow,hidden);align-items:var(--md-item-align-items,center);gap:var(--ha-md-list-item-gap,16px)}`))];class p extends o.n{renderRipple(){return"text"===this.type?s.s6:(0,s.qy)(d||(d=c`<ha-ripple part="ripple" for="item" ?disabled="${0}"></ha-ripple>`),this.disabled&&"link"!==this.type)}}p.styles=h,p=(0,i.Cg)([(0,n.EM)("ha-md-list-item")],p)},71418:function(e,t,a){"use strict";a(62953);var i=a(40445),o=a(96196),r=a(77845);a(26300),a(75709);let s,n,l,d=e=>e;class c extends o.WF{render(){var e;return(0,o.qy)(s||(s=d`<ha-textfield .invalid="${0}" .errorMessage="${0}" .icon="${0}" .iconTrailing="${0}" .autocomplete="${0}" .autocorrect="${0}" .inputSpellcheck="${0}" .value="${0}" .placeholder="${0}" .label="${0}" .disabled="${0}" .required="${0}" .minLength="${0}" .maxLength="${0}" .outlined="${0}" .helper="${0}" .validateOnInitialRender="${0}" .validationMessage="${0}" .autoValidate="${0}" .pattern="${0}" .size="${0}" .helperPersistent="${0}" .charCounter="${0}" .endAligned="${0}" .prefix="${0}" .name="${0}" .inputMode="${0}" .readOnly="${0}" .autocapitalize="${0}" .type="${0}" .suffix="${0}" @input="${0}" @change="${0}"></ha-textfield> <ha-icon-button .label="${0}" @click="${0}" .path="${0}"></ha-icon-button>`),this.invalid,this.errorMessage,this.icon,this.iconTrailing,this.autocomplete,this.autocorrect,this.inputSpellcheck,this.value,this.placeholder,this.label,this.disabled,this.required,this.minLength,this.maxLength,this.outlined,this.helper,this.validateOnInitialRender,this.validationMessage,this.autoValidate,this.pattern,this.size,this.helperPersistent,this.charCounter,this.endAligned,this.prefix,this.name,this.inputMode,this.readOnly,this.autocapitalize,this._unmaskedPassword?"text":"password",(0,o.qy)(n||(n=d`<div style="width:24px"></div>`)),this._handleInputEvent,this._handleChangeEvent,(null===(e=this.hass)||void 0===e?void 0:e.localize(this._unmaskedPassword?"ui.components.selectors.text.hide_password":"ui.components.selectors.text.show_password"))||(this._unmaskedPassword?"Hide password":"Show password"),this._toggleUnmaskedPassword,this._unmaskedPassword?"M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z":"M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z")}focus(){this._textField.focus()}checkValidity(){return this._textField.checkValidity()}reportValidity(){return this._textField.reportValidity()}setCustomValidity(e){return this._textField.setCustomValidity(e)}layout(){return this._textField.layout()}_toggleUnmaskedPassword(){this._unmaskedPassword=!this._unmaskedPassword}_handleInputEvent(e){this.value=e.target.value}_handleChangeEvent(e){this.value=e.target.value,this._reDispatchEvent(e)}_reDispatchEvent(e){const t=new Event(e.type,e);this.dispatchEvent(t)}constructor(...e){super(...e),this.icon=!1,this.iconTrailing=!1,this.autocorrect=!0,this.value="",this.placeholder="",this.label="",this.disabled=!1,this.required=!1,this.minLength=-1,this.maxLength=-1,this.outlined=!1,this.helper="",this.validateOnInitialRender=!1,this.validationMessage="",this.autoValidate=!1,this.pattern="",this.size=null,this.helperPersistent=!1,this.charCounter=!1,this.endAligned=!1,this.prefix="",this.suffix="",this.name="",this.readOnly=!1,this.autocapitalize="",this._unmaskedPassword=!1}}c.styles=(0,o.AH)(l||(l=d`:host{display:block;position:relative}ha-textfield{width:100%}ha-icon-button{position:absolute;top:8px;right:8px;inset-inline-start:initial;inset-inline-end:8px;--mdc-icon-button-size:40px;--mdc-icon-size:20px;color:var(--secondary-text-color);direction:var(--direction)}`)),(0,i.Cg)([(0,r.MZ)({attribute:!1})],c.prototype,"hass",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"invalid",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"error-message"})],c.prototype,"errorMessage",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"icon",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"iconTrailing",void 0),(0,i.Cg)([(0,r.MZ)()],c.prototype,"autocomplete",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"autocorrect",void 0),(0,i.Cg)([(0,r.MZ)({attribute:"input-spellcheck"})],c.prototype,"inputSpellcheck",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],c.prototype,"value",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],c.prototype,"placeholder",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],c.prototype,"label",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],c.prototype,"disabled",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"required",void 0),(0,i.Cg)([(0,r.MZ)({type:Number})],c.prototype,"minLength",void 0),(0,i.Cg)([(0,r.MZ)({type:Number})],c.prototype,"maxLength",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean,reflect:!0})],c.prototype,"outlined",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],c.prototype,"helper",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"validateOnInitialRender",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],c.prototype,"validationMessage",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"autoValidate",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],c.prototype,"pattern",void 0),(0,i.Cg)([(0,r.MZ)({type:Number})],c.prototype,"size",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"helperPersistent",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"charCounter",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"endAligned",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],c.prototype,"prefix",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],c.prototype,"suffix",void 0),(0,i.Cg)([(0,r.MZ)({type:String})],c.prototype,"name",void 0),(0,i.Cg)([(0,r.MZ)({type:String,attribute:"input-mode"})],c.prototype,"inputMode",void 0),(0,i.Cg)([(0,r.MZ)({type:Boolean})],c.prototype,"readOnly",void 0),(0,i.Cg)([(0,r.MZ)({attribute:!1,type:String})],c.prototype,"autocapitalize",void 0),(0,i.Cg)([(0,r.wk)()],c.prototype,"_unmaskedPassword",void 0),(0,i.Cg)([(0,r.P)("ha-textfield")],c.prototype,"_textField",void 0),(0,i.Cg)([(0,r.Ls)({passive:!0})],c.prototype,"_handleInputEvent",null),(0,i.Cg)([(0,r.Ls)({passive:!0})],c.prototype,"_handleChangeEvent",null),c=(0,i.Cg)([(0,r.EM)("ha-password-field")],c)},65829:function(e,t,a){"use strict";a.a(e,async function(e,i){try{a.r(t),a.d(t,{HaSpinner:function(){return h}});var o=a(40445),r=a(55262),s=a(96196),n=a(77845),l=e([r]);r=(l.then?(await l)():l)[0];let d,c=e=>e;class h extends r.A{updated(e){if(super.updated(e),e.has("size"))switch(this.size){case"tiny":this.style.setProperty("--ha-spinner-size","16px");break;case"small":this.style.setProperty("--ha-spinner-size","28px");break;case"medium":this.style.setProperty("--ha-spinner-size","48px");break;case"large":this.style.setProperty("--ha-spinner-size","68px");break;case void 0:this.style.removeProperty("--ha-progress-ring-size")}}static get styles(){return[r.A.styles,(0,s.AH)(d||(d=c`:host{--indicator-color:var(
            --ha-spinner-indicator-color,
            var(--primary-color)
          );--track-color:var(--ha-spinner-divider-color, var(--divider-color));--track-width:4px;--speed:3.5s;font-size:var(--ha-spinner-size, 48px)}`))]}}(0,o.Cg)([(0,n.MZ)()],h.prototype,"size",void 0),h=(0,o.Cg)([(0,n.EM)("ha-spinner")],h),i()}catch(d){i(d)}})},45331:function(e,t,a){"use strict";a.a(e,async function(e,t){try{a(3362),a(62953);var i=a(40445),o=a(93900),r=a(96196),s=a(77845),n=a(32288),l=a(1087),d=a(59992),c=a(14503),h=(a(76538),a(26300),e([o,d]));[o,d]=h.then?(await h)():h;let p,u,f,g,v,m,y,b=e=>e;const w="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";class _ extends((0,d.V)(r.WF)){get scrollableElement(){return this.bodyContainer}updated(e){super.updated(e),e.has("open")&&(this._open=this.open)}render(){var e,t;return(0,r.qy)(p||(p=b` <wa-dialog .open="${0}" .lightDismiss="${0}" without-header aria-labelledby="${0}" aria-describedby="${0}" @keydown="${0}" @wa-hide="${0}" @wa-show="${0}" @wa-after-show="${0}" @wa-after-hide="${0}"> ${0} <div class="content-wrapper"> <div class="body ha-scrollbar" @scroll="${0}"> <slot></slot> </div> ${0} </div> <slot name="footer" slot="footer"></slot> </wa-dialog> `),this._open,!this.preventScrimClose,(0,n.J)(this.ariaLabelledBy||(void 0!==this.headerTitle?"ha-wa-dialog-title":void 0)),(0,n.J)(this.ariaDescribedBy),this._handleKeyDown,this._handleHide,this._handleShow,this._handleAfterShow,this._handleAfterHide,this.withoutHeader?r.s6:(0,r.qy)(u||(u=b` <slot name="header"> <ha-dialog-header .subtitlePosition="${0}" .showBorder="${0}"> <slot name="headerNavigationIcon" slot="navigationIcon"> <ha-icon-button data-dialog="close" .label="${0}" .path="${0}"></ha-icon-button> </slot> ${0} ${0} <slot name="headerActionItems" slot="actionItems"></slot> </ha-dialog-header> </slot>`),this.headerSubtitlePosition,this._bodyScrolled,null!==(e=null===(t=this.hass)||void 0===t?void 0:t.localize("ui.common.close"))&&void 0!==e?e:"Close",w,void 0!==this.headerTitle?(0,r.qy)(f||(f=b`<span slot="title" class="title" id="ha-wa-dialog-title"> ${0} </span>`),this.headerTitle):(0,r.qy)(g||(g=b`<slot name="headerTitle" slot="title"></slot>`)),void 0!==this.headerSubtitle?(0,r.qy)(v||(v=b`<span slot="subtitle">${0}</span>`),this.headerSubtitle):(0,r.qy)(m||(m=b`<slot name="headerSubtitle" slot="subtitle"></slot>`))),this._handleBodyScroll,this.renderScrollableFades())}disconnectedCallback(){super.disconnectedCallback(),this._open=!1}_handleBodyScroll(e){this._bodyScrolled=e.target.scrollTop>0}_handleKeyDown(e){"Escape"===e.key&&(this._escapePressed=!0)}_handleHide(e){this.preventScrimClose&&this._escapePressed&&e.detail.source===e.target.dialog&&e.preventDefault(),this._escapePressed=!1}static get styles(){return[...super.styles,c.dp,(0,r.AH)(y||(y=b`
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
      `))]}constructor(...e){super(...e),this.open=!1,this.type="standard",this.width="medium",this.preventScrimClose=!1,this.headerSubtitlePosition="below",this.flexContent=!1,this.withoutHeader=!1,this._open=!1,this._bodyScrolled=!1,this._escapePressed=!1,this._handleShow=async()=>{this._open=!0,(0,l.r)(this,"opened"),await this.updateComplete,requestAnimationFrame(()=>{var e;null===(e=this.querySelector("[autofocus]"))||void 0===e||e.focus()})},this._handleAfterShow=()=>{(0,l.r)(this,"after-show")},this._handleAfterHide=e=>{e.eventPhase===Event.AT_TARGET&&(this._open=!1,(0,l.r)(this,"closed"))}}}(0,i.Cg)([(0,s.MZ)({attribute:!1})],_.prototype,"hass",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"aria-labelledby"})],_.prototype,"ariaLabelledBy",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"aria-describedby"})],_.prototype,"ariaDescribedBy",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,reflect:!0})],_.prototype,"open",void 0),(0,i.Cg)([(0,s.MZ)({reflect:!0})],_.prototype,"type",void 0),(0,i.Cg)([(0,s.MZ)({type:String,reflect:!0,attribute:"width"})],_.prototype,"width",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"prevent-scrim-close"})],_.prototype,"preventScrimClose",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"header-title"})],_.prototype,"headerTitle",void 0),(0,i.Cg)([(0,s.MZ)({attribute:"header-subtitle"})],_.prototype,"headerSubtitle",void 0),(0,i.Cg)([(0,s.MZ)({type:String,attribute:"header-subtitle-position"})],_.prototype,"headerSubtitlePosition",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"flexcontent"})],_.prototype,"flexContent",void 0),(0,i.Cg)([(0,s.MZ)({type:Boolean,attribute:"without-header"})],_.prototype,"withoutHeader",void 0),(0,i.Cg)([(0,s.wk)()],_.prototype,"_open",void 0),(0,i.Cg)([(0,s.P)(".body")],_.prototype,"bodyContainer",void 0),(0,i.Cg)([(0,s.wk)()],_.prototype,"_bodyScrolled",void 0),(0,i.Cg)([(0,s.Ls)({passive:!0})],_.prototype,"_handleBodyScroll",null),_=(0,i.Cg)([(0,s.EM)("ha-wa-dialog")],_),t()}catch(p){t(p)}})},76944:function(e,t,a){"use strict";a.d(t,{MV:function(){return s},VR:function(){return r},d8:function(){return i},jJ:function(){return n},l3:function(){return o}});a(3362);const i=async e=>e.callWS({type:"application_credentials/config"}),o=async(e,t)=>e.callWS({type:"application_credentials/config_entry",config_entry_id:t}),r=async e=>e.callWS({type:"application_credentials/list"}),s=async(e,t,a,i,o)=>e.callWS({type:"application_credentials/create",domain:t,client_id:a,client_secret:i,name:o}),n=async(e,t)=>e.callWS({type:"application_credentials/delete",application_credentials_id:t})},57769:function(e,t,a){"use strict";a.d(t,{y:function(){return s}});const i=window;"customIconsets"in i||(i.customIconsets={});const o=i.customIconsets,r=window;"customIcons"in r||(r.customIcons={});const s=new Proxy(r.customIcons,{get:(e,t)=>{var a;return null!==(a=e[t])&&void 0!==a?a:o[t]?{getIcon:o[t]}:void 0}})},82196:function(e,t,a){"use strict";a.a(e,async function(e,i){try{a.r(t),a.d(t,{DialogAddApplicationCredential:function(){return L}});a(18111),a(20116),a(61701),a(3362),a(62953);var o=a(40445),r=a(96196),s=a(77845),n=a(1087),l=(a(38962),a(18350)),d=(a(93444),a(44010),a(38508)),c=(a(3587),a(71418),a(65829)),h=(a(75709),a(45331)),p=a(76944),u=a(95350),f=a(14503),g=a(36918),v=e([l,d,c,h]);[l,d,c,h]=v.then?(await v)():v;let m,y,b,w,_,C,x,k,$,M,Z,A=e=>e;const z="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z";class L extends r.WF{showDialog(e){this._params=e,this._domain=e.selectedDomain,this._manifest=e.manifest,this._name="",this._description="",this._clientId="",this._clientSecret="",this._error=void 0,this._loading=!1,this._open=!0,this._fetchConfig()}async _fetchConfig(){this._config=await(0,p.d8)(this.hass),this._domains=Object.keys(this._config.integrations).map(e=>({id:e,name:(0,u.p$)(this.hass.localize,e)})),await this.hass.loadBackendTranslation("application_credentials"),this._updateDescription()}render(){var e,t;if(!this._params)return r.s6;const a=this._params.selectedDomain?(0,u.p$)(this.hass.localize,this._domain):"";return(0,r.qy)(m||(m=A` <ha-wa-dialog .hass="${0}" .open="${0}" @closed="${0}" .preventScrimClose="${0}" .headerTitle="${0}"> ${0} </ha-wa-dialog> `),this.hass,this._open,this._abortDialog,!!(this._domain||this._name||this._clientId||this._clientSecret),this.hass.localize("ui.panel.config.application_credentials.editor.caption"),this._config?(0,r.qy)(b||(b=A`<div> ${0} ${0} ${0} ${0} ${0} <ha-textfield class="name" name="name" .label="${0}" .value="${0}" .invalid="${0}" required @input="${0}" .errorMessage="${0}" dialogInitialFocus></ha-textfield> <ha-textfield class="clientId" name="clientId" .label="${0}" .value="${0}" .invalid="${0}" required @input="${0}" .errorMessage="${0}" dialogInitialFocus .helper="${0}" helperPersistent></ha-textfield> <ha-password-field .label="${0}" name="clientSecret" .value="${0}" .invalid="${0}" required @input="${0}" .errorMessage="${0}" .helper="${0}" helperPersistent></ha-password-field> </div> <ha-dialog-footer slot="footer"> <ha-button appearance="plain" slot="secondaryAction" @click="${0}" .disabled="${0}"> ${0} </ha-button> <ha-button slot="primaryAction" @click="${0}" .loading="${0}"> ${0} </ha-button> </ha-dialog-footer>`),this._error?(0,r.qy)(w||(w=A`<ha-alert alert-type="error">${0}</ha-alert> `),this._error):r.s6,this._params.selectedDomain&&!this._description?(0,r.qy)(_||(_=A`<p> ${0} ${0} </p>`),this.hass.localize("ui.panel.config.application_credentials.editor.missing_credentials",{integration:a}),null!==(e=this._manifest)&&void 0!==e&&e.is_built_in||null!==(t=this._manifest)&&void 0!==t&&t.documentation?(0,r.qy)(C||(C=A`<a href="${0}" target="_blank" rel="noreferrer"> ${0} <ha-svg-icon .path="${0}"></ha-svg-icon> </a>`),this._manifest.is_built_in?(0,g.o)(this.hass,`/integrations/${this._domain}`):this._manifest.documentation,this.hass.localize("ui.panel.config.application_credentials.editor.missing_credentials_domain_link",{integration:a}),z):r.s6):r.s6,this._params.selectedDomain&&this._description?r.s6:(0,r.qy)(x||(x=A`<p> ${0} <a href="${0}" target="_blank" rel="noreferrer"> ${0} <ha-svg-icon .path="${0}"></ha-svg-icon> </a> </p>`),this.hass.localize("ui.panel.config.application_credentials.editor.description"),(0,g.o)(this.hass,"/integrations/application_credentials"),this.hass.localize("ui.panel.config.application_credentials.editor.view_documentation"),z),this._params.selectedDomain?r.s6:(0,r.qy)(k||(k=A`<ha-generic-picker name="domain" .hass="${0}" .label="${0}" .value="${0}" .invalid="${0}" .getItems="${0}" required .disabled="${0}" .valueRenderer="${0}" @value-changed="${0}" .errorMessage="${0}"></ha-generic-picker>`),this.hass,this.hass.localize("ui.panel.config.application_credentials.editor.domain"),this._domain,this._invalid&&!this._domain,this._getDomainItems,!this._domains,this._domainRenderer,this._handleDomainPicked,this.hass.localize("ui.common.error_required")),this._description?(0,r.qy)($||($=A`<ha-markdown breaks .content="${0}"></ha-markdown>`),this._description):r.s6,this.hass.localize("ui.panel.config.application_credentials.editor.name"),this._name,this._invalid&&!this._name,this._handleValueChanged,this.hass.localize("ui.common.error_required"),this.hass.localize("ui.panel.config.application_credentials.editor.client_id"),this._clientId,this._invalid&&!this._clientId,this._handleValueChanged,this.hass.localize("ui.common.error_required"),this.hass.localize("ui.panel.config.application_credentials.editor.client_id_helper"),this.hass.localize("ui.panel.config.application_credentials.editor.client_secret"),this._clientSecret,this._invalid&&!this._clientSecret,this._handleValueChanged,this.hass.localize("ui.common.error_required"),this.hass.localize("ui.panel.config.application_credentials.editor.client_secret_helper"),this._closeDialog,this._loading,this.hass.localize("ui.common.cancel"),this._addApplicationCredential,this._loading,this.hass.localize("ui.panel.config.application_credentials.editor.add")):(0,r.qy)(y||(y=A`<ha-fade-in .delay="${0}"> <ha-spinner size="large"></ha-spinner> </ha-fade-in>`),500))}_closeDialog(){this._open=!1}closeDialog(){this._params=void 0,this._domains=void 0,(0,n.r)(this,"dialog-closed",{dialog:this.localName})}_handleDomainPicked(e){e.stopPropagation(),this._domain=e.detail.value,this._updateDescription()}async _updateDescription(){if(!this._domain)return;await this.hass.loadBackendTranslation("application_credentials",this._domain);const e=this._config.integrations[this._domain];this._description=this.hass.localize(`component.${this._domain}.application_credentials.description`,e.description_placeholders)}_handleValueChanged(e){this._error=void 0;const t=e.target.name,a=e.target.value;this[`_${t}`]=a}_abortDialog(){this._params&&this._params.dialogAbortedCallback&&this._params.dialogAbortedCallback(),this.closeDialog()}async _addApplicationCredential(e){if(e.preventDefault(),!(this._domain&&this._name&&this._clientId&&this._clientSecret))return void(this._invalid=!0);let t;this._invalid=!1,this._loading=!0,this._error="";try{t=await(0,p.MV)(this.hass,this._domain,this._clientId,this._clientSecret,this._name)}catch(a){return this._loading=!1,void(this._error=a.message)}this._params.applicationCredentialAddedCallback(t),this.closeDialog()}static get styles(){return[f.nA,(0,r.AH)(M||(M=A`ha-dialog{--mdc-dialog-max-width:500px;--dialog-z-index:10}.row{display:flex;padding:var(--ha-space-2) 0}ha-textfield{display:block;margin-top:var(--ha-space-4);margin-bottom:var(--ha-space-4)}a{text-decoration:none}a ha-svg-icon{--mdc-icon-size:16px}ha-markdown{margin-top:var(--ha-space-4);margin-bottom:var(--ha-space-4)}ha-fade-in{display:flex;width:100%;justify-content:center}`))]}constructor(...e){super(...e),this._loading=!1,this._open=!1,this._invalid=!1,this._getDomainItems=()=>{var e,t;return null!==(e=null===(t=this._domains)||void 0===t?void 0:t.map(e=>({id:e.id,primary:e.name,sorting_label:e.name})))&&void 0!==e?e:[]},this._domainRenderer=e=>{var t;const a=null===(t=this._domains)||void 0===t?void 0:t.find(t=>t.id===e);return(0,r.qy)(Z||(Z=A`<span slot="headline">${0}</span>`),a?a.name:e)}}}(0,o.Cg)([(0,s.MZ)({attribute:!1})],L.prototype,"hass",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_loading",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_error",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_params",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_domain",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_manifest",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_name",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_description",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_clientId",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_clientSecret",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_domains",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_config",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_open",void 0),(0,o.Cg)([(0,s.wk)()],L.prototype,"_invalid",void 0),L=(0,o.Cg)([(0,s.EM)("dialog-add-application-credential")],L),i()}catch(m){i(m)}})},996:function(e,t,a){"use strict";a.d(t,{G:function(){return i}});a(62953);class i{get(e){return this._cache.get(e)}set(e,t){this._cache.set(e,t),this._expiration&&window.setTimeout(()=>this._cache.delete(e),this._expiration)}has(e){return this._cache.has(e)}constructor(e){this._cache=new Map,this._expiration=e}}},36918:function(e,t,a){"use strict";a.d(t,{o:function(){return i}});a(74423);const i=(e,t)=>`https://${e.config.version.includes("b")?"rc":e.config.version.includes("dev")?"next":"www"}.home-assistant.io${t}`},88438:function(e,t,a){"use strict";a.d(t,{C:function(){return i}});const i="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0},96175:function(e,t,a){var i={"./ha-icon-prev":["89133","61982"],"./ha-icon-button-toolbar":["9882","63768","41983"],"./ha-alert":["38962","19695"],"./ha-icon-button-toggle":["62501","77254"],"./ha-svg-icon.ts":["67094"],"./ha-alert.ts":["38962","19695"],"./ha-icon":["88945","51146"],"./ha-icon-next.ts":["43661","63902"],"./ha-qr-code.ts":["60543","51343","62740"],"./ha-icon-overflow-menu.ts":["75248","63768","34995","78097"],"./ha-icon-button-toggle.ts":["62501","77254"],"./ha-icon-button-group":["39826","13647"],"./ha-svg-icon":["67094"],"./ha-icon-button-prev":["45100","99197"],"./ha-icon-button.ts":["26300"],"./ha-icon-overflow-menu":["75248","63768","34995","78097"],"./ha-icon-button-arrow-next":["99028","54101"],"./ha-icon-button-prev.ts":["45100","99197"],"./ha-icon-picker":["64138","73126","44533","46095","63768","92769","62453","26233","39005","52408"],"./ha-icon-button-toolbar.ts":["9882","63768","41983"],"./ha-icon-button-arrow-prev.ts":["90248","17041"],"./ha-icon-button-next":["3059","81049"],"./ha-icon-next":["43661","63902"],"./ha-icon-picker.ts":["64138","73126","44533","46095","63768","92769","62453","26233","39005","52408"],"./ha-icon-prev.ts":["89133","61982"],"./ha-icon-button-arrow-prev":["90248","17041"],"./ha-icon-button-next.ts":["3059","81049"],"./ha-icon.ts":["88945","51146"],"./ha-qr-code":["60543","51343","62740"],"./ha-icon-button":["26300"],"./ha-icon-button-group.ts":["39826","13647"],"./ha-icon-button-arrow-next.ts":["99028","54101"]};function o(e){if(!a.o(i,e))return Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=i[e],o=t[0];return Promise.all(t.slice(1).map(a.e)).then(function(){return a(o)})}o.keys=function(){return Object.keys(i)},o.id=96175,e.exports=o}}]);
//# sourceMappingURL=27732.3741a39fdd681a36.js.map