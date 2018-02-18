import React, {Component} from "react";
import {AsyncTypeahead} from "react-bootstrap-typeahead";

/**
 * This component wraps AsyncTypehead, a component used to
 * provide input autosuggestions.
 * @link https://github.com/ericgio/react-bootstrap-typeahead
 */
export default class InputWithSuggestions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      multiple: true,
      options: []
    };

    this._handleSearch = this._handleSearch.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }


  render() {

    const props = {
      placeholder: this.props.placeholder,
      autoFocus: this.props.autoFocus
    };

    return (
      <div>
        <AsyncTypeahead
          {...props}
          {...this.state}
          labelKey={_getLabel}
          minLength={2}
          onSearch={this._handleSearch}
          onChange={this._handleChange}
        />
      </div>
    );
  }

  /**
   * Handler making requests to locations API
   * passed down from the App component.
   * @param term
   * @returns {Promise<void>}
   * @private
   */
  async _handleSearch(term) {
    this.setState({isLoading: true});
    let response = await this.props.getData(term);
    this.setState({
      isLoading: false,
      options: response.data.locations
    });

  }

  /**
   * Handler that passes information about
   * selected options back to the parent.
   * @param selection
   * @private
   */
  _handleChange(selection) {
    this.props.onSelect(this.props.id, selection);
  }

}

/**
 * Helper function that formats individual
 * input autosuggestions to be rendered.
 * @param opt
 * @returns {string}
 * @private
 */
function _getLabel(opt = {}) {

  const name = opt.name || "";
  const type = opt.type || "";
  let countryCode;
  if (opt.country && opt.country.code) {
    countryCode = opt.country.code;
  } else if (opt.city && opt.city.country && opt.city.country.code) {
    countryCode = opt.city.country.code;
  } else {
    countryCode = "";
  }
  return `${name}, ${countryCode} (${type})`
}