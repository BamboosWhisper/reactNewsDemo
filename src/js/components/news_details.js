import React from 'react';
import classnames from 'classnames'
import { Row, Col, BackTop,Icon,Button,Input,message,Modal } from 'antd';
import Footer from './page_footer';
import { Link } from 'react-router'

const confirm = Modal.confirm;

export default class NewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: '',
			commentData:'',
			agreeCount:'',
			comments:'',
			showShare:false,
			showAction:false
		};
	};
	componentWillMount() {		
		this.getData.call(this,'news')
		this.getData.call(this,'comments')	

		this.setState({
			agreeCount:34
		})
	};

	getData(flag){
		let fetchOption = {
			method: 'GET'
		  };
		if(flag=="news")
		{
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
			+ this.props.params.uniquekey,fetchOption)
			.then(response => response.json())
			.then(json => {
			this.setState({
				newsItem: json
				});
			})
		}else if(flag == 'comments')
		{
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="
			+this.props.params.uniquekey, fetchOption)
			.then(response => response.json())
			.then(json => {
				this.setState({
					commentData: json
				});
			})
		}
	}

	likeClick(e){
		if(e.target.style.color != "#ed4040"&&e.target.style.color!='rgb(237, 64, 64)')
		{
			e.target.style.color = '#ed4040';
			e.target.style.borderColor = '#ed4040';
			var agreeCount = Number(this.state.agreeCount) + 1;
			this.setState({
				agreeCount:agreeCount
			})
		}
		else{
			e.target.style.color = '#555';
			e.target.style.borderColor = '#ccc';
			var agreeCount = Number(this.state.agreeCount) - 1;
			this.setState({
				agreeCount:agreeCount
			})
		}
	}

	noLikeFun(e){
	//点击垃圾桶时的回调函数
		let t = this;
		let contentDom = (()=>{
			return (
				<div className="nolike_reason">
					<span>不喜欢该作者</span>
					<span>不想看该分类文章</span>
					<span onClick={t.quesActi.bind(t)}>举报文章问题<Icon type="right" /></span>
				</div>
			)
		})()
		confirm({
			title:'请选择理由：',
			content:contentDom,
			onOk(){},
			onCancel(){},
		})
	}
	quesActi(){}
	clickInput(e){		
		e.target.style.width = "118%";
		document.getElementById("add_comment").style.display = 'inline-block';
	}
	writeComment(e){
		this.setState({
			comments:e.target.value
		})
	}

	addComment(e){
		var t = this;
		let myFetchOptions = {
			method: 'GET'
		  };	  
		let comments = this.state.comments;
		if(comments.trim()=='')
		{
			message.info("评论不能为空！")
		}else{
			// fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="
			// +sessionStorage.userid
			// +"&uniquekey="
			// +this.props.params.uniquekey
			// +"&commnet="
			// +comments, myFetchOptions)
			// .then(response=>{
			// 	if(response.status==400||response.status==500){
			// 		const error = new Error(response.statusText);
			// 		error.response = response;
			// 		throw error;
			// 	}
			// })
			// .then(response=>response.json())
			// .then(json => {
			// 	message.success('评论发表成功');
			// 	t.getData.call(this,'comments')
			// })
			// .catch(function(e) {console.log("Oops, error");})
			message.success('评论发表成功');
			t.getData.call(this,'comments')
		}	

		e.target.style.display = 'none';
		document.getElementById('comment_input').style.width='100%';
		this.setState({
			comments:''
		})		
	}

	starArticle(e){
		let fetchOptions = {
			method: 'GET'
		  };
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="
		+sessionStorage.userid
		+"&uniquekey="
		+this.props.params.uniquekey, fetchOptions)
		.then(response=>{
			if(response.status == 400 || response.status == 500) 
				{
					const error = new Error(response.statusText);
					error.response = response;
					throw error;
				}
			})
		.then(response => response.json())
		.then(json => {
		message.success("收藏文章成功")
		});
		e.target.style.color = 'red';
	}

	starAuthor(e)
	{
		var ele = e.target;
		if(ele.innerText == '关注')
		{
			ele.style.backgroundColor = '#f2f2f2';
			ele.style.color = '#555';
			ele.innerText = '已关注'
		}else{
			ele.style.backgroundColor = '#ed4040';
			ele.style.color = '#fff';
			ele.innerText = '关注'
		}
	}

	toComment(){
		var comEle = document.getElementById('comment');
		comEle && comEle.scrollIntoView();
	}

	shareArticle(flag){
		if(flag=='share'){
			var ele = document.getElementById("share_part");
			if(window.getComputedStyle(ele).getPropertyValue('display')=='none')
			{
				this.setState({
					showShare:true
				})
			}else{
				this.setState({
					showShare:false
				})
			}
		}else if(flag=='action'){
			var ele = document.getElementById("action_part");
			if(window.getComputedStyle(ele).getPropertyValue('display') == 'none')
			{
				this.setState({
					showAction:true
				})
			}else{
				this.setState({
					showAction:false
				})
			}
		}
		
	}

	parseToDOM(str){
		var div = document.createElement("div");
		if(typeof str == "string")
			div.innerHTML = str;
		return div.childNodes;
	 }
	 handleContent(str){
		 let res = '';
		 if(str&&str.length){
			let idx = str.indexOf('content');
			res = str.slice(idx-10);
			return{__html:res}
		 }
		
	 }

	render() {
		var t = this;		
		var data = t.state.newsItem;
		var commentData = t.state.commentData.slice(0,20);
		var commentDe =  commentData.length>0 ? commentData.map(function(commentDetail,index){
			return(
				<div className="comment_detail">
					<img src={commentDetail.avatar_url} alt="author image" />
					<div className="comment_content">
						<div className="comment_author">
							<span className="author_name">{commentDetail.UserName}</span>
							<span className="agree_count">123<Icon type="like-o" /></span>
						</div>
						<p className="comment_para">{commentDetail.Comments}
						</p>
						<p><span className="comment_time">{commentDetail.datetime}</span>·
						{/*<span className="comment_reply">{commentDetail.reply_count}回复</span>*/}
						</p>
					</div>
				</div>
			)
		}) : '';

		var contentDiv = t.parseToDOM(data.pagecontent);

		return (
			<div id="mobileDetailsContainer">
				<div class="ucmobileList">
					<Row>
						<Col span={24}>
							<div className="article_top">
								<Link to="/#/"><Icon type="left" className="back_icon"/></Link>
								<span className="article_action" onClick={t.shareArticle.bind(t,'action')}>···</span>
							</div>
						</Col>
						<Col span={24} className="container">
							<div class="articleContainer">
								<h3 className="article_title">{data.tltle}</h3>								
								<Row className="article_info" type="flex" align="middle">
									<Col span={3}><img src={data.thumbnail_pic_s02} alt="author image"/></Col>
									<Col span={16}>
										<p>{data.author_name}</p>
										<p>{data.date}</p>
									</Col>
									<Col span={5}><button className='primary_button' onClick={t.starAuthor.bind(t)}>关注</button></Col>
								</Row>
								<div className="article_content" dangerouslySetInnerHTML={t.handleContent(data.pagecontent)}>
								</div>
								<div>
									{
										// data.label.length>0 ? data.label.map(function(item,index){
										// 	return <span className="article_label">前端</span>;
										// }):''
									}									
								</div>
								<div className="article_action_bottom">
									<span onClick={t.likeClick.bind(t)}><Icon type="like-o" />{t.state.agreeCount}</span>
									<span><Icon type="delete" onClick={t.noLikeFun.bind(t)}/>不喜欢</span>
								</div>
							</div>
							<div className="comment_wrapper" id="comment">
								{commentDe}
							</div>
							<div className="write_comment">
								<Input placeholder="写评论···" id="comment_input" 
								value={t.state.comments} onClick={t.clickInput.bind(t)} onChange={t.writeComment.bind(t)} prefix={<Icon type="edit" />}/>
								<Icon type="message" onClick={t.toComment.bind(t)}/>
								<Icon type="star-o" onClick={t.starArticle.bind(t)}/>
								<Icon type="share-alt" onClick={t.shareArticle.bind(t,'share')}/>
								<button className="submit_btn" id="add_comment" onClick={t.addComment.bind(t)}>提交</button>
							</div>
						</Col>
					</Row>
					<div id="share_part" className={classnames({share_wrapper:true,isShow:t.state.showShare})}>
						<div className="social-share" data-sites="weibo,qq,qzone,tencent,wechat"></div>
						<span onClick={t.shareArticle.bind(t,'share')}>取消</span>
					</div>
					<div id="action_part" className={classnames({share_wrapper:true,isShow:t.state.showAction})}>
						<div className="action_links">
							<a href="" className="action_item night_mode"><img src="./src/images/night.png" /></a>
							<a href="" className="action_item display_setting"><img src="./src/images/setting.png" /></a>
							<a href="" className="action_item accusation"><img src="./src/images/accu.png" /></a>
						</div>
						<span onClick={t.shareArticle.bind(t,'action')}>取消</span>
					</div>
					<Footer></Footer>
					<BackTop/>
				</div>
			</div>
		);
	};
}
