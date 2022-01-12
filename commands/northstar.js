const prefix = powercord.api.commands.prefix;
path = require('path');
const { diff, diffred, getServers } = require(path.resolve(__dirname, 'functions.js'))
const url = "https://northstar.tf/clientservers "//powercord.pluginManager.get("powercord-northstar").settings.get('defaultMS', 'https://northstar.tf') + "/client/servers"

module.exports = {
    command: 'ns',
    description: 'A powercord version of northstar-bot',
    usage: '{c} help - for more help',
    autocomplete: (args) => {
        let ns = [];
        for (i = 0; i < args.length; i ++) {
            if (i == 0){
                let cmds = ["status","help","convars","modes","maps","host","git","birb"]
                let descriptions = ["List of help commands", "lists some useful convars", "lists all Titanfall2 gamemodes", "lists all Titanfall2 maps", "links hummusbird's server tutorial", "links the latest northstar release", "links hummusbird's server tutorial"]
                ns = cmds
                    .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                    .map((name) => ({ 
                        command: name,
                        description: descriptions[cmds.indexOf(name)]
                    }))
            }
            else 
            {
                ns = []
                    .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                    .map((name) => ({ command: name }))
            }

        }

        return {
            commands: ns,
            header: 'plugin',
        };
    },
    async executor(args) {
        switch (args[0]) {

            case "help":

                return {
                    send: false,
                    result: diff(`
+ Here are a list of all available commands:
${prefix}ns status              - a general overview of northstar.tf
${prefix}ns help                - this message
${prefix}search title [string]  - searches server titles
${prefix}search mode [gamemode] - searches all servers running that mode
${prefix}search map [map]       - searches all servers running that map
${prefix}set [playlistvar]      - creates a setplaylistvaroverride
${prefix}ns pvars               - lists some useful ConVars
${prefix}ns modes               - lists all Titanfall 2 gamemodes
${prefix}ns maps                - lists all Titanfall 2 maps
${prefix}ns host                - links hummusbird's server tutorial
${prefix}ns git                 - links the latest northstar release
`)
                }
            default:
            case "status":
                var data = await getServers(url)

                if (typeof data == typeof "string") {
                    return {
                        send: false,
                        result: diffred(data)
                    }
                }
                else {
                    var playersOnline = 0;
                    var protectedLobbies = 0;
                    var playerSlots = 0;
                    for (i = 0; i < data.length; i++) {
                        var hasPwd = data[i]["hasPassword"]

                        protectedLobbies += hasPwd ? 1 : 0;
                        playersOnline += hasPwd ? 0 : (data[i]["playerCount"] == undefined ? 0 : data[i]["playerCount"]);
                        playerSlots += hasPwd ? 0 : data[i]["maxPlayers"];
                    }
                    return {
                        send: powercord.pluginManager.get("powercord-northstar").settings.get('public', 'false'),
                        result: diff(`
## ${url} STATUS: ##\n
+ Servers Online: ${data.length}\n
- Password Protected Servers: ${protectedLobbies}\n
+ Players in-game: ${playersOnline}/${playerSlots} (${Math.round((playersOnline / playerSlots) * 100)}%)
`)
                    }
                }

            case "gamemode":
            case "mode":
            case "gamemodes":
            case "modes":
                return {
                    send: powercord.pluginManager.get("powercord-northstar").settings.get('public', 'false'),
                    result: diff(`
+ Titanfall 2 Gamemodes:
tdm       - Skirmish
cp        - Amped Hardpoint
ctf       - Capture the Flag
lts       - Last Titan Standing
ps        - Pilots V Pilots
ffa       - Free For All
speedball - Live Fire
mfd       - Marked for Death
ttdm      - Titan Brawl
fra       - Free Agents
gg        - Gun Game
inf       - Infection
tt        - Titan Tag
kr        - Amped Killrace
fastball  - Fastball
arena     - 1v1 Arena
ctf_comp  - Capture the Flag
hs        - Hide and Seek
hidden    - The Hidden
chamber   - One in the Chamber`)
                }

            case "map":
            case "maps":
                return {
                    send: powercord.pluginManager.get("powercord-northstar").settings.get('public', 'false'),
                    result: diff(`
+ Titanfall 2 Maps:
mp_angel_city        - Angel City
mp_black_water_canal - Black Water Canal
mp_grave             - Boomtown
mp_colony02          - Colony
mp_complex3          - Complex
mp_crashsite3        - Crashsite
mp_drydock           - DryDock
mp_eden              - Eden
mp_thaw              - Exoplanet
mp_forwardbase_kodai - Forward Base Kodai
mp_glitch            - Glitch
mp_homestead         - Homestead
mp_relic02           - Relic
mp_rise              - Rise
mp_wargames          - Wargames
mp_lobby             - Lobby
mp_lf_deck           - Deck
mp_lf_meadow         - Meadow
mp_lf_stacks         - Stacks
mp_lf_township       - Township
mp_lf_traffic        - Traffic
mp_lf_uma            - UMA
mp_coliseum          - The Coliseum
mp_coliseum_column   - Pillars`)
                }

            case "host":
            case "vid":
            case "birb":
                return { send: powercord.pluginManager.get("powercord-northstar").settings.get('public', 'false'), result: "https://youtu.be/EZ3w2Nl9SZo" }
            
            case "git":
                return { send: powercord.pluginManager.get("powercord-northstar").settings.get('public', 'false'), result: "https://github.com/R2Northstar/Northstar/releases" }
            case "cvars":
            case "convars":
            case "vars":
            case "playlistvars":
            case "pvars":
                return {
                    send: powercord.pluginManager.get("powercord-northstar").settings.get('public', 'false'),
                    result: diff(`
custom_air_accel_pilot
pilot_health_multiplier
run_epilogue
respawn_delay

boosts_enabled
earn_meter_pilot_overdrive
earn_meter_pilot_multiplier

earn_meter_titan_multiplier
aegis_upgrades
infinite_doomed_state
titan_shield_regen

scorelimit
roundscorelimit
timelimit
oob_timer_enabled
roundtimelimit

classic_rodeo
classic_mp
fp_embark_enabled
promode_enable

riff_floorislava
featured_mode_all_holopilot
featured_mode_all_grapple
featured_mode_all_phase
featured_mode_all_ticks
featured_mode_tactikill
featured_mode_amped_tacticals
featured_mode_rocket_arena
featured_mode_shotguns_snipers
iron_rules

riff_player_bleedout
player_bleedout_forceHolster
player_bleedout_forceDeathOnTeamBleedout
player_bleedout_bleedoutTime
player_bleedout_firstAidTime
player_bleedout_firstAidTimeSelf
player_bleedout_firstAidHealPercent
player_bleedout_aiBleedingPlayerMissChance`)
                }
        }
    }
}