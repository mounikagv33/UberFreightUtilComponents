Unlike other fields we don't have predefined tag for lookup field in LWC, if you want to achieve lookup functionality in lightning web components we need to write our own code. 
We can use this component with any sobject which supports relationship. This component can be leveraged to add any additional lookup filters.

Below is an example of how to use this child component inside of any parent LWC :- 
field-name --> Relationship Field API Name
object-name --> Object API Name
search-field --> Field to search on parent object
iconname --> object specific icon in lookup list and selected record.
fields-to-select --> Specify the fields that are needed based on the record selection
selected-record -- > If we need to pre populate selected record on load, then we need to assign record id which we should show on lookup.
show-val --> Pre Selected record name

<c-look-up-lwc required=true
              field-name ="Account__c"
              search-label="Account"
              object-name="Account"
              search-field="Name"
              iconname="standard:account"
              fields-to-select="Id,Name"
              data-record-id="account"
              onselectedrecord={handleChange} selected-record={selectedAccount} show-val={accountName} placeholder-text="Search">
</c-look-up-lwc>
