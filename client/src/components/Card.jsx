import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => (
  <div className="containers">
  
  <div className="card_img">
    <img  src={photo} alt={prompt} />

  <div className="card-prompt">
    <p className="card-text">{prompt}</p>
      <div className="card_content">
        <p>@ {name}</p>
        <button className="downBtn" onClick={() => downloadImage(_id, photo)} >
          <img className="imgg" src={download} alt="download" />
        </button>
      </div>
  </div>

  </div>


</div>
);

export default Card;



