import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Tabs, Carousel} from "antd";
import MobileList from './mobile_list';
const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
    render() {
        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            autoplay: true,
        };
        return (
            <div>
                <MobileHeader/>
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
                <Tabs >
                    <TabPane tab='头条' key='1'>
                        < MobileList type='top' count='20'/>
                    </TabPane>
                    <TabPane tab='社会' key='2'>
                        <MobileList type='shehui' count='20'/>
                    </TabPane>
                    <TabPane tab='国内' key='3'>
                        <MobileList type='guonei' count='20'/></TabPane>
                    <TabPane tab='国际' key='4'>
                        <MobileList type='guoji' count='20'/></TabPane>
                    <TabPane tab='娱乐' key='5'>
                        <MobileList type='yule' count='20'/></TabPane>
                    <TabPane tab='体育' key='6'>
                        <MobileList type='tiyu' count='20'/></TabPane>
                    <TabPane tab='科技' key='7'>
                        <MobileList type='keji' count='20'/></TabPane>
                    <TabPane tab='时尚' key='8'>
                        <MobileList type='shishang' count='20'/></TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
    )
    }
    }