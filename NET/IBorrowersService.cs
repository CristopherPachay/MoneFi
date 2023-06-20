using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;

namespace Sabio.Services
{
    public interface IBorrowersService
    {
        void DeleteById(int id);
        int Add(BorrowerAddRequest model, int userId);
        void Update(BorrowerUpdateRequest model);
        Borrower GetByCreatedBy(int userId);
        Borrower GetById(int id);
        Paged<Borrower> Pagination(int pageIndex, int pageSize);
        Paged<Borrower> PaginationSearch(int pageIndex, int pageSize, string query);
    }
}