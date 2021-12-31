import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import mapdb from './MapData2';
import 'swiper/swiper.min.css'; // can't use swiper/css as in examples; need a specific .css file for now, (maybe React 18, webpack 5, or a fixed swiper@7 will change that)
import 'swiper/components/navigation/navigation.min.css'; // ditto for swiper/css/navigation
import './MapDetailPage.css';

SwiperCore.use([Navigation]);

function MapDetailPage() {
    let params = useParams();
    let mapId = params.id;

    let map = mapdb.getAll(mapId); // todo
    const prefix = `ss/${map._id}/`; // path prefix
    const ss = map.screenShots; // coding shortcut

    return (
        <>
            <h1></h1>
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
