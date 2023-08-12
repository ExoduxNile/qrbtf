import React, {useEffect, useMemo, useState} from "react";
import {gamma} from "../../utils/imageUtils";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";
import {defaultResImage} from "../../constant/References";
import {getExactValue, getIdNum} from "../../utils/util";

function listPoints({ qrcode, params, icon }) {
    if (!qrcode) return []
console.log(icon)
    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);
    let alignType = params[3];
    let timingType = params[4];
    let posColor = params[6];

    let id = 0;
    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            const posX = 3 * x, posY = 3 * y;
            if (typeTable[x][y] === QRPointType.ALIGN_CENTER || typeTable[x][y] === QRPointType.ALIGN_OTHER) {
                if (qrcode.isDark(x, y)) {
                    if (alignType === 2) {
                        pointList.push(<use key={id++} xlinkHref="#B-black" x={posX - 0.03} y={posY - 0.03}/>)
                    } else {
                        pointList.push(<use key={id++} xlinkHref="#S-black" x={posX + 1 - 0.01} y={posY + 1 - 0.01}/>)
                    }
                } else {
                    if (alignType === 0) {
                        pointList.push(<use key={id++} xlinkHref="#S-white" x={posX + 1} y={posY + 1}/>)
                    } else {
                        pointList.push(<use key={id++} xlinkHref="#B-white" x={posX - 0.03} y={posY - 0.03}/>)
                    }
                }
            } else if (typeTable[x][y] === QRPointType.TIMING) {
                if (qrcode.isDark(x, y)) {
                    if (timingType === 2) {
                        pointList.push(<use key={id++} xlinkHref="#B-black" x={posX - 0.03} y={posY - 0.03}/>)
                    } else {
                        pointList.push(<use key={id++} xlinkHref="#S-black" x={posX + 1} y={posY + 1}/>)
                    }
                } else {
                    if (timingType === 0) {
                        pointList.push(<use key={id++} xlinkHref="#S-white" x={posX + 1} y={posY + 1}/>)
                    } else {
                        pointList.push(<use key={id++} xlinkHref="#B-white" x={posX - 0.03} y={posY - 0.03}/>)
                    }
                }
            } else if (typeTable[x][y] === QRPointType.POS_CENTER) {
                if (qrcode.isDark(x, y)) {
                    pointList.push(<use key={id++} fill={posColor} xlinkHref="#B" x={posX - 0.03} y={posY - 0.03}/>)
                }
            } else if (typeTable[x][y] === QRPointType.POS_OTHER) {
                if (qrcode.isDark(x, y)) {
                    pointList.push(<use key={id++} fill={posColor} xlinkHref="#B" x={posX - 0.03} y={posY - 0.03}/>)
                } else {
                    pointList.push(<use key={id++} xlinkHref="#B-white" x={posX - 0.03} y={posY - 0.03}/>)
                }
            } else {
                if (qrcode.isDark(x, y)) {
                    pointList.push(<use key={id++} xlinkHref="#S-black" x={posX + 1} y={posY + 1}/>)
                }
            }
        }
    }

    return pointList;
}

function getParamInfo() {
    return [
        {
            type: ParamTypes.UPLOAD_BUTTON,
            key: 'Background Image',
            default: defaultResImage,
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: 'Contrast',
            default: 0
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: 'Exposure',
            default: 0
        },
        {
            type: ParamTypes.SELECTOR,
            key: 'Small Locator Style',
            default: 0,
            choices: [
                "None",
                "White",
                "Black and White",
            ]
        },
        {
            type: ParamTypes.SELECTOR,
            key: 'Clock Style',
            default: 0,
            choices: [
                "None",
                "White",
                "Black and White",
            ]
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Info Point Color',
            default: '#000000'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Locator Point Color',
            default: '#000000'
        },
    ];
}


function getViewBox(qrcode) {
    if (!qrcode) return '0 0 0 0';

    const nCount = qrcode.getModuleCount() * 3;
    return String(-nCount / 5) + ' ' + String(-nCount / 5) + ' ' + String(nCount + nCount / 5 * 2) + ' ' + String(nCount + nCount / 5 * 2);
}

function getGrayPointList(params, size, black, white) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = document.createElement('img');
    let gpl = [];
    canvas.style.imageRendering = 'pixelated';
    size *= 3;

    img.src = params[0];
    let contrast = params[1]/100;
    let exposure = params[2]/100;
    return new Promise(resolve => {
        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, size, size);

            for (let x = 0; x < canvas.width; x++) {
                for (let y = 0; y < canvas.height; y++) {
                    let imageData = ctx.getImageData(x, y, 1, 1);
                    let data = imageData.data;
                    let gray = gamma(data[0], data[1], data[2]);
                    if (Math.random() > ((gray / 255) + exposure - 0.5) * (contrast + 1) + 0.5 && ( x % 3 !== 1 || y % 3 !== 1 ) ) gpl.push(<use key={"g_" + x + "_" + y} x={x} y={y} xlinkHref={black} />);
                }
            }
            resolve(gpl);
        }
    })
}

let defaultDrawIcon = function ({ qrcode, params, title, icon }) {
    if (!qrcode) return []

    let id = 0;
    const nCount = qrcode.getModuleCount();
    const pointList = [];
    const sq25 = "M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z";

    // draw icon
    if (icon) {
        const iconEnabled = getExactValue(icon.enabled, 0);
        const {src, scale} = icon;

        const iconSize = Number(nCount * (scale > 33 ? 33 : scale) / 100 * 3);
        const iconXY = (nCount*3 - iconSize) / 2;

        if (icon && iconEnabled) {
            const randomIdDefs = getIdNum();
            const randomIdClips = getIdNum();
            pointList.push(<path d={sq25} stroke="#FFF" strokeWidth={100/iconSize * 3} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />);
            pointList.push(
                <g key={id++}>
                    <defs>
                        <path id={"defs-path" + randomIdDefs} d={sq25} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />                    </defs>
                    <clipPath id={"clip-path" + randomIdClips}>
                        <use xlinkHref={"#defs-path" + randomIdDefs}  overflow="visible"/>
                    </clipPath>
                    <g clipPath={"url(#clip-path" + randomIdClips + ")"}>
                        <image overflow="visible" key={id++} xlinkHref={src} width={iconSize} x={iconXY} y={iconXY} />
                    </g>
                </g>
            );
        }

    }

    return pointList;
}

let builtinDrawIcon = function ({ qrcode, params, title, icon }) {
    if (!qrcode) return []

    let id = 0;
    const nCount = qrcode.getModuleCount();
    const pointList = [];
    const sq25 = "M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z";

    // draw icon
    if (icon) {
        const iconMode = getExactValue(icon.enabled, 0);
        const {src, scale} = icon;

        const iconSize = Number(nCount * (scale > 33 ? 33 : scale) / 100 * 3);
        const iconXY = (nCount*3 - iconSize) / 2;

        const Gpay = (
            <>
            <rect width="100" height="100" fill="#07c160" />
            <image
              xlinkHref="https://raw.githubusercontent.com/ExoduxNile/qrbtf/master/src/components/svg/SVG/gpay.png"
              width="100"
              height="100"
            />
            </>
        )

        const Paypal = (
                <>
            <rect width="100" height="100" fill="#07c160" />
            <image
              xlinkHref="https://raw.githubusercontent.com/ExoduxNile/qrbtf/master/src/components/svg/SVG/paypal.png"
              width="100"
              height="100"
            />
            </>
        )

        const Chase = (
                <>
             <image xlinkHref="https://raw.githubusercontent.com/ExoduxNile/qrbtf/master/src/components/svg/SVG/chase.png" width="100" height="100"/>
             </>
        )

        const Cashapp = (
        <>
             <image xlinkHref="https://raw.githubusercontent.com/ExoduxNile/qrbtf/master/src/components/svg/SVG/cashapp.png" width="100" height="100"/>
             </>
        )
        const Applepay = (
        <>
             <image xlinkHref="https://raw.githubusercontent.com/ExoduxNile/qrbtf/master/src/components/svg/SVG/applepay.png" width="100" height="100"/>
             </>
        )

        function builtinIcon() {
            if (iconMode === 2) {
                return Gpay
            } else if (iconMode === 3) {
                return Paypal
            } else if (iconMode === 4) {
                return Chase
            } else if (iconMode === 5) {
                return Cashapp
            }
            else if (iconMode === 5) {
                return Applepay
            }
        }

        if (icon && iconMode) {
            const randomIdDefs = getIdNum();
            const randomIdClips = getIdNum();
            pointList.push(<path d={sq25} stroke="#FFF" strokeWidth={100/iconSize * 3} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />);
            pointList.push(
                <g key={id++}>
                    <defs>
                        <path id={"defs-path" + randomIdDefs} d={sq25} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />                    </defs>
                    <clipPath id={"clip-path" + randomIdClips}>
                        <use xlinkHref={"#defs-path" + randomIdDefs}  overflow="visible"/>
                    </clipPath>
                    <g clipPath={"url(#clip-path" + randomIdClips + ")"}>
                        <g transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} >
                            {builtinIcon()}
                        </g>
                    </g>
                </g>
            );
        }
    }

    return pointList;
}

function drawIcon({ qrcode, icon, params }) {
    const iconMode = getExactValue(icon.enabled, 0);
    if (iconMode === 1) {

        // Custom
        // default
        return defaultDrawIcon({ qrcode, icon, params });

    } else {

        return builtinDrawIcon({ qrcode, icon, params });
    }
}

const RendererResImage = ({qrcode, params, setParamInfo, icon}) => {
    let otherColor = params[5];

    useEffect(() => {
        setParamInfo(getParamInfo());
    }, [setParamInfo]);

    const [gpl, setGPL] = useState([]);
    useMemo(() => {
        getGrayPointList(params, qrcode.getModuleCount(), "#S-black", "#S-white").then(res => setGPL(res));
    }, [setGPL, params[0], params[1], params[2], qrcode])

    return (
        <svg className="Qr-item-svg" width="100%" height="100%" viewBox={getViewBox(qrcode)} fill="white"
             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
                <rect id="B-black" fill={otherColor} width={3.08} height={3.08}/>
                <rect id="B-white" fill="white" width={3.08} height={3.08}/>
                <rect id="S-black" fill={otherColor} width={1.02} height={1.02}/>
                <rect id="S-white" fill="white" width={1.02} height={1.02}/>
                <rect id="B" width={3.08} height={3.08}/>
                <rect id="S" width={1.02} height={1.02}/>
            </defs>
            {gpl.concat(listPoints({ qrcode, params, icon }))}
            {drawIcon({ qrcode, params, icon })}
        </svg>
    )
}


export default RendererResImage


RendererResImage.detail = (
    <div>A resampled binarized pixel matrix full of technological sense</div>
);
