import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeComponent } from '../navbar/navbar.reducer';

const Audience = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeComponent('Audience'));
    },[dispatch]);
    return(
        <h1>Audience</h1>
    )
}

export default Audience;