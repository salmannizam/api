

# reset password of local mssql
sqlcmd -S localhost -E

sqlcmd -S localhost -U sa -P "OldPassword"

ALTER LOGIN sa WITH PASSWORD = 'NewPassword123';
GO

sqlcmd -S localhost -U sa -P "NewPassword123"


net start mssqlserver



{
  "OutletMasterImport": [
    {
      "SurveyID": 101,
      "ResultID": 202,
      "Outlet_Name": "Store A",
      "State": "California",
      "Location": "Downtown",
      "Address": "123 Main Street",
      "Zone": "North",
      "StartDate": "2025-01-25",
      "StartTime": "08:00 AM",
      "EndDate": "2025-01-25",
      "EndTime": "06:00 PM",
      "ProjectId": "P1234"
    },
    {
      "SurveyID": 102,
      "ResultID": 203,
      "Outlet_Name": "Store B",
      "State": "New York",
      "Location": "Midtown",
      "Address": "456 7th Avenue",
      "Zone": "East",
      "StartDate": "2025-01-26",
      "StartTime": "09:00 AM",
      "EndDate": "2025-01-26",
      "EndTime": "05:00 PM",
      "ProjectId": "P5678"
    }
  ],
  "SurveyResultsImport": [
    {
      "SurveyID": "101",
      "ResultID": "202",
      "QuestionID": 1,
      "AnswerID": "A1",
      "AnswerText": "Yes",
      "Location": "Store A - Downtown",
      "Remarks": "Positive feedback",
      "DeviceID": "Device_001",
      "ProjectId": "P1234"
    },
    {
      "SurveyID": "102",
      "ResultID": "203",
      "QuestionID": 2,
      "AnswerID": "B2",
      "AnswerText": "No",
      "Location": "Store B - Midtown",
      "Remarks": "Negative feedback",
      "DeviceID": "Device_002",
      "ProjectId": "P5678"
    }
  ]
}


/****************************
Survey Data: {
  SurveyID: 'S20250127221838',
  ResultID: '20250127221838',
  'Outlet Name': 'Vbb',
  State: 'Vbbb',
  Location: 'Cvvb',
  Address: 'Bb ',
  Zone: 'South',
  StartDate: '20250127',
  StartTime: '221838',
  EndDate: '20250127',
  EndTime: '233449',
  ProjectId: 'Test1712'
}
Survey Data: [
  {
    SurveyID: 'S20250127221838',
    ResultID: '20250127221838',
    QuestionID: 10033164,
    AnswerID: '10033164-1',
    AnswerText: 'HJ',
    Location: '',
    Remarks: '',
    DeviceID: '694e9289ac7ab5ea',
    ProjectId: 'Test1712'
  },
  {
    SurveyID: 'S20250127221838',
    ResultID: '20250127221838',
    QuestionID: 10033165,
    AnswerID: '10033165-1',
    AnswerText: 'ml.',
    Location: '',
    Remarks: '',
    DeviceID: '694e9289ac7ab5ea',
    ProjectId: 'Test1712'
  },
  {
    SurveyID: 'S20250127221838',
    ResultID: '20250127221838',
    QuestionID: 10033166,
    AnswerID: '10033166-1',
    AnswerText: '500',
    Location: '',
    Remarks: '',
    DeviceID: '694e9289ac7ab5ea',
    ProjectId: 'Test1712'
  },
  {
    SurveyID: 'S20250127221838',
    ResultID: '20250127221838',
    QuestionID: 10033167,
    AnswerID: '10033167-1',
    AnswerText: '99',
    Location: '',
    Remarks: '',
    DeviceID: '694e9289ac7ab5ea',
    ProjectId: 'Test1712'
  },
  {
    SurveyID: 'S20250127221838',
    ResultID: '20250127221838',
    QuestionID: 10033168,
    AnswerID: '10033168-1',
    AnswerText: 'LK',
    Location: '',
    Remarks: '',
    DeviceID: '694e9289ac7ab5ea',
    ProjectId: 'Test1712'
  },
  {
    SurveyID: 'S20250127221838',
    ResultID: '20250127221838',
    QuestionID: 10033169,
    AnswerID: '10033169-1',
    AnswerText: '99',
    Location: '',
    Remarks: '',
    DeviceID: '694e9289ac7ab5ea',
    ProjectId: 'Test1712'
  },
  {
    SurveyID: 'S20250127221838',
    ResultID: '20250127221838',
    QuestionID: 10033170,
    AnswerID: '10033170-1',
    AnswerText: '99',
    Location: '',
    Remarks: '',
    DeviceID: '694e9289ac7ab5ea',
    ProjectId: 'Test1712'
  },
  {
    SurveyID: 'S20250127221838',
    ResultID: '20250127221838',
    QuestionID: 10033171,
    AnswerID: '10033171-1',
    AnswerText: '88',
    Location: '',
    Remarks: '',
    DeviceID: '694e9289ac7ab5ea',
    ProjectId: 'Test1712'
  }
]


*///////////////////
USE [SURVEY]
GO
/****** Object:  StoredProcedure [dbo].[OutletImportJSONSAVE]    Script Date: 27-01-2025 22:41:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*DECLARE @JSON_INPUT NVARCHAR(MAX)
SET @JSON_INPUT='{
	"BaselinePVP": [
		{
			"BaselineId": 52 
			,"Channel": "Another" 
			,"Cate-- G0ry":"SSD"  
			,"Brand": "CANADA DRY" 
			,"Flavor":"Gingerale"  
			,"Packaging":"PET"  
			,"PackSize":"500"
			,"Quantity":1
			,"Volume":53685.2200  
			,"GrossSalesRevenue":53685.2200  
			,"NetSalesRevenue":53685.2200  
			,"OperatingCOGS":53685.2200 
			,"WarehouseAndDistributionCost":53685.2200  
			,"ChannelNew":"Another"
			,"Cate-- G0ryNew":"SSD DRY"  
			,"PackNew":"PET 500"  				 
            ,"UserId":"abc"
            ,"Status":1						
		}
	]
}';
Exec [dbo].[USP_BASELINE_PVP_SAVE] 99
                @JSON_INPUT
				
*/

