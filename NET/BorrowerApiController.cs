using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/borrowers")]
    [ApiController]
    public class BorrowerApiController : BaseApiController
    {
        private IBorrowersService _service = null;
        private IAuthenticationService<int> _authenticationService = null;
        public BorrowerApiController(IBorrowersService service
            , ILogger<BorrowerApiController> logger
            , IAuthenticationService<int> authenticationService) : base(logger)
        {
            _service = service;
            _authenticationService = authenticationService;
        }
        [HttpPost]
        public ActionResult<int> Add(BorrowerAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                IUserAuthData user = _authenticationService.GetCurrentUser();
                int id = _service.Add(model, user.Id);
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = id;
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Borrower>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Borrower borrower = _service.GetById(id);
                if (borrower == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<Borrower> { Item = borrower };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }
        [HttpGet("createdby/{userId:int}")]
        public ActionResult<ItemResponse<Borrower>> GetByDateCreated(int userId)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Borrower borrower = _service.GetByCreatedBy(userId);
                if (borrower == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<Borrower> { Item = borrower };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }
        [HttpPut("{id:int}")]
        public ActionResult<int> Update(BorrowerUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Update(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteById(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Borrower>>> Pagination(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Borrower> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Record Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Borrower>> response = new ItemResponse<Paged<Borrower>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }
        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Borrower>>> PaginationSearch(int pageIndex, int pageSize, string query)
        {
            ActionResult result = null;
            try
            {
                Paged<Borrower> paged = _service.PaginationSearch(pageIndex, pageSize, query);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Record Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Borrower>> response = new ItemResponse<Paged<Borrower>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }
    }
}