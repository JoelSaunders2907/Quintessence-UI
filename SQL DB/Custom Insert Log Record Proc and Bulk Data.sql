CREATE PROCEDURE [UI].[CustomInsertLogRecord]
    @Process VARCHAR(255),
    @Context VARCHAR(MAX),
	@State VARCHAR(255),
	@TimeStamp DATETIME
AS
BEGIN
    DECLARE @ProcessID INT, @ContextXML XML ,@StateID INT;

    -- Get the ProcessID
    SELECT @ProcessID = ID FROM UI.Process WHERE [Name] = @Process;
    IF @ProcessID IS NULL
    BEGIN
        PRINT 'Process not found';
        RETURN;
    END

    
	SET @ContextXML = cast(dbo.ConvertKeyValuePairsToXML(@Context) as xml);
	
	-- Get the StateID
    SELECT @StateID = ID FROM UI.[State] WHERE [Name] = @State;
    IF @ProcessID IS NULL
    BEGIN
        PRINT 'Process not found';
        RETURN;
    END
	
    -- Insert the log record
    
    BEGIN
        INSERT INTO UI.[ProcessLog] ([ProcessID],[Context],[StateID],[TimeStamp],[Date])
        VALUES (@ProcessID, @ContextXML, @StateID, cast(@TimeStamp as DATETIME),cast(@TimeStamp as DATE));

        PRINT 'Process Info Logged Successfull';
    END
   
END;


-- 6 Jan
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:03 Jan 2025:DateTime','RUNNING','2025-01-06 05:00:00.000'
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:03 Jan 2025:DateTime','COMPLETED','2025-01-06 05:15:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:03 Jan 2025:DateTime','RUNNING','2025-01-06 05:16:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:03 Jan 2025:DateTime','COMPLETED','2025-01-06 05:20:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:03 Jan 2025:DateTime','RUNNING','2025-01-06 05:21:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:03 Jan 2025:DateTime','COMPLETED','2025-01-06 05:33:00.000'

EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:03 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','RUNNING','2025-01-06 05:33:00.000'
EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:03 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','COMPLETED','2025-01-06 05:45:00.000'

EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:03 Jan 2025:DateTime,EndDate:03 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-06 05:45:00.000'
EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:03 Jan 2025:DateTime,EndDate:03 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-06 06:15:00.000'

EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:03 Jan 2025:DateTime,EndDate:03 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-06 06:15:00.000'
EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:03 Jan 2025:DateTime,EndDate:03 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-06 06:50:00.000'


--7 Jan
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:06 Jan 2025:DateTime','RUNNING','2025-01-07 05:00:00.000'
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:06 Jan 2025:DateTime','COMPLETED','2025-01-07 05:12:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:06 Jan 2025:DateTime','RUNNING','2025-01-07 05:13:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:06 Jan 2025:DateTime','COMPLETED','2025-01-07 05:17:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:06 Jan 2025:DateTime','RUNNING','2025-01-07 05:18:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:06 Jan 2025:DateTime','COMPLETED','2025-01-07 05:25:00.000'

EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:06 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','RUNNING','2025-01-07 05:26:00.000'
EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:06 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','COMPLETED','2025-01-07 05:40:00.000'

EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:06 Jan 2025:DateTime,EndDate:06 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-07 05:40:00.000'
EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:06 Jan 2025:DateTime,EndDate:06 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-07 06:07:00.000'

EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:06 Jan 2025:DateTime,EndDate:06 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-07 06:07:00.000'
EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:06 Jan 2025:DateTime,EndDate:06 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-07 06:48:00.000'


--8 Jan 
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:07 Jan 2025:DateTime','RUNNING','2025-01-08 07:00:00.000'
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:07 Jan 2025:DateTime','COMPLETED','2025-01-08 07:18:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:07 Jan 2025:DateTime','RUNNING','2025-01-08 07:18:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:07 Jan 2025:DateTime','COMPLETED','2025-01-08 07:27:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:07 Jan 2025:DateTime','RUNNING','2025-01-08 07:27:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:07 Jan 2025:DateTime','COMPLETED','2025-01-08 07:45:00.000'

EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:07 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','RUNNING','2025-01-08 07:45:00.000'
EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:07 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','COMPLETED','2025-01-08 08:15:00.000'

EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:07 Jan 2025:DateTime,EndDate:07 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-08 08:15:00.000'
EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:07 Jan 2025:DateTime,EndDate:07 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-08 08:58:00.000'

EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:07 Jan 2025:DateTime,EndDate:07 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-08 08:58:00.000'
EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:07 Jan 2025:DateTime,EndDate:07 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-08 09:59:00.000'


--9 Jan
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:08 Jan 2025:DateTime','RUNNING','2025-01-09 04:30:00.000'
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:08 Jan 2025:DateTime','COMPLETED','2025-01-09 04:35:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:08 Jan 2025:DateTime','RUNNING','2025-01-09 04:35:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:08 Jan 2025:DateTime','COMPLETED','2025-01-09 04:39:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:08 Jan 2025:DateTime','RUNNING','2025-01-09 04:39:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:08 Jan 2025:DateTime','COMPLETED','2025-01-09 04:43:00.000'

EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:08 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','RUNNING','2025-01-09 04:43:00.000'
EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:08 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','COMPLETED','2025-01-09 04:51:00.000'

EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:08 Jan 2025:DateTime,EndDate:08 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-09 04:51:00.000'
EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:08 Jan 2025:DateTime,EndDate:08 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-09 05:07:00.000'

EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:08 Jan 2025:DateTime,EndDate:08 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-09 05:07:00.000'
EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:08 Jan 2025:DateTime,EndDate:08 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-09 05:21:00.000'

--10 Jan
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:09 Jan 2025:DateTime','RUNNING','2025-01-10 05:30:00.000'
EXEC UI.CustomInsertLogRecord'TRADE_CRN','ValueDate:09 Jan 2025:DateTime','COMPLETED','2025-01-10 05:35:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:09 Jan 2025:DateTime','RUNNING','2025-01-10 05:35:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_ELNA','ValueDate:09 Jan 2025:DateTime','COMPLETED','2025-01-10 05:39:00.000'

EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:09 Jan 2025:DateTime','RUNNING','2025-01-10 05:39:00.000'
EXEC UI.CustomInsertLogRecord 'TRADE_RSAB','ValueDate:09 Jan 2025:DateTime','COMPLETED','2025-01-10 05:43:00.000'

EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:09 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','RUNNING','2025-01-10 05:43:00.000'
EXEC UI.CustomInsertLogRecord 'Cache Lookup','ValueDate:09 Jan 2025:DateTime,Report:Tradeable Instrument or Index Report:String','COMPLETED','2025-01-10 05:51:00.000'

EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:09 Jan 2025:DateTime,EndDate:09 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-10 05:51:00.000'
EXEC UI.CustomInsertLogRecord 'Calc PnL - Alchemy','StartDate:09 Jan 2025:DateTime,EndDate:09 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-10 06:07:00.000'

EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:09 Jan 2025:DateTime,EndDate:09 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','RUNNING','2025-01-10 06:07:00.000'
EXEC UI.CustomInsertLogRecord 'Calc TB - Alchemy','StartDate:09 Jan 2025:DateTime,EndDate:09 Jan 2025:DateTime,Scope:All Trial Balance Books Basket:String,UpdateWarehouse:True:Boolean','COMPLETED','2025-01-10 06:21:00.000'

