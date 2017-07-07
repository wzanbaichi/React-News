import React from 'react';
import {Card} from 'antd';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class PCNewsBlock extends React.Component {
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
                <li key={index}>
                    {newsItem.title}
                </li>
            )
            :
            "没有加载到新闻"
        return (
            <div className='top_new_list'>
                <Card className='top_new_list_container'>
                    <ul>
                        {newList}
                    </ul>
                </Card>
            </div>
        );
    };
}