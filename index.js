const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const chalk = require('chalk');
const { Boom } = require('@hapi/boom');

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
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log(chalk.red('[!] Connection Closed, Reconnecting...'));
            
            if (reason !== DisconnectReason.loggedOut) {
                startShanex();
            } else {
                console.log(chalk.red('[!] Device Logged Out. Please delete session folder and scan QR again.'));
            }
        } else if (connection === 'open') {
            console.log(chalk.green('[✓] SHANEX-MD Successfully Connected & Online! 🚀'));
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

startShanex();
