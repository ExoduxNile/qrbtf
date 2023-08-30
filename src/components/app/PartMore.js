import React from 'react';
import './App.css';
import GitHubButton from 'react-github-btn'
import ScrollContainer from "react-indiana-drag-scroll";
import LazyLoad from "react-lazy-load";
import mediumZoom from "medium-zoom";
import LinkButton from "../link/LinkButton";
import ImageZoom from "../../containers/app/ImageZoom";
import LinkTrace from "../link/LinkTrace";
import {isPC} from "../../utils/navigatorUtils";
import {handleScroll} from "../../utils/gaHelper";