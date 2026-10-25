const os = require('os');

module.exports = {
    // Command Name
    name: 'alive',
    alias: ['status', 'runtime'],
    description: 'Check if the bot is online',
    
    run: async (sock, mek, m, { reply }) => {
        // Calculate Uptime
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        // Cyber Styled Alive Message
        let aliveText = `
👋 *HI, PRO BOT 🔥 I'M ALIVE NOW 🤖*

┌  「 *DATE INFORMATION* 」
│ 📅 *Date:* ${new Date().toLocaleDateString()}
│ ⏰ *Time:* ${new Date().toLocaleTimeString()}
└─────────────────────

┌  「 *STATUS DETAILS* 」
│ 👤 *User:* SHANEX-MD ⚡
│ 💻 *Owner:* Shanuka Umanga
│ 🔑 *Prefix:* .
│ 🧬 *Version:* v1.0.0
│ 🎈 *Platform:* ${os.platform()}
│ ⏱️ *Uptime:* ${hours} hours ${minutes} minutes ${seconds} seconds
└─────────────────────

┌  「 *MAIN COMMANDS* 」
│ 💡 Some commands you can use:
│ 🔸 .menu
│ 🔸 .alive
│ 🔸 .system
└─────────────────────

© *SHANEX-MD Cyber Bot v1.0.0*
_Crafted by Shanuka Umanga_ 🛡️
        `.trim();

        // Send Image with Alive Caption
        await sock.sendMessage(m.chat, {
            image: { url: 'https://raw.githubusercontent.com/shanexstudio/SHANEX-MD/07dd6099e75ba96f31c8b43a21ead2fb7c30a192/Shanex%20Studio%20Cyber-Gold%20Banner.png' },
            caption: aliveText
        }, { quoted: mek });
    }
};
