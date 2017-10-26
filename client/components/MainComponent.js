import React from 'react';
import { checkCat } from '../services/checkImageService';
import ImageUpload from './ImageUploadComponent';

function renderResults(isACat) {
    if (isACat === 'loading') {
        return <img className='loader' src='loader.gif'/>;
    }

    if (isACat === false) {
        return <img className='loader' src='cat_logo_not.png'/>;
    } else if (isACat) {
        return <img className='loader' src='cat_logo_is.png'/>;
    }
}

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isACat: null
        };
    }

    onUpload(image) {
        this.setState({
            isACat: 'loading'
        });
        checkCat(image, (err, isACat) => this.setState({ isACat }));
    }



    render() {
        return (
            <div>
                <header>
                    <img className='logo-img' src='cat_logo_is.png'/>
                    <h1>OR</h1>
                    <img className='logo-img' src='cat_logo_not.png'/>
                </header>
                <div className="results">{renderResults(this.state.isACat)}</div>
                <ImageUpload onUpload={(image) => this.onUpload(image)} />
           </div>
        );
    }
}