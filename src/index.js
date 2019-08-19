const minimist = require('minimist');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    let cmd = args._[0];

    if (args.version || args.v) {
        cmd = 'version';
    }

    if (args.help || args.h) {
        cmd = 'help';
    }

    switch(cmd) {
        case 'merge' :
            require("./cmd/Csv/Merge")(args)
            break;

        case 'to-array' :
            require("./cmd/Algorithms/ToArray")(args)
            break;

        case 'find-not-in-lists' :
            require("./cmd/Algorithms/NotInBothLists")(args)
            break;

        case 'match-product-to-category' :
            require("./cmd/Csv/Merge")(args)
            break;

        case 'version':
            require('./cmd/version')(args)
            break;

        case 'help':
            require('./cmd/help')(args)
            break;

        default:
            console.log(`"${cmd}" is not a valid command`);
            break;
    }
}
