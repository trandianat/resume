import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import Button from 'components/Button';
import Title from 'components/Title';
import dog from './images/dog.jpg';
import street from './images/street.jpg';
import table from './images/table.jpg';
import wine from './images/wine.jpg';
import './Detection.scss';

const Detection = () => {
    const [error, setError] = useState(false);
    const [image, setImage] = useState(dog);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const selectedImage = document.getElementById('detection-image');
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    useEffect(() => {
        if (results.length > 0) {
            setError(false);
            const colors = ['red', 'blue', 'green', 'orange', 'purple', 'gray', 'pink', 'brown', 'black', 'yellow'];
            const result = document.getElementById('result');
            const canvas = document.createElement('canvas');
            const width = selectedImage.offsetWidth;
            const height = selectedImage.offsetHeight;
            canvas.id = 'canvas';
            canvas.style.marginTop = '12px';
            canvas.width = width;
            canvas.height = height;
            result.appendChild(canvas);
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(selectedImage, 0, 0, width, height);
            results.forEach((result, index) => {
                context.beginPath();
                context.lineWidth = '2';
                context.strokeStyle = colors[index];
                const [ x, y, width, height ] = result.bbox;
                context.strokeRect(x, y, width, height);
            });
        } else {
            document.getElementById('canvas')?.remove();
        }
    }, [results, selectedImage]);

    const detectImage = async () => {
        setLoading(true);
        const model = await cocoSsd.load();
        try {
            const predictions = await model.detect(selectedImage, 10, .25);
            setResults(predictions);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="detection">
            <Title title="Detection" />
            <span className="detection-text-select">Select an image:</span>
            <select onChange={event => {
                setImage(event.target.value);
                setError(false);
                setResults([]);
            }}>
                <option value={dog}>dog</option>
                <option value={street}>street</option>
                <option value={table}>table</option>
                <option value={wine}>wine</option>
            </select>
            <img alt="Detection test" id="detection-image" src={image} />
            <div id="result" />
            {error && <p className="error"><b>Error in object detection. Please try again.</b></p>}
            {results.length > 0 && results.map(result => (
                <p>{`A${[vowels].includes(result.class.charAt(0)) ? 'n' : ''} ${result.class} with ${Math.round(result.score * 100)}% confidence`}</p>
            ))}
            {(results.length === 0 || error) && 
                <Button
                    className={classNames('detection-button', { loading })}
                    label={loading ? 'Loading...' : 'Detect image'}
                    onClick={() => detectImage()}
                    variant="primary"
                    {...{ disabled: loading }}
                />
            }
        </div>
    );
};

export default Detection;