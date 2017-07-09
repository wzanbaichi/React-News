import React from 'react';
import Logo from './logo.png';
import {
    Icon ,
    Tabs ,
    Form ,
    Input ,
    Button ,
    Modal ,} from 'antd';
import AV from 'leancloud-storage';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;



class MobileHeader extends React.Component{

    constructor(){
        super();
        this.state = {
            current: 'top',
            modalVisibal: false,
            action: 'login',
            hasLogined: false,
            userNickname:'liangchenkang',
            userId: 0
        };
    }
    render(){
        let { getFieldDecorator } = this.props.form;
        const userShow = this.state.hasLogined?
            <Icon type='inbox'/>
            :
            <Icon type='setting' onClick={this.userAction.bind(this)}/>
        return(
            <div id='mobile_header'>
                <header>
                    <a href="/">
                        <img src={Logo} alt="logo"/>
                        <span>ReactNews</span>
                        {userShow}
                    </a>
                </header>
                <Modal  wrapClassName='virtical-center-modal' visible={this.state.modalVisibal}
                        footer={null}
                        onCancel={()=>this.setModalVisibal(false)}
                        onOk={()=>this.setModalVisibal(false)}>
                    <Tabs type='line' defaultActiveKey='2'>
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
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder='请输入您的账号'/>
                                    )}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password' placeholder='请输入您的密码'/>
                                    )}
                                </FormItem>
                                <FormItem label='确认密码'>
                                    {getFieldDecorator('confirmPassword', {
                                        rules: [{ required: true, message: 'Please confirm your Password!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password' placeholder='请再次输入您的密码'/>
                                    )}

                                </FormItem>
                                <Button htmlType='submit'>注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
    setModalVisibal(value){
        this.setState({modalVisibal:value});
    };

    handelClick(e){
        if(e.key === 'register'){
            this.setState({current:'register'});
            this.setModalVisibal(true);
        }else{
            this.setState({current:e.key})
        }
    };
    handelSubmit(e){
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
    userAction(){
        this.setModalVisibal(true)
    }
    login(e){
        e.preventDefault()
        let formDate = this.props.form.getFieldsValue();
        let _this = this;
        AV.User.logIn(formDate.userName, formDate.passWord).then(function (loginedUser) {
            console.log(_this)
            _this.setState({
                hasLogined:true,
                userNickname:formDate.userName,
                modalVisibal:false
            })
        }, function (error) {
        });
    }
}

export default MobileHeader = Form.create()(MobileHeader);