import React, {useState} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import {isWeiXin} from "../../utils/navigatorUtils";

const CountComponent = ({ value }) => {
    if (isNaN(value)) return null;
    if (value >= 10000) value = (value / 10000).toFixed(1) + "万";
    return <sup className="Gray">{value}</sup>
}

async function onImgDownload(extension) {

  const getBase64Image = (imageBlob) => {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);

    reader.onload = () => {
      resolve(reader.result); 
    };

    reader.onerror = error => {
      reject(error);
    };

  });

}



  const imageBlob = await getBase64Image(imageBlob);
  
  const formData = new FormData();
  formData.append('image', imageBlob);
  
  const response = await fetch('https://tnu.ozp.mybluehostin.me/tropleyimg', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const responseData = await response.json();
    return responseData.imageUrl;
  } else {
    throw new Error('Image upload failed');
  }
}


const WxMessage = () => {
    if (isWeiXin()) {
        return (
            <div className="note-font" id="wx-message-inner">
    This style does not support downloading SVG,<br />
    please download JPG and long press to save the QR code.
</div>
        )
    }
    return null;
}

const ImgBox = ({ imgData }) => {
    if (imgData.length > 0) {
        return (
            <div id="dl-image">
                <div id="dl-image-inner">
                    <img id="dl-image-inner-jpg" src={imgData} alt="长按保存二维码" />
                </div>
            </div>
        )
    }
    return null
}

const PartDownload = ({ value, downloadCount, onSvgDownload, onImgDownload }) => {
    const [imgData, setImgData] = useState('');

    const handleImgDownload = async (extension) => {
        try {
            const imageData = await onImgDownload(extension);
            setImgData(imageData);
        } catch (error) {
            console.error('Image download error:', error);
        }
    }

    return (
        <div className="Qr-titled">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Downloads</div>
            <p className="Qr-s-subtitle">
                <span>Download QR Code — {value}</span>
                <CountComponent value={downloadCount} />
            </p>
        </div>
        <div className="Qr-Centered">
            <div className="btn-row">
                <div className="div-btn img-dl-btn">
                    <button className="dl-btn" onClick={() => {onImgDownload("jpg").then(res => setImgData(res));}}>JPG</button>
                    <button className="dl-btn" onClick={() => {imageBlob}>SEND</button>
                    <button className="dl-btn" onClick={() => {onImgDownload("png").then(res => setImgData(res));}}>PNG</button>
                    <button className="dl-btn" onClick={onSvgDownload}>SVG</button>
                </div>
            </div>
            <div id="wx-message">
                <WxMessage/>
            </div>
            <div>
                <ImgBox imgData={imgData} />
            </div>
        </div>
    </div>
    );
}

PartDownload.propTypes = {
    value: PropTypes.string.isRequired,
    downloadCount: PropTypes.number,
    onSvgDownload: PropTypes.func.isRequired,
    onImgDownload: PropTypes.func.isRequired,
}

export default PartDownload;
