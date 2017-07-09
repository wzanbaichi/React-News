import React from 'react';

import {
    Row,
    Col,
    Tabs,
    Card
} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import {Link} from 'react-router-dom';
import AV from 'leancloud-storage';
const TabPane = Tabs.TabPane;


export default class PCUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            collectList: '',
            commentsList: '',
        }
    };

    componentWillMount() {
        //加载收藏文章数据
        let collectQuery = new AV.Query(AV.User.current().attributes.username+'collect');
        let _this = this;
        collectQuery.include('articleId');
        collectQuery.include('title');
        collectQuery.descending('createdAt');
        collectQuery.find().then(function (data) {
            _this.setState({collectList: data});
        }).catch(function (error) {

        });
        //加载评论数据
        let commentsQuery = new AV.Query(AV.User.current().attributes.username+'comments');
        commentsQuery.include('comments');
        commentsQuery.include('commentsId');
        commentsQuery.find().then(function (data) {
            _this.setState({commentsList: data});
            console.log(data);
        }).catch(function (error) {

        });

    }

    render() {
        const collect = this.state.collectList;
        let collectList = collect.length ? collect.map((items, index) =>
            <div key={index} className='usercenter_collectList'>
                <Link to={`/details/${items.attributes.articleId}`}>
                    <p>{items.attributes.title}<span className='usercenter_collect_date'>收藏于 {items.attributes.date}</span></p>
                </Link>
            </div>
        )
            :
            '还没收藏过文章呢，快去收藏一篇吧ヾ(◍°∇°◍)ﾉﾞ';
        const comments = this.state.commentsList;
        let commentsList = comments.length?comments.map((items,index)=>
            <div key={index} className='usercenter_commentsList'>
                <Link to={`/details/${items.attributes.commentsId}`}>
                    <p>{items.attributes.comments}<span className='usercenter_comments_date'>评论于 {items.attributes.date}</span></p>
                </Link>
            </div>
        )
            :
            '还没评论过任何文章呢，快去分享你的评论吧ヾ(◍°∇°◍)ﾉﾞ';

        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16} className='usercenter_content'>
                        <Tabs tabPosition='left'>
                            <TabPane key='1' tab='收藏列表'>
                                <Card>
                                    {collectList}
                                </Card>
                            </TabPane>
                            <TabPane key='2' tab='评论列表'>
                                <Card>
                                    {commentsList}
                                </Card>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={4}></Col>
                </Row>
                <PCFooter/>
            </div>
        )
    };

}
