const Router = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;

const Button = window.Reactstrap.Button;
const Form = window.Reactstrap.Form;
const FormGroup = window.Reactstrap.FormGroup;
const Label = window.Reactstrap.Label;
const Input = window.Reactstrap.Input;
const Container = window.Reactstrap.Container
const Row = window.Reactstrap.Row
const Col = window.Reactstrap.Col
const Spinner = window.Reactstrap.Spinner;
const axios = window.axios;

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            rawFile: null,
            predictions: [],
            imageSelected: false,
            analysing: false,
            selectedOption: null,
            sampleImageDiagnosis: "unk"
        }
    }
    // Upload new image from file
    _onFileUpload = (event) => {
        this.setState({
            rawFile: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0]),
            imageSelected: true,
            predictions: [],
            sampleImageDiagnosis: "unk"
        })
    };

    _onSampleImageSelect = (url) => {
        if ((url.length > 5) && (url.indexOf("http") === 0)) {
            this.setState({
                file: url,
                imageSelected: true,
                rawFile: null,
                predictions: [],
            })
        }
    };

    _clear = async (event) => {
        this.setState({
            file: null,
            imageSelected: false,
            predictions: [],
            sampleImageDiagnosis: "unk",
            rawFile: null,
        })
    };

    _predict = async (event) => {
        this.setState({analysing: true});
        let resPromise = null;
        if (this.state.rawFile) {
            const data = new FormData();
            data.append('file', this.state.rawFile);
            resPromise = axios.post('/api/classify', data);
        } else {
            resPromise = axios.get('/api/classify', {
                params: {
                    url: this.state.file
                }
            });
        }
        try {
            const res = await resPromise;
            const payload = res.data;
            this.setState({predictions: payload, analysing: false});
        } catch (err) {
            alert(err)
        }
    };

    sampleImageSelected  = (item) => {
        this._onSampleImageSelect(item.url);
        this.setState({sampleImageDiagnosis: item.diagnosis})
    };
    
    render() {
        return (
            <div>

                <h3 className="content-title">{APP_CONFIG.description}</h3>

                <Container class="container">
                    <Row>
                        <Col className="col1-margins">
                            
                            <TestSet sampleImageSelected={this.sampleImageSelected}/>
                        </Col>

                        <Col className="col2-margins">
                            <Form>
                                <h5 className="col2-title">Or upload a new image:</h5>

                                <FormGroup id={"upload_button"}>
                                    <Label for="imageUpload">
                                        <Input type="file" name="file" id="imageUpload" accept=".png, .jpg, .jpeg" ref="file" onChange={this._onFileUpload}/>
                                        <span className="btn btn-primary btn-upload">Upload</span>
                                    </Label>
                                </FormGroup>

                                <div className="img-container">
                                    {this.state.file && <img src={this.state.file} className={"img-preview"} />}
                                </div>
                                
                                <FormGroup>
                                    <Button color="success" disabled={this.state.analysing || !this.state.imageSelected} onClick={this._predict}>Predict</Button>
                                    <span className="p-1"/>
                                    <Button color="danger" onClick={this._clear}> Clear</Button>
                                </FormGroup>

                                {this.state.analysing && <Spinner className="spinner"/>}
                            </Form>
                        </Col>

                        <Col className="col3-margins">
                            <Results result={this.state.predictions} sampleImageDiagnosis={this.state.sampleImageDiagnosis}/>
                        </Col>
                        
                    </Row>

                    <Row>
                        <Description />
                    </Row>

                </Container>
            </div>
        );
    }
}