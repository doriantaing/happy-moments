import React from 'react';

const Loader = ({percentage}) => {
    return(
        <div className='loader'>
            <div className="loader-anim">
                <div className="circle first"/>
                <div className="circle second"/>
                <div className="circle third"/>
            </div>
            <div className="progress-bar">
                <span className="progress-bar_fill" style={{width: `${percentage}%`}}/>
            </div>
            <div className="loader-title">
                <h3>Loading</h3>
            </div>
        </div>
    )
};

export default Loader;