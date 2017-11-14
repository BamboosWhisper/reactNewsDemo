import React from 'react';
import {Router,Route,Link,browserHistory} from 'react-router'
import {Row,Col} from 'antd';
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';

const Component = React.Component;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;

class Header extends Component{

  constructor(){
		super();
		this.state={
			current:'top',
			modalVisible:false,
			action:'login',
			hasLogined:false,
			userNickName:'',
			userid:0
		};
	};

	setModalVisible(value)
	{
		this.setState({
			modalVisible:value
		})
	};

  handleSubmit(flag,e){
		//页面开始向API进行提交数据
    e.preventDefault();	
    var formData = this.props.form.getFieldsValue();
    //提交表单数据
    //-----------
    //如果成功	
    this.setState({
      userName:formData.userName,
      userid:formData.userName //暂用uername代替
    })
		this.setState({hasLogined:true});	
		message.success("请求成功！");
    this.setModalVisible(false);
    sessionStorage.setItem('islogin',this.state.hasLogined)
    sessionStorage.setItem('userid',formData.userName)
	};

  toLogin(){
    this.setModalVisible(true);
  }

  render(){
    let t = this;
    let { getFieldDecorator } = t.props.form;
    var isLogin = t.state.hasLogined? t.state.hasLogined : (sessionStorage.getItem('islogin')? sessionStorage.getItem('islogin'):false)
    isLogin = isLogin==='false'?false:true;
    var userShow = isLogin?
                      <Link to="/usercenter">
                        <Icon type="user" />
                      </Link>
                      :
                      <Icon type="login" onClick={t.toLogin.bind(t)}/>

    return (
      <div id="mobileheader">
        <header>
          <img src="./src/images/logo2.png" alt="logo"/>
          <span>头条新闻（仿）</span>
          {userShow}
        </header>

        <Modal title="用户中心"
              warpClassName="vertical-center-modal"
              visible={t.state.modalVisible}
              onCancel={()=>t.setModalVisible(false)}
              onOk={()=>t.setModalVisible(false)}
              okText="关闭">
          <Tabs type="card" className="modal_card">
            <TabPane tab="登录" key="1">
              <Form layout="horizontal" onSubmit={t.handleSubmit.bind(t,'sighIn')} className="user_form">
                <FormItem label="用户名">
                  <Input placeholder="请输入您的用户名" {...getFieldDecorator('userName')}/>
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入您的密码" {...getFieldDecorator('password')}/>
                </FormItem>
                <Button type="primary" htmlType="submit" className="login_button">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form layout="horizontal" onSubmit={t.handleSubmit.bind(t,'register')} className="user_form">
                <FormItem label="用户名">
                  <Input placeholder="请输入您的用户名" {...getFieldDecorator('r_userName')}/>
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入您的密码" {...getFieldDecorator('r_password')}/>
                </FormItem>
                <FormItem label="确认密码">
                  <Input type="password" placeholder="请再次输入您的密码" {...getFieldDecorator('r_confirmPassword')}/>
                </FormItem>
                <Button type="primary" htmlType="submit" className="login_button">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  };
}

export default Header = Form.create()(Header)
