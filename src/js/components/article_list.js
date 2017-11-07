import React from 'react';
import {Row,Col,Icon,Button} from 'antd'; 
import classnames from 'classnames'
import { Link } from 'react-router';

import { listData} from '../../mockdata'

export default class ArticleList extends React.Component{

  constructor(){
    super();
    this.state={
      news:[],
      deleteData:[],
      deleteOri:'不感兴趣',
      modalVisible:false
    };
  }

  componentWillMount(){
    //请求数据 如果成功的话
    this.setState({
      news:listData,
    })
  };

  selectReason(e){
    e.target.style.Color = '#ed4040';
    e.target.style.borderColor = '#ed4040';
    this.setState({
      deleteOri:'确定'
    })
  }

  deleteItem(idx){
    var {news,deleteData} = this.state;
    // if(Object.prototype.toString.call(news) == '[object Array]'){
    //   var itemLabels = news[idx].label;
    // }
    if(news.length>0)
    {
      var itemLabels = news[idx].label,
      itemAuthor = news[idx].source;
      deleteData.concat(itemLabels,itemAuthor);
    }   
    this.setState({
      deleteData:deleteData,
      modalVisible:true
    })
    this.props.deleteItem(true);
    
  }

  submitReason(){
    this.setState({
      deleteData:[],
      modalVisible:false
    })
    this.props.deleteItem(false);
    var res =  document.getElementsByClassName("delete_reason");
    for (var item in res){
      if((Number(item)+'') != 'NaN')
      {
        res[item].style.color = 'black';
        res[item].style.borderColor = '#ddd';
      }
    }
  }

  render(){
    var t = this;
    var {news}=t.state;
    var { deleteData } = t.state;
    var newsList=news.length?
          news.map((newsItem,index)=>(
            <section key={index} className="article_list_section">
              <Link to={`details`} className="list_link">
                  <div className="list_article_title">
                    <span>{newsItem.title}</span>
                  </div>
                  <div className="list_article_img">
                    <img src={newsItem.imgSrc} alt={newsItem.title}/>
                  </div>              
              </Link>
              <div className="list_article_desc clearfix">
                  <span>{newsItem.author}</span>
                  <span>{newsItem.comCount}</span>
                  <span>{newsItem.time}</span>
              </div>  
              <Icon type="delete" className="close_icon" onClick={t.deleteItem.bind(t,index)}/>
            </section>
          ))
          :
          '没有加载到任何新闻';

    return (
      <div>
        <Row>
          <Col span={24}>
            {newsList}
            <div className={classnames({'delete_modal':true,'isvisible':t.state.modalVisible})}>
              <span>可选理由，精准屏蔽</span>
              <Button onClick={t.submitReason.bind(t)}>{t.state.deleteOri}</Button>
              <span className="delete_reason" onClick={t.selectReason.bind(t)}>看过了</span>
              <span className="delete_reason" onClick={t.selectReason.bind(t)}> 内容太水</span>
              {
                deleteData.length>0 ? deleteData.map(function(item,idx){
                  return <span className="delete_reason" onClick={t.selectReason.bind(t)}>{item}</span>
                }) : ''                  
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  };
}
