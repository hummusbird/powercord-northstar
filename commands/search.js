const prefix = powercord.api.commands.prefix;
const { diff, getServers } = require(path.resolve(__dirname, 'functions.js'))

module.exports = {
    command: 'search',
    description: 'searches northstar servers',
    usage: '{c} help - for more help',
    autocomplete: (args) => {
        let cvars = [];
        for (i = 0; i < args.length; i ++) {
            if ( i == 0 )
            {
                cvars = ["gamemode","map","name"]
                    .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                    .map((name) => ({ command: name }))
            }
            else if (i == 1)
            {
                switch (args[0])
                {
                    case "modes":
                    case "gamemodes":
                    case "mode":
                        modenames = ["Skirmish", "Amped Hardpoint", "Capture the Flag", "Last Titan Standing", "Pilots v Pilots", "Free For All", "Live Fire", "Marked for Death", "Titan Brawl", "Free Agents", "Gun Game", "Infection", "Titan Tag", "Amped Killrace", "Fastball", "1v1 Arena", "Capture the Flag", "Hide and Seek"]
                        gamemodes = ["tdm","cp","ctf","lts","ps","ffa","speedball","mfd","ttdm","fra","gg","inf","tt","kr","fastball","arena","ctf_comp","hs"]
                        cvars = gamemodes
                            .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                            .map((name) => ({
                                command: name,
                                description: modenames[gamemodes.indexOf(name)]
                            }))
                        break;
                    case "maps":
                    case "map":
                        cvars = ["mp_angel_city","mp_black_water_canal","mp_grave","mp_colony02","mp_complex3","mp_crashsite3","mp_drydock","mp_eden","mp_thaw","mp_forwardbase_kodai","mp_glitch","mp_homestead","mp_relic02","mp_rise","mp_wargames","mp_lobby","mp_lf_deck","mp_lf_meadow","mp_lf_stacks","mp_lf_township","mp_lf_traffic","mp_lf_uma","mp_coliseum","mp_coliseum_column"]
                            .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                            .map((name) => ({ command: name }))
                        break;
                }
            }

        }
        console.log(cvars)
        return {
            commands: cvars,
            header: 'plugin',
        };
    },
    async executor(args) {
        var setvar = "";
        for (var i = 0; i < args.length; i++)
        {
            setvar += args[i] + (args.length == i + 1 ? "" : " ");
        }
        return {
            send: true,
            result: `\`+setplaylistvaroverrides "${setvar}"\``
        }
    }
}