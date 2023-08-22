import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebaseConfig";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { BsCalendar2Date } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import selectImage from "../../assets/images/myImage.svg";
import closeModal from "../../assets/logos/closeModal.svg";
import ReactQuill from "react-quill";
import Dashboard from "../../components/admin/Dashboard";
import { getBlogDetails } from "../../utils/admin/fetchPosts";

const CreatePostStayUpdated = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isModal, setModal] = useState(false);
  const [blog, setBlog] = useState({});
  const [formData, setFormData] = useState({
    header: "",
    date: "",
    imgUrl: null,
    imageTitle: "",
    titleDesc: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);

  const isAuthenticated = localStorage.getItem("isAuth");
  const postCollectionRef = collection(db, "stayUpdated");

  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBlogDetails = async () => {
      const docRef = doc(db, "stayUpdated", `${id}`);
      const blogDetail = await getDoc(docRef);
      const data = blogDetail.data();
      setBlog(blogDetail.data());
      setLoading(false);
      setFormData({ ...data });
      setImage(data.imgUrl); // Set the initial imgUrl
    };

    getBlogDetails();
  }, [id, loading]);

  useEffect(() => {
    const uploadFile = () => {
      if (image) {
        const storageRef = ref(storage, `${image?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);

            switch (snapshot.state) {
              case "paused":
                console.log("upload is paused");
                break;
              case "running":
                console.log("Upload is running", progress);
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              setFormData((prev) => ({ ...prev, imgUrl: downloadUrl }));
            });
          }
        );
      }
    };

    uploadFile();
  }, [image]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      const selectedImage = files[0];
      setImage(selectedImage);
      setFormData((prevData) => ({
        ...prevData,
        imgUrl: selectedImage ? URL.createObjectURL(selectedImage) : null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleQuillChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      body: content,
    }));
  };

  const handleDiscard = () => {
    // Handle discard logic
  };

  const handleSaveAndContinue = async (e) => {
    e.preventDefault();
    const { header, date, imgUrl, imageTitle, titleDesc, body } = formData;

    if (!header || !date || !imageTitle || !titleDesc || !body) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await updateDoc(doc(db, "stayUpdated", id), {
        header,
        date,
        imgUrl: imgUrl || blog.imgUrl, // Maintain previous imgUrl if not changed
        imageTitle,
        titleDesc,
        body,
      });
      setModal(true);
      const timeout = setTimeout(() => {
        navigate("/admin");
      }, 4000);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Dashboard>
      <div className="create-post">
        {isModal && (
          <div className="modal">
            <div className="modal-center">
              <div className="close-btn">
                <img src={closeModal} alt="closeModal" />
              </div>
              <div className="icon">
                <AiOutlineCheckCircle />
              </div>
              <p>Post edited successfully!</p>
              <Link to="/admin" className="button">
                Dashboard
              </Link>
            </div>
          </div>
        )}
        <form>
          <div className="header form-item">
            <label htmlFor="header">Header</label>
            <input
              type="text"
              id="header"
              name="header"
              placeholder="Add title or header"
              value={formData.header}
              onChange={handleChange}
            />
          </div>
          <div className="form-item date-item">
            <label htmlFor="date">Date</label>
            <label htmlFor="date" className="custom">
              {formData.date || "Add or change date"}
              <span>
                <BsCalendar2Date />
              </span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div
            className="image-item background"
            style={{
              backgroundImage: `url(${formData.imgUrl || blog.imgUrl})`,
            }}
          >
            <label htmlFor="image">
              <img src={selectImage} alt="selectImage" />
              <p>{blog.imageTitle || "No Image Selected"}</p>
              <button type="button">{"Replace image"}</button>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          {/* {progress > 0 && (
              <>
                <progress value={progress} max="100" />
                {progress}%
              </>
            )} */}
          <div className="form-item">
            <label htmlFor="image-title">Short Image Title</label>
            <input
              type="text"
              id="image-title"
              name="imageTitle"
              placeholder="Add Short Image Title"
              value={formData.imageTitle}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="title-desc">Short Title Description</label>
            <input
              type="text"
              id="title-desc"
              name="titleDesc"
              placeholder="Add Short Title Description"
              value={formData.titleDesc}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="body">Body Of Article</label>
            <ReactQuill
              className="textarea"
              value={formData.body}
              onChange={handleQuillChange}
            />
          </div>
          <div className="buttons">
            <button className="discard" type="button" onClick={handleDiscard}>
              Discard
            </button>
            <button
              className="submit"
              type="submit"
              onClick={(e) => handleSaveAndContinue(e)}
              // disabled={progress !== null && progress < 100}
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default CreatePostStayUpdated;
