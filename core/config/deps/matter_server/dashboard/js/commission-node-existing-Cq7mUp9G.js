import{_ as i,c as e,a as t,n as o,r as d,e as s,t as n,s as r,x as a,T as l}from"./matter-dashboard-app-BG9E_Nxv.js";import"./outlined-text-field-DMC3zyTK.js";import{f as m}from"./fire_event-3RWMUKjQ.js";import"./prevent_default--7eNqPmY.js";let c=class extends r{constructor(){super(...arguments),this._loading=!1}render(){return a`<md-outlined-text-field label="Share code" .disabled="${this._loading}">
      </md-outlined-text-field>
      <br />
      <br />
      <md-outlined-button @click=${this._commissionNode} .disabled="${this._loading}"
        >Commission</md-outlined-button
      >${this._loading?a`<md-circular-progress indeterminate></md-circular-progress>`:l}`}async _commissionNode(){this._loading=!0;try{const i=await this.client.commissionWithCode(this._pairingCodeField.value,!0);m(this,"node-commissioned",i)}catch(i){alert(`Error commissioning node: ${i.message}`)}finally{this._loading=!1}}};i([e({context:t,subscribe:!0}),o({attribute:!1})],c.prototype,"client",void 0),i([d()],c.prototype,"_loading",void 0),i([s("md-outlined-text-field[label='Share code']")],c.prototype,"_pairingCodeField",void 0),c=i([n("commission-node-existing")],c);export{c as CommissionNodeExisting};
