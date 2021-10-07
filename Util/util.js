import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const showToast = (title,message,variant,mode) => {
  const evt = new ShowToastEvent({
    title: title,
    message: message,
    mode: mode,
    variant: variant,
  });
  return evt;
}

const closeQuickAction = () => {
  const closeQA = new CustomEvent('close');
  return closeQA;
}

const checkNullOrEmptyValues = (field) => {
  if (field === undefined || field === null || field === '')
    return true;
  else
    return false;
}

const changeEvent = (eventname, eventdetail) => {
  const evt = new CustomEvent(eventname,{detail : eventdetail
  });
  return evt;
}

export { showToast,closeQuickAction,checkNullOrEmptyValues,changeEvent};
