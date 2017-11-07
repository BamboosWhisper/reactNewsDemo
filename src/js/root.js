import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Button} from 'antd';

import NewsDetails from './components/news_details';
import Index from './components/index';
import UserCenter from './components/usercenter';


export default class Root extends React.Component {

	constructor(){
		super();
		this.state={
			hasLogined : false
		}
	}

    render() {
        return (
			<div>
				<Router history={hashHistory}>
					<Route path="/" component={Index}></Route>
					<Route path="/details" component={NewsDetails}></Route>
					<Route path="/usercenter" component={UserCenter}></Route>
				</Router>
			</div>
        );
    };
}
ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));
