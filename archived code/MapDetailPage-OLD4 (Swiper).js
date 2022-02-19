import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import './MapDetailPage.css';

function MapDetailPage({ map, ssClicked }) {
    const prefix = `url(ss/${map._id}/`;
    const ss = map.screenShots;

    const galleryThumbs = useRef();
    const galleryTop = useRef();

    // the divs that the Swiper functions try to find may not exist until after the component is mounted
    useEffect(() => {
        galleryThumbs.current = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 3,
            loop: true,
            freeMode: true,
            loopedSlides: 3, //looped slides should be the same
            grabCursor: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        galleryTop.current = new Swiper('.gallery-top', {
            spaceBetween: 10,
            loop: true,
            loopedSlides: 3, //looped slides should be the same
            grabCursor: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: galleryThumbs.current,
            },
        });
    }, []);

    if (!map || ssClicked === undefined) return <p>EMPTY PARAMETERS PASSED</p>; // returns have to be after useEffect

    return (
        <>
            <div className='swiper-container gallery-top'>
                <div className='swiper-wrapper'>
                    <div className='swiper-slide' style={{ backgroundImage: prefix + ss[0] + ')' }}></div>
                    <div className='swiper-slide' style={{ backgroundImage: prefix + ss[1] + ')' }}></div>
                    <div className='swiper-slide' style={{ backgroundImage: prefix + ss[2] + ')' }}></div>
                </div>

                <div className='swiper-button-next swiper-button-white'></div>
                <div className='swiper-button-prev swiper-button-white'></div>
            </div>

            <div className='detail-bottom-area'>
                <div className='swiper-container detail-carousel-section'>
                    <div className='swiper-wrapper gallery-thumbs'>
                        <div className='swiper-slide' style={{ backgroundImage: prefix + ss[0] + ')' }}></div>
                        <div className='swiper-slide' style={{ backgroundImage: prefix + ss[1] + ')' }}></div>
                        <div className='swiper-slide' style={{ backgroundImage: prefix + ss[2] + ')' }}></div>
                    </div>
                </div>
                <div className='detail-info-section'>Map details here...</div>
            </div>

            {/* <div className='detail-main-ss-area'>
                <img className='detail-main-ss' src={prefix + ss[ssClicked]} alt={'screenshot ' + ss[ssClicked]} />
            </div>
            <div className='detail-bottom-area'>
                <span className='detail-carousel-section'>Carousel here...</span>
                <span className='detail-info-section'>Map details here...</span>
            </div> */}
        </>
    );
}

MapDetailPage.propTypes = {
    map: PropTypes.object,
    ssClicked: PropTypes.number,
};

export default MapDetailPage;
