const express = require('express');
const app = express();
const path = require('path');
const pairRouter = require('./pair');
const PORT = process.env.PORT || 8000;

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const chalk = require('chalk');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');

// Static files (Web Page)
app.use(express.static(path.join(__dirname, 'public')));

// Pairing Code Route
app.use('/pair', pairRouter);

app.listen(PORT, () => {
    console.log(`[⚡] SHANEX-MD Web Server running on port ${PORT}`);
});

// WhatsApp Bot Connection Logic
async function startShanex() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    console.log(chalk.yellow('[⚡] Starting SHANEX-MD Cyber Bot...'));

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        auth: state,
        printQRInTerminal: true
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
                console.log(chalk.red('[!] Device Logged Out. Please scan QR again.'));
            }
        } else if (connection === 'open') {
            console.log(chalk.green('[✔] SHANEX-MD Successfully Connected & Online! 🚀'));
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            // බෝට්ගේ කමාන්ඩ් සහ ප්ලගින්ස් ක්‍රියාත්මක වන ප්‍රධාන කොටස මෙහි රන් වේ
        } catch (err) {
            console.log(err);
        }
    });
}

startShanex();
