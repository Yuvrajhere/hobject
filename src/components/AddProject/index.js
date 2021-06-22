import "./AddProject.css";

import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addProject, editProject } from "../../redux/app/appActions";

import { uuid } from "uuidv4";

// images
import plusIcon from "../../assets/icons/plus.png";
import minusIcon from "../../assets/icons/minus.png";
import { connect } from "react-redux";
import { useEffect } from "react";

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchToProps = {
  addProject,
  editProject
};

function AddProject(props) {
  const [projectData, setProjectData] = useState({
    name: "",
    desc: "",
    imageInput: "",
    images: [],
  });

  const history = useHistory();
  const { projectId } = useParams();
  const { projects } = props;

  useEffect(() => {
    if (projectId !== "new") {
      const tempProjectData = projects.find((x) => String(x.id) === projectId);
      setProjectData(projectData => ({
        ...projectData,
        ...tempProjectData
      }));
    }
  }, [projectId, projects]);

  const handleInputChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectId !== "new") {
      saveProject();
    } else {
      addNewProject();
    }
  };

  const addNewProject = () => {
    if (projectData.desc.length < 150) {
      alert("Description length should be atleast 150 characters.");
      return;
    }

    const data = {
      id: uuid(),
      name: projectData.name,
      addedDate: new Date(),
      editedDate: null,
      desc: projectData.desc,
      images: [...projectData.images],
    };

    props.addProject(data);
    setProjectData({
      name: "",
      desc: "",
      imageInput: "",
      images: [],
    });

    history.push("/")
    alert("Project Added!")
  };

  const addImage = (e) => {
    e.preventDefault();

    if (projectData.images.find((ele) => ele === projectData.imageInput)) {
      alert("Image Link already added!");
      return;
    }

    if (projectData.imageInput.length < 1) {
      alert("Image Link cant be empty");
      return;
    }
    const newImages = [...projectData.images];
    newImages.push(projectData.imageInput);
    setProjectData({
      ...projectData,
      images: newImages,
      imageInput: "",
    });
  };

  const removeImage = (e, image) => {
    e.preventDefault();
    const newImages = [...projectData.images];
    newImages.splice(projectData.images.indexOf(image), 1);
    setProjectData({
      ...projectData,
      images: newImages,
    });
  };

  const ignoreInputChange = (e) => {};

  const saveProject = (e) => {
    console.log("Yo");
    if (projectData.desc.length < 150) {
      alert("Description length should be atleast 150 characters.");
      return;
    }

    const data = {
      ...projectData,
      editedDate: new Date()
    }

    props.editProject(data);
    history.push(`/project/${projectData.id}`)
    alert("Project Edited!")
  };

  return (
    <div className="AddProject container-1">
      <div className="container-2">
        <h2>{projectId === "new" ? "Add a new Project" : "Edit Project"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="name-input">
            <label htmlFor="name">Project Title</label>
            <input
              id="name"
              name="name"
              value={projectData.name}
              required
              placeholder="enter project title here"
              onChange={handleInputChange}
            />
          </div>
          <div className="desc-input">
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              name="desc"
              value={projectData.desc}
              placeholder="enter description here"
              minLength="150"
              maxLength="500"
              required
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="image-input">
            <label htmlFor="image">Image Link</label>
            {projectData.images.map((image) => (
              <div key={image} className="image-link">
                <input value={image} onChange={ignoreInputChange} />
                <button
                  onClick={(e) => {
                    removeImage(e, image);
                  }}
                  className="btn"
                >
                  <img src={minusIcon} alt="minus" />
                </button>
              </div>
            ))}
            <div className="image-input-new">
              <input
                id="imageInput"
                name="imageInput"
                value={projectData.imageInput}
                placeholder="enter project title here"
                onChange={handleInputChange}
              />
              <button onClick={addImage} className="btn">
                <img src={plusIcon} alt="plus" />
              </button>
            </div>
          </div>
          <div className="buttons">
            <button className="submit">Submit</button>
            <p onClick={() => history.goBack()}>Go Back</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
