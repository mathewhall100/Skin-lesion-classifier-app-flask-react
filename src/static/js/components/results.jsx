class Results extends React.Component {

    renderActual = () => {
        return (
            <table>
                <tbody>
                    <tr>
                        <td style={{minWidth: "120px"}}>
                            Actual: 
                        </td>
                        <td>
                            {this.capitalise(this.props.sampleImageDiagnosis)}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    renderPrediction = () => {
        let result = this.props.result || []
        let predClass, predProb
        console.log("RESULT: ", result)
        if (result.class === "0") {predClass = "Benign nevus"} 
            else if (result.class === "1") {predClass = "Malignant melanoma"}
            else {predClass = "unknown"}
        predProb = `(${result.predictions[0].prob} : ${result.predictions[1].prob})`

        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            Prediction:  
                        </td>
                        <td style={{color: predClass==="Benign nevus" ? "green" : "red"}}>
                            {predClass} 
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Probability:
                        </td>
                        <td style={{color: predClass==="Benign nevus" ? "green" : "red"}}>
                            {predProb}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    capitalise = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    

    render() {
        return (
            <div>
                <div className="web">
                    <h5 style={{marginBottom: "15px"}}>Result:</h5>     
                    <hr />
                </div>

                <div className="mobile">
                    <hr />
                    <h5 style={{marginBottom: "15px"}}>Result:</h5>
                    <br />
                </div>
                
                <div className="result-display">

                    {this.props.sampleImageDiagnosis !== "unk" ? this.renderActual() : null}
                    {this.props.result && this.props.result.predictions && this.props.result.predictions.length > 0 ? this.renderPrediction() : null}
                </div>
            </div>
        );
    }
}