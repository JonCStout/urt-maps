import React from 'react';
import { Button } from '@material-ui/core';

// this function takes an array of strings and a callback function, and returns a collection of Buttons
export default function TagsList({ tagsArray, callBackFunc }) {
    if (!tagsArray || !callBackFunc) return <div>Making tags...</div>;

    return (
        <>
            {tagsArray.map((tag) => {
                return (
                    <Button variant="outlined" size="small" onClick={() => callBackFunc(tag)}>
                        {tag}
                    </Button>
                );
            })}
        </>
    );
}
