/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import styled from 'styled-components';
import { connect } from './../nuclear';
import InputSearch from './../InputSearch';
import userAclGetters from 'app/flux/userAcl/getters';
import nodeGetters from 'app/flux/nodes/getters';
import { getters as sshHistoryGetters } from 'app/flux/sshHistory/store';
import NodeList from './NodeList'

export class ClusterNodes extends React.Component {

  state = {
    filter: ''
  }

  onFilterChange = value => {
    this.state.filter = value;
    this.setState(this.state);
  }

  render() {
    const {
      nodes,
      sshHistory,
      aclStore,
      sites,
      siteId,
      storage
    } = this.props;
    const logins = aclStore.getSshLogins().toJS();
    const nodeRecords = nodes.toJS();
    const filter = this.state.filter;

    return (
      <div>
        <Header>
          <h1>Nodes</h1>
          <InputSearch value={filter} onChange={this.onFilterChange} />
        </Header>
        <NodeList
          searchValue={filter}
          sshHistory={sshHistory}
          storage={storage}
          siteId={siteId}
          sites={sites}
          nodeRecords={nodeRecords}
          logins={logins}
        />
      </div>
    );
  }
}

const Header = styled.header`
  height: 40px;
  margin: 40px 0;

  &::after {
    content: "";
    clear: both;
    display: table;
  }

  h1 {
    font-size: 36px;
    font-weight: 300;
    float: left;
    line-height: 40px;
    margin: 0 40px 0 0;
  }
`;

function mapStoreToProps(props) {
  const { clusterId } = props;
  return {
    nodes: nodeGetters.nodesByCluster(clusterId),
    aclStore: userAclGetters.userAcl,
    sshHistory: sshHistoryGetters.store
  }
}

export default connect(mapStoreToProps)(ClusterNodes);