// export enum LicenseType {
//   NONE = 0,

//   Enter = 2,
//   Import = 3,
//   Production = 4,
//   Owning = 5,

//   // unknown type
//   TYPE_8 = 8,
//   TYPE_9 = 9,
//   TYPE_18 = 18,
//   TYPE_19 = 19,
//   TYPE_20 = 20
// }

export enum LicenseType {
  Unknown = 0,
  Req_Enter = 1,
  License_Enter = 2,
  License_Import = 3,
  License_Production = 4,
  License_Owning = 5,
  Req_Renew = 6,
  Req_Substitue = 7,
  License_Export = 8,
  License_CrossBorder = 9,
  Substitue_License = 10,
  Form_ExplanRequest = 11,
  Doc_RequestExamBackground = 12,
  // =	13	,
  Doc_ExamBackground = 14,
  Doc_Report = 15,
  Req_Export = 16,
  Req_InformExport = 17,
  Doc_InformExport = 18,
  License_Example = 19,
  License_ExportYearly = 20,
  Doc_PlaceReview = 21,
  Result_PlaceReview = 22,
  Doc_Appendix = 23,
  Report_AmamentList = 24,
  Doc_DocumentReview = 25,
  Form_InformExport = 26,
  Doc_Concession = 27,
  Report_InformImport = 28,
}

export enum PermissionMode {
  CREATE = "C",
  EDIT = "E",
  VIEW = "V",
  DELETE = "D",
  SUBMIT = "P",
  TAKEOWNER = "T",
}

//for replace RequestType
export enum RequestDocumentType {
  NONE = 0,
  Owner = 50,
  // --------------------------
  OwnerReferEnter = 51,
  OwnerReferImport = 52,
  OwnerReferProduction = 53,
  OwnerReferSendSample = 54,
  OwnerReferExport = 55,
  OwnerReferExportSpecial = 56,
  OwnerReferCrossBorder = 57,
  // --------------------------
  Enter = 100,
  EnterWithOwner = 150,

  Import = 200,
  ImportWithOwner = 250,

  Production = 300,
  ProductionWithOwner = 350,

  SendSample = 400,
  SendSampleWithOwner = 450,

  Export = 500,
  ExportWithOwner = 550,

  ExportSpecial = 600,
  ExportSpecialWithOwner = 650,

  CrossBorder = 700,
  CrossBorderWithOwner = 750,

  Artty = 800,
  ArttyWithOwner,

  DestroyArmament = 900,
  DestroyArmamentWithOwner,

  //เพิ่มโดย P
  EInternet = 1100,
  EInternetWithOwner = 1150,

  // ------------------------------------------
  Renewal = 10000,
  Renewal_Owner = 10050,

  Renewal_Enter = 10100,
  // Renewal_EnterWithOwner = 10150,

  Renewal_Import = 10200,
  // Renewal_ImportWithOwner = 10250,

  Renewal_Production = 10300,
  // Renewal_ProductionWithOwner = 10350,

  Renewal_SendSample = 10400,
  // Renewal_SendSampleWithOwner = 10450,

  Renewal_Export = 10500,
  // Renewal_ExportWithOwner = 10550,

  Renewal_ExportSpecial = 10600,
  // Renewal_ExportSpecialWithOwner = 10650,

  Renewal_CrossBorder = 10700,
  // Renewal_CrossBorderWithOwner = 10750,

  // ------------------------------------------
  Substitute = 20000,
  Substitute_Owner = 20050,

  Substitute_Enter = 20100,
  // Substitute_EnterWithOwner = 20150,

  Substitute_Import = 20200,
  // Substitute_ImportWithOwner = 20250,

  Substitute_Production = 20300,
  // Substitute_ProductionWithOwner = 20350,

  Substitute_SendSample = 20400,
  // Substitute_SendSampleWithOwner = 20450,

  Substitute_Export = 20500,
  // Substitute_ExportWithOwner = 20550,

  Substitute_ExportSpecial = 20600,
  // Substitute_ExportSpecialWithOwner = 20650,

  Substitute_CrossBorder = 20700,
  // Substitute_CrossBorderWithOwner = 20750,
}
