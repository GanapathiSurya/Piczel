import React from 'react';
import ImageGrid from './ImageGrid';
import Title from './title'
import UploadForm from './uploadForm';
export default function FirstPage() {
        return (
        <div>
            <Title></Title>
            <br></br>
            <br></br>
            <div className="content-part">
            <UploadForm/>
            </div>
            <ImageGrid></ImageGrid>
        </div>
    )
}
