const menus = {
    'main': `
        csv-tool [command] <options>

        create-command .............. creates a command and scafolds a template to edit;

        version ............ show package version
        help ............... show help menu for a command`,

    'merge': `
        csv-tool csv-merge <options>

        --file-path-1 '/to/csv/file1.csv' --file-path-2 '/to/csv/file2.csv'........ location of the csv/'s
    `,

    'create-command': `
        csv-tool create-command
    `,

    'add-output-headers': `
        csv-tool add-headers <options>
    `,

}

module.exports = (args) => {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main)
}
