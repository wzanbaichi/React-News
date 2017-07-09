import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {
    Row,
    Col,
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Card,
    Modal,
} from 'antd';
import AV from 'leancloud-storage';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class Comments extends React.Component {

    constructor() {
        super();
        this.state = {
            comments: [],
            commentsCache:''
        }
        //this.props.uniquekey
    };

    componentWillMount() {
        let uniquekey = this.props.uniquekey.toString();
        let CommentsList = AV.Object.extend('key' + uniquekey);    //初始化评论数据
        let commentsList = new CommentsList;
        let query = new AV.Query('key' + uniquekey);
        let _this = this;
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
                    <div className='comments_header'>{commits.attributes.owner.attributes.username}<span className='comments_date'>发布于 {commits.attributes.date}</span></div>
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
                                    <Input className='comments_input' type = 'textarea' placeholder='请输入您的评论'/>
                                )}
                            </FormItem>
                            <Button htmlType='submit'>提交评论</Button>
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
                <p className='unlogin_warning'>请先登录后再发布评论!</p>
            </div>
        ),
    });
}

    saveComments(content,owner,date,callback){
        let uniquekey = this.props.uniquekey.toString();
        let CommitsList = AV.Object.extend('key' + uniquekey);
        let commitsList = new CommitsList();
        let _this = this;
        commitsList.set('content', content);
        commitsList.set('owner', owner);
        commitsList.set('date',date)
        commitsList.save().then(function () {
            callback;
        }, function () {
        })
    }

    handelSubmit(e) {
        e.preventDefault();
        let uniquekey = this.props.uniquekey.toString();
        let formDate = this.props.form.getFieldsValue();
        // this.saveComments(formDate.remark,AV.User.current(),new Date().toLocaleString(),this.componentWillMount());
        //提交数据到数据库
        let CommitsList = AV.Object.extend('key' + uniquekey);
        let commitsList = new CommitsList();
        let _this = this;
        if(AV.User.current() === null)return this.warning()
        commitsList.set('content', formDate.remark);
        commitsList.set('owner', AV.User.current());
        commitsList.set('date',new Date().toLocaleString())
        commitsList.save().then(function () {
            _this.componentWillMount();
        }, function () {
        })
        this.props.form.setFieldsValue({remark:''})
    }

}

export default Comments = Form.create()(Comments);