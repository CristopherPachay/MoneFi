USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Borrowers_Search_Pagination]    Script Date: 6/19/2023 9:09:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Author: Cristopher Pachay
-- Create date: 05/05/2023
-- Description: Search Pagination 
-- Code Reviewer:None 

-- MODIFIED BY: Cristopher Pachay
-- MODIFIED DATE:05/05/2023
-- Code Reviewer:
-- Note:Initial creation 
-- =============================================


ALTER proc [dbo].[Borrowers_Search_Pagination]

					@PageIndex int
					,@PageSize int
					,@Query nvarchar(100)
		


/*---TEST CODE ----
	
	Declare @PageIndex int=0
			,@PageSize int=20
			,@Query nvarchar(100)= 'Active'

	Execute [dbo].[Borrowers_Search_Pagination]
						@PageIndex 
						,@PageSize
						,@Query

	SELECT*
	FROM [dbo].[Borrowers]
*/

AS

BEGIN

	Declare @offset int =@PageIndex * @PageSize

	SELECT b.[Id]
		,u.Id as UserId
		,u.FirstName
		,u.LastName
		,u.Mi
		,u.AvatarUrl
		,b.[SSN]
		,st.[Id] as StatusId
		,st.[Name] as StatusName
		,b.[AnnualIncome]
		,l.Id as LocationId
		,l.LocationTypeId
		,l.LineOne
		,l.LineTwo
		,l.City
		,l.Zip
      ,b.[DateCreated]
      ,b.[DateModified]
	  ,TotalCount = COUNT(1) OVER()
   FROM [dbo].[Borrowers] as b inner join dbo.Users as u
				on b.UserId = u.Id
				inner join dbo.Locations as l
				on l.Id = b.LocationId
				inner join dbo.StatusTypes as st
				on st.Id = b.StatusId

	Where  (b.Id LIKE '%' + @Query + '%' OR CONVERT(VARCHAR, b.Id) = @Query)
        OR b.SSN LIKE '%' + @Query + '%'
        OR AnnualIncome LIKE '%' + @Query + '%'
        OR l.Id LIKE '%' + @Query + '%'
        OR l.City LIKE '%' + @Query + '%'
        OR l.LineOne LIKE '%' + @Query + '%'
        OR l.LineTwo LIKE '%' + @Query + '%'
        OR l.Zip LIKE '%' + @Query + '%'
        OR (u.FirstName + ' ' + u.LastName) LIKE '%' + @Query + '%'
		OR u.Id LIKE '%' + @Query + '%'
        OR st.Name LIKE '%' + @Query + '%'
        AND (
            (@Query = 'Active' AND st.Name = 'Active')
            OR (@Query = 'Inactive' AND st.Name = 'Inactive')
            OR (@Query != 'Active' AND @Query != 'Inactive' AND st.Name != 'Active' AND st.Name != 'Inactive')
        )
	ORDER BY b.Id
	OFFSET @offset  Rows
	FETCH NEXT @PageSize ROWS ONLY

END 