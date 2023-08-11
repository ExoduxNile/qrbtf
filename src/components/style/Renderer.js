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

        const WeChatIconSmall = (
            <g>
                <rect width="100" height="100" fill="#07c160"/>
                <path fill="fff" d="M70.5,2.5C57.1638,39.171,43.8305,75.8377,30.5,112.5C7.76255,97.6706-1.40412,76.6706,3,49.5C9.16667,24.6667,24.6667,9.16667,49.5,3C56.4921,2.50038,63.4921,2.33371,70.5,2.5Z"/>
                <path fill="fff" d="M70.5,2.5C96.9878,7.82202,113.821,23.4887,121,49.5C125.019,86.6517,109.185,110.485,73.5,121C61.1249,122.61,49.1249,121.277,37.5,117C34.7613,115.974,32.428,114.474,30.5,112.5C43.8305,75.8377,57.1638,39.171,70.5,2.5Z"/>
                <path fill="fff" d="M19.5,58.5C17.8333,57.5,16.5,56.1667,15.5,54.5C21.2402,45.4842,28.5735,44.1508,37.5,50.5C36.6872,51.8139,35.6872,52.9805,34.5,54C31.3484,52.8141,28.0151,52.4807,24.5,53C21.9441,54.0545,20.2775,55.8878,19.5,58.5Z"/>            
                <path fill="fff" d="M72.5,62.5C69.8333,62.5,67.1667,62.5,64.5,62.5C64.5,66.1667,64.5,69.8333,64.5,73.5C63.5,73.5,62.5,73.5,61.5,73.5C61.5,64.8333,61.5,56.1667,61.5,47.5C65.5138,47.3345,69.5138,47.5012,73.5,48C77.8608,50.2258,79.3608,53.7258,78,58.5C76.549,60.4641,74.7157,61.7974,72.5,62.5Z"/>
                <path fill="fff" d="M64.5,50.5C67.1873,50.3359,69.854,50.5026,72.5,51C75.0701,53.718,75.0701,56.3847,72.5,59C69.854,59.4974,67.1873,59.6641,64.5,59.5C64.5,56.5,64.5,53.5,64.5,50.5Z"/>
                <path fill="fff" d="M81.5,55.5C85.5839,55.0431,89.4172,55.7098,93,57.5C94.3967,62.7081,94.8967,68.0414,94.5,73.5C92.8762,73.6399,91.7096,72.9733,91,71.5C86.6146,75.756,82.6146,75.4227,79,70.5C77.9595,67.3637,78.7928,64.8637,81.5,63C84.8649,61.5564,88.1982,61.0564,91.5,61.5C88.7101,57.9532,85.5434,57.6198,82,60.5C78.9799,59.1781,78.8132,57.5114,81.5,55.5Z"/>
                <path fill="fff" d="M95.5,55.5C96.8221,55.33,97.9887,55.6634,99,56.5C100.667,60.1667,102.333,63.8333,104,67.5C105.941,63.9523,107.607,60.2857,109,56.5C110.183,55.269,111.349,55.269,112.5,56.5C109.391,63.051,106.558,69.7177,104,76.5C103.359,78.8132,102.026,80.4798,100,81.5C99.5,81.1667,99,80.8333,98.5,80.5C99.8333,77.8333,101.167,75.1667,102.5,72.5C99.8777,66.9261,97.5444,61.2594,95.5,55.5Z"/>
                <path fill="fff" d="M15.5,54.5C16l.5,56.1667,17.8333,57.5,19.5,58.5C19.5,60.5,19.5,62.5,19.5,64.5C17.9991,65.7515,16.3325,66.7515,14.5,67.5C12.869,62.8796,13.2024,58.5463,15.5,54.5Z"/>
                <path fill="fff" d="M36.5,71.5C35.5,70.8333,34.5,70.1667,33.5,69.5C33.7031,67.9557,34.3698,66.6223,35.5,65.5C32.9135,64.52,30.2469,64.1866,27.5,64.5C27.5,62.5,27.5,60.5,27.5,58.5C32.1667,58.5,36.8333,58.5,41.5,58.5C41.9651,62.7924,41.1318,66.7924,39,70.5C38.3292,71.2524,37.4959,71.5858,36.5,71.5Z"/>
                <path fill="fff" d="M72.5,62.5C70.3926,63.4682,68.0593,63.8016,65.5,63.5C65.8128,67.0419,65.4794,70.3752,64.5,73.5C64.5,69.8333,64.5,66.1667,64.5,62.5C67.1667,62.5,69.8333,62.5,72.5,62.5Z"/>
                <path fill="fff" d="M19.5,64.5C22.5947,70.3582,27.2613,72.0249,33.5,69.5C34.5,70.1667,35.5,70.8333,36.5,71.5C36.2435,73.7761,34.9102,74.9428,32.5,75C24.4271,77.1226,18.4271,74.6226,14.5,67.5C16.3325,66.7515,17.9991,65.7515,19.5,64.5Z"/>
                <path fill="fff" d="M84.5,64.5C93.2821,64.9553,93.7821,67.2886,86,71.5C81.9055,69.9696,81.4055,67.6362,84.5,64.5Z"/>






            </g>
        )

        const WeChatIcon = (
            <g>
                <rect width="100" height="100" fill="#07c160"/>
                <path d="M48.766,39.21a2.941,2.941,0,1,1,2.918-2.94,2.929,2.929,0,0,1-2.918,2.94m-16.455,0a2.941,2.941,0,1,1,2.918-2.941,2.93,2.93,0,0,1-2.918,2.941m8.227-17.039c-13.632,0-24.682,9.282-24.682,20.732,0,6.247,3.324,11.87,8.528,15.67a1.662,1.662,0,0,1,.691,1.352,1.984,1.984,0,0,1-.087.528c-.415,1.563-1.081,4.064-1.112,4.181a2.449,2.449,0,0,0-.132.607.825.825,0,0,0,.823.828.914.914,0,0,0,.474-.154l5.405-3.144a2.57,2.57,0,0,1,1.31-.382,2.442,2.442,0,0,1,.725.109,28.976,28.976,0,0,0,8.057,1.137c.455,0,.907-.012,1.356-.032a16.084,16.084,0,0,1-.829-5.082c0-10.442,10.078-18.908,22.511-18.908.45,0,.565.015,1.008.037-1.858-9.9-11.732-17.479-24.046-17.479" fill="#fff"/>
                <path d="M70.432,55.582A2.589,2.589,0,1,1,73,52.994a2.578,2.578,0,0,1-2.568,2.588m-13.713,0a2.589,2.589,0,1,1,2.568-2.588,2.578,2.578,0,0,1-2.568,2.588m20.319,16a16.3,16.3,0,0,0,7.106-13.058c0-9.542-9.208-17.276-20.568-17.276s-20.57,7.734-20.57,17.276S52.216,75.8,63.576,75.8a24.161,24.161,0,0,0,6.714-.947,2.079,2.079,0,0,1,.6-.091,2.138,2.138,0,0,1,1.092.319l4.5,2.62a.78.78,0,0,0,.4.129.688.688,0,0,0,.685-.691,2.081,2.081,0,0,0-.11-.5l-.927-3.486a1.641,1.641,0,0,1-.073-.44,1.385,1.385,0,0,1,.577-1.126" fill="#fff"/>
            </g>
        )

        const WeChatPayIcon = (
            <g>
                <rect width="100" height="100" fill="#07c160"/>
                <path d="M41.055,57.675a2.183,2.183,0,0,1-2.893-.883l-.143-.314L32.046,43.37a1.133,1.133,0,0,1-.105-.461,1.094,1.094,0,0,1,1.748-.877l7.049,5.019a3.249,3.249,0,0,0,2.914.333L76.8,32.63c-5.942-7-15.728-11.581-26.8-11.581-18.122,0-32.813,12.243-32.813,27.345,0,8.24,4.42,15.656,11.338,20.669a2.185,2.185,0,0,1,.919,1.781,2.569,2.569,0,0,1-.116.7c-.552,2.062-1.437,5.362-1.478,5.516a3.212,3.212,0,0,0-.177.8,1.094,1.094,0,0,0,1.1,1.094,1.236,1.236,0,0,0,.631-.2L36.583,74.6a3.438,3.438,0,0,1,1.742-.5,3.281,3.281,0,0,1,.965.145A38.844,38.844,0,0,0,50,75.739c18.122,0,32.813-12.243,32.813-27.345a23.668,23.668,0,0,0-3.738-12.671L41.3,57.537Z" fill="#fff"/>
            </g>
        )

        const AlipayIcon = (
            <g>
                <rect width="100" height="100" fill="#009ce1"/>
                <path d="M100,67.856c-.761-.1-4.8-.8-17.574-5.066-4.012-1.339-9.4-3.389-15.395-5.552A80.552,80.552,0,0,0,75.4,36.156H55.633v-7.1H79.848V25.094H55.633V13.258H45.749a1.68,1.68,0,0,0-1.733,1.707V25.094H19.524v3.963H44.016v7.1H23.8V40.12H63.013a69.579,69.579,0,0,1-5.65,13.763c-12.724-4.187-26.3-7.58-34.834-5.491C17.074,49.733,13.56,52.125,11.5,54.63,2.02,66.125,8.815,83.585,28.824,83.585c11.831,0,23.228-6.579,32.061-17.417C73.49,72.211,97.914,82.4,100,83.267ZM26.956,76.9c-15.6,0-20.215-12.255-12.5-18.958,2.573-2.266,7.276-3.372,9.782-3.621,9.268-.913,17.846,2.613,27.972,7.541C45.087,71.118,36.023,76.9,26.956,76.9Z" fill="#fff"/>
            </g>
        )

        function builtinIcon() {
            if (iconMode === 2) {
                return WeChatIconSmall
            } else if (iconMode === 3) {
                return WeChatIcon
            } else if (iconMode === 4) {
                return WeChatPayIcon
            } else if (iconMode === 5) {
                return AlipayIcon
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