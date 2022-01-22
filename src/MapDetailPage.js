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
    const queryStates = { NOTSTARTED: 1, SUCCESS: 1, FAILED: 2 };

    const [map, updateMap] = useState(null);
    const [queryState, updateQueryState] = useState(queryStates.NOTSTARTED);

    useEffect(() => {
        mapdb.connect().then(() => {
            mapdb.get(mapId).then(
                (dbresult) => {
                    updateMap(dbresult);
                    updateQueryState(queryStates.SUCCESS);
                    console.log('updating map with ' + dbresult);
                },
                (err) => {
                    updateQueryState(queryStates.FAILED);
                }
            );
        });
    }, [mapId, queryStates]);

    return (
        <div>
            {queryState === queryStates.FAILED && (
                <div>
                    <h1>Map Not Found</h1>
                    <p>Unable to find map {mapId}</p>
                </div>
            )}
            {map && (
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
            )}
        </div>
    );
}

MapDetailPage.propTypes = {
    map: PropTypes.object,
    ssIdx: PropTypes.number,
};

export default MapDetailPage;
