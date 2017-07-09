import React from 'react';
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom';


export default class MobileList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: '',
        };
    };

    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(
            response => (response.json())
        ).then(json => this.setState({news: json}))
    };


    render() {
        const news = this.state.news;
        const newList = news.length ?
            news.map((newsItem, index) =>
                (
                    <section key={index} className='mobile_list clearfix '>
                        <Link to={`/details/${newsItem.uniquekey}`}>
                        <div className='list_img'>
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                        </div>
                        <div className='list_info'>
                            <div className='list_info_title'>
                                <span>{newsItem.title}</span>
                            </div>
                            <div className='list_desc clearfix'>
                                <div className='list_desc_l'>
                                    <span className='list_info_channel'>{newsItem.realtype}</span>
                                    <span className='list_info_time'>{newsItem.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    </section>
                )
            )
            :
            "没有加载到新闻"
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        {newList}
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}