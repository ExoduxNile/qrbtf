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
    const downloadData = {}; // Change this to an object instead of an array

    // Assuming you have an array of items like this
    const items = [
      { value: 'item1', count: 5 },
      { value: 'item2', count: 10 }
      // ... other items
    ];

    items.forEach(item => {
      downloadData[item.value] = item.count;
    });

  }, [dispatch]) // dispatch and downloadData should be added to dependencies

  return (
    <div className="App">
      <header className="App-header">
        <div className="Layout">
          <div className="Qr-outer">
            <PartHeader/>
            <PartStylesViewer/>
            <PartParams/>
            <PartDownloadViewer/> 
            <PartMore/>
            <PartFooter/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default connect()(App);