import { addGooEvent } from "./analytics";
import { apiRequest } from "./api";

const initState = {
  petName: "",
  type: "",
  breed: "",
  gender: "",
  size: "",
  color: "",
  description: "",
  location: "",
  adoptionFee: "",
  spayed: false,
  vaccinated: false,
  trained: [],
  goodWith: [],
  images: [],
  ageNum: "",
  agePeriod: "month(s)",
};

const required = [
  "petName",
  "type",
  "breed",
  "gender",
  "size",
  "color",
  "description",
  "location",
  "adoptionFee",
  "ageNum",
];

// used in Create and Update
// accepts the following paramaters
// apiDeets(obj), setStatus(func), setProcessing(func), typeOfGoogEvent(str), history(from react router)
async function submitHelper(
  apiDeets,
  setStatus,
  setProcessing,
  googEvent,
  history,
  send2Store
) {
  try {
    const { url, token, ...rest } = apiDeets;
    const listing = await apiRequest(url, {
      headers: { Authorization: `Bearer ${token}` },
      ...rest,
    });
    send2Store(listing);
    addGooEvent("Listing", googEvent);
    history.push(`/listing/${listing._id}`);
  } catch (err) {
    console.log(err);
    setProcessing(false);
    addGooEvent("Listing", `Failed ${googEvent}`);
    setStatus({ errorStatus: true, errorMsg: err.message });
  }
}

// state(obj), isFilled(bool), setState(hook func), setStatus(hook func)
function openImgWidget(state, isFormFilled, setState, setStatus) {
  if (state.images.length >= 3) return;
  if (!isFormFilled) return;
  window.cloudinary.openUploadWidget(cloudOpts, (err, { event, info }) => {
    if (event !== "success") return;
    const images = state.images.map(img => ({ ...img }));
    const newImage = {
      public_id: info.public_id,
      path: info.path,
      url: info.secure_url,
      thumb: info.thumbnail_url,
      token: info.delete_token,
    };
    setStatus({ errorMsg: "", errorStatus: null });
    setState({ ...state, images: [...images, newImage] });
  });
}

function stringifyBody(state, owner) {
  const obj = {
    petName: state.petName,
    type: state.type,
    breed: state.breed,
    gender: state.gender,
    size: state.size,
    color: state.color,
    description: state.description,
    location: state.location,
    adoptionFee: state.adoptionFee,
    spayed: state.spayed,
    vaccinated: state.vaccinated,
    goodWith: state.goodWith,
    trained: state.trained,
    images: state.images,
    age: `${state.ageNum} ${state.agePeriod}`,
  };
  return owner ? JSON.stringify({ owner, ...obj }) : JSON.stringify(obj);
}

// used when creating posts
const cloudOpts = {
  cloudName: process.env.REACT_APP_CLOUD_NAME,
  uploadPreset: "default",
  sources: ["local", "camera", "facebook", "instagram"],
  cropping: true,
  croppingAspectRatio: 1.33,
  croppingShowBackButton: true,
  folder: process.env.REACT_APP_CLOUD_FOLDER,
  clientAllowedFormats: ["png", "jpeg"],
  maxFileSize: 2000000,
  singleUploadAutoClose: false,
  styles: {
    palette: {
      window: "#FFFFFF",
      windowBorder: "#3D0043",
      tabIcon: "#D52484",
      menuIcons: "#90007F",
      textDark: "#3D0043",
      textLight: "#FFFFFF",
      link: "#3D0043",
      action: "#FF620C",
      inactiveTabIcon: "#3D0043",
      error: "#EA3E31",
      inProgress: "#0078FF",
      complete: "#20B832",
      sourceBg: "#FFFFFF",
    },
  },
};

export { openImgWidget, stringifyBody, submitHelper, required, initState };
