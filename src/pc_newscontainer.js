import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {
    Row,
    Col,
    Tabs,
    Carousel,
} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCImageBlock from './pc_news_image_block'
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
    render() {
        const settings = {
            effect: 'fade',
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            autoplay: true,
        };
        return (
            <div>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16} className='container'>
                        <div className='left_container'>
                            <div className='carousel'>
                                <Carousel {...settings}>
                                    <div><img
                                        src="http://imgsize.ph.126.net/?imgurl=http://cms-bucket.nosdn.127.net/d44760cada3c4df5bde03c2c9d9fe25d20170707001601.png_600x250x1x85.jpg"
                                        alt=""/></div>
                                    <div><img
                                        src="http://imgsize.ph.126.net/?imgurl=http://cms-bucket.nosdn.127.net/03e0b1efb822401bb45610865cd524e420170706194841.png_600x250x1x85.jpg"
                                        alt=""/></div>
                                    <div><img
                                        src="http://imgsize.ph.126.net/?imgurl=http://cms-bucket.nosdn.127.net/5320aee827eb4e4b83ba5cdf80c1fffd20170706180207.jpeg_600x250x1x85.jpg"
                                        alt=""/></div>
                                    <div><img
                                        src="http://imgsize.ph.126.net/?imgurl=http://cms-bucket.nosdn.127.net/165a52ed1e03446db060ba6e0b68ee4620170706153428.jpeg_600x250x1x85.jpg"
                                        alt=""/></div>
                                </Carousel>
                            </div>
                            <PCImageBlock width='400px' imageHeight='90px' imageWidth='110px' count='6' type='top'
                                          cartTitle='娱乐新闻'/>
                        </div>
                        <Tabs className='tabs_news'>
                            <TabPane tab='新闻' key='1'>
                                <PCNewsBlock type='top' count='20'/>
                            </TabPane>
                        </Tabs>
                        <PCImageBlock width='100%' imageWidth='236px' count='5' type='guoji' cartTitle='国际新闻'/>
                        <PCImageBlock width='100%' imageWidth='236px' count='10' type='guonei' cartTitle='国内新闻'/>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        );
    };
}