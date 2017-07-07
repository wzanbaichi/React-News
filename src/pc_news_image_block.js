import React from 'react';
import {Card} from 'antd';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class PCImagesBlock extends React.Component {
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
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, {method: 'GET'}).then(
            response => (response.json())
        ).then(json => this.setState({news: json}))
    };


    render() {
        const imageStyle = {
            display: 'block',
            width: this.props.imageWidth,
            height: this.props.imageHeight
        };
        const h3Style = {
            width: this.props.imageWidth,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };
        const news = this.state.news;
        const newList = news.length ?
            news.map((newsItem, index) =>
                <div key={index} className='image_block'>
                    <div className='image_wrap'>
                        <img src={newsItem.thumbnail_pic_s} style={imageStyle}/>
                    </div>
                    <div className='image_detail'>
                        <h3 style={h3Style}>{newsItem.title}</h3>
                        <p>{newsItem.author_name}</p>
                    </div>
                </div>
            )
            :
            "没有加载到新闻"
        return (
            <div>
                <Card className='image_card' title={this.props.cartTitle} bordered={true} style={{
                    width: this.props.width
                }}>
                    {newList}
                </Card>
            </div>
        );
    };
}