import React from "react";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { Image, Button } from "react-bootstrap";

function BorrowerCardTemplate(props) {
  const _logger = debug.extend("BorrowerCardTemplate");
  _logger("Props:", props);

  const borrower = props.borrower;
  _logger({ borrower });

  const navigate = useNavigate();

  const onViewMore = (e) => {
    e.preventDefault();
    navigate(`/borrowers/details/${borrower.id}`, {
      state: { type: `Borrower_View`, payload: borrower },
    });
    _logger("Borrower:", { payload: borrower });
  };

  return (
    <React.Fragment>
      <tbody>
        <tr>
          <td>
            <div>
              <Image
                src={borrower.user.avatarUrl}
                alt="user image"
                className="rounded-circle avatar-sm mb-3"
                style={{ objectFit: "cover" }}
              />{" "}
              {borrower.user.firstName} {borrower.user.lastName}
            </div>
          </td>
          <td>{borrower.location.city}</td>
          <td>{borrower.ssn}</td>
          <td>{borrower.statusTypes.name}</td>
          <td>
            <Button variant="btn btn-primary btn-xs" onClick={onViewMore}>
              View More
            </Button>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
}

BorrowerCardTemplate.propTypes = {
  borrower: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string,
    }).isRequired,
    ssn: PropTypes.string.isRequired,
    statusTypes: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    annualIncome: PropTypes.number.isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      typeId: PropTypes.number.isRequired,
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default BorrowerCardTemplate;
