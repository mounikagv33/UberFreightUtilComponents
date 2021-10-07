This component contains reusable LWC methods like null checks, firing custom events, firing event to clos quick action panel.
This component can be leveraged to add additional reusable methods.
Instead of writing multiple lines of code for firing a toast message or any custom event, we can simply fire the event in this util component with single line of code.

Parameters-
--------------------
title - specify the title of toast
message -  specify the toast message
variant - specify the variant of toast like error,success, warning
mode - specify the mode of toast like dismissable, pester , sticky
eventname - specify the name of the event
eventdetail - specify the details of the change event

**Note:-** Make sure to import these methods in parent LWC before firing the events

Below is an example of how to fire these util custom events or null checks in any LWC - 

this.dispatchEvent(showToast('Error','Review Error Messages'+this.errorFields, 'error', 'dismissable'));
this.dispatchEvent(closeQuickAction());
this.dispatchEvent(changeEvent("tenderdetailsevent",this.tenderDetails));
if (checkNullOrEmptyValues(this.errorFields))
