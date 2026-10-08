export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  const { number } = req.query;
  const key = req.query.key || req.query.slug || null;

  if (!number) {
    return res.status(400).json({
      status: "error",
      message: "number parameter required",
      developer: "@FLASH_OWERR",
      youtube: "https://youtube.com/@mtrx_villan?si=6w03fkhTHLdVzBQU"
    });
  }

  if (!key) {
    return res.status(401).json({
      status: "error",
      message: "key required",
      developer: "@FLASH_OWERR",
      youtube: "https://youtube.com/@mtrx_villan?si=6w03fkhTHLdVzBQU"
    });
  }

  if (!key.startsWith('ADITYA-')) {
    return res.status(401).json({
      status: "error",
      message: "invalid key",
      developer: "@FLASH_OWERR"
    });
  }

  try {
    const upstream = await fetch(
      `https://numberinfo-api-adibhai.vercel.app/api/number?number=${encodeURIComponent(number)}`
    );
    const data = await upstream.json();

    return res.status(200).json({
      status: data.status || "success",
      number: data.number || number,
      data: data.data || null,
      developer: "@FLASH_OWERR",
      youtube: "https://youtube.com/@mtrx_villan?si=6w03fkhTHLdVzBQU"
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "upstream fetch failed",
      developer: "@FLASH_OWERR",
      youtube: "https://youtube.com/@mtrx_villan?si=6w03fkhTHLdVzBQU"
    });
  }
}
