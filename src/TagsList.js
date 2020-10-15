import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from '@material-ui/core';

TagsList.propTypes = {
    tagsArray: PropTypes.arrayOf(
        PropTypes.shape({
            tagName: PropTypes.string,
            maps: PropTypes.arrayOf(PropTypes.string),
        })
    ),
    clickedTagsList: PropTypes.instanceOf(Set),
    callBackFunc: PropTypes.func,
};

// this function takes an Array of strings, a Set of clicked tags, and a callback Function, and returns a collection of Buttons
export default function TagsList({ visibleTagsList, clickedTagsList, callBackFunc }) {
    if (!visibleTagsList || visibleTagsList.length < 0 || !callBackFunc) return <div>Making tags...</div>;
    return (
        <>
            {visibleTagsList.map(([tagName, maps]) => {
                if (clickedTagsList && !clickedTagsList.has(tagName)) {
                    // unclicked button
                    return (
                        <Button
                            variant='outlined'
                            size='small'
                            key={tagName + '_button'}
                            onClick={() => callBackFunc(tagName)}
                            style={{ marginRight: '5px', marginBottom: '5px' }}>
                            <Badge badgeContent={maps.length} color='secondary'>
                                {tagName} &nbsp;
                            </Badge>
                        </Button>
                    );
                } else {
                    // clicked button
                    return (
                        <Button
                            variant='contained'
                            color='primary'
                            size='small'
                            key={tagName + '_button'}
                            onClick={() => callBackFunc(tagName)}
                            style={{ marginRight: '5px', marginBottom: '5px' }}>
                            <Badge badgeContent={maps.length} color='secondary'>
                                {tagName} &nbsp;
                            </Badge>
                        </Button>
                    );
                }
            })}
        </>
    );
}
