DROP TABLE UI.Process
CREATE TABLE UI.Process (
            [ID] INT IDENTITY(1,1) PRIMARY KEY,
            [Name] VARCHAR(255) NOT NULL,
			[DisplayName] VARCHAR(255) NOT NULL,
			[DeterminationType] VARCHAR(255) NOT NULL,
			[isDepricated] BIT NOT NULL DEFAULT 0,
			CONSTRAINT UQ_ProcessName UNIQUE ([Name]),
			CONSTRAINT UQ_ProcessDisplayName UNIQUE ([DisplayName])
        );
		-- Add FK Constraints
		--ALTER TABLE dbo.Process WITH NOCHECK
		--ADD CONSTRAINT FK_ProcessType FOREIGN KEY (ProcessTypeID) REFERENCES dbo.ProcessType([ID])

INSERT INTO UI.Process ([Name],[DisplayName],[DeterminationType])
VALUES	('Allie Process','Allie Process','Calculated'),

		('Lookup','Cache Morning Lookups','Calculated'),
		('Cache Lookup','Cache Lookup','Logged'),

		('PnL - Alchemy','PnL - Alchemy','Calculated'),
		('Calc PnL - Alchemy','Calc PnL - Alchemy','Logged'),

		('TB - Alchemy','TB - Alchemy','Calculated'),
		('Calc TB - Alchemy','Calc TB - Alchemy','Logged'),

		('All Alchemy Source Files','All Alchemy Source Files','Calculated'),

		('TRADE_CRN','TRADE_CRN','Logged'),
		('TRADE_ELNA','TRADE_ELNA','Logged'),
		('TRADE_RSAB','TRADE_RSAB','Logged'),

		('Prepare Reporting - Hiport','Hiport Stragetic Reporting','Calculated'),

		('PnL - Hiport','PnL - Hiport','Calculated'),
		('Calc PnL - Hiport','Calc PnL - Hiport','Logged'),

		('TB - Hiport','TB - Hiport','Calculated'),
		('Calc TB - Hiport','Calc TB - Hiport','Logged'),

		('All Hiport Source Files','All Hiport Source Files','Calculated'),
		('H2_HOLDING','H2_HOLDING','Logged'),
		('H3_HOLDING','H3_HOLDING','Logged')

INSERT INTO UI.Process ([Name],[DisplayName],[DeterminationType])
VALUES	('Warehouse Load - PnL - Alchemy - Delete','Warehouse Load - PnL - Alchemy - Delete','Logged'),
		('Warehouse Load - PnL - Alchemy - Update','Warehouse Load - PnL - Alchemy - Update','Logged'),
		('Warehouse Load - TB - Alchemy - Delete','Warehouse Load - TB - Alchemy - Delete','Logged'),
		('Warehouse Load - TB - Alchemy - Update','Warehouse Load - TB - Alchemy - Update','Logged')

INSERT INTO UI.Process ([Name],[DisplayName],[DeterminationType])
VALUES	('Alchemy Quintessence','Alchemy Quintessence','Logged'),
		('Market Data Reports','Market Data Reports','Logged'),
		('A2_EQ_CD','A2_EQ_CD','Logged'),
		('A2_EQ_VD','A2_EQ_VD','Logged'),
		('A2_IR_VD','A2_IR_VD','Logged'),
		('A2_IR_CD','A2_IR_CD','Logged'),

		('A2_FX_VD_VOLS','A2_FX_VD_VOLS','Logged'),
		('A2_FX_CD','A2_FX_CD','Logged'),
		('A2_FX_VD','A2_FX_VD','Logged'),

		('A2_IR_VD_FOREIGN','A2_IR_VD_FOREIGN','Logged'),
		('A2_EQ_CD_MSCI','A2_EQ_CD_MSCI','Logged'),
		('A2_EQ_VD_MSCI','A2_EQ_VD_MSCI','Logged'),
		('Expanded Bond PDH','Expanded Bond PDH','Logged'),

		('Bloomberg MD','Bloomberg MD','Logged'),
		('Bloomberg MD2','Bloomberg MD2','Logged'),
		('MTM Detailed','MTM Detailed','Logged'),
		
		('ED.ZIP','ED.ZIP','Logged'),
		('SecurityData','SecurityData','Logged'),
		('Bloomberg MD3','Bloomberg MD3','Logged'),

		('I.ZIP','I.ZIP','Logged'),
		('CompanyData','CompanyData','Logged'),

		('SI.ZIP','SI.ZIP','Logged'),
		('IR.ZIP','IR.ZIP','Logged'),

		('MRS_LIBERTY_MRKDATA','MRS_LIBERTY_MRKDATA','Logged'),
		
		('LIBERTY_RESOURCES_ExchangeCloseJSE_EQVol_Index_Exchange','LIBERTY_RESOURCES_ExchangeCloseJSE_EQVol_Index_Exchange','Logged')

