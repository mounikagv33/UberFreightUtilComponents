import { api, LightningElement, track, wire } from 'lwc';
import lookUp from '@salesforce/apex/LookupController.lookUp';

export default class LookUpLwc extends LightningElement {
    @api objectName;
    @api searchLabel;
    @api searchField;
    @api additionalSearchCriteria;
    @api additionalSearchValue;
    @api fieldsToSelect;
    @api iconname;
    @api extraFields;
    @api additionalSearchFields;
    @api required;
    @track searchKey;
    @api selectedRecord;
    @track record;
    @track records;
    @track error;
    @api showVal;
    @track searchCriteriaMap = new Map();
    @track additionalSearchCriteriaMap = new Map();

    onLeave(event) {
        setTimeout(() => {
         this.searchKey = "";
         this.records = null;
        }, 300);
    }

    handleLookUp(event) {
        if (this.searchField && event.detail.value) {
            this.searchCriteriaMap.set(this.searchField, event.detail.value);
        }
        if (this.additionalSearchFields && event.detail.value) {
            var searchFields = [];
            searchFields = this.additionalSearchFields.split(',');
            for (let i=0; i < searchFields.length; i++){
                this.searchCriteriaMap.set(searchFields[i], event.detail.value);
            }
            console.log('searchCriteriaMap',this.searchCriteriaMap);
        }
        if(this.additionalSearchCriteria && this.additionalSearchValue){
            this.additionalSearchCriteriaMap.set(this.additionalSearchCriteria,this.additionalSearchValue);
        }
        const mapToObj = m => {
            return Array.from(m).reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {});
        };

        lookUp({
            objectName : this.objectName,
            fieldsToSelect : this.fieldsToSelect,
            searchCriteriaMap : mapToObj(this.searchCriteriaMap),
            //additionalSearchCriteriaMap : mapToObj(this.additionalSearchCriteriaMap)
        })
        .then(result => {
            this.records = result;
            console.log('records found' + JSON.stringify(this.records));
            if(this.records !== null && this.records !== 'undefined' && this.records != '') {
                for (let i = 0; i < this.records.length; i++){
                    const rec = this.records[i];
                    console.log('Record Id: ' + rec.Id);
                    console.log('Record Val: ' + JSON.stringify(rec));
                    //this.records[i][this.searchField] = rec[this.searchfield];
                }
            }
            this.error = undefined;
            //console.log(' records ', this.records);
        })
        .catch(error => {
            this.error = error;
            this.records = undefined;
            console.log('error found' + this.error);
            this.handleRemove(new CustomEvent());
        });
    }

    handleSelect(event){
        //event.preventDefault();
        const selectedRecordId = event.detail;
        /* eslint-disable no-console*/
        this.selectedRecord = this.records.find( record => record.Id === selectedRecordId);
        const selectedRecordEvent = new CustomEvent(
            "selectedrecord",
            {
                //detail : selectedRecordId
                detail : { recordId : selectedRecordId, index : this.index, record : this.selectedRecord}
            }
        );
        this.dispatchEvent(selectedRecordEvent);
        let rowKeys = Object.keys(this.selectedRecord);
        rowKeys.forEach((rowKey) => {
            if(rowKey  === this.searchField){
                this.showVal = this.selectedRecord[rowKey];
            }
          });
    }

    handleRemove(event){
        //event.preventDefault();
        this.selectedRecord = undefined;
        this.records = undefined;
        this.error = undefined;

        this.searchCriteriaMap = new Map();
        this.additionalSearchCriteriaMap = new Map();
        /* fire the event with the value of undefined for the Selected RecordId */
        const selectedRecordEvent = new CustomEvent(
            "selectedrecord",
            {
                detail : { recordId : undefined, index : this.index, record : undefined}
            }
        );
        this.dispatchEvent(selectedRecordEvent);
        this.showVal = undefined;
    }
}
