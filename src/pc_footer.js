import React from 'react';
import { Row, Col } from 'antd';
import './pc.css';
import './mobile.css';





export default class PCFooter extends React.Component{

    render(){
        return(
            <div className='pc_footer'>
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
