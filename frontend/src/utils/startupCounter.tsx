import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'startup.json');

export const recordStartup = () => {
  try {
    let data = { count: 0 };

    if (fs.existsSync(filePath)) {
      const json = fs.readFileSync(filePath, 'utf-8');
      data = JSON.parse(json);
    }

    data.count += 1;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Server started ${data.count} times.`);
  } catch (err) {
    console.error('Failed to record startup:', err);
  }
};
