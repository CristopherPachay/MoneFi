USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Borrowers_SelectAll_Paginated]    Script Date: 6/19/2023 9:06:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Cristopher Pachay
-- Create date: 05/05/2023
-- Description: Pagination 
-- Code Reviewer:None 

-- MODIFIED BY: Cristopher Pachay
-- MODIFIED DATE:05/05/2023
-- Code Reviewer:
-- Note:Initial creation 
-- =============================================

ALTER proc [dbo].[Borrowers_SelectAll_Paginated]
			@PageIndex int
			,@PageSize int



/*----TEST CODE---

	Declare @PageIndex int=0
			,@PageSize int=2

	Execute [dbo].[Borrowers_SelectAll_Paginated]
						@PageIndex 
						,@PageSize 

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

	ORDER BY b.Id
	OFFSET @offset  Rows
	FETCH NEXT @PageSize ROWS ONLY
END