const prefix = powercord.api.commands.prefix;
const { diff, getServers } = require(path.resolve(__dirname, 'functions.js'))
const cvarlist = `custom_air_accel_pilot
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
player_bleedout_aiBleedingPlayerMissChance
max_players`

const cvardesc = `Air acceleration for pilots and titans
Pilot health multiplier
Whether to run the endgame epilogue
Respawn delay in seconds
Whether pilots can use their boosts
Whether the titan/boost meter uses overdrive
Multiplier for titans and boosts
Multiplier for titan cores
Enable titan Aegis upgrades
Force titans to be doomed
Enable titan shield regeneration
Match scorelimit
Round scorelimit
Match timelimit
Whether the out-of-bounds timer is enabled
Round timelimit
Enable TF1 style rodeo
Enable TF1 style multiplayer
Enable first-person embarks and executions
Enable promode
Sets a thick electric fog on the floor
All pilots are holo
All pilots are grapple
All pilots are phase
All pilots are tick
Tactikill mode
Amped mode
Rocket arena mode
Shotguns & Snipers mode
TTDM mode
Enable bleedout & revive
player_bleedout_forceHolster
player_bleedout_forceDeathOnTeamBleedout
player_bleedout_bleedoutTime
player_bleedout_firstAidTime
player_bleedout_firstAidTimeSelf
player_bleedout_firstAidHealPercent
player_bleedout_aiBleedingPlayerMissChance
Maximum players. Use -maxplayersplaylist too`

module.exports = {
    command: 'set',
    description: 'setplaylistvaroverrides',
    usage: '{c} help - for more help',
    autocomplete: (args) => {
        let cvars = [];
        for (i = 0; i < args.length; i ++) {
            if ( i % 2 == 0 )
            {
                cvars = cvarlist.split("\n")
                    .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                    .map((name) => ({
                        command: name,
                        description: cvardesc.split("\n")[cvarlist.split("\n").indexOf(name)]
                    }))
            }
            else
            {
                cvars = []
                    .filter((name) => {name = name.toLowerCase();return name.startsWith(args[i])})
                    .map((name) => ({ command: name }))
            }
        }

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
