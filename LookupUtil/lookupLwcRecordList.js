import { LightningElement, api, track } from 'lwc';
import { checkNullOrEmptyValues } from 'c/util';

export default class LookupLwcRecordList extends LightningElement {
    @api record;
    @api fieldname;
    @api iconname;
    @track rowVal;
    @api extraFields;
    cityVal;
    countryVal;
    stateVal;

    connectedCallback() {
        var array = [];
        let rowKeys = Object.keys(this.record);
        if (!checkNullOrEmptyValues(this.extraFields)) {
            array = this.extraFields.split(',');
        }
        rowKeys.forEach((rowKey) => {
            if (rowKey != 'Id' && array.includes(rowKey)) {
                if(this.showVal !== undefined)
                    this.showVal += ' | ' + this.record[rowKey];
                else
                    this.showVal = this.record[rowKey];
                console.log('this.showVal',this.showVal);
            }
            else if (rowKey === this.fieldname) {
                this.showVal = this.record[rowKey];
            }
        });
    }

    handleSelect(event){
        event.preventDefault();
        console.log('here' + JSON.stringify(this.record));
        const selectedRecord = new CustomEvent(
            "select",
            {
                detail : this.record.Id
            }
        );
        console.log( this.record.Id);
        this.dispatchEvent(selectedRecord);
    }
}