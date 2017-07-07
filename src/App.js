import React, { Component } from 'react';
import PCHeader from './pc_header';
import MediaQuery from 'react-responsive';
import PCIndex from './pc_index'
import MobileIndex from './mobile_index';
// import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <PCIndex/>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <MobileIndex/>
        </MediaQuery>
      </div>
    );
  }
}

export default App;
