
/**
 * TENDER HISAB - Google Apps Script Backend
 * 
 * 1) Create a new Google Sheet.
 * 2) Extensions > Apps Script.
 * 3) Replace the default Code.gs with this file.
 * 4) Deploy > New deployment > Web app.
 * 5) Execute as: Me
 * 6) Who has access: Anyone with the link (or your organization's option).
 * 7) Copy the Web App URL into the app's Google Sheets settings.
 *
 * This backend stores JSON records in separate sheets and supports GET/POST.
 */

const SHEETS = {
  tenders: 'Tenders',
  projects: 'Projects',
  expenses: 'Expenses',
  vendors: 'Vendors',
  vendorTx: 'VendorTransactions',
  investors: 'Investors',
  investorTx: 'InvestorTransactions',
  settings: 'Settings'
};

const HEADERS = {
  Tenders: ['id','tenderId','name','dept','security','schedule','other','status','securityStatus','returnDate','note','createdAt','updatedAt'],
  Projects: ['id','projectId','tenderId','name','dept','contract','pg','pgStatus','pgReleaseDate','start','end','note','status','createdAt','updatedAt'],
  Expenses: ['id','projectId','date','cat','amount','vendorId','desc','createdAt','updatedAt'],
  Vendors: ['id','name','contact','address','note','createdAt','updatedAt'],
  VendorTransactions: ['id','vendorId','projectId','date','type','amount','description','note','createdAt','updatedAt'],
  Investors: ['id','name','ownershipPercentage','createdAt','updatedAt'],
  InvestorTransactions: ['id','investorId','date','type','amount','note','createdAt','updatedAt'],
  Settings: ['key','value']
};

function doGet(e) {
  const action = (e.parameter.action || 'health').toLowerCase();
  if (action === 'health') return json_({ok:true, service:'Tender Hisab', time:new Date().toISOString()});
  if (action === 'all') return json_({ok:true, data: readAll_()});
  return json_({ok:false,error:'Unknown action'});
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = body.action || '';
    if (action === 'init') {
      initSheets_();
      return json_({ok:true,message:'Sheets initialized'});
    }
    if (action === 'sync') {
      initSheets_();
      writeAll_(body.data || {});
      return json_({ok:true,message:'Sync completed',time:new Date().toISOString()});
    }
    return json_({ok:false,error:'Unknown action'});
  } catch(err) {
    return json_({ok:false,error:String(err)});
  }
}

function initSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach(name => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    const headers = HEADERS[name];
    if (sh.getLastRow() === 0) {
      sh.getRange(1,1,1,headers.length).setValues([headers]);
      sh.setFrozenRows(1);
    } else {
      sh.getRange(1,1,1,headers.length).setValues([headers]);
    }
  });
}

function readAll_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const out = {};
  Object.keys(HEADERS).forEach(name => {
    const sh = ss.getSheetByName(name);
    if (!sh || sh.getLastRow() < 2) {
      out[Object.keys(SHEETS).find(k=>SHEETS[k]===name) || name] = [];
      return;
    }
    const values = sh.getRange(2,1,sh.getLastRow()-1,HEADERS[name].length).getValues();
    out[Object.keys(SHEETS).find(k=>SHEETS[k]===name) || name] =
      values.filter(r=>r.some(v=>v!=='')).map(r=>{
        const o={};
        HEADERS[name].forEach((h,i)=>o[h]=r[i]);
        return o;
      });
  });
  return out;
}

function writeAll_(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach(sheetName => {
    const key = Object.keys(SHEETS).find(k=>SHEETS[k]===sheetName);
    if (!key || !Array.isArray(data[key])) return;
    const sh = ss.getSheetByName(sheetName);
    if (!sh) return;
    const headers = HEADERS[sheetName];
    if (sh.getMaxRows() > 1) {
      sh.getRange(2,1,sh.getMaxRows()-1,headers.length).clearContent();
    }
    if (!data[key].length) return;
    const rows = data[key].map(o=>headers.map(h=>o[h] === undefined ? '' : o[h]));
    sh.getRange(2,1,rows.length,headers.length).setValues(rows);
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
