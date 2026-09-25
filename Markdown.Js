<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nova Wallet</title>

  <style>
    :root {
      --bg: #070b16;
      --surface: rgba(20, 27, 48, 0.8);
      --surface-strong: #151d35;
      --border: rgba(255, 255, 255, 0.1);
      --text: #f8fafc;
      --muted: #8994ad;
      --primary: #7c5cff;
      --primary-light: #a78bfa;
      --cyan: #22d3ee;
      --green: #27d17f;
      --red: #ff6678;
      --yellow: #fbbf24;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at 10% 0%, rgba(124, 92, 255, 0.2), transparent 28rem),
        radial-gradient(circle at 100% 30%, rgba(34, 211, 238, 0.12), transparent 25rem),
        var(--bg);
    }

    button,
    input,
    select {
      font: inherit;
    }

    button {
      border: 0;
      cursor: pointer;
    }

    .app {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 250px;
      padding: 28px 18px;
      border-right: 1px solid var(--border);
      background: rgba(8, 12, 27, 0.75);
      backdrop-filter: blur(18px);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 12px 34px;
      font-size: 21px;
      font-weight: 800;
      letter-spacing: -0.04em;
    }

    .brand-mark {
      display: grid;
      width: 36px;
      height: 36px;
      place-items: center;
      border-radius: 12px;
      color: white;
      background: linear-gradient(135deg, var(--primary), var(--cyan));
      box-shadow: 0 8px 24px rgba(124, 92, 255, 0.35);
    }

    .nav-label {
      padding: 0 12px 10px;
      color: var(--muted);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .nav {
      display: grid;
      gap: 5px;
    }

    .nav a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 12px;
      color: var(--muted);
      text-decoration: none;
      transition: 0.2s ease;
    }

    .nav a:hover,
    .nav a.active {
      color: white;
      background: rgba(124, 92, 255, 0.16);
    }

    .nav a.active {
      box-shadow: inset 3px 0 var(--primary-light);
    }

    .sidebar-card {
      margin-top: 32px;
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: linear-gradient(145deg, rgba(124, 92, 255, 0.18), rgba(34, 211, 238, 0.06));
    }

    .sidebar-card small {
      color: var(--muted);
      line-height: 1.5;
    }

    .main {
      width: min(1450px, 100%);
      padding: 28px 34px;
      margin: 0 auto;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 34px;
    }

    .eyebrow {
      margin: 0 0 8px;
      color: var(--primary-light);
      font-size: 13px;
      font-weight: 700;
    }

    h1,
    h2,
    p {
      margin-top: 0;
    }

    h1 {
      margin-bottom: 8px;
      font-size: clamp(26px, 4vw, 38px);
      letter-spacing: -0.05em;
    }

    .subtitle {
      margin: 0;
      color: var(--muted);
    }

    .profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .notification {
      display: grid;
      width: 42px;
      height: 42px;
      place-items: center;
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--muted);
      background: var(--surface);
    }

    .avatar {
      display: grid;
      width: 42px;
      height: 42px;
      place-items: center;
      border-radius: 50%;
      color: white;
      font-weight: 800;
      background: linear-gradient(135deg, #ec4899, var(--primary));
    }

    .overview {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 18px;
      margin-bottom: 18px;
    }

    .balance-card,
    .stat-card,
    .panel {
      border: 1px solid var(--border);
      border-radius: 22px;
      background: var(--surface);
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
      backdrop-filter: blur(18px);
    }

    .balance-card {
      position: relative;
      min-height: 250px;
      padding: 28px;
      overflow: hidden;
      background:
        radial-gradient(circle at 90% 10%, rgba(34, 211, 238, 0.28), transparent 20rem),
        linear-gradient(135deg, rgba(124, 92, 255, 0.9), rgba(38, 54, 112, 0.86));
    }

    .balance-card::after {
      position: absolute;
      right: -55px;
      bottom: -100px;
      width: 280px;
      height: 280px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 50%;
      content: "";
      box-shadow:
        0 0 0 25px rgba(255, 255, 255, 0.04),
        0 0 0 50px rgba(255, 255, 255, 0.03);
    }

    .balance-label {
      color: rgba(255, 255, 255, 0.72);
      font-size: 14px;
    }

    .balance {
      margin: 18px 0 10px;
      font-size: clamp(34px, 5vw, 53px);
      font-weight: 800;
      letter-spacing: -0.06em;
    }

    .balance-change {
      color: #b9f8d5;
      font-size: 14px;
    }

    .balance-footer {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 35px;
      color: rgba(255, 255, 255, 0.75);
      font-size: 13px;
    }

    .verified {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 9px;
      border-radius: 999px;
      color: #c9ffe1;
      background: rgba(39, 209, 127, 0.18);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }

    .stat-card {
      padding: 22px;
    }

    .stat-label {
      margin-bottom: 14px;
      color: var(--muted);
      font-size: 13px;
    }

    .stat-value {
      margin-bottom: 8px;
      font-size: 25px;
      font-weight: 800;
    }

    .stat-caption {
      color: var(--muted);
      font-size: 12px;
    }

    .positive {
      color: var(--green);
    }

    .negative {
      color: var(--red);
    }

    .actions {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      min-height: 56px;
      border: 1px solid var(--border);
      border-radius: 15px;
      color: white;
      background: var(--surface);
      transition: 0.2s ease;
    }

    .action-button:hover {
      border-color: var(--primary-light);
      background: rgba(124, 92, 255, 0.18);
      transform: translateY(-2px);
    }

    .action-icon {
      display: grid;
      width: 28px;
      height: 28px;
      place-items: center;
      border-radius: 9px;
      color: var(--primary-light);
      background: rgba(124, 92, 255, 0.18);
      font-size: 18px;
    }

    .content {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 18px;
    }

    .panel {
      padding: 24px;
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      margin-bottom: 22px;
    }

    .panel-header h2 {
      margin: 0;
      font-size: 18px;
      letter-spacing: -0.03em;
    }

    .panel-link {
      color: var(--primary-light);
      cursor: pointer;
      font-size: 13px;
    }

    .asset {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      padding: 15px 0;
      border-bottom: 1px solid var(--border);
    }

    .asset:last-child {
      border-bottom: 0;
    }

    .asset-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .coin {
      display: grid;
      width: 42px;
      height: 42px;
      place-items: center;
      border-radius: 50%;
      color: white;
      font-weight: 800;
      background: linear-gradient(135deg, #f59e0b, #f97316);
    }

    .coin.eth {
      background: linear-gradient(135deg, #818cf8, #4f46e5);
    }

    .coin.sol {
      background: linear-gradient(135deg, #22d3ee, #a855f7);
    }

    .coin.usdc {
      background: linear-gradient(135deg, #38bdf8, #2563eb);
      font-size: 11px;
    }

    .asset-name {
      margin-bottom: 4px;
      font-weight: 700;
    }

    .asset-meta {
      color: var(--muted);
      font-size: 12px;
    }

    .asset-value {
      text-align: right;
    }

    .asset-value strong {
      display: block;
      margin-bottom: 4px;
    }

    .asset-value span {
      color: var(--muted);
      font-size: 12px;
    }

    .transaction {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      padding: 15px 0;
      border-bottom: 1px solid var(--border);
    }

    .transaction:last-child {
      border-bottom: 0;
    }

    .transaction-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .transaction-icon {
      display: grid;
      width: 38px;
      height: 38px;
      place-items: center;
      border-radius: 12px;
      color: var(--green);
      background: rgba(39, 209, 127, 0.12);
    }

    .transaction-icon.withdraw {
      color: var(--red);
      background: rgba(255, 102, 120, 0.12);
    }

    .transaction-name {
      margin-bottom: 4px;
      font-size: 14px;
      font-weight: 700;
    }

    .transaction-date {
      color: var(--muted);
      font-size: 12px;
    }

    .transaction-amount {
      text-align: right;
      font-size: 14px;
      font-weight: 700;
    }

    .status {
      display: block;
      margin-top: 4px;
      color: var(--green);
      font-size: 11px;
      font-weight: 500;
    }

    .modal-backdrop {
      position: fixed;
      z-index: 10;
      inset: 0;
      display: none;
      place-items: center;
      padding: 20px;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
    }

    .modal-backdrop.open {
      display: grid;
    }

    .modal {
      width: min(440px, 100%);
      padding: 25px;
      border: 1px solid var(--border);
      border-radius: 22px;
      background: #11182d;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.45);
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 21px;
    }

    .close {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      color: var(--muted);
      background: rgba(255, 255, 255, 0.06);
      font-size: 20px;
    }

    .form-group {
      margin-bottom: 17px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: var(--muted);
      font-size: 13px;
    }

    .input,
    .select {
      width: 100%;
      padding: 13px 14px;
      outline: 0;
      border: 1px solid var(--border);
      border-radius: 11px;
      color: white;
      background: rgba(255, 255, 255, 0.06);
    }

    .input:focus,
    .select:focus {
      border-color: var(--primary-light);
    }

    .submit {
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      color: white;
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary), #5b4be7);
    }

    .submit:hover {
      filter: brightness(1.12);
    }

    .toast {
      position: fixed;
      z-index: 20;
      right: 22px;
      bottom: 22px;
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: calc(100vw - 44px);
      padding: 14px 17px;
      border: 1px solid rgba(39, 209, 127, 0.35);
      border-radius: 13px;
      color: white;
      background: #11251f;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      opacity: 0;
      pointer-events: none;
      transform: translateY(15px);
      transition: 0.3s ease;
    }

    .toast.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 1050px) {
      .overview,
      .content {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 800px) {
      .sidebar {
        display: none;
      }

      .main {
        padding: 22px 16px;
      }
    }

    @media (max-width: 580px) {
      .topbar {
        align-items: flex-start;
      }

      .profile .notification {
        display: none;
      }

      .stats,
      .actions {
        grid-template-columns: repeat(2, 1fr);
      }

      .action-button {
        flex-direction: column;
        gap: 5px;
        min-height: 76px;
        font-size: 12px;
      }

      .balance-card {
        min-height: 230px;
        padding: 22px;
      }
    }
  </style>
</head>

<body>
  <div class="app">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">N</span>
        Nova Wallet
      </div>

      <div class="nav-label">Workspace</div>

      <nav class="nav">
        <a href="#" class="active">⌂ <span>Overview</span></a>
        <a href="#">◈ <span>Portfolio</span></a>
        <a href="#">↔ <span>Transactions</span></a>
        <a href="#">◉ <span>Markets</span></a>
        <a href="#">⚙ <span>Settings</span></a>
      </nav>

      <div class="sidebar-card">
        <strong>Protected wallet</strong>
        <br />
        <small>Your account is secured with two-factor authentication.</small>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div>
          <p class="eyebrow">Tuesday, September 24, 2026</p>
          <h1>Good morning, Jordan</h1>
          <p class="subtitle">Manage your digital assets in one place.</p>
        </div>

        <div class="profile">
          <button class="notification">♢</button>
          <div class="avatar">JD</div>
        </div>
      </header>

      <section class="overview">
        <article class="balance-card">
          <div class="balance-label">Total wallet balance</div>
          <div class="balance">$42,680.24</div>
          <div class="balance-change">↑ $1,284.50 <span>+3.11% today</span></div>

          <div class="balance-footer">
            <span class="verified">✓ Verified wallet</span>
            <span>Updated just now</span>
          </div>
        </article>

        <div class="stats">
          <article class="stat-card">
            <div class="stat-label">Total deposits</div>
            <div class="stat-value">$58,420</div>
            <div class="stat-caption positive">↑ 12.8% this month</div>
          </article>

          <article class="stat-card">
            <div class="stat-label">Total withdrawals</div>
            <div class="stat-value">$15,740</div>
            <div class="stat-caption">24 completed transfers</div>
          </article>

          <article class="stat-card">
            <div class="stat-label">Portfolio profit</div>
            <div class="stat-value positive">+$7,480</div>
            <div class="stat-caption positive">↑ 21.25% all time</div>
          </article>

          <article class="stat-card">
            <div class="stat-label">Network status</div>
            <div class="stat-value positive">Online</div>
            <div class="stat-caption">Transfers available</div>
          </article>
        </div>
      </section>

      <section class="actions">
        <button class="action-button" data-action="Deposit">
          <span class="action-icon">↓</span>
          Deposit
        </button>

        <button class="action-button" data-action="Withdraw">
          <span class="action-icon">↑</span>
          Withdraw
        </button>

        <button class="action-button" data-action="Send">
          <span class="action-icon">↗</span>
          Send
        </button>

        <button class="action-button" data-action="Receive">
          <span class="action-icon">↙</span>
          Receive
        </button>
      </section>

      <section class="content">
        <article class="panel">
          <div class="panel-header">
            <h2>My assets</h2>
            <span class="panel-link">View portfolio →</span>
          </div>

          <div class="asset">
            <div class="asset-info">
              <div class="coin">₿</div>
              <div>
                <div class="asset-name">Bitcoin</div>
                <div class="asset-meta">BTC · 0.42 BTC</div>
              </div>
            </div>
            <div class="asset-value">
              <strong>$26,460.00</strong>
              <span class="positive">+4.21%</span>
            </div>
          </div>

          <div class="asset">
            <div class="asset-info">
              <div class="coin eth">Ξ</div>
              <div>
                <div class="asset-name">Ethereum</div>
                <div class="asset-meta">ETH · 3.8 ETH</div>
              </div>
            </div>
            <div class="asset-value">
              <strong>$9,196.00</strong>
              <span class="positive">+2.84%</span>
            </div>
          </div>

          <div class="asset">
            <div class="asset-info">
              <div class="coin sol">S</div>
              <div>
                <div class="asset-name">Solana</div>
                <div class="asset-meta">SOL · 42 SOL</div>
              </div>
            </div>
            <div class="asset-value">
              <strong>$3,318.00</strong>
              <span class="negative">-1.12%</span>
            </div>
          </div>

          <div class="asset">
            <div class="asset-info">
              <div class="coin usdc">USDC</div>
              <div>
                <div class="asset-name">USD Coin</div>
                <div class="asset-meta">USDC · 3,706.24 USDC</div>
              </div>
            </div>
            <div class="asset-value">
              <strong>$3,706.24</strong>
              <span>0.01%</span>
            </div>
          </div>
        </article>

        <article class="panel">
          <div class="panel-header">
            <h2>Recent activity</h2>
            <span class="panel-link">View all →</span>
          </div>

          <div id="transactions">
            <div class="transaction">
              <div class="transaction-info">
                <div class="transaction-icon">↓</div>
                <div>
                  <div class="transaction-name">Received Bitcoin</div>
                  <div class="transaction-date">Today, 10:42 AM</div>
                </div>
              </div>
              <div class="transaction-amount positive">
                +0.08 BTC
                <span class="status">Completed</span>
              </div>
            </div>

            <div class="transaction">
              <div class="transaction-info">
                <div class="transaction-icon withdraw">↑</div>
                <div>
                  <div class="transaction-name">Sent Ethereum</div>
                  <div class="transaction-date">Yesterday, 4:18 PM</div>
                </div>
              </div>
              <div class="transaction-amount negative">
                -0.50 ETH
                <span class="status">Completed</span>
              </div>
            </div>

            <div class="transaction">
              <div class="transaction-info">
                <div class="transaction-icon">↓</div>
                <div>
                  <div class="transaction-name">Cash deposit</div>
                  <div class="transaction-date">Sep 21, 2026</div>
                </div>
              </div>
              <div class="transaction-amount positive">
                +$2,500
                <span class="status">Completed</span>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>

  <div class="modal-backdrop" id="modalBackdrop">
    <div class="modal">
      <div class="modal-header">
        <h2 id="modalTitle">Deposit funds</h2>
        <button class="close" id="closeModal">×</button>
      </div>

      <form id="transactionForm">
        <div class="form-group">
          <label for="assetSelect">Asset</label>
          <select class="select" id="assetSelect">
            <option>USD Coin (USDC)</option>
            <option>Bitcoin (BTC)</option>
            <option>Ethereum (ETH)</option>
            <option>Solana (SOL)</option>
          </select>
        </div>

        <div class="form-group" id="addressGroup">
          <label for="addressInput">Wallet address or recipient</label>
          <input
            class="input"
            id="addressInput"
            type="text"
            placeholder="Enter wallet address"
          />
        </div>

        <div class="form-group">
          <label for="amountInput">Amount</label>
          <input
            class="input"
            id="amountInput"
            type="number"
            min="0"
            step="any"
            placeholder="0.00"
            required
          />
        </div>

        <button class="submit" type="submit">Continue securely</button>
      </form>
    </div>
  </div>

  <div class="toast" id="toast">
    <span>✓</span>
    <span id="toastMessage">Transaction completed</span>
  </div>

  <script>
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalTitle = document.getElementById("modalTitle");
    const closeModal = document.getElementById("closeModal");
    const transactionForm = document.getElementById("transactionForm");
    const addressGroup = document.getElementById("addressGroup");
    const addressInput = document.getElementById("addressInput");
    const transactions = document.getElementById("transactions");
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    let currentAction = "Deposit";

    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        currentAction = button.dataset.action;
        modalTitle.textContent = `${currentAction} funds`;
        modalBackdrop.classList.add("open");

        const needsAddress = ["Withdraw", "Send"].includes(currentAction);
        addressGroup.style.display = needsAddress ? "block" : "none";
        addressInput.required = needsAddress;

        if (currentAction === "Receive") {
          addressGroup.style.display = "block";
          addressInput.required = false;
          addressInput.value = "0x7f...9A21";
          addressInput.readOnly = true;
          addressInput.placeholder = "Your receiving address";
        } else {
          addressInput.readOnly = false;
          addressInput.value = "";
          addressInput.placeholder = "Enter wallet address";
        }
      });
    });

    closeModal.addEventListener("click", closeTransactionModal);

    modalBackdrop.addEventListener("click", (event) => {
      if (event.target === modalBackdrop) {
        closeTransactionModal();
      }
    });

    function closeTransactionModal() {
      modalBackdrop.classList.remove("open");
      transactionForm.reset();
      addressInput.readOnly = false;
    }

    transactionForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const asset = document.getElementById("assetSelect").value;
      const amount = document.getElementById("amountInput").value;

      closeTransactionModal();

      const isOutgoing = ["Withdraw", "Send"].includes(currentAction);
      const icon = isOutgoing ? "↑" : "↓";
      const iconClass = isOutgoing ? "withdraw" : "";
      const sign = isOutgoing ? "-" : "+";

      const transaction = document.createElement("div");
      transaction.className = "transaction";
      transaction.innerHTML = `
        <div class="transaction-info">
          <div class="transaction-icon ${iconClass}">${icon}</div>
          <div>
            <div class="transaction-name">${currentAction} ${asset.split(" ")[0]}</div>
            <div class="transaction-date">Just now</div>
          </div>
        </div>
        <div class="transaction-amount ${isOutgoing ? "negative" : "positive"}">
          ${sign}${amount} ${asset.match(/\((.*?)\)/)?.[1] || "USDC"}
          <span class="status">Completed</span>
        </div>
      `;

      transactions.prepend(transaction);
      showToast(`${currentAction} completed successfully`);
    });

    function showToast(message) {
      toastMessage.textContent = message;
      toast.classList.add("visible");

      setTimeout(() => {
        toast.classList.remove("visible");
      }, 3500);
    }
  </script>
</body>
</html>