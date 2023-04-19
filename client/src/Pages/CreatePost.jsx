import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { Form, Loader, Navbar } from '../components';
import loader from "../assets/x.gif" 


const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:5959/api/v1/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   // to prevent reloading

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5959/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        // alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <div className="createPost">
    <div>
      <Navbar/>
    </div>
    <div className="create-section">
      <div className="post-header">
        <h1>Create</h1>
        <p>Generate an imaginative image through our AI Image generator and share it with the community.</p>
      </div>

      <form  onSubmit={handleSubmit}>
        <div className="form-content">
          <Form
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <Form
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          {/* displaying req image */}  
          <div className="post-image">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="post-image-img"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="post-image-img"
              />
            )}

            {generatingImg && (
              <div className = "loader-image">
                <Loader />
                </div>
            )}
          </div>
        </div>
        
        <div className="cust-buttons">
          <button
            type="button"
            onClick={generateImage}
            className="cust-button1"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>

          <button
            type="submit"
            className="cust-button2"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
          </div>

      </form>
      <div className="footer">
       <p>© Manav - 2023</p> 
      </div>
      
    </div>

    </div>
  );
};

export default CreatePost;