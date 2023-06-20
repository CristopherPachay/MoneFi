import axios from "axios";
import * as helper from "../services/serviceHelpers";

const endpoint =  `${helper.API_HOST_PREFIX}/api/borrowers`;
const addBorrower = (payload) =>{
    const config = {
      method: "POST",
      url: `${endpoint}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
  };
const getBorrowers = (pageIndex, pageSize) =>{
    const config = {
      method: "GET",
      url: `${endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
  };
  const searchBorrowers = (pageIndex, pageSize, query) =>{
    const config = {
      method: "GET",
      url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
  };

  const borrowerService = {addBorrower,getBorrowers,searchBorrowers}
  export default borrowerService
  