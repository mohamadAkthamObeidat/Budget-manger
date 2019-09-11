import React, { Component } from "react";

export class TermsOfServices extends Component {
  render() {
    return (
      <div>
        <div
          class="modal fade"
          id="exampleModalLong"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Terms Of Services
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style={{ color: "#00900B" }}>
                Terms and Conditions: In the event that you access or use this
                Product, the Product herein means any product developed and / or
                managed by your payment company for electronic payment in any
                way, you agree and be bound by the terms and conditions set
                forth in this document and any changes that may be posted at a
                later date (Collectively, the "Terms of Use"). We will notify
                any changes of this kind on the home page of our website and
                within our products, a few days prior to their entry into force.
                The terms of use, guidelines and other rules published on this
                product may change from time to time and your continued access
                to or use of the product constitutes your agreement to these
                changes for the current version. Please check regularly the
                "Terms and Privacy" link on the e-bills home page to stay
                up-to-date on any conditions that apply to this product. In the
                event of any breach of any of these Terms of Use, your license
                to access or use this product will terminate automatically.
                Policy and Privacy: We are committed to protecting your privacy
                and any information collected from users and individuals. The
                company continuously reviews systems and data to ensure the best
                possible services to our customers.
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsOfServices;
