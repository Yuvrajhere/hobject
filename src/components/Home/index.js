import "./Home.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

// icons
import plusIcon from "../../assets/icons/plus.png";
import shortArrowRightIcong from "../../assets/icons/short_arrow_right.png";

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

function Home(props) {
  return (
    <div className="Home container-1">
      <div className="add-project-action container-2">
        <p>
          <span>Hey User,</span> Want to add a new project?
        </p>
        <Link to="/addproject/new">
          <button>
            <img src={plusIcon} alt="plus" /> Add Project
          </button>
        </Link>
      </div>

      <div className="projects container-3">
        <div className="header">
          <h2>Your projects</h2>
          <p>{props.projects.length + " projects"}</p>
        </div>
        {props.projects.length > 0 ? (
          <div className="projects-list">
            {props.projects.map((project) => (
              <div key={project.id} className="project-card">
                <h2>{project.name}</h2>
                <p className="added">{new Date(project.addedDate).toLocaleString()}</p>
                <p className="desc">{project.desc}</p>
                <Link to={`/project/${project.id}`} title="view more">View More <img src={shortArrowRightIcong} alt="arrow right" /></Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-projects-msg">You have not added any projects yet.</p>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(Home);
