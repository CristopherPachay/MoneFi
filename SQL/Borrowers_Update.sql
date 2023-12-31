USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Borrowers_Update]    Script Date: 6/19/2023 9:11:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Cristopher Pachay
-- Create date: 05/05/2023
-- Description: Borrowers_Update
-- Code Reviewer:None 

-- MODIFIED BY: Cristopher Pachay
-- MODIFIED DATE:05/05/2023
-- Code Reviewer:
-- Note:Initial creation 
-- =============================================


ALTER proc [dbo].[Borrowers_Update]

						@SSN nvarchar(20)
						,@StatusId int
						,@AnnualIncome int
						,@LocationId int				
						,@Id int = 6

AS

/*-----TEST CODE-----
	DECLARE @Id int = 6
	
	DECLARE @SSN nvarchar(20) = '235-89-8888'
				,@StatusId int = 2
				,@AnnualIncome int = 900000
				,@LocationId int = 2
				
			
			

	SELECT*
	From dbo.Borrowers
	WHERE Id = @Id

	Execute [dbo].[Borrowers_Update]
				@SSN 
				,@StatusId 
				,@AnnualIncome 
				,@LocationId 				
				,@Id 

	SELECT*
	From dbo.Borrowers
	WHERE Id = @Id
*/
BEGIN 

	UPDATE [dbo].[Borrowers]
		SET[UserId] = [UserId] 
		,[SSN] = @SSN
		,[StatusId] = @StatusId
		,[AnnualIncome] = @AnnualIncome
		,[LocationId] = @LocationId	
		,[DateModified] = GETUTCDATE()
		

	WHERE Id = @Id

END