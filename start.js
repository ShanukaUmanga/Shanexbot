const express = require('express');
const app = express();
const path = require('path');
const pairRouter = require('./pair');

const PORT = process.env.PORT || 8000;

// Static files (Web Page)
app.use(express.static(path.join(__dirname, 'public')));

// Pairing Code Route
app.use('/pair', pairRouter);

app.listen(PORT, () => {
    console.log(`[⚡] SHANEX-MD Web Server running on port ${PORT}`);
});
