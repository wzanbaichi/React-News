import React from 'react';
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Card,
    Modal,
} from 'antd';
import AV from 'leancloud-storage';

const FormItem = Form.Item;


class Comments extends React.Component {

    constructor() {
        super();
        this.state = {
            comments: [],
            commentsCache: '',
            collected:false,
            collectBtnInfo:'收藏文章'
        }
        //this.props.uniquekey
    };

    componentWillMount() {
        let uniquekey = this.props.uniquekey.toString();
        // let CommentsList = AV.Object.extend('key' + uniquekey);    //初始化评论数据
        let query = new AV.Query('key' + uniquekey);
        let _this = this;

        //如果已经收藏过文章，则禁用收藏按钮
        if(AV.User.current()){
            let collectQuery = new AV.Query(AV.User.current().attributes.username+'collect');
            collectQuery.include('articleId');
            collectQuery.descending('createdAt');
            collectQuery.find().then(function (data) {
                data.forEach(function (e) {
                    if(e.attributes.articleId === uniquekey){
                        _this.setState({
                            collected: true,
                            collectBtnInfo: '您已收藏过该文章了'
                        })
                    }
                });
            }).catch(function (error) {

            });
        }


        query.include('owner');
        query.include('content');
        query.descending('createdAt');
        query.find().then(function (data) {
            _this.setState({comments: data});
        }).catch(function (error) {

        });
    };


    render() {
        let {getFieldDecorator} = this.props.form;
        const comments = this.state.comments;
        let commentsList = comments.length ? comments.map((commits, index) =>
                <div className='comments_list' key={index}>
                    <div className='comments_header'>{commits.attributes.owner.attributes.username}
                        <span className='comments_date'>发布于 {commits.attributes.date}</span>
                    </div>
                    <div className='comments_content'>{commits.attributes.content}</div>
                </div>
            )
                : "暂时还没有评论，快来抢沙发吧！ヾ(◍°∇°◍)ﾉﾞ"
        ;
        return (
            <div className='comments'>
                <Row>
                    <Col span={24}>
                        <Card title='评论'>
                            {commentsList}
                        </Card>
                        <Form onSubmit={this.handelSubmit.bind(this)}>
                            <FormItem label='您的评论'>
                                {getFieldDecorator('remark', {initialValue: ''})(
                                    <Input className='comments_input' type='textarea' placeholder='请输入您的评论'/>
                                )}
                            </FormItem>
                            <div className='comments_collect'>
                                <Button htmlType='submit'>提交评论</Button>
                                &nbsp;&nbsp;
                                <Button htmlType='button' disabled={this.state.collected} onClick={this.collect.bind(this)}>{this.state.collectBtnInfo}</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        );

    };

    warning() {
        Modal.warning({
            title: '请登录',
            content: (
                <div>
                    <p className='unlogin_warning'>请先登录后再操作!</p>
                </div>
            ),
        });
    };

    // saveComments(content, owner, date, callback) {
    //     let uniquekey = this.props.uniquekey.toString();
    //     let CommitsList = AV.Object.extend('key' + uniquekey);
    //     let commitsList = new CommitsList();
    //     let _this = this;
    //     commitsList.set('content', content);
    //     commitsList.set('owner', owner);
    //     commitsList.set('date', date)
    //     commitsList.save().then(function () {
    //         callback;
    //     }, function () {
    //     })
    // };

    handelSubmit(e) {
        e.preventDefault();
        let uniquekey = this.props.uniquekey.toString();
        let formDate = this.props.form.getFieldsValue();
        let _this = this;
        // this.saveComments(formDate.remark,AV.User.current(),new Date().toLocaleString(),this.componentWillMount());
        if (AV.User.current() === null){
            return this.warning()
        }else{
            let CollectList = AV.Object.extend(AV.User.current().attributes.username+'comments');
            let collectList = new CollectList();
            collectList.set('commentsId',uniquekey);
            collectList.set('comments',formDate.remark);
            collectList.set('title',this.props.title);
            collectList.set('date',new Date().toLocaleString())
            collectList.set('collectedDate',new Date().toLocaleString());
            collectList.save().then(function () {
            }, function () {
            })
        }

        //提交评论数据到数据库

        if (AV.User.current() === null)return this.warning()
        let CommitsList = AV.Object.extend('key' + uniquekey);
        let commitsList = new CommitsList();
        commitsList.set('content', formDate.remark);
        commitsList.set('owner', AV.User.current());
        commitsList.set('date', new Date().toLocaleString())
        commitsList.save().then(function () {
            _this.componentWillMount();
        }, function () {
        })
        this.props.form.setFieldsValue({remark: ''})
    };

    collect(){
        if (AV.User.current() === null)return this.warning()
        let CollectList = AV.Object.extend(AV.User.current().attributes.username+'collect');
        let collectList = new CollectList();
        let uniquekey = this.props.uniquekey.toString();
        let _this = this;
        if (AV.User.current() === null)return this.warning()
        collectList.set('articleId',uniquekey);
        collectList.set('title',this.props.title);
        collectList.set('date',new Date().toLocaleString());
        collectList.set('collectedDate',new Date().toLocaleString());
        collectList.save().then(function () {
            _this.setState({
                collected:true,
                collectBtnInfo:"您已收藏过该文章了"
            })
        }, function () {

        })
    }
}

export default Comments = Form.create()(Comments);