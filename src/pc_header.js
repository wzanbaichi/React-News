import React from 'react';
import Logo from './logo.png';
import './pc.css';
import {
    Row,
    Col,
    Menu,
    Icon,
    Tabs,
    Form,
    Input,
    Button,
    Modal,
} from 'antd';
import AV from 'leancloud-storage';


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisibal: false,
            action: 'login',
            hasLogined: false,
            userNickname: 'liangchenkang',
            userId: 0
        };
    }
    componentWillMount(){
        let currentUser = AV.User.current();
        if (currentUser) {
            this.setState({
                hasLogined:true,
                userNickname:currentUser.attributes.username
            })
        }
        else {
            //currentUser 为空时，可打开用户注册界面…

        }
    }

    render() {

        let {getFieldDecorator} = this.props.form;
        let userShow = this.state.hasLogined ?
            <Menu.Item key='logout' className='register'>
                <Button htmlType='button'>{this.state.userNickname}</Button>
                &nbsp;&nbsp;
                {/*<Link target='_blank'>*/}
                    <Button htmlType='button'>个人中心</Button>
                {/*</Link>*/}
                &nbsp;&nbsp;
                <Button type="dashed" htmlType='button' onClick={this.logout.bind(this)}>注销</Button>
            </Menu.Item>
            :
            <Menu.Item key='register' className='register'>
                <Icon type='appstore'/>注册&nbsp;登录
            </Menu.Item>

        return (
            <div className='pc_header'>
                <Row>
                    <Col span={4}></Col>
                    <Col span={3}>
                        <a href="/" className='logo'>
                            <img src={Logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={13}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]}
                              onClick={this.handelClick.bind(this)}>
                            <Menu.Item key='top'>
                                <Icon type='appstore'/>头条
                            </Menu.Item>
                            <Menu.Item key='shehui'>
                                <Icon type='appstore'/>社会
                            </Menu.Item>
                            <Menu.Item key='guonei'>
                                <Icon type='appstore'/>国内
                            </Menu.Item>
                            <Menu.Item key='guoji'>
                                <Icon type='appstore'/>国际
                            </Menu.Item>
                            <Menu.Item key='yule'>
                                <Icon type='appstore'/>娱乐
                            </Menu.Item>
                            <Menu.Item key='tiyu'>
                                <Icon type='appstore'/>体育
                            </Menu.Item>
                            <Menu.Item key='keji'>
                                <Icon type='appstore'/>科技
                            </Menu.Item>
                            <Menu.Item key='shishang'>
                                <Icon type='appstore'/>时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>

                        <Modal wrapClassName='virtical-center-modal' visible={this.state.modalVisibal}
                               footer={null}
                               onCancel={() => this.setModalVisibal(false)}
                               onOk={() => this.setModalVisibal(false)}>
                            <Tabs type='line' defaultActiveKey='2' onChange={this.callback.bind(this)}>
                                <TabPane tab='登录' key='1'>
                                    <Form onSubmit={this.login.bind(this)}>
                                        <FormItem label='账号'>
                                            {getFieldDecorator('userName', {
                                                rules: [{required: true, message: 'Please input your username!'}],
                                            })(
                                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder='请输入您的账号'/>
                                            )}
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {getFieldDecorator('passWord', {
                                                rules: [{required: true, message: 'Please input your Password!'}],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                       type='password' placeholder='请输入您的密码'/>
                                            )}
                                        </FormItem>
                                        <Button htmlType='submit'>登录</Button>
                                    </Form>
                                </TabPane>

                                <TabPane tab='注册' key='2'>
                                    <Form onSubmit={this.handelSubmit.bind(this)}>
                                        <FormItem label='账户'>
                                            {getFieldDecorator('r_userName', {
                                                rules: [{required: true, message: 'Please input your username!'}],
                                            })(
                                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder='请输入您的账号'/>
                                            )}
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {getFieldDecorator('r_passWord', {
                                                rules: [{required: true, message: 'Please input your Password!'}],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                       type='password' placeholder='请输入您的密码'/>
                                            )}
                                        </FormItem>
                                        <FormItem label='邮箱'>
                                            {getFieldDecorator('r_email', {
                                                rules: [{required: true, message: 'Please input your E-mail!'}],
                                            })(
                                                <Input prefix={<Icon type="mail" style={{fontSize: 13}}/>}
                                                       placeholder='请输入您的邮箱'/>
                                            )}
                                        </FormItem>
                                        <Button htmlType='submit'>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        );
    }

    setModalVisibal(value) {
        this.setState({modalVisibal: value});
    };

    handelClick(e) {
        if (e.key === 'register') {
            this.setState({current: 'register'});
            this.setModalVisibal(true);
        } else {
            this.setState({current: e.key})
        }
    };

    handelSubmit(e) {
        //页面开始向API提交数据
        e.preventDefault();
        let formDate = this.props.form.getFieldsValue();
        let _this = this;
        let user = new AV.User();                        // 新建 AVUser 对象实例
        user.setUsername(formDate.r_userName);            // 设置用户名
        user.setPassword(formDate.r_passWord);           // 设置密码
        user.setEmail(formDate.r_email);         // 设置邮箱
        user.signUp().then(function (loginedUser) {
            AV.User.logIn(formDate.r_userName, formDate.r_passWord).then(function (loginedUser) {
                _this.setState({
                    hasLogined:true,
                    userNickname:formDate.r_userName,
                    modalVisibal:false
                })
            }, function (error) {
            });
        }, function (error) {
            alert(error)
        });
    }
    callback(key){
        if(key === 1){
            this.setState({action:'register'})
        }else if(key === 2){
            this.setState({action:'login'})
        }
    }
    login(e){
        e.preventDefault()
        let formDate = this.props.form.getFieldsValue();
        let _this = this;
        AV.User.logIn(formDate.userName, formDate.passWord).then(function (loginedUser) {
            _this.setState({
                hasLogined:true,
                userNickname:formDate.userName,
                modalVisibal:false
            })
        }, function (error) {
        });
    }
    logout(){
        this.setState({
            hasLogined:false,
        });
        AV.User.logOut();
    }
}
export default PCHeader = Form.create()(PCHeader);

