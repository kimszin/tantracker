import server from '../dist/server/server.js';

export default function handler(req: any, res: any) {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const url = new URL(req.url, `${protocol}://${host}`);

  const webReq = new Request(url.href, {
    method: req.method,
    headers: req.headers,
    body: (req.method !== 'GET' && req.method !== 'HEAD') ? req : undefined,
    duplex: 'half'
  } as RequestInit);

  server.fetch(webReq).then(async (webRes: Response) => {
    res.status(webRes.status);
    webRes.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    if (webRes.body) {
      if (typeof webRes.body.pipeTo === 'function') {
        const reader = webRes.body.getReader();
        const pump = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
          }
          res.end();
        };
        pump().catch((e) => {
          console.error(e);
          res.status(500).end();
        });
      } else {
        const text = await webRes.text();
        res.send(text);
      }
    } else {
      res.end();
    }
  }).catch((e: Error) => {
    console.error(e);
    res.status(500).end();
  });
}
