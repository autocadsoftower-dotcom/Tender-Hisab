# টেন্ডার হিসাব — মোবাইলে অ্যাপ আইকন সেটআপ

## গুরুত্বপূর্ণ
ZIP ফাইলটি সরাসরি Android অ্যাপ হিসেবে Install হবে না। এটি একটি PWA।
PWA Install করতে অ্যাপটি একটি HTTPS ওয়েব ঠিকানায় প্রকাশ করতে হবে।

## সবচেয়ে সহজ পদ্ধতি
1. এই ZIP-এর ফাইলগুলো একটি HTTPS hosting-এ upload করুন।
2. Hosting থেকে পাওয়া URL Chrome-এ খুলুন।
3. Chrome-এর `⋮` মেনু থেকে `Install app` অথবা `Add to Home screen` চাপুন।
4. নাম হিসেবে `টেন্ডার হিসাব` দেখা যাবে।
5. Install করার পর Home Screen/App drawer-এ আইকন দেখা যাবে।

## Google Sheets
Google Sheets backend-এর জন্য `Code.gs` ব্যবহার করুন।
Apps Script Web App URL পাওয়ার পর অ্যাপের Settings অংশে URL বসিয়ে Sync ব্যবহার করতে হবে।

## সতর্কতা
- শুধু `file://` দিয়ে index.html খুললে PWA install/service worker কাজ নাও করতে পারে।
- Google Apps Script Web App URL এবং PWA hosting URL আলাদা হতে পারে।
- Google credentials বা secret key frontend-এ রাখবেন না।
