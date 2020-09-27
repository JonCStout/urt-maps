import React from 'react';
import PropTypes from 'prop-types';
import './MapCard.css';

export default function MapCard(props) {
    const prefix = `ss/${props.name}/`;
    console.log(prefix + props.ss[0]);

    return (
        <>
            <div className="card">
                <img className="mainSS" src={prefix + props.ss[0]} alt="main screenshot" />
                <span>
                    <img
                        className="subSS"
                        src={`ss/${props.name}/${props.ss[1]}`}
                        alt="screenshot 2"
                    />
                    <img
                        className="subSS"
                        src={`ss/${props.name}/${props.ss[2]}`}
                        alt="screenshot 3"
                    />
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
