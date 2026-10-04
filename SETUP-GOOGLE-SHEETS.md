# Tender Hisab V2 — Google Sheets Setup

## 1. Google Sheet তৈরি
একটি নতুন Google Sheet তৈরি করুন।

## 2. Apps Script
Google Sheet → Extensions → Apps Script → Code.gs-এর পুরনো কোড মুছে `Code.gs`-এর কোড বসান।

## 3. Initialize
Apps Script editor-এ `initSheets_` function Run করুন। Google permission চাইলে আপনার Google account দিয়ে Allow করুন।

এতে এই tabs তৈরি হবে:
- Tenders
- Projects
- Expenses
- Vendors
- VendorTransactions
- Investors
- InvestorTransactions
- Settings

## 4. Web App Deploy
Deploy → New deployment → Web app
- Execute as: Me
- Who has access: আপনার প্রয়োজন অনুযায়ী (ব্যক্তিগত ব্যবহারে “Anyone with the link” ব্যবহার করা যেতে পারে)

Deploy করার পর যে Web App URL পাবেন সেটি সংরক্ষণ করুন।

## 5. অ্যাপের সঙ্গে সংযোগ
এই V2 package-এ backend প্রস্তুত আছে। পরবর্তী UI patch-এ Web App URL বসানোর Settings field এবং Sync Now button দিয়ে API call যুক্ত করা হবে।

### গুরুত্বপূর্ণ
Google Sheets-এর URL, OAuth token বা private credentials কখনো HTML/JavaScript source code-এর মধ্যে hard-code করবেন না।
Apps Script authorization Google-এর মাধ্যমে সম্পন্ন হবে।

## 6. Browser/Mobile
`index.html`-কে static hosting-এ publish করলে একটি browser URL পাওয়া যাবে।
PWA manifest/service worker থাকায় compatible mobile browser থেকে app-like ব্যবহার করা যাবে।

## 7. Current V2 status
- Existing MVP UI retained
- PWA manifest added
- Offline service worker added
- Google Apps Script backend added
- Google Sheet schema added
- Sync API prepared

Next implementation step:
- Settings-এ Google Web App URL field
- Connect/Test button
- Download from Sheets
- Sync Now
- Sync Pending status
- Conflict protection
- Google account-based authentication
