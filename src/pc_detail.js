import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCImageBlock from './pc_news_image_block';
import Comments from './common_comments';


export default class PCDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: '',
            checkLogin: false,
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
                <PCHeader/>
                <Row className='article_wrap'>
                    <Col span={4}></Col>
                    <Col span={11} className='detail_container'>
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <Comments uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={4}>
                        <PCImageBlock type='top' count='20' cartTitle='相关新闻' imageWidth='123px' width="100%"/>
                    </Col>
                    <Col span={4}></Col>
                </Row>
                <PCFooter/>
                <BackTop/>
            </div>
        )
    };
};
