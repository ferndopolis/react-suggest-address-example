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
      <div>
        <Geosuggest
          initialValue={this.state.street1}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
          onSuggestNoResults={this.onSuggestNoResults}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20"
        />
        <input
          ref='street2'
          type='text'
          autoComplete='off'
          value={this.state.street2}
          onChange={(e, street2) => { this.setState(street2); }}
        />
        <input
          ref='city'
          type='text'
          autoComplete='off'
          value={this.state.city}
          onChange={(e, city) => { this.setState(city); }}
        />
        <input
          ref='region'
          type='text'
          autoComplete='off'
          value={this.state.region}
          onChange={(e, region) => { this.setState(region); }}
        />
        <input
          ref='zip'
          type='text'
          autoComplete='off'
          value={this.state.zip}
          onChange={(e, zip) => { this.setState(zip); }}
        />
      </div>
    );
  },

  /**
   * When the input receives focus
   */
  onFocus: function() {
    console.log('onFocus'); // eslint-disable-line
  },

  /**
   * When the input loses focus
   * @param {String} value The user input
   */
  onBlur: function(value) {
    console.log('onBlur', value); // eslint-disable-line
  },

  /**
   * When the input got changed
   * @param {String} value The new value
   */
  onChange: function(value) {
    console.log('input changes to :' + value); // eslint-disable-line
  },

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
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
  },

  /**
   * When there are no suggest results
   * @param {String} userInput The user input
   */
  onSuggestNoResults: function(userInput) {
    console.log('onSuggestNoResults for :' + userInput); // eslint-disable-line
  }
});

ReactDOM.render(<App />, document.getElementById('app')); // eslint-disable-line
