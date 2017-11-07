import React from 'react';
import Header from './page_header';
import Footer from './page_footer';
import ArticleList from './article_list';
import classnames from 'classnames'
import {Tabs, Carousel} from 'antd';

const Component = React.Component;
const TabPane=Tabs.TabPane;

export default class Index extends Component{

  constructor(){
    super();
    this.state = {
      isOnDelete:false,
    }
  }

  deleteItem(flag){
    this.setState({
      isOnDelete:flag
    })
  }

  render(){
    var t = this;
    const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,//每次显示一张图片
			autoplay: true,
			pauseOnHover:true
    };
    
    return (
      <div className={classnames({'isgray':t.state.isOnDelete})}>
        <Header/>
        <Tabs className="tab_wrapper">
          <TabPane tab="推荐" key="1">
            <div class="carousel">
              <Carousel {...settings}>
                <div><img src="./src/images/pic1.jpg" /></div>
                <div><img src="./src/images/pic2.jpg" /></div>
                <div><img src="./src/images/pic3.jpg" /></div>
                <div><img src="./src/images/pic4.jpg" /></div>
              </Carousel>
            </div>
            <ArticleList count={20} type="top" deleteItem={t.deleteItem.bind(t)}/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <ArticleList count={20} type="shehui" deleteItem={t.deleteItem.bind(t)}/>
          </TabPane>
          <TabPane tab="娱乐" key="4">
            <ArticleList count={20} type="yule" deleteItem={t.deleteItem.bind(t)}/>
          </TabPane>
          <TabPane tab="杭州" key="5">
            <ArticleList count={20} type="hangzhou" deleteItem={t.deleteItem.bind(t)}/>
          </TabPane>
          <TabPane tab="科技" key="6">
            <ArticleList count={20} type="keji" deleteItem={t.deleteItem.bind(t)}/>
          </TabPane>
        </Tabs>
        <Footer/>
      </div>
    );
  };

}
