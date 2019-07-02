const Router = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;

// Obtain the root
const rootElement = document.getElementById('root');

// APP functional component with routes
function App() {
    return (
        <div className="body">
            <div className="content"> 
                <CustomNavBar/>
                <Router> 
                    <main role="main" className="container">
                        <Route exact path="/" component={MainContent}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/github" component={Github}/>
                    </main>
                </Router>
            </div> 
            <footer className="footer">
                <p>All rights reserved, 2019 &nbsp;&nbsp;<span>|</span> &nbsp;&nbsp;Not for medical use.</p>
            </footer>
        </div>
    )
}

// Load config file and assign to window.APP_CONFIG
(async () => {
    const response = await fetch('/config');
    const body = await response.json();

    window.APP_CONFIG = body;

    // Use ReactDOM.render to show your component on the browser
    ReactDOM.render(
        <App/>,
        rootElement
    )
})();


