USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Borrowers_Select_ById]    Script Date: 6/19/2023 9:10:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Cristopher Pachay
-- Create date: 05/05/2023
-- Description: Borrowers_Select_ById
-- Code Reviewer:None 

-- MODIFIED BY: Cristopher Pachay
-- MODIFIED DATE:05/05/2023
-- Code Reviewer:
-- Note:Initial creation 
-- =============================================


ALTER proc [dbo].[Borrowers_Select_ById]
		@Id int

/* -----TEST CODE----
	Select*
	From [dbo].[Borrowers]

	Declare @Id int = 10
	Execute [dbo].[Borrowers_Select_ById] @Id

*/

AS

BEGIN 
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
   FROM [dbo].[Borrowers] as b inner join dbo.Users as u
				on b.UserId = u.Id
				inner join dbo.Locations as l
				on l.Id = b.LocationId
				inner join dbo.StatusTypes as st
				on st.Id = b.StatusId
	
	WHERE b.Id = @Id
			
 
END