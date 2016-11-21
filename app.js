const images = require('images');
const gm = require('gm');
const async = require('async');
const args = process.argv.slice(2)[0];

if (args) {
    const title = args.substring(args.indexOf('=') + 1, args.length);

    images('./images/base.png')
        .resize(1280, 720)
        .draw(images('./images/layer.png'), 0, 0)
        .save('./images/thumbnail.jpg');

    let x = 650;
    let y;
    let fontSize;
    const words = title.split(/\s+/);
    const stack = [];

    words.forEach((word, index) => {

        y = 180 * (index + 1);
        y += 60;

        if (word.length === 3) {
            fontSize = 220;
        }

        if (word.length === 4) {
            fontSize = 220;
        }

        if (word.length === 5) {
            fontSize = 180;
        }
        if (word.length === 6) {
            fontSize = 170;
        }
        if (word.length === 7) {
            fontSize = 150;
        }

        if (word.length === 8) {
            y -= 40;
            fontSize = 150;
        }

        if (word.length === 11) {
            y -= 120;
            fontSize = 90;
        }
        console.log(word.length);
        stack.push({
            x: x,
            y: y,
            size: fontSize,
            word: word
        });
    });
    stack.forEach((item, index) => {
        if (item.word.length === 1) {
            if (stack[index - 1]) {
                //Removes item from array with just one letter
                stack[index - 1].word = stack[index - 1].word + ' ' + item.word;
                stack.splice(index, 1);
            }
        }
    });
    writeImage(0);
    console.log('Enjoy your new thumbnail :)');

    function writeImage(index, err) {
        if (err || !validIndex(index)) {
            return;
        }
        if (validIndex(index)) {
            const image = stack[index];
            gm('./images/thumbnail.jpg')
                .stroke("#333")
                .fill('#fff')
                .font('Helvetica.ttf', image.size)
                .drawText(image.x, image.y, image.word)
                .write('./images/thumbnail.jpg', (err) => {
                    if (err) {
                        writeImage(image, err);
                    } else {
                        // No errors to report back
                        writeImage((index + 1));
                    }
                });
        }
    }

    function validIndex(index) {
        if (stack[index] !== undefined) {
            return true;
        } else {
            return false;
        }
    }

} else {
    console.log('Title is required!: node app.js title="Enter the name of the Title"');
}