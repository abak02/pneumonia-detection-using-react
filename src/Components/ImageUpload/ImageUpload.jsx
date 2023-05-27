import { useState } from "react";
import axios from 'axios';

const ImageUpload = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [result, setResult] = useState('');
    const handleImageUpload = async (e)=>{
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('image', file);

        try{
            const response = await axios.post('/upload',formData,{
                headers:{'Content-Type': 'multipart/form-data'}
            })

            setResult(response.data.result);
        }catch(err){
            console.log(err);
        }
    }


    return (
        <div>
            <h1>Pneumonia Detection</h1>
            <h2>Upload Your Image</h2>
            <input type="file" accept="image/*" name="" id="" onChange={handleImageUpload} />
            {selectedImage && <img src={selectedImage} alt="Uploaded" />}
            {result && <p>Result: {result}</p>}
        </div>
    );
};

export default ImageUpload;