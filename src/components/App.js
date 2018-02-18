import React, {Component} from "react";
import Form from "./Form";
import FlightList from "./FlightList";

import { getFlights, getLocations } from "../services/api"

/**
 * Defines the number of flights to download
 * in a single request. (pagination)
 * @type {number}
 */
const PAGE_SIZE = 5;

/**
 * App component manages state of API communication
 * and holds response data.
 */
export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      loading: false,
      loadingNextPage: false,
      init: true,
      lastSearch: null,
      downloadedCount: 0
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onNextPageRequest = this.onNextPageRequest.bind(this);
  }

  /**
   * Handler invoked on form submission.
   * @param from
   * @param to
   * @param date
   * @returns {Promise<void>}
   */
  async onFormSubmit(from, to, date) {

    this.setState({
      loading: true,
      flights: []
    });

    const response = await getFlights(from, to, date, PAGE_SIZE, 0);

    this.setState({
      flights: response.data.data,
      loading: false,
      init: false,
      lastSearch: {from, to, date},
      downloadedCount: PAGE_SIZE
    });

  }

  /**
   * Handler invoked on user's request
   * for a next page of flights.
   * @returns {Promise<void>}
   */
  async onNextPageRequest() {

    this.setState({loadingNextPage: true});

    let { flights, downloadedCount, lastSearch} = this.state;
    const { from, to, date } = lastSearch;

    const response = await getFlights(from, to, date, PAGE_SIZE, downloadedCount);

    flights = flights.concat(response.data.data);

    downloadedCount = downloadedCount + PAGE_SIZE;

    this.setState({
      flights,
      loadingNextPage: false,
      downloadedCount
    });

  }

  /**
   * Manages rendering of a button that only shows
   * after first page of flights has been loaded
   * and requests additional pages on click.
   * Also shows loading message during async call.
   * @returns {*}
   */
  renderMoreFlights() {
    if (this.state.flights.length) {
      return <button className="btn btn-success btn-block" onClick={this.onNextPageRequest}>
        {this.state.loadingNextPage ? "Loading ..." : "Find more flights!"}
      </button>
    }
  }

  render() {

    return (
      <div className="container" style={{maxWidth: "720px"}}>
        <header className="jumbotron bg-primary p-2">
          <h1 className="display-4 text-center text-light">Kiwi</h1>
          <p className="lead text-center text-light">Extremely lite edition.</p>
        </header>
        <Form onFormSubmit={this.onFormSubmit} getData={getLocations}/>
        <FlightList {...this.state}/>
        {this.renderMoreFlights()}
      </div>
    )
  }

}