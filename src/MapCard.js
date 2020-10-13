import React from 'react';
import PropTypes from 'prop-types';
import './MapCard.css';

export default function MapCard({ name, ss }) {
    const prefix = `ss/${name}/`;

    return (
        <>
            <div className='card'>
                <a href={prefix + ss[0]}>
                    <img className='mainSS' src={prefix + ss[0]} alt='main screenshot' />
                </a>
                <span>
                    <a href={prefix + ss[1]}>
                        <img className='subSS subSS-left' src={prefix + ss[1]} alt='screenshot 2' />
                    </a>
                    <a href={prefix + ss[2]}>
                        <img className='subSS subSS-right' src={prefix + ss[2]} alt='screenshot 3' />
                    </a>
                </span>
                <span>
                    {ss.length > 3 ? (
                        <a href={prefix + ss[3]} alt='more screenshots'>
                            {/* ^ *** link to carousel later */}
                            +more
                        </a>
                    ) : null}
                    <h2 id='name'>{name}</h2>
                </span>
            </div>
        </>
    );
}

MapCard.propTypes = {
    name: PropTypes.string,
    ss: PropTypes.arrayOf(PropTypes.string),
};
