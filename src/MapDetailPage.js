import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
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

    const [map, updateMap] = useState(null);

    useEffect(() => {
        mapdb.connect().then(() => {
            mapdb.get(mapId).then((dbresult) => {
                updateMap(dbresult);
                console.log('updating map with ' + dbresult);
            });
        });
    }, [mapId]);

    return (
        map && (
            <div>
                <h1>Map: {map.pk3}</h1>
                <Link to='/'>Back to home</Link>
                <Swiper navigation={true} spaceBetween={20} centeredSlides={true} className='mySwiper'>
                    {map.screenShots.map((_el, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img src={'/ss/' + map._id + '/' + _el} alt={'screenshot ' + (index + 1)} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        )
    );
}

MapDetailPage.propTypes = {
    map: PropTypes.object,
    ssIdx: PropTypes.number,
};

export default MapDetailPage;
