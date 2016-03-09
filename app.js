var images = require('images');
var gm = require('gm');
var args = process.argv.slice(2);
args = args[0];

if (args) {
    var title = args.substring(args.indexOf('=') + 1, args.length);

    images('./images/base.png')
        .resize(1280, 720)
        .draw(images('./images/layer.png'), 0, 0)
        .save('./images/output.jpg');

    var wordCount = title.split(/\s+/).length;

    var x = 0;
    var y = 92;
    var fontSize = 100;

    switch (wordCount) {
        case 2:
            x = 170
            break;
        case 3:
            if (title.length > 15) {
                x = 25;
            } else {
                x = 180;
            }
            break;
        case 4:
            x = 0;
            break;
        case 5:
            fontSize = 80;
            x = 0;
            break;
    }

    gm('./images/output.jpg')
        .stroke("#7EB2E5")
        .fill('#233140')
        .font('Helvetica.ttf', fontSize)
        .drawText(x, y, title)
        .write('./images/output.jpg', function (err) {
            if (!err) console.log('done');
        });

} else {
    console.log('Title is required!: use title="enter title here"');
}
