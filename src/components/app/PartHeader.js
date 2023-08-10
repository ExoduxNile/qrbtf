import React from "react";
import '../Qrcode.css';
import InputText from "../../containers/app/InputText";
import QrbtfLogo from "../svg/QrbtfLogo";

const PartHeader = () => (
    <div className="Qr-Centered">
        <div>
            <h1 className="Qr-title"><QrbtfLogo className="Qr-title-svg" /></h1>
        </div>
        <p className="Qr-subtitle">Parametric QR Code Generator</p>
        <InputText/>
    </div>
)

export default PartHeader
