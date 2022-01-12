const { React, getModule } = require('powercord/webpack');
const { Divider, Tooltip, Button } = require('powercord/components');
const { SwitchItem, TextInput, SelectInput, Category, SliderInput } = require('powercord/components/settings');

const { AsyncComponent } = require("powercord/components")
module.exports = AsyncComponent.from((async () => {
    return class NorthstarSettings extends React.PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                public: this.props.getSetting('public', true),
                msurl: this.props.getSetting('defaultMS', 'https://northstar.tf'),
            };
        }

        render() {
            return <>
                <div>
                    <TextInput
                            note="Default masterserver URL"
                            defaultValue={this.state.msurl}
                            onChange={(value) => {
                                this.setState({ msurl: value })
                                this.props.updateSetting('defaultMS', value)
                            }}
                        >
                    </TextInput>
                </div>
            </>
        }
    }
})
    ()
)