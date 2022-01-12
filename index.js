const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');

const commands = require('./commands');

module.exports = class Northstar extends Plugin {

    async startPlugin() {
        this.loadStylesheet('style.scss');

        Object.values(commands).forEach(cmd => powercord.api.commands.registerCommand(cmd));
		
	}
    pluginWillUnload() {
        Object.values(commands).forEach(cmd => powercord.api.commands.unregisterCommand(cmd.command));

	}
}