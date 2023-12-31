USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Borrowers_Insert]    Script Date: 6/19/2023 9:08:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Cristopher Pachay
-- Create date: 05/05/2023
-- Description: Insert borrowers
-- Code Reviewer:None 

-- MODIFIED BY: Cristopher Pachay
-- MODIFIED DATE:05/05/2023
-- Code Reviewer:
-- Note:Initial creation 
-- =============================================


ALTER PROC [dbo].[Borrowers_Insert]
		
								@UserId int
								,@SSN nvarchar(20)
								,@StatusId int
								,@AnnualIncome int
								,@LocationId int
								,@Id int OUTPUT

AS

/*-----TEST CODE----

	Declare  @UserId int = 12
			,@SSN nvarchar(20) = '333-33-3333'
			,@StatusId int= 4
			,@AnnualIncome int = 800000
			,@LocationId int = 7
			,@Id int = 5

	Execute dbo.Borrowers_Insert @UserId 
			,@SSN 
			,@StatusId 
			,@AnnualIncome
			,@LocationId 
			,@Id OUTPUT



	SELECT *
	FROM dbo.Borrowers

-----	TEST CODE ENDS ------

	SELECT *
	FROM dbo.Users

	SELECT *
	FROM dbo.StatusTypes

	SELECT *
	FROM dbo.Locations
			
*/

BEGIN 


	INSERT INTO [dbo].[Borrowers]
			([UserId]
			,[SSN]
			,[StatusId]
			,[AnnualIncome]
			,[LocationId])
     VALUES
			(@UserId
			,@SSN
			,@StatusId
			,@AnnualIncome
			,@LocationId)

	SET @Id= SCOPE_IDENTITY()
END
