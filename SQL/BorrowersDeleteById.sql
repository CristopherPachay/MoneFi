USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Borrowers_Delete_ById]    Script Date: 6/19/2023 9:08:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Cristopher Pachay
-- Create date: 05/05/2023
-- Description: Borrowers_Delete_ById-& Updates Status to REMOVED
-- Code Reviewer:None 

-- MODIFIED BY: Cristopher Pachay
-- MODIFIED DATE:05/05/2023
-- Code Reviewer:
-- Note:Initial creation 
-- =============================================

ALTER proc [dbo].[Borrowers_Delete_ById]

					@Id int


/*-----TEST CODE-----

	Declare @Id int = 22
	Execute [dbo].[Borrowers_Delete_ById] @Id

	SELECT*
	FROM dbo.Borrowers

	SELECT*
	From dbo.StatusTypes

*/-----END TEST CODE -----

AS

BEGIN

	UPDATE dbo.Borrowers
	SET StatusId = 5, DateModified = GETDATE()
	WHERE Id = @Id

END 
