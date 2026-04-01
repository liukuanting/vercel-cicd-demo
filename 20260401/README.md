# CourtCrew 羽球報隊網站

這是一個用 `Next.js 14 + Supabase` 製作的會員制羽球報隊網站，支援：

- 會員註冊 / 登入
- 會員建立羽球時段
- 顯示日期、時間、人數限制、程度、費用、球種與地點
- 會員預約羽球活動
- Supabase 資料表與 RLS 權限設定

## 啟動方式

1. 安裝 Node.js 18 以上。
2. 執行 `npm install`
3. 複製 `.env.example` 為 `.env.local`
4. 填入 `NEXT_PUBLIC_SUPABASE_URL` 與 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. 到 Supabase SQL Editor 執行 `supabase/schema.sql`
6. 執行 `npm run dev`

## 目前注意事項

- 這台工作環境沒有 `node/npm`，所以這次無法直接安裝、啟動或 build 驗證。
- 把專案移到有 Node.js 的環境後即可安裝並接上 Supabase 測試。
