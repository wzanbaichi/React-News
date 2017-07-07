import React from 'react';
import { Row, Col } from 'antd';






export default class MobileFooter extends React.Component{

    render(){
        return(
            <div id='mobile_footer'>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        &copy;&nbsp;2017 Chenkang Liang. All Rights Reserved.
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        )
    }
}
