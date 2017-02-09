/* global google */

import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';

var App = React.createClass({ // eslint-disable-line
  /**
   * Render the example app
   * @return {Function} React render function
   */
  getInitialState: function() {
    return {
      street1: '',
      street2: '',
      city: '',
      region: '',
      zip: ''
    };
  },

  render: function() {

    return ( // eslint-disable-line
      <div className="address-form">
        <Geosuggest
          initialValue={this.state.street1}
          placeholder="Address 1"
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(34.0522, -118.2437)}
          radius="20"
        />
        <input
          className="address-form__input"
          ref='street2'
          placeholder="Address 2"
          type='text'
          autoComplete='off'
          value={this.state.street2}
          onChange={(e) => { this.setState({street2: e.target.value}); }}
        />
        <div className="address-form__row">
          <input
            className="address-form__input"
            ref='city'
            placeholder="City"
            type='text'
            autoComplete='off'
            value={this.state.city}
            onChange={(e) => { this.setState({city: e.target.value}); }}
          />
          <input
            className="address-form__input"
            ref='region'
            type='text'
            style={{width: 80}}
            placeholder="State"
            autoComplete='off'
            value={this.state.region}
            onChange={(e) => { this.setState({region: e.target.value}); }}
          />
          <input
            className="address-form__input"
            ref='zip'
            type='text'
            style={{width: 150}}
            placeholder="Zipcode"
            autoComplete='off'
            value={this.state.zip}
            onChange={(e) => { this.setState({zip: e.target.value}); }}
          />
        </div>
      </div>
    );
  },

  onSuggestSelect: function(suggest) {
    console.log(suggest); // eslint-disable-line
    const {gmaps: {address_components}} = suggest;
    const addressParts = {};

    address_components.forEach((val) => {
      addressParts[val.types[0]] = val.short_name;
    });

    const {
      street_number, route, postal_code, neighborhood, locality,
      country, administrative_area_level_1, bus_station
    } = addressParts;

    this.setState({
      street1: `${street_number || bus_station || ''}${route ? ' ' + route : ''}`,
      city: locality,
      region: administrative_area_level_1,
      zip: postal_code,
    })
  }
});

ReactDOM.render(<App />, document.getElementById('app')); // eslint-disable-line
