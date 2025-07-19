import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'startup.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      let data = { count: 0 };

      if (fs.existsSync(filePath)) {
        const json = fs.readFileSync(filePath, 'utf-8');
        data = JSON.parse(json);
      }

      data.count += 1;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      res.status(200).json({ message: 'Startup recorded', count: data.count });
    } catch (err) {
      res.status(500).json({ error: 'Failed to record startup' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
