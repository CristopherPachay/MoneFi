import React,{ useState,useEffect } from "react";
import { Card,Row,Col,Table,Button} from 'react-bootstrap';
import debug from "sabio-debug";
import borrowerService from "services/borrowerService";
import BorrowerCardTemplate from "./BorrowerCardTemplate";
import toastr from "toastr";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";



const _logger = debug.extend("BorrowerListView");

function BorrowerCardDetails(){
    _logger("Firing")

    const [pageData, setPageData]=useState({
        arrayOfBorrowers: [],
        arrayOfBorrowerComponents: [],
        pageIndex: 0,
        pageSize: 5,
        totalCount: 0,
        search: "",
    });

    const onPageChange = (page) => {
        setPageData((prevState) => {
          const newState = { ...prevState };
          newState.pageIndex = page - 1;
          return newState;
        });
      };

    const mappingBorrowers = (aBorrower)=>{
        _logger("Borrower:", aBorrower.id)
        return <BorrowerCardTemplate borrower={aBorrower} key={"BorrowerCard"+aBorrower.id}/>
    };
    useEffect(()=>{
        if(pageData.search)
        {  borrowerService
            .searchBorrowers(pageData.pageIndex, pageData.pageSize, pageData.search)
            .then(onBorrowerSearchSuccess)
            .catch(onBorrowerError)
        }else{
            borrowerService.getBorrowers(pageData.pageIndex, pageData.pageSize)
            .then(onGetBorrowerSuccess)
            .catch(onGetBorrowerError)
        }   
    },[pageData.pageIndex, pageData.pageSize]);
    
    const onGetBorrowerSuccess = (data) =>{
        _logger("Borrowers:",data)
        let newBorrowerArray = data.item.pagedItems;
        setPageData((prevState)=>{
            const newState = { ...prevState };
            newState.totalCount = data.item.totalCount;
            newState.arrayOfBorrowers = newBorrowerArray
            newState.arrayOfBorrowerComponents = newBorrowerArray.map(mappingBorrowers);
            return newState;
        });
    };
    const onGetBorrowerError =(err) =>{
        _logger(err,"Get Borrower Error")
        toastr.error("Borrower Get Call Failed")
    };
    const onFormFieldChange = (event) => {
        _logger("onChange", { syntheticEvent: event });
        setPageData((prevState) => {
          _logger("updater onChange");
          const newSearchObject = {
            ...prevState,
          };
          newSearchObject.search = event.target.value;
          return newSearchObject;
        });
      };
      const borrowerSearch =(e)=>{
        e.preventDefault();
        _logger(pageData.search, "borrowerSearch");
        if(pageData.pageIndex !== 0)
        {
            setPageData((prevState)=>{
                const newState = {...prevState}
                newState.pageIndex = 0
                return newState
            })
        } else{
            borrowerService
           .searchBorrowers(pageData.pageIndex, pageData.pageSize, pageData.search)
            .then(onBorrowerSearchSuccess)
            .catch(onBorrowerError)
        }
    };
    const onBorrowerSearchSuccess =(data)=>{
        _logger("Search Result:",data);
        const searchResult = data.item.pagedItems
        setPageData((prevState) => {
            const newState = { ...prevState };
            _logger("This is the newState: ", newState);
            newState.pageIndex = data.item.pageIndex;
            newState.pageSize = data.item.pageSize;
            newState.totalCount = data.item.totalCount;
            newState.arrayOfBorrowers = searchResult;
            newState.arrayOfBorrowerComponents = searchResult.map(mappingBorrowers);
            return newState;
          });
    };
    const onBorrowerError =(err) =>{
        _logger(err,"Borrower search Error")
        toastr.error("Borrower search Error")
    };
    const searchReset =()=>{
        if(pageData.pageIndex !== 0)
        {
            setPageData((prevState)=>{
                const newState = {...prevState}
                newState.pageIndex = 0
                newState.search=""
                return newState
            })
        } else{
            setPageData((prevState)=>{
                const newState = {...prevState}
                newState.search=""
                return newState
            })
            borrowerService.getBorrowers(pageData.pageIndex, pageData.pageSize)
                .then(onGetBorrowerSuccess)
                .catch(onGetBorrowerError);
        }
    };

    return(
        <React.Fragment>
            <Card className="border-0">
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h3 className="mb-0">Borrowers Profiles</h3>
                                <p className="mb-0">Quickly retrieve detailed information about individuals borrowers</p>
                        </div>
                    <div className="flex-grow-1 d-flex justify-content-end">
                        <form className="d-flex" role="search">
                            <input
                                type="search"
                                className="form-control me-2"
                                id="searhId"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={onFormFieldChange}
                                name="search"
                                value={pageData.search}
                            />
                            <Button 
                                variant="btn btn-primary btn-xs me-2" 
                                type="submit" 
                                onClick={borrowerSearch}>
                                    Search
                            </Button>
                            <Button 
                                variant="btn btn-primary btn-xs" 
                                onClick={searchReset}>
                                    Clear
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="pagination-container flex-grow-1 d-flex justify-content-end">
                                <Pagination
                                 onChange={onPageChange}
                                 current={pageData.pageIndex + 1}
                                 pageSize={pageData.pageSize}
                                 total={pageData.totalCount}
                                 locale={locale}
                                 showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                             /> 
                        </div>
		        </Card.Header>
                <Card.Body className="p-0 pb-5">
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <div className="table-responsive ">
                                <Table className="text-nowrap">
                                    <thead className="table-light">
                                        <tr>
                                          <th>User</th>
                                          <th>City</th>
                                          <th>SSN</th>
                                          <th>Status</th>
                                          <th></th>
                                        </tr>
                                        <tr>
                                          <th colSpan="5">
                                            Showing {pageData.arrayOfBorrowerComponents.length} of {pageData.totalCount} items
                                          </th>
                                        </tr> 
                                    </thead>
                                    {pageData.arrayOfBorrowerComponents}
                                </Table>
                            </div>
                        </Col>
                    </Row>     
                </Card.Body>   
            </Card>
        </React.Fragment>
    );
};

export default BorrowerCardDetails;