INSERT INTO UI.Process ([Name],[DisplayName],[DeterminationType])
VALUES	('Atlas Quintessence','Atlas Quintessence','Logged')

SELECT *
FROM UI.Process

DELETE 
FROM UI.Process
where id >= 21


DROP TABLE UI.Relationship
CREATE TABLE UI.Relationship (
            [NodeID] INT IDENTITY(1,1) PRIMARY KEY,
			[ReportDate] DateTime,
            [ParentID] INT NOT NULL,
			[ChildID] INT NOT NULL,
			[ChildOrder] INT,
			[isRequired] BIT NOT NULL DEFAULT 1,
			[isVisible] BIT NOT NULL DEFAULT 1);
			-- Add FK Constraints
		ALTER TABLE UI.Relationship WITH NOCHECK
		ADD CONSTRAINT FK_ParentID FOREIGN KEY ([ParentID]) REFERENCES UI.Process([ID]);

		ALTER TABLE UI.Relationship WITH NOCHECK
		ADD CONSTRAINT FK_ChildID FOREIGN KEY ([ChildID]) REFERENCES UI.Process([ID]);
    
ALTER PROCEDURE [UI].[InsertRelationship]
    @ParentName VARCHAR(255),
    @ChildName VARCHAR(255),
	@ChildOrder INT = 1,
	@IsRequired BIT = 1,
	@IsVisible INT = 1
AS
BEGIN
    DECLARE @ParentID INT, @ChildID INT;

    -- Get the ParentID
    SELECT @ParentID = ID FROM UI.Process WHERE [Name] = @ParentName;
    IF @ParentID IS NULL
    BEGIN
        PRINT 'Parent process not found';
        RETURN;
    END

    -- Get the ChildID
    SELECT @ChildID = ID FROM UI.Process WHERE [Name] = @ChildName;
    IF @ChildID IS NULL
    BEGIN
        PRINT 'Child process not found';
        RETURN;
    END

	
	
    -- Insert the relationship
    IF NOT EXISTS (SELECT 1 FROM UI.Relationship WHERE ParentID = @ParentID AND ChildID = @ChildID)
    BEGIN
        INSERT INTO UI.Relationship (ReportDate, ParentID, ChildID,ChildOrder,isRequired,isVisible)
        VALUES (GETDATE(),@ParentID, @ChildID,@ChildOrder,@IsRequired,@IsVisible);

        PRINT 'Relationship inserted successfully';
    END
    ELSE
    BEGIN
        PRINT 'Relationship already exists';
    END
END;
;

EXEC UI.InsertRelationship 'Prepare Reporting - Alchemy and CashMi','Lookup',1,0,1
EXEC UI.InsertRelationship 'Prepare Reporting - Alchemy and CashMi','PnL - Alchemy',2,1,1
EXEC UI.InsertRelationship 'Prepare Reporting - Alchemy and CashMi','TB - Alchemy',3,1,1

