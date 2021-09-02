import React from 'react'

const scaleNames = { c: "Celsius", f: "Farenheit" }
class TemparatureInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { temperature: "" };
        this.handleChange = this.handleChange.bind(this);


    }
    handleChange(e) {
        //this.setState({temparature:e.target.value});
        console.log('Handle change in temperature input'+e.target.value)
        this.props.onTemparatureChange(e.target.value);
    }
    render() {
        //const temparature=this.state.temparature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter Teparature in {scaleNames[scale]}</legend>
                <input value={temperature} onChange={this.handleChange}></input>
            </fieldset>
        )
    }


}
export default TemparatureInput
