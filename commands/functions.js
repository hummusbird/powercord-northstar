const path = require('path')

const maps = {
    "mp_angel_city": "Angel City",
    "mp_black_water_canal": "Black Water Canal",
    "mp_grave": "Boomtown",
    "mp_colony02": "Colony",
    "mp_complex3": "Complex",
    "mp_crashsite3": "Crashsite",
    "mp_drydock": "DryDock",
    "mp_eden": "Eden",
    "mp_thaw": "Exoplanet",
    "mp_forwardbase_kodai": "Forward Base Kodai",
    "mp_glitch": "Glitch",
    "mp_homestead": "Homestead",
    "mp_relic02": "Relic",
    "mp_rise": "Rise",
    "mp_wargames": "Wargames",
    "mp_lobby": "Lobby",
    "mp_lf_deck": "Deck",
    "mp_lf_meadow": "Meadow",
    "mp_lf_stacks": "Stacks",
    "mp_lf_township": "Township",
    "mp_lf_traffic": "Traffic",
    "mp_lf_uma": "UMA",
    "mp_coliseum": "The Coliseum",
    "mp_coliseum_column": "Pillars"
}

const modes = {
    "tdm": "Skirmish",
    "cp": "Amped Hardpoint",
    "ctf": "Capture the Flag",
    "lts": "Last Titan Standing",
    "ps": "Pilots V Pilots",
    "ffa": "Free For All",
    "speedball": "Live Fire",
    "mfd": "Marked for Death",
    "ttdm": "Titan Brawl",
    "fra": "Free Agents",
    "gg": "Gun Game",
    "inf": "Infection",
    "tt": "Titan Tag",
    "kr": "Amped Killrace",
    "fastball": "Fastball",
    "arena": "1v1 Arena",
    "ctf_comp": "Capture the Flag",
    "hs": "Hide and Seek",
    "hidden": "The Hidden",
    "chamber": "One in the Chamber"
}


function diffred(string){
    return('```diff\n- ' + string + '```')
}
module.exports.diffred = diffred;

function diffgreen(string) {
    return('```diff\n+ ' + string + '```')
}
module.exports.diffgreen = diffgreen;

function diff(string) {
    return ('```diff\n' + string + '```')
}

module.exports.diff = diff;

async function getServers() {
    const url = powercord.pluginManager.get("powercord-northstar").settings.get('defaultMS', 'https://northstar.tf') + "/client/servers"

    try {
        let res = await fetch(url)
        let parsed = await res.json()
        if (parsed && Object.keys(parsed).length === 0 && parsed.constructor === Object) { //API error
            throw ("api error")
        }
        else { //API success
            try {
                return parsed
            }
            catch {
                console.log("invalid api call")
                return `Unable to parse data`
            }
        }
    }
    catch (e) {
        console.log(e)
        return `${url} is unavailable!`
    }
}

module.exports.getServers = getServers;

function getMapName(name) {
    return maps[name]
}
module.exports.getMapName = getMapName;

function getGamemode(mode) {
    return modes[mode]
}

module.exports.getGamemode = getGamemode;