EXEC UI.InsertRelationship 'Lookup','All Alchemy Source Files',1,1,1
EXEC UI.InsertRelationship 'Lookup','Cache Lookup',2,1,1

EXEC UI.InsertRelationship 'PnL - Alchemy','All Alchemy Source Files',1,1,1
EXEC UI.InsertRelationship 'PnL - Alchemy','Calc PnL - Alchemy',2,1,1

EXEC UI.InsertRelationship 'TB - Alchemy','All Alchemy Source Files',1,1,1
EXEC UI.InsertRelationship 'TB - Alchemy','Calc TB - Alchemy',2,1,1

EXEC UI.InsertRelationship 'All Alchemy Source Files','TRADE_CRN',0,1,1
EXEC UI.InsertRelationship 'All Alchemy Source Files','TRADE_ELNA',0,1,1
EXEC UI.InsertRelationship 'All Alchemy Source Files','TRADE_RSAB',0,1,1

EXEC UI.InsertRelationship 'Prepare Reporting - Hiport','PnL - Hiport',1,1,1
EXEC UI.InsertRelationship 'Prepare Reporting - Hiport','TB - Hiport',2,1,1

EXEC UI.InsertRelationship 'PnL - Hiport','All Hiport Source Files',1,1,1
EXEC UI.InsertRelationship 'PnL - Hiport','Calc PnL - Hiport',2,1,1

EXEC UI.InsertRelationship 'TB - Hiport','All Hiport Source Files',1,1,1
EXEC UI.InsertRelationship 'TB - Hiport','Calc TB - Hiport',2,1,1

EXEC UI.InsertRelationship 'All Hiport Source Files','H2_HOLDING',0,1,1
EXEC UI.InsertRelationship 'All Hiport Source Files','H3_HOLDING',0,1,1


-- Alchemy Quintessence Setup
-- Parent, Child, Order, Order, Requirement, Visible
EXEC UI.InsertRelationship 'Alchemy Quintessence','Market Data Reports',1,1,1

EXEC UI.InsertRelationship 'Market Data Reports','A2_EQ_CD',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','A2_EQ_VD',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','A2_IR_VD',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','A2_IR_CD',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','A2_FX_VD_VOLS',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','A2_FX_CD',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','A2_FX_VD',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','A2_IR_VD_FOREIGN',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','A2_EQ_CD_MSCI',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','A2_EQ_VD_MSCI',0,1,1
EXEC UI.InsertRelationship 'Market Data Reports','Expanded Bond PDH',0,1,1

EXEC UI.InsertRelationship 'A2_EQ_CD','Bloomberg MD',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_CD','Bloomberg MD2',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_CD','ED.ZIP',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_CD','I.ZIP',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_CD','SI.ZIP',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_CD','MRS_LIBERTY_MRKDATA',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_CD','LIBERTY_RESOURCES_ExchangeCloseJSE_EQVol_Index_Exchange',0,1,1

EXEC UI.InsertRelationship 'A2_EQ_VD','Bloomberg MD',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_VD','Bloomberg MD2',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_VD','ED.ZIP',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_VD','I.ZIP',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_VD','SI.ZIP',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_VD','MRS_LIBERTY_MRKDATA',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_VD','LIBERTY_RESOURCES_ExchangeCloseJSE_EQVol_Index_Exchange',0,1,1

EXEC UI.InsertRelationship 'A2_IR_VD','Bloomberg MD',0,1,1
EXEC UI.InsertRelationship 'A2_IR_VD','Bloomberg MD2',0,1,1
EXEC UI.InsertRelationship 'A2_IR_VD','SecurityData',0,1,1
EXEC UI.InsertRelationship 'A2_IR_VD','CompanyData',0,1,1
EXEC UI.InsertRelationship 'A2_IR_VD','IR.ZIP',0,1,1
EXEC UI.InsertRelationship 'A2_IR_VD','MTM Detailed',0,1,1

