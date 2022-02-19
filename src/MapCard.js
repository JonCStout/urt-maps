import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Grid } from '@mui/material';
import Grid from '@mui/material/Grid';
import './MapCard.css';

export default function MapCard({ map }) {
    const ss = map.screenShots; // abreviate, simplify code typing
    const prefix = `ss/${map._id}/`; // start of path
    const displayName = map._id.replace(/_/g, ' ');

    return (
        <>
            <div className='card'>
                <Link className='ss-links main-ss-link' to={'/map/' + displayName + '?ss=0'}>
                    <img className='main-ss-img' src={prefix + ss[0]} alt='main screenshot' />
                </Link>
                <span>
                    <Link className='ss-links sub-ss-link-left' to={'/map/' + displayName + '?ss=1'}>
                        <img className='sub-ss-img' src={prefix + ss[1]} alt='screenshot 2' />
                    </Link>
                    <Link className='ss-links sub-ss-link-right' to={'/map/' + displayName + '?ss=2'}>
                        <img className='sub-ss-img' src={prefix + ss[2]} alt='screenshot 3' />
                    </Link>
                </span>
                <Grid container direction='row' justifyContent='center' alignItems='center'>
                    <Grid item xs={2}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={8}>
                        <h2 id='title'>{displayName}</h2>
                    </Grid>
                    <Grid item xs={2}>
                        {ss.length > 3 ? (
                            <Link className='more-button' to={'/map/' + displayName + '?ss=3'}>
                                +more screenshots
                            </Link>
                        ) : null}
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

MapCard.propTypes = {
    map: PropTypes.object,
};
