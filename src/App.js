import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import PCIndex from './pc_index'
import MobileIndex from './mobile_index';
import {BrowserRouter  as Router, Route} from 'react-router-dom';
import PCDetail from './pc_detail';
import MobileDetail from './mobile_detail';
// import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
            <Router>
                <div>
                    <Route exact path='/https://wzanbaichi.github.io/React-News/build/index.html' component={PCIndex}/>
                    <Route path='https://wzanbaichi.github.io/React-News/build/index.html/details/:uniquekey' component={PCDetail}/>
                </div>
            </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
            <Router>
                <div>
                    <Route exact path='/' component={MobileIndex}/>
                    <Route path='/details/:uniquekey' component={MobileDetail}/>
                </div>
            </Router>
        </MediaQuery>
      </div>
    );
  }
}

export default App;
