import React from 'react';
import PropTypes from 'prop-types';

function MapDetailPage({ map, ssClicked }) {
    if (!map || !ssClicked) return <p>EMPTY PARAMETERS PASSED</p>;

    const prefix = `ss/${map._id}/`;

    return (
        <div style={{ height: 'fitContent(100)' }}>
            <div style={{ minWidth: '100%', maxHeight: '80%' }}>
                <img src={prefix + ssClicked} alt={'screenshot ' + ssClicked} />
            </div>
        </div>
    );
}

MapDetailPage.propTypes = {
    map: PropTypes.object,
    ssClicked: PropTypes.string,
};

export default MapDetailPage;
