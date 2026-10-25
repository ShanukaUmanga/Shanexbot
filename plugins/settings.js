const config = require('../settings'); // ඔබේ සෙටින්ග්ස් ෆයිල් එකට අදාළ පාත් එක

module.exports = async (context, m, { conn, text, mek }) => {
    try {
        const prefix = /^[./!#%^&,]/gi.test(m.body) ? m.body.match(/^[./!#%^&,]/gi)[0] : '.';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

        if (['settings', 'setting', 'panel', 'botset'].includes(cmd)) {
            
            // සයිබර් තීම් එකට ගැලපෙන ප්‍රිමියම් පෙනුම (Cyber-Hacker Style Panel)
            let settingsText = `
╔═══════════════════════════╗
║   ⚙️  **SHANEX-MD SETTINGS PANEL**  ⚙️   ║
╚═══════════════════════════╝

🍀 **BOT NAME:** SHANEX-MD CYBER
🍀 **WORK TYPE:** ${config.WORK_TYPE || 'private'}
🍀 **AI CHAT:** ${config.AI_CHAT || 'off'}
🍀 **ANTI DELETE:** ${config.ANTI_DELETE || 'off'}
🍀 **AUTO STATUS:** ${config.AUTO_STATUS || 'off'}
🍀 **AUTO REACT:** ${config.AUTO_REACT || 'off'}
🍀 **BOT PRESENCE:** ${config.PRESENCE || 'online'}
🍀 **FONT STYLE:** ${config.FONT_STYLE || 'default'}

 ═════════════════════════
 🎛️ **SELECT OPTION BY NUMBER** 🔻
 ═════════════════════════

🛠️ **MAIN SETTINGS**
1 | Public Mode
2 | Private Mode
3 | Inbox Only
4 | Groups Only

🤖 **AI & TOOLS**
5 | Enable AI Chat
6 | Disable AI Chat
7 | Anti-Delete: OFF
8 | Anti-Delete: Inbox Only
9 | Anti-Delete: Groups Only
10 | Anti-Delete: Both (Inbox+Group)

🌐 **LANGUAGE TRANSLATE**
11 | Translation: OFF
12 | English (English)
13 | Sinhala (සිංහල)
14 | Tamil (தமிழ்)
15 | Hindi (हिंदी)
16 | Japanese (日本語)

✍️ **FONT STYLING**
17 | Font: Default
18 | Font: Monospace
19 | Font: Serif Bold
20 | Font: Italic

⭐ **BOT PRESENCE**
21 | Always Online
22 | Always Offline
23 | Auto Typing
24 | Auto Recording

👁️ **AUTO FUNCTIONS**
25 | Auto Status View ON
26 | Auto Status View OFF
27 | Auto Status React ON
28 | Auto Status React OFF

 ═════════════════════════
 © **SHANEX-MD Cyber Bot v2.0.0**
 ⚡ *Powered by Cyber Hacker Team* 🌐
`;

            // සයිබර් තීම් එකට ගැළපෙන ලස්සන බැනර් ඉමේජ් එකක් සමඟ යැවීම
            let buttonMessage = {
                image: { url: 'https://i.ibb.co/30Z3s45/cyber-banner.jpg' }, // ඔබේ බෝට් ලෝගෝ හෝ බැනර් ලින්ක් එක මෙතැනට දෙන්න
                caption: settingsText,
                footer: '© SHANEX-MD SYSTEM',
                headerType: 4
            };

            await conn.sendMessage(m.from, buttonMessage, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        m.reply(`❌ Error: ${e}`);
    }
};
