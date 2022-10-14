import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';
const save = throttle((key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}, 500);

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

initPage();

const onFormInput = event => {
  const { name, value } = event.target;

  try {
    let saveData = load(LOCALE_STORAGE_KEY);
    saveData = saveData ? saveData : {};
    saveData[name] = value;
    save(LOCALE_STORAGE_KEY, saveData);
  } catch (error) {
    console.error(error);
  }
};

formRef.addEventListener('input', onFormInput);

function initPage() {
  const saveData = load(LOCALE_STORAGE_KEY);
  if (!saveData) {
    return;
  }
  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

const handleSubmit = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
};

formRef.addEventListener('submit', handleSubmit);
