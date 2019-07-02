const ReactMarkdown = window.ReactMarkdown;

class About extends React.Component {

    render() {
        return (

            <div style={{textAlign: "left"}}>
                <br />
                <br />
                <h3 className="mobile-title">About</h3> 
                <br/>
                <br />
                <ReactMarkdown source={window.APP_CONFIG.about}/>
            </div>
        );
    }
}
