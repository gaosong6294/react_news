import React, {Component} from 'react';
import NewsHeader from '../components/news_header';
import NewsFooter from '../components/news_footer'
import '../componentCss/pc.css';

export default class App extends Component{
  render(){
    return(
      <div>
        <NewsHeader></NewsHeader>
        {this.props.children}
        <NewsFooter></NewsFooter>
      </div>
    )
  }
}