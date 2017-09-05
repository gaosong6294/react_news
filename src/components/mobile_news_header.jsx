import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {Form, Icon, Modal, Button, Tabs, Input, message} from 'antd';
import logo from '../images/logo.png';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class MobileNewsHeader extends Component{

  state = {
    username: null,
    modalVisible: false
  };

  componentWillMount = () => {
    const username = localStorage.getItem('username');
    if(username){
      this.setState({username});
    }
  };

  setModalVisible = (modalVisible) => {
    this.setState({modalVisible})
  };

  handleSubmit = (isLogin, event) => {
    event.preventDefault();
    const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue();
    let url = 'http://newsapi.gugujiankong.com/Handler.ashx?';
    if(isLogin){
      url += `action=login&username=${username}&password=${password}`;
    }else{
      url += `action=login&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`;
    }
    axios.get(url)
      .then(response => {
        // this.props.form.resetFields();
        const result = response.data;
        if(isLogin){
          if(!result){
            message.error('登录失败')
          }else{
            message.success('噢耶~!登录成功');
            const userId = result.UserId;
            const username = result.NickUserName;
            this.setState({username});
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
          }
        }else{
          message.success('噢耶~!注册成功')
        }
      });
    this.setState({modalVisible: false});
  };

  logout = () => {
    message.success('退出成功');
    this.setState({username: null});
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  };

  render(){
    const {username, modalVisible} = this.state;

    const userItem = username
      ? (
          <span>
            <Link to={'/'}>
              <Icon type='logout' onClick={this.logout}></Icon>
            </Link>
            <Link to='/user_center'><Icon type='inbox'></Icon></Link>
          </span>
        )
      : <Icon type='setting' onClick={this.setModalVisible.bind(this, true)}/>;

    const {getFieldDecorator} = this.props.form;

    return(
      <div id="mobileheader">
        <header>
          <div>
            <Link to='/'>
              <img src={logo} alt="logo"/>
              <span>React_Mobile</span>
            </Link>
            {userItem}
          </div>
        </header>
        <Modal title="用户中心"
               visible={modalVisible}
               onOk={this.setModalVisible.bind(this, false)}
               onCancel={this.setModalVisible.bind(this, false)}
               okText='关闭'>
          <Tabs type='card' onChange={() => this.props.form.resetFields()}>
            <TabPane tab="用户登录" key='1'>
              <Form onSubmit={this.handleSubmit.bind(this, true)}>
                <FormItem label='账户'>
                  {
                    getFieldDecorator('username')(
                      <Input type='text' placeholder='请输入用户名'></Input>
                    )
                  }
                </FormItem>
                <FormItem label='密码'>
                  {
                    getFieldDecorator('password')(
                      <Input type='password' placeholder='请输入密码'></Input>
                    )
                  }
                </FormItem>
                <Button type='primary' htmlType='submit'>登录</Button>
              </Form>
            </TabPane>
            <TabPane tab='用户注册' key='2'>
              <Form onSubmit={this.handleSubmit.bind(this, false)}>
                <FormItem label='账户'>
                  {
                    getFieldDecorator('r_userName')(
                      <Input type='text' placeholder='请输入用户名'></Input>
                    )
                  }
                </FormItem>
                <FormItem label='密码'>
                  {
                    getFieldDecorator('r_password')(
                      <Input type='password' placeholder='请输入密码'></Input>
                    )
                  }
                </FormItem>
                <FormItem label='确认密码'>
                  {
                    getFieldDecorator('r_confirmPassword')(
                      <Input type='password' placeholder='确认密码'></Input>
                    )
                  }
                </FormItem>
                <Button type='primary' htmlType='submit'>注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(MobileNewsHeader);