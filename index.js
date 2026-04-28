const http = require('http');

const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);

const appStatus = {
  service: 'hamsafar',
  message: 'Intercity rides service for Tajikistan',
  status: 'ok',
};

const homePage = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hamsafar</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Arial, Helvetica, sans-serif;
        --accent: #16825d;
        --accent-dark: #0c5a41;
        --bg: #f4fbf8;
        --card: #ffffff;
        --text: #123026;
        --muted: #5f756e;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: linear-gradient(145deg, #e7f7f0 0%, #ffffff 52%, #dff2ff 100%);
        color: var(--text);
        min-height: 100vh;
      }

      .page {
        max-width: 1120px;
        margin: 0 auto;
        padding: 32px 20px 56px;
      }

      .nav {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-bottom: 72px;
      }

      .brand {
        align-items: center;
        display: flex;
        font-size: 24px;
        font-weight: 800;
        gap: 12px;
        letter-spacing: -0.03em;
      }

      .brand-mark {
        align-items: center;
        background: var(--accent);
        border-radius: 16px;
        color: #ffffff;
        display: inline-flex;
        height: 44px;
        justify-content: center;
        width: 44px;
      }

      .nav-pill {
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid rgba(22, 130, 93, 0.18);
        border-radius: 999px;
        color: var(--accent-dark);
        font-weight: 700;
        padding: 10px 16px;
      }

      .hero {
        display: grid;
        gap: 32px;
        grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
        align-items: center;
      }

      h1 {
        font-size: clamp(42px, 7vw, 78px);
        letter-spacing: -0.06em;
        line-height: 0.95;
        margin: 0 0 24px;
      }

      .lead {
        color: var(--muted);
        font-size: 20px;
        line-height: 1.6;
        margin: 0 0 32px;
        max-width: 620px;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
      }

      .button {
        border-radius: 16px;
        display: inline-flex;
        font-weight: 800;
        justify-content: center;
        min-width: 172px;
        padding: 16px 20px;
        text-decoration: none;
      }

      .button-primary {
        background: var(--accent);
        color: #ffffff;
      }

      .button-secondary {
        background: #ffffff;
        border: 1px solid rgba(18, 48, 38, 0.12);
        color: var(--accent-dark);
      }

      .booking-card {
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid rgba(18, 48, 38, 0.08);
        border-radius: 32px;
        box-shadow: 0 24px 80px rgba(18, 48, 38, 0.13);
        padding: 28px;
      }

      .card-title {
        font-size: 22px;
        font-weight: 800;
        margin: 0 0 20px;
      }

      .route {
        background: var(--bg);
        border-radius: 22px;
        margin-bottom: 14px;
        padding: 18px;
      }

      .route span {
        color: var(--muted);
        display: block;
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 6px;
        text-transform: uppercase;
      }

      .route strong {
        display: block;
        font-size: 20px;
      }

      .stats {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(3, 1fr);
        margin-top: 34px;
      }

      .stat {
        background: rgba(255, 255, 255, 0.74);
        border: 1px solid rgba(18, 48, 38, 0.08);
        border-radius: 22px;
        padding: 18px;
      }

      .stat strong {
        display: block;
        font-size: 24px;
      }

      .stat span {
        color: var(--muted);
        font-size: 14px;
      }

      @media (max-width: 780px) {
        .nav {
          margin-bottom: 44px;
        }

        .hero,
        .stats {
          grid-template-columns: 1fr;
        }

        .nav-pill {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <nav class="nav" aria-label="Главная навигация">
        <div class="brand">
          <span class="brand-mark">H</span>
          <span>Hamsafar</span>
        </div>
        <span class="nav-pill">carpool_delivery sync</span>
      </nav>

      <section class="hero">
        <div>
          <h1>Междугородные поездки по Таджикистану</h1>
          <p class="lead">
            Hamsafar помогает пассажирам и водителям находить надежные поездки между городами,
            планировать маршрут и видеть статус сервиса прямо в браузере.
          </p>
          <div class="actions" aria-label="Действия">
            <a class="button button-primary" href="/health">Проверить статус</a>
            <a class="button button-secondary" href="/api/status">Открыть API</a>
          </div>
        </div>

        <aside class="booking-card" aria-label="Пример маршрута">
          <p class="card-title">Популярный маршрут</p>
          <div class="route">
            <span>Откуда</span>
            <strong>Душанбе</strong>
          </div>
          <div class="route">
            <span>Куда</span>
            <strong>Худжанд</strong>
          </div>
          <div class="route">
            <span>Статус</span>
            <strong>Сервис готов к запуску</strong>
          </div>
        </aside>
      </section>

      <section class="stats" aria-label="Преимущества">
        <div class="stat">
          <strong>24/7</strong>
          <span>доступность в браузере</span>
        </div>
        <div class="stat">
          <strong>JSON</strong>
          <span>health и API endpoints</span>
        </div>
        <div class="stat">
          <strong>0</strong>
          <span>внешних зависимостей</span>
        </div>
      </section>
    </main>
  </body>
</html>`;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || host}`);

  if (url.pathname === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(homePage);
    return;
  }

  if (url.pathname === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ status: appStatus.status }));
    return;
  }

  if (url.pathname === '/api/status') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(appStatus));
    return;
  }

  response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(port, host, () => {
  console.log(`hamsafar service listening on http://${host}:${port}`);
});
