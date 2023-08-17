function saveDB(state, type, updateDownloadData) {
    return new Promise(resolve => {
        resolve({
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
            }),
            history: state.history
        });
    }).then(() => {
        updateDownloadData(); // You are not passing any arguments, so ensure it's correct
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
                    resolve(res);
                });
            });
        });
    }
});

export default connect(mapStateToProps, null)(PartDownload);
