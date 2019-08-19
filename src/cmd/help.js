const menus = {
    'main': `
        csv-tool [command] <options>

        merge .............. merges data from two csv's and exports to the ./csv folder;

        version ............ show package version
        help ............... show help menu for a command`,

    'merge': `
        csv-tool csv-merge <options>

        --file-path-1 '/to/csv/file1.csv' --file-path-2 '/to/csv/file2.csv'........ location of the csv/'s
    `,

    'replace': `
        csv-tool replace <options>
    `,

    'add-headers': `
        csv-tool add-headers <options>
    `,

    'not-in-both-lists': `
        csv-tool find-in <options>
    `,

}

module.exports = (args) => {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main)
}
