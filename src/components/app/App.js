import React, {useCallback, useEffect} from 'react';
import './App.css';
import '../Qrcode.css';
import PartFooter from "./PartFooter";
import PartHeader from "./PartHeader";
import PartMore from "./PartMore";
import PartParams from "./PartParams";
import PartDownloadViewer from "../../containers/app/PartDownloadViewer";
import PartStylesViewer from "../../containers/app/PartStylesViewer";
import {connect} from 'react-redux';
import {loadDownloadData} from "../../actions";
import ReactGA from 'react-ga';
import {setScrollbarWidthProp} from "../../utils/util"

ReactGA.initialize('G-N6SB8GPHLZ');

ReactGA.addTrackers(
    [
        
        {
            trackingId: 'G-N6SB8GPHLZ',
            gaOptions: { name: 'trackerG' }
        }
    ],
    { alwaysSendToDefaultTracker: false }
);

function App({ dispatch }) {

  const updateDownloadData = useCallback(
    (downloadData) => dispatch(loadDownloadData(downloadData)), 
    [dispatch] // dispatch should be added to dependencies
  );

  useEffect(() => {
    let downloadData = [];

    forEach(item => {
      downloadData[item.value] = item.count; 
    });

    dispatch(loadDownloadData(downloadData));

  }, [dispatch, downloadData]) // dispatch and downloadData should be added to dependencies

  return (
    <div className="App">
      <header className="App-header">
        <div className="Layout">
          <div className="Qr-outer">
            <PartHeader/>
            <PartStylesViewer/>
            <PartParams/>
            <PartDownloadViewer updateDownloadData={updateDownloadData}/> 
            <PartMore/>
            <PartFooter/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default connect()(App);