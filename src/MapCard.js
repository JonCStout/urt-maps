import React from 'react';
import PropTypes from 'prop-types';
import './MapCard.css';
import { Grid } from '@material-ui/core';

export default function MapCard({ cardName, ss, cb }) {
    const prefix = `ss/${cardName}/`;

    return (
        <>
            <div className='card'>
                <button class='bare-button-main' onClick={() => cb(cardName, ss[0])}>
                    <img className='main-ss' src={prefix + ss[0]} alt='main screenshot' />
                </button>
                <span>
                    <button class='bare-button-sub bare-button-sub-left' onClick={() => cb(cardName, ss[1])}>
                        <img className='sub-ss' src={prefix + ss[1]} alt='screenshot 2' />
                    </button>
                    <button class='bare-button-sub bare-button-sub-right' onClick={() => cb(cardName, ss[2])}>
                        <img className='sub-ss' src={prefix + ss[2]} alt='screenshot 3' />
                    </button>
                </span>
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item xs={2}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={8}>
                        <h2 id='title'>{cardName}</h2>
                    </Grid>
                    <Grid item xs={2}>
                        {ss.length > 3 ? (
                            <button class='more-button' onClick={() => cb(cardName, ss[3])} title='more screenshots'>
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
    cardName: PropTypes.string,
    ss: PropTypes.arrayOf(PropTypes.string),
    cb: PropTypes.func,
};
