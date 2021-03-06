USE [FBS_DB]
GO
/****** Object:  StoredProcedure [dbo].[CreateAirplane]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateAirplane]	
	@Name nvarchar(1000),
	@KmHr float
AS
BEGIN
	
   INSERT INTO [dbo].[Aeroplanet]
           ([Emertimi]
           ,[KmHr])
     VALUES
           (@Name
           ,@KmHr)
	
END

GO
/****** Object:  StoredProcedure [dbo].[CreateBagage]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateBagage]	
	@Mass float,
	@PricePercentage float
AS
BEGIN
	
   INSERT INTO [dbo].[Bagazhet]
           ([Masa]
           ,[PerqindjaCmimit])
     VALUES
           (@Mass
           ,@PricePercentage)
	
END

GO
/****** Object:  StoredProcedure [dbo].[CreateCategory]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateCategory]	
	@Name nvarchar(10),
	@PricePercentage float = null
AS
BEGIN
	INSERT INTO [dbo].[Kategorite]
           ([Kategoria]
           ,[PerqindjaCmimit])
     VALUES
           (@Name
           ,@PricePercentage)
END
GO
/****** Object:  StoredProcedure [dbo].[CreateDirection]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateDirection]	
	@DepartureId int,
	@ArrivalId int
AS
BEGIN
	
   INSERT INTO [dbo].[Linjat]
           ([PikaNisjesId]
           ,[PikaMberritjesId])
     VALUES
           (@DepartureId
           ,@ArrivalId)
	
END

GO
/****** Object:  StoredProcedure [dbo].[CreateFlight]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateFlight]	
	@DirectionId int,
	@AirplaneId int,
	@DepartureDate datetime,
	@ArrivalDate datetime,
	@Price money
	
AS	
BEGIN

    INSERT INTO [dbo].[Fluturimet]
           ([LinjaId]
           ,[AeroplaniId]
           ,[DataNisjes]
           ,[DataMberritjes]
           ,[CmimiFluturimit])
     VALUES
           (@DirectionId
           ,@AirplaneId
           ,@DepartureDate
           ,@ArrivalDate
           ,@Price)
END
GO
/****** Object:  StoredProcedure [dbo].[CreateLocation]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateLocation]
	@Name nvarchar(100)
AS
BEGIN
	
	INSERT INTO [dbo].[Pikat]
           ([Emertimi])
     VALUES
           (@Name)
	
END

GO
/****** Object:  StoredProcedure [dbo].[CreateRole]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateRole]	
	@Name nvarchar(50)
AS
BEGIN
	
   INSERT INTO [dbo].[Rolet]
           ([Emri])
     VALUES
           (@Name)
	
END

GO
/****** Object:  StoredProcedure [dbo].[CreateSeat]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateSeat]	
	@Name nvarchar(10),
	@AirplaneId int,
	@CategoryId int
AS
BEGIN
	
   INSERT INTO [dbo].[Uleset]
           ([Emertimi]
           ,[KategoriaId]
           ,[AeroplaniId])
     VALUES
           (@Name
           ,@CategoryId
		   ,@AirplaneId)
	
END

GO
/****** Object:  StoredProcedure [dbo].[CreateTicket]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateTicket]	
	@PasangerId int,
	@FlightId int,
	@SeatId int, 
	@BagageId int,
	@Price money
AS
BEGIN
	
   INSERT INTO [dbo].[Biletat]
           ([PasangjeriId]
           ,[FluturimiId]
           ,[UlesjaId]
           ,[BagazhiId]
           ,[Cmimi])
     VALUES
           (@PasangerId
           ,@FlightId
           ,@SeatId
           ,@BagageId
           ,@Price)

END

GO
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CreateUser]	
	@Emri nvarchar(50),
	@Mbiemri nvarchar(50),
	@Email nvarchar(250),
	@RoleId int,
	@Password nvarchar(500)
AS
BEGIN
	
   INSERT INTO [dbo].[Perdoruesit]
           ([Emri]
           ,[Mbiemri]
           ,[Email]
           ,[RoleId]
           ,[Password])
     VALUES
           (@Emri
           ,@Mbiemri
           ,@Email
           ,@RoleId
           ,@Password)
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteAirplane]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteAirplane]	
	@AirplaneId int
AS
BEGIN
	
   DELETE FROM [dbo].[Aeroplanet]
      WHERE Id = @AirplaneId
	
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteBagage]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteBagage]
	@BagageId int
AS
BEGIN
	
   DELETE FROM [dbo].[Bagazhet]
      WHERE Id = @BagageId
	
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteCategory]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteCategory]	
	@CategoryId int
AS
BEGIN
	
   DELETE FROM [dbo].[Kategorite]
      WHERE Id = @CategoryId
   
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteDirection]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteDirection]	
	@DirectionId int
AS
BEGIN
	
   DELETE FROM [dbo].[Linjat]
      WHERE Id = @DirectionId
	
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteLocation]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteLocation]
	@LocationId int
AS
BEGIN
	
	DELETE FROM [dbo].[Pikat]
      WHERE Id = @LocationId
	
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteRole]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteRole]	
	@RoleId int
AS
BEGIN
	
   DELETE FROM [dbo].[Rolet]
      WHERE Id = @RoleId
	
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteSeat]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteSeat]	
	@SeatId int
AS
BEGIN
	
   DELETE FROM [dbo].[Uleset]
      WHERE Id = @SeatId
   
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteTicket]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteTicket]	
	@TicketId int
AS
BEGIN
	
   DELETE FROM [dbo].[Biletat]
     WHERE Id = @TicketId
	
END

GO
/****** Object:  StoredProcedure [dbo].[DeleteUser]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DeleteUser]	
	@UserId int
AS
BEGIN
	
 DELETE FROM [dbo].[Perdoruesit]
      WHERE Id = @UserId
	
END

GO
/****** Object:  StoredProcedure [dbo].[SearchAirplanes]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SearchAirplanes]	
	@Name nvarchar(1000) = null,
	@KmHr float = null
AS
BEGIN
   
   DECLARE @query nvarchar(1000) = 'SELECT * FROM Aeroplanet WHERE '
   DECLARE @variables nvarchar(1000) = ''
   DECLARE @fP bit = 0

   IF @Name is not null
		BEGIN
			SELECT @variables = dbo.fnSprintf('Emertimi = ''%s''', @Name, default)
			SELECT @fP = 1
		END
   IF @KmHr is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('KmHr = ''%s''', @KmHr, default)
		END
   
   SELECT @query += @variables
   EXEC (@query)	
END

GO
/****** Object:  StoredProcedure [dbo].[SearchBagages]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SearchBagages]	
	@Mass float = null,
	@PricePercentage float = null
AS
BEGIN
   
   DECLARE @query nvarchar(1000) = 'SELECT * FROM Bagazhet WHERE '
   DECLARE @variables nvarchar(1000) = ''
   DECLARE @fP bit = 0

   IF @Mass is not null
		BEGIN
			SELECT @variables = dbo.fnSprintf('Masa = ''%s''', @Mass, default)
			SELECT @fP = 1
		END
   IF @PricePercentage is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('PerqindjaCmimit = ''%s''', @PricePercentage, default)
		END
   
   SELECT @query += @variables
   EXEC (@query)	
END

GO
/****** Object:  StoredProcedure [dbo].[SearchCategories]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SearchCategories]	
	@Name nvarchar(10),
	@PricePercentage float = null
AS
BEGIN
   
   DECLARE @query nvarchar(1000) = 'SELECT * FROM Kategorite WHERE '
   DECLARE @variables nvarchar(1000) = ''
   DECLARE @fP bit = 0

   IF @Name is not null
		BEGIN
			SELECT @variables = dbo.fnSprintf('Kategoria = ''%s''', @Name, default)
			SELECT @fP = 1
		END
   IF @PricePercentage is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('PerqindjaCmimit = ''%s''', @PricePercentage, default)
		END
   
   SELECT @query += @variables
   EXEC (@query)	
END

GO
/****** Object:  StoredProcedure [dbo].[SearchDirections]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SearchDirections]	
	@DepartureId int = null,
	@ArrivalId int = null
AS
BEGIN
   
   DECLARE @query nvarchar(1000) = 'SELECT * FROM Linjat WHERE '
   DECLARE @variables nvarchar(1000) = ''
   DECLARE @fP bit = 0

   IF @DepartureId is not null
		BEGIN
			SELECT @variables = dbo.fnSprintf('Linjat.PikaNisjesId = ''%s''', @DepartureId, default)
			SELECT @fP = 1
		END
   IF @ArrivalId is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('Linjat.PikaMberritjesId = ''%s''', @ArrivalId, default)
		END
   
   SELECT @query += @variables
   EXEC (@query)	
	
END

GO
/****** Object:  StoredProcedure [dbo].[SearchFlights]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SearchFlights]	
	@DepartureId int = null,
	@ArrivalId   int = null,
	@Date		 date = null
AS
BEGIN

   DECLARE @query nvarchar(1000) = 'SELECT * FROM Fluturimet as f INNER JOIN Linjat as l ON f.LinjaId = l.Id WHERE '
   DECLARE @variables nvarchar(1000) = ''
   DECLARE @fP bit = 0

   IF @DepartureId is not null
		BEGIN
			SELECT @variables = dbo.fnSprintf('l.PikaNisjesId = ''%s''', @DepartureId, default)
			SELECT @fP = 1
		END
   IF @ArrivalId is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('l.PikaMberritjesId = ''%s''', @ArrivalId, default)
			SELECT @fP = 1
		END
   IF @Date is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('CAST(f.DataNisjes as date) = ''%s''', @Date, default)
			SELECT @variables += ' AND f.DataNisjes > GETDATE()'
		END
   
   SELECT @query += @variables
   EXEC (@query)
	
END

GO
/****** Object:  StoredProcedure [dbo].[SearchLocations]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SearchLocations]	
	@queryname nvarchar(255)
AS
BEGIN
  SELECT * FROM Pikat WHERE Emertimi LIKE @queryname + '%'
END

GO
/****** Object:  StoredProcedure [dbo].[SearchSeats]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SearchSeats]	
	@Name nvarchar(255) = null,
	@AirplaneId int = null, 
	@CategoryId int =null
AS
BEGIN
  DECLARE @query nvarchar(1000) = 'SELECT * FROM Uleset WHERE '
   DECLARE @variables nvarchar(1000) = ''
   DECLARE @fP bit = 0

   IF @Name is not null
		BEGIN
			SELECT @variables = dbo.fnSprintf('Emertimi = ''%s''', @Name, default)
			SELECT @fP = 1
		END
   IF @AirplaneId is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('AeroplaniId = ''%s''', @AirplaneId, default)
		END
   IF @CategoryId is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('KategoriaId = ''%s''', @CategoryId, default)
		END
   
   SELECT @query += @variables
   EXEC (@query)	
END

GO
/****** Object:  StoredProcedure [dbo].[SearchTickets]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SearchTickets]	
	@PasangerId int = null,
	@FlightId int = null,
	@SeatId int = null, 
	@BagageId int = null,
	@Price money = null
AS
BEGIN

   DECLARE @query nvarchar(1000) = 'SELECT * FROM Biletat WHERE '
   DECLARE @variables nvarchar(1000) = ''
   DECLARE @fP bit = 0

   IF @PasangerId is not null
		BEGIN
			SELECT @variables = dbo.fnSprintf('PasangjeriId = ''%s''', @PasangerId, default)
			SELECT @fP = 1
		END
   IF @FlightId is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('FluturimiId = ''%s''', @FlightId, default)
			SELECT @fP = 1
		END
   IF @SeatId is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('UlesjaId = ''%s''', @SeatId, default)
			SELECT @fP = 1
		END
   IF @BagageId is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('BagazhiId = ''%s''', @BagageId, default)
			SELECT @fP = 1
		END
   IF @Price is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('Cmimi = ''%s''', @Price, default)
		END


   SELECT @query += @variables
   EXEC (@query)

END

GO
/****** Object:  StoredProcedure [dbo].[SearchUsers]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SearchUsers]	
	@Name nvarchar(50) = null,
	@Surname nvarchar(50) = null,
	@Email nvarchar(250) = null,
	@RoleId int = null
AS
BEGIN
	
   DECLARE @query nvarchar(1000) = 'SELECT * FROM Perdoruesit WHERE '
   DECLARE @variables nvarchar(1000) = ''
   DECLARE @fP bit = 0

   IF @Name is not null
		BEGIN
			SELECT @variables = dbo.fnSprintf('Emri = ''%s''', @Name, default)
			SELECT @fP = 1
		END
   IF @Surname is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('Mbiemri = ''%s''', @Surname, default)
			SELECT @fP = 1
		END
	IF @RoleId is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('RoleId = ''%s''', @RoleId, default)
			SELECT @fP = 1
		END
   IF @Email is not null
		BEGIN
			IF @fP = 1
				SELECT @variables += ' AND '
			SELECT @variables += dbo.fnSprintf('Email = ''%s''', @Email, default)
		END
   
   SELECT @query += @variables
   print(@query)
   EXEC (@query)
	
END

GO
/****** Object:  StoredProcedure [dbo].[SelectAirplane]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectAirplane]	
	@AirplaneId int
AS
BEGIN
	
    SELECT 
		*
	FROM 
		Aeroplanet
	WHERE 
		Id = @AirplaneId
	
END

GO
/****** Object:  StoredProcedure [dbo].[SelectAllLocations]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectAllLocations]	
AS
BEGIN
	
   SELECT * FROM Pikat
	
END

GO
/****** Object:  StoredProcedure [dbo].[SelectAllRoles]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectAllRoles]	
AS
BEGIN
	
   SELECT * FROM Rolet
	
END

GO
/****** Object:  StoredProcedure [dbo].[SelectBagage]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectBagage]	
	@BagageId int
AS
BEGIN
	
   SELECT   
    *  
   FROM 
	Bagazhet
   WHERE
	Id = @BagageId
   
END

GO
/****** Object:  StoredProcedure [dbo].[SelectCategory]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectCategory]	
	@CategoryId int
AS
BEGIN
	
   SELECT
   
   *   
   
   FROM Kategorite WHERE Id = @CategoryId
   
END

GO
/****** Object:  StoredProcedure [dbo].[SelectDirection]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectDirection]	
	@DirectionId int
AS
BEGIN
	
   SELECT
   
   Id as DirectionId,
   PikaNisjesId as DepartureId,
   PikaMberritjesId as ArrivalId   
   
   FROM Linjat WHERE Id = @DirectionId
   
END

GO
/****** Object:  StoredProcedure [dbo].[SelectFlight]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectFlight]	
	@FlightId int
AS
BEGIN
	
    SELECT 
		f.Id as FlightId,
		f.LinjaId as DirectionId,
		f.DataNisjes as DepartureTimeId,
		f.DataMberritjes as ArrivalTimeId,
		f.CmimiFluturimit as FlightPrice,
		a.Id as AirplaneId,
		a.Emertimi as AirplaneName,
		u.Id as SeatId,
		u.Emertimi as SeatName,
		u.KategoriaId as SeatCategoryId
	FROM 
	Fluturimet as f 
	INNER JOIN 
	Aeroplanet as a 
	ON f.AeroplaniId = a.Id 
	INNER JOIN Uleset as u 
	ON u.AeroplaniId = a.Id 

	WHERE f.Id = 3 AND u.Id NOT IN (SELECT UlesjaId FROM Biletat WHERE Biletat.FluturimiId = 3)
	
END

GO
/****** Object:  StoredProcedure [dbo].[SelectLocation]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectLocation]
	@LocationId int
AS
BEGIN
	
   SELECT * FROM Pikat WHERE Id = @LocationId
	
END

GO
/****** Object:  StoredProcedure [dbo].[SelectRole]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectRole]	
	@RoleId int
AS
BEGIN
	
    SELECT 
		*
	FROM 
		Rolet
	WHERE 
		Id = @RoleId
	
END

GO
/****** Object:  StoredProcedure [dbo].[SelectSeat]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectSeat]	
	@SeatId int
AS
BEGIN
	
   SELECT
   
   *   
   
   FROM Uleset WHERE Id = @SeatId
   
END

GO
/****** Object:  StoredProcedure [dbo].[SelectTicket]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectTicket]	
	@TicketId int
AS
BEGIN
	
   SELECT * FROM Biletat WHERE Id = @TicketId
	
END

GO
/****** Object:  StoredProcedure [dbo].[SelectUser]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SelectUser]	
	@UserId int
AS
BEGIN
	
   SELECT * FROM Perdoruesit WHERE Id = @UserId
	
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateAirplane]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateAirplane]	
	@AirplaneId int,
	@Name nvarchar(1000),
	@KmHr float
AS
BEGIN
	
   UPDATE [dbo].[Aeroplanet]
   SET [Emertimi] = @Name
      ,[KmHr] = @KmHr
 WHERE Id = @AirplaneId
	
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateBagage]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateBagage]	
	@BagageId int,
	@Mass float,
	@PricePercentage float
AS
BEGIN
	
   UPDATE [dbo].[Bagazhet]
   SET [Masa] = @Mass
      ,[PerqindjaCmimit] = @PricePercentage
 WHERE Id = @BagageId
	
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateCategory]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCategory]	
	@CategoryId int,
	@Name nvarchar(10),
	@PricePercentage float = null
AS
BEGIN

	UPDATE [dbo].[Kategorite]
   SET [Kategoria] = @CategoryId
      ,[PerqindjaCmimit] = @PricePercentage
	WHERE Id = @CategoryId

END
GO
/****** Object:  StoredProcedure [dbo].[UpdateDirection]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateDirection]	
	@DirectionId int,
	@DepartureId int,
	@ArrivalId int
AS
BEGIN
	
   UPDATE [dbo].[Linjat]
   SET [PikaNisjesId] = @DepartureId,
       [PikaMberritjesId] = @ArrivalId
   WHERE Id = @DirectionId
	
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateFlight]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateFlight]
	@FlightId int,	
	@DirectionId int,
	@AirplaneId int,
	@DepartureDate datetime,
	@ArrivalDate datetime,
	@FlightPrice money
	
AS	
BEGIN

    UPDATE [dbo].[Fluturimet]
	SET [LinjaId] = @DirectionId
      ,[AeroplaniId] = @AirplaneId
      ,[DataNisjes] = @DepartureDate
      ,[DataMberritjes] = @ArrivalDate
      ,[CmimiFluturimit] = @FlightPrice
	WHERE Id = @FlightId

END
GO
/****** Object:  StoredProcedure [dbo].[UpdateLocation]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateLocation]
	@LocationId int,
	@Name nvarchar(100)
AS
BEGIN
	
	UPDATE [dbo].[Pikat]
   SET [Emertimi] = @Name
	WHERE Id = @LocationId
	
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateRole]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateRole]	
	@RoleId int,
	@Name nvarchar(50) 
AS
BEGIN
	
   UPDATE [dbo].[Rolet]
   SET [Emri] = @Name
	WHERE Id = @RoleId
	
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateSeat]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateSeat]	
	@SeatId int,
	@Name nvarchar(10),
	@AirplaneId int,
	@CategoryId int
AS
BEGIN
	
   UPDATE [dbo].[Uleset]
   SET [Emertimi] = @Name
      ,[KategoriaId] = @CategoryId
      ,[AeroplaniId] = @AirplaneId
	WHERE Id = @SeatId
	
END

GO
/****** Object:  StoredProcedure [dbo].[UpdateTicket]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateTicket]
	@TicketId int,	
	@PasangerId int,
	@FlightId int,
	@SeatId int, 
	@BagageId int,
	@Price money
AS
BEGIN
	
UPDATE [dbo].[Biletat]
   SET [PasangjeriId] = @PasangerId
      ,[FluturimiId] = @FlightId
      ,[UlesjaId] = @SeatId
      ,[BagazhiId] = @BagageId
      ,[Cmimi] = @Price
 WHERE Id = @TicketId

END

GO
/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 11/27/2021 7:48:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateUser]	
	@UserId int,
	@Emri nvarchar(50),
	@Mbiemri nvarchar(50),
	@Email nvarchar(250),
	@RoleId int,
	@Password nvarchar(500)
AS
BEGIN
	
   UPDATE [dbo].[Perdoruesit]
   SET [Emri] = @Emri
      ,[Mbiemri] = @Mbiemri
      ,[Email] = @Email
      ,[RoleId] = @RoleId
      ,[Password] = @Password
 WHERE Id = @UserId
	
END

GO
