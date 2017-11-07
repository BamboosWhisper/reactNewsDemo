import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Tabs,Card} from 'antd';
import Header from './page_header';
import Footer from './page_footer';
import { collectionData } from '../../mockdata'

const Component = React.Component;
const TabPane = Tabs.TabPane;

export default class UserCenter extends Component {

	constructor() {
		super();
		this.state = {
			usercollection: [],
		};
	};

	componentWillMount() {
		//请求数据
		//如果成功
		this.setState({
			usercollection:collectionData,
		})
	};

	render() {
		var { usercollection } = this.state;

		var usercollectionList = usercollection.length ?
			usercollection.map((item,index)=>(
					<Card key={index} title='收藏' 
						extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}
						className="collectionCard">
						<p>{item.title}</p>
						<p><span>{item.type}</span>
							<span>{item.author}</span>
							<span>{item.time}</span>
						</p>
					</Card>
			))
			:
			<div className="no_content">您目前还没有收藏过任何新闻。</div>;

		return (
			<div className="user_center_wrapper">
				<header>
					个人中心
				</header>
				<Row>
					<Col span={24}>
						<Tabs>
							<TabPane tab="收藏列表" key="1">
								<Row>
									<Col span={24}>
										{usercollectionList}
									</Col>
								</Row>
							</TabPane>
							<TabPane tab="头像设置" key="2"></TabPane>
						</Tabs>
					</Col>
				</Row>
				<Footer/>
			</div>
		);
	};
}
