const ReactMarkdown = window.ReactMarkdown;

class Github extends React.Component {

    render() {
        return (

            <div style={{textAlign: "left"}}>
                <br />
                <br />
                <h3 className="mobile-title">Repositories</h3> 
                <br />
                <ReactMarkdown source={window.APP_CONFIG.code}/>
            </div>
        );
    }
}