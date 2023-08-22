import React, {useState} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import {isWeiXin} from "../../utils/navigatorUtils";
import axios from 'axios';
import {saveImg, saveSvg} from "../../utils/downloader";
import {getDownloadCount, increaseDownloadData, recordDownloadDetail} from "../../api/TcbHandler";
import {getParamDetailedValue, outerHtml} from "../../utils/util";
import {handleDownloadImg, handleDownloadSvg} from "../../utils/gaHelper";

const CountComponent = ({ value }) => {
    if (isNaN(value)) return null;
    if (value >= 10000) value = (value / 10000).toFixed(1) + "万";
    return <sup className="Gray">{value}</sup>
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


const handleImageDownload = (type) => {
  return new Promise(resolve => {
    saveImg(state.value, outerHtml(state.selectedIndex), 1500, 1500, type).then(image => {
      fetch('/upload-image', {
        method: 'POST',
        body: image
      })
      .then(response => {
        saveDB(state, type, ownProps.updateDownloadData);
        handleDownloadImg(state.value, type);
        resolve(response);  
      });
    });
  });
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
                    <button className="dl-btn" onClick={() => {onImgDownload("png").then(res => setImgData(res));}}>PNG</button>
                    <button className="dl-btn" onClick={onSvgDownload}>SVG</button>
                    <button 
  className="dl-btn"
  onClick={() => {
    handleImageDownload("png").then(response => {
      setImgData(response);
    });
  }}
>
  PNG
</button>
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
