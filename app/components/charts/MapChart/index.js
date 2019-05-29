import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

import _ from 'lodash';


import { getGatewaysList } from '../../../containers/GatewayList/actions';


export class MapContainer extends Component {
  componentDidMount() {
    const { profile } = this.props;

    const url = profile && profile.role && profile.role.type === 'root' ?
      `gateway?site=${this.props.siteId}` :
      `account/gateway/${this.props.siteId}`;

    if (_.isEmpty(this.props.gateways)) {
      this.props.getGatewaysList(
        url,
        {}
      );
    }
  }

  onMapClicked = () => {
  }

  renderMarkers(item) {
    return (
      <Marker
        title="The marker`s title will appear as a tooltip"
        name="SOMA"
        position={{ lat: item.lat || +this.props.lat, lng: item.long || +this.props.long }}
      />
    );
  }

  render() {
    const { gateways } = this.props;
    const lat = (gateways && gateways[0] && gateways[0].lat) || +this.props.lat;
    const lng = (gateways && gateways[0] && gateways[0].long) || +this.props.long;
    const zoom = +this.props.zoom || 3;

    return (
      <Map
        className="map-container"
        google={this.props.google}
        initialCenter={{
          lat,
          lng
        }}
        zoom={zoom}
        onClick={this.onMapClicked}
      >
        {gateways ? gateways.map((item) => this.renderMarkers(item)) : null}
      </Map>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.string.isRequired,
  siteId: PropTypes.string,
  lat: PropTypes.number,
  long: PropTypes.number,
  zoom: PropTypes.number,
  gateways: PropTypes.instanceOf(Array),
  profile: PropTypes.instanceOf(Object),
  getGatewaysList: PropTypes.func
};

MapContainer.defaultProps = {
  siteId: '',
  gateways: [],
  getGatewaysList: () => {},
  profile: {},
  lat: 0,
  long: 0,
  zoom: 3

};

function mapStateToProps(state) {
  return {
    gateways: state.gateways && state.gateways.list,
    profile: state.profile
  };
}

const WrappedContainer = GoogleApiWrapper({
  apiKey: ('AIzaSyDFtCivAHskSzSLuG1IJ6s-DBMwk96kE3A')
})(MapContainer);

export default connect(mapStateToProps, { getGatewaysList })(WrappedContainer);
