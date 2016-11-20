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

    let x = 800;
    let y;
    let fontSize = 300;
    const words = title.split(/\s+/);
    const stack = [];

    words.forEach((word, index) => {

        y = 150 * (index + 1);
        if (words.length === 3) {
            y += 110;
        }

        if (word.length === 5) {
            fontSize = 150;
        }
        if (word.length === 6) {
            fontSize = 140;
        }
        stack.push({
            x: x,
            y: y,
            size: fontSize,
            word: word
        });
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