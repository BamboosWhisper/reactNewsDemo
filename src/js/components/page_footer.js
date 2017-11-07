import React from 'react';
import {Row,Col} from 'antd';

const Component = React.Component;

export default class Footer extends Component{

  render(){
    return (
      <footer>
        <Row>
          <Col span={24} class="footer">
            &copy;&nbsp;2017 News.All Rights Reserved.
          </Col>
        </Row>
      </footer>
    );
  };
}
