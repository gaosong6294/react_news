import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Card} from 'antd';
import axios from 'axios';

export default class MobileNewsBlock extends Component{

  static propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  };

  state = {
    newsArr: []
  };

  componentDidMount(){
    const {type, count} = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
    axios.get(url)
      .then(response => {
        const newsArr = response.data;
        this.setState({newsArr});
      })
  };

  render(){
    const {newsArr} = this.state;
    const {type} = this.props;
    const newsList = !newsArr
    ? <h2>没有任何新闻</h2>
    : newsArr.map((news, index) => (
        <Card key={index} className="m_article list-item special_section clearfix">
          <Link to={`/news_detail/${news.uniquekey}/${type}`}>
            <div className='m_article_img'>
              <img src={news.thumbnail_pic_s} alt={news.title}/>
            </div>
            <div className='m_article_info'>
              <div className='m_article_title'>
                <span>{news.title}</span>
              </div>
              <div className='m_article_desc clearfix'>
                <div className='m_article_desc_l'>
                  <span className='m_article_channel'>{news.realtype}</span>
                  <span className='m_article_time'>{news.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </Card>
      ));
    return(
      <div>
        {newsList}
      </div>
    )
  }
}