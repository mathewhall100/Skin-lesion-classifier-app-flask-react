const ReactMarkdown = window.ReactMarkdown;

class Description extends React.Component {

    render() {
        return (
            <div className="description-text"> 
                <div className="mobile">
                    <hr />
                    <br />
                </div>
                Images of benign and malignant skin lesions were downloaded from the ISIC Skin Lesion Archive (https://www.isic-archive.com) and pre-processed using ImageMagick. A densenet161 model was trained on 5000 images using the fastai deep learning library (https://docs.fast.ai/) and validated on a subset of 20% total images. The model achieved an acccuracy of 88% correctly classifying benign from malignant lesions. Note that this app is not FDA approved, nor is it endorsed by any physician or hospital. It is intended for experiment and demonstration purposes only and should not be used to provide any medical guidance or advice whatsoever. 
            </div>
        );
    }
}
