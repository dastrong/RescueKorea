// return a promise that we'll handle in our components
export function fetcher(url, opts) {
  return fetch(`${process.env.REACT_APP_API_ROUTE}${url}`, {
    method: opts.method || "get",
    headers: { "Content-Type": "application/json", ...opts.headers },
    body: opts.body,
  });
}

export function stringifyBody(state, owner) {
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
  return owner
    ? JSON.stringify({
        owner,
        ...obj,
      })
    : JSON.stringify(obj);
}

// returns true for the following format xxx@xx.xx
export function validateEmail(email) {
  var re = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return re.test(String(email).toLowerCase());
}

// returns an obj with:
// array of required fields names that weren't filled
// and errorStatus and errorMsg
export function checkRequiredFields(state) {
  const formErrors = Object.entries(state)
    .filter(obj => requiredFields.includes(obj[0]))
    .filter(x => !x[1].length)
    .map(y => y[0]);
  const errorStatus = !!formErrors.length;
  const errorMsg = !errorStatus
    ? ""
    : `You left ${formErrors.length} required fields empty ${
        formErrors.includes("images") ? "(including at least 1 image uploaded)" : ""
      }`;
  return { formErrors, errorStatus, errorMsg };
}

export const initialFormState = {
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

// used when creating posts
const requiredFields = [
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
  "images",
];

// used when creating posts
export const cloudinaryOptions = {
  cloudName: process.env.REACT_APP_CLOUD_NAME,
  uploadPreset: "default",
  sources: ["local", "camera", "facebook", "instagram"],
  cropping: true,
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
