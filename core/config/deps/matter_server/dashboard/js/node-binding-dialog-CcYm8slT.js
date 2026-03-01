import{i as t,_ as e,c as i,a as n,n as d,e as r,t as o,s,x as a,T as l}from"./matter-dashboard-app-BG9E_Nxv.js";import{p as c}from"./prevent_default--7eNqPmY.js";import"./outlined-text-field-DMC3zyTK.js";class p{static transform(t){if(!t||"object"!=typeof t)throw new Error("Invalid input: expected an object");const e={},i=p.KEY_MAPPING;for(const n in t)if(n in i){const d=i[n];if(d){const i=t[n];if(void 0===i)continue;e[d]="fabricIndex"===d?void 0===i?void 0:Number(i):"node"===d||"endpoint"===d?Number(i):i}}return e}}p.KEY_MAPPING={1:"node",3:"endpoint",4:"cluster",254:"fabricIndex"};class u{static transform(t){if(!t||"object"!=typeof t)throw new Error("Invalid input: expected an object");const e={},i=u.KEY_MAPPING;for(const n in t)if(n in i){const d=i[n];if(d){const i=t[n];if(void 0===i)continue;e[d]=i}}return e}}u.KEY_MAPPING={0:"cluster",1:"endpoint",2:"deviceType"};class h{static transform(t){if(!t||"object"!=typeof t)throw new Error("Invalid input: expected an object");const e={},i=h.KEY_MAPPING;for(const n in t)if(n in i){const d=i[n];if(d){const i=t[n];if(void 0===i)continue;if("subjects"===d)e[d]=Array.isArray(i)?i:void 0;else if("targets"===d)if(Array.isArray(i)){const t=Object.values(i).map((t=>u.transform(t)));e[d]=t}else e[d]=void 0;else e[d]=i}}return e}}h.KEY_MAPPING={1:"privilege",2:"authMode",3:"subjects",4:"targets",254:"fabricIndex"};let v=class extends s{fetchBindingEntry(){const t=this.node.attributes[this.endpoint+"/30/0"];return Object.values(t).map((t=>p.transform(t)))}fetchACLEntry(t){const e=this.client.nodes[t].attributes["0/31/0"];return Object.values(e).map((t=>h.transform(t)))}async deleteBindingHandler(t){const e=this.fetchBindingEntry();try{const i=e[t].node,n=e[t].endpoint;await this.removeNodeAtACLEntry(this.node.node_id,n,i);const d=this.removeBindingAtIndex(e,t);await this.syncBindingUpdates(d,t)}catch(t){this.handleBindingDeletionError(t)}}async removeNodeAtACLEntry(t,e,i){const n=this.fetchACLEntry(i).map((i=>this.removeEntryAtACL(t,e,i))).filter((t=>null!==t));await this.client.setACLEntry(i,n)}removeEntryAtACL(t,e,i){if(!i.subjects.includes(t))return i;return i.targets.filter((t=>t.endpoint===e)).length>0?void 0:i}removeBindingAtIndex(t,e){return[...t.slice(0,e),...t.slice(e+1)]}async syncBindingUpdates(t,e){await this.client.setNodeBinding(this.node.node_id,this.endpoint,t);const i=`${this.endpoint}/30/0`,n={...this.node.attributes,[i]:this.removeBindingAtIndex(this.node.attributes[i],e)};this.node.attributes=n,this.requestUpdate()}handleBindingDeletionError(t){const e=t instanceof Error?t.message:String(t);console.error(`Binding deletion failed: ${e}`)}async _updateEntry(t,e,i,n,d){try{const r=this.client.nodes[t].attributes[e],o=Object.values(r).map(n);return o.push(i),await d(t,o)}catch(t){console.log(t)}}async add_target_acl(t,e){try{return 0===(await this._updateEntry(t,"0/31/0",e,h.transform,this.client.setACLEntry.bind(this.client)))[0].Status}catch(t){return console.error("add acl error:",t),!1}}async add_bindings(t,e){const i=this.fetchBindingEntry();i.push(e);try{return 0===(await this.client.setNodeBinding(this.node.node_id,t,i))[0].Status}catch(t){return console.log("add bindings error:",t),!1}}async addBindingHandler(){const t=this._targetNodeId.value?parseInt(this._targetNodeId.value,10):void 0,e=this._targetEndpoint.value?parseInt(this._targetEndpoint.value,10):void 0,i=this._targetCluster.value?parseInt(this._targetCluster.value,10):void 0;if(void 0===t||t<=0||t>65535)return void alert("Please enter a valid target node ID");if(void 0===e||e<=0||e>65534)return void alert("Please enter a valid target endpoint");if(void 0!==i&&(i<0||i>32767))return void alert("Please enter a valid target cluster");const n={endpoint:e,cluster:i,deviceType:void 0},d={privilege:5,authMode:2,subjects:[this.node.node_id],targets:[n],fabricIndex:this.client.connection.serverInfo.fabric_id};if(!await this.add_target_acl(t,d))return void alert("add target acl error!");const r=this.endpoint,o={node:t,endpoint:e,group:void 0,cluster:i,fabricIndex:this.client.connection.serverInfo.fabric_id};await this.add_bindings(r,o)&&(this._targetNodeId.value="",this._targetEndpoint.value="",this._targetCluster.value="",this.requestUpdate())}_close(){this.shadowRoot.querySelector("md-dialog").close()}_handleClosed(){this.parentNode.removeChild(this)}onChange(t){const e=t.target,i=parseInt(e.value,10);parseInt(e.max,10)<i||i<parseInt(e.min,10)?(e.error=!0,e.errorText="value error"):e.error=!1}render(){const t=Object.values(this.node.attributes[this.endpoint+"/30/0"]).map((t=>p.transform(t)));return a`
      <md-dialog open @cancel=${c} @closed=${this._handleClosed}>
        <div slot="headline">
          <div>Binding</div>
        </div>
        <div slot="content">
          <div>
            <md-list style="padding-bottom:18px;">
              ${Object.values(t).map(((t,e)=>a`
                  <md-list-item style="background:cornsilk;">
                    <div style="display:flex;gap:10px;">
                        <div>node:${t.node}</div>
                        <div>endpoint:${t.endpoint}</div>
                        ${t.cluster?a` <div>cluster:${t.cluster}</div> `:l}
                    </div>
                    <div slot="end">
                      <md-text-button
                        @click=${()=>this.deleteBindingHandler(e)}
                      >delete</md-text-button
                    </div>
                  </md-list-item>
                `))}
            </md-list>
            <div class="inline-group">
              <div class="group-label">target</div>
              <div class="group-input">
                <md-outlined-text-field
                  label="node id"
                  name="NodeId"
                  type="number"
                  min="0"
                  max="65535"
                  class="target-item"
                  @change=${this.onChange}
                  supporting-text="required"
                ></md-outlined-text-field>
                <md-outlined-text-field
                  label="endpoint"
                  name="Endpoint"
                  type="number"
                  min="0"
                  max="65534"
                  @change=${this.onChange}
                  class="target-item"
                  supporting-text="required"
                ></md-outlined-text-field>
                <md-outlined-text-field
                  label="cluster"
                  name="Cluster"
                  type="number"
                  min="0"
                  max="32767"
                  @change=${this.onChange}
                  class="target-item"
                  supporting-text="optional"
                ></md-outlined-text-field>
              </div>
            </div>
            <div style="margin:8px;">
              <Text
                style="font-size: 10px;font-style: italic;font-weight: bold;"
              >
                Note: The Cluster ID field is optional according to the Matter
                specification. If you leave it blank, the binding applies to all
                eligible clusters on the target endpoint. However, some devices
                may require a specific cluster to be set in order for the
                binding to function correctly. If you experience unexpected
                behavior, try specifying the cluster explicitly.
              </Text>
            </div>
          </div>
        </div>
        <div slot="actions">
          <md-text-button @click=${this.addBindingHandler}>Add</md-text-button>
          <md-text-button @click=${this._close}>Cancel</md-text-button>
        </div>
      </md-dialog>
    `}};v.styles=t`
    .inline-group {
      display: flex;
      border: 2px solid #673ab7;
      padding: 1px;
      border-radius: 8px;
      position: relative;
      margin: 8px;
    }

    .group-input {
      display: flex;
      width: -webkit-fill-available;
    }

    .target-item {
      display: inline-block;
      padding: 20px 10px 10px 10px;
      border-radius: 4px;
      vertical-align: middle;
      min-width: 80px;
      text-align: center;
      width: -webkit-fill-available;
    }

    .group-label {
      position: absolute;
      left: 15px;
      top: -12px;
      background: #673ab7;
      color: white;
      padding: 3px 15px;
      border-radius: 4px;
    }
  `,e([i({context:n,subscribe:!0}),d({attribute:!1})],v.prototype,"client",void 0),e([d()],v.prototype,"node",void 0),e([d({attribute:!1})],v.prototype,"endpoint",void 0),e([r("md-outlined-text-field[name='NodeId']")],v.prototype,"_targetNodeId",void 0),e([r("md-outlined-text-field[name='Endpoint']")],v.prototype,"_targetEndpoint",void 0),e([r("md-outlined-text-field[name='Cluster']")],v.prototype,"_targetCluster",void 0),v=e([o("node-binding-dialog")],v);export{v as NodeBindingDialog};
