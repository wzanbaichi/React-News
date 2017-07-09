import React from 'react';
import {Row, Col, BackTop} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_comments';


export default class MobileDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: ''
        };
    };

    componentWillMount() {
        let uniquekey = this.props.match.params.uniquekey;
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({newsItem: json});
            document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
        })
    };

    createMarkup() {
        return {__html: this.state.newsItem.pagecontent};
    };

    render() {
        return (
            <div>
                <MobileHeader/>
                <Row className='mobile_article_wrap'>
                    <Col span={2}></Col>
                    <Col span={20} className='mobile_detail_container'>
                        <div className="mobile_articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                    <Col span={2}><BackTop/></Col>
                </Row>
                <MobileFooter/>
            </div>
        )
    }
}