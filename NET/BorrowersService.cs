using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Sabio.Data;
using Sabio.Models.Requests;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using Newtonsoft.Json;
using Sabio.Models.Domain.Users;

namespace Sabio.Services
{
    public class BorrowersService : IBorrowersService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        IBaseUserMapper _baseUserMapper = null;
        public BorrowersService(IDataProvider data, ILookUpService lookUpService,
            IBaseUserMapper baseUserMapper)
        {
            _data = data;
            _lookUpService = lookUpService;
            _baseUserMapper = baseUserMapper;
        }
        public void DeleteById(int id)
        {
            string procName = "[dbo].[Borrowers_Delete_ById]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            });
        }
        public void Update(BorrowerUpdateRequest model)
        {
            string procName = "[dbo].[Borrowers_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }
        public Borrower GetById(int id)
        {
            string procName = "[dbo].[Borrowers_Select_ById]";
            Borrower borrower = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                borrower = MapSingleBorrower(reader, ref startingIndex);
            }
            );
            return borrower;
        }
        public Borrower GetByCreatedBy(int userId)
        {
            string procName = "[dbo].[Borrowers_Select_ByCreatedBy]";
            Borrower borrower = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@UserId", userId);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                borrower = MapSingleBorrower(reader, ref startingIndex);
            }
            );
            return borrower;
        }
        public int Add(BorrowerAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Borrowers_Insert]";
            _data.ExecuteNonQuery(procName,
             inputParamMapper: delegate (SqlParameterCollection col)
             {
                 AddCommonParams(model, col);
                 col.AddWithValue("@UserId", userId);
                 SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                 idOut.Direction = ParameterDirection.Output;
                 col.Add(idOut);
             },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });
            return id;
        }
        public Paged<Borrower> Pagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Borrowers_SelectAll_Paginated]";
            Paged<Borrower> pagedList = null;
            List<Borrower> list = null;
            int totalCount = 0;
            _data.ExecuteCmd(
                  procName, (SqlParameterCollection param) =>
                  {
                      param.AddWithValue("@PageIndex", pageIndex);
                      param.AddWithValue("@PageSize", pageSize);
                  },
                      (IDataReader reader, short set) =>
                      {
                          int startingIndex = 0;
                          Borrower aBorrower = MapSingleBorrower(reader, ref startingIndex);
                          if (totalCount == 0)
                          {
                              totalCount = reader.GetSafeInt32(startingIndex);
                          }
                          if (list == null)
                          {
                              list = new List<Borrower>();
                          }
                          list.Add(aBorrower);
                      }
                     );
            if (list != null)
            {
                pagedList = new Paged<Borrower>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<Borrower> PaginationSearch(int pageIndex, int pageSize, string query)
        {
            Paged<Borrower> pagedSearchList = null;
            List<Borrower> list = null;
            int totalCount = 0;
            _data.ExecuteCmd("[dbo].[Borrowers_Search_Pagination]",
             (param) =>
             {
                 param.AddWithValue("@PageIndex", pageIndex);
                 param.AddWithValue("@PageSize", pageSize);
                 param.AddWithValue("@Query", query);
             },
              (reader, recordSetIndex) =>
              {
                  int startingIndex = 0;
                  Borrower aBorrower = MapSingleBorrower(reader, ref startingIndex);
                  totalCount = reader.GetSafeInt32(startingIndex);
                  if (totalCount == 0)
                  {
                      totalCount = reader.GetSafeInt32(startingIndex++);
                  }
                  if (list == null)
                  {
                      list = new List<Borrower>();
                  }
                  list.Add(aBorrower);
              });
            if (list != null)
            {
                pagedSearchList = new Paged<Borrower>(list, pageIndex, pageSize, totalCount);
            }
            return pagedSearchList;
        }
        private Borrower MapSingleBorrower(IDataReader reader, ref int startingIndex)
        {
            Borrower borrower = new Borrower();

            borrower.Id = reader.GetSafeInt32(startingIndex++);
            borrower.User = _baseUserMapper.MapBaseUser(reader, ref startingIndex);

            borrower.SSN = reader.GetSafeString(startingIndex++);
            borrower.StatusTypes = _lookUpService.MapSingleLookUp(reader, ref startingIndex);

            borrower.AnnualIncome = reader.GetSafeInt32(startingIndex++);

            borrower.Location = new BaseLocation();
            borrower.Location.Id = reader.GetSafeInt32(startingIndex++);
            borrower.Location.TypeId = reader.GetSafeInt32(startingIndex++);
            borrower.Location.LineOne = reader.GetSafeString(startingIndex++);
            borrower.Location.LineTwo = reader.GetSafeString(startingIndex++);
            borrower.Location.City = reader.GetSafeString(startingIndex++);
            borrower.Location.Zip = reader.GetSafeString(startingIndex++);


            borrower.DateCreated = reader.GetSafeDateTime(startingIndex++);
            borrower.DateModified = reader.GetSafeDateTime(startingIndex++);
            return borrower;
        }
        private static void AddCommonParams(BorrowerAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@SSN", model.SSN);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@AnnualIncome", model.AnnualIncome);
            col.AddWithValue("@LocationId", model.LocationId);
        }
    }
}