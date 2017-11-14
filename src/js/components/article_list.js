import React from 'react';
import { Row,Col,Icon,Button } from 'antd'; 
import classnames from 'classnames'
import { Link } from 'react-router';

//import { listData} from '../../mockdata'

export default class ArticleList extends React.Component{

  constructor(){
    super();
    this.state={
      news:[],
      modalVisible:false
    };
    this.deleteReason = ['不感兴趣','看过了','太水'];
  }

  componentWillMount(){
    let myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
    + "&count=" + this.props.count, myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
  };

  selectReason(e){
    e.target.style.color = '#ed4040';
    e.target.style.borderColor = '#ed4040';
  }

  deleteItem(idx,e){
    this.setState({
      modalVisible:true
    })
    this.props.deleteItem(true);
    this.evt = e.target;    
  }

  submitReason(e){
    this.setState({
      modalVisible:false
    })
    this.props.deleteItem(false);

    var eles = document.getElementsByClassName("delete_reason");
    var res; res =  Array.prototype.slice.call(eles);
    res = res.filter(function(item){
      if(item.style.color=='#ed4040'||item.style.color=='rgb(237, 64, 64)'){
        return true
      }
      return false;
    })
    var reasons = [];
    res.map(function(item,idx){
      item.style.color = 'black';
      item.style.borderColor = '#ddd';
      reasons = reasons.concat(item.innerText);//向后台提交
    })

    this.evt.parentNode.parentNode.removeChild(this.evt.parentNode);
  }

  cancelSelete(){
    this.props.deleteItem(false);
    var eles = document.getElementsByClassName("delete_reason");
    var res =  Array.prototype.slice.call(eles);
    res = res.filter(function(item){
      if(item.style.color=='#ed4040'||item.style.color=='rgb(237, 64, 64)'){
        return true
      }
      return false;
    })
    res.map(function(item,idx){
      item.style.color = 'black';
      item.style.borderColor = '#ddd';
    })
    this.setState({
      modalVisible:false
    })
  }

  render(){
    var t = this;
    var {news}=t.state;
    var { deleteReason } = t;

    var newsList=news.length?
          news.map((newsItem,index)=>(
            <section key={index} className="article_list_section">
              <Link to={`details/${newsItem.uniquekey}`} className="list_link">
                  <div className="list_article_title">
                    <span>{newsItem.title}</span>
                  </div>
                  <div className="list_article_img">
                    <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                  </div>              
              </Link>
              <div className="list_article_desc clearfix">
                  <span>{newsItem.author_name}</span>
                  <span>22</span>
                  <span>{newsItem.date}</span>
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
              <p>可选理由，精准屏蔽</p>
              {
                deleteReason.length>0 ? deleteReason.map(function(item,idx){
                  return <span className="delete_reason" onClick={t.selectReason.bind(t)}>{item}</span>
                }) : ''                  
              }
              <Button onClick={t.submitReason.bind(t)}>确定</Button>
              <Button className="cancel_button" onClick={t.cancelSelete.bind(t)}>取消</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  };
}
