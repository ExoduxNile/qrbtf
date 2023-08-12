import React, {useEffect} from "react";
import {extend, getExactValue, getIdNum} from "../../utils/util";

const Renderer = ({ rendererType, ...other }) => (
    React.createElement(rendererType, other)
)

function areEqual(prevProps, nextProps) {
    return !(prevProps.selected === true || nextProps.selected === true)
}

let defaultViewBox = function (qrcode) {
    if (!qrcode) return '0 0 0 0';

    const nCount = qrcode.getModuleCount();
    return String(-nCount / 5) + ' ' + String(-nCount / 5) + ' ' + String(nCount + nCount / 5 * 2) + ' ' + String(nCount + nCount / 5 * 2);
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
            pointList.push(<path d={sq25} stroke="#FFF" strokeWidth={100/iconSize * 1} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />);
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
            else if (iconMode === 5) {
                return Applepay
            }
        }

        if (icon && iconMode) {
            const randomIdDefs = getIdNum();
            const randomIdClips = getIdNum();
            pointList.push(<path d={sq25} stroke="#FFF" strokeWidth={100/iconSize * 1} fill="#FFF" transform={'translate('+String(iconXY)+','+String(iconXY)+') ' + 'scale(' + String(iconSize/100) + ',' + String(iconSize/100) + ')'} />);
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

export function createRenderer(renderer) {
    renderer = extend({
        getViewBox: defaultViewBox,
        listPoints: ({ qrcode, params, icon }) => { return []; },
        getParamInfo: () => {return []; },
        beginRendering: ({ qrcode, params, setParamInfo }) => {},
        beforeListing: ({ qrcode, params, setParamInfo }) => {},
        drawIcon: drawIcon
    }, renderer);

    return ({ qrcode, params, title, icon, setParamInfo}) => {
        useEffect(() => {
            setParamInfo(renderer.getParamInfo());
        }, [setParamInfo]);

        renderer.beginRendering({ qrcode, params, setParamInfo });
        return (
            <svg className="Qr-item-svg" width="100%" height="100%" viewBox={renderer.getViewBox(qrcode)} fill="white"
                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                {renderer.beforeListing({ qrcode, params, setParamInfo })}
                {renderer.listPoints({ qrcode, params, icon })}
                {renderer.drawIcon({ qrcode, params, title, icon })}
            </svg>
        );
    }
}

export default React.memo(Renderer, areEqual)
export { defaultDrawIcon, defaultViewBox }