import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from '@material-ui/core';

TagsList.propTypes = {
    tagsArray: PropTypes.arrayOf(
        PropTypes.shape({
            tagName: PropTypes.string,
            maps: PropTypes.number,
        })
    ),
    clickedTagsList: PropTypes.instanceOf(Set),
    callBackFunc: PropTypes.func,
};

// this function takes an Array of strings, a Set of clicked tags, and a callback Function, and returns a collection of Buttons
export default function TagsList({ visibleTagsList: tagsList, clickedTagsList, callBackFunc }) {
    if (!tagsList || tagsList.length < 0 || !callBackFunc) return <div>Making tags...</div>;
    return (
        <>
            {tagsList.map(([tagName, count]) => {
                const isUnClicked = clickedTagsList && !clickedTagsList.has(tagName);
                return (
                    <Button
                        variant={isUnClicked ? 'outlined' : 'contained'}
                        color={isUnClicked ? 'default' : 'primary'}
                        size='small'
                        key={tagName + '_button'}
                        onClick={() => callBackFunc(tagName)}
                        style={{ marginRight: '5px', marginBottom: '5px' }}
                    >
                        <Badge badgeContent={count} color='secondary'>
                            {tagName} &nbsp;
                        </Badge>
                    </Button>
                );
            })}
        </>
    );
}
