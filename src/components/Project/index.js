import "./Project.css";

import { useParams, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { useEffect } from "react";
import { useState } from "react";
import { deleteProject } from "../../redux/app/appActions";

import plusIcon from "../../assets/icons/plus.png";
import editIcon from "../../assets/icons/edit.png";
import trashIcon from "../../assets/icons/trash.png";

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchToProps = {
  deleteProject,
};

function Project(props) {
  const { projectId } = useParams();

  const [projectDetails, setProjectDetails] = useState(null);

  const { projects } = props;

  const history = useHistory();

  useEffect(() => {
    const tempProjectDetails = projects.find((x) => String(x.id) === projectId);
    setProjectDetails(tempProjectDetails);
  }, [projectId, projects]);

  const deleteProject = (e) => {
    e.preventDefault();
    props.deleteProject(projectDetails.id);
    history.push("/");
    alert("Project deleted!");
  };

  return (
    <div className="Project container-1">
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

      {projectDetails != null ? (
        <div className="project-details container-3">
          <h2>{projectDetails.name}</h2>
          <div>
            <p className="added">
              {new Date(projectDetails.addedDate).toLocaleString()} - Created
            </p>
            {projectDetails.editedDate && (
              <p className="edited">
                {new Date(projectDetails.editedDate).toLocaleString()} - Edited
              </p>
            )}
          </div>
          <p className="desc">{projectDetails.desc || ""}</p>
          <div className="images">
            {projectDetails.images &&
              projectDetails.images.map((image) => {
                return <img key={image} src={image} alt="project" />;
              })}
          </div>
          <div className="buttons">
            <div>
              <Link to={`/addproject/${projectDetails.id}`}>
                <button className="edit">
                  <img src={editIcon} alt="edit" /> Edit
                </button>
              </Link>
              <button onClick={deleteProject} className="delete">
                <img src={trashIcon} alt="delete" /> Delete
              </button>
            </div>
            <p onClick={() => history.goBack()}>Go Back</p>
          </div>
        </div>
      ) : (
        <div>Fetching your data!</div>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
