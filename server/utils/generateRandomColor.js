function hexa(){
        const r = Math.floor(Math.random() * 256);
        return  r.toString(16).padStart(2, '0');
}

function generateRandomColor(){
        return `#${hexa()}${hexa()}${hexa()}`;
}

module.exports = {generateRandomColor};