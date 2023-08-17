import {connect} from 'react-redux';
import PartDownload from "../../components/app/PartDownload";
import {saveImg, saveSvg} from "../../utils/downloader";
import {getParamDetailedValue, outerHtml} from "../../utils/util";
import {handleDownloadImg, handleDownloadSvg} from "../../utils/gaHelper";

function saveDB(state, type, updateDownloadData) {
    return new Promise(resolve => {
            text: state.textUrl,
            value: state.value,
            type: type,
            params: state.paramInfo[state.selectedIndex].map((item, index) => {
                const value = getParamDetailedValue(item, state.paramValue[state.selectedIndex][index]);
                if (typeof value !== "string" || value.length <= 128) {
                    return {
                        key: item.key,
                        value: value,
                    };
                }
                return {};
            })
            history: state.history
        }, () => {
            updateDownloadData(); // You are not passing any arguments, so ensure it's correct
            resolve();
        });
}


const mapStateToProps = (state, ownProps) => ({
    value: state.value,
    downloadCount: state[state.value],
    onSvgDownload: () => {
        saveSvg(state.value, outerHtml(state.selectedIndex));
        saveDB(state, 'svg', ownProps.updateDownloadData);
        handleDownloadSvg(state.value);
    },
    onImgDownload: (type) => {
        return new Promise(resolve => {
            saveImg(state.value, outerHtml(state.selectedIndex), 1500, 1500, type).then((res) => {
                saveDB(state, type, ownProps.updateDownloadData).then(() => {
                    handleDownloadImg(state.value, type);
                    resolve(res)
                });
            });
        });
    }
})

export default connect(mapStateToProps, null)(PartDownload)
