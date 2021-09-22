import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import './MapDetailPage.css';

SwiperCore.use([Navigation]);
function MapDetailPage({ map, ssIdx }) {
    const prefix = `ss/${map._id}/`; // path prefix
    const ss = map.screenShots; // coding shortcut

    return (
        <>
            <Swiper navigation={true} spaceBetween={20} centeredSlides={true} className='mySwiper'>
                {ss.map((_el, index) => {
                    return (
                        <SwiperSlide>
                            <img src={prefix + _el} alt={'screenshot ' + (index + 1)} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}

MapDetailPage.propTypes = {
    map: PropTypes.object,
    ssIdx: PropTypes.number,
};

export default MapDetailPage;
