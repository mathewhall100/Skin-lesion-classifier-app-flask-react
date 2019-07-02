const Container = window.Reactstrap.Container
const Row = window.Reactstrap.Row
const Col = window.Reactstrap.Col

class TestSet extends React.Component {

    sampleImgSelected = (img) => {
        console.log(img)
        this.props.sampleImageSelected(img)
    }

    render() {
        const sampleImages = APP_CONFIG.skinLesionSampleImages;

        return (
            <div> 
                
                <h5 style={{marginBottom: "15px"}}>Select a sample image:</h5>

                <div class='samples-container'>
                    <Container>
                        <Row>
                            <Col className='sampleImg'> 
                                <img src={sampleImages[0].url} width='100%' height="125px" onClick={()=>this.sampleImgSelected(sampleImages[0])} />
                            </Col>
                            <Col className='sampleImg'> 
                                <img src={sampleImages[1].url} width='100%' height="125px" onClick={()=>this.sampleImgSelected(sampleImages[1])} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='sampleImg'> 
                                <img src={sampleImages[2].url} width='100%' height="125px" onClick={()=>this.sampleImgSelected(sampleImages[2])} />
                            </Col>
                            <Col className='sampleImg'> 
                                <img src={sampleImages[3].url} width='100%' height="125px" onClick={()=>this.sampleImgSelected(sampleImages[3])} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='sampleImg'> 
                                <img src={sampleImages[4].url} width='100%' height="125px" onClick={()=>this.sampleImgSelected(sampleImages[4])} />
                            </Col>
                            <Col className='sampleImg'> 
                                <img src={sampleImages[5].url} width='100%' height="125px" onClick={()=>this.sampleImgSelected(sampleImages[5])} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='sampleImg'> 
                                <img src={sampleImages[6].url} width='100%' height="125px" onClick={()=>this.sampleImgSelected(sampleImages[6])} />
                            </Col>
                            <Col className='sampleImg'> 
                                <img src={sampleImages[7].url} width='100%' height="125px" onClick={()=>this.sampleImgSelected(sampleImages[7])} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}