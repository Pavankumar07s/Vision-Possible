"use strict";(self.webpackChunkhome_assistant_frontend=self.webpackChunkhome_assistant_frontend||[]).push([["28845"],{85404:function(t,e,s){s(44114),s(54743),s(11745),s(16573),s(78100),s(77936),s(18111),s(61701),s(3362),s(42762),s(72107),s(21489),s(48140),s(75044),s(21903),s(91134),s(28845),s(373),s(37467),s(44732),s(79577),s(41549),s(49797),s(49631),s(35623),s(62953);var i=s(40445),a=s(96196),o=s(77845),n=s(94333),r=s(82286),d=s(69150),l=s(88433),c=s(65063),h=s(74209),u=s(36918);s(38962),s(3587),s(75709);let _,p,g,v,m,b,y,f,x,w,k=t=>t;class M extends a.WF{willUpdate(t){this.hasUpdated&&!t.has("pipeline")||(this._conversation=[{who:"hass",text:this.hass.localize("ui.dialogs.voice_command.how_can_i_help")}])}firstUpdated(t){super.firstUpdated(t),this.startListening&&this.pipeline&&this.pipeline.stt_engine&&h.N.isSupported&&this._toggleListening(),setTimeout(()=>this._messageInput.focus(),0)}updated(t){super.updated(t),t.has("_conversation")&&this._scrollMessagesBottom()}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._audioRecorder)||void 0===t||t.close(),this._unloadAudio()}render(){var t,e;const s=!!this.pipeline&&(this.pipeline.prefer_local_intents||!this.hass.states[this.pipeline.conversation_engine]||(0,r.$)(this.hass.states[this.pipeline.conversation_engine],l.ZE.CONTROL)),i=h.N.isSupported,o=(null===(t=this.pipeline)||void 0===t?void 0:t.stt_engine)&&!this.disableSpeech;return(0,a.qy)(_||(_=k` <div class="messages"> ${0} <div class="spacer"></div> ${0} </div> <div class="input" slot="primaryAction"> <ha-textfield id="message-input" @keyup="${0}" @input="${0}" .label="${0}" .iconTrailing="${0}"> <div slot="trailingIcon"> ${0} </div> </ha-textfield> </div> `),s?a.s6:(0,a.qy)(p||(p=k` <ha-alert> ${0} </ha-alert> `),this.hass.localize("ui.dialogs.voice_command.conversation_no_control")),this._conversation.map(t=>(0,a.qy)(g||(g=k` <ha-markdown class="message ${0}" breaks cache .content="${0}"> </ha-markdown> `),(0,n.H)({error:!!t.error,[t.who]:!0}),t.text)),this._handleKeyUp,this._handleInput,this.hass.localize("ui.dialogs.voice_command.input_label"),!0,this._showSendButton||!o?(0,a.qy)(v||(v=k` <ha-icon-button class="listening-icon" .path="${0}" @click="${0}" .disabled="${0}" .label="${0}"> </ha-icon-button> `),"M2,21L23,12L2,3V10L17,12L2,14V21Z",this._handleSendMessage,this._processing,this.hass.localize("ui.dialogs.voice_command.send_text")):(0,a.qy)(m||(m=k` ${0} <div class="listening-icon"> <ha-icon-button .path="${0}" @click="${0}" .disabled="${0}" .label="${0}"> </ha-icon-button> ${0} </div> `),null!==(e=this._audioRecorder)&&void 0!==e&&e.active?(0,a.qy)(b||(b=k` <div class="bouncer"> <div class="double-bounce1"></div> <div class="double-bounce2"></div> </div> `)):a.s6,"M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z",this._handleListeningButton,this._processing,this.hass.localize("ui.dialogs.voice_command.start_listening"),i?null:(0,a.qy)(y||(y=k` <ha-svg-icon .path="${0}" class="unsupported"></ha-svg-icon> `),"M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z")))}async _scrollMessagesBottom(){const t=this._lastChatMessage;if(t.hasUpdated||await t.updateComplete,this._lastChatMessageImage&&!this._lastChatMessageImage.naturalHeight)try{await this._lastChatMessageImage.decode()}catch(e){console.warn("Failed to decode image:",e)}t.getBoundingClientRect().y<this.getBoundingClientRect().top+24||t.scrollIntoView({behavior:"smooth",block:"start"})}_handleKeyUp(t){const e=t.target;!this._processing&&"Enter"===t.key&&e.value&&(this._processText(e.value),e.value="",this._showSendButton=!1)}_handleInput(t){const e=t.target.value;e&&!this._showSendButton?this._showSendButton=!0:!e&&this._showSendButton&&(this._showSendButton=!1)}_handleSendMessage(){this._messageInput.value&&(this._processText(this._messageInput.value.trim()),this._messageInput.value="",this._showSendButton=!1)}_handleListeningButton(t){t.stopPropagation(),t.preventDefault(),this._toggleListening()}async _toggleListening(){var t;h.N.isSupported?null!==(t=this._audioRecorder)&&void 0!==t&&t.active?this._stopListening():this._startListening():this._showNotSupportedMessage()}_addMessage(t){this._conversation=[...this._conversation,t]}async _showNotSupportedMessage(){this._addMessage({who:"hass",text:(0,a.qy)(f||(f=k`${0} ${0}`),this.hass.localize("ui.dialogs.voice_command.not_supported_microphone_browser"),this.hass.localize("ui.dialogs.voice_command.not_supported_microphone_documentation",{documentation_link:(0,a.qy)(x||(x=k`<a target="_blank" rel="noopener noreferrer" href="${0}">${0}</a>`),(0,u.o)(this.hass,"/docs/configuration/securing/#remote-access"),this.hass.localize("ui.dialogs.voice_command.not_supported_microphone_documentation_link"))}))})}async _startListening(){this._unloadAudio(),this._processing=!0,this._audioRecorder||(this._audioRecorder=new h.N(t=>{this._audioBuffer?this._audioBuffer.push(t):this._sendAudioChunk(t)})),this._stt_binary_handler_id=void 0,this._audioBuffer=[];const t={who:"user",text:"…"};await this._audioRecorder.start(),this._addMessage(t);const e=this._createAddHassMessageProcessor();try{var s,i;const a=await(0,d.vU)(this.hass,s=>{if("run-start"===s.type)this._stt_binary_handler_id=s.data.runner_data.stt_binary_handler_id,this._audio=new Audio(s.data.tts_output.url),this._audio.play(),this._audio.addEventListener("ended",()=>{this._unloadAudio(),e.continueConversation&&this._startListening()}),this._audio.addEventListener("pause",this._unloadAudio),this._audio.addEventListener("canplaythrough",()=>{var t;return null===(t=this._audio)||void 0===t?void 0:t.play()}),this._audio.addEventListener("error",()=>{this._unloadAudio(),(0,c.showAlertDialog)(this,{title:"Error playing audio."})});else if("stt-start"===s.type&&this._audioBuffer){for(const t of this._audioBuffer)this._sendAudioChunk(t);this._audioBuffer=void 0}else"stt-end"===s.type?(this._stt_binary_handler_id=void 0,this._stopListening(),t.text=s.data.stt_output.text,this.requestUpdate("_conversation"),e.addMessage()):s.type.startsWith("intent-")?e.processEvent(s):"run-end"===s.type?(this._stt_binary_handler_id=void 0,a()):"error"===s.type&&(this._unloadAudio(),this._stt_binary_handler_id=void 0,"…"===t.text?(t.text=s.data.message,t.error=!0):e.setError(s.data.message),this._stopListening(),this.requestUpdate("_conversation"),a())},{start_stage:"stt",end_stage:null!==(s=this.pipeline)&&void 0!==s&&s.tts_engine?"tts":"intent",input:{sample_rate:this._audioRecorder.sampleRate},pipeline:null===(i=this.pipeline)||void 0===i?void 0:i.id,conversation_id:this._conversationId})}catch(a){await(0,c.showAlertDialog)(this,{title:"Error starting pipeline",text:a.message||a}),this._stopListening()}finally{this._processing=!1}}_stopListening(){var t;if(null===(t=this._audioRecorder)||void 0===t||t.stop(),this.requestUpdate("_audioRecorder"),this._stt_binary_handler_id){if(this._audioBuffer)for(const t of this._audioBuffer)this._sendAudioChunk(t);this._sendAudioChunk(new Int16Array),this._stt_binary_handler_id=void 0}this._audioBuffer=void 0}_sendAudioChunk(t){if(this.hass.connection.socket.binaryType="arraybuffer",null==this._stt_binary_handler_id)return;const e=new Uint8Array(1+2*t.length);e[0]=this._stt_binary_handler_id,e.set(new Uint8Array(t.buffer),1),this.hass.connection.socket.send(e)}async _processText(t){this._unloadAudio(),this._processing=!0,this._addMessage({who:"user",text:t});const e=this._createAddHassMessageProcessor();e.addMessage();try{var s;const i=await(0,d.vU)(this.hass,t=>{t.type.startsWith("intent-")&&e.processEvent(t),"intent-end"===t.type&&i(),"error"===t.type&&(e.setError(t.data.message),i())},{start_stage:"intent",input:{text:t},end_stage:"intent",pipeline:null===(s=this.pipeline)||void 0===s?void 0:s.id,conversation_id:this._conversationId})}catch(i){e.setError(this.hass.localize("ui.dialogs.voice_command.error"))}finally{this._processing=!1}}_createAddHassMessageProcessor(){let t="";const e=()=>{"…"!==i.hassMessage.text&&(i.hassMessage.text=i.hassMessage.text.substring(0,i.hassMessage.text.length-1),i.hassMessage={who:"hass",text:"…",error:!1},this._addMessage(i.hassMessage))},s={},i={continueConversation:!1,hassMessage:{who:"hass",text:"…",error:!1},addMessage:()=>{this._addMessage(i.hassMessage)},setError:t=>{e(),i.hassMessage.text=t,i.hassMessage.error=!0,this.requestUpdate("_conversation")},processEvent:a=>{if("intent-progress"===a.type&&a.data.chat_log_delta){const o=a.data.chat_log_delta;if(o.role&&(e(),t=o.role),"assistant"===t){if(o.content&&(i.hassMessage.text=i.hassMessage.text.substring(0,i.hassMessage.text.length-1)+o.content+"…",this.requestUpdate("_conversation")),o.tool_calls)for(const t of o.tool_calls)s[t.id]=t}else"tool_result"===t&&s[o.tool_call_id]&&delete s[o.tool_call_id]}else if("intent-end"===a.type){var o;this._conversationId=a.data.intent_output.conversation_id,i.continueConversation=a.data.intent_output.continue_conversation;const t=null===(o=a.data.intent_output.response.speech)||void 0===o?void 0:o.plain.speech;if(!t)return;"error"===a.data.intent_output.response.response_type?i.setError(t):(i.hassMessage.text=t,this.requestUpdate("_conversation"))}}};return i}constructor(...t){super(...t),this.disableSpeech=!1,this._conversation=[],this._showSendButton=!1,this._processing=!1,this._conversationId=null,this._unloadAudio=()=>{this._audio&&(this._audio.pause(),this._audio.removeAttribute("src"),this._audio=void 0)}}}M.styles=(0,a.AH)(w||(w=k`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    ha-alert {
      margin-bottom: 8px;
    }
    ha-textfield {
      display: block;
    }
    .messages {
      flex: 1;
      display: block;
      box-sizing: border-box;
      overflow-y: auto;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px 16px;
    }
    .spacer {
      flex: 1;
    }
    .message {
      font-size: var(--ha-font-size-l);
      clear: both;
      max-width: -webkit-fill-available;
      overflow-wrap: break-word;
      scroll-margin-top: 24px;
      margin: 8px 0;
      padding: 8px;
      border-radius: var(--ha-border-radius-xl);
    }
    @media all and (max-width: 450px), all and (max-height: 500px) {
      .message {
        font-size: var(--ha-font-size-l);
      }
    }
    .message.user {
      margin-left: 24px;
      margin-inline-start: 24px;
      margin-inline-end: initial;
      align-self: flex-end;
      border-bottom-right-radius: 0px;
      --markdown-link-color: var(--text-primary-color);
      background-color: var(--chat-background-color-user, var(--primary-color));
      color: var(--text-primary-color);
      direction: var(--direction);
    }
    .message.hass {
      margin-right: 24px;
      margin-inline-end: 24px;
      margin-inline-start: initial;
      align-self: flex-start;
      border-bottom-left-radius: 0px;
      background-color: var(
        --chat-background-color-hass,
        var(--secondary-background-color)
      );

      color: var(--primary-text-color);
      direction: var(--direction);
    }
    .message.error {
      background-color: var(--error-color);
      color: var(--text-primary-color);
    }
    ha-markdown {
      --markdown-image-border-radius: calc(var(--ha-border-radius-xl) / 2);
      --markdown-table-border-color: var(--divider-color);
      --markdown-code-background-color: var(--primary-background-color);
      --markdown-code-text-color: var(--primary-text-color);
      --markdown-list-indent: 1.15em;
      &:not(:has(ha-markdown-element)) {
        min-height: 1lh;
        min-width: 1lh;
        flex-shrink: 0;
      }
    }
    .bouncer {
      width: 48px;
      height: 48px;
      position: absolute;
    }
    .double-bounce1,
    .double-bounce2 {
      width: 48px;
      height: 48px;
      border-radius: var(--ha-border-radius-circle);
      background-color: var(--primary-color);
      opacity: 0.2;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-animation: sk-bounce 2s infinite ease-in-out;
      animation: sk-bounce 2s infinite ease-in-out;
    }
    .double-bounce2 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    @-webkit-keyframes sk-bounce {
      0%,
      100% {
        -webkit-transform: scale(0);
      }
      50% {
        -webkit-transform: scale(1);
      }
    }
    @keyframes sk-bounce {
      0%,
      100% {
        transform: scale(0);
        -webkit-transform: scale(0);
      }
      50% {
        transform: scale(1);
        -webkit-transform: scale(1);
      }
    }

    .listening-icon {
      position: relative;
      color: var(--secondary-text-color);
      margin-right: -24px;
      margin-inline-end: -24px;
      margin-inline-start: initial;
      direction: var(--direction);
      transform: scaleX(var(--scale-direction));
    }

    .listening-icon[active] {
      color: var(--primary-color);
    }

    .unsupported {
      color: var(--error-color);
      position: absolute;
      --mdc-icon-size: 16px;
      right: 5px;
      inset-inline-end: 5px;
      inset-inline-start: initial;
      top: 0px;
    }
  `)),(0,i.Cg)([(0,o.MZ)({attribute:!1})],M.prototype,"hass",void 0),(0,i.Cg)([(0,o.MZ)({attribute:!1})],M.prototype,"pipeline",void 0),(0,i.Cg)([(0,o.MZ)({type:Boolean,attribute:"disable-speech"})],M.prototype,"disableSpeech",void 0),(0,i.Cg)([(0,o.MZ)({type:Boolean,attribute:!1})],M.prototype,"startListening",void 0),(0,i.Cg)([(0,o.P)("#message-input")],M.prototype,"_messageInput",void 0),(0,i.Cg)([(0,o.P)(".message:last-child")],M.prototype,"_lastChatMessage",void 0),(0,i.Cg)([(0,o.P)(".message:last-child img:last-of-type")],M.prototype,"_lastChatMessageImage",void 0),(0,i.Cg)([(0,o.wk)()],M.prototype,"_conversation",void 0),(0,i.Cg)([(0,o.wk)()],M.prototype,"_showSendButton",void 0),(0,i.Cg)([(0,o.wk)()],M.prototype,"_processing",void 0),M=(0,i.Cg)([(0,o.EM)("ha-assist-chat")],M)},88433:function(t,e,s){s.d(e,{RW:function(){return n},ZE:function(){return a},e1:function(){return r},vc:function(){return o}});var i=s(44537),a=function(t){return t[t.CONTROL=1]="CONTROL",t}({});const o=(t,e,s)=>t.callWS({type:"conversation/agent/list",language:e,country:s}),n=(t,e,s,a)=>t.callWS({type:"conversation/agent/homeassistant/debug",sentences:(0,i.e)(e),language:s,device_id:a}),r=(t,e,s)=>t.callWS({type:"conversation/agent/homeassistant/language_scores",language:e,country:s})},74209:function(t,e,s){s.d(e,{N:function(){return i}});s(3362),s(62953),s(3296),s(27208),s(48408),s(14603),s(47566),s(98721);class i{get active(){return this._active}get sampleRate(){var t;return null===(t=this._context)||void 0===t?void 0:t.sampleRate}static get isSupported(){return window.isSecureContext&&(window.AudioContext||window.webkitAudioContext)}async start(){if(this._context&&this._stream&&this._source&&this._recorder)this._stream.getTracks()[0].enabled=!0,await this._context.resume(),this._active=!0;else try{await this._createContext()}catch(t){console.error(t),this._active=!1}}async stop(){var t;this._active=!1,this._stream&&(this._stream.getTracks()[0].enabled=!1),await(null===(t=this._context)||void 0===t?void 0:t.suspend())}close(){var t,e,s;this._active=!1,null===(t=this._stream)||void 0===t||t.getTracks()[0].stop(),this._recorder&&(this._recorder.port.onmessage=null),null===(e=this._source)||void 0===e||e.disconnect(),null===(s=this._context)||void 0===s||s.close(),this._stream=void 0,this._source=void 0,this._recorder=void 0,this._context=void 0}async _createContext(){const t=new(AudioContext||webkitAudioContext);this._stream=await navigator.mediaDevices.getUserMedia({audio:!0}),await t.audioWorklet.addModule(new URL(s.p+s.u("33921"),s.b)),this._context=t,this._source=this._context.createMediaStreamSource(this._stream),this._recorder=new AudioWorkletNode(this._context,"recorder-worklet"),this._recorder.port.onmessage=t=>{this._active&&this._callback(t.data)},this._active=!0,this._source.connect(this._recorder)}constructor(t){this._active=!1,this._callback=t}}}}]);
//# sourceMappingURL=28845.0208d4ee6aefc5b3.js.map