EXEC UI.InsertRelationship 'A2_IR_CD','Bloomberg MD',0,1,1
EXEC UI.InsertRelationship 'A2_IR_CD','Bloomberg MD2',0,1,1
EXEC UI.InsertRelationship 'A2_IR_CD','SecurityData',0,1,1
EXEC UI.InsertRelationship 'A2_IR_CD','CompanyData',0,1,1
EXEC UI.InsertRelationship 'A2_IR_CD','IR.ZIP',0,1,1
EXEC UI.InsertRelationship 'A2_IR_CD','MTM Detailed',0,1,1

EXEC UI.InsertRelationship 'A2_FX_VD_VOLS','Bloomberg MD2',0,1,1

EXEC UI.InsertRelationship 'A2_FX_CD','Bloomberg MD',0,1,1
EXEC UI.InsertRelationship 'A2_FX_CD','Bloomberg MD2',0,1,1

EXEC UI.InsertRelationship 'A2_FX_VD','Bloomberg MD',0,1,1
EXEC UI.InsertRelationship 'A2_FX_VD','Bloomberg MD2',0,1,1

EXEC UI.InsertRelationship 'A2_IR_VD_FOREIGN','Bloomberg MD',0,1,1
EXEC UI.InsertRelationship 'A2_IR_VD_FOREIGN','Bloomberg MD2',0,1,1

EXEC UI.InsertRelationship 'A2_EQ_CD_MSCI','Bloomberg MD',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_CD_MSCI','Bloomberg MD2',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_CD_MSCI','Bloomberg MD3',0,1,1

EXEC UI.InsertRelationship 'A2_EQ_VD_MSCI','Bloomberg MD',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_VD_MSCI','Bloomberg MD2',0,1,1
EXEC UI.InsertRelationship 'A2_EQ_VD_MSCI','Bloomberg MD3',0,1,1

EXEC UI.InsertRelationship 'Expanded Bond PDH','MTM Detailed',0,1,1

EXEC UI.InsertRelationship 'Atlas Quintessence', 'Prepare Reporting - Alchemy and CashMi',0,1,1



select *
from UI.vwRelationship

		--('Prepare Reporting - Hiport','Hiport Stragetic Reporting','Calculated'),

		--('PnL - Hiport','PnL - Hiport','Calculated'),
		--('Calc PnL - Hiport','Calc PnL - Hiport','Logged'),

		--('TB - Hiport','TB - Hiport','Calculated'),
		--('Calc TB - Hiport','Calc TB - Hiport','Logged'),

		--('All Hiport Source Files','All Hiport Source Files','Calculated'),
		--('H2_HOLDING','H2_HOLDING','Logged'),
		--('H3_HOLDING','H3_HOLDING','Logged')

TRUNCATE TABLE UI.Relationship
SELECT *
FROM UI.Relationship

ALTER VIEW [UI].[vwRelationship] AS
SELECT 
    r.NodeID AS RelationshipNodeID,
	r.ReportDate,
    parent.[Name] AS ParentProcessName,
	child.[Name] as ChildProcessName,
	r.ChildOrder,
	r.isRequired,
	r.isVisible
FROM 
    UI.Relationship r
INNER JOIN 
    UI.Process parent ON r.ParentID = parent.ID
INNER JOIN 
    UI.Process child ON r.ChildID = child.ID;

SELECT *
FROM UI.vwRelationship

-- Parallel Process Table
DROP TABLE UI.ParallelProcess
CREATE TABLE UI.ParallelProcess (
            [ID] INT IDENTITY(1,1) PRIMARY KEY,
			[ParentID] INT NOT NULL,
			[ParallelProcessID] INT NOT NULL,
			[Order] INT NOT NULL);
			-- Add FK Constraints
		ALTER TABLE UI.ParallelProcess WITH NOCHECK
		ADD CONSTRAINT FK_ParallelParentID FOREIGN KEY ([ParentID]) REFERENCES UI.Process([ID]);

		ALTER TABLE UI.ParallelProcess WITH NOCHECK
		ADD CONSTRAINT FK_ParallelProcessID FOREIGN KEY ([ParallelProcessID]) REFERENCES UI.Process([ID]);

