import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './MapDetailPage.css';

export default class MapDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2,
        });
    }

    // const topSliderRef = useRef(null);
    // const bottomSliderRef = useRef(null);
    // const [nav1, setNav1] = useState(null);
    // const [nav2, setNav2] = useState(null);

    // useEffect(() => {
    //     setNav1(topSliderRef.current);
    //     setNav2(bottomSliderRef.current);
    //     debugger;
    // }, []);

    // render() {
    //     const { map, ssClicked } = this.props;
    //     if (!map || ssClicked === undefined) return <p>EMPTY PARAMETERS PASSED</p>; // returns have to be after hooks

    //     const settingsTopSlider = {
    //         dots: true,
    //         infinite: false,
    //         speed: 500,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         rows: 1,
    //         slidesPerRow: 1,
    //         centerMode: true,
    //         variableWidth: true,
    //         slider: 'img',
    //     };

    //     const settingsBottomSlider = {
    //         dots: false,
    //         infinite: false,
    //         speed: 500,
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //         rows: 1,
    //         slidesPerRow: 3,
    //         centerPadding: '10px',
    //         centerMode: true,
    //         swipeToSlide: true,
    //         focusOnSelect: true,
    //         slider: 'img',
    //     };

    //     const prefix = `ss/${map._id}/`;
    //     const ss = map.screenShots; // shortcut

    //     return (
    //         <>
    //             <div className='detail-main-ss-area'>
    //                 <Slider {...settingsTopSlider} asNavFor={this.state.nav2} ref={(slider) => (this.slider1 = slider)}>
    //                     {/* <Slider {...settingsTopSlider} asNavFor={bottomSliderRef.current} ref={topSliderRef.current}> */}
    //                     <img className='detail-main-ss' src={prefix + ss[0]} alt='screenshot 1' />
    //                     <img className='detail-main-ss' src={prefix + ss[1]} alt='screenshot 2' />
    //                     <img className='detail-main-ss' src={prefix + ss[2]} alt='screenshot 3' />
    //                 </Slider>
    //             </div>
    //             <div className='detail-bottom-area'>
    //                 <div className='detail-carousel-section'>
    //                     <Slider
    //                         {...settingsBottomSlider}
    //                         asNavFor={this.state.nav1}
    //                         ref={(slider) => (this.slider2 = slider)}
    //                     >
    //                         {/* <Slider {...settingsBottomSlider} asNavFor={topSliderRef.current} ref={bottomSliderRef.current}> */}
    //                         <img className='detail-sub-ss' src={prefix + ss[0]} alt='screenshot 1' />
    //                         <img className='detail-sub-ss' src={prefix + ss[1]} alt='screenshot 2' />
    //                         <img className='detail-sub-ss' src={prefix + ss[2]} alt='screenshot 3' />
    //                     </Slider>
    //                 </div>
    //                 <div className='detail-info-section'>Map details here...</div>
    //             </div>
    //         </>
    //     );
    // }

    render() {
        const { map, ssClicked } = this.props;
        if (!map || ssClicked === undefined) return <p>EMPTY PARAMETERS PASSED</p>; // returns have to be after hooks

        const prefix = `ss/${map._id}/`;
        const ss = map.screenShots; // shortcut

        return (
            <div>
                <h2>Slider Syncing (AsNavFor)</h2>
                <h4>First Slider</h4>
                <Slider asNavFor={this.state.nav2} ref={(slider) => (this.slider1 = slider)}>
                    <div>
                        <img className='detail-main-ss' src={prefix + ss[0]} alt='screenshot 1' />
                    </div>
                    <div>
                        <img className='detail-main-ss' src={prefix + ss[1]} alt='screenshot 2' />
                    </div>
                    <div>
                        <img className='detail-main-ss' src={prefix + ss[2]} alt='screenshot 3' />
                    </div>
                    <div>
                        <img className='detail-main-ss' src={prefix + ss[3]} alt='screenshot 4' />
                    </div>
                </Slider>
                <h4>Second Slider</h4>
                <Slider
                    asNavFor={this.state.nav1}
                    ref={(slider) => (this.slider2 = slider)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                >
                    <div>
                        <img className='detail-sub-ss' src={prefix + ss[0]} alt='screenshot 1' />
                    </div>
                    <div>
                        <img className='detail-sub-ss' src={prefix + ss[1]} alt='screenshot 2' />
                    </div>
                    <div>
                        <img className='detail-sub-ss' src={prefix + ss[2]} alt='screenshot 3' />
                    </div>
                    <div>
                        <img className='detail-sub-ss' src={prefix + ss[3]} alt='screenshot 4' />
                    </div>
                </Slider>
            </div>
        );
    }
}

MapDetailPage.propTypes = {
    map: PropTypes.object,
    ssClicked: PropTypes.number,
};

// export default MapDetailPage;
