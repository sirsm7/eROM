Project Path: eROM-main

Source Tree:

```txt
eROM-main
├── _headers
├── assets
│   ├── css
│   │   └── style.css
│   ├── img
│   │   └── logo-kpm.png
│   └── js
│       └── app.js
├── config.js
├── deno.json
├── functions
│   └── api
│       └── config.js
├── idb-cache.js
├── index.html
├── index.ts
├── manifest.json
├── migration.js
├── realtime.js
├── src
│   └── api
│       └── supabaseClient.js
├── storage
│   └── db.js
└── sw.js

```

`_headers`:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://app.tech4ag.my wss://app.tech4ag.my https://cdn.jsdelivr.net https://script.google.com https://script.googleusercontent.com; img-src 'self' data: blob: https:; worker-src 'self' blob:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Permitted-Cross-Domain-Policies: none

/index.html
  Cache-Control: no-cache

/sw.js
  Cache-Control: no-cache, no-store, must-revalidate

/assets/*
  Cache-Control: public, max-age=0, immutable
```

`assets\css\style.css`:

```css
*, *::before, *::after {
  box-sizing: border-box;
}

:root {
  --bg: #f1f5f9;
  --text: #1e293b;
  --muted: #64748b;
  --primary: #1e40af;
  --primary-dark: #1e3a8a;
  --accent: #3b82f6;
  --ok: #10b981;
  --warn: #f59e0b;
  --bad: #ef4444;
  --off: #9ca3af;
  --card: #ffffff;
  --ring: #e2e8f0;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.wrap {
  max-width: 1150px;
  margin: 20px auto;
  padding: 0 16px;
}

h1 {
  background: var(--primary-dark);
  color: #fff;
  margin: -20px -16px 20px -16px;
  padding: 20px 20px;
  font-size: 1.35rem;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.25);
  border-radius: 0 0 16px 16px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-logo {
  height: 48px;
  width: auto;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  flex-shrink: 0;
}

@media (min-width: 769px) {
  h1 {
    margin: 0 0 20px 0;
    border-radius: 12px;
  }
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  background: transparent;
  border: none;
  padding: 4px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tabbtn {
  border: 1px solid transparent;
  background: #e2e8f0;
  color: var(--muted);
  padding: 10px 20px;
  min-height: 44px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-size: 0.95rem;
  box-shadow: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tabbtn.active {
  background: var(--primary);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
  transform: translateY(-1px);
}

.tabpane {
  display: none;
  min-width: 0;
}

.tabpane.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  background: var(--card);
  border: 1px solid var(--ring);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow);
  margin-bottom: 20px;
  min-width: 0;
}

.toolbar {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 16px;
  align-items: center;
}

.toolbar > div,
.row > div {
  min-width: 0;
}

.row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

label.small {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  font-weight: 600;
  color: var(--muted);
  margin-bottom: 6px;
  display: inline-block;
}

select,
input[type="time"],
input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
input[type="file"],
button {
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid var(--ring);
  border-radius: 10px;
  padding: 10px 14px;
  min-height: 44px;
  background: #f8fafc;
  outline: none;
  transition: all 0.2s;
  color: var(--text);
  max-width: 100%;
}

select:focus,
input:focus {
  background: #fff;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.btn {
  border: none;
  background: var(--primary);
  color: #fff;
  padding: 10px 20px;
  min-height: 44px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn:active {
  transform: scale(0.98);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.secondary {
  background: var(--text);
}

.btn.ghost {
  background: #fff;
  border: 1px solid var(--ring);
  color: var(--text);
  box-shadow: none;
}

.btn.ok {
  background: var(--ok);
  color: #fff;
}

.btn.bad {
  background: var(--bad);
  color: #fff;
}

.req::after {
  content: " *";
  color: var(--bad);
}

.invalid {
  border-color: var(--bad) !important;
  background: #fef2f2 !important;
}

.legend {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 0 0 16px;
  flex-wrap: wrap;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot.green { background: var(--ok); }
.dot.orange { background: var(--warn); }
.dot.red { background: var(--bad); }
.dot.disabled { background: var(--off); }

.calendar {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  min-width: 0;
}

.weekday {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
}

.weekday div {
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.tile {
  background: var(--card);
  border: 1px solid var(--ring);
  border-radius: 12px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  transition: transform 0.1s, border-color 0.1s;
  min-width: 0;
}

.tile:hover {
  border-color: var(--accent);
}

.tile.disabled {
  background: #f8fafc;
  opacity: 0.7;
  pointer-events: none;
}

.tile .date {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text);
}

.cnt-group {
  display: inline-flex;
  gap: 4px;
}

.cnt-pill {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 6px;
  color: #fff;
  font-weight: 600;
  line-height: 1;
}

.cnt-pill.red { background: var(--bad); }
.cnt-pill.orange { background: var(--warn); }

.badge {
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
}

.badge.red { background: var(--bad); }
.badge.orange { background: var(--warn); }
.badge.green { background: var(--ok); }

.tile .body {
  padding: 0 10px 10px;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--text);
  word-break: break-word;
}

.tile.sel {
  outline: 2px solid var(--primary);
  background: #eff6ff;
}

.tile.range {
  outline: 2px solid var(--primary);
  background: #eff6ff;
}

.switch {
  display: inline-flex;
  background: #e2e8f0;
  border-radius: 12px;
  padding: 4px;
}

.switch button {
  border: none;
  background: transparent;
  padding: 6px 14px;
  min-height: 36px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--muted);
}

.switch button.active {
  background: #fff;
  color: var(--primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.counter {
  font-size: 0.9rem;
  color: var(--primary);
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--ring);
  border-radius: 12px;
  overflow: hidden;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--ring);
  text-align: left;
  font-size: 0.95rem;
  vertical-align: middle;
}

th {
  background: #f8fafc;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

tr:last-child td {
  border-bottom: none;
}

.pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin: 2px 4px 2px 0;
}

.pill.red {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.pill.orange {
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
}

#adminLoginBox {
  display: block;
  text-align: center;
  padding: 40px 20px;
}

#adminPanel {
  display: none;
}

dialog.erom-modal {
  border: 1px solid var(--ring);
  border-radius: 16px;
  padding: 0;
  width: min(92vw, 520px);
  max-width: 92vw;
  background: var(--card);
  color: var(--text);
  box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.25);
}

dialog.erom-modal.wide {
  width: min(94vw, 650px);
}

dialog.erom-modal::backdrop {
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
}

.erom-modal-box {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.erom-modal-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-dark);
}

.erom-modal-text {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.45;
  white-space: pre-line;
}

.erom-modal-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.erom-modal-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.erom-modal-field input {
  width: 100%;
}

.erom-modal-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.erom-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.erom-modal-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 55dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.erom-modal-list li {
  background: #f8fafc;
  border: 1px solid var(--ring);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.9rem;
  line-height: 1.45;
}

.erom-spinner {
  width: 34px;
  height: 34px;
  border: 3px solid #dbeafe;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
  margin: 4px auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

#eromToastContainer {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(92vw, 420px);
  pointer-events: none;
}

.erom-toast {
  background: var(--text);
  color: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 500;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  border-left: 5px solid var(--accent);
  animation: fadeIn 0.2s ease;
}

.erom-toast.success {
  border-left-color: var(--ok);
}

.erom-toast.warning {
  border-left-color: var(--warn);
}

.erom-toast.error {
  border-left-color: var(--bad);
}

.erom-toast.info {
  border-left-color: var(--accent);
}

.header-flex-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header-title-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.auth-controls {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-login {
  background: var(--warn);
  color: #000;
  border: none;
  padding: 8px 16px;
  min-height: 44px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s;
}

.btn-login:active {
  transform: scale(0.95);
}

.user-badge {
  display: none;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  padding: 6px 14px;
  min-height: 44px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  color: #fff;
  font-size: 0.9rem;
}

.user-badge.active {
  display: flex;
}

.user-role {
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.user-role.admin {
  background: var(--bad);
}

.admin-user-section {
  margin-bottom: 24px;
  border-bottom: 2px dashed var(--ring);
  padding-bottom: 20px;
}

.admin-migration-section {
  margin-top: 24px;
  border-top: 2px dashed var(--ring);
  padding-top: 20px;
}

.migration-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
  margin-top: 10px;
}

.migration-file-group {
  flex: 1;
  min-width: 240px;
}

.migration-file-input {
  width: 100%;
  padding: 8px 12px;
  background: #f8fafc;
  border: 1px dashed var(--accent);
  border-radius: 10px;
  cursor: pointer;
}

.migration-status-area {
  margin-top: 12px;
}

.scrollable-table {
  overflow-x: auto;
  max-height: 400px;
  border: 1px solid var(--ring);
  border-radius: 10px;
}

.btn-reset {
  background: #fff;
  border: 1px solid var(--ring);
  color: var(--text);
  font-size: 0.8rem;
  padding: 6px 12px;
  min-height: 36px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-reset:hover {
  background: var(--bg);
  color: var(--primary);
  border-color: var(--primary);
}

@media (max-width: 768px) {
  .wrap {
    margin: 0;
    width: 100%;
    max-width: 100%;
    padding: 0;
    background: var(--bg);
  }

  h1 {
    margin: 0 0 16px 0;
    border-radius: 0 0 20px 20px;
    padding: 16px 20px;
    text-align: left;
    font-size: 1.1rem;
    line-height: 1.35;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  .header-logo {
    height: 32px;
    width: auto;
    flex-shrink: 0;
  }

  .card {
    border-radius: 12px;
    margin: 0 10px 16px 10px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .tabs {
    padding: 0 10px 10px 10px;
    gap: 8px;
    margin-bottom: 10px;
  }

  .tabbtn {
    padding: 8px 16px;
    font-size: 0.85rem;
    min-height: 44px;
  }

  .row,
  .toolbar,
  .migration-controls {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .toolbar {
    grid-template-columns: 1fr;
  }

  .row > div,
  .toolbar > div,
  .migration-controls > div {
    width: 100% !important;
    margin: 0 !important;
  }

  select,
  input,
  button,
  .btn,
  .btn-reset {
    width: 100%;
    min-height: 48px;
    font-size: 16px;
  }

  .monthnav {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .weekday {
    display: none;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .grid .blank {
    display: none;
  }

  .tile {
    min-height: auto;
    flex-direction: column;
    border-left: 4px solid transparent;
  }

  .tile:has(.badge.green) { border-left-color: var(--ok); }
  .tile:has(.badge.orange) { border-left-color: var(--warn); }
  .tile:has(.badge.red) { border-left-color: var(--bad); }

  .tile .date {
    background: transparent;
    border-bottom: 1px solid var(--ring);
    padding: 12px;
  }

  .tile .date::before {
    content: "Tarikh: ";
    font-size: 0.75rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .tile .body {
    padding: 12px;
  }

  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead {
    display: none;
  }

  tr {
    margin-bottom: 16px;
    border: 1px solid var(--ring);
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  td {
    position: relative;
    border-bottom: 1px solid #f1f5f9;
    padding: 10px 16px;
    padding-left: 40%;
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 44px;
  }

  td::before {
    position: absolute;
    left: 16px;
    width: 35%;
    text-align: left;
    font-weight: 600;
    font-size: 0.8rem;
    color: var(--primary);
    text-transform: uppercase;
  }

  td:nth-of-type(1)::before { content: "Kol 1"; }

  #ovTableBody td:nth-of-type(1)::before { content: "Tarikh"; }
  #ovTableBody td:nth-of-type(2)::before { content: "Masa"; }
  #ovTableBody td:nth-of-type(3)::before { content: "Bilik"; }
  #ovTableBody td:nth-of-type(4)::before { content: "Tujuan"; }
  #ovTableBody td:nth-of-type(5)::before { content: "Penempah"; }
  #ovTableBody td:nth-of-type(6)::before { content: "Tindakan"; }

  #myBookingsTableBody td:nth-of-type(1)::before { content: "Tarikh"; }
  #myBookingsTableBody td:nth-of-type(2)::before { content: "Masa"; }
  #myBookingsTableBody td:nth-of-type(3)::before { content: "Bilik"; }
  #myBookingsTableBody td:nth-of-type(4)::before { content: "Tujuan"; }
  #myBookingsTableBody td:nth-of-type(5)::before { content: "Tindakan"; }

  #adminList td:nth-of-type(1) { padding-left: 16px; background: #f8fafc; justify-content: flex-start; }
  #adminList td:nth-of-type(2)::before { content: "Tarikh"; }
  #adminList td:nth-of-type(3)::before { content: "Masa"; }
  #adminList td:nth-of-type(4)::before { content: "Tujuan"; }
  #adminList td:nth-of-type(5)::before { content: "Penempah"; }
  #adminList td:nth-of-type(6)::before { content: "Edit"; }

  #adminUserListBody td:nth-of-type(1)::before { content: "Nama"; }
  #adminUserListBody td:nth-of-type(2)::before { content: "Sektor"; }
  #adminUserListBody td:nth-of-type(3)::before { content: "Email"; }
  #adminUserListBody td:nth-of-type(4)::before { content: "Tindakan"; }

  #adminSearchTableBody td:nth-of-type(1)::before { content: "Tarikh"; }
  #adminSearchTableBody td:nth-of-type(2)::before { content: "Masa"; }
  #adminSearchTableBody td:nth-of-type(3)::before { content: "Bilik"; }
  #adminSearchTableBody td:nth-of-type(4)::before { content: "Tujuan"; }
  #adminSearchTableBody td:nth-of-type(5)::before { content: "Sektor"; }
  #adminSearchTableBody td:nth-of-type(6)::before { content: "Penempah"; }
  #adminSearchTableBody td:nth-of-type(7)::before { content: "Tindakan"; }

  .erom-modal-actions {
    flex-direction: column-reverse;
  }

  .header-flex-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .auth-controls {
    margin-left: 0;
    width: 100%;
    justify-content: flex-end;
    margin-top: -30px;
  }

  .header-title-group {
    max-width: 80%;
  }
}

@media print {
  body * {
    visibility: hidden;
  }

  #tabAdminSearch,
  #tabAdminSearch * {
    visibility: visible;
  }

  #tabAdminSearch {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .toolbar,
  .btn,
  .tabs,
  h1,
  .auth-controls,
  #adminSearchToolbar,
  #adminSearchFilterForm {
    display: none !important;
  }

  .card {
    border: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #000;
    padding: 8px;
    font-size: 12px;
  }

  th {
    background-color: #f2f2f2 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  th:last-child,
  td:last-child {
    display: none;
  }

  #adminSearchStats {
    border: 1px solid #000;
    margin-bottom: 20px;
    padding: 10px;
  }
}
```

`assets\js\app.js`:

```js
import { getSupabaseClient, subscribeBookingsRealtime, teardownRealtime } from "../../realtime.js";
import {
  getCacheEntry,
  setCache,
  deleteCacheByPrefix,
  clearExpiredCache
} from "../../idb-cache.js";
import {
  exportDatabaseJSON,
  importDatabaseJSON,
  abortMigrationOperations,
  renderMigrationStatus
} from "../../migration.js?v=20261112";

const SHOW_PAST_DAYS = false;

const ROOM_OPTIONS = [
  "PKG Melekek - Bilik Kuliah (25 orang)",
  "PKG Melekek - Bilik Mesyuarat (25 orang)",
  "PKG Masjid Tanah - Bilik Seri Cempaka (24 orang)",
  "PKG Masjid Tanah - Bilik Seri Melur (18 orang)",
  "PKG Masjid Tanah - Bilik Pendidikan Digital (12 orang)",
  "Bilik Mesyuarat PPDAG di SK Alor Gajah 1 (40 orang)",
  "Bilik Mesyuarat Utama PPDAG (73 orang)",
  "Bilik Perbincangan PPDAG (15 orang)",
  "Makmal Komputer PPDAG (31 orang)",
  "Bilik Seminar PPDAG (22 orang)",
  "Bilik Temuduga PPDAG (4 orang)",
  "Bilik Runding Cara PPDAG (4 orang)",
  "Kafeteria PPDAG (30 orang)"
];

const CATEGORY_OPTIONS = ["Mesyuarat / Taklimat", "Bengkel / Kursus", "Lain-Lain"];

const $ = id => document.getElementById(id);
const pad2 = n => String(n).padStart(2, '0');
const formatMonthLabel = (y, m) => new Intl.DateTimeFormat('ms-MY', { month: 'long', year: 'numeric' }).format(new Date(y, m - 1, 1));
const toYMD = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const firstDay = (y, m) => `${y}-${pad2(m)}-01`;
const lastDay = (y, m) => toYMD(new Date(y, m, 0));
const todayYMD = () => toYMD(new Date());

function parseLocalYMD(ymd) {
  const parts = String(ymd || '').split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return new Date();
  }
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function getLocalDayOfWeek(ymd) {
  return parseLocalYMD(ymd).getDay();
}

function toHHMM(x) {
  if (x == null) return "";
  const s = String(x).trim();
  if (/^\d{2}:\d{2}/.test(s)) return s.slice(0, 5);
  const d = new Date(s);
  if (!isNaN(d)) return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  return s;
}

function toYMDNorm(x) {
  if (x == null) return "";
  const s = String(x);
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const d = new Date(s);
  if (!isNaN(d)) return toYMD(d);
  return s.slice(0, 10);
}

const toMinutes = t => {
  if (!t) return 0;
  const [h, m] = toHHMM(t).split(':').map(Number);
  return (h * 60) + (m || 0);
};

function addDaysYMD(ymd, n) {
  const dt = parseLocalYMD(ymd);
  dt.setDate(dt.getDate() + n);
  return toYMD(dt);
}

function createEl(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}

function clearElementChildren(el) {
  if (!el) return;
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function ensureToastContainer() {
  let container = $('eromToastContainer');
  if (!container && typeof document !== 'undefined' && document.body) {
    container = document.createElement('div');
    container.id = 'eromToastContainer';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = 'info', duration = 2600) {
  const container = ensureToastContainer();
  if (!container) return;

  const toast = createEl('div', `erom-toast ${type}`);
  toast.textContent = String(message ?? '');
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, duration);
}

function toastOk(t) {
  showToast(t, 'success');
}

function toastInfo(t) {
  showToast(t, 'info');
}

function toastWarn(t) {
  showToast(t, 'warning', 3200);
}

function toastErr(t) {
  showToast(t, 'error', 3600);
}

let activeDialogEl = null;

function closeDialogElement(dialog) {
  if (!dialog) return;
  try {
    if (dialog.open && typeof dialog.close === 'function') {
      dialog.close();
    }
  } catch {}
  if (dialog.parentNode) {
    dialog.parentNode.removeChild(dialog);
  }
  if (activeDialogEl === dialog) {
    activeDialogEl = null;
  }
}

function modalClose() {
  if (activeDialogEl) {
    closeDialogElement(activeDialogEl);
  }
}

function createBaseDialog(wide = false) {
  modalClose();
  const dialog = createEl('dialog', wide ? 'erom-modal wide' : 'erom-modal');
  const box = createEl('div', 'erom-modal-box');
  dialog.appendChild(box);
  document.body.appendChild(dialog);
  activeDialogEl = dialog;
  return { dialog, box };
}

function openDialog(dialog) {
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', 'open');
  }
}

function modalLoading(title = 'Memproses...') {
  if (typeof document === 'undefined' || !document.body) return;
  const { dialog, box } = createBaseDialog(false);

  const spinner = createEl('div', 'erom-spinner');
  spinner.setAttribute('aria-hidden', 'true');
  box.appendChild(spinner);

  const titleEl = createEl('h3', 'erom-modal-title');
  titleEl.style.textAlign = 'center';
  titleEl.textContent = title;
  box.appendChild(titleEl);

  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
  });

  openDialog(dialog);
}

function modalAlert(title, text) {
  if (typeof document === 'undefined' || !document.body) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const { dialog, box } = createBaseDialog(false);

    const titleEl = createEl('h3', 'erom-modal-title');
    titleEl.textContent = title;
    box.appendChild(titleEl);

    if (text) {
      const textEl = createEl('p', 'erom-modal-text');
      textEl.textContent = text;
      box.appendChild(textEl);
    }

    const actions = createEl('div', 'erom-modal-actions');
    const okBtn = createEl('button', 'btn');
    okBtn.type = 'button';
    okBtn.textContent = 'Tutup';
    actions.appendChild(okBtn);
    box.appendChild(actions);

    const done = () => {
      closeDialogElement(dialog);
      resolve();
    };

    okBtn.addEventListener('click', done);
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      done();
    });

    openDialog(dialog);
    okBtn.focus();
  });
}

function modalConfirm(title, text, confirmText = 'Ya, Teruskan', cancelText = 'Batal', isDanger = false) {
  if (typeof document === 'undefined' || !document.body) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const { dialog, box } = createBaseDialog(false);

    const titleEl = createEl('h3', 'erom-modal-title');
    titleEl.textContent = title;
    box.appendChild(titleEl);

    if (text) {
      const textEl = createEl('p', 'erom-modal-text');
      textEl.textContent = text;
      box.appendChild(textEl);
    }

    const actions = createEl('div', 'erom-modal-actions');

    const cancelBtn = createEl('button', 'btn ghost');
    cancelBtn.type = 'button';
    cancelBtn.textContent = cancelText;
    actions.appendChild(cancelBtn);

    const confirmBtn = createEl('button', isDanger ? 'btn bad' : 'btn');
    confirmBtn.type = 'button';
    confirmBtn.textContent = confirmText;
    actions.appendChild(confirmBtn);

    box.appendChild(actions);

    const done = (result) => {
      closeDialogElement(dialog);
      resolve(result);
    };

    cancelBtn.addEventListener('click', () => done(false));
    confirmBtn.addEventListener('click', () => done(true));
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      done(false);
    });

    openDialog(dialog);
    confirmBtn.focus();
  });
}

function modalForm(title, fields, confirmText = 'Simpan', cancelText = 'Batal') {
  if (typeof document === 'undefined' || !document.body) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const { dialog, box } = createBaseDialog(false);

    const titleEl = createEl('h3', 'erom-modal-title');
    titleEl.textContent = title;
    box.appendChild(titleEl);

    const formEl = document.createElement('form');
    formEl.className = 'erom-modal-fields';
    formEl.noValidate = true;

    const inputMap = {};
    let firstInput = null;

    fields.forEach((f) => {
      const wrap = createEl('div', 'erom-modal-field');

      if (f.label) {
        const lbl = createEl('label', 'small');
        lbl.setAttribute('for', `modal_field_${f.name}`);
        lbl.textContent = f.label;
        wrap.appendChild(lbl);
      }

      const input = document.createElement('input');
      input.id = `modal_field_${f.name}`;
      input.type = f.type || 'text';
      input.placeholder = f.placeholder || '';
      input.value = f.value != null ? String(f.value) : '';
      if (f.required) input.required = true;
      wrap.appendChild(input);

      inputMap[f.name] = input;
      if (!firstInput) firstInput = input;
      formEl.appendChild(wrap);
    });

    const errorBox = createEl('div', 'erom-modal-error');
    errorBox.style.display = 'none';
    formEl.appendChild(errorBox);

    const actions = createEl('div', 'erom-modal-actions');

    const cancelBtn = createEl('button', 'btn ghost');
    cancelBtn.type = 'button';
    cancelBtn.textContent = cancelText;
    actions.appendChild(cancelBtn);

    const submitBtn = createEl('button', 'btn');
    submitBtn.type = 'submit';
    submitBtn.textContent = confirmText;
    actions.appendChild(submitBtn);

    formEl.appendChild(actions);
    box.appendChild(formEl);

    const done = (result) => {
      closeDialogElement(dialog);
      resolve(result);
    };

    cancelBtn.addEventListener('click', () => done(null));
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      done(null);
    });

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const values = {};

      for (let i = 0; i < fields.length; i++) {
        const f = fields[i];
        const el = inputMap[f.name];
        const val = f.type === 'password' ? el.value : el.value.trim();
        if (f.required && !val) {
          errorBox.textContent = f.errorMessage || 'Sila lengkapkan semua ruang yang diperlukan.';
          errorBox.style.display = 'block';
          el.focus();
          return;
        }
        values[f.name] = val;
      }

      done(values);
    });

    openDialog(dialog);
    if (firstInput) firstInput.focus();
  });
}

function modalBookingList(dateStr, bookings) {
  if (typeof document === 'undefined' || !document.body) return;

  const { dialog, box } = createBaseDialog(true);

  const titleEl = createEl('h3', 'erom-modal-title');
  titleEl.textContent = `Senarai Tempahan (${dateStr})`;
  box.appendChild(titleEl);

  const ul = createEl('ul', 'erom-modal-list');
  const frag = document.createDocumentFragment();

  bookings.forEach((b) => {
    const li = document.createElement('li');

    const pMasa = document.createElement('div');
    const strongMasa = document.createElement('strong');
    strongMasa.textContent = 'Masa: ';
    pMasa.appendChild(strongMasa);
    pMasa.appendChild(document.createTextNode(`${toHHMM(b.masa_mula)} - ${toHHMM(b.masa_tamat)}`));

    const pPenempah = document.createElement('div');
    const strongPenempah = document.createElement('strong');
    strongPenempah.textContent = 'Penempah: ';
    pPenempah.appendChild(strongPenempah);
    pPenempah.appendChild(document.createTextNode(`${b.nama_penempah} (${b.sektor})`));

    const pTujuan = document.createElement('div');
    const strongTujuan = document.createElement('strong');
    strongTujuan.textContent = 'Tujuan: ';
    pTujuan.appendChild(strongTujuan);
    pTujuan.appendChild(document.createTextNode(b.tujuan));

    li.appendChild(pMasa);
    li.appendChild(pPenempah);
    li.appendChild(pTujuan);
    frag.appendChild(li);
  });

  ul.appendChild(frag);
  box.appendChild(ul);

  const actions = createEl('div', 'erom-modal-actions');
  const closeBtn = createEl('button', 'btn');
  closeBtn.type = 'button';
  closeBtn.textContent = 'Tutup';
  actions.appendChild(closeBtn);
  box.appendChild(actions);

  const done = () => closeDialogElement(dialog);
  closeBtn.addEventListener('click', done);
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    done();
  });

  openDialog(dialog);
  closeBtn.focus();
}

function markInvalid(el) {
  if (!el) return;
  el.classList.add('invalid');
  setTimeout(() => el.classList.remove('invalid'), 1200);
  el.focus();
}

async function clearActiveCaches() {
  await Promise.all([
    deleteCacheByPrefix('cal_'),
    deleteCacheByPrefix('ov_'),
    deleteCacheByPrefix('my_')
  ]).catch(() => {});
}

const DEFAULT_USER_STATE = {
  user: null,
  isAdmin: false,
  sessionToken: null,
  sessionExpiresAt: null
};

let state = {
  ...DEFAULT_USER_STATE,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  room: '',
  days: [],
  selectedDate: null,
  range: { from: null, to: null },
  rangeMode: false,
  myBookings: []
};

let ov = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  days: [],
  bookings: [],
  view: 'calendar',
  filterRoom: '',
  filterUser: ''
};

let adminState = {
  bookings: [],
  searchData: []
};

let supaClient = null;
let isBootstrapped = false;
let isBookingSubmitting = false;
let adminSearchAbortController = null;
let adminBookingListAbortController = null;
let adminUserListAbortController = null;

function registerServiceWorker() {
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js', { updateViaCache: 'none' })
      .then((reg) => {
        reg.update().catch(() => {});
      })
      .catch(() => {});
  }
}

window.addEventListener('load', bootstrap);

async function bootstrap() {
  if (isBootstrapped) return;
  isBootstrapped = true;

  registerServiceWorker();
  setupUI();

  if (window.ENV_READY) {
    try {
      await window.ENV_READY;
    } catch {
      await modalAlert('Ralat Konfigurasi', 'Konfigurasi pelayan tidak lengkap. Sila hubungi pentadbir sistem.');
      return;
    }
  }

  try {
    supaClient = await getSupabaseClient();
  } catch {
    await modalAlert('Ralat Permulaan', 'Gagal menyambung ke pangkalan data. Sila muat semula halaman.');
    return;
  }

  restoreSession();
  clearExpiredCache().catch(() => {});

  const roomSel = $('roomSelect');
  const adminRoomSel = $('adminRoom');
  const adminSearchRoomSel = $('adminSearchRoom');
  ROOM_OPTIONS.forEach(r => {
    if (roomSel) roomSel.appendChild(new Option(r, r));
    if (adminRoomSel) adminRoomSel.appendChild(new Option(r, r));
    if (adminSearchRoomSel) adminSearchRoomSel.appendChild(new Option(r, r));
  });

  const catSel = $('category');
  if (catSel) {
    CATEGORY_OPTIONS.forEach(c => catSel.appendChild(new Option(c, c)));
  }

  const ovRoomFilter = $('ovRoomFilter');
  if (ovRoomFilter) {
    ROOM_OPTIONS.forEach(r => ovRoomFilter.appendChild(new Option(r, r)));
  }

  toggleCalendarHint();
  setupRealtimeSubscription();
  await loadOverview(true);
}

async function syncAllActiveViews() {
  await clearActiveCaches();

  if (state.room) {
    await refreshCalendar(false);
  }
  await loadOverview(false);
  if (state.user) {
    await loadMyBookings(false);
  }
  if ($('tabAdminSearch') && $('tabAdminSearch').classList.contains('active')) {
    const startVal = $('adminSearchStartDate') ? $('adminSearchStartDate').value : '';
    const endVal = $('adminSearchEndDate') ? $('adminSearchEndDate').value : '';
    if (startVal && endVal) {
      await executeAdminSearch();
    }
  }
}

function setupRealtimeSubscription() {
  if (!supaClient) return;
  subscribeBookingsRealtime(
    supaClient,
    async (payload) => {
      await handleRealtimePayload(payload);
    },
    async () => {
      await syncAllActiveViews();
    }
  );
}

async function handleRealtimePayload(payload) {
  await syncAllActiveViews();

  const rec = payload.new || payload.old;
  if (!rec) return;

  const isSelf = state.user && (rec.nama_penempah === state.user.nama || rec.email === state.user.email);
  if (!isSelf) {
    const roomLabel = rec.bilik || 'Bilik';
    if (payload.eventType === 'INSERT') {
      toastInfo(`Tempahan baharu diterima: ${roomLabel}`);
    } else if (payload.eventType === 'UPDATE') {
      if (rec.status === 'DIBATALKAN') {
        toastInfo(`Tempahan dibatalkan: ${roomLabel}`);
      } else {
        toastInfo(`Jadual tempahan dikemaskini: ${roomLabel}`);
      }
    } else if (payload.eventType === 'DELETE') {
      toastInfo('Rekod tempahan dikeluarkan.');
    }
  }
}

function setupUI() {
  const mainLoginBtn = $('mainLoginBtn');
  if (mainLoginBtn) mainLoginBtn.addEventListener('click', showLoginModal);

  const userProfileBadge = $('userProfileBadge');
  if (userProfileBadge) userProfileBadge.addEventListener('click', showUserProfile);

  const tabTempahanBtn = $('tabTempahanBtn');
  if (tabTempahanBtn) tabTempahanBtn.addEventListener('click', () => switchTab('tempahan'));

  const tabKalendarBtn = $('tabKalendarBtn');
  if (tabKalendarBtn) tabKalendarBtn.addEventListener('click', () => switchTab('kalendar'));

  const tabTempahanSayaBtn = $('tabTempahanSayaBtn');
  if (tabTempahanSayaBtn) tabTempahanSayaBtn.addEventListener('click', () => switchTab('tempahanSaya'));

  const tabAdminBtn = $('tabAdminBtn');
  if (tabAdminBtn) tabAdminBtn.addEventListener('click', () => switchTab('admin'));

  const tabAdminSearchBtn = $('tabAdminSearchBtn');
  if (tabAdminSearchBtn) tabAdminSearchBtn.addEventListener('click', () => switchTab('adminSearch'));

  const roomSelect = $('roomSelect');
  if (roomSelect) roomSelect.addEventListener('change', onRoomSelectChange);

  const btnRefresh = $('btnRefresh');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', async () => {
      await clearActiveCaches();
      resetUI();
      toastInfo('Antara muka & cache telah ditetapkan semula');
    });
  }

  const btnPrev = $('btnPrev');
  if (btnPrev) btnPrev.addEventListener('click', () => changeMonth(state, -1, true));

  const btnNext = $('btnNext');
  if (btnNext) btnNext.addEventListener('click', () => changeMonth(state, 1, true));

  const ovPrev = $('ovPrev');
  if (ovPrev) ovPrev.addEventListener('click', () => changeMonth(ov, -1, false));

  const ovNext = $('ovNext');
  if (ovNext) ovNext.addEventListener('click', () => changeMonth(ov, 1, false));

  const monthLabel = $('monthLabel');
  if (monthLabel) monthLabel.textContent = formatMonthLabel(state.year, state.month);

  const ovMonthLabel = $('ovMonthLabel');
  if (ovMonthLabel) ovMonthLabel.textContent = formatMonthLabel(ov.year, ov.month);

  const toggleRangeOff = $('toggleRangeOff');
  if (toggleRangeOff) toggleRangeOff.addEventListener('click', () => setRangeMode(false));

  const toggleRangeOn = $('toggleRangeOn');
  if (toggleRangeOn) toggleRangeOn.addEventListener('click', () => setRangeMode(true));

  const pickedDate = $('pickedDate');
  if (pickedDate) pickedDate.addEventListener('change', onDateChange);

  const fromDate = $('fromDate');
  if (fromDate) fromDate.addEventListener('change', onRangeChange);

  const toDate = $('toDate');
  if (toDate) toDate.addEventListener('change', onRangeChange);

  const grid = $('grid');
  if (grid) grid.addEventListener('click', onGridClick);

  const btnBook = $('btnBook');
  if (btnBook) btnBook.addEventListener('click', onBook);

  const btnViewCalendar = $('btnViewCalendar');
  if (btnViewCalendar) btnViewCalendar.addEventListener('click', () => switchOverviewView('calendar'));

  const btnViewTable = $('btnViewTable');
  if (btnViewTable) btnViewTable.addEventListener('click', () => switchOverviewView('table'));

  const ovRoomFilter = $('ovRoomFilter');
  if (ovRoomFilter) {
    ovRoomFilter.addEventListener('change', () => {
      ov.filterRoom = ovRoomFilter.value;
      ov.filterUser = '';
      const userFilterEl = $('ovUserFilter');
      if (userFilterEl) userFilterEl.value = '';

      populateUserFilter();
      renderOvTable();
    });
  }

  const userFilterEl = $('ovUserFilter');
  if (userFilterEl) {
    userFilterEl.addEventListener('change', () => {
      ov.filterUser = userFilterEl.value;
      renderOvTable();
    });
  }

  const btnRefreshMyBookings = $('btnRefreshMyBookings');
  if (btnRefreshMyBookings) {
    btnRefreshMyBookings.addEventListener('click', async () => {
      await deleteCacheByPrefix('my_');
      loadMyBookings(true);
    });
  }

  const adminAddUserBtn = $('adminAddUserBtn');
  if (adminAddUserBtn) adminAddUserBtn.addEventListener('click', adminAddUser);

  const adminRefreshUsers = $('adminRefreshUsers');
  if (adminRefreshUsers) adminRefreshUsers.addEventListener('click', loadAdminUserList);

  const btnAdminLoad = $('btnAdminLoad');
  if (btnAdminLoad) btnAdminLoad.addEventListener('click', loadAdminBookingList);

  const btnBulkCancel = $('btnBulkCancel');
  if (btnBulkCancel) btnBulkCancel.addEventListener('click', executeBulkCancel);

  const btnExportJson = $('btnExportJson');
  if (btnExportJson) {
    btnExportJson.addEventListener('click', handleAdminExportJson);
  }

  const btnImportJson = $('btnImportJson');
  if (btnImportJson) {
    btnImportJson.addEventListener('click', handleAdminImportJson);
  }

  const btnAdminExecuteSearch = $('btnAdminExecuteSearch');
  if (btnAdminExecuteSearch) btnAdminExecuteSearch.addEventListener('click', executeAdminSearch);

  const btnAdminPrintSearch = $('btnAdminPrintSearch');
  if (btnAdminPrintSearch) {
    btnAdminPrintSearch.addEventListener('click', () => {
      window.print();
    });
  }

  const adminSearchUserFilter = $('adminSearchUserFilter');
  if (adminSearchUserFilter) {
    adminSearchUserFilter.addEventListener('change', renderAdminSearchTable);
  }
}

async function handleAdminExportJson() {
  const statusEl = $('migrationStatusArea');

  if (!state.user || state.user.role !== 'ADMIN') {
    const msg = 'Akses ditolak. Hanya Pentadbir dibenarkan.';
    renderMigrationStatus(statusEl, { type: 'error', title: 'Akses Ditolak', message: msg });
    return toastErr(msg);
  }

  const btnExportJson = $('btnExportJson');
  const btnImportJson = $('btnImportJson');
  if (btnExportJson) btnExportJson.disabled = true;
  if (btnImportJson) btnImportJson.disabled = true;

  renderMigrationStatus(statusEl, {
    type: 'info',
    title: 'Memulakan Eksport Sandaran JSON...',
    message: 'Sedang menghubungi pelayan pangkalan data, sila tunggu sebentar.'
  });

  try {
    const result = await exportDatabaseJSON({
      statusEl,
      adminEmail: state.user.email,
      sessionToken: getSessionToken()
    });

    if (result && result.ok) {
      toastOk('Fail sandaran JSON berjaya dijana.');
    } else {
      toastErr((result && result.error) || 'Gagal menjana sandaran JSON.');
    }
  } catch (err) {
    const msg = err && err.message ? err.message : 'Ralat tidak dijangka semasa mengeksport JSON.';
    renderMigrationStatus(statusEl, { type: 'error', title: 'Eksport Sandaran Gagal', message: msg });
    toastErr(msg);
  } finally {
    if (btnExportJson) btnExportJson.disabled = false;
    if (btnImportJson) btnImportJson.disabled = false;
  }
}

async function handleAdminImportJson() {
  const statusEl = $('migrationStatusArea');

  if (!state.user || state.user.role !== 'ADMIN') {
    const msg = 'Akses ditolak. Hanya Pentadbir dibenarkan.';
    renderMigrationStatus(statusEl, { type: 'error', title: 'Akses Ditolak', message: msg });
    return toastErr(msg);
  }

  const fileInput = $('importJsonFile');
  const btnExportJson = $('btnExportJson');
  const btnImportJson = $('btnImportJson');
  const file = fileInput && fileInput.files ? fileInput.files[0] : null;

  if (!file) {
    const msg = 'Sila pilih fail sandaran .json terlebih dahulu.';
    renderMigrationStatus(statusEl, { type: 'warning', title: 'Tiada Fail Dipilih', message: msg });
    return toastWarn(msg);
  }

  const isConfirmed = await modalConfirm(
    'Pulihkan Data 1-to-1 JSON?',
    'Rekod sedia ada dengan kunci utama yang sama akan dikemaskini dan rekod baharu akan ditambah mengikut susunan jadual sistem. Teruskan?',
    'Ya, Pulihkan Data'
  );

  if (!isConfirmed) return;

  if (btnExportJson) btnExportJson.disabled = true;
  if (btnImportJson) btnImportJson.disabled = true;

  renderMigrationStatus(statusEl, {
    type: 'info',
    title: 'Memulakan Pemulihan Data JSON...',
    message: 'Sedang mengesahkan fail dan menghantar transaksi ke pangkalan data.'
  });

  try {
    const result = await importDatabaseJSON(file, {
      statusEl,
      adminEmail: state.user.email,
      sessionToken: getSessionToken(),
      onComplete: async () => {
        if (fileInput) fileInput.value = '';
        await syncAllActiveViews();
        await loadAdminUserList();
        const adminRoom = $('adminRoom');
        if (adminRoom && adminRoom.value) {
          await loadAdminBookingList();
        }
      }
    });

    if (result && result.ok) {
      toastOk('Pemulihan data 1-to-1 selesai dan paparan telah disegarkan.');
    } else {
      toastErr((result && result.error) || 'Gagal mengimport fail JSON.');
    }
  } catch (err) {
    const msg = err && err.message ? err.message : 'Ralat tidak dijangka semasa mengimport JSON.';
    renderMigrationStatus(statusEl, { type: 'error', title: 'Import / Pemulihan Gagal', message: msg });
    toastErr(msg);
  } finally {
    if (btnExportJson) btnExportJson.disabled = false;
    if (btnImportJson) btnImportJson.disabled = false;
  }
}

function resetUI() {
  const now = new Date();
  state.year = now.getFullYear();
  state.month = now.getMonth() + 1;
  const monthLabel = $('monthLabel');
  if (monthLabel) monthLabel.textContent = formatMonthLabel(state.year, state.month);

  state.days = [];
  clearElementChildren($('grid'));
  document.querySelectorAll('.tile.sel').forEach(el => el.classList.remove('sel'));

  const roomSelect = $('roomSelect');
  if (roomSelect) roomSelect.value = '';
  state.room = '';
  toggleCalendarHint();

  resetBookingForm(true);

  const adminRoom = $('adminRoom');
  if (adminRoom) adminRoom.value = '';
  clearElementChildren($('adminList'));
  adminState.bookings = [];

  if (!state.user || state.user.role !== 'ADMIN') {
    const adminLoginBox = $('adminLoginBox');
    if (adminLoginBox) adminLoginBox.style.display = 'block';
    const adminPanel = $('adminPanel');
    if (adminPanel) adminPanel.style.display = 'none';
    const tabAdminSearchBtn = $('tabAdminSearchBtn');
    if (tabAdminSearchBtn) tabAdminSearchBtn.style.display = 'none';
  }

  switchTab('tempahan');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  ov.year = now.getFullYear();
  ov.month = now.getMonth() + 1;
  ov.filterRoom = '';
  ov.filterUser = '';
  const ovRoomFilter = $('ovRoomFilter');
  if (ovRoomFilter) ovRoomFilter.value = '';
  const ovUserFilter = $('ovUserFilter');
  if (ovUserFilter) ovUserFilter.value = '';

  const ovMonthLabel = $('ovMonthLabel');
  if (ovMonthLabel) ovMonthLabel.textContent = formatMonthLabel(ov.year, ov.month);
  loadOverview(true);
}

function resetBookingForm(clearFields) {
  setRangeMode(false);
  const pickedDate = $('pickedDate');
  if (pickedDate) pickedDate.required = true;
  const fromDate = $('fromDate');
  if (fromDate) fromDate.required = false;
  const toDate = $('toDate');
  if (toDate) toDate.required = false;
  const rangeCounter = $('rangeCounter');
  if (rangeCounter) {
    rangeCounter.style.display = 'none';
    rangeCounter.textContent = '';
  }

  if (clearFields) {
    ['pickedDate', 'fromDate', 'toDate', 'startTime', 'endTime', 'note'].forEach(id => {
      const el = $(id);
      if (el) el.value = '';
    });

    const sek = $('sektor');
    clearElementChildren(sek);

    const nama = $('nama');
    clearElementChildren(nama);

    if (state.user && sek && nama) {
      const optSek = document.createElement('option');
      optSek.value = state.user.sektor;
      optSek.textContent = state.user.sektor;
      sek.appendChild(optSek);
      sek.value = state.user.sektor;
      sek.disabled = false;

      const optNama = document.createElement('option');
      optNama.value = state.user.nama;
      optNama.textContent = state.user.nama;
      nama.appendChild(optNama);
      nama.value = state.user.nama;
      nama.disabled = false;
    } else if (nama) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = '— Sila pilih sektor dahulu —';
      nama.appendChild(opt);
      nama.disabled = true;
    }
  }
  state.selectedDate = null;
  state.range = { from: null, to: null };
  highlightRangeTiles();
}

function changeMonth(obj, delta, refreshCal) {
  let m = obj.month + delta;
  let y = obj.year;
  if (m < 1) {
    m = 12;
    y--;
  } else if (m > 12) {
    m = 1;
    y++;
  }
  obj.month = m;
  obj.year = y;

  if (obj === state) {
    const monthLabel = $('monthLabel');
    if (monthLabel) monthLabel.textContent = formatMonthLabel(y, m);
  }
  if (obj === ov) {
    const ovMonthLabel = $('ovMonthLabel');
    if (ovMonthLabel) ovMonthLabel.textContent = formatMonthLabel(y, m);
    loadOverview(true);
  }

  if (refreshCal && state.room) refreshCalendar(true);
}

function switchTab(name) {
  const targetBtnId = `tab${name.charAt(0).toUpperCase() + name.slice(1)}Btn`;
  const targetPaneId = `tab${name.charAt(0).toUpperCase() + name.slice(1)}`;

  document.querySelectorAll('.tabbtn').forEach(b => b.classList.toggle('active', b.id === targetBtnId));
  document.querySelectorAll('.tabpane').forEach(p => p.classList.toggle('active', p.id === targetPaneId));

  if (name === 'admin' || name === 'adminSearch') {
    if (state.user && state.user.role === 'ADMIN') {
      if (name === 'admin') {
        const adminLoginBox = $('adminLoginBox');
        if (adminLoginBox) adminLoginBox.style.display = 'none';
        const adminPanel = $('adminPanel');
        if (adminPanel) adminPanel.style.display = 'block';
        const userBody = $('adminUserListBody');
        if (userBody && userBody.children.length <= 1) loadAdminUserList();
      }
    } else {
      const adminLoginBox = $('adminLoginBox');
      if (adminLoginBox) adminLoginBox.style.display = 'block';
      const adminPanel = $('adminPanel');
      if (adminPanel) adminPanel.style.display = 'none';
      if (state.user && state.user.role !== 'ADMIN') {
        modalAlert('Akses Ditolak', 'Hanya akaun PENTADBIR dibenarkan.');
        switchTab('tempahan');
      }
    }
  }
}

function toggleCalendarHint() {
  const noRoomHint = $('noRoomHint');
  if (noRoomHint) noRoomHint.style.display = state.room ? 'none' : 'block';
}

function resetUserState() {
  Object.assign(state, DEFAULT_USER_STATE);
  state.myBookings = [];
}

function getSessionToken() {
  return state.sessionToken || localStorage.getItem('erom_session_token') || '';
}

function restoreSession() {
  const saved = localStorage.getItem('erom_user');
  const savedToken = localStorage.getItem('erom_session_token');
  const savedExpiresAt = localStorage.getItem('erom_session_expires_at');

  if (saved && savedToken) {
    try {
      state.user = JSON.parse(saved);
      state.sessionToken = savedToken;
      state.sessionExpiresAt = savedExpiresAt;
      onLoginSuccess();
    } catch {
      onLogout();
    }
  } else {
    onLogout();
  }
}

async function showLoginModal() {
  const formValues = await modalForm(
    'Log Masuk Pegawai',
    [
      {
        name: 'email',
        type: 'email',
        label: 'Emel Rasmi',
        placeholder: 'Emel Rasmi (moe.gov.my)',
        required: true,
        errorMessage: 'Sila masukkan emel rasmi anda.'
      },
      {
        name: 'pass',
        type: 'password',
        label: 'Kata Laluan',
        placeholder: 'Kata Laluan',
        required: true,
        errorMessage: 'Sila masukkan kata laluan.'
      }
    ],
    'Log Masuk',
    'Batal'
  );

  if (!formValues) return;

  const { email, pass } = formValues;
  if (!supaClient) return toastErr('Perkhidmatan belum bersedia.');

  modalLoading('Mengesahkan...');
  const { data, error } = await supaClient.rpc('fn_login_secure', { p_email: email, p_password: pass });
  modalClose();

  if (error) return modalAlert('Ralat Sistem', error.message);
  if (!data || !data.ok) return modalAlert('Gagal', (data && data.error) || 'Log masuk gagal.');

  state.user = data.user;
  state.sessionToken = data.session_token || null;
  state.sessionExpiresAt = data.session_expires_at || null;

  if (!state.sessionToken) {
    return modalAlert('Ralat Sistem', 'Token sesi tidak diterima. Sila hubungi pentadbir.');
  }

  localStorage.setItem('erom_user', JSON.stringify(state.user));
  localStorage.setItem('erom_session_token', state.sessionToken);
  if (state.sessionExpiresAt) localStorage.setItem('erom_session_expires_at', state.sessionExpiresAt);

  onLoginSuccess();
  toastOk(`Selamat datang, ${state.user.nama}`);
}

function onLoginSuccess() {
  const mainLoginBtn = $('mainLoginBtn');
  if (mainLoginBtn) mainLoginBtn.style.display = 'none';

  const userProfileBadge = $('userProfileBadge');
  if (userProfileBadge) userProfileBadge.classList.add('active');

  const userDisplayName = $('userDisplayName');
  if (userDisplayName) userDisplayName.textContent = state.user.nama.split(' ')[0];

  const roleTag = $('userRoleTag');
  if (roleTag) {
    roleTag.textContent = state.user.role;
    roleTag.className = `user-role ${state.user.role === 'ADMIN' ? 'admin' : ''}`;
  }

  state.isAdmin = (state.user.role === 'ADMIN');

  const btnMyBookings = $('tabTempahanSayaBtn');
  if (btnMyBookings) btnMyBookings.style.display = 'inline-block';

  const ovUserWrap = $('ovUserFilterWrap');
  if (ovUserWrap) ovUserWrap.style.display = 'block';
  populateUserFilter();

  if (state.isAdmin) {
    const tabAdminBtn = $('tabAdminBtn');
    if (tabAdminBtn) tabAdminBtn.style.display = 'inline-block';
    const tabAdminSearchBtn = $('tabAdminSearchBtn');
    if (tabAdminSearchBtn) tabAdminSearchBtn.style.display = 'inline-block';
    const tabAdmin = $('tabAdmin');
    if (tabAdmin && tabAdmin.classList.contains('active')) {
      const adminLoginBox = $('adminLoginBox');
      if (adminLoginBox) adminLoginBox.style.display = 'none';
      const adminPanel = $('adminPanel');
      if (adminPanel) adminPanel.style.display = 'block';
      loadAdminUserList();
    }
  }

  toggleBookingForm(true);
  loadMyBookings(false);

  if (ov.view === 'table') {
    clearElementChildren($('ovTableBody'));
    renderOvTable();
  }
}

async function onLogout() {
  const currentSessionToken = getSessionToken();

  if (adminSearchAbortController) {
    adminSearchAbortController.abort();
    adminSearchAbortController = null;
  }
  if (adminBookingListAbortController) {
    adminBookingListAbortController.abort();
    adminBookingListAbortController = null;
  }
  if (adminUserListAbortController) {
    adminUserListAbortController.abort();
    adminUserListAbortController = null;
  }
  abortMigrationOperations();

  if (currentSessionToken && supaClient) {
    try {
      await supaClient.rpc('fn_logout_secure', { p_session_token: currentSessionToken });
    } catch {}
  }

  await teardownRealtime(supaClient);
  deleteCacheByPrefix('my_').catch(() => {});

  resetUserState();
  adminState.bookings = [];
  adminState.searchData = [];
  localStorage.removeItem('erom_user');
  localStorage.removeItem('erom_session_token');
  localStorage.removeItem('erom_session_expires_at');

  const mainLoginBtn = $('mainLoginBtn');
  if (mainLoginBtn) mainLoginBtn.style.display = 'block';

  const userProfileBadge = $('userProfileBadge');
  if (userProfileBadge) userProfileBadge.classList.remove('active');

  const tabAdminBtn = $('tabAdminBtn');
  if (tabAdminBtn) tabAdminBtn.style.display = 'none';

  const tabAdminSearchBtn = $('tabAdminSearchBtn');
  if (tabAdminSearchBtn) tabAdminSearchBtn.style.display = 'none';

  const adminLoginBox = $('adminLoginBox');
  if (adminLoginBox) adminLoginBox.style.display = 'block';

  const adminPanel = $('adminPanel');
  if (adminPanel) adminPanel.style.display = 'none';

  const migrationStatusArea = $('migrationStatusArea');
  if (migrationStatusArea) clearElementChildren(migrationStatusArea);

  const btnMyBookings = $('tabTempahanSayaBtn');
  if (btnMyBookings) btnMyBookings.style.display = 'none';

  const ovUserWrap = $('ovUserFilterWrap');
  if (ovUserWrap) ovUserWrap.style.display = 'none';
  ov.filterUser = '';
  const ovUserFilter = $('ovUserFilter');
  if (ovUserFilter) ovUserFilter.value = '';

  toggleBookingForm(false);

  const tabAdmin = $('tabAdmin');
  const tabTempahanSaya = $('tabTempahanSaya');
  const tabAdminSearch = $('tabAdminSearch');
  if (
    (tabAdmin && tabAdmin.classList.contains('active')) ||
    (tabTempahanSaya && tabTempahanSaya.classList.contains('active')) ||
    (tabAdminSearch && tabAdminSearch.classList.contains('active'))
  ) {
    switchTab('tempahan');
  }

  if (ov.view === 'table') {
    clearElementChildren($('ovTableBody'));
    renderOvTable();
  }

  const myBookingsTbody = $('myBookingsTableBody');
  if (myBookingsTbody) {
    clearElementChildren(myBookingsTbody);
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 5;
    td.style.textAlign = 'center';
    td.style.padding = '15px';
    td.textContent = 'Sila log masuk untuk melihat rekod.';
    tr.appendChild(td);
    myBookingsTbody.appendChild(tr);
  }

  if (supaClient) {
    setupRealtimeSubscription();
  }

  toastInfo('Log keluar berjaya');
}

function showUserProfile() {
  if (!state.user || typeof document === 'undefined' || !document.body) return;

  const { dialog, box } = createBaseDialog(false);

  const titleEl = createEl('h3', 'erom-modal-title');
  titleEl.textContent = state.user.nama;
  box.appendChild(titleEl);

  const infoWrap = createEl('div', 'erom-modal-fields');

  const pSektor = createEl('p', 'erom-modal-text');
  const strongSektor = document.createElement('strong');
  strongSektor.textContent = 'Sektor: ';
  pSektor.appendChild(strongSektor);
  pSektor.appendChild(document.createTextNode(state.user.sektor || '-'));
  infoWrap.appendChild(pSektor);

  const pEmail = createEl('p', 'erom-modal-text');
  const strongEmail = document.createElement('strong');
  strongEmail.textContent = 'Emel: ';
  pEmail.appendChild(strongEmail);
  pEmail.appendChild(document.createTextNode(state.user.email || '-'));
  infoWrap.appendChild(pEmail);

  box.appendChild(infoWrap);

  const actions = createEl('div', 'erom-modal-actions');

  const btnClose = createEl('button', 'btn ghost');
  btnClose.type = 'button';
  btnClose.textContent = 'Tutup';
  actions.appendChild(btnClose);

  const btnChangePass = createEl('button', 'btn secondary');
  btnChangePass.type = 'button';
  btnChangePass.textContent = 'Tukar Password';
  actions.appendChild(btnChangePass);

  const btnLogout = createEl('button', 'btn bad');
  btnLogout.type = 'button';
  btnLogout.textContent = 'Log Keluar';
  actions.appendChild(btnLogout);

  box.appendChild(actions);

  const done = () => closeDialogElement(dialog);

  btnClose.addEventListener('click', done);
  btnChangePass.addEventListener('click', () => {
    done();
    changeOwnPassword();
  });
  btnLogout.addEventListener('click', () => {
    done();
    onLogout();
  });
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    done();
  });

  openDialog(dialog);
}

async function changeOwnPassword() {
  const form = await modalForm(
    'Tukar Kata Laluan',
    [
      {
        name: 'oldP',
        type: 'password',
        label: 'Kata Laluan Lama',
        placeholder: 'Kata Laluan Lama',
        required: true,
        errorMessage: 'Sila masukkan kata laluan lama.'
      },
      {
        name: 'newP',
        type: 'password',
        label: 'Kata Laluan Baru',
        placeholder: 'Kata Laluan Baru',
        required: true,
        errorMessage: 'Sila masukkan kata laluan baharu.'
      }
    ],
    'Kemaskini',
    'Batal'
  );

  if (!form) return;
  if (!supaClient) return toastErr('Perkhidmatan tidak tersedia.');

  modalLoading('Mengemaskini...');
  const { data } = await supaClient.rpc('fn_change_own_password_v2', {
    p_email: state.user.email,
    p_old_pass: form.oldP,
    p_new_pass: form.newP,
    p_session_token: getSessionToken()
  });
  modalClose();

  if (data && data.ok) {
    await modalAlert('Berjaya', 'Kata laluan ditukar.');
  } else {
    await modalAlert('Gagal', (data && data.error) || 'Ralat');
  }
}

function toggleBookingForm(enable) {
  const fields = document.querySelectorAll('#bookingFormContainer input, #bookingFormContainer select, #bookingFormContainer button');
  fields.forEach(f => { f.disabled = !enable; });

  const loginWarning = $('loginWarning');
  if (loginWarning) loginWarning.style.display = enable ? 'none' : 'block';

  const btnBook = $('btnBook');
  if (btnBook) btnBook.style.display = enable ? 'inline-block' : 'none';

  if (enable) {
    resetBookingForm(true);
  }
}

async function onBook() {
  if (isBookingSubmitting) return;
  if (!state.user) return toastErr('Sila log masuk dahulu');
  if (!supaClient) return toastErr('Perkhidmatan belum bersedia.');

  const pickedDateEl = $('pickedDate');
  const startTimeEl = $('startTime');
  const endTimeEl = $('endTime');
  const categoryEl = $('category');
  const noteEl = $('note');
  const sektorEl = $('sektor');
  const namaEl = $('nama');
  const fromDateEl = $('fromDate');
  const toDateEl = $('toDate');
  const btnBookEl = $('btnBook');

  const inputs = {
    room: state.room,
    date: pickedDateEl ? pickedDateEl.value : '',
    start: startTimeEl ? startTimeEl.value : '',
    end: endTimeEl ? endTimeEl.value : '',
    category: categoryEl ? categoryEl.value : '',
    note: noteEl ? noteEl.value.trim() : '',
    sektor: sektorEl ? sektorEl.value : '',
    nama: namaEl ? namaEl.value : ''
  };

  if (!inputs.room) return toastWarn('Sila pilih bilik');
  if (state.rangeMode) {
    if (!fromDateEl || !toDateEl || !fromDateEl.value || !toDateEl.value) return toastWarn('Sila pilih julat tarikh');
  } else {
    if (!inputs.date) return toastWarn('Sila pilih tarikh');
  }
  if (!inputs.start || !inputs.end) return toastWarn('Sila tetapkan masa');
  if (!inputs.note) { markInvalid(noteEl); return toastWarn('Sila isi tujuan'); }

  const confirmMsg = state.rangeMode
    ? 'Anda pasti mahu merekod tempahan berturut (julat tarikh)?'
    : `Sahkan tempahan pada ${inputs.date}?`;

  const isConfirmed = await modalConfirm('Sahkan Tempahan?', confirmMsg);
  if (!isConfirmed) return;

  isBookingSubmitting = true;
  if (btnBookEl) btnBookEl.disabled = true;
  modalLoading('Menghantar tempahan...');

  try {
    let res;
    if (state.rangeMode) {
      res = await supaClient.rpc('fn_create_booking_range_secure_v2', {
        p_bilik: inputs.room,
        p_from: fromDateEl.value,
        p_to: toDateEl.value,
        p_start: inputs.start,
        p_end: inputs.end,
        p_category: inputs.category,
        p_note: inputs.note,
        p_sektor: inputs.sektor,
        p_nama: inputs.nama,
        p_session_token: getSessionToken()
      });
    } else {
      res = await supaClient.rpc('fn_create_booking_secure_v2', {
        p_bilik: inputs.room,
        p_date: inputs.date,
        p_start: inputs.start,
        p_end: inputs.end,
        p_category: inputs.category,
        p_note: inputs.note,
        p_sektor: inputs.sektor,
        p_nama: inputs.nama,
        p_session_token: getSessionToken()
      });
    }

    modalClose();

    if (res.data && res.data.ok) {
      await modalAlert('Berjaya', 'Tempahan telah direkodkan.');
      await clearActiveCaches();
      if (state.room) refreshCalendar(false);
      loadOverview(false);
      loadMyBookings(false);
      if (noteEl) noteEl.value = '';
    } else {
      await modalAlert('Gagal', (res.data && res.data.error) || 'Ralat tidak diketahui');
    }
  } catch (e) {
    modalClose();
    await modalAlert('Ralat Rangkaian', e.message);
  } finally {
    isBookingSubmitting = false;
    if (btnBookEl && state.user) btnBookEl.disabled = false;
  }
}

function onRoomSelectChange(e) {
  state.room = e.target.value;
  const pickedDateEl = $('pickedDate');
  const fromDateEl = $('fromDate');
  const toDateEl = $('toDate');
  if (pickedDateEl) pickedDateEl.value = '';
  if (fromDateEl) fromDateEl.value = '';
  if (toDateEl) toDateEl.value = '';

  state.selectedDate = null;
  state.range = { from: null, to: null };
  document.querySelectorAll('.tile.sel').forEach(el => el.classList.remove('sel'));
  highlightRangeTiles();

  const noRoomHint = $('noRoomHint');
  if (state.room) {
    if (noRoomHint) noRoomHint.style.display = 'none';
    refreshCalendar(true);
  } else {
    clearElementChildren($('grid'));
    if (noRoomHint) noRoomHint.style.display = 'block';
  }
}

async function refreshCalendar(showLoading) {
  if (!state.room || !supaClient) return;

  const start = firstDay(state.year, state.month);
  const end = lastDay(state.year, state.month);
  const cacheKey = `cal_${state.room}_${state.year}_${pad2(state.month)}`;

  let hasCachedData = false;
  try {
    const cached = await getCacheEntry(cacheKey);
    if (cached && Array.isArray(cached.data)) {
      hasCachedData = true;
      state.days = processBookingsForCalendar(cached.data);
      renderCalendar();
      highlightSelectedTile();
      if (state.rangeMode) highlightRangeTiles();
    }
  } catch {}

  if (showLoading && !hasCachedData) modalLoading('Memuatkan kalendar...');

  try {
    const { data, error } = await supaClient
      .from('v_bookings_active')
      .select('*')
      .eq('bilik', state.room)
      .gte('tarikh', start)
      .lte('tarikh', end);

    if (showLoading && !hasCachedData) modalClose();

    if (error) {
      if (!hasCachedData) toastErr('Gagal memuatkan data');
      return;
    }

    const freshData = data || [];
    state.days = processBookingsForCalendar(freshData);
    renderCalendar();
    highlightSelectedTile();
    if (state.rangeMode) highlightRangeTiles();

    setCache(cacheKey, freshData, 300).catch(() => {});
  } catch {
    if (showLoading && !hasCachedData) modalClose();
    if (!hasCachedData) toastErr('Ralat rangkaian kalendar');
  }
}

function processBookingsForCalendar(bookings) {
  const map = {};
  const daysInMonth = new Date(state.year, state.month, 0).getDate();
  const today = todayYMD();

  for (let d = 1; d <= daysInMonth; d++) {
    const ymd = `${state.year}-${pad2(state.month)}-${pad2(d)}`;
    map[ymd] = {
      date: ymd,
      bookings: [],
      totalMin: 0,
      count: 0,
      isPast: ymd < today,
      status: 'green'
    };
  }

  bookings.forEach(b => {
    const ymd = toYMDNorm(b.tarikh);
    if (map[ymd]) {
      const min = toMinutes(b.masa_tamat) - toMinutes(b.masa_mula);
      map[ymd].bookings.push(b);
      map[ymd].totalMin += min;
      map[ymd].count += 1;
    }
  });

  Object.values(map).forEach(day => {
    if (day.totalMin >= 360 || day.count >= 6) {
      day.status = 'red';
    } else if (day.count > 0) {
      day.status = 'orange';
    } else {
      day.status = 'green';
    }
  });

  return Object.values(map);
}

function renderCalendar() {
  const grid = $('grid');
  if (!grid) return;
  clearElementChildren(grid);

  const daysToShow = SHOW_PAST_DAYS ? state.days : state.days.filter(d => !d.isPast);

  if (daysToShow.length === 0) {
    const div = document.createElement('div');
    div.className = 'small';
    div.style.padding = '1rem';
    div.textContent = 'Tiada tarikh untuk dipaparkan.';
    grid.appendChild(div);
    return;
  }

  const docFrag = document.createDocumentFragment();
  const first = daysToShow[0];
  const weekday = (getLocalDayOfWeek(first.date) + 6) % 7;

  for (let i = 0; i < weekday; i++) {
    docFrag.appendChild(createEl('div', 'blank'));
  }

  daysToShow.forEach(day => {
    docFrag.appendChild(buildTile(day));
  });

  grid.appendChild(docFrag);
}

function buildTile(day) {
  const dow = getLocalDayOfWeek(day.date);
  const isWeekend = (dow === 0 || dow === 6);
  const tile = createEl('div', `tile ${day.isPast || isWeekend ? 'disabled' : ''}`);
  tile.dataset.date = day.date;

  const top = createEl('div', 'date');
  top.textContent = Number(day.date.slice(8, 10));

  if (!day.isPast && !isWeekend) {
    const statusMap = { red: 'PENUH', orange: 'SEPARA PENUH', green: 'TIADA TEMPAHAN' };
    const badge = createEl('span', `badge ${day.status}`);
    badge.textContent = statusMap[day.status] || '';
    top.appendChild(badge);
  }
  tile.appendChild(top);

  const body = createEl('div', 'body');
  if (!day.isPast && !isWeekend) {
    const list = createEl('div', 'small');

    if (day.bookings && day.bookings.length > 0) {
      day.bookings.sort((a, b) => a.masa_mula.localeCompare(b.masa_mula));
      day.bookings.forEach(b => {
        const p = createEl('div');
        const note = b.tujuan ? ` • ${String(b.tujuan).slice(0, 30)}${b.tujuan.length > 30 ? '…' : ''}` : '';
        p.textContent = `${toHHMM(b.masa_mula)}–${toHHMM(b.masa_tamat)} • ${b.kategori}${note}`;
        list.appendChild(p);
      });
    } else {
      const p = createEl('div');
      p.className = 'small';
      p.textContent = 'Tiada tempahan.';
      list.appendChild(p);
    }
    body.appendChild(list);
  }
  tile.appendChild(body);

  return tile;
}

function onGridClick(e) {
  const tile = e.target.closest('.tile');
  if (!tile || tile.classList.contains('disabled')) return;
  const date = tile.dataset.date;

  const dayData = state.days.find(d => d.date === date);

  if (state.rangeMode) {
    const clickedDate = date;

    if (dayData && dayData.status === 'red') {
      toastWarn('Bilik ini telah PENUH pada tarikh tersebut. Anda tidak boleh menempahnya.');
    } else {
      if (!state.range.from) {
        state.range.from = clickedDate;
        toastInfo('Tarikh mula dipilih');
      } else if (!state.range.to) {
        if (clickedDate < state.range.from) {
          state.range.to = state.range.from;
          state.range.from = clickedDate;
        } else {
          state.range.to = clickedDate;
        }
        toastOk('Julat tarikh ditetapkan');
      } else {
        state.range = { from: clickedDate, to: null };
        toastInfo('Pilih tarikh akhir');
      }

      const fromDateEl = $('fromDate');
      const toDateEl = $('toDate');
      if (fromDateEl) fromDateEl.value = state.range.from || '';
      if (toDateEl) toDateEl.value = state.range.to || '';
      onRangeChange();
    }
  } else {
    if (dayData && dayData.status === 'red') {
      toastWarn('Bilik ini telah PENUH pada tarikh tersebut. Anda tidak boleh menempahnya.');
    } else {
      document.querySelectorAll('.tile.sel').forEach(el => el.classList.remove('sel'));
      tile.classList.add('sel');
      state.selectedDate = date;
      const pickedDateEl = $('pickedDate');
      if (pickedDateEl) pickedDateEl.value = date;
      toastInfo(`Tarikh dipilih: ${state.selectedDate}`);
    }
  }

  if (dayData && dayData.bookings && dayData.bookings.length > 0) {
    modalBookingList(date, dayData.bookings);
  }
}

function setRangeMode(on) {
  state.rangeMode = on;
  const toggleRangeOn = $('toggleRangeOn');
  const toggleRangeOff = $('toggleRangeOff');
  const pickedDate = $('pickedDate');
  const fromDateWrap = $('fromDateWrap');
  const toDateWrap = $('toDateWrap');
  const rangeCounter = $('rangeCounter');
  const fromDate = $('fromDate');
  const toDate = $('toDate');

  if (toggleRangeOn) toggleRangeOn.classList.toggle('active', on);
  if (toggleRangeOff) toggleRangeOff.classList.toggle('active', !on);
  if (pickedDate && pickedDate.parentElement) pickedDate.parentElement.style.display = on ? 'none' : 'block';
  if (fromDateWrap) fromDateWrap.style.display = on ? 'block' : 'none';
  if (toDateWrap) toDateWrap.style.display = on ? 'block' : 'none';
  if (rangeCounter) rangeCounter.style.display = on ? 'block' : 'none';

  state.range = { from: null, to: null };
  state.selectedDate = null;
  if (pickedDate) pickedDate.value = '';
  if (fromDate) fromDate.value = '';
  if (toDate) toDate.value = '';

  document.querySelectorAll('.tile.sel').forEach(el => el.classList.remove('sel'));
  highlightRangeTiles();
  updateRangeCounter();
}

function onDateChange(e) {
  state.selectedDate = e.target.value;
  const day = state.days.find(d => d.date === state.selectedDate);
  if (day && day.status === 'red') {
    toastWarn('Tarikh penuh!');
    state.selectedDate = null;
    const pickedDate = $('pickedDate');
    if (pickedDate) pickedDate.value = '';
    return;
  }
  highlightSelectedTile();
}

function highlightRangeTiles() {
  document.querySelectorAll('#grid .tile.range').forEach(el => el.classList.remove('range'));

  if (!state.range.from) return;

  if (state.range.from && !state.range.to) {
    const el = document.querySelector(`#grid .tile[data-date="${state.range.from}"]`);
    if (el) el.classList.add('range');
    return;
  }

  let d = state.range.from;
  if (state.range.to < state.range.from) return;

  while (d <= state.range.to) {
    const el = document.querySelector(`#grid .tile[data-date="${d}"]`);
    if (el) el.classList.add('range');
    d = addDaysYMD(d, 1);
  }
}

function highlightSelectedTile() {
  if (!state.selectedDate) return;
  const el = document.querySelector(`#grid .tile[data-date="${state.selectedDate}"]`);
  if (el) el.classList.add('sel');
}

function onRangeChange() {
  const fromDate = $('fromDate');
  const toDate = $('toDate');
  state.range.from = fromDate ? fromDate.value || null : null;
  state.range.to = toDate ? toDate.value || null : null;

  if (state.range.from && state.range.to && state.range.from > state.range.to) {
    toastWarn('Tarikh Dari mesti sebelum atau sama dengan Tarikh Hingga');
  }
  highlightRangeTiles();
  updateRangeCounter();
}

function updateRangeCounter() {
  if (!state.rangeMode) return;
  const d1 = state.range.from;
  const d2 = state.range.to;
  const rangeCounter = $('rangeCounter');
  if (!rangeCounter) return;

  if (!d1 && !d2) {
    rangeCounter.textContent = 'Pilih julat tarikh...';
    return;
  }
  if (d1 && !d2) {
    rangeCounter.textContent = 'Sila pilih tarikh akhir...';
    return;
  }

  let count = 0;
  let curr = d1;
  while (curr <= d2) {
    const day = getLocalDayOfWeek(curr);
    if (day !== 0 && day !== 6) count++;
    curr = addDaysYMD(curr, 1);
  }
  rangeCounter.textContent = `Akan ditempah: ${count} hari bekerja`;
}

async function loadOverview(loading) {
  if (!supaClient) return;
  const start = firstDay(ov.year, ov.month);
  const end = lastDay(ov.year, ov.month);
  const cacheKey = `ov_${ov.year}_${pad2(ov.month)}`;

  let hasCachedData = false;
  try {
    const cached = await getCacheEntry(cacheKey);
    if (cached && Array.isArray(cached.data)) {
      hasCachedData = true;
      ov.bookings = cached.data;
      processOverviewData(ov.bookings);
      populateUserFilter();
      renderOvTable();
      renderOvCalendar();
    }
  } catch {}

  if (loading && !hasCachedData) modalLoading('Mengemaskini...');

  try {
    const { data, error } = await supaClient
      .from('v_bookings_active')
      .select('*')
      .gte('tarikh', start)
      .lte('tarikh', end)
      .order('tarikh', { ascending: true })
      .order('masa_mula', { ascending: true });

    if (loading && !hasCachedData) modalClose();

    if (error) {
      return;
    }

    const freshData = data || [];
    ov.bookings = freshData;
    processOverviewData(ov.bookings);
    populateUserFilter();
    renderOvTable();
    renderOvCalendar();

    setCache(cacheKey, freshData, 300).catch(() => {});
  } catch {
    if (loading && !hasCachedData) modalClose();
  }
}

function populateUserFilter() {
  const filterEl = $('ovUserFilter');
  if (!filterEl) return;

  clearElementChildren(filterEl);

  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = '— Semua Penempah —';
  filterEl.appendChild(defaultOpt);

  if (!state.user) return;

  const today = todayYMD();
  let validBookings = ov.bookings.filter(b => toYMDNorm(b.tarikh) >= today);

  if (ov.filterRoom) {
    validBookings = validBookings.filter(b => b.bilik === ov.filterRoom);
  }

  const uniqueNames = [...new Set(validBookings.map(b => b.nama_penempah))].sort();

  uniqueNames.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    filterEl.appendChild(opt);
  });

  filterEl.value = ov.filterUser;
}

function processOverviewData(bookings) {
  const daysMap = new Map();
  const daysInMonth = new Date(ov.year, ov.month, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const ymd = `${ov.year}-${pad2(ov.month)}-${pad2(d)}`;
    daysMap.set(ymd, { date: ymd, rooms: [], counts: { red: 0, orange: 0 } });
  }

  const perRoomPerDay = new Map();
  bookings.forEach(b => {
    const ymd = toYMDNorm(b.tarikh);
    const key = `${ymd}|${b.bilik}`;
    if (!perRoomPerDay.has(key)) {
      perRoomPerDay.set(key, { count: 0, totalMin: 0 });
    }
    const curr = perRoomPerDay.get(key);
    curr.count += 1;
    curr.totalMin += (toMinutes(b.masa_tamat) - toMinutes(b.masa_mula));
  });

  perRoomPerDay.forEach((val, key) => {
    const [date, roomName] = key.split('|');
    const dayData = daysMap.get(date);
    if (dayData) {
      const isFull = (val.totalMin >= 360 || val.count >= 6);
      const status = isFull ? 'red' : 'orange';
      dayData.rooms.push({ room: roomName, status: status });
      if (isFull) dayData.counts.red++;
      else dayData.counts.orange++;
    }
  });

  ov.days = Array.from(daysMap.values());
}

function switchOverviewView(view) {
  ov.view = view;
  const btnViewCalendar = $('btnViewCalendar');
  const btnViewTable = $('btnViewTable');
  const ovCalendarWrap = $('ovCalendarWrap');
  const ovTableWrap = $('ovTableWrap');

  if (btnViewCalendar) btnViewCalendar.classList.toggle('active', view === 'calendar');
  if (btnViewTable) btnViewTable.classList.toggle('active', view === 'table');
  if (ovCalendarWrap) ovCalendarWrap.style.display = view === 'calendar' ? 'block' : 'none';
  if (ovTableWrap) ovTableWrap.style.display = view === 'table' ? 'block' : 'none';

  if (view === 'table') {
    renderOvTable();
  }
}

function renderOvTable() {
  const tbody = $('ovTableBody');
  if (!tbody) return;

  clearElementChildren(tbody);

  let list = ov.bookings;
  const today = todayYMD();

  list = list.filter(b => toYMDNorm(b.tarikh) >= today);

  if (ov.filterRoom) list = list.filter(b => b.bilik === ov.filterRoom);
  if (ov.filterUser) list = list.filter(b => b.nama_penempah === ov.filterUser);

  if (!list.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 6;
    td.style.cssText = 'text-align:center;padding:15px';
    td.textContent = 'Tiada tempahan semasa atau akan datang.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  const docFrag = document.createDocumentFragment();

  list.forEach(b => {
    const tr = document.createElement('tr');

    let canAction = false;
    if (state.user && state.user.role) {
      if (state.user.role === 'ADMIN') {
        canAction = true;
      } else if (state.user.nama === b.nama_penempah) {
        canAction = true;
      }
    }

    const tdTarikh = document.createElement('td');
    tdTarikh.textContent = b.tarikh;
    tr.appendChild(tdTarikh);

    const tdMasa = document.createElement('td');
    tdMasa.style.fontFamily = 'monospace';
    tdMasa.textContent = `${toHHMM(b.masa_mula)}-${toHHMM(b.masa_tamat)}`;
    tr.appendChild(tdMasa);

    const tdBilik = document.createElement('td');
    tdBilik.textContent = b.bilik;
    tr.appendChild(tdBilik);

    const tdTujuan = document.createElement('td');
    tdTujuan.textContent = b.tujuan;
    tr.appendChild(tdTujuan);

    const tdPenempah = document.createElement('td');
    const strongPenempah = document.createElement('strong');
    strongPenempah.textContent = b.nama_penempah;
    tdPenempah.appendChild(strongPenempah);
    tr.appendChild(tdPenempah);

    const tdAction = document.createElement('td');
    tdAction.style.textAlign = 'center';

    if (canAction) {
      const divWrap = document.createElement('div');
      divWrap.style.cssText = 'display:flex; gap:8px; justify-content:center;';

      const btnEdit = document.createElement('button');
      btnEdit.type = 'button';
      btnEdit.className = 'btn-icon-edit-user';
      btnEdit.dataset.id = b.booking_id;
      btnEdit.title = 'Kemaskini Tempahan';
      btnEdit.textContent = '✏️';
      btnEdit.style.cssText = 'background:none; border:none; cursor:pointer; font-size:1.1rem; min-height:36px;';
      btnEdit.addEventListener('click', () => openUserEditModal(btnEdit.dataset.id));
      divWrap.appendChild(btnEdit);

      const btnDel = document.createElement('button');
      btnDel.type = 'button';
      btnDel.className = 'btn-icon-del';
      btnDel.dataset.id = b.booking_id;
      btnDel.title = 'Batal Tempahan';
      btnDel.textContent = '🗑️';
      btnDel.style.cssText = 'background:none; border:none; cursor:pointer; font-size:1.1rem; min-height:36px;';
      btnDel.addEventListener('click', () => cancelBooking(btnDel.dataset.id));
      divWrap.appendChild(btnDel);

      tdAction.appendChild(divWrap);
    } else {
      const spanPlaceholder = document.createElement('span');
      spanPlaceholder.style.cssText = 'color:#ccc; font-size:0.8rem;';
      spanPlaceholder.textContent = '-';
      tdAction.appendChild(spanPlaceholder);
    }

    tr.appendChild(tdAction);
    docFrag.appendChild(tr);
  });

  tbody.appendChild(docFrag);
}

function renderOvCalendar() {
  const grid = $('ovGrid');
  if (!grid) return;

  clearElementChildren(grid);

  const lastDayOfMonth = new Date(ov.year, ov.month, 0).getDate();
  const firstDow = (new Date(ov.year, ov.month - 1, 1).getDay() + 6) % 7;

  const docFrag = document.createDocumentFragment();

  for (let i = 0; i < firstDow; i++) {
    docFrag.appendChild(createEl('div', 'blank'));
  }

  const dayMap = new Map((ov.days || []).map(d => [d.date, d]));

  for (let d = 1; d <= lastDayOfMonth; d++) {
    const ymd = `${ov.year}-${pad2(ov.month)}-${pad2(d)}`;
    const dayData = dayMap.get(ymd);

    const tile = createEl('div', 'tile');

    const top = createEl('div', 'date');
    top.textContent = d;

    if (dayData && (dayData.counts.red > 0 || dayData.counts.orange > 0)) {
      const div = createEl('div', 'cnt-group');
      if (dayData.counts.red > 0) {
        const spanRed = document.createElement('span');
        spanRed.className = 'cnt-pill red';
        spanRed.textContent = `P:${dayData.counts.red}`;
        div.appendChild(spanRed);
      }
      if (dayData.counts.orange > 0) {
        const spanOrange = document.createElement('span');
        spanOrange.className = 'cnt-pill orange';
        spanOrange.textContent = `S:${dayData.counts.orange}`;
        div.appendChild(spanOrange);
      }
      top.appendChild(div);
    }
    tile.appendChild(top);

    const body = createEl('div', 'body');
    if (dayData && dayData.rooms.length > 0) {
      const list = createEl('div', 'listRooms');
      dayData.rooms.forEach(it => {
        const pill = createEl('span', `pill ${it.status}`);
        pill.textContent = it.room;
        list.appendChild(pill);
      });
      body.appendChild(list);
    }
    tile.appendChild(body);
    docFrag.appendChild(tile);
  }

  grid.appendChild(docFrag);
  renderOvSummary();
}

function renderOvSummary() {
  const list = $('ovSummaryList');
  if (!list) return;
  clearElementChildren(list);

  const counter = new Map();
  ov.bookings.forEach(b => {
    counter.set(b.bilik, (counter.get(b.bilik) || 0) + 1);
  });

  if (counter.size === 0) {
    list.textContent = 'Tiada data.';
    return;
  }

  const rows = ROOM_OPTIONS
    .map(room => [room, counter.get(room) || 0])
    .filter(x => x[1] > 0)
    .sort((a, b) => (b[1] - a[1]));

  const docFrag = document.createDocumentFragment();

  rows.forEach(([room, c], index) => {
    const wrapper = document.createElement('span');
    wrapper.appendChild(document.createTextNode(`• ${room} (`));
    const strong = document.createElement('strong');
    strong.textContent = c;
    wrapper.appendChild(strong);
    wrapper.appendChild(document.createTextNode(' tempahan)'));
    docFrag.appendChild(wrapper);

    if (index < rows.length - 1) {
      docFrag.appendChild(document.createElement('br'));
    }
  });

  list.appendChild(docFrag);
  const ovSummaryWrap = $('ovSummaryWrap');
  if (ovSummaryWrap) ovSummaryWrap.style.display = 'block';
}

async function cancelBooking(id) {
  const isConfirmed = await modalConfirm(
    'HAPUSKAN TEMPAHAN?',
    'Tindakan ini akan memadam rekod anda secara kekal dan tidak boleh dikembalikan.',
    'Ya, Hapus Serta-merta',
    'Batal',
    true
  );

  if (isConfirmed) {
    if (!supaClient) return toastErr('Perkhidmatan belum bersedia.');
    modalLoading('Membatalkan...');
    const { data } = await supaClient.rpc('fn_cancel_booking_secure_v2', {
      p_booking_id: id,
      p_email: state.user.email,
      p_reason: 'Dibatalkan oleh pengguna',
      p_session_token: getSessionToken()
    });
    modalClose();

    if (data && data.ok) {
      toastOk('Berjaya dibatalkan');
      await clearActiveCaches();
      loadOverview(false);
      loadMyBookings(false);
      if (state.room) refreshCalendar(false);
      const tabAdminSearch = $('tabAdminSearch');
      if (tabAdminSearch && tabAdminSearch.classList.contains('active')) executeAdminSearch();
    } else {
      await modalAlert('Gagal', (data && data.error) || 'Ralat');
    }
  }
}

async function openUnifiedBookingEditModal(booking, titleText, recordId, onAfterUpdate) {
  if (!booking) return;

  const form = await modalForm(
    titleText,
    [
      {
        name: 'd',
        type: 'date',
        label: 'Tarikh',
        value: toYMDNorm(booking.tarikh),
        required: true
      },
      {
        name: 's',
        type: 'time',
        label: 'Masa Mula',
        value: toHHMM(booking.masa_mula),
        required: true
      },
      {
        name: 'e',
        type: 'time',
        label: 'Masa Tamat',
        value: toHHMM(booking.masa_tamat),
        required: true
      },
      {
        name: 'n',
        type: 'text',
        label: 'Tujuan',
        value: booking.tujuan,
        required: true
      }
    ],
    'Simpan',
    'Batal'
  );

  if (!form) return;
  if (!supaClient) return toastErr('Perkhidmatan belum bersedia.');

  const isConfirmed = await modalConfirm(
    'Simpan Perubahan?',
    'Maklumat tempahan asal akan digantikan dengan data baharu.'
  );
  if (!isConfirmed) return;

  modalLoading('Menyimpan...');
  const { data } = await supaClient.rpc('fn_update_booking_secure_v2', {
    p_booking_id: recordId,
    p_email: state.user.email,
    p_date: form.d,
    p_start: form.s,
    p_end: form.e,
    p_category: booking.kategori,
    p_note: form.n,
    p_sektor: booking.sektor,
    p_nama: booking.nama_penempah,
    p_session_token: getSessionToken()
  });
  modalClose();

  if (data && data.ok) {
    toastOk('Tempahan berjaya dikemaskini.');
    await clearActiveCaches();
    if (typeof onAfterUpdate === 'function') {
      await onAfterUpdate();
    }
  } else {
    await modalAlert('Ralat', (data && data.error) || 'Ralat tidak diketahui');
  }
}

async function openUserEditModal(id) {
  let b = ov.bookings.find(x => x.booking_id === id);
  if (!b) b = state.myBookings.find(x => x.booking_id === id);
  if (!b) return;

  await openUnifiedBookingEditModal(b, 'Kemaskini Tempahan', id, async () => {
    loadOverview(false);
    loadMyBookings(false);
    if (state.room === b.bilik) refreshCalendar(false);
  });
}

async function loadMyBookings(showLoading) {
  if (!state.user || !supaClient) return;

  const today = todayYMD();
  const cacheKey = `my_${encodeURIComponent(state.user.nama)}_${today}`;

  let hasCachedData = false;
  try {
    const cached = await getCacheEntry(cacheKey);
    if (cached && Array.isArray(cached.data)) {
      hasCachedData = true;
      state.myBookings = cached.data;
      renderMyBookingsTable();
    }
  } catch {}

  if (showLoading && !hasCachedData) modalLoading('Memuatkan senarai tempahan anda...');

  try {
    const { data, error } = await supaClient
      .from('v_bookings_active')
      .select('*')
      .eq('nama_penempah', state.user.nama)
      .gte('tarikh', today)
      .order('tarikh', { ascending: true })
      .order('masa_mula', { ascending: true });

    if (showLoading && !hasCachedData) modalClose();

    if (error) {
      if (!hasCachedData) toastErr('Gagal memuatkan tempahan peribadi.');
      return;
    }

    const freshData = data || [];
    state.myBookings = freshData;
    renderMyBookingsTable();

    setCache(cacheKey, freshData, 180).catch(() => {});
  } catch {
    if (showLoading && !hasCachedData) modalClose();
    if (!hasCachedData) toastErr('Ralat rangkaian tempahan saya');
  }
}

function renderMyBookingsTable() {
  const tbody = $('myBookingsTableBody');
  if (!tbody) return;
  clearElementChildren(tbody);

  if (!state.myBookings || state.myBookings.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 5;
    td.style.cssText = 'text-align:center;padding:15px';
    td.textContent = 'Tiada tempahan aktif atau akan datang.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  const docFrag = document.createDocumentFragment();

  state.myBookings.forEach(b => {
    const tr = document.createElement('tr');

    const tdTarikh = document.createElement('td');
    tdTarikh.textContent = b.tarikh;
    tr.appendChild(tdTarikh);

    const tdMasa = document.createElement('td');
    tdMasa.style.fontFamily = 'monospace';
    tdMasa.textContent = `${toHHMM(b.masa_mula)}-${toHHMM(b.masa_tamat)}`;
    tr.appendChild(tdMasa);

    const tdBilik = document.createElement('td');
    tdBilik.textContent = b.bilik;
    tr.appendChild(tdBilik);

    const tdTujuan = document.createElement('td');
    tdTujuan.textContent = b.tujuan;
    tr.appendChild(tdTujuan);

    const tdAction = document.createElement('td');
    tdAction.style.textAlign = 'center';

    const divWrap = document.createElement('div');
    divWrap.style.cssText = 'display:flex; gap:8px; justify-content:center;';

    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.className = 'btn-icon-edit-my';
    btnEdit.dataset.id = b.booking_id;
    btnEdit.title = 'Kemaskini';
    btnEdit.textContent = '✏️';
    btnEdit.style.cssText = 'background:none; border:none; cursor:pointer; font-size:1.1rem; min-height:36px;';
    btnEdit.addEventListener('click', () => openUserEditModal(btnEdit.dataset.id));
    divWrap.appendChild(btnEdit);

    const btnDel = document.createElement('button');
    btnDel.type = 'button';
    btnDel.className = 'btn-icon-del-my';
    btnDel.dataset.id = b.booking_id;
    btnDel.title = 'Batal';
    btnDel.textContent = '🗑️';
    btnDel.style.cssText = 'background:none; border:none; cursor:pointer; font-size:1.1rem; min-height:36px;';
    btnDel.addEventListener('click', () => cancelBooking(btnDel.dataset.id));
    divWrap.appendChild(btnDel);

    tdAction.appendChild(divWrap);
    tr.appendChild(tdAction);

    docFrag.appendChild(tr);
  });

  tbody.appendChild(docFrag);
}

async function adminAddUser() {
  const formValues = await modalForm(
    'Tambah Pegawai Baharu',
    [
      {
        name: 'nama',
        type: 'text',
        label: 'Nama Penuh',
        placeholder: 'Contoh: Ahmad bin Ali',
        required: true,
        errorMessage: 'Sila lengkapkan semua ruang.'
      },
      {
        name: 'sektor',
        type: 'text',
        label: 'Sektor / Unit',
        placeholder: 'Contoh: Sektor Pengurusan',
        required: true,
        errorMessage: 'Sila lengkapkan semua ruang.'
      },
      {
        name: 'email',
        type: 'email',
        label: 'Emel Rasmi (ID Log Masuk)',
        placeholder: 'Contoh: ahmad@moe.gov.my',
        required: true,
        errorMessage: 'Sila lengkapkan semua ruang.'
      },
      {
        name: 'pass',
        type: 'text',
        label: 'Kata Laluan Sementara',
        value: 'ppdag@12345',
        required: true,
        errorMessage: 'Sila lengkapkan semua ruang.'
      }
    ],
    'Daftar Pegawai',
    'Batal'
  );

  if (!formValues) return;
  if (!supaClient) return toastErr('Perkhidmatan belum bersedia.');

  modalLoading('Mendaftar Pegawai...');

  const { data } = await supaClient.rpc('fn_admin_create_user_v2', {
    p_admin_email: state.user.email,
    p_session_token: getSessionToken(),
    p_new_email: formValues.email,
    p_new_password: formValues.pass,
    p_new_name: formValues.nama,
    p_new_sektor: formValues.sektor
  });

  modalClose();

  if (data && data.ok) {
    await modalAlert('Berjaya', 'Pegawai baharu telah didaftarkan.');
    loadAdminUserList();
  } else {
    await modalAlert('Gagal', (data && data.error) || 'Ralat semasa mendaftar pegawai');
  }
}

async function loadAdminUserList() {
  const tbody = $('adminUserListBody');
  if (!tbody || !supaClient || !state.user) return;

  if (adminUserListAbortController) {
    adminUserListAbortController.abort();
  }
  const controller = new AbortController();
  adminUserListAbortController = controller;

  clearElementChildren(tbody);

  const loadingTr = document.createElement('tr');
  const loadingTd = document.createElement('td');
  loadingTd.colSpan = 4;
  loadingTd.style.cssText = 'text-align:center;padding:15px';
  loadingTd.textContent = 'Memuatkan...';
  loadingTr.appendChild(loadingTd);
  tbody.appendChild(loadingTr);

  const { data, error } = await supaClient.rpc('fn_get_all_users_secure_v2', {
    p_email: state.user.email,
    p_session_token: getSessionToken()
  });

  if (controller.signal.aborted) return;

  clearElementChildren(tbody);

  if (error || !data || !data.ok) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.style.cssText = 'text-align:center;color:red';
    td.textContent = 'Gagal akses data pengguna.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  const users = data.data;

  if (!users || users.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.style.cssText = 'text-align:center;padding:15px';
    td.textContent = 'Tiada pengguna ditemui.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  const docFrag = document.createDocumentFragment();

  users.forEach(u => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #f1f5f9';

    const tdNama = document.createElement('td');
    tdNama.style.padding = '10px';
    tdNama.textContent = u.nama;
    tr.appendChild(tdNama);

    const tdSektor = document.createElement('td');
    tdSektor.style.padding = '10px';
    tdSektor.textContent = u.sektor;
    tr.appendChild(tdSektor);

    const tdEmail = document.createElement('td');
    tdEmail.style.padding = '10px';
    tdEmail.textContent = u.email;
    tr.appendChild(tdEmail);

    const tdAction = document.createElement('td');
    tdAction.style.cssText = 'padding:10px; text-align:center; white-space:nowrap;';

    const btnReset = document.createElement('button');
    btnReset.type = 'button';
    btnReset.className = 'btn-reset';
    btnReset.dataset.id = u.id;
    btnReset.dataset.email = u.email;
    btnReset.textContent = 'Reset';
    btnReset.onclick = () => adminResetPassword(btnReset.dataset.id, btnReset.dataset.email);
    tdAction.appendChild(btnReset);

    const btnDel = document.createElement('button');
    btnDel.type = 'button';
    btnDel.className = 'btn-reset btn-delete-user';
    btnDel.dataset.id = u.id;
    btnDel.dataset.email = u.email;
    btnDel.textContent = 'Buang';
    btnDel.style.cssText = 'color:var(--bad); border-color:var(--bad); margin-left:5px;';
    btnDel.onclick = () => adminDeleteUser(btnDel.dataset.id, btnDel.dataset.email);
    tdAction.appendChild(btnDel);

    tr.appendChild(tdAction);
    docFrag.appendChild(tr);
  });

  tbody.appendChild(docFrag);
}

async function adminResetPassword(id, email) {
  const isConfirmed = await modalConfirm(
    'Reset Kata Laluan?',
    `Reset password ${email} kepada 'ppdag@12345'?`,
    'Ya, Reset'
  );

  if (isConfirmed) {
    if (!supaClient) return toastErr('Perkhidmatan belum bersedia.');
    modalLoading('Memproses...');
    const { data } = await supaClient.rpc('fn_admin_reset_password_v2', {
      p_admin_email: state.user.email,
      p_target_id: id,
      p_session_token: getSessionToken()
    });
    modalClose();
    if (data && data.ok) {
      await modalAlert('Berjaya', 'Kata laluan telah ditetapkan semula.');
    } else {
      await modalAlert('Gagal', (data && data.error) || 'Ralat tidak diketahui');
    }
  }
}

async function adminDeleteUser(id, email) {
  if (email === state.user.email) {
    return modalAlert('Tidak Dibenarkan', 'Anda tidak boleh membuang akaun anda sendiri.');
  }

  const isConfirmed = await modalConfirm(
    'Buang Pegawai?',
    `Anda pasti mahu memadam akaun pegawai ${email}? Semua rekod login berkaitan akan terhapus. (Sila pastikan anda juga menguruskan tempahan bilik mereka jika perlu).`,
    'Ya, Padam',
    'Batal',
    true
  );

  if (isConfirmed) {
    if (!supaClient) return toastErr('Perkhidmatan belum bersedia.');
    modalLoading('Memadam akaun...');

    const { data } = await supaClient.rpc('fn_admin_delete_user_v2', {
      p_admin_email: state.user.email,
      p_session_token: getSessionToken(),
      p_target_id: id
    });

    modalClose();

    if (data && data.ok) {
      toastOk('Akaun pegawai telah dipadam.');
      loadAdminUserList();
    } else {
      await modalAlert('Gagal', (data && data.error) || 'Ralat semasa memadam pegawai');
    }
  }
}

async function loadAdminBookingList() {
  const adminRoom = $('adminRoom');
  const room = adminRoom ? adminRoom.value : '';
  if (!room) return toastWarn('Sila pilih bilik dahulu');

  const listDiv = $('adminList');
  if (!listDiv || !supaClient || !state.user) return;

  if (adminBookingListAbortController) {
    adminBookingListAbortController.abort();
  }
  const controller = new AbortController();
  adminBookingListAbortController = controller;

  clearElementChildren(listDiv);

  const loadingDiv = document.createElement('div');
  loadingDiv.style.cssText = 'padding:10px;text-align:center';
  loadingDiv.textContent = 'Memuatkan...';
  listDiv.appendChild(loadingDiv);

  const { data } = await supaClient.rpc('fn_admin_list_bookings_v2', {
    p_email: state.user.email,
    p_bilik: room,
    p_session_token: getSessionToken()
  });

  if (controller.signal.aborted) return;

  clearElementChildren(listDiv);

  if (!data || !data.ok) {
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.textContent = 'Ralat memuatkan data.';
    listDiv.appendChild(errorDiv);
    return;
  }

  const bookings = data.data;
  adminState.bookings = bookings;

  if (bookings.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.style.cssText = 'padding:10px;text-align:center';
    emptyDiv.textContent = 'Tiada tempahan akan datang.';
    listDiv.appendChild(emptyDiv);
    return;
  }

  const table = document.createElement('table');
  table.style.cssText = 'width:100%; border-collapse:collapse; font-size:0.85rem;';

  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  trHead.style.cssText = 'background:#f8fafc; text-align:left;';

  const thChk = document.createElement('th');
  thChk.style.cssText = 'padding:8px;width:30px';
  const chkAll = document.createElement('input');
  chkAll.type = 'checkbox';
  chkAll.id = 'chkAllDynamic';
  thChk.appendChild(chkAll);
  trHead.appendChild(thChk);

  ['Tarikh', 'Masa', 'Tujuan', 'Penempah', 'Edit'].forEach((text, i) => {
    const th = document.createElement('th');
    th.style.padding = '8px';
    if (i === 4) th.style.textAlign = 'center';
    th.textContent = text;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  bookings.forEach(b => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #eee';

    const tdChk = document.createElement('td');
    tdChk.style.cssText = 'padding:8px;text-align:center';
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.className = 'chk-item';
    chk.value = b.id;
    tdChk.appendChild(chk);
    tr.appendChild(tdChk);

    const tdTarikh = document.createElement('td');
    tdTarikh.style.padding = '8px';
    tdTarikh.textContent = b.tarikh;
    tr.appendChild(tdTarikh);

    const tdMasa = document.createElement('td');
    tdMasa.style.padding = '8px';
    tdMasa.textContent = `${toHHMM(b.masa_mula)}-${toHHMM(b.masa_tamat)}`;
    tr.appendChild(tdMasa);

    const tdTujuan = document.createElement('td');
    tdTujuan.style.padding = '8px';
    tdTujuan.textContent = b.tujuan;
    tr.appendChild(tdTujuan);

    const tdPenempah = document.createElement('td');
    tdPenempah.style.padding = '8px';
    tdPenempah.textContent = b.nama_penempah;
    tr.appendChild(tdPenempah);

    const tdAction = document.createElement('td');
    tdAction.style.cssText = 'padding:8px;text-align:center';
    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.className = 'btn-edit';
    btnEdit.dataset.id = b.id;
    btnEdit.style.cssText = 'border:none;background:none;cursor:pointer;min-height:36px;';
    btnEdit.textContent = '✏️';
    btnEdit.onclick = () => openEditModal(btnEdit.dataset.id);
    tdAction.appendChild(btnEdit);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  listDiv.appendChild(table);

  const chkAllDynamic = $('chkAllDynamic');
  if (chkAllDynamic) {
    chkAllDynamic.addEventListener('change', (e) => {
      document.querySelectorAll('.chk-item').forEach(c => { c.checked = e.target.checked; });
    });
  }
}

async function executeBulkCancel() {
  const checked = document.querySelectorAll('.chk-item:checked');
  if (checked.length === 0) return toastWarn('Pilih sekurang-kurangnya satu tempahan.');

  const ids = Array.from(checked).map(c => c.value);

  const form = await modalForm(
    'Sebab Pembatalan?',
    [
      {
        name: 'reason',
        type: 'text',
        label: 'Nyatakan Sebab',
        placeholder: 'Cth: Penyelenggaraan Bilik',
        required: true,
        errorMessage: 'Sila nyatakan sebab pembatalan.'
      }
    ],
    'Teruskan',
    'Batal'
  );

  if (!form || !form.reason) return;
  if (!supaClient) return toastErr('Perkhidmatan belum bersedia.');

  const isConfirmed = await modalConfirm(
    'Sahkan Pembatalan Pukal?',
    `Anda akan membatalkan ${ids.length} tempahan terpilih dengan sebab: "${form.reason}".`,
    'Ya, Batalkan Pukal',
    'Batal',
    true
  );

  if (!isConfirmed) return;

  modalLoading('Membatalkan...');
  const { data } = await supaClient.rpc('fn_delete_booking_bulk_secure_v2', {
    p_ids: ids,
    p_email: state.user.email,
    p_reason: form.reason,
    p_session_token: getSessionToken()
  });
  modalClose();

  if (data && data.ok) {
    toastOk(`${data.updated} tempahan dibatalkan.`);
    await clearActiveCaches();
    loadAdminBookingList();
    loadMyBookings(false);
    if (state.room) refreshCalendar(false);
    loadOverview(false);
  } else {
    await modalAlert('Ralat', (data && data.error) || 'Gagal melaksanakan pembatalan pukal.');
  }
}

async function openEditModal(id) {
  const b = adminState.bookings.find(x => x.id === id);
  if (!b) return;

  await openUnifiedBookingEditModal(b, 'Edit Tempahan', id, async () => {
    loadAdminBookingList();
    loadMyBookings(false);
    if (state.room) refreshCalendar(false);
    loadOverview(false);
    const tabAdminSearch = $('tabAdminSearch');
    if (tabAdminSearch && tabAdminSearch.classList.contains('active')) executeAdminSearch();
  });
}

async function executeAdminSearch() {
  const startDateEl = $('adminSearchStartDate');
  const endDateEl = $('adminSearchEndDate');
  const roomEl = $('adminSearchRoom');
  const startDate = startDateEl ? startDateEl.value : '';
  const endDate = endDateEl ? endDateEl.value : '';
  const room = roomEl ? roomEl.value : '';
  const tbody = $('adminSearchTableBody');

  if (!tbody) return;

  if (!startDate || !endDate) {
    return toastWarn('Sila pilih tarikh mula dan akhir');
  }
  if (startDate > endDate) {
    return toastWarn('Tarikh mula mesti sebelum atau sama dengan tarikh akhir');
  }

  if (!supaClient) return;

  if (adminSearchAbortController) {
    adminSearchAbortController.abort();
  }
  const controller = new AbortController();
  adminSearchAbortController = controller;

  clearElementChildren(tbody);

  const loadingTr = document.createElement('tr');
  const loadingTd = document.createElement('td');
  loadingTd.colSpan = 7;
  loadingTd.style.cssText = 'text-align:center;padding:15px';
  loadingTd.textContent = 'Memuatkan...';
  loadingTr.appendChild(loadingTd);
  tbody.appendChild(loadingTr);

  const adminSearchStats = $('adminSearchStats');
  if (adminSearchStats) adminSearchStats.style.display = 'none';

  const btnAdminPrintSearch = $('btnAdminPrintSearch');
  if (btnAdminPrintSearch) btnAdminPrintSearch.style.display = 'none';

  modalLoading('Mencari rekod...');

  let query = supaClient
    .from('v_bookings_active')
    .select('*')
    .gte('tarikh', startDate)
    .lte('tarikh', endDate)
    .order('tarikh', { ascending: true })
    .order('masa_mula', { ascending: true });

  if (room) {
    query = query.eq('bilik', room);
  }

  if (typeof query.abortSignal === 'function') {
    query = query.abortSignal(controller.signal);
  }

  const { data, error } = await query;

  if (controller.signal.aborted) return;

  modalClose();
  clearElementChildren(tbody);

  if (error) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 7;
    td.style.cssText = 'text-align:center;color:red';
    td.textContent = 'Ralat memuatkan carian.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return toastErr('Gagal membuat carian');
  }

  adminState.searchData = data || [];

  populateAdminSearchUserFilter();
  renderAdminSearchTable();
}

function populateAdminSearchUserFilter() {
  const filterEl = $('adminSearchUserFilter');
  if (!filterEl) return;

  clearElementChildren(filterEl);

  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = '— Semua Penempah —';
  filterEl.appendChild(defaultOpt);

  if (!adminState.searchData || adminState.searchData.length === 0) {
    filterEl.disabled = true;
    return;
  }

  const uniqueNames = [...new Set(adminState.searchData.map(b => b.nama_penempah))].sort();

  uniqueNames.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    filterEl.appendChild(opt);
  });

  filterEl.disabled = false;
  filterEl.value = '';
}

function renderAdminSearchTable() {
  const tbody = $('adminSearchTableBody');
  if (!tbody) return;

  let data = adminState.searchData;
  const filterUserEl = $('adminSearchUserFilter');
  const filterUser = filterUserEl ? filterUserEl.value : '';

  if (filterUser) {
    data = data.filter(b => b.nama_penempah === filterUser);
  }

  clearElementChildren(tbody);

  const adminSearchStats = $('adminSearchStats');
  const btnAdminPrintSearch = $('btnAdminPrintSearch');

  if (!data || data.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 7;
    td.style.cssText = 'text-align:center;padding:15px';
    td.textContent = 'Tiada tempahan ditemui untuk kriteria ini.';
    tr.appendChild(td);
    tbody.appendChild(tr);

    if (adminSearchStats) adminSearchStats.style.display = 'none';
    if (btnAdminPrintSearch) btnAdminPrintSearch.style.display = 'none';
    return;
  }

  const totalBookings = data.length;
  const uniqueUsers = new Set(data.map(b => b.nama_penempah)).size;

  const sektorCounts = {};
  data.forEach(b => {
    const sek = b.sektor || 'Tiada Sektor';
    sektorCounts[sek] = (sektorCounts[sek] || 0) + 1;
  });

  let topSektor = '-';
  let maxSektorCount = 0;
  for (const sek in sektorCounts) {
    if (sektorCounts[sek] > maxSektorCount) {
      maxSektorCount = sektorCounts[sek];
      topSektor = `${sek} (${maxSektorCount})`;
    }
  }

  const statTotalBookings = $('statTotalBookings');
  if (statTotalBookings) statTotalBookings.textContent = totalBookings;
  const statUniqueUsers = $('statUniqueUsers');
  if (statUniqueUsers) statUniqueUsers.textContent = uniqueUsers;
  const statTopSektor = $('statTopSektor');
  if (statTopSektor) statTopSektor.textContent = topSektor;
  if (adminSearchStats) adminSearchStats.style.display = 'block';
  if (btnAdminPrintSearch) btnAdminPrintSearch.style.display = 'inline-block';

  const docFrag = document.createDocumentFragment();

  data.forEach(b => {
    const tr = document.createElement('tr');

    const tdTarikh = document.createElement('td');
    tdTarikh.textContent = b.tarikh;
    tr.appendChild(tdTarikh);

    const tdMasa = document.createElement('td');
    tdMasa.style.fontFamily = 'monospace';
    tdMasa.textContent = `${toHHMM(b.masa_mula)}-${toHHMM(b.masa_tamat)}`;
    tr.appendChild(tdMasa);

    const tdBilik = document.createElement('td');
    tdBilik.textContent = b.bilik;
    tr.appendChild(tdBilik);

    const tdTujuan = document.createElement('td');
    tdTujuan.textContent = b.tujuan;
    tr.appendChild(tdTujuan);

    const tdSektor = document.createElement('td');
    tdSektor.textContent = b.sektor || '-';
    tr.appendChild(tdSektor);

    const tdPenempah = document.createElement('td');
    const strongPenempah = document.createElement('strong');
    strongPenempah.textContent = b.nama_penempah;
    tdPenempah.appendChild(strongPenempah);
    tr.appendChild(tdPenempah);

    const tdAction = document.createElement('td');
    tdAction.style.textAlign = 'center';

    const divWrap = document.createElement('div');
    divWrap.style.cssText = 'display:flex; gap:8px; justify-content:center;';

    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.className = 'btn-icon-edit-search';
    btnEdit.dataset.id = b.booking_id;
    btnEdit.title = 'Kemaskini Tempahan';
    btnEdit.textContent = '✏️';
    btnEdit.style.cssText = 'background:none; border:none; cursor:pointer; font-size:1.1rem; min-height:36px;';
    btnEdit.addEventListener('click', () => openAdminSearchEditModal(btnEdit.dataset.id, adminState.searchData));
    divWrap.appendChild(btnEdit);

    const btnDel = document.createElement('button');
    btnDel.type = 'button';
    btnDel.className = 'btn-icon-del-search';
    btnDel.dataset.id = b.booking_id;
    btnDel.title = 'Batal Tempahan';
    btnDel.textContent = '🗑️';
    btnDel.style.cssText = 'background:none; border:none; cursor:pointer; font-size:1.1rem; min-height:36px;';
    btnDel.addEventListener('click', async () => {
      await cancelBooking(btnDel.dataset.id);
    });
    divWrap.appendChild(btnDel);

    tdAction.appendChild(divWrap);
    tr.appendChild(tdAction);

    docFrag.appendChild(tr);
  });

  tbody.appendChild(docFrag);
}

async function openAdminSearchEditModal(id, searchData) {
  const b = searchData.find(x => x.booking_id === id);
  if (!b) return;

  await openUnifiedBookingEditModal(b, 'Edit Tempahan (Admin)', id, async () => {
    executeAdminSearch();
    loadOverview(false);
    loadMyBookings(false);
    if (state.room === b.bilik) refreshCalendar(false);
  });
}
```

`config.js`:

```js
window.ENV_READY = (async function initializeConfig() {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 10000) : null;

  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    };

    if (controller) {
      fetchOptions.signal = controller.signal;
    }

    const response = await fetch('/api/config', fetchOptions);

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const serverMessage = data && typeof data.error === 'string' && data.error.trim()
        ? data.error.trim()
        : `HTTP error fetching config: ${response.status}`;
      throw new Error(serverMessage);
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid configuration payload received.');
    }

    const resolvedConfig = {
      SUPABASE_URL: String(data.SUPABASE_URL || '').trim(),
      SUPABASE_ANON_KEY: String(data.SUPABASE_ANON_KEY || '').trim(),
      GAS_ENDPOINT_URL: String(data.GAS_ENDPOINT_URL || '').trim()
    };

    if (!resolvedConfig.SUPABASE_URL || !resolvedConfig.SUPABASE_ANON_KEY) {
      throw new Error('Missing required SUPABASE_URL or SUPABASE_ANON_KEY configuration.');
    }

    try {
      const parsedUrl = new URL(resolvedConfig.SUPABASE_URL);
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
        throw new Error('Invalid SUPABASE_URL protocol.');
      }
    } catch {
      throw new Error('Invalid SUPABASE_URL format received from configuration.');
    }

    window.__ENV = Object.freeze(resolvedConfig);
    return window.__ENV;
  } catch (err) {
    window.__ENV = Object.freeze({
      SUPABASE_URL: '',
      SUPABASE_ANON_KEY: '',
      GAS_ENDPOINT_URL: ''
    });

    if (err && err.name === 'AbortError') {
      throw new Error('Configuration request timed out.');
    }
    throw err;
  } finally {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  }
})();
```

`deno.json`:

```json
{
  "tasks": {
    "start": "deno run --allow-net --allow-env index.ts"
  },
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": false,
    "checkJs": false,
    "lib": ["deno.window"]
  }
}
```

`functions\api\config.js`:

```js
export async function onRequestGet(context) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };

  try {
    const env = (context && context.env) ? context.env : {};
    const supabaseUrl = String(env.SUPABASE_URL || "").trim();
    const supabaseAnonKey = String(env.SUPABASE_ANON_KEY || "").trim();
    const gasEndpointUrl = String(env.GAS_ENDPOINT_URL || "").trim();

    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Server configuration missing required environment secrets."
        }),
        {
          status: 500,
          headers
        }
      );
    }

    return new Response(
      JSON.stringify({
        SUPABASE_URL: supabaseUrl,
        SUPABASE_ANON_KEY: supabaseAnonKey,
        GAS_ENDPOINT_URL: gasEndpointUrl
      }),
      {
        status: 200,
        headers
      }
    );
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Unexpected edge runtime error while loading configuration."
      }),
      {
        status: 500,
        headers
      }
    );
  }
}
```

`idb-cache.js`:

```js
const DB_NAME = 'erom_db';
const DB_VERSION = 3;
const STORE_NAME = 'cache_store';

let dbInstance = null;
let openPromise = null;

if (typeof window !== 'undefined' && !(window.__memoryCache instanceof Map)) {
  window.__memoryCache = new Map();
}

function isValidCacheRecord(item) {
  return Boolean(
    item &&
    typeof item === 'object' &&
    typeof item.cache_key === 'string' &&
    typeof item.timestamp === 'number' &&
    typeof item.ttl === 'number' &&
    Object.prototype.hasOwnProperty.call(item, 'data')
  );
}

function getMemoryEntry(key) {
  if (typeof window === 'undefined' || !(window.__memoryCache instanceof Map) || !window.__memoryCache.has(key)) {
    return null;
  }
  const item = window.__memoryCache.get(key);
  if (!isValidCacheRecord(item)) {
    window.__memoryCache.delete(key);
    return null;
  }
  const age = Date.now() - item.timestamp;
  return {
    data: item.data,
    isStale: age > (item.ttl || 0),
    timestamp: item.timestamp
  };
}

export function openDB() {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  if (openPromise) {
    return openPromise;
  }

  openPromise = new Promise((resolve) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      openPromise = null;
      return resolve(null);
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (db.objectStoreNames.contains(STORE_NAME)) {
          db.deleteObjectStore(STORE_NAME);
        }
        db.createObjectStore(STORE_NAME, { keyPath: 'cache_key' });
      };

      request.onsuccess = (event) => {
        dbInstance = event.target.result;
        dbInstance.onversionchange = () => {
          dbInstance.close();
          dbInstance = null;
        };
        dbInstance.onclose = () => {
          dbInstance = null;
        };
        dbInstance.onerror = () => {
          dbInstance = null;
        };
        openPromise = null;
        resolve(dbInstance);
      };

      request.onerror = () => {
        openPromise = null;
        resolve(null);
      };

      request.onblocked = () => {
        openPromise = null;
        resolve(null);
      };
    } catch {
      openPromise = null;
      resolve(null);
    }
  });

  return openPromise;
}

export async function setCache(key, data, ttlSeconds = 300) {
  const timestamp = Date.now();
  const ttl = Math.max(0, Number(ttlSeconds) || 0) * 1000;
  const record = {
    cache_key: String(key),
    data: data,
    timestamp: timestamp,
    ttl: ttl
  };

  const db = await openDB();
  if (!db) {
    if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
      window.__memoryCache.set(record.cache_key, record);
      return true;
    }
    return false;
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      if (ok) {
        if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
          window.__memoryCache.delete(record.cache_key);
        }
      } else if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
        window.__memoryCache.set(record.cache_key, record);
      }
      resolve(ok);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);

      tx.oncomplete = () => finish(true);
      tx.onerror = () => finish(false);
      tx.onabort = () => finish(false);
      req.onerror = () => finish(false);
    } catch {
      dbInstance = null;
      finish(false);
    }
  });
}

export async function getCacheEntry(key) {
  const normalizedKey = String(key);
  const db = await openDB();
  if (!db) {
    return getMemoryEntry(normalizedKey);
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = (val) => {
      if (settled) return;
      settled = true;
      resolve(val);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(normalizedKey);

      req.onsuccess = () => {
        const item = req.result;
        if (!item) {
          return finish(getMemoryEntry(normalizedKey));
        }

        if (!isValidCacheRecord(item)) {
          deleteCache(normalizedKey).catch(() => {});
          return finish(null);
        }

        const age = Date.now() - item.timestamp;
        finish({
          data: item.data,
          isStale: age > (item.ttl || 0),
          timestamp: item.timestamp
        });
      };

      req.onerror = () => finish(getMemoryEntry(normalizedKey));
      tx.onerror = () => finish(getMemoryEntry(normalizedKey));
      tx.onabort = () => finish(getMemoryEntry(normalizedKey));
    } catch {
      dbInstance = null;
      finish(getMemoryEntry(normalizedKey));
    }
  });
}

export async function getCache(key) {
  const entry = await getCacheEntry(key);
  if (!entry || entry.isStale) return null;
  return entry.data;
}

export async function deleteCache(key) {
  const normalizedKey = String(key);
  if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
    window.__memoryCache.delete(normalizedKey);
  }

  const db = await openDB();
  if (!db) return true;

  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(normalizedKey);

      tx.oncomplete = () => finish(true);
      tx.onerror = () => finish(false);
      tx.onabort = () => finish(false);
      req.onerror = () => finish(false);
    } catch {
      dbInstance = null;
      finish(false);
    }
  });
}

export async function deleteCacheByPrefix(prefix) {
  if (prefix === undefined || prefix === null) return 0;
  const normalizedPrefix = String(prefix);
  if (!normalizedPrefix) return 0;

  let memoryDeleted = 0;

  if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
    for (const k of window.__memoryCache.keys()) {
      if (typeof k === 'string' && k.startsWith(normalizedPrefix)) {
        window.__memoryCache.delete(k);
        memoryDeleted++;
      }
    }
  }

  const db = await openDB();
  if (!db) return memoryDeleted;

  return new Promise((resolve) => {
    let settled = false;
    let deletedCount = 0;
    const finish = (count) => {
      if (settled) return;
      settled = true;
      resolve(count);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          if (typeof cursor.key === 'string' && cursor.key.startsWith(normalizedPrefix)) {
            cursor.delete();
            deletedCount++;
          }
          cursor.continue();
        }
      };

      tx.oncomplete = () => finish(deletedCount + memoryDeleted);
      tx.onerror = () => finish(memoryDeleted);
      tx.onabort = () => finish(memoryDeleted);
      req.onerror = () => finish(memoryDeleted);
    } catch {
      dbInstance = null;
      finish(memoryDeleted);
    }
  });
}

export async function clearExpiredCache() {
  const now = Date.now();
  let purgedMemory = 0;

  if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
    for (const [k, v] of window.__memoryCache.entries()) {
      if (!isValidCacheRecord(v) || (typeof v.ttl === 'number' && now - v.timestamp > v.ttl)) {
        window.__memoryCache.delete(k);
        purgedMemory++;
      }
    }
  }

  const db = await openDB();
  if (!db) return purgedMemory;

  return new Promise((resolve) => {
    let settled = false;
    let purgedCount = 0;
    const finish = (count) => {
      if (settled) return;
      settled = true;
      resolve(count);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const item = cursor.value;
          if (!isValidCacheRecord(item) || (typeof item.ttl === 'number' && now - item.timestamp > item.ttl)) {
            cursor.delete();
            purgedCount++;
          }
          cursor.continue();
        }
      };

      tx.oncomplete = () => finish(purgedCount + purgedMemory);
      tx.onerror = () => finish(purgedMemory);
      tx.onabort = () => finish(purgedMemory);
      req.onerror = () => finish(purgedMemory);
    } catch {
      dbInstance = null;
      finish(purgedMemory);
    }
  });
}

export async function clearAllCache() {
  if (typeof window !== 'undefined' && window.__memoryCache instanceof Map) {
    window.__memoryCache.clear();
  }

  const db = await openDB();
  if (!db) return true;

  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();

      tx.oncomplete = () => finish(true);
      tx.onerror = () => finish(false);
      tx.onabort = () => finish(false);
      req.onerror = () => finish(false);
    } catch {
      dbInstance = null;
      finish(false);
    }
  });
}
```

`index.html`:

```html
<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#1e3a8a">

  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="eROM@AG">
  <link rel="apple-touch-icon" href="assets/img/logo-kpm.png">

  <title>eROM@AG — Sistem Pengurusan Tempahan Bilik PPD Alor Gajah</title>

  <link rel="icon" href="assets/img/logo-kpm.png" type="image/png" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&display=swap" rel="stylesheet">

  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="./config.js?v=20261112"></script>

  <link rel="stylesheet" href="./assets/css/style.css?v=20261112">
</head>
<body>
  <main class="wrap min-h-dvh">
    <header>
      <h1>
        <div class="header-flex-container">
          <div class="header-title-group">
            <img src="assets/img/logo-kpm.png" alt="Logo KPM" class="header-logo">
            <span>eROM@AG — Sistem Pengurusan Tempahan Bilik PPD Alor Gajah</span>
          </div>

          <div class="auth-controls">
            <button id="mainLoginBtn" class="btn-login" type="button">LOG MASUK</button>
            <div id="userProfileBadge" class="user-badge" role="button" tabindex="0" aria-label="Profil Pengguna">
              <span id="userRoleTag" class="user-role">USER</span>
              <span id="userDisplayName">Nama</span>
            </div>
          </div>
        </div>
      </h1>
    </header>

    <nav class="tabs" aria-label="Navigasi Utama">
      <button id="tabTempahanBtn" class="tabbtn active" type="button">Tempahan</button>
      <button id="tabKalendarBtn" class="tabbtn" type="button">Rumusan Tempahan</button>
      <button id="tabTempahanSayaBtn" class="tabbtn" type="button" style="display:none">Tempahan Saya</button>
      <button id="tabAdminBtn" class="tabbtn" type="button" style="display:none">Pentadbir</button>
      <button id="tabAdminSearchBtn" class="tabbtn" type="button" style="display:none">Carian Tempahan</button>
    </nav>

    <section id="tabTempahan" class="tabpane active" aria-labelledby="tabTempahanBtn">
      <div class="card toolbar">
        <div class="min-w-0">
          <label class="small req" for="roomSelect">Pilih Bilik</label><br>
          <select id="roomSelect" required>
            <option value="">Sila Pilih Bilik</option>
          </select>
        </div>

        <div class="monthnav" style="justify-self:end">
          <button class="btn ghost" id="btnPrev" type="button">&lt; Bulan Sebelum</button>
          <div class="small" id="monthLabel" style="min-width:160px;text-align:center;font-weight:600;color:#111827"></div>
          <button class="btn ghost" id="btnNext" type="button">Bulan Seterusnya &gt;</button>
        </div>

        <div style="text-align:right">
          <button class="btn secondary" id="btnRefresh" type="button">Segar Semula</button>
        </div>
      </div>

      <div class="card">
        <div class="legend">
          <span class="dot green"></span><span class="small">Tiada tempahan</span>
          <span class="dot orange"></span><span class="small">Separa Penuh</span>
          <span class="dot red"></span><span class="small">Penuh</span>
          <span class="dot disabled"></span><span class="small">Hujung Minggu / Tarikh Lampau</span>
        </div>

        <div class="calendar">
          <div class="weekday">
            <div>Isn</div><div>Sel</div><div>Rab</div><div>Kha</div><div>Jum</div><div>Sab</div><div>Aha</div>
          </div>
          <div class="grid" id="grid"></div>
        </div>

        <div class="small" id="noRoomHint" style="display:none;margin-top:6px">
          Sila pilih bilik untuk melihat kalendar tempahan.
        </div>
      </div>

      <div class="card" style="margin-top:10px">
        <div id="loginWarning" style="background:#fffbeb; color:#b45309; padding:12px; border-radius:10px; margin-bottom:16px; font-size:0.95rem; display:block; border:1px solid #fcd34d;">
          ⚠️ Sila <strong>Log Masuk</strong> untuk membuat tempahan baharu.
        </div>

        <div class="row" style="justify-content:space-between">
          <div class="switch" title="Tempahan berturut">
            <button id="toggleRangeOff" class="active" type="button">1 Hari</button>
            <button id="toggleRangeOn" type="button">Berturut</button>
          </div>
          <div id="rangeCounter" class="counter" style="display:none">
            Akan ditempah: 0 hari bekerja
          </div>
        </div>

        <div id="bookingFormContainer" class="row" style="margin-top:10px; gap:10px; flex-wrap:wrap">
          <div class="min-w-0">
            <label class="small req" for="pickedDate">Tarikh Dipilih</label><br>
            <input id="pickedDate" type="date" required>
          </div>

          <div id="fromDateWrap" class="min-w-0" style="display:none">
            <label class="small req" for="fromDate">Tarikh Dari</label><br>
            <input id="fromDate" type="date">
          </div>

          <div id="toDateWrap" class="min-w-0" style="display:none">
            <label class="small req" for="toDate">Tarikh Hingga</label><br>
            <input id="toDate" type="date">
          </div>

          <div class="min-w-0">
            <label class="small req" for="startTime">Masa Mula (≥ 08:00)</label><br>
            <input id="startTime" type="time" min="08:00" max="17:00" step="1800" required>
          </div>

          <div class="min-w-0">
            <label class="small req" for="endTime">Masa Tamat (≤ 17:00)</label><br>
            <input id="endTime" type="time" min="08:00" max="17:00" step="1800" required>
          </div>

          <div class="min-w-0">
            <label class="small req" for="category">Kategori</label><br>
            <select id="category" required></select>
          </div>

          <div class="min-w-0" style="min-width:260px;flex:1">
            <label class="small req" for="note">Tujuan / Ringkasan</label><br>
            <input
              id="note"
              type="text"
              placeholder="Contoh: Taklimat SPI Bil."
              required
              minlength="3"
              maxlength="200"
            >
          </div>

          <div class="min-w-0">
            <label class="small req" for="sektor">Sektor</label><br>
            <select id="sektor" required></select>
          </div>

          <div class="min-w-0">
            <label class="small req" for="nama">Nama Penempah</label><br>
            <select id="nama" required disabled>
              <option value="">— Sila pilih sektor dahulu —</option>
            </select>
          </div>

          <div style="align-self:end">
            <button class="btn" id="btnBook" type="button" disabled style="display:none">Rekod Tempahan</button>
          </div>
        </div>

        <div class="small" style="margin-top:8px">
          Waktu operasi: Isnin–Jumaat, 08:00–17:00. Tempahan hujung minggu dan tarikh lampau tidak dibenarkan.
        </div>
      </div>
    </section>

    <section id="tabKalendar" class="tabpane" aria-labelledby="tabKalendarBtn">
      <div class="card toolbar">
        <div class="min-w-0">
          <div class="small" style="font-weight:600">Rumusan Semua Bilik (Read-only)</div>
          <div style="margin-top:4px;">
            <label class="small" for="ovRoomFilter">Tapis Bilik:</label>
            <select id="ovRoomFilter" style="padding:4px 8px; font-size:0.9rem; border-radius:8px;">
              <option value="">— Semua Bilik —</option>
            </select>
          </div>
          <div id="ovUserFilterWrap" style="margin-top:8px; display:none;">
            <label class="small" for="ovUserFilter">Tapis Penempah:</label>
            <select id="ovUserFilter" style="padding:4px 8px; font-size:0.9rem; border-radius:8px;">
              <option value="">— Semua Penempah —</option>
            </select>
          </div>
        </div>

        <div class="monthnav" style="justify-self:end">
          <button class="btn ghost" id="ovPrev" type="button">&lt; Bulan Sebelum</button>
          <div class="small" id="ovMonthLabel" style="min-width:160px;text-align:center;font-weight:600;color:#111827"></div>
          <button class="btn ghost" id="ovNext" type="button">Bulan Seterusnya &gt;</button>
        </div>

        <div class="switch">
          <button id="btnViewCalendar" class="active" type="button">Kalendar</button>
          <button id="btnViewTable" type="button">Jadual</button>
        </div>
      </div>

      <div class="card">
        <div class="legend">
          <span class="dot red"></span><span class="small">Merah = Penuh</span>
          <span class="dot orange"></span><span class="small">Jingga = Separa Penuh</span>
          <span class="small" style="margin-left:auto">Bilik tanpa tempahan tidak dipaparkan</span>
        </div>

        <div id="ovCalendarWrap">
          <div class="calendar">
            <div class="weekday">
              <div>Isn</div><div>Sel</div><div>Rab</div><div>Kha</div><div>Jum</div><div>Sab</div><div>Aha</div>
            </div>
            <div class="grid" id="ovGrid"></div>
          </div>

          <div id="ovSummaryWrap" style="display:none">
            <div id="ovSummaryList" class="small"></div>
          </div>
        </div>

        <div id="ovTableWrap" class="table-responsive overflow-x-auto" style="display:none">
          <table>
            <thead>
              <tr>
                <th style="width:120px">Tarikh</th>
                <th style="width:110px">Masa</th>
                <th>Bilik</th>
                <th>Tujuan</th>
                <th style="width:200px">Penempah</th>
                <th style="width:80px; text-align:center;">Tindakan</th>
              </tr>
            </thead>
            <tbody id="ovTableBody"></tbody>
          </table>
        </div>
      </div>
    </section>

    <section id="tabTempahanSaya" class="tabpane" aria-labelledby="tabTempahanSayaBtn">
      <div class="card toolbar">
        <div class="min-w-0">
          <div class="small" style="font-weight:600; font-size:1rem; color:var(--primary);">Senarai Tempahan Saya</div>
          <div style="margin-top:4px;" class="small">Urus, kemaskini atau batal tempahan yang anda lakukan di sini.</div>
        </div>
        <div style="text-align:right">
          <button class="btn secondary" id="btnRefreshMyBookings" type="button">Segar Semula</button>
        </div>
      </div>

      <div class="card">
        <div class="table-responsive overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th style="width:120px">Tarikh</th>
                <th style="width:110px">Masa</th>
                <th>Bilik</th>
                <th>Tujuan</th>
                <th style="width:100px; text-align:center;">Tindakan</th>
              </tr>
            </thead>
            <tbody id="myBookingsTableBody">
              <tr><td colspan="5" style="text-align:center; padding:15px">Sila tunggu sebentar...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section id="tabAdmin" class="tabpane" aria-labelledby="tabAdminBtn">
      <div class="card">
        <div id="adminLoginBox" style="display:block; text-align:center; padding:40px;">
          <h3>Akses Pentadbir</h3>
          <p class="small">Sila log masuk menggunakan butang di atas sebagai Admin untuk mengakses panel ini.</p>
        </div>

        <div id="adminPanel" style="display:none;">
          <div class="row" style="justify-content:space-between; margin-bottom:20px;">
            <div style="font-weight:600; font-size:1.2rem; color:var(--primary);">Panel Pentadbir</div>
            <div class="small">Status: <span style="color:var(--ok); font-weight:bold;">AKTIF</span></div>
          </div>

          <div class="admin-user-section">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <label class="small" style="font-size:0.9rem; margin:0;">Pengurusan Pengguna</label>
              <div style="display:flex; gap:8px;">
                <button class="btn ok" id="adminAddUserBtn" type="button" style="padding:6px 12px; font-size:0.8rem;">+ Tambah Pegawai</button>
                <button class="btn secondary" id="adminRefreshUsers" type="button" style="padding:6px 12px; font-size:0.8rem;">Muat Semula</button>
              </div>
            </div>
            <div class="scrollable-table overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Sektor</th>
                    <th>Email</th>
                    <th style="text-align:center;">Tindakan</th>
                  </tr>
                </thead>
                <tbody id="adminUserListBody">
                  <tr><td colspan="4" style="text-align:center; padding:20px;">Sila klik 'Muat Semula' untuk paparkan data.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <label class="small" style="font-size:0.9rem;">Pengurusan Tempahan Bilik</label>
            <div class="row" style="margin-top:8px; gap:12px; align-items:end;">
              <div class="min-w-0" style="flex:1;">
                <label class="small" for="adminRoom">Pilih Bilik (Admin)</label><br>
                <select id="adminRoom" style="width:100%;">
                  <option value="">Sila Pilih Bilik</option>
                </select>
              </div>

              <div style="display:flex; gap:8px">
                <button class="btn ghost" id="btnAdminLoad" type="button">Muat Senarai</button>
                <button class="btn" id="btnBulkCancel" type="button" style="background:var(--bad); color:#fff;">Batalkan Terpilih</button>
              </div>
            </div>

            <div id="adminList" class="table-responsive overflow-x-auto" style="margin-top:16px;"></div>
          </div>

          <div class="admin-migration-section">
            <label class="small" style="font-size:0.9rem;">Sandaran &amp; Pemulihan Data 1-to-1 (JSON)</label>
            <div class="small" style="margin-top:4px;">
              Eksport keseluruhan pangkalan data ke satu fail <code>.json</code> atau pulihkan data 1-to-1 mengikut susunan jadual sistem.
            </div>

            <div class="migration-controls">
              <div>
                <button class="btn secondary" id="btnExportJson" type="button">Muat Turun Sandaran (.json)</button>
              </div>

              <div class="migration-file-group min-w-0">
                <label class="small" for="importJsonFile">Pilih Fail Sandaran (.json)</label><br>
                <input id="importJsonFile" class="migration-file-input" type="file" accept=".json,application/json">
              </div>

              <div>
                <button class="btn ok" id="btnImportJson" type="button">Import &amp; Pulihkan (.json)</button>
              </div>
            </div>

            <div id="migrationStatusArea" class="migration-status-area" aria-live="polite"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="tabAdminSearch" class="tabpane" aria-labelledby="tabAdminSearchBtn">
      <div class="card toolbar" id="adminSearchToolbar">
        <div style="display:flex; justify-content:space-between; align-items:center; width: 100%;">
          <div class="min-w-0">
            <div class="small" style="font-weight:600; font-size:1rem; color:var(--primary);">Carian Keseluruhan Tempahan (Admin)</div>
            <div style="margin-top:4px;" class="small">Tapis tempahan berdasarkan julat tarikh, bilik dan penempah.</div>
          </div>
          <button class="btn secondary" id="btnAdminPrintSearch" type="button" style="display:none;">Cetak Laporan</button>
        </div>
      </div>

      <div class="card">
        <div class="row" id="adminSearchFilterForm" style="margin-bottom:16px; align-items:end; gap:12px;">
          <div class="min-w-0">
            <label class="small" for="adminSearchStartDate">Tarikh Mula</label><br>
            <input type="date" id="adminSearchStartDate" required>
          </div>
          <div class="min-w-0">
            <label class="small" for="adminSearchEndDate">Tarikh Akhir</label><br>
            <input type="date" id="adminSearchEndDate" required>
          </div>
          <div class="min-w-0" style="flex:1;">
            <label class="small" for="adminSearchRoom">Pilih Bilik</label><br>
            <select id="adminSearchRoom" style="width:100%;">
              <option value="">Semua Bilik</option>
            </select>
          </div>
          <div class="min-w-0" style="flex:1;">
            <label class="small" for="adminSearchUserFilter">Tapis Penempah (Selepas Carian)</label><br>
            <select id="adminSearchUserFilter" style="width:100%;" disabled>
              <option value="">— Semua Penempah —</option>
            </select>
          </div>
          <div>
            <button class="btn" id="btnAdminExecuteSearch" type="button">Cari Tempahan</button>
          </div>
        </div>

        <div id="adminSearchStats" style="display:none; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:15px; margin-bottom:16px;">
          <div class="row" style="gap:20px;">
            <div><span class="small">Jumlah Tempahan:</span> <strong id="statTotalBookings">0</strong></div>
            <div><span class="small">Jumlah Pegawai (Unik):</span> <strong id="statUniqueUsers">0</strong></div>
            <div><span class="small">Sektor Terbanyak:</span> <strong id="statTopSektor">-</strong></div>
          </div>
        </div>

        <div class="table-responsive overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th style="width:110px">Tarikh</th>
                <th style="width:100px">Masa</th>
                <th>Bilik</th>
                <th>Tujuan</th>
                <th>Sektor</th>
                <th style="width:180px">Penempah</th>
                <th style="width:80px; text-align:center;">Tindakan</th>
              </tr>
            </thead>
            <tbody id="adminSearchTableBody">
              <tr><td colspan="7" style="text-align:center; padding:15px">Sila masukkan tarikh mula dan akhir, kemudian klik Cari Tempahan.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>

  <script type="module" src="./assets/js/app.js?v=20261112"></script>
</body>
</html>
```

`index.ts`:

```ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const CHANNEL_ID = Deno.env.get("EROM_CHANNEL_ID") ?? "";
const APP_URL = "https://erom.tech4ag.my";
const CH_URL = Deno.env.get("EROM_CHANNEL_URL") ?? "";

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const ROOM_OPTIONS = [
  "PKG Melekek - Bilik Kuliah (25 orang)",
  "PKG Melekek - Bilik Mesyuarat (25 orang)",
  "PKG Masjid Tanah - Bilik Seri Cempaka (24 orang)",
  "PKG Masjid Tanah - Bilik Seri Melur (18 orang)",
  "PKG Masjid Tanah - Bilik Pendidikan Digital (12 orang)",
  "Bilik Mesyuarat PPDAG di SK Alor Gajah 1 (40 orang)",
  "Bilik Mesyuarat Utama PPDAG (73 orang)",
  "Bilik Perbincangan PPDAG (15 orang)",
  "Makmal Komputer PPDAG (31 orang)",
  "Bilik Seminar PPDAG (22 orang)",
  "Bilik Temuduga PPDAG (4 orang)",
  "Bilik Runding Cara PPDAG (4 orang)",
  "Kafeteria PPDAG (30 orang)"
];

const BM_MONTHS = [
  "Januari",
  "Februari",
  "Mac",
  "April",
  "Mei",
  "Jun",
  "Julai",
  "Ogos",
  "September",
  "Oktober",
  "November",
  "Disember"
];

interface BookingRecord {
  id?: string;
  bilik: string;
  tarikh: string;
  masa_mula: string;
  masa_tamat: string;
  kategori?: string;
  tujuan: string;
  sektor: string;
  nama_penempah: string;
  status?: string;
}

interface BufferedWebhook {
  type: string;
  records: BookingRecord[];
  timerId: number;
}

const webhookBuffer = new Map<string, BufferedWebhook>();

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>]/g, (ch) => {
    if (ch === "&") return "&amp;";
    if (ch === "<") return "&lt;";
    if (ch === ">") return "&gt;";
    return ch;
  });
}

async function tgCall(method: string, payload: Record<string, unknown>) {
  if (!BOT_TOKEN) return null;
  try {
    const res = await fetch(`${TELEGRAM_API}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch {
    return null;
  }
}

async function sendMessage(chatId: number | string, text: string, extra: Record<string, unknown> = {}) {
  await tgCall("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...extra
  });
}

async function answerCallback(id: string, text = "") {
  await tgCall("answerCallbackQuery", { callback_query_id: id, text });
}

async function editMarkup(chatId: number | string, messageId: number) {
  await tgCall("editMessageReplyMarkup", {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: { inline_keyboard: [] }
  });
}

function startKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Pengguna (Info)", callback_data: "role:user" }],
      [{ text: "PIC Bilik (Daftar)", callback_data: "role:pic" }]
    ]
  };
}

function closeKeyboard() {
  return {
    inline_keyboard: [[{ text: "Tutup", callback_data: "close" }]]
  };
}

function roomsKeyboard(rooms: string[]) {
  const rows = rooms.map((r) => [{ text: r, callback_data: `pick:${r.substring(0, 50)}` }]);
  rows.push([{ text: "Tutup", callback_data: "close" }]);
  return { inline_keyboard: rows };
}

async function getTakenRooms(): Promise<Set<string>> {
  const { data, error } = await supabase.from("erom_pic").select("bilik");
  if (error || !data) return new Set();
  return new Set(data.map((r: { bilik: string }) => r.bilik));
}

async function assignRoom(telegramId: number, username: string | undefined, roomPart: string) {
  const fullRoomName = ROOM_OPTIONS.find((r) => r.startsWith(roomPart));
  if (!fullRoomName) return { ok: false, reason: "Bilik tidak ditemui dalam sistem." };

  const { data: existing, error: errExist } = await supabase
    .from("erom_pic")
    .select("bilik")
    .eq("bilik", fullRoomName)
    .limit(1);

  if (errExist) return { ok: false, reason: errExist.message };
  if (existing && existing.length > 0) return { ok: false, reason: "Maaf, bilik ini sudah mempunyai PIC." };

  const { error } = await supabase.from("erom_pic").insert([
    {
      telegram_id: telegramId,
      telegram_username: username ?? null,
      bilik: fullRoomName,
      is_pic: true
    }
  ]);

  if (error) return { ok: false, reason: error.message };
  return { ok: true, roomName: fullRoomName };
}

async function listMyRooms(telegramId: number): Promise<string[]> {
  const { data, error } = await supabase
    .from("erom_pic")
    .select("bilik")
    .eq("telegram_id", telegramId);

  if (error || !data) return [];
  return data.map((r: { bilik: string }) => r.bilik);
}

function parseTarikh(ymd: string) {
  const [y, m, d] = String(ymd || "").split("-");
  return {
    year: parseInt(y, 10),
    month: parseInt(m, 10) - 1,
    day: parseInt(d, 10)
  };
}

function formatTarikhBM(tarikhArray: string[]): string {
  if (!tarikhArray || tarikhArray.length === 0) return "Tiada Tarikh";
  if (tarikhArray.length === 1) {
    const t = parseTarikh(tarikhArray[0]);
    return `${t.day} ${BM_MONTHS[t.month]} ${t.year}`;
  }

  const sorted = [...tarikhArray].sort((a, b) => a.localeCompare(b));
  const first = parseTarikh(sorted[0]);
  const last = parseTarikh(sorted[sorted.length - 1]);

  if (first.year !== last.year) {
    return `${first.day} ${BM_MONTHS[first.month]} ${first.year} - ${last.day} ${BM_MONTHS[last.month]} ${last.year}`;
  }
  if (first.month !== last.month) {
    return `${first.day} ${BM_MONTHS[first.month]} - ${last.day} ${BM_MONTHS[last.month]} ${first.year}`;
  }
  return `${first.day} - ${last.day} ${BM_MONTHS[first.month]} ${first.year}`;
}

function processWebhookToBuffer(payload: { type: string; record: BookingRecord }) {
  const record = payload.record;
  const type = payload.type;

  const isInsert = type === "INSERT";
  const isCancel = type === "UPDATE" && record.status === "DIBATALKAN";

  if (!isInsert && !isCancel) {
    sendBookingNotification([record], type, false);
    return;
  }

  const actionPrefix = isCancel ? "CANCEL" : "NEW";
  const groupKey = `${actionPrefix}|${record.bilik}|${record.masa_mula}|${record.masa_tamat}|${record.tujuan}|${record.nama_penempah}`;

  if (webhookBuffer.has(groupKey)) {
    const buffered = webhookBuffer.get(groupKey)!;
    buffered.records.push(record);
    clearTimeout(buffered.timerId);
    buffered.timerId = setTimeout(() => flushBuffer(groupKey), 2500);
  } else {
    const timerId = setTimeout(() => flushBuffer(groupKey), 2500);
    webhookBuffer.set(groupKey, { type, records: [record], timerId });
  }
}

async function flushBuffer(groupKey: string) {
  const buffered = webhookBuffer.get(groupKey);
  if (!buffered) return;
  webhookBuffer.delete(groupKey);

  buffered.records.sort((a, b) => String(a.tarikh || "").localeCompare(String(b.tarikh || "")));
  await sendBookingNotification(buffered.records, buffered.type, buffered.records.length > 1);
}

async function sendBookingNotification(records: BookingRecord[], eventType: string, isGrouped: boolean) {
  if (!CHANNEL_ID || !records || records.length === 0) return;

  const record = records[0];

  let title = "📢 TEMPAHAN BARU";
  let statusEmoji = "🟢";

  if (eventType === "UPDATE") {
    if (record.status === "DIBATALKAN") {
      title = "❌ TEMPAHAN DIBATALKAN";
      statusEmoji = "🔴";
    } else {
      title = "✏️ TEMPAHAN DIKEMASKINI";
      statusEmoji = "🟡";
    }
  }

  if (isGrouped && eventType === "INSERT") title = "📢 TEMPAHAN BERTURUT";
  if (isGrouped && record.status === "DIBATALKAN") title = "❌ PEMBATALAN PUKAL";

  let picUsername = "Tiada PIC";
  let picId: number | string | null = null;

  const { data: picData } = await supabase
    .from("erom_pic")
    .select("telegram_username, telegram_id")
    .eq("bilik", record.bilik)
    .maybeSingle();

  if (picData) {
    if (picData.telegram_username) picUsername = `@${picData.telegram_username}`;
    if (picData.telegram_id) picId = picData.telegram_id;
  }

  const arrTarikh = records.map((r) => r.tarikh);
  const strTarikh = formatTarikhBM(arrTarikh);
  const hariBekerjaText = isGrouped ? ` <i>(${records.length} hari bekerja)</i>` : "";
  const masaMula = escapeHtml(String(record.masa_mula || "").slice(0, 5));
  const masaTamat = escapeHtml(String(record.masa_tamat || "").slice(0, 5));

  const msg = `
<b>${title}</b> ${statusEmoji}

🏛 <b>Bilik:</b> ${escapeHtml(record.bilik)}
📅 <b>Tarikh:</b> ${escapeHtml(strTarikh)}${hariBekerjaText}
⏰ <b>Masa:</b> ${masaMula} - ${masaTamat}
📝 <b>Tujuan:</b> ${escapeHtml(record.tujuan)}
👤 <b>Penempah:</b> ${escapeHtml(record.nama_penempah)}
🏢 <b>Sektor:</b> ${escapeHtml(record.sektor)}
👮 <b>PIC Bilik:</b> ${escapeHtml(picUsername)}

<i>Sila layari <a href="${APP_URL}">eROM Web</a> untuk maklumat lanjut.</i>
`;

  await sendMessage(CHANNEL_ID, msg);

  if (picId) {
    const privateMsg = `🔔 <b>Notifikasi PIC</b>\n\nSatu aktiviti telah berlaku pada bilik jagaan anda:\n${msg}\n\n<i>Sila pantau tempahan ini.</i>`;
    await sendMessage(picId, privateMsg);
  }
}

async function handleStart(chatId: number) {
  await sendMessage(chatId, "<b>eROM@AG Bot</b>\nSelamat datang. Sila pilih peranan anda:", {
    reply_markup: startKeyboard()
  });
}

async function handleUserInfo(chatId: number) {
  const text = `ℹ️ <b>Info Sistem</b>\n\n• Aplikasi Web: ${escapeHtml(APP_URL)}\n• Saluran Notifikasi: ${escapeHtml(CH_URL)}`;
  await sendMessage(chatId, text, {
    reply_markup: closeKeyboard()
  });
}

async function handleAvailableRooms(chatId: number) {
  const taken = await getTakenRooms();
  const available = ROOM_OPTIONS.filter((r) => !taken.has(r));

  if (available.length === 0) {
    await sendMessage(chatId, "Semua bilik sudah mempunyai PIC.", {
      reply_markup: closeKeyboard()
    });
  } else {
    await sendMessage(chatId, "Sila pilih bilik untuk didaftarkan sebagai PIC:", {
      reply_markup: roomsKeyboard(available)
    });
  }
}

async function handlePickRoom(cb: {
  id: string;
  data: string;
  from: { id: number; username?: string };
  message: { chat: { id: number }; message_id: number };
}) {
  const chatId = cb.message.chat.id;
  const messageId = cb.message.message_id;
  const user = cb.from;
  const roomPart = cb.data.slice("pick:".length);

  const res = await assignRoom(user.id, user.username, roomPart);

  if (res.ok && res.roomName) {
    await answerCallback(cb.id, "Berjaya didaftarkan!");
    await editMarkup(chatId, messageId);

    const mine = await listMyRooms(user.id);
    const listText = mine.map((x) => `• ${escapeHtml(x)}`).join("\n");
    const text = `✅ <b>Pendaftaran Berjaya</b>\n\nAnda kini PIC untuk:\n<b>${escapeHtml(res.roomName)}</b>\n\nSenarai bilik anda:\n${listText}`;

    await sendMessage(chatId, text, { reply_markup: closeKeyboard() });
  } else {
    await answerCallback(cb.id, res.reason ?? "Gagal.");
  }
}

async function handleStatus(msg: { chat: { id: number }; from: { id: number } }) {
  const chatId = msg.chat.id;
  const mine = await listMyRooms(msg.from.id);

  if (mine.length === 0) {
    await sendMessage(chatId, "Anda belum mendaftar sebagai PIC mana-mana bilik.", {
      reply_markup: closeKeyboard()
    });
  } else {
    const listText = mine.map((x) => `• ${escapeHtml(x)}`).join("\n");
    const text = `📋 <b>Status PIC</b>\n\nBilik di bawah kendalian anda:\n${listText}`;
    await sendMessage(chatId, text, {
      reply_markup: closeKeyboard()
    });
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Bot Active (Root)");

  try {
    const payload = await req.json();
    if (!payload || typeof payload !== "object") {
      return new Response("Invalid Payload", { status: 400 });
    }

    if ((payload.type === "INSERT" || payload.type === "UPDATE") && payload.table === "erom_bookings" && payload.record) {
      processWebhookToBuffer(payload);
      return new Response("Notified - Buffer processing started");
    }

    if (payload.message) {
      const msg = payload.message;
      const chatId = msg.chat.id;
      const text = msg.text ?? "";

      if (text.startsWith("/start")) {
        await handleStart(chatId);
      } else if (text.startsWith("/bilik")) {
        await handleAvailableRooms(chatId);
      } else if (text.startsWith("/status")) {
        await handleStatus(msg);
      } else {
        await handleStart(chatId);
      }
      return new Response("OK");
    }

    if (payload.callback_query) {
      const cb = payload.callback_query;
      const data = cb.data ?? "";
      const chatId = cb.message.chat.id;

      if (data === "role:user") {
        await answerCallback(cb.id);
        await handleUserInfo(chatId);
      } else if (data === "role:pic") {
        await answerCallback(cb.id);
        await handleAvailableRooms(chatId);
      } else if (data.startsWith("pick:")) {
        await handlePickRoom(cb);
      } else if (data === "close") {
        await answerCallback(cb.id, "Ditutup");
        await editMarkup(chatId, cb.message.message_id);
      }
      return new Response("OK");
    }
  } catch {
    return new Response("OK");
  }

  return new Response("OK");
});
```

`manifest.json`:

```json
{
  "id": "./",
  "name": "eROM@AG - Sistem Tempahan",
  "short_name": "eROM@AG",
  "description": "Sistem Pengurusan Tempahan Bilik PPD Alor Gajah",
  "lang": "ms",
  "scope": "./",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#f1f5f9",
  "theme_color": "#1e3a8a",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "assets/img/logo-kpm.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "assets/img/logo-kpm.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

`migration.js`:

```js
import { getSupabaseClient, resetTimestampRegistry } from './realtime.js';
import { clearAllCache } from './idb-cache.js';

export const MIGRATION_APP_NAME = 'eROM@AG';
export const MIGRATION_SCHEMA_VERSION = '2.0';

export const MIGRATION_TABLE_ORDER = Object.freeze([
  'erom_users',
  'erom_pic',
  'erom_bookings'
]);

export const MIGRATION_TABLE_SCHEMAS = Object.freeze({
  erom_users: Object.freeze({
    table_name: 'erom_users',
    primary_key: 'id',
    headers: Object.freeze([
      'id',
      'nama',
      'sektor',
      'email',
      'role',
      'password',
      'created_at'
    ])
  }),
  erom_pic: Object.freeze({
    table_name: 'erom_pic',
    primary_key: 'id',
    headers: Object.freeze([
      'id',
      'bilik',
      'telegram_id',
      'telegram_username',
      'is_pic',
      'registered_at'
    ])
  }),
  erom_bookings: Object.freeze({
    table_name: 'erom_bookings',
    primary_key: 'id',
    headers: Object.freeze([
      'id',
      'bilik',
      'tarikh',
      'masa_mula',
      'masa_tamat',
      'kategori',
      'tujuan',
      'sektor',
      'nama_penempah',
      'status',
      'created_at',
      'updated_at'
    ])
  })
});

let isExportInProgress = false;
let isImportInProgress = false;
let activeAbortController = null;
let activeDownloadObjectUrl = null;
let unloadListenerBound = false;

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizeRowByHeaders(row, headers) {
  const normalized = {};
  for (let i = 0; i < headers.length; i++) {
    const col = headers[i];
    normalized[col] = Object.prototype.hasOwnProperty.call(row, col) ? row[col] : null;
  }
  return normalized;
}

function createAbortError() {
  const err = new Error('Operasi migrasi telah dibatalkan.');
  err.name = 'AbortError';
  return err;
}

function throwIfAborted(signal) {
  if (signal && signal.aborted) {
    throw createAbortError();
  }
}

function revokeActiveDownloadUrl() {
  if (activeDownloadObjectUrl) {
    try {
      URL.revokeObjectURL(activeDownloadObjectUrl);
    } catch {}
    activeDownloadObjectUrl = null;
  }
}

function bindUnloadCleanup() {
  if (unloadListenerBound || typeof window === 'undefined') {
    return;
  }
  window.addEventListener('beforeunload', revokeActiveDownloadUrl);
  unloadListenerBound = true;
}

export function isMigrationBusy() {
  return isExportInProgress || isImportInProgress;
}

export function abortMigrationOperations() {
  if (activeAbortController) {
    activeAbortController.abort();
    activeAbortController = null;
  }
  revokeActiveDownloadUrl();
}

export function renderMigrationStatus(container, statusData) {
  if (!container) return;

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  if (!statusData) return;

  const fragment = document.createDocumentFragment();
  const wrapper = document.createElement('div');
  const type = statusData.type || 'info';

  const colorMap = {
    info: '#1e40af',
    success: '#065f46',
    error: '#991b1b',
    warning: '#92400e'
  };
  const bgMap = {
    info: '#eff6ff',
    success: '#ecfdf5',
    error: '#fef2f2',
    warning: '#fffbeb'
  };
  const borderMap = {
    info: '#bfdbfe',
    success: '#a7f3d0',
    error: '#fecaca',
    warning: '#fde68a'
  };

  wrapper.style.padding = '12px 14px';
  wrapper.style.borderRadius = '10px';
  wrapper.style.fontSize = '0.9rem';
  wrapper.style.color = colorMap[type] || colorMap.info;
  wrapper.style.background = bgMap[type] || bgMap.info;
  wrapper.style.border = `1px solid ${borderMap[type] || borderMap.info}`;

  const titleEl = document.createElement('div');
  titleEl.style.fontWeight = '600';
  titleEl.textContent = statusData.title || '';
  wrapper.appendChild(titleEl);

  if (statusData.message) {
    const msgEl = document.createElement('div');
    msgEl.style.marginTop = '4px';
    msgEl.textContent = statusData.message;
    wrapper.appendChild(msgEl);
  }

  if (Array.isArray(statusData.details) && statusData.details.length > 0) {
    const listEl = document.createElement('ul');
    listEl.style.margin = '8px 0 0 18px';
    listEl.style.padding = '0';

    for (let i = 0; i < statusData.details.length; i++) {
      const li = document.createElement('li');
      li.textContent = String(statusData.details[i]);
      listEl.appendChild(li);
    }
    wrapper.appendChild(listEl);
  }

  if (statusData.downloadAction && statusData.downloadAction.url && statusData.downloadAction.filename) {
    const actionWrap = document.createElement('div');
    actionWrap.style.marginTop = '10px';

    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', statusData.downloadAction.url);
    linkEl.setAttribute('download', statusData.downloadAction.filename);
    linkEl.setAttribute('rel', 'noopener');
    linkEl.textContent = statusData.downloadAction.label || `Muat Turun Manual (${statusData.downloadAction.filename})`;
    linkEl.style.display = 'inline-flex';
    linkEl.style.alignItems = 'center';
    linkEl.style.justifyContent = 'center';
    linkEl.style.minHeight = '44px';
    linkEl.style.padding = '8px 14px';
    linkEl.style.borderRadius = '8px';
    linkEl.style.background = '#065f46';
    linkEl.style.color = '#ffffff';
    linkEl.style.fontWeight = '600';
    linkEl.style.textDecoration = 'none';

    actionWrap.appendChild(linkEl);
    wrapper.appendChild(actionWrap);
  }

  fragment.appendChild(wrapper);
  container.appendChild(fragment);
}

export function validateMigrationPayload(payload) {
  if (!isPlainObject(payload)) {
    return { ok: false, error: 'Struktur akar fail JSON tidak sah.' };
  }

  const { metadata, tables } = payload;

  if (!isPlainObject(metadata)) {
    return { ok: false, error: 'Objek metadata tiada atau tidak sah dalam fail JSON.' };
  }

  if (metadata.app !== MIGRATION_APP_NAME) {
    return {
      ok: false,
      error: `Aplikasi tidak sepadan: dijangka "${MIGRATION_APP_NAME}", diterima "${String(metadata.app || '')}".`
    };
  }

  if (typeof metadata.schema_version !== 'string' || !metadata.schema_version.trim()) {
    return { ok: false, error: 'Versi skema metadata tidak sah.' };
  }

  if (!Array.isArray(metadata.table_order)) {
    return { ok: false, error: 'Susunan jadual (metadata.table_order) mesti berbentuk tatasusunan.' };
  }

  if (metadata.table_order.length !== MIGRATION_TABLE_ORDER.length) {
    return {
      ok: false,
      error: `Bilangan jadual tidak sepadan: dijangka ${MIGRATION_TABLE_ORDER.length}, diterima ${metadata.table_order.length}.`
    };
  }

  for (let i = 0; i < MIGRATION_TABLE_ORDER.length; i++) {
    if (metadata.table_order[i] !== MIGRATION_TABLE_ORDER[i]) {
      return {
        ok: false,
        error: `Urutan kebergantungan jadual tidak sah pada indeks ${i}: dijangka "${MIGRATION_TABLE_ORDER[i]}".`
      };
    }
  }

  if (!isPlainObject(tables)) {
    return { ok: false, error: 'Objek jadual (tables) tiada atau tidak sah.' };
  }

  const normalizedTables = {};

  for (let i = 0; i < MIGRATION_TABLE_ORDER.length; i++) {
    const tableName = MIGRATION_TABLE_ORDER[i];
    const expectedSchema = MIGRATION_TABLE_SCHEMAS[tableName];
    const tableBlock = tables[tableName];

    if (!isPlainObject(tableBlock)) {
      return { ok: false, error: `Definisi jadual "${tableName}" tiada dalam fail JSON.` };
    }

    if (tableBlock.table_name !== expectedSchema.table_name) {
      return {
        ok: false,
        error: `Nama jadual tidak sepadan bagi "${tableName}".`
      };
    }

    if (tableBlock.primary_key !== expectedSchema.primary_key) {
      return {
        ok: false,
        error: `Kunci utama (primary_key) tidak sepadan bagi "${tableName}": dijangka "${expectedSchema.primary_key}".`
      };
    }

    if (!Array.isArray(tableBlock.headers) || tableBlock.headers.length !== expectedSchema.headers.length) {
      return {
        ok: false,
        error: `Senarai lajur (headers) bagi "${tableName}" tidak sepadan dengan skema sasaran.`
      };
    }

    const allowedHeadersSet = new Set(expectedSchema.headers);
    for (let h = 0; h < expectedSchema.headers.length; h++) {
      if (tableBlock.headers[h] !== expectedSchema.headers[h]) {
        return {
          ok: false,
          error: `Lajur "${String(tableBlock.headers[h])}" pada jadual "${tableName}" tidak sepadan dengan "${expectedSchema.headers[h]}".`
        };
      }
    }

    if (!Array.isArray(tableBlock.rows)) {
      return { ok: false, error: `Rekod baris (rows) bagi "${tableName}" mesti berbentuk tatasusunan.` };
    }

    const normalizedRows = [];
    for (let r = 0; r < tableBlock.rows.length; r++) {
      const rawRow = tableBlock.rows[r];
      if (!isPlainObject(rawRow)) {
        return { ok: false, error: `Baris ke-${r + 1} dalam jadual "${tableName}" bukan objek sah.` };
      }

      const rowKeys = Object.keys(rawRow);
      for (let k = 0; k < rowKeys.length; k++) {
        if (!allowedHeadersSet.has(rowKeys[k])) {
          return {
            ok: false,
            error: `Medan tidak dikenali "${rowKeys[k]}" ditemui pada baris ke-${r + 1} jadual "${tableName}".`
          };
        }
      }

      const pkValue = rawRow[expectedSchema.primary_key];
      if (pkValue === undefined || pkValue === null || String(pkValue).trim() === '') {
        return {
          ok: false,
          error: `Nilai kunci utama "${expectedSchema.primary_key}" kosong pada baris ke-${r + 1} jadual "${tableName}".`
        };
      }

      normalizedRows.push(normalizeRowByHeaders(rawRow, expectedSchema.headers));
    }

    normalizedTables[tableName] = {
      table_name: expectedSchema.table_name,
      primary_key: expectedSchema.primary_key,
      headers: [...expectedSchema.headers],
      rows: normalizedRows
    };
  }

  return {
    ok: true,
    data: {
      metadata: {
        app: MIGRATION_APP_NAME,
        schema_version: metadata.schema_version.trim(),
        exported_at: typeof metadata.exported_at === 'string' ? metadata.exported_at : new Date().toISOString(),
        table_order: [...MIGRATION_TABLE_ORDER]
      },
      tables: normalizedTables
    }
  };
}

function triggerJsonDownload(jsonContent, filename) {
  bindUnloadCleanup();
  revokeActiveDownloadUrl();

  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);
  activeDownloadObjectUrl = objectUrl;

  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.rel = 'noopener';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();

  setTimeout(() => {
    if (anchor.parentNode) {
      anchor.parentNode.removeChild(anchor);
    }
  }, 0);

  return objectUrl;
}

export async function exportDatabaseJSON(options = {}) {
  if (isMigrationBusy()) {
    return { ok: false, error: 'Operasi sandaran atau pemulihan sedang berjalan. Sila tunggu sehingga selesai.' };
  }

  const statusEl = options.statusEl || null;
  const adminEmail = String(options.adminEmail || '').trim();
  const sessionToken = String(options.sessionToken || '').trim();

  if (!adminEmail || !sessionToken) {
    const msg = 'Sesi pentadbir tidak sah atau tamat tempoh. Sila log masuk semula sebagai Pentadbir.';
    renderMigrationStatus(statusEl, { type: 'error', title: 'Akses Ditolak', message: msg });
    return { ok: false, error: msg };
  }

  const controller = new AbortController();
  activeAbortController = controller;
  isExportInProgress = true;

  try {
    renderMigrationStatus(statusEl, {
      type: 'info',
      title: 'Menjana Sandaran JSON 1-to-1...',
      message: 'Sedang mengekstrak semua jadual sistem melalui RPC pentadbir.'
    });

    if (typeof window !== 'undefined' && window.ENV_READY) {
      await window.ENV_READY;
    }
    throwIfAborted(controller.signal);

    const client = await getSupabaseClient();
    throwIfAborted(controller.signal);

    const { data: rpcResponse, error: rpcError } = await client.rpc('fn_admin_export_database_v2', {
      p_admin_email: adminEmail,
      p_session_token: sessionToken
    });
    throwIfAborted(controller.signal);

    if (rpcError) {
      throw new Error(rpcError.message || 'Gagal melaksanakan RPC eksport pangkalan data.');
    }

    if (!rpcResponse || !rpcResponse.ok || !isPlainObject(rpcResponse.data)) {
      throw new Error((rpcResponse && rpcResponse.error) || 'Pelayan gagal memulangkan data eksport yang sah.');
    }

    const exportedAt = new Date().toISOString();
    const tablesOutput = {};
    const summaryDetails = [];

    for (let i = 0; i < MIGRATION_TABLE_ORDER.length; i++) {
      const tableName = MIGRATION_TABLE_ORDER[i];
      const schema = MIGRATION_TABLE_SCHEMAS[tableName];
      const rawRows = Array.isArray(rpcResponse.data[tableName]) ? rpcResponse.data[tableName] : [];
      const rows = rawRows.map((row) => normalizeRowByHeaders(row, schema.headers));

      tablesOutput[tableName] = {
        table_name: schema.table_name,
        primary_key: schema.primary_key,
        headers: [...schema.headers],
        rows
      };

      summaryDetails.push(`${tableName}: ${rows.length} rekod`);
    }

    const payload = {
      metadata: {
        app: MIGRATION_APP_NAME,
        schema_version: MIGRATION_SCHEMA_VERSION,
        exported_at: exportedAt,
        table_order: [...MIGRATION_TABLE_ORDER]
      },
      tables: tablesOutput
    };

    const safeTimestamp = exportedAt.replace(/[:.]/g, '-');
    const filename = `erom-ag-backup-${safeTimestamp}.json`;
    const serialized = JSON.stringify(payload, null, 2);

    const downloadUrl = triggerJsonDownload(serialized, filename);

    renderMigrationStatus(statusEl, {
      type: 'success',
      title: 'Eksport Sandaran JSON Berjaya',
      message: `Fail "${filename}" telah dijana. Jika muat turun automatik tidak bermula, gunakan pautan manual di bawah.`,
      details: summaryDetails,
      downloadAction: {
        url: downloadUrl,
        filename,
        label: `Muat Turun Fail Sandaran (${filename})`
      }
    });

    return { ok: true, filename, payload };
  } catch (err) {
    const errorMessage = err && err.message ? err.message : 'Ralat semasa menjana fail sandaran JSON.';
    renderMigrationStatus(statusEl, {
      type: err && err.name === 'AbortError' ? 'warning' : 'error',
      title: err && err.name === 'AbortError' ? 'Eksport Dibatalkan' : 'Eksport Sandaran Gagal',
      message: errorMessage
    });
    return { ok: false, error: errorMessage };
  } finally {
    isExportInProgress = false;
    if (activeAbortController === controller) {
      activeAbortController = null;
    }
  }
}

export async function importDatabaseJSON(file, options = {}) {
  if (isMigrationBusy()) {
    return { ok: false, error: 'Operasi sandaran atau pemulihan sedang berjalan. Sila tunggu sehingga selesai.' };
  }

  const statusEl = options.statusEl || null;
  const adminEmail = String(options.adminEmail || '').trim();
  const sessionToken = String(options.sessionToken || '').trim();

  if (!adminEmail || !sessionToken) {
    const msg = 'Sesi pentadbir tidak sah atau tamat tempoh. Sila log masuk semula sebagai Pentadbir.';
    renderMigrationStatus(statusEl, { type: 'error', title: 'Akses Ditolak', message: msg });
    return { ok: false, error: msg };
  }

  if (!file) {
    const msg = 'Sila pilih fail sandaran .json terlebih dahulu.';
    renderMigrationStatus(statusEl, { type: 'warning', title: 'Tiada Fail Dipilih', message: msg });
    return { ok: false, error: msg };
  }

  const fileName = String(file.name || '').toLowerCase();
  const fileType = String(file.type || '').toLowerCase();
  const isValidJsonFile =
    fileName.endsWith('.json') &&
    (!fileType || fileType === 'application/json' || fileType === 'text/json');

  if (!isValidJsonFile) {
    const msg = 'Format fail tidak sah. Hanya fail sambungan .json (application/json) dibenarkan.';
    renderMigrationStatus(statusEl, { type: 'error', title: 'Format Fail Ditolak', message: msg });
    return { ok: false, error: msg };
  }

  const controller = new AbortController();
  activeAbortController = controller;
  isImportInProgress = true;

  try {
    renderMigrationStatus(statusEl, {
      type: 'info',
      title: 'Mengesahkan Skema Fail JSON...',
      message: 'Menyemak sintaks JSON, susunan jadual, primary_key, dan headers.'
    });

    const rawText = await file.text();
    throwIfAborted(controller.signal);

    let parsedJson;
    try {
      parsedJson = JSON.parse(rawText);
    } catch {
      throw new Error('Sintaks JSON rosak atau tidak boleh dihuraikan.');
    }

    const validation = validateMigrationPayload(parsedJson);
    if (!validation.ok) {
      throw new Error(validation.error);
    }

    if (typeof window !== 'undefined' && window.ENV_READY) {
      await window.ENV_READY;
    }
    throwIfAborted(controller.signal);

    const client = await getSupabaseClient();
    throwIfAborted(controller.signal);

    const validatedData = validation.data;

    renderMigrationStatus(statusEl, {
      type: 'info',
      title: 'Memulihkan Data 1-to-1 ke Pangkalan Data...',
      message: 'Melaksanakan transaksi upsert atomik melalui RPC pentadbir mengikut urutan kunci asing.'
    });

    const { data: rpcResponse, error: rpcError } = await client.rpc('fn_admin_import_database_v2', {
      p_admin_email: adminEmail,
      p_session_token: sessionToken,
      p_tables: validatedData.tables
    });
    throwIfAborted(controller.signal);

    if (rpcError) {
      throw new Error(rpcError.message || 'Gagal melaksanakan RPC pemulihan pangkalan data.');
    }

    if (!rpcResponse || !rpcResponse.ok) {
      throw new Error((rpcResponse && rpcResponse.error) || 'Pelayan gagal memulihkan data JSON.');
    }

    const counts = isPlainObject(rpcResponse.counts) ? rpcResponse.counts : {};
    const summaryDetails = [];

    for (let i = 0; i < validatedData.metadata.table_order.length; i++) {
      const tableName = validatedData.metadata.table_order[i];
      const fallbackCount = validatedData.tables[tableName].rows.length;
      const restoredCount = typeof counts[tableName] === 'number' ? counts[tableName] : fallbackCount;
      summaryDetails.push(`${tableName}: ${restoredCount} rekod berjaya dipulihkan`);
    }

    await clearAllCache();
    resetTimestampRegistry();

    if (typeof options.onComplete === 'function') {
      await options.onComplete({
        metadata: validatedData.metadata,
        details: summaryDetails
      });
    }

    renderMigrationStatus(statusEl, {
      type: 'success',
      title: 'Pemulihan / Migrasi 1-to-1 Selesai',
      message: 'Semua rekod telah disegerakkan dan cache tempatan telah dikosongkan.',
      details: summaryDetails
    });

    return { ok: true, details: summaryDetails };
  } catch (err) {
    const errorMessage = err && err.message ? err.message : 'Ralat semasa mengimport fail JSON.';
    renderMigrationStatus(statusEl, {
      type: err && err.name === 'AbortError' ? 'warning' : 'error',
      title: err && err.name === 'AbortError' ? 'Import Dibatalkan' : 'Import / Pemulihan Gagal',
      message: errorMessage
    });
    return { ok: false, error: errorMessage };
  } finally {
    isImportInProgress = false;
    if (activeAbortController === controller) {
      activeAbortController = null;
    }
  }
}
```

`realtime.js`:

```js
let supabaseClientInstance = null;
let clientInitPromise = null;
let activeChannel = null;
let activeClient = null;
let activePayloadHandler = null;
let activeSyncHandler = null;
let isSubscribed = false;
let isReconnecting = false;
let lifecycleListenersBound = false;

const timestampRegistry = new Map();

async function resolveCreateClient() {
  if (
    typeof window !== 'undefined' &&
    window.supabase &&
    typeof window.supabase.createClient === 'function'
  ) {
    return window.supabase.createClient;
  }

  const mod = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  if (mod && typeof mod.createClient === 'function') {
    return mod.createClient;
  }

  throw new Error('Supabase client library unavailable.');
}

function resolveRecordId(record) {
  if (!record || typeof record !== 'object') {
    return null;
  }
  const rawId = record.id ?? record.booking_id;
  if (rawId === undefined || rawId === null || rawId === '') {
    return null;
  }
  return String(rawId);
}

function createChannelSubscription(client) {
  if (!client || typeof client.channel !== 'function') {
    return null;
  }

  return client
    .channel('public:erom_bookings')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'erom_bookings' },
      async (payload) => {
        const record = payload.new || payload.old;
        const recordId = resolveRecordId(record);

        if (record && !isLatestPayload(record)) {
          return;
        }

        if (payload.eventType === 'DELETE' && recordId) {
          timestampRegistry.delete(recordId);
        }

        if (typeof activePayloadHandler === 'function') {
          await activePayloadHandler(payload);
        }
      }
    )
    .subscribe();
}

async function removeChannelSafely(client, channel) {
  if (!channel || !client || typeof client.removeChannel !== 'function') {
    return;
  }
  try {
    await client.removeChannel(channel);
  } catch {}
}

async function handleResumeSync() {
  if (!isSubscribed || !activeClient || isReconnecting) {
    return;
  }

  isReconnecting = true;
  try {
    const channelState = activeChannel ? activeChannel.state : null;
    if (!activeChannel || channelState !== 'joined') {
      const staleChannel = activeChannel;
      activeChannel = null;
      await removeChannelSafely(activeClient, staleChannel);

      if (isSubscribed && activeClient) {
        activeChannel = createChannelSubscription(activeClient);
      }
    }

    if (isSubscribed && typeof activeSyncHandler === 'function') {
      await activeSyncHandler();
    }
  } finally {
    isReconnecting = false;
  }
}

function handleVisibilityChange() {
  if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
    handleResumeSync();
  }
}

function handleNetworkOnline() {
  handleResumeSync();
}

function bindLifecycleListeners() {
  if (lifecycleListenersBound) {
    return;
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('online', handleNetworkOnline);
  }
  lifecycleListenersBound = true;
}

export function resetTimestampRegistry() {
  timestampRegistry.clear();
}

export async function getSupabaseClient() {
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  if (clientInitPromise) {
    return clientInitPromise;
  }

  clientInitPromise = (async () => {
    try {
      if (typeof window !== 'undefined' && window.ENV_READY) {
        await window.ENV_READY;
      }
      const env = (typeof window !== 'undefined' && window.__ENV) ? window.__ENV : {};
      const url = String(env.SUPABASE_URL || '').trim();
      const key = String(env.SUPABASE_ANON_KEY || '').trim();
      if (!url || !key) {
        throw new Error('Supabase configuration credentials missing');
      }
      const createClient = await resolveCreateClient();
      supabaseClientInstance = createClient(url, key);
      return supabaseClientInstance;
    } finally {
      clientInitPromise = null;
    }
  })();

  return clientInitPromise;
}

export function isLatestPayload(record) {
  const id = resolveRecordId(record);
  if (!id) {
    return true;
  }
  const parsedTime = record.updated_at ? Date.parse(record.updated_at) : NaN;
  const incomingTime = Number.isNaN(parsedTime) ? Date.now() : parsedTime;
  const existingTime = timestampRegistry.get(id);

  if (existingTime && incomingTime < existingTime) {
    return false;
  }

  timestampRegistry.set(id, incomingTime);
  return true;
}

export async function teardownRealtime(client) {
  const targetClient = client || activeClient || supabaseClientInstance;
  const channelToRemove = activeChannel;

  isSubscribed = false;
  activeChannel = null;
  activePayloadHandler = null;
  activeSyncHandler = null;

  await removeChannelSafely(targetClient, channelToRemove);
}

export function subscribeBookingsRealtime(client, onPayload, onReconnectSync) {
  const targetClient = client || supabaseClientInstance;
  if (!targetClient || typeof targetClient.channel !== 'function') {
    return null;
  }

  const previousChannel = activeChannel;
  activeChannel = null;

  activeClient = targetClient;
  activePayloadHandler = typeof onPayload === 'function' ? onPayload : null;
  activeSyncHandler = typeof onReconnectSync === 'function' ? onReconnectSync : null;
  isSubscribed = true;

  bindLifecycleListeners();

  if (previousChannel) {
    removeChannelSafely(targetClient, previousChannel).then(() => {
      if (isSubscribed && activeClient === targetClient && !activeChannel) {
        activeChannel = createChannelSubscription(targetClient);
      }
    });
    return null;
  }

  activeChannel = createChannelSubscription(targetClient);
  return activeChannel;
}
```

`src\api\supabaseClient.js`:

```js
// src/api/supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// KONFIGURASI SUPABASE SELF-HOSTED (BAHARU)
// Menggunakan URL: https://app.tech4ag.my
const SUPABASE_URL = "https://app.tech4ag.my";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzYzMzczNjQ1LCJleHAiOjIwNzg3MzM2NDV9.vZOedqJzUn01PjwfaQp7VvRzSm4aRMr21QblPDK8AoY";

// Inisialisasi Client
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Wrapper untuk memudahkan panggilan dalam app.js
export const supa = {
  rpc: (fnName, params) => client.rpc(fnName, params),
  from: (tableName) => client.from(tableName),
  channel: (channelName, opts) => client.channel(channelName, opts),
  removeChannel: (channel) => client.removeChannel(channel),
  client: client
};
```

`storage\db.js`:

```js
// src/storage/db.js

const DB_NAME = 'erom_db';
const DB_VERSION = 1;
const STORE_NAME = 'cache_store';

let dbInstance = null;

export function openDB() {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      console.warn('[IndexedDB] API IndexedDB tidak disokong pada pelayar ini.');
      return resolve(null);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'cache_key' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;

      dbInstance.onversionchange = () => {
        dbInstance.close();
        dbInstance = null;
      };

      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('[IndexedDB] Ralat membuka pangkalan data:', event.target.error);
      reject(event.target.error);
    };
  });
}

export async function setCache(key, data, ttlSeconds = 300) {
  const db = await openDB();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const record = {
        cache_key: key,
        data: data,
        timestamp: Date.now(),
        ttl: ttlSeconds * 1000
      };

      const req = store.put(record);

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.error('[IndexedDB] Gagal menulis ke cache:', req.error);
        resolve(false);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada setCache:', err);
      resolve(false);
    }
  });
}

export async function getCacheEntry(key) {
  const db = await openDB();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        const item = req.result;
        if (!item) {
          return resolve(null);
        }

        const now = Date.now();
        const age = now - item.timestamp;
        const isStale = age > (item.ttl || 0);

        resolve({
          data: item.data,
          isStale: isStale,
          timestamp: item.timestamp
        });
      };

      req.onerror = () => {
        console.error('[IndexedDB] Gagal membaca rekod cache:', req.error);
        resolve(null);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada getCacheEntry:', err);
      resolve(null);
    }
  });
}

export async function getCache(key) {
  const entry = await getCacheEntry(key);
  if (!entry) return null;
  if (entry.isStale) return null;
  return entry.data;
}

export async function deleteCache(key) {
  const db = await openDB();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.error('[IndexedDB] Gagal memadam kunci cache:', req.error);
        resolve(false);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada deleteCache:', err);
      resolve(false);
    }
  });
}

export async function deleteCacheByPrefix(prefix) {
  const db = await openDB();
  if (!db) return 0;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      let deletedCount = 0;

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          if (typeof cursor.key === 'string' && cursor.key.startsWith(prefix)) {
            cursor.delete();
            deletedCount++;
          }
          cursor.continue();
        } else {
          resolve(deletedCount);
        }
      };

      req.onerror = () => {
        console.error('[IndexedDB] Gagal memadam awalan cache:', req.error);
        resolve(deletedCount);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada deleteCacheByPrefix:', err);
      resolve(0);
    }
  });
}

export async function clearExpiredCache() {
  const db = await openDB();
  if (!db) return 0;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      const now = Date.now();
      let purgedCount = 0;

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const item = cursor.value;
          if (item && item.timestamp && item.ttl && (now - item.timestamp > item.ttl)) {
            cursor.delete();
            purgedCount++;
          }
          cursor.continue();
        } else {
          resolve(purgedCount);
        }
      };

      req.onerror = () => {
        console.error('[IndexedDB] Gagal membersihkan cache luput:', req.error);
        resolve(purgedCount);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada clearExpiredCache:', err);
      resolve(0);
    }
  });
}

export async function clearAllCache() {
  const db = await openDB();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.error('[IndexedDB] Gagal mengosongkan storan cache:', req.error);
        resolve(false);
      };
    } catch (err) {
      console.error('[IndexedDB] Pengecualian pada clearAllCache:', err);
      resolve(false);
    }
  });
}
```

`sw.js`:

```js
const CACHE_NAME = 'erom-ag-v16';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/style.css?v=20261112',
  './assets/js/app.js?v=20261112',
  './assets/img/logo-kpm.png',
  './config.js?v=20261112',
  './idb-cache.js',
  './realtime.js',
  './migration.js?v=20261112',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS_TO_CACHE.map((assetUrl) => {
          const freshRequest = new Request(assetUrl, { cache: 'reload' });
          return fetch(freshRequest).then((response) => {
            if (!response || response.status !== 200) {
              throw new Error(`Failed to precache asset: ${assetUrl}`);
            }
            return cache.put(assetUrl, response);
          });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
            return Promise.resolve();
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (url.pathname.startsWith('/api/') || url.pathname.endsWith('/sw.js')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        const cacheControl = networkResponse.headers.get('Cache-Control') || '';
        const shouldCache =
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === 'basic' &&
          !cacheControl.toLowerCase().includes('no-store');

        if (shouldCache) {
          const responseClone = networkResponse.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => {
              return cache.put(event.request, responseClone);
            })
            .catch(() => {});
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        if (event.request.mode === 'navigate') {
          const fallbackResponse = await caches.match('./index.html');
          if (fallbackResponse) {
            return fallbackResponse;
          }
        }
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: {
            'Content-Type': 'text/plain; charset=utf-8'
          }
        });
      })
  );
});
```