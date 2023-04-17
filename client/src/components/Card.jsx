import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => (
  <div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3">
  
  <div className="card-image">
    <img src={photo} alt={prompt} />

    <div className="card-prompt">
      <p className="card-text">{prompt}</p>
    </div>
  </div>
    
    
  <div className="card-body">
    <p className="card-title">{name}</p>
    <button type="button" onClick={() => downloadImage(_id, photo)} >
      <img src={download} alt="download" />
    </button>
  </div>

</div>
);

export default Card;



