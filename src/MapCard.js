import React from 'react';
import PropTypes from 'prop-types';
import './MapCard.css';

export default function MapCard(props) {
    const prefix = `ss/${props.name}/`;

    return (
        <>
            <div className="card">
                <a href={prefix + props.ss[0]}><img className="mainSS" src={prefix + props.ss[0]} alt="main screenshot" /></a>
                <span>
                    <a href={prefix + props.ss[1]}><img
                        className="subSS"
                        src={prefix + props.ss[1]}
                        alt="screenshot 2"
                    /></a>
                    <a href={prefix + props.ss[2]}><img
                        className="subSS"
                        src={prefix + props.ss[2]}
                        alt="screenshot 3"
                    /></a>
                </span>
                <h2 id="name">{props.name}</h2>
            </div>
        </>
    );
}

MapCard.propTypes = {
    name: PropTypes.string,
    ss: PropTypes.arrayOf(PropTypes.string),
};
