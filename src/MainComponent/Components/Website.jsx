import React from 'react'
import NavBar from './NavBar';
import WebsiteContant from './WebsiteContant';
import FeaturePage from './FeaturePage';
import FeatureSection from './FeatureSection';
import MissionSection from './MissionSection';
import './Style.css';




function Website() {
    return (
        <>
            <NavBar />
            <WebsiteContant />
            <FeaturePage />
            <FeatureSection />
            <MissionSection />
        </>
    )
}

export default Website;