import React from "react";

const Homepage = ()=>{

    return (
        <div className="homepage-container">
            <div className="input-container">
                <input type="email" placeholder="Enter your email here" />
                <input type="text" placeholder="Enter room code" />
                <button>submit</button>
            </div>
        </div>
    )
}

export default Homepage