
class RouteDefinition {

  public pageLicense = 'license';

  public pageInit = 'initial';

  public pageNew = 'new';
  public pageNew_Dashboard = '';
  public pageNew_Enter = 'enter';
  public pageNew_Import = 'import';
  public pageNew_Production = 'production';
  public pageNew_Owning = 'owning';
  public pageNew_Substiture = 'substitute';
  public pageNew_SendSample = 'sendsample';
  public pageNew_Export = 'export';
  public pageNew_ExportSpecial = 'export-special';
  public pageNew_CrossBorder = 'cross-border';
  public pageNew_Renewal = 'renewal';
  public pageNew_Reject = 'reject';

  public pageDashboard = '';
  public pageDraft = 'draft';
  public pageDraft_Dashboard = '';
  public pageSubmit = 'submit';
  public pageReceive = 'receive';
  public pageReject = 'reject';
  public pagePending = 'pending';
  public pageApprove = 'approve';

  public pageSearch = 'search';
  public pageHistory = 'history';
  public pageRecycleBin = 'bin';

  public pageUnAuthorize = 'un-authorize';

  //-----------------------------------------------------
  public buildPathWithRoot(...path) {
    let result = '';

    path.forEach(item => {
      result += '/'+item;
    });

    return result;
  }
//-----------------------------------------------------

}
//-----------------------------------------------------
export default (new RouteDefinition());

