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
        case 'create-command' :
            require('./cmd/create-command')(args)
            break;

        case 'process-csv' :
            require('./cmd/Csv/process')(args)
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
