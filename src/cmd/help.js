const menus = {
    'main': `
        csv-tool [command] <options>

        csv-merge .............. merges data from two csv/'s;
        version ............ show package version
        help ............... show help menu for a command`,

    'csv-merge': `
        csv-tool csv-merge <options>

        --file-path-1 '/to/csv/file1.csv' --file-path-2 '/to/csv/file2.csv'........ location of the csv/'s
    `,
}

module.exports = (args) => {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];

    console.log(menus[subCmd] || menus.main)

}
