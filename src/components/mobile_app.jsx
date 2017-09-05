import React, {Component} from 'react';
import MobileNewsHeader from './mobile_news_header';
import NewsFooter from './news_footer';
import '../componentCss/mobile.css';


export default class MobileApp extends Component{
  render(){
    return(
      <div>
        <MobileNewsHeader></MobileNewsHeader>
        {this.props.children}
        <NewsFooter></NewsFooter>
      </div>
    )
  }
}