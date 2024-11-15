
function HomeHeader({username}){
    
    return(<>                    
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" >Catalogue</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="/trainers/list">All entries</a></li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="/trainers/add">Add entry</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
    
}

export default HomeHeader;