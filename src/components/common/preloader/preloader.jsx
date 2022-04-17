import React from 'react'
import loaderImg from '../../../assets/images/loading.gif'

const Preloader = () => {
    return (
        <div>
            <img src={loaderImg} style={{ position: 'absolute' }} /> 
        </div>
    )
}

export default Preloader