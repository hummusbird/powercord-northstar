const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');

const Settings = require('./components/Settings')
const commands = require('./commands');

module.exports = class PowercordNorthstar extends Plugin {

    async startPlugin() {
        this.loadStylesheet('style.scss');

        Object.values(commands).forEach(cmd => powercord.api.commands.registerCommand(cmd));
		
        powercord.api.settings.registerSettings(this.entityID, {
			category: this.entityID,
			label: 'Northstar',
			render: Settings
		});
	}
    pluginWillUnload() {
        Object.values(commands).forEach(cmd => powercord.api.commands.unregisterCommand(cmd.command));
        powercord.api.settings.unregisterSettings(this.entityID);
	}
}