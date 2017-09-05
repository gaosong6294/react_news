import React, {Component} from 'react';
import {Tabs, Carousel} from 'antd';
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
import MobileNewsBlock from './mobile_news_block';

const TabPane =Tabs.TabPane;

export default class MobileNewsContainer extends Component{
  render(){
    return(
      <Tabs size="small">
        <TabPane tab="头条" key='top'>
          <div style={{width: '100%'}}>
            <Carousel autoplay>
              <div><img src={carousel_1}/></div>
              <div><img src={carousel_2}/></div>
              <div><img src={carousel_3}/></div>
              <div><img src={carousel_4}/></div>
            </Carousel>
          </div>
          <MobileNewsBlock type='top' count={20}></MobileNewsBlock>
        </TabPane>
        <TabPane tab='社会' key='shehui'>
          <MobileNewsBlock type='shehui' count={20}></MobileNewsBlock>
        </TabPane>
        <TabPane tab='国内' key='guonei'>
          <MobileNewsBlock type='guonei' count={20}></MobileNewsBlock>
        </TabPane>
        <TabPane tab='国际' key='guoji'>
          <MobileNewsBlock type='guoji' count={20}></MobileNewsBlock>
        </TabPane>
        <TabPane tab='娱乐' key='yule'>
          <MobileNewsBlock type='yule' count={20}></MobileNewsBlock>
        </TabPane>
        <TabPane tab='体育' key='tiyu'>
          <MobileNewsBlock type='tiyu' count={20}></MobileNewsBlock>
        </TabPane>
        <TabPane tab='科技' key='keji'>
          <MobileNewsBlock type='keji' count={20}></MobileNewsBlock>
        </TabPane>
      </Tabs>
    )
  }
}