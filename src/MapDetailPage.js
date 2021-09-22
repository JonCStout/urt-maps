import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import './MapDetailPage.css';

function MapDetailPage({ map, ssIdx }) {
    const prefix = `ss/${map._id}/`; // path prefix
    const ss = map.screenShots; // coding shortcut

    return (
        <>
            <Box height='75%' width='80%'>
                <Swiper className='mySwiper'>
                    {ss.map((_el, index) => {
                        return (
                            <SwiperSlide>
                                <img className='detail-main-ss' src={prefix + _el} alt={'screenshot ' + (index + 1)} />
                            </SwiperSlide>
                            // <img style={{ height: '600px' }} src={prefix + _el} alt={'screenshot ' + (index + 1)} />
                        );
                    })}
                </Swiper>
            </Box>
        </>
    );
}

MapDetailPage.propTypes = {
    map: PropTypes.object,
    ssIdx: PropTypes.number,
};

export default MapDetailPage;
