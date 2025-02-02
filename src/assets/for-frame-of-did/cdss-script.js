//var DID_MAINPAGE = 'http://192.168.130.42/EInternet';
//var DID_PROFILE = 'Account/getProfile';   //post => token = 'avsvsdvsvds'
//var DID_TOKEN = '';
//-----------------------------------------------------
function backtoDID(pageURL) {
  //let url = DID_MAINPAGE + '/Home/FromELicensing';
  //url += '?module=' + pageURL + '&token=' + DID_TOKEN;

  //let messsage = 'goto DID URL : ' + url;
  //console.log(messsage);
  //alert(messsage);
  goOut(pageURL);
}
//-----------------------------------------------------
$(function () {
  $("#menu").kendoMenu();
});
