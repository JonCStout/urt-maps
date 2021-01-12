import React from 'react';
import PropTypes from 'prop-types';
import './MapCard.css';
import { Grid } from '@material-ui/core';

export default function MapCard({ map, cb }) {
    const ss = map.screenShots;
    const prefix = `ss/${map._id}/`;

    return (
        <>
            <div className='card'>
                <button className='bare-button-main' onClick={() => cb(map, 0)}>
                    <img className='main-ss' src={prefix + ss[0]} alt='main screenshot' />
                </button>
                <span>
                    <button className='bare-button-sub bare-button-sub-left' onClick={() => cb(map, 1)}>
                        <img className='sub-ss' src={prefix + ss[1]} alt='screenshot 2' />
                    </button>
                    <button className='bare-button-sub bare-button-sub-right' onClick={() => cb(map, 2)}>
                        <img className='sub-ss' src={prefix + ss[2]} alt='screenshot 3' />
                    </button>
                </span>
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item xs={2}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={8}>
                        <h2 id='title'>{map._id}</h2>
                    </Grid>
                    <Grid item xs={2}>
                        {ss.length > 3 ? (
                            <button className='more-button' onClick={() => cb(map, 3)} title='more screenshots'>
                                {/* ^ *** link to carousel later */}
                                +more screenshots
                            </button>
                        ) : null}
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

MapCard.propTypes = {
    map: PropTypes.object,
    cb: PropTypes.func,
};
