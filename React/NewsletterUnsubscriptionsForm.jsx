import React from "react";
import { useNavigate } from 'react-router-dom';
import "./NewsletterSubscriptions.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import newsletterFormValidation from "schemas/newsletterFormSchema";
import { Button } from "react-bootstrap";
import * as newsletterSubscriptionFormService from 'services/newsletterSubscriptionFormService';
import Swal from 'sweetalert2';
import debug from 'sabio-debug';


const _logger = debug.extend("NewsletterUnsubscription");

function NewsletterUnsubcriptionForm (){
  const onUnsubscribeHandle = (values, { setSubmitting , resetForm}) => {
    newsletterSubscriptionFormService
    .unsubscribeEmail(values.email)
      .then(onEmailSuccess)
      .catch(onEmailFail)
      .finally(() => {
        setSubmitting(false);
        resetForm();
    });
};

    const navigate = useNavigate();
    
    const onEmailSuccess = () =>{
        Swal.fire("Unsubscription complete",
        "You have successfully been unsubscribed from our email newsletter.").then(() => {
        navigate("/")
        })
        _logger("Email unsubscribed successfully!");
    };
    
    const onEmailFail = () => {
        Swal.fire("No results found", 
        "We couldn't locate an email matching your criteria in our database. Please double-check the email or try another one.")
        _logger("Error adding email:");
      };
    return (
        <div className="newsletter-subscriptions">
        <div className="newslettersubscriptions-container">
          <div className="row">
            <div className="col-sm-12">
              <div className="content">
                <h2 className="newsletter-header">Unsubscribe From Our NewsLetter </h2>
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={newsletterFormValidation}
                  onSubmit={onUnsubscribeHandle}
                  name="newsletterForm"
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group">
                        <h6 className="newsletter-email-text">Enter your email</h6>
                        <div className="newsletter-input-group">
                          <Field
                            type="email"
                            name="email"
                            className={`newsletter-form-control ${
                              errors.email && touched.email ? 'newsletter-is-invalid' : ''
                            }`}
                            placeholder="Enter your email address to unsubscribe"
                          />
                          <Button className="newsletter-btn-success" type="submit">
                            Unsubscribe 
                          </Button>
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error text-danger"
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
                <div className="text-center">
                  <a className="newsletter-link" href="">
                    We&rsquo;re sorry to see you go.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
};

export default NewsletterUnsubcriptionForm;
