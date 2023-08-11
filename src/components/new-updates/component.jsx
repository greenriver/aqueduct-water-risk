/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable constructor-super */
import React, { PureComponent } from 'react';

export default class NewUpdatesModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    if (!localStorage.getItem('updateModal')) {
      this.setState({ show: true });
    }
  }

  closeUpdatesModal() {
    localStorage.setItem('updateModal', 'true');
    this.setState({ show: false });
  }

  render() {
    return this.state.show ? (
      <div className="updates-modal">
        <header>
          <h3>New Updates!</h3>
          <button onClick={() => this.closeUpdatesModal()}>X</button>
        </header>
        <p>The latest version of Aqueduct, Aqueduct 4.0, launched on August 16, 2023 with updated inputs to the hydrological model, providing more accurate baseline data, as well as future projections data for 2030, 2050 and 2080, based on the latest climate models.</p>
        <p>Find instructions on downloading the data and interpreting the CSV columns at <a target="_blank" href="https://github.com/wri/Aqueduct40/blob/master/data_dictionary_water-risk-atlas.md" rel="noreferrer">this Github link</a>.</p>
        <p><a target="_blank" href="https://wri.zoom.us/webinar/register/WN_pBPBSJQcQPmaYzhFAC3tGg#/registration%5D" rel="noreferrer"> Register for our Aqueduct 4.0 webinar</a> After registering, you will receive a confirmation email about joining the webinar.  on September 7, 2023 to learn more</p>
        <a className="button-link" target="_blank" href="https://doi.org/10.46830/writn.23.00061" rel="noreferrer">READ FULL DOCUMENTATION</a>
      </div>
    ) : null;
  }
}
