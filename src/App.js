import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import PCIndex from './pc_index'
import MobileIndex from './mobile_index';
import {HashRouter  as Router, Route} from 'react-router-dom';
import PCDetail from './pc_detail';
import MobileDetail from './mobile_detail';
import PCUserCenter from './pc_usercenter';
import MobileUsercenter from './mobile_usercenter';
// import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
            <Router>
                <div>
                    <Route exat path='/' component={PCIndex}/>
                    <Route path='/details/:uniquekey' component={PCDetail}/>
                    <Route path='/usercenter' component={PCUserCenter}/>
                </div>
            </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
            <Router>
                <div>
                    <Route exact path='/' component={MobileIndex}/>
                    <Route path='/details/:uniquekey' component={MobileDetail}/>
                    <Route path='/usercenter' component={MobileUsercenter}/>
                </div>
            </Router>
        </MediaQuery>
      </div>
    );
  }
}

export default App;
