import{_ as t,c as e,a as i,n as d,r as a,e as s,t as o,s as r,x as l,T as n}from"./matter-dashboard-app-BG9E_Nxv.js";import"./outlined-text-field-DMC3zyTK.js";import{f as m}from"./fire_event-3RWMUKjQ.js";import"./prevent_default--7eNqPmY.js";let c=class extends r{constructor(){super(...arguments),this._loading=!1}render(){return this.client.serverInfo.thread_credentials_set?l`<md-outlined-text-field label="Pairing code" .disabled="${this._loading}">
      </md-outlined-text-field>
      <br />
      <br />
      <md-outlined-button @click=${this._commissionNode} .disabled="${this._loading}"
        >Commission</md-outlined-button
      >${this._loading?l`<md-circular-progress indeterminate></md-circular-progress>`:n}`:l`<md-outlined-text-field label="Thread dataset" .disabled="${this._loading}">
        </md-outlined-text-field>
        <br />
        <br />
        <md-outlined-button @click=${this._setThreadDataset} .disabled="${this._loading}"
          >Set Thread Dataset</md-outlined-button
        >${this._loading?l`<md-circular-progress indeterminate></md-circular-progress>`:n}`}async _setThreadDataset(){const t=this._datasetField.value;if(t){this._loading=!0;try{await this.client.setThreadOperationalDataset(t)}catch(t){alert(`Error setting Thread dataset: ${t.message}`)}finally{this._loading=!1}}else alert("Dataset is required")}async _commissionNode(){this._loading=!0;try{const t=await this.client.commissionWithCode(this._pairingCodeField.value,!1);m(this,"node-commissioned",t)}catch(t){alert(`Error commissioning node: ${t.message}`)}finally{this._loading=!1}}};t([e({context:i,subscribe:!0}),d({attribute:!1})],c.prototype,"client",void 0),t([a()],c.prototype,"_loading",void 0),t([s("md-outlined-text-field[label='Thread dataset']")],c.prototype,"_datasetField",void 0),t([s("md-outlined-text-field[label='Pairing code']")],c.prototype,"_pairingCodeField",void 0),c=t([o("commission-node-thread")],c);export{c as CommissionNodeThread};
