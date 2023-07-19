import React from "react"
import './IndividualImage.css'

export const IndividualImage = ({image}) => {
    const imageSize = document.getElementsByTagName('img').size;

    return (
        <div className="photo">
            <img 
                src={image.urls.small} 
                alt="unsplash image"
                onClick={() => {window.open(image.links.html,"_blank");}}
            />
            {image.description ? <h4>{image.alt_description}</h4> : <h3 id='no_desc'>No Description</h3>}
        </div>
    )
}

/*import React from 'react'
import {IndividualImage} from './IndividualImage'

export default function Images({images}) {
    images.map((image) => (
        <IndividualImage key={image.id} image={image} />
    ))
}*/