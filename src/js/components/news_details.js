import React from 'react';
import {Row, Col, BackTop,Icon,Button,Input,message} from 'antd';
import Footer from './page_footer';
import { Link } from 'react-router'
import { articleData,commentData } from '../../mockdata'

export default class NewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: '',
			commentData:'',
			agreeCount:''
		};
	};
	componentWillMount() {
		//先向后端请求数据，如果成功则以下
		this.setState({
			newsItem:articleData,
			commentData:commentData,
			agreeCount:articleData.agreeCount,
		})
	};

	likeClick(e){
		e.target.style.color = '#ed4040';
		e.target.style.borderColor = '#ed4040';
		//发送请求使点赞数加一
		//如果请求成功则显示点赞数加一
		var agreeCount = Number(this.state.newsItem.agreeCount) + 1;
		this.setState({
			agreeCount:agreeCount
		})
	}

	noLikeFun(e){
	//点击垃圾桶时的回调函数
	}

	writeComment(){
	//写评论的函数
	}

	starArticle(e){
		//向后端发送请求
		//如果成功
		e.target.style.color = 'red';
		//如果失败
		//message.error('收藏失败')
	}

	toComment(){
		//location.hash = '#comment';不行
		var comEle = document.getElementById('comment');
		comEle && comEle.scrollIntoView();
	}

	render() {
		var t = this;		
		var data = t.state.newsItem;
		var commentDe =  commentData.length>0 ? commentData.map(function(commentDetail,index){
			return(
				<div className="comment_detail">
					<img src={commentDetail.user.avatar_url} alt="author image" />
					<div className="comment_content">
						<div className="comment_author">
							<span className="author_name">{commentDetail.user.name}</span>
							<span className="agree_count">{commentDetail.digg_count}<Icon type="like-o" /></span>
						</div>
						<p className="comment_para">{commentDetail.text}
						</p>
						<p><span className="comment_time">{commentDetail.create_time}</span>·
						<span className="comment_reply">{commentDetail.reply_count}回复</span></p>
					</div>
				</div>
			)
		}) : '';

		return (
			<div id="mobileDetailsContainer">
				<div class="ucmobileList">
					<Row>
						<Col span={24}>
							<div className="article_top">
								<Link to="/#/"><Icon type="left" className="back_icon"/></Link>
								<span className="article_action">···</span>
							</div>
						</Col>
						<Col span={24} className="container">
							<div class="articleContainer">
								<h3 className="article_title">{data.tltle}</h3>								
								<Row className="article_info" type="flex" align="middle">
									<Col span={3}><img src={data.authorImgUrl} alt="author image"/></Col>
									<Col span={17}>
										<p>{data.source}</p>
										<p>{data.publish_time}</p>
									</Col>
									<Col span={4}><Button type="primary">关注</Button></Col>
								</Row>
								<div className="article_content">
									<p>容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size</p>
									<p>容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size</p>
									<p>容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size</p>
									<p>容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size</p>
									<p>容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size</p>
								</div>
								<div>
									{
										data.label.length>0 ? data.label.map(function(item,index){
											return <span className="article_label">前端</span>;
										}):''
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
								<Input placeholder="写评论···" onClick={t.writeComment.bind(t)} prefix={<Icon type="edit" />}/>
								<Icon type="message" onClick={t.toComment.bind(t)}/>
								<Icon type="star-o" onClick={t.starArticle.bind(t)}/>
								<Icon type="share-alt" />
							</div>
						</Col>
					</Row>
					<Footer></Footer>
					<BackTop/>
				</div>
			</div>
		);
	};
}
