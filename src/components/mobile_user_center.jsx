import React, {Component} from 'react';
import {Tabs, Card, Upload, Icon, Modal} from 'antd';
import {Link} from 'react-router';
import axios from 'axios';
const TabsPane = Tabs.TabPane;

export default class MobileUserCenter extends Component{

  state = {
    collections: null,
    comments: null,
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
    const collectionList = !collections
    ? <h2>没有任何收藏</h2>
    : collections.map((collection, index) => (
        <Card key={index} title={collection.uniquekey}
              extra={<Link to={`/news_detail/${collection.uniquekey}/top`}>查看</Link>}>
          {collection.Title}
        </Card>
      ));
    const commentList = !comments
    ? <h2>没有任何评论</h2>
    : comments.map((comment, index) => (
        <Card key={index} title={`于 ${comment.datetime} 发表评论 ${comment.uniquekey}`}
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
      <Tabs size='small'>
        <TabsPane tab='我的收藏' key='1' style={{padding: '10px'}}>
          {collectionList}
        </TabsPane>
        <TabsPane tab='我的评论' key='2' style={{padding: '10px'}}>
          {commentList}
        </TabsPane>
        <TabsPane tab='上传头像' key='3'>
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
        </TabsPane>
      </Tabs>
    )
  }
}