import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from '@material-ui/core';

// this function takes an Array of strings, a Set of clicked tags, and a callback Function, and returns a collection of Buttons
export default function TagsList({ tagsArray, clickedTagsList, callBackFunc }) {
    if (!tagsArray || !callBackFunc) return <div>Making tags...</div>;

    return (
        <>
            {tagsArray.map(([tagName, maps]) => {
                if (clickedTagsList && !clickedTagsList.has(tagName)) {
                    // unclicked button
                    return (
                        <Badge badgeContent={maps.length} color='secondary'>
                            <Button
                                variant='outlined'
                                size='small'
                                key={tagName + '_button'}
                                onClick={() => callBackFunc(tagName)}
                                style={{ marginRight: '5px', marginBottom: '5px' }}>
                                {tagName}
                            </Button>
                        </Badge>
                    );
                } else {
                    // clicked button
                    return (
                        <Badge badgeContent={maps.length} color='secondary'>
                            <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                key={tagName + '_button'}
                                onClick={() => callBackFunc(tagName)}
                                style={{ marginRight: '5px', marginBottom: '5px' }}>
                                {tagName}
                            </Button>
                        </Badge>
                    );
                }
            })}
        </>
    );
}

TagsList.propTypes = {
    tagsArray: PropTypes.arrayOf(PropTypes.object),
    clickedTagsList: PropTypes.arrayOf(PropTypes.string),
    callBackFunc: PropTypes.func,
};