ALTER PROCEDURE [UI].[InsertParallelProcess]
    @ParentName VARCHAR(255),
    @ChildName VARCHAR(255),
	@Order INT
AS
BEGIN
    DECLARE @ParentID INT, @ChildID INT;

    -- Get the ParentID
    SELECT @ParentID = ID FROM UI.Process WHERE [Name] = @ParentName;
    IF @ParentID IS NULL
    BEGIN
        PRINT 'Parent process not found';
        RETURN;
    END

    -- Get the ChildID
    SELECT @ChildID = ID FROM UI.Process WHERE [Name] = @ChildName;
    IF @ChildID IS NULL
    BEGIN
        PRINT 'Child process not found';
        RETURN;
    END

	
	
    -- Insert the parallel process
    IF NOT EXISTS (SELECT 1 FROM UI.Relationship WHERE ParentID = @ParentID AND ChildID = @ChildID)
    BEGIN
        INSERT INTO UI.ParallelProcess (ParentID,ParallelProcessID,[Order])
        VALUES (@ParentID, @ChildID,@Order);

        PRINT 'Parallel process inserted successfully';
    END
    ELSE
    BEGIN
        PRINT 'Parallel process already exists';
    END
END;
;

TRUNCATE TABLE UI.ParallelProcess

-- Populate Parallel Process Table
EXEC UI.InsertParallelProcess 'PnL - Alchemy','Warehouse Load - PnL - Alchemy - Delete',1
EXEC UI.InsertParallelProcess 'PnL - Alchemy','Warehouse Load - PnL - Alchemy - Update',2
EXEC UI.InsertParallelProcess 'TB - Alchemy','Warehouse Load - TB - Alchemy - Delete',1
EXEC UI.InsertParallelProcess 'TB - Alchemy','Warehouse Load - TB - Alchemy - Update',2

-- Create Parallel Process View
ALTER VIEW [UI].[vwParallelProcess] AS
SELECT 
	pp.ID,
	parent.[Name] as ParentProcessName,
	child.[Name] as ParallelProcessName,
	pp.[Order]
FROM 
    UI.ParallelProcess pp
INNER JOIN 
    UI.Process parent ON pp.ParentID = parent.ID
INNER JOIN 
    UI.Process child ON pp.ParallelProcessID = child.ID;

SELECT *
FROM UI.vwParallelProcess

DROP TABLE UI.[State]
CREATE TABLE UI.[State] (
            [ID] INT IDENTITY(1,1) PRIMARY KEY,
			[Name] VARCHAR(255) NOT NULL,
            [Ordinal] INT NOT NULL,
			[isDefault] BIT NOT NULL DEFAULT 0);

TRUNCATE TABLE UI.[State]
INSERT INTO UI.[State] ([Name],[Ordinal],[isDefault])
VALUES	('FAILED',1,0),

		('WAITING',2,1),


		
		('RUNNING',3,0),


		('COMPLETED',4,0)

SELECT *
FROM UI.[State]

DROP TABLE UI.[ProcessLog]
CREATE TABLE UI.[ProcessLog] (
            [ID] INT IDENTITY(1,1) PRIMARY KEY,
			[ProcessID] INT NOT NULL,
			[Context] XML NOT NULL,
            [StateID] INT NOT NULL,
			[TimeStamp] DateTime NOT NULL DEFAULT GETDATE(),
			[Date] Date NOT NULL);
				-- Add FK Constraints
		ALTER TABLE UI.[ProcessLog] WITH NOCHECK
		ADD CONSTRAINT FK_ProcessID FOREIGN KEY ([ProcessID]) REFERENCES UI.Process([ID]);

		ALTER TABLE UI.[ProcessLog] WITH NOCHECK
		ADD CONSTRAINT FK_StateID FOREIGN KEY ([StateID]) REFERENCES UI.[State]([ID]);


