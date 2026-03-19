import { useEffect, useState } from 'react';
import axios from 'axios';
import 'primeicons/primeicons.css';


const ImageByTopic = ({ topic }) => {
    const [imageUrl, setImageUrl] = useState('');
    const API_KEY = 'My_Pexels_API_Key'; // Replace with my key- you can email me or get your own key from https://www.pexels.com/api/
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`https://api.pexels.com/v1/search`, {
                    headers: {
                        Authorization: API_KEY
                    },
                    params: {
                        query: topic,
                        per_page: 1
                    }
                });
                if (response.data.photos.length > 0) {
                    setImageUrl(response.data.photos[0].src.large);
                }
            } catch (error) {
                console.error('Error fetching image from Pexels:', error);
            }
        };

        fetchImage();
    }, [topic]);

    return (
        <div>
            {imageUrl ? <img
                src={imageUrl}
                alt={topic}
                style={{}}
            /> : <p style={{ color: 'orange' }}>
                <i className="pi pi-spin pi-spinner"></i>
                Loading...
            </p>}
        </div>
    );
};

export default ImageByTopic;
