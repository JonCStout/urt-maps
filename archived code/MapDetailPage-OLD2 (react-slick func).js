import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './MapDetailPage.css';

function MapDetailPage({ map, ssClicked }) {
    const topSliderRef = useRef(null);
    const bottomSliderRef = useRef(null);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    useEffect(() => {
        setNav1(topSliderRef.current);
        setNav2(bottomSliderRef.current);
        debugger;
    }, []);

    if (!map || ssClicked === undefined) return <p>EMPTY PARAMETERS PASSED</p>; // returns have to be after hooks

    const settingsTopSlider = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        slidesPerRow: 1,
        centerMode: true,
        variableWidth: true,
        slider: 'img',
    };

    const settingsBottomSlider = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 1,
        slidesPerRow: 3,
        centerPadding: '10px',
        centerMode: true,
    };

    const prefix = `ss/${map._id}/`;
    const ss = map.screenShots; // shortcut

    return (
        <>
            <div className='detail-main-ss-area'>
                <Slider {...settingsTopSlider} asNavFor={nav2} ref={(_ref) => (topSliderRef.current = _ref)}>
                    {/* <Slider {...settingsTopSlider} asNavFor={bottomSliderRef.current} ref={topSliderRef.current}> */}
                    <img className='detail-main-ss' src={prefix + ss[0]} alt='screenshot 1' />
                    <img className='detail-main-ss' src={prefix + ss[1]} alt='screenshot 2' />
                    <img className='detail-main-ss' src={prefix + ss[2]} alt='screenshot 3' />
                </Slider>
            </div>
            <div className='detail-bottom-area'>
                <div className='detail-carousel-section'>
                    <Slider {...settingsBottomSlider} asNavFor={nav1} ref={(_ref) => (bottomSliderRef.current = _ref)}>
                        {/* <Slider {...settingsBottomSlider} asNavFor={topSliderRef.current} ref={bottomSliderRef.current}> */}
                        <div>
                            <img className='detail-sub-ss' src={prefix + ss[0]} alt='screenshot 1' />
                        </div>
                        <div>
                            <img className='detail-sub-ss' src={prefix + ss[1]} alt='screenshot 2' />
                        </div>
                        <div>
                            <img className='detail-sub-ss' src={prefix + ss[2]} alt='screenshot 3' />
                        </div>
                    </Slider>
                </div>
                <div className='detail-info-section'>Map details here...</div>
            </div>
        </>
    );
}

MapDetailPage.propTypes = {
    map: PropTypes.object,
    ssClicked: PropTypes.number,
};

export default MapDetailPage;
