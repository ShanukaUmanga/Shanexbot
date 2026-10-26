const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Render හි Port අවශ්‍යතාවය සඳහා වෙබ් සර්වර් එක
app.get('/', (req, res) => {
    res.send('Shanexbot is running successfully!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// බෝට්ගේ ප්‍රධාන ක්‍රියාකාරීත්වය ආරම්භ කිරීම සඳහා start.js ෆයිල් එක සම්බන්ධ කිරීම
require('./start.js');
