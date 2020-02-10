import React from "react";
// import Cesium from "cesium";

import "./cesiumContainer.less";
import { getMapConfig,getWidgetConfig } from "../../map/api";
import { createMap, initStaticWidget } from "../../map/main";

class AppMap extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			mapDivId: "mapView",
			mainMap: null,
			postInit: true,
			activeNav: "",
			activePage: "综合信息"
		};
	}

	componentDidMount() {
		getMapConfig().then(data => {
			var viewer = createMap(this.state.mapDivId, data); 
			window.viewer = viewer; //绑定到全局，widgets目录用

			getWidgetConfig().then(widgetdata => { 
				initStaticWidget(viewer, widgetdata); 
			});
		});
	}

	componentWillUnmount() {

	}

	componentDidUpdate() {
		console.log("component did update!");
	}





	render() {
		let mapStyle = { height: "100%", width: "100%" };
		return (
			<React.Fragment>
				<div id="cesiumContainer" className="itemContainer bg-gis collapsed">
					<div id={this.state.mapDivId} style={mapStyle} className="appmap"></div>
				</div>
			</React.Fragment>
		);
	}
}

export default AppMap;