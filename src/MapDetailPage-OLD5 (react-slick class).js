import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Box from '@mui/material/Box';
// import { sizing } from '@mui/system';

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

        const prefix = `ss/${map._id}/`; // path prefix
        const ss = map.screenShots; // coding shortcut

        return (
            <>
                {/* <div className='detail-main-ss-area'> */}
                <Box height='75%' width='80%'>
                    <Slider
                        className={'gentle-flex'}
                        asNavFor={this.state.nav2}
                        ref={(slider) => (this.slider1 = slider)}
                        variableWidth={true}
                        slidesToShow={1}
                        initialSlide={ssClicked}
                        slider={'img'}
                        infinite={false}
                        centerMode={true}
                        adaptiveHeight={true}
                    >
                        {ss.map((_el, index) => {
                            return (
                                <img className='detail-main-ss' src={prefix + _el} alt={'screenshot ' + (index + 1)} />
                                // <img style={{ height: '600px' }} src={prefix + _el} alt={'screenshot ' + (index + 1)} />
                            );
                        })}
                    </Slider>
                </Box>
                {/* </div> */}
                <section className='detail-bottom-area'>
                    <div className='detail-carousel-section'>
                        <Slider
                            asNavFor={this.state.nav1}
                            ref={(slider) => (this.slider2 = slider)}
                            variableWidth={true}
                            slidesToShow={1}
                            swipeToSlide={true}
                            focusOnSelect={true}
                            arrows={true}
                            initialSlide={ssClicked}
                            infinite={false}
                        >
                            {ss.map((_el, index) => {
                                return (
                                    <img
                                        className='detail-sub-ss'
                                        src={prefix + _el}
                                        alt={'thumbnail ' + (index + 1)}
                                    />
                                );
                            })}
                        </Slider>
                    </div>
                    <section className='detail-info-section'>Map details here...</section>
                </section>
            </>
        );
    }
}

MapDetailPage.propTypes = {
    map: PropTypes.object,
    ssClicked: PropTypes.number,
};

// export default MapDetailPage;
