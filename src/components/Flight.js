import React, { Component } from "react";

/**
 * Simple presentational component showing
 * individual flight data.
 */
export default class Flight extends Component {

  render() {

    const p = this.props;

    return (
      <tr>
        <td>{p.from}</td>
        <td>{p.to}</td>
        <td>{_formatTime(p.date)}</td>
        <td>{`${p.price} EUR`}</td>
      </tr>
    )
  }

}

/**
 * Helper method that formats unix timestamp
 * to a string in the DD / MM / YYYY | HH:MM format.
 * @param timestamp
 * @returns {string}
 * @private
 */
function _formatTime(timestamp) {
  const d = new Date(timestamp * 1000);
  let day = d.getDate();
  if (day < 10) day = "0" + day;
  let month = d.getMonth();
  if (month < 9) month = "0" + (month + 1);
  let hours = d.getHours();
  if (hours < 10) hours = "0" + hours;
  let minutes = d.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  return `${day} / ${month} / ${d.getFullYear()} | ${hours}:${minutes}`
}