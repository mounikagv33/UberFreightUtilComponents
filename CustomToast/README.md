Toast Messages are not supported in Lightning Out. In such scenarios we need to create a custom taost component to fire the toast messages.
For ex: - For authenticated sit guest users, we cant directly invoke the LWC. We need the help of lightning out. 
In order to display toast messages for the guest user form, we can make use of this component inside of Parent LWC Component
Below is an example of how to invoke the child component to display a toast error : -
this.template.querySelector('c-custom-toast').showToast('error', this.errorFields);
