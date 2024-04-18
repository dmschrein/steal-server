import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';  // use promises for async handling
import fsSync from 'fs';       // to check directory existence synchronously

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvents = async (message, logFileName) => {
    const dateTime = `${new Date().toISOString()}`;
    const logItem = `${dateTime}\t${message}\n`;
    const logFilePath = path.join(__dirname, '..', 'logs', logFileName);

    try {
        if (!fsSync.existsSync(path.dirname(logFilePath))) {
            await fs.mkdir(path.dirname(logFilePath), { recursive: true });
        }
        await fs.appendFile(logFilePath, logItem);
    } catch (err) {
        console.error('Error writing to log file', err);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    next();
};

export { logEvents, logger };
