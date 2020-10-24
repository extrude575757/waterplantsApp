import React from 'react';
import { useParams } from 'react-router-dom';



const PlantsList = ( ) =>{

    const { username } = useParams();

const uname = username;
    return (
        <div>
            <p>
                Hello {uname }
            </p>
        </div>
    );
}

export default PlantsList 