import { Address } from '../models/common';

declare var $: any;
declare var moment: any;

export class jQueryHelper {

  //---------------------------------------------------
  public toDatePicker(ele_id, tag:string='', initDate:Date=null, callbackChange:Function=null, lang: string = "th") {

    let dp = $('#' + ele_id);

    if (dp == null) {
      console.log(ele_id + ' not found.');
      return false;
    } else {
      //console.log('found ' + ele_id);
    }

    //if (initDate == null || initDate == undefined) initDate = new Date();

    dp.datepicker({
      language: lang,
      autoclose: true,
      todayHighlight: true,
      thaiyear: true,             // special parameter for bootstrap-datepicker-custom.js
    }).on('changeDate', data => {
      //console.log('change date to : ', data);

      let dateResult = moment(data.date).format();

      //if (callbackChange != null) callbackChange(tag, data.date);
      if (callbackChange != null) callbackChange(tag, dateResult);
    });

    if (initDate != null) {
      setTimeout(() => { dp.datepicker('setDate', initDate); }, 10);
    }

  }
  //---------------------------------------------------
  public toMonthPicker(ele_id, tag: string = '', initDate: Date = null, callbackChange: Function = null, lang: string = "th") {

    let dp = $('#' + ele_id);

    if (dp == null) {
      console.log(ele_id + ' not found.');
      return false;
    } else {
      //console.log('found '+ele_id);
    }

    dp.datepicker({
      format: "MM yyyy",
      startView: "months",
      minViewMode: "months",
      language: lang,
      autoclose: true,
      todayHighlight: true
    }).on('changeMonth', data => {

      let dateResult = moment(data.date).format();

      //if (callbackChange != null) callbackChange(tag, data.date);
      if (callbackChange != null) callbackChange(tag, dateResult);
    });

    if (initDate != null) {
      setTimeout(() => { dp.datepicker('setDate', initDate); }, 10);
    }

  }
  //---------------------------------------------------
  public toDestroy_DatePicker(ele_id) {
    $('#' + ele_id).datepicker('destroy');
  }
  //---------------------------------------------------
  public setDateToDatepicker(ele_id:string, value:Date=null) {

    if (value == null) value = new Date();

    //$('#' + ele_id).datepicker().setDate(value);
    $('#' + ele_id).datepicker('setDate', value);

  }
  //---------------------------------------------------
  public showDatePicker(ele_id, tag:string=''){
    const elem = '#'+ele_id;
    // console.log('showDatePicker: ', elem);
    $(elem).datepicker("show");
  }
}

//https://bootstrap-datepicker.readthedocs.io/en/latest/events.html#changedate

