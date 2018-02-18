import React, {Component} from 'react';
import InputWithSuggestions from "./InputWithSuggestions"


/**
 * Constants that represent style of form submit button
 * based on validity of form input.
 * @type {string}
 */
const BTN_VALID = "btn btn-primary btn-lg btn-block";
const BTN_DISABLED = "btn btn-secondary btn-lg btn-block disabled";

/**
 * Form component encapsulates all application
 * input fields and controls their state.
 */
export default class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      from: [],
      to: [],
      date: _getDateToday()
    };


    this._submitForm = this._submitForm.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this._updateDate = this._updateDate.bind(this);
    this._validInput = this._validInput.bind(this);
  }


  /**
   * Handler passed down to FROM and TO
   * input component that collects relevant
   * input data.
   * @param id
   * @param selection
   */
  updateValue(id, selection) {
    this.setState({[id]: selection});
  }

  render() {

    return (

      <form onSubmit={this._submitForm}>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <InputWithSuggestions id="from"
                                placeholder="Where are you?"
                                onSelect={this.updateValue}
                                getData={this.props.getData}
                                autoFocus={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <InputWithSuggestions id="to"
                                placeholder="Where would you want to be?"
                                onSelect={this.updateValue}
                                getData={this.props.getData}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" className="form-control"
                 value={this.state.date}
                 onChange={this._updateDate}/>
          </div>
        <button className={this._validInput() ? BTN_VALID : BTN_DISABLED}>
          {this._validInput() ? "Let's Fly!" : "What are you waiting for?"}
        </button>

      </form>

    );
  }

  /**
   * Handler that manages form data propagation
   * to parent component and also prevents
   * form submission with invalid data.
   * @param event
   * @private
   */
  _submitForm(event) {
    event.preventDefault();

    if (!this._validInput()) return;

    const ts = this.state;
    const from = ts.from.map( loc => loc.id );
    const to = ts.to.map( loc => loc.id );

    this.props.onFormSubmit(
      from,
      to,
      ts.date
    )

  }

  /**
   * Handler that controls the DATE field input.
   * @param event
   * @private
   */
  _updateDate(event) {
    event.preventDefault();
    this.setState({date: event.target.value})
  }

  /**
   * Valid input is checked against the state
   * of the FROM and TO arrays. To get most consistent
   * results, calls to API are made using location ids
   * and not their names, which are displayed in the
   * autosuggestion box. Therefore, a selection of
   * a location from the autosuggestion box is enforced
   * and submission of the form with simply typed - in
   * values will not be allowed.
   * @returns {boolean}
   * @private
   */
  _validInput() {
    const {from, to} = this.state;
    return !!(from.length && to.length);
  }

}

/**
 * Helper method that gets correctly formatted
 * today's date to use as default input to the
 * DATE field.
 * @returns {string}
 * @private
 */
function _getDateToday() {
  const d = new Date();
  let day = d.getDate();
  if (day < 10) day = "0" + day;
  let month = d.getMonth();
  if (month < 9) month = "0" + (month + 1);
  return `${d.getFullYear()}-${month}-${day}`;
}