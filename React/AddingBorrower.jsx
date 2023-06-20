import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import debug from "sabio-debug";
import borrowerService from "services/borrowerService";
import borrowerSchema from "schemas/borrowerSchema"
import toastr from "toastr"
import lookUpService from "services/lookUpService";
import Swal from 'sweetalert2';



function AddingABorrower ()
{
    const _logger = debug.extend("BorrowerForm");
    _logger("BorrowerForm firing");

    const [statusTypes, setStatusTypes]= useState ({
        statusTypeData: [],
    });

    const [newBorrower, setNewBorrower]= useState({
        id:0,
        userId:0,
        ssn:"",
        statusId:0,
        annualIncome:0,
        locationId:0,
    });

    const mapStatusType =(statusTypes) =>{
        _logger("statusTypes",statusTypes )
        let obj = {
            value: statusTypes.id,
            label: statusTypes.name
        }
        return <option value={obj.value}>{obj.label}</option>
    };

    useEffect(()=>{
        lookUpService.getTypes(["statusTypes"])
        .then(onSuccessGetTypes)
        .catch(onErrorGetErrorTypes)

    }, []);

    const onSuccessGetTypes = (response) => {
        _logger(response,"statusTypes Success")
        setStatusTypes((prevState)=>{
            const newState = {...prevState}
            newState.statusTypeData = response.item.statusTypes.map(mapStatusType)
            return newState
        })
    };

    const onErrorGetErrorTypes = (err) =>{
        _logger(err,"statusTypes Error")
        toastr.error("statusTypes Get Call Failed")
    };

    const onFormFieldChange =(event) =>{
        _logger("onChnage",{syntheticEvent: event});
        const target = event.target;
        const newBorrowerValue = target.value;
        const nameOfField = target.name;
        _logger({nameOfField, newBorrowerValue})

        setNewBorrower((prevState) =>{
            const newBorrowerObject = {
                ...prevState
            }

            newBorrowerObject[nameOfField] = newBorrowerValue
            return newBorrowerObject
        })
    };

    const onAddBorrowerSubmit = (e) =>{
        e.preventDefault();
        borrowerService.addBorrower(newBorrower)
        .then(onAddBorrowerSuccess)
        .catch(onAddBorrowerError)
        _logger(newBorrower)
    };

    const onAddBorrowerSuccess = (response)=>{
        _logger(response, "onAddBorrowerSuccess");
        Swal.fire("Process Complete","New Borrower Added Successfully", "success")
        setNewBorrower({
            id:0,
            userId:0,
            ssn:"",
            statusId:0,
            annualIncome:0,
            locationId:0,
        })
    };

    const onAddBorrowerError = (err) => {
        _logger(err,"Add Borrower Error")
        Swal.fire("Please try again","Verify new borrowers credentials ","error")
    };

    return (
        <React.Fragment>  
            <div className="py-6">
                <Formik 
                    enableReinitialize={true}
                    initialValues={newBorrower}
                    onSubmit={onAddBorrowerSubmit}
                    validationSchema={borrowerSchema}>
                    <Form className="formik-form">
                    <div className="mb-3">
                    <label htmlFor="ssn" className="form-label">
                         SSN
                    </label>
                    <Field
                        type="text"
                        class="form-control"
                        id="snn"
                        placeholder="Enter SSN"
                        onChange={onFormFieldChange}
                        name="ssn"
                        value={newBorrower.ssn}/>
                    <ErrorMessage
                        name="ssn"
                        component="div"
                        className="formik-has-error"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="statusId" className="form-label">
                         Status
                    </label>
                    <Field
                        as="select"
                        className="form-control"
                        id="statusId"
                        placeholder="Enter Status Id"
                        onChange={onFormFieldChange}
                        name="statusId"
                        value={newBorrower.statusId}>
                        <option value ="">Select Status</option>
                        {statusTypes.statusTypeData}
                    </Field>
                    <ErrorMessage
                        name="statusId"
                        component="div"
                        className="formik-has-error"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="annualIncome" className="form-label">
                         Annual Income
                    </label>
                    <Field
                        type="number"
                        class="form-control"
                        id="annualIncome"
                        placeholder="Annual Income"
                        onChange={onFormFieldChange}
                        name="annualIncome"
                        value={newBorrower.annualIncome}/>
                    <ErrorMessage
                        name="annualIncome"
                        component="div"
                        className="formik-has-error"/>                   
                    </div>
                    <div className="mb-3">
                    <label htmlFor="locationId" className="form-label">
                         Location 
                    </label>
                    <Field
                        as="select"
                        class="form-control"
                        id="locationId"
                        placeholder="Enter Location Id"
                        onChange={onFormFieldChange}
                        name="locationId"
                        value={newBorrower.locationId}>
                    <option value ="">Select type of Location</option>
                        <option value={1}>Home</option>
                        <option value={2}>Billing</option>
                        <option value={3}>Business</option>
                        <option value={4}>Shipping</option>
                        <option value={5}>Vending Location</option>    
                    </Field>             
                    <ErrorMessage
                        name="locationId"
                        component="div"
                        className="formik-has-error"/>
                    </div>              
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={onAddBorrowerSubmit}>
                         Add Borrower
                    </button>
                    </Form>
                </Formik>
            </div>
        </React.Fragment>
    )

}

export default AddingABorrower;