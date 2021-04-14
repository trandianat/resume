import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import Button from 'components/Button';
import Title from 'components/Title';
import cars from './images/cars.jpeg';
import dog from './images/dog.jpg';
import './Detection.scss';

const Detection = () => {
    const [image, setImage] = useState(cars);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    useEffect(() => {
        const img = document.getElementById('detection-image');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (results.length > 0) {
            canvas.style.border = 'none';
            context.drawImage(img, 0, 0, img.offsetWidth, img.offsetHeight);
            results.forEach(result => {
                context.beginPath();
                context.lineWidth = '2';
                context.strokeStyle = 'red';
                const [ x, y, width, height ] = result.bbox;
                context.strokeRect(x, y, width, height);
            });
        } else {
            canvas.style.border = '1px solid gray';
            context.font = '14px Arial';
            context.textAlign = 'center';
            context.fillText('Results will be shown here', canvas.width / 2, canvas.height / 2);
        }
    }, [results]);

    const detectImage = async () => {
        setLoading(true);
        const model = await cocoSsd.load();
        const predictions = await model.detect(document.getElementById('detection-image'));
        setResults(predictions);
        setLoading(false);
    };
    
    return (
        <div className="detection">
            <Title title="Detection" />
            <span className="detection-text-select">Select an image:</span>
            <select onChange={event => {
                setImage(event.target.value);
                setResults([]);
            }}>
                <option value={cars}>cars</option>
                <option value={dog}>dog</option>
            </select>
            <img alt="Detection test" id="detection-image" src={image} />
            <canvas height={document.getElementById('detection-image')?.offsetHeight} id="canvas" />
            {results.length > 0 && results.map(result => (
                <p>{`A${[vowels].includes(result.class.charAt(0)) ? 'n' : ''} ${result.class} with ${Math.round(result.score * 100)}% confidence`}</p>
            ))}
            {results.length === 0 && 
                <Button
                    className={classNames('detection-button', { loading })}
                    label={loading ? 'Loading...' : 'Detect image'}
                    onClick={() => detectImage()}
                    variant="primary"
                    {...({ disabled: loading })}
                />
            }
        </div>
    );
};

export default Detection;