import React from 'react';
import PropTypes from 'prop-types';
import './MapCard.css';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function MapCard({ map }) {
    const ss = map.screenShots; // abreviate, simplify code typing
    const prefix = `ss/${map._id}/`; // start of path
    const displayName = map._id.replace(/_/g, ' ');

    return (
        <>
            <div className='card'>
                <Link to={'/map/' + displayName + '?ss=0'} className='bare-button-main'>
                    <img className='main-ss' src={prefix + ss[0]} alt='main screenshot' />
                </Link>
                <span>
                    <Link to={'/map/' + displayName + '?ss=1'} className='bare-button-sub bare-button-sub-left'>
                        <img className='sub-ss' src={prefix + ss[1]} alt='screenshot 2' />
                    </Link>
                    <Link to={'/map/' + displayName + '?ss=2'} className='bare-button-sub bare-button-sub-right'>
                        <img className='sub-ss' src={prefix + ss[2]} alt='screenshot 3' />
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
                            <Link to={'/map/' + displayName + '?ss=3'} className='more-button'>
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