ALTER PROCEDURE [UI].[InsertLogRecord]
    @Process VARCHAR(255),
    @Context VARCHAR(MAX),
	@State VARCHAR(255)
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
        VALUES (@ProcessID, @ContextXML, @StateID, GETDATE(),cast(getdate() as DATE));

        PRINT 'Process Info Logged Successfull';
    END
   
END;


DROP VIEW UI.vwProcessLog
ALTER VIEW [UI].[vwProcessLog] AS
SELECT 
    pl.ID,
	p.[Name],
	pl.Context,
	s.[Name] as 'StateName',
	pl.[TimeStamp],
	pl.[Date]

FROM 
    UI.ProcessLog pl
INNER JOIN 
    UI.Process p ON pl.ProcessID = p.ID
INNER JOIN 
    UI.[State] s ON pl.StateID = s.ID;

SELECT *
FROM UI.vwProcessLog

SELECT top(1) [StateName]
    FROM (
        select *, ROW_NUMBER() OVER (Partition by [Name], cast(Context as varchar(max)) order by [TimeStamp] desc) as row_num
        from UI.vwProcessLog

        where [name] = 'TRADE_CRN' ) ranked_log_data
    WHERE ranked_log_data.row_num = 1
    ORDER BY [TimeStamp] DESC

SELECT 
    ID, -- Assuming there's a unique identifier column in the table
	[Name],
    Item.value('@Key', 'NVARCHAR(100)') AS [Key],
	Item.value('@Value', 'NVARCHAR(100)') AS [Value],
	[StateName],
	[TimeStamp]

FROM 
    UI.vwProcessLog

CROSS APPLY 
    [Context].nodes('/KeyValuePairs/Item') AS KeyValue(Item)




-- Table of tasks that can be kicked off via API
DROP TABLE UI.APIProcess
CREATE TABLE UI.APIProcess (
            [ID] INT IDENTITY(1,1) PRIMARY KEY,
            [Name] VARCHAR(255) NOT NULL,
			[Configuration] XML NOT NULL);
INSERT INTO UI.APIProcess ([Name],[Configuration])
VALUES	('Rerun Warehouse Load',cast('<Process><Name>Rerun Warehouse Load</Name><ParameterCollection><Parameter><Name>ValueDate</Name><Value>-1</Value></Parameter><Parameter><Name>Scope</Name><Value>All Trial Balance Books Basket</Value></Parameter><Parameter><Name>UpdateWarehouse</Name><Value>True</Value></Parameter><Parameter><Name>Notify</Name><Value>True</Value></Parameter></ParameterCollection></Process>' as xml)),
		('Export CSV File',cast('<Process><Name>Export CSV File</Name><ParameterCollection><Parameter><Name>FileName</Name><Value>data_export.csv</Value></Parameter><Parameter><Name>ExportLocation</Name><Value>/exports/files/</Value></Parameter></ParameterCollection></Process>' as xml))		
select *
from UI.APIProcess

select *
from UI.state


SELECT *
FROM UI.processlog

EXEC UI.InsertLogRecord 'Prepare Reporting - Alchemy and CashMi','ValueDate:22 Dec 2024:DateTime','RUNNING'
EXEC UI.InsertLogRecord 'Prepare Reporting - Alchemy and CashMi','ValueDate:22 Dec 2024:DateTime','COMPLETED'

EXEC UI.InsertLogRecord 'Prepare Reporting - Hiport','ValueDate:23 Dec 2024:DateTime','RUNNING'
EXEC UI.InsertLogRecord 'Prepare Reporting - Hiport','ValueDate:23 Dec 2024:DateTime','COMPLETED'

EXEC UI.InsertLogRecord 'Calc PnL - Alchemy','ValueDate:23 Dec 2024:DateTime','RUNNING'
EXEC UI.InsertLogRecord 'Calc PnL - Alchemy','ValueDate:23 Dec 2024:DateTime','COMPLETED'

SELECT *
FROM UI.vwProcessLog

