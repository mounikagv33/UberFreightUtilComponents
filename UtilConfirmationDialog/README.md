A confirmation dialog is a simple dialog that asks the user to confirm an action. 
Confirmation Dialgue is primarly used in quick actions to get users confirmation before proceeding with an irreversible application functionality.
This component can be used on type of sobject.

Parameters
------------------
title - Specify the title of dialogue box
message -  specify the modal message 
confirm-label - Specify the label for confirmation
cancel-label - Specify the label for cancellation
visible - This boolean value controlls the dialogue box visibility
original-message - any event/message/detail to be published back to the parent component

<c-util-confirmation-dialog title='Confirmation Title'
                              message='This action will make current pricing record as active, and update pricing information on Opportunity, Press yes to proceed'
                              confirm-label='Yes'
                              cancel-label='No'
                              visible={isDialogVisible}
                              original-message={originalMessage}
                              name="confirmModal"
                              onclick={handleConfirmationClick}>
  </c-util-confirmation-dialog>
