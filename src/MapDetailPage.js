import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import Grid from '@mui/material/Grid';
import mapdb from './mapData';
import 'swiper/css';
import 'swiper/css/navigation';
import './MapDetailPage.css';

SwiperCore.use([Navigation, Thumbs]);

function MapDetailPage() {
    let params = useParams();
    let mapId = params.id;
    const queryStates = { NOTSTARTED: 0, SUCCESS: 1, FAILED: 2 };

    const [searchParams] = useSearchParams(); // don't need set function, so don't destructure it
    const [map, updateMap] = useState(null);
    const [queryState, updateQueryState] = useState(queryStates.NOTSTARTED);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        mapdb.connect().then(() => {
            mapdb.get(mapId).then(
                (dbresult) => {
                    updateMap(dbresult);
                    updateQueryState(queryStates.SUCCESS);
                    document.title = 'UrT Map Finder Repo | ' + dbresult._id;
                },
                (err) => {
                    updateQueryState(queryStates.FAILED);
                    document.title = 'UrT Map Finder Repo | Unable to find map';
                }
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapId]);

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
                    <header className='App-header mini'>
                        <h1>
                            <Link to='/urt-maps'>URT MAP FINDER</Link>
                        </h1>
                    </header>
                    <Swiper
                        navigation={true}
                        spaceBetween={20}
                        centeredSlides={true}
                        className='mainSwiper'
                        thumbs={{ swiper: thumbsSwiper }}
                        initialSlide={searchParams.get('ss') || 0}
                    >
                        {map.screenShots.map((_el, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <img
                                        src={'/urt-maps/ss/' + map._id + '/' + _el}
                                        alt={'screenshot ' + (index + 1)}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    <main className='main'>
                        <div className='thumbnails'>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[Navigation, Thumbs]}
                                className='miniSwiper'
                            >
                                {map.screenShots.map((_el, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={'/urt-maps/ss/' + map._id + '/' + _el}
                                                alt={'screenshot ' + (index + 1)}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                        <div className='mapDetails'>
                            <Grid container>
                                <Grid item md={2}>
                                    <span className='label'>Map:</span>
                                </Grid>
                                <Grid item md={4}>
                                    <span className='detail'>
                                        <strong>{map._id}</strong>
                                    </span>
                                </Grid>
                                <Grid item md={2}>
                                    <span className='label'>Play Size:</span>
                                </Grid>
                                <Grid item md={4}>
                                    <span className='detail'>{map.playSize}</span>
                                </Grid>
                                <Grid item md={2}>
                                    <span className='label'>Author:</span>
                                </Grid>
                                <Grid item md={10}>
                                    <span className='detail'>{map.creator}</span>
                                </Grid>
                                <Grid item md={2}>
                                    <span className='label'>File:</span>
                                </Grid>
                                <Grid item md={10}>
                                    <span className='detail'>{map.pk3}.pk3</span>
                                </Grid>
                                <Grid item md={2}>
                                    <span className='label'>Download:</span>
                                </Grid>
                                <Grid item md={10}>
                                    <span className='detail'>
                                        {map.pk3 !== 'built-in' && map.pk3 !== undefined ? (
                                            <a href={`http://pub.fsk405.com/maps/q3ut4/${map.pk3}.pk3`}>FSK mirror</a>
                                        ) : null}{' '}
                                        [ {map.fileSize} ]
                                    </span>
                                </Grid>
                            </Grid>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}

export default MapDetailPage;
