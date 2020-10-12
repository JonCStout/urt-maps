import React from 'react';
import { Button } from '@material-ui/core';

// this function takes an Array of strings, a Set of clicked tags, and a callback Function, and returns a collection of Buttons
export default function TagsList({ tagsArray, clickedTagsList, callBackFunc }) {
    if (!tagsArray || !callBackFunc) return <div>Making tags...</div>;

    return (
        <>
            {tagsArray.map((tag) => {
                if (clickedTagsList && !clickedTagsList.has(tag)) {
                    // unclicked button
                    return (
                        <Button
                            variant="outlined"
                            size="small"
                            key={tag + '_button'}
                            onClick={() => callBackFunc(tag)}
                        >
                            {tag}
                        </Button>
                    );
                } else {
                    // clicked button
                    return (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            key={tag + '_button'}
                            onClick={() => callBackFunc(tag)}
                        >
                            {tag}
                        </Button>
                    );
                }
            })}
        </>
    );
}
