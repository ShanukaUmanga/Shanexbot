const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const chalk = require('chalk');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');

async function startShanex() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    console.log(chalk.yellow('[⚡] Starting SHANEX-MD Cyber Bot...'));

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        auth: state
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('[⚡] Scan this QR Code to connect WhatsApp:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log(chalk.red('[!] Connection Closed, Reconnecting...'));

            if (reason !== DisconnectReason.loggedOut) {
                startShanex();
            } else {
                console.log(chalk.red('[!] Device Logged Out. Please delete session folder and scan QR again.'));
            }
        } else if (connection === 'open') {
            console.log(chalk.green('[✔] SHANEX-MD Successfully Connected & Online! 🚀'));
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

startShanex();

app.get('/', (req, res) => {
    res.send('Shanexbot is running successfully!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
