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
    const [image, setImage] = useState(dog);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const selectedImage = document.getElementById('detection-image');

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (results.length > 0) {
            const colors = ['red', 'blue', 'green', 'orange', 'purple', 'gray', 'pink', 'brown', 'black', 'yellow'];
            context.drawImage(selectedImage, 0, 0, selectedImage.offsetWidth, selectedImage.offsetHeight);
            results.forEach((result, index) => {
                context.beginPath();
                context.lineWidth = '2';
                context.strokeStyle = colors[index];
                const [ x, y, width, height ] = result.bbox;
                context.strokeRect(x, y, width, height);
            });
        } else {
            context.font = '14px Arial';
            context.textAlign = 'center';
            context.fillText('Results will be shown here', canvas.width / 2, canvas.height / 2);
        }
    }, [results, selectedImage]);

    const detectImage = async () => {
        setLoading(true);
        const model = await cocoSsd.load();
        const predictions = await model.detect(selectedImage, 10, .25);
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
                <option value={dog}>dog</option>
                <option value={street}>street</option>
                <option value={table}>table</option>
                <option value={wine}>wine</option>
            </select>
            <img alt="Detection test" id="detection-image" src={image} />
            <canvas height={selectedImage?.offsetHeight} id="canvas" width={selectedImage?.offsetWidth} />
            {results.length > 0 && results.map(result => (
                <p>{`A${[vowels].includes(result.class.charAt(0)) ? 'n' : ''} ${result.class} with ${Math.round(result.score * 100)}% confidence`}</p>
            ))}
            {results.length === 0 && 
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