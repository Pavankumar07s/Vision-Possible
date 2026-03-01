import{_ as i,c as e,a as t,n as d,r as s,e as o,t as l,s as r,x as n,T as a}from"./matter-dashboard-app-BG9E_Nxv.js";import"./outlined-text-field-DMC3zyTK.js";import{f as m}from"./fire_event-3RWMUKjQ.js";import"./prevent_default--7eNqPmY.js";let c=class extends r{constructor(){super(...arguments),this._loading=!1}render(){return this.client.serverInfo.wifi_credentials_set?n`<md-outlined-text-field label="Pairing code" .disabled="${this._loading}">
      </md-outlined-text-field>
      <br />
      <br />
      <md-outlined-button @click=${this._commissionNode} .disabled="${this._loading}"
        >Commission</md-outlined-button
      >${this._loading?n`<md-circular-progress indeterminate></md-circular-progress>`:a}`:n`<md-outlined-text-field label="SSID" .disabled="${this._loading}">
        </md-outlined-text-field>
        <md-outlined-text-field label="Password" type="password" .disabled="${this._loading}">
        </md-outlined-text-field>
        <br />
        <br />
        <md-outlined-button @click=${this._setWifiCredentials} .disabled="${this._loading}"
          >Set WiFi Credentials</md-outlined-button
        >${this._loading?n`<md-circular-progress indeterminate .visible="${this._loading}"></md-circular-progress>`:a}`}_setWifiCredentials(){const i=this._ssidField.value;if(!i)return void alert("SSID is required");const e=this._passwordField.value;if(e){this._loading=!0;try{this.client.setWifiCredentials(i,e)}catch(i){alert(`Error setting WiFi credentials: \n${i.message}`)}finally{this._loading=!1}}else alert("Password is required")}async _commissionNode(){try{if(!this._pairingCodeField.value)return void alert("Pairing code is required");this._loading=!0;const i=await this.client.commissionWithCode(this._pairingCodeField.value,!1);m(this,"node-commissioned",i)}catch(i){alert(`Error commissioning node: \n${i.message}`)}finally{this._loading=!1}}};i([e({context:t,subscribe:!0}),d({attribute:!1})],c.prototype,"client",void 0),i([s()],c.prototype,"_loading",void 0),i([o("md-outlined-text-field[label='SSID']")],c.prototype,"_ssidField",void 0),i([o("md-outlined-text-field[label='Password']")],c.prototype,"_passwordField",void 0),i([o("md-outlined-text-field[label='Pairing code']")],c.prototype,"_pairingCodeField",void 0),c=i([l("commission-node-wifi")],c);export{c as CommissionNodeWifi};
