import  React from 'react';
import {Spinner as Loader} from 'react-bootstrap';

const SpinnerStyle = {
    position: 'absolute',
    top: 'calc(50%-1rem)',
    left: 'calc(50%-1rem)',   
}

const Spinner= ()=>{

    <Loader style={SpinnerStyle} animation="border" variant="primary"/>
}

export default Spinner;