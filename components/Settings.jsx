const { React, getModule } = require('powercord/webpack');
const { Divider, Tooltip, Button } = require('powercord/components');
const { SwitchItem, TextInput, SelectInput, Category, SliderInput } = require('powercord/components/settings');

const { AsyncComponent } = require("powercord/components")
module.exports = AsyncComponent.from((async () => {
    return class NorthstarSettings extends React.PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                public: this.props.getSetting('public', false),
                msurl: this.props.getSetting('defaultMS', 'https://northstar.tf'),
            };
        }

        render() {
            return <>
                <div>
                    <SwitchItem
                        note="Send powercord-northstar messages publically"
                        value={this.state.public}
                        onChange={() => {
                            this.setState({ public: !this.state.public })
                            this.props.toggleSetting('public')
                        }}
                    >
                        Public messages
                    </SwitchItem>
                </div>
            </>
        }
    }
})
    ()
)