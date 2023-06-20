import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import AddingABorrower from "./AddingBorrower";

const BorrowerPageTemplate = () => {
  return (
    <Card>
      <Card.Header className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
        <div className="mb-3 mb-md-0">
          <Card.Title as="h1" className="mb-1 h2 fw-bold">
            Add New Borrower
          </Card.Title>
        </div>
        <div></div>
      </Card.Header>
      <Card.Body>
        <div className="py-6">
          <Row>
            <Col xl={{ offset: 3, span: 6 }} lg={12} md={12} xs={12}>
              <Card>
                <Card.Body className="p-lg-6">
                  <AddingABorrower key="adding-borrower" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BorrowerPageTemplate;
