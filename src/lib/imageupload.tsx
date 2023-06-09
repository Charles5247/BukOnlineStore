import React, { useState } from 'react';

const Myimage = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result;
        setImage(imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="image-upload">Image</label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {image && <img src={image} alt="Uploaded" />}
    </div>
  );
};

export default Myimage;
