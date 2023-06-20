import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import BorrowerDebtForm from "components/dashboard/borrowers/BorrowerDebtForm";

const _logger = debug.extend("BorrowerProfileDetails");

function BorrowerCardDetails() {
  const { state } = useLocation();
  _logger("useLocation:", state);
  const [borrowerProfile, setBorrowerProfile] = useState({
    id: 0,
    user: {
      id: 0,
      firstName: "",
      lastName: "",
      mi: "",
      avatarUrl: "",
    },
    ssn: "",
    statusTypes: {
      id: 0,
      name: "",
    },
    annualIncome: 0,
    location: {
      id: 0,
      typeId: 0,
      lineOne: "",
      lineTwo: "",
      city: "",
      zip: "",
    },
    streetAddress: "",
  });

  useEffect(() => {
    if (state) {
      _logger("Payload:", state.payload);

      setBorrowerProfile((prevState) => {
        let newState = state.payload;
        if (newState.location.lineTwo === "") {
          newState.streetAddress = newState.location.lineOne;
        } else {
          newState.streetAddress = `${newState.location.lineOne}, ${newState.location.lineTwo}`;
        }
        return { ...prevState, ...state.payload };
      });
    }
  }, [state]);

  const formattedAnnualIncome = borrowerProfile.annualIncome.toLocaleString(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  );
  const navigate = useNavigate();

  const backToList = () => {
    navigate("/borrowers/list");
  };

  return (
    <>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Borrower Details</h3>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-lg-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <Image
                src={borrowerProfile.user.avatarUrl}
                id="img-uploaded"
                className="avatar-xl rounded-circle"
                style={{ objectFit: "cover" }}
                alt=""
              />
              <div className="ms-3"></div>
            </div>
            <div></div>
          </div>
          <hr className="my-5" />
          <div>
            <h4 className="mb-0">Personal Details</h4>
            <p className="mb-4">Borrower personal information and address.</p>
            <Row>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name:
                  </label>
                  <Card.Header>
                    <div> {borrowerProfile.user.firstName}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name:
                  </label>
                  <Card.Header>
                    <div>{borrowerProfile.user.lastName}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="SNN" className="form-label">
                    SSN:
                  </label>
                  <Card.Header>
                    <div>{borrowerProfile.ssn}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="aanualIncome" className="form-label">
                    Annual Income:
                  </label>
                  <Card.Header>
                    <div>{formattedAnnualIncome}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">
                    Street Address:
                  </label>
                  <Card.Header>
                    <div>{borrowerProfile.location.lineOne}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="address2" className="form-label">
                    Address Line 2:
                  </label>
                  <Card.Header>
                    <div>{borrowerProfile.location.lineTwo}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City:
                  </label>
                  <Card.Header>
                    <div>{borrowerProfile.location.city}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip:
                  </label>
                  <Card.Header>
                    <div>{borrowerProfile.location.zip}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status:
                  </label>
                  <Card.Header>
                    <div>{borrowerProfile.statusTypes.name}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col sm={12} md={12}>
                <Button variant="primary" onClick={backToList}>
                  Back to Borrowers List
                </Button>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      <div className="d-flex mt-3 justify-content-left">
        <div className="col-6">
          <BorrowerDebtForm />
        </div>
      </div>
    </>
  );
}

BorrowerCardDetails.propTypes = {
  borrower: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
    ssn: PropTypes.string,
    statusTypes: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    annualIncome: PropTypes.number.isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      typeId: PropTypes.number.isRequired,
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }),
  }),
};

export default BorrowerCardDetails;
