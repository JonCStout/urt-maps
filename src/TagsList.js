import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';

TagsList.propTypes = {
    tagsArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string, PropTypes.number)),
    clickedTagsList: PropTypes.instanceOf(Set),
    callBackFunc: PropTypes.func,
};

// this function takes an Array of strings+counts, a Set of clicked tags, and a callback Function, and returns a collection of Buttons
export default function TagsList({ visibleTagsList: tagsList, clickedTagsList, callBackFunc }) {
    if (!tagsList || tagsList.length < 0 || !callBackFunc) return <div>Making tags...</div>;
    return (
        <div style={{ paddingLeft: '.2rem' }}>
            {tagsList.map(([tagName, count]) => {
                const isUnClicked = clickedTagsList && !clickedTagsList.has(tagName);
                return (
                    <Button
                        variant={isUnClicked && count < 2 ? 'outlined' : 'contained'}
                        color={isUnClicked ? 'secondary' : 'success'}
                        size='small'
                        key={tagName + '_button'}
                        onClick={() => callBackFunc(tagName)}
                        style={{ marginRight: '5px', marginBottom: '5px', paddingBottom: '1px' }}
                    >
                        <Badge badgeContent={count} color='primary'>
                            {tagName} &nbsp;
                        </Badge>
                    </Button>
                );
            })}
        </div>
    );
}
