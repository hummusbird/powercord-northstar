const prefix = powercord.api.commands.prefix;
const { diff, diffred, getServers, getMapName, getGamemode } = require(path.resolve(__dirname, 'functions.js'))
const url = "https://cors-anywhere.herokuapp.com/https://northstar.tf/client/servers"

module.exports = {
    command: 'search',
    description: 'searches northstar servers',
    usage: '{c} help - for more help',
    autocomplete: (args) => {
        let autocorrect = []
        for (i = 0; i < args.length; i ++) {
            if ( i == 0 )
            {
                autocorrect = ["gamemode","map","name"]
                    .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                    .map((name) => ({ command: name }))
            }
            else if (i == 1)
            {
                switch (args[0])
                {
                    case "modes":
                    case "gamemode":
                    case "mode":
                        modenames = ["Skirmish", "Amped Hardpoint", "Capture the Flag", "Last Titan Standing", "Pilots v Pilots", "Free For All", "Live Fire", "Marked for Death", "Titan Brawl", "Free Agents", "Gun Game", "Infection", "Titan Tag", "Amped Killrace", "Fastball", "1v1 Arena", "Capture the Flag", "Hide and Seek", "The Hidden", "One in the Chamber"]
                        gamemodes = ["tdm","cp","ctf","lts","ps","ffa","speedball","mfd","ttdm","fra","gg","inf","tt","kr","fastball","arena","ctf_comp","hs","hidden","chamber"]
                        autocorrect = gamemodes
                            .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                            .map((name) => ({
                                command: name,
                                description: modenames[gamemodes.indexOf(name)]
                            }))
                        break;
                    case "maps":
                    case "map":
                        autocorrect = ["mp_angel_city","mp_black_water_canal","mp_grave","mp_colony02","mp_complex3","mp_crashsite3","mp_drydock","mp_eden","mp_thaw","mp_forwardbase_kodai","mp_glitch","mp_homestead","mp_relic02","mp_rise","mp_wargames","mp_lobby","mp_lf_deck","mp_lf_meadow","mp_lf_stacks","mp_lf_township","mp_lf_traffic","mp_lf_uma","mp_coliseum","mp_coliseum_column"]
                            .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                            .map((name) => ({ command: name }))
                        break;
                    case "name":
                    case "title":
                        autocorrect = []
                            .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                            .map((name) => ({ command: name }))
                               
                }
            }
            else
            {
                autocorrect = []
                    .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                    .map((name) => ({ command: name }))
            }

        }
        return {
            commands: autocorrect,
            header: 'plugin',
        };
    },
    async executor(args) {
        var data = await getServers(url)

            if (!args[0]) {
                return {
                    send: false,
                    result: diffred("Please specify title, map or mode.")
                }
            }
            else {
                var search = args[1];
                var parameter = "name";
                if (args[0] == "title" || args[0] == "name") {
                    if (!args[1]) { return { send: false, result: diffred("Please specify a search term.") } }
                    parameter = "name"
                }
                else if (args[0] == "map" || args[0] == "maps") {
                    if (getMapName(args[1]) == undefined) { return { send: false, result: diffred("Please specify a valid map.") } }
                    parameter = "map"
                }
                else if (args[0] == "mode" || args[0] == "modes" || args[0] == "gamemode"){
                    if (getGamemode(args[1]) == undefined) { return { send: false, result: diffred("Please specify a valid gamemode.") } }
                    parameter = "playlist"
                }

                else { search = args[0] }

                if (typeof data == typeof "string") {
                    return {
                        send: false,
                        result: diffred(data)
                    }
                }
                var playersOnline = 0;
                var playerSlots = 0;
                var lobbies = [];
                for (i = 0; i < data.length; i++) {
                    playersOnline += data[i]["playerCount"]
                    playerSlots += data[i]["maxPlayers"]
                    if (data[i][parameter].toLowerCase().includes(search.toLowerCase())) {
                        lobbies.push(data[i])
                    }
                }

                if (lobbies.length == 0) {
                    return { send: false, result: diffred("No servers were found") }
                }
                else {
                    var searchstring = `\`\`\`diff\nSearching for ${search}...\n+ ${lobbies.length} servers were found${lobbies.length > 10 ? " - displaying first 10 results" : "."}\n`
                    var search_playersOnline = 0;
                    var search_playerSlots = 0;
                    try {
                        for (i = 0; i < lobbies.length; i++) {
                            search_playersOnline += lobbies[i]["playerCount"]
                            search_playerSlots += lobbies[i]["maxPlayers"]
                            if (i < 10) { searchstring += `
${lobbies[i]["name"]}
${lobbies[i]["playerCount"] == lobbies[i]["maxPlayers"] ? "-" : "+"} ${lobbies[i]["playerCount"]}/${lobbies[i]["maxPlayers"]} players connected
${lobbies[i]["map"] == "mp_lobby" ? "- Currently in the lobby\n" : `+ Playing ${getGamemode(lobbies[i]["playlist"])} on ${getMapName(lobbies[i]["map"])}${lobbies[i]["hasPassword"] ? `\n- PASSWORD PROTECTED!` : ""}
`}`}

                        }
                    }
                    catch {
                        searchstring = "```diff\n- Search failed. Please try again"

                    }
                    var ratingstring = diff(`\nTotal ${search_playersOnline}/${search_playerSlots} players in "${search}" servers, for:\n\n+ ${search_playersOnline}/${playersOnline} or ${Math.round((search_playersOnline / playersOnline)*10000)/100}% of all NS players\n\n- ${lobbies.length}/${data.length} or ${Math.round((lobbies.length / data.length)*10000)/100}% of all NS servers`)
                    console.log(args)
                    return { send: true, result: (((args[1] && args[1] == "stats") || (args[2] && args[2] == "stats")) ? ratingstring : searchstring + "```") }
                }
            }

    }
}