ALTER PROCEDURE [dbo].[OutletImportJSONSAVE]  
(  
     @JSON_INPUT NVARCHAR(MAX) ,
	 @JSON_INPUT1 NVARCHAR(MAX)  
)  
AS  
BEGIN  
--return;
--return 1/0
 SET NOCOUNT OFF;  
     DECLARE @JSONINPUT NVARCHAR(MAX)=@JSON_INPUT; 
	 DECLARE @JSONINPUT1 NVARCHAR(MAX)=@JSON_INPUT1;  
     DECLARE @VALUE_TYPE VARCHAR(30)=''
       
       
    SELECT [SurveyID]
      ,[ResultID]
      ,[Outlet Name]
      ,[State]
      ,[Location]
      ,[Address]
      ,[Zone]
      ,[StartDate]
      ,[StartTime]
      ,[EndDate]
      ,[EndTime]
      ,[ProjectId]
  INTO #TMP  
     FROM   
          OPENJSON   
               (  
                     @JSONINPUT  
                    ,'$.OutletMasterImport'  
               )   
     WITH  
          (  
                [SurveyID] [int] '$.SurveyID' ,
				[ResultID] [int] '$.ResultID' ,
				[Outlet Name] [nvarchar](255) '$.Outlet_Name',
				[State] [nvarchar](255) '$.State',
				[Location] [nvarchar](255) '$.Location',
				[Address] [nvarchar](255) '$.Address',
				[Zone] [nvarchar](255) '$.Zone',
			[StartDate] [nvarchar](255) '$.StartDate',
			[StartTime] [nvarchar](255) '$.StartTime',
			[EndDate] [nvarchar](255) '$.EndDate'
			,
			[EndTime] [nvarchar](255) '$.EndTime',
			[ProjectId] [nvarchar](255) '$.ProjectId'				
          ); 

		  SELECT [SurveyID]
      ,[ResultID]
      ,[QuestionID]
      ,[AnswerID]
      ,[AnswerText]
      ,[Location]
      ,[Remarks]
      ,[DeviceID]
      ,[ProjectId]  
		INTO #TMP2  
     FROM   
          OPENJSON   
               (  
                     @JSONINPUT1  
                    ,'$.SurveyResultsImport'  
               )   
     WITH  
          (  
				[SurveyID] NVARCHAR(15) '$.SurveyID', 
				[ResultID] NVARCHAR(15) '$.ResultID',
                [QuestionID] int '$.QuestionID'  
               ,[AnswerID] NVARCHAR(25) '$.AnswerID'
			   ,[AnswerText] NVARCHAR(250) '$.AnswerText'
			   ,[Location] NVARCHAR(255) '$.Location'
			   ,[Remarks] NVARCHAR(250) '$.Remarks' 
			   ,[DeviceID] NVARCHAR(255) '$.DeviceID'
               ,[ProjectId] NVARCHAR(255) '$.ProjectId'
		  );      

		   insert into test1712
				SELECT [SurveyID]
      ,[ResultID]
      ,[Outlet Name]
      ,[State]
      ,[Location]
      ,[Address]
      ,[Zone]
      ,[StartDate]
      ,[StartTime]
      ,[EndDate]
      ,[EndTime]
      ,[ProjectId]
				  FROM [dbo].[#Tmp]
				except
				SELECT [SurveyID]
      ,[ResultID]
      ,[Outlet Name]
      ,[State]
      ,[Location]
      ,[Address]
      ,[Zone]
      ,[StartDate]
      ,[StartTime]
      ,[EndDate]
      ,[EndTime]
      ,[ProjectId]
				  FROM [dbo].[test1712]
		where [Outlet Name]=(select [outlet name] FROM [dbo].[#Tmp] )


		insert into [dbo].[SurveyResults]
			 SELECT [SurveyID]
      ,[ResultID]
      ,[QuestionID]
      ,[AnswerID]
      ,[AnswerText]
      ,[Location]
      ,[Remarks]
      ,[DeviceID]
      ,[ProjectId] FROM [dbo].[#TMP2]			  
	  
  SELECT 'INSERT SUCCESSFULLY' MESSAGE,'SUCCESS' RESULT
 
 END