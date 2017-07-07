import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import AV from 'leancloud-storage';
import PCNewsContainer from './pc_newscontainer';


var APP_ID = 'FF1cgfabDsGX0rlwnKRcv760-gzGzoHsz';
var APP_KEY = 'JWUyEMBACCRrt9lb0lnQQnXa';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default class PCIndex extends React.Component {
    render() {
        return (
            <div>
                <PCHeader/>
                <PCNewsContainer/>
                <PCFooter/>
            </div>
        )
    }
}