select *
from UI.ProcessLog

TRUNCATE TABLE UI.ProcessLog

SELECT *
FROM UI.Relationship

INSERT INTO UI.Process ([Name],[DisplayName],[DeterminationType])
VALUES	('UniCalc Process','UniCalc Process','Calculated'),
		('JSE','JSE','Logged'),
		('Bloomberg','Bloomberg','Logged')

EXEC UI.InsertRelationship 'UniCalc Process','JSE',1,1,1
EXEC UI.InsertRelationship 'UniCalc Process','Bloomberg',2,1,1

EXEC UI.InsertLogRecord 'JSE','ValueDate:24 Dec 2024:DateTime','RUNNING'

EXEC UI.InsertLogRecord 'Cache Lookup','ValueDate:06 Jan 2025:DateTime','RUNNING'
EXEC UI.InsertLogRecord 'Cache Lookup','ValueDate:06 Jan 2025:DateTime','COMPLETED'
EXEC UI.InsertLogRecord 'Calc PnL - Alchemy','ValueDate:25 Dec 2024:DateTime','RUNNING'
EXEC UI.InsertLogRecord 'Calc PnL - Alchemy','ValueDate:25 Dec 2024:DateTime','COMPLETED'
EXEC UI.InsertLogRecord 'Calc TB - Alchemy','ValueDate:25 Dec 2024:DateTime','RUNNING'
EXEC UI.InsertLogRecord 'Calc TB - Alchemy','ValueDate:25 Dec 2024:DateTime','COMPLETED'

EXEC UI.InsertLogRecord 'TRADE_CRN','ValueDate:13 Jan 2025:DateTime','RUNNING'
EXEC UI.InsertLogRecord 'TRADE_CRN','ValueDate:13 Jan 2025:DateTime','COMPLETED'

EXEC UI.InsertLogRecord 'TRADE_ELNA','ValueDate:13 Jan 2025:DateTime','RUNNING'
EXEC UI.InsertLogRecord 'TRADE_ELNA','ValueDate:13 Jan 2025:DateTime','COMPLETED'

EXEC UI.InsertLogRecord 'TRADE_RSAB','ValueDate:13 Jan 2025:DateTime','RUNNING'
EXEC UI.InsertLogRecord 'TRADE_RSAB','ValueDate:13 Jan 2025:DateTime','COMPLETED'

SELECT *
FROM UI.ProcessLog

SELECT *
FROM UI.vwProcessLog

update UI.ProcessLog
set [TimeStamp] = cast('2025-01-13 06:05:49.133' as datetime)
where ID = 8

update UI.ProcessLog
set [TimeStamp] = cast('2025-01-13 06:15:49.133' as datetime)
where ID = 9

update UI.ProcessLog
set [TimeStamp] = cast('2025-01-13 06:13:49.133' as datetime)
where ID = 10

update UI.ProcessLog
set [TimeStamp] = cast('2025-01-13 06:23:49.133' as datetime)
where ID = 11

update UI.ProcessLog
set [TimeStamp] = cast('2025-01-13 06:20:49.133' as datetime)
where ID = 12

update UI.ProcessLog
set [TimeStamp] = cast('2025-01-13 06:45:49.133' as datetime)
where ID = 13

DELETE
FROM UI.ProcessLog
where ID = 5

select *
from UI.APIProcess

-- BUILD AN INDEX FOR UI.ProcessLog

CREATE NONCLUSTERED INDEX IX_ProcessLog_Date
ON UI.ProcessLog([Date])

SELECT *
FROM UI.vwProcessLog
WHERE [DATE] = '2025-01-14'

SELECT *
FROM UI.ProcessLog
WHERE [DATE] = '2025-01-14'

--Clustered, logic order for frequent queries
CREATE CLUSTERED INDEX IX_ProcessLog_Date_ProcessID
ON UI.ProcessLog([Date],[ProcessID])


SELECT *
FROM UI.vwProcessLog