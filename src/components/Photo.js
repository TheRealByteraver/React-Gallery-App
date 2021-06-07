import React from 'react';

export default function Photo(props) {
    return (
        <li>
            <img src={props.src} alt="" />
        </li>
    );
}