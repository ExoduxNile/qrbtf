import React from "react";
import {ParamTypes} from "../../constant/ParamTypes";
import {getTypeTable, QRPointType} from "../../utils/qrcodeHandler";
import {createRenderer} from "../style/Renderer";
import {getExactValue, getIdNum} from "../../utils/util";

const X = [ Math.sqrt(3)/2, 1/2];
const Y = [-Math.sqrt(3)/2, 1/2];
const Z = [0, 0];

const matrixString = 'matrix(' + String(X[0]) + ', ' + String(X[1]) + ', ' + String(Y[0]) + ', ' + String(Y[1]) + ', ' + String(Z[0]) + ', ' + String(Z[1]) + ')'

function listPoints({ qrcode, params, icon }) {
    if (!qrcode) return []

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    let size = 1.001;
    let size2 = 1.001;
    let height = params[0];
    let height2 = params[1];
    let upColor = params[2];
    let leftColor = params[3];
    let rightColor = params[4];
    let id = 0;

    if (height <= 0) height = 1.0;
    if (height2 <= 0) height2 = 1.0;

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) === false) continue;
            else if (typeTable[x][y] === QRPointType.POS_OTHER || typeTable[x][y] === QRPointType.POS_CENTER) {
                pointList.push(<rect width={size2} height={size2} key={id++} fill={upColor} x={x + (1 - size2)/2} y={y + (1 - size2)/2} transform={matrixString}/>);
                pointList.push(<rect width={height2} height={size2} key={id++} fill={leftColor} x={0} y={0} transform={matrixString+'translate('+String(x + (1 - size2)/2 + size2)+','+String(y + (1 - size2)/2)+') '+'skewY(45) '}/>);
                pointList.push(<rect width={size2} height={height2} key={id++} fill={rightColor} x={0} y={0} transform={matrixString+'translate('+String(x + (1 - size2)/2)+','+String(y + size2 + (1 - size2)/2)+') '+'skewX(45) '}/>);
            }
            else {
                pointList.push(<rect width={size} height={size} key={id++} fill={upColor} x={x + (1 - size)/2} y={y + (1 - size)/2} transform={matrixString}/>);
                pointList.push(<rect width={height} height={size} key={id++} fill={leftColor} x={0} y={0} transform={matrixString+'translate('+String(x + (1 - size)/2 + size)+','+String(y + (1 - size)/2)+') '+'skewY(45) '}/>);
                pointList.push(<rect width={size} height={height} key={id++} fill={rightColor} x={0} y={0} transform={matrixString+'translate('+String(x + (1 - size)/2)+','+String(y + size + (1 - size)/2)+') '+'skewX(45) '}/>);
            }
        }
    }

    return pointList;
}

function getParamInfo() {
    return [
        {
            type: ParamTypes.TEXT_EDITOR,
            key: 'Cylinder Height',
            default: 0.5,
        },
        {
            type: ParamTypes.TEXT_EDITOR,
            key: 'Locator Cylinder Height',
            default: 0.5,
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Top Color',
            default: '#FF7F89'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Left Color',
            default: '#FFD7D9'
        },
        {
            type: ParamTypes.COLOR_EDITOR,
            key: 'Right Color',
            default: '#FFEBF3'
        },
    ];
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

        const iconSize = Number(nCount * (scale > 33 ? 33 : scale) / 100);
        const iconXY = (nCount - iconSize) / 2;

        if (icon && iconEnabled) {

            const randomIdDefs = getIdNum();
            const randomIdClips = getIdNum();
            pointList.push(
                <g transform={matrixString}>
                    <path d={sq25} stroke="#FFF" strokeWidth={100/iconSize * 1} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />
                </g>
            );
            pointList.push(
                <g key={id++} transform={matrixString}>
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

        const iconSize = Number(nCount * (scale > 33 ? 33 : scale) / 100);
        const iconXY = (nCount - iconSize) / 2;

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
            else if (iconMode === 6) {
                return Applepay
            }
        }

        if (icon && iconMode) {
            const randomIdDefs = getIdNum();
            const randomIdClips = getIdNum();
            pointList.push(
                <g transform={matrixString}>
                    <path d={sq25} stroke="#FFF" strokeWidth={100/iconSize * 1} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />
                </g>
            );
            pointList.push(
                <g key={id++} transform={matrixString}>
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

function viewBox(qrcode) {
    if (!qrcode) return '0 0 0 0';

    const nCount = qrcode.getModuleCount();
    return String(-nCount) + ' ' + String(-nCount / 2) + ' ' + String(nCount * 2) + ' ' + String(nCount * 2);
}

const Renderer25D = createRenderer({
    listPoints: listPoints,
    getParamInfo: getParamInfo,
    getViewBox: viewBox,
    drawIcon: drawIcon
})

export default Renderer25D

Renderer25D.detail = (
    <div>Halfway to "3 Dimensional". It might be a little difficult to recognize.</div>
);
