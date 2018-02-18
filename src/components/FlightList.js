import React, {Component} from "react";
import Flight from "./Flight";

/**
 * FlightList is a container component that manages
 * rendering of individual Flights.
 */
export default class FlightList extends Component {

  constructor(props) {
    super(props);

    this._renderFlights = this._renderFlights.bind(this);
    this._getMessage = this._getMessage.bind(this);
    this._renderPlaceholder = this._renderPlaceholder.bind(this);
  }

  render() {

    const noFlights = !this.props.flights.length;

    return (
      <div className="bg-white mt-3 p-2 border border-primary">
        {
          noFlights ? this._renderPlaceholder() : this._renderFlights()
        }
      </div>
    )
  }

  /**
   * Generates individual Flight components to be
   * rendered.
   * @returns {*}
   * @private
   */
  _renderFlights() {
    const flights = this.props.flights.map((f, i) => {
      return <Flight key={i} from={f.cityFrom} to={f.cityTo} date={f.dTime} price={f.price}/>
    });
    return (
      <table className="table">
        <thead className="">
        <tr>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Departure</th>
          <th scope="col">Price</th>
        </tr>
        </thead>
        <tbody>
        {flights}
        </tbody>
      </table>
    )
  }

  /**
   * Renders a message when there are no flights
   * to be shown.
   * @returns {*}
   * @private
   */
  _renderPlaceholder() {
    return <p className="lead text-center m-0">{this._getMessage()}</p>
  }

  /**
   * Provides a parent state aware message to be rendered
   * when there are no flights.
   * @returns {string}
   * @private
   */
  _getMessage() {

    const tp = this.props;
    if (tp.loading) {
      return "Loading flights ...";
    } else if (!tp.flights.length) {

      if (tp.init) {
        return "You will see your flights right here!"
      } else {
        return "We couldn't find any flights. Try expanding your search."
      }
    }
  }

}