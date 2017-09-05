import React, {Component} from 'react';
import {Tabs, Row, Col, Card, Upload, Icon, Modal} from 'antd';
import axios from 'axios';
import {Link} from 'react-router';
const TabPane = Tabs.TabPane;


export default class UserCenter extends Component{

  state = {
    collections: null,
    comments: null,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  handleChange = ({ fileList }) => this.setState({ fileList });


  componentDidMount(){
    const userId = localStorage.getItem('userId');
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
    axios.get(url)
      .then(response => {
        const collections = response.data;
        this.setState({collections});
      });
    url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url)
      .then(response => {
        const comments = response.data;
        this.setState({comments});
      })
  };

  render(){
    const {collections, comments} = this.state;
    const collectionsList = !collections
    ? <h2>没有任何收藏评论</h2>
    : collections.map((collection, index) => (
        <Card key={index} title={collection.uniquekey}
              extra={<Link to={`/news_detail/${collection.uniquekey}/top`}>查看</Link>}>
          {collection.Title}
        </Card>
      ));

    const commentList = !comments
    ? <h2>没有任何评论</h2>
    : comments.map((comment, index) => (
        <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
              extra={<Link to={`/news_detail/${comment.uniquekey}/top`}>查看</Link>}>
          {comment.Comments}
        </Card>
      ));

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return(
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <Tabs>
            <TabPane tab="我的收藏列表" key="1">
              {collectionsList}
            </TabPane>
            <TabPane tab="我的评论列表" key="2">
              {commentList}
            </TabPane>
            <TabPane tab="头像设置" key="3">
              <div className="clearfix">
                <Upload
                  action="http://jsonplaceholder.typicode.com/photos"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}>
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}