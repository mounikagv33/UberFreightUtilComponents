import { LightningElement, api, track} from 'lwc';
const DELAY = 300;
const pageNumber = 1;
const showIt = 'visibility:visible';
const hideIt = 'visibility:hidden'; //visibility keeps the component space, but display:none doesn't

export default class UtilPaginator extends LightningElement {
    @api showSearchBox = false; //Show/hide search box; valid values are true/false
    @api showPagination; //Show/hide pagination; valid values are true/false
    @api pageSizeOptions ; //Page size options; valid values are array of integers
    @api totalRecords; //Total no.of records; valid type is Integer
    @api records; //All records available in the data table; valid type is Array
    @track pageSize; //No.of records to be displayed per page
    @track totalPages; //Total no.of pages
    @track pageNumber = pageNumber; //Page number
    @track searchKey; //Search Input
    @track controlPagination = showIt;
    @track controlfirst = true;
    @track controlPrev = true;
    @track controlNext = false;
    @track controlLast = false;
    recordsToDisplay = []; //Records to be displayed on the page
    searchedRecords = [];

    //Called after the component finishes inserting to DOM
    connectedCallback() {
        if(this.pageSizeOptions && this.pageSizeOptions.length > 0)
            this.pageSize = this.pageSizeOptions[0];
        else{ //if no pageSizeOptions declared in the parent component then this will display all records without pagination
            this.pageSize = this.totalRecords;
            this.showPagination = false;
        }
        this.controlPagination = this.showPagination === false ? hideIt : showIt;
        this.searchedRecords = this.records;
        this.setRecordsToDisplay();
    }
    //To refresh & sort data - Start
    @api
    refreshData(newRecords){
        this.searchedRecords = newRecords;
        this.controlPagination = showIt;
        this.totalRecords = newRecords.length
        this.setRecordsToDisplay();
    }
    @api
    sortData(records,fieldName,reverse){
        let data_clone = JSON.parse(JSON.stringify(records));
        this.searchedRecords = data_clone.sort(this.sortBy(fieldName, reverse));
        this.controlPagination = showIt;
        this.totalRecords = this.searchedRecords.length
        this.setRecordsToDisplay();
    }
    // END

    handleRecordsPerPage(event){
        this.pageSize = event.target.value;
        this.setRecordsToDisplay();
    }
  handlePageNumberChange(event) {
      //keycode 13 is for enter or return button click
        if(event.keyCode === 13){
            this.pageNumber = event.target.value;
            this.setRecordsToDisplay();
        }
    }
    previousPage(){
        this.pageNumber = this.pageNumber-1;
        this.setRecordsToDisplay();
    }
    nextPage(){
        this.pageNumber = this.pageNumber+1;
        this.setRecordsToDisplay();
    }
     firstPage(){
        this.pageNumber = 1;
        this.setRecordsToDisplay();
    }
     lastPage(){
        this.pageNumber = this.totalPages;
        this.setRecordsToDisplay();
    }
    setRecordsToDisplay(){
        this.recordsToDisplay = [];
        if(!this.pageSize)
            this.pageSize = this.totalRecords;

        this.totalPages = Math.ceil(this.totalRecords/this.pageSize);

        this.setPaginationControls();

        for(let i=(this.pageNumber-1)*this.pageSize; i < this.pageNumber*this.pageSize; i++){
            if(i === this.totalRecords) break;
            this.recordsToDisplay.push(this.searchedRecords[i]);
        }
        let selectedEvent = new CustomEvent('paginatorchange', {detail: this.recordsToDisplay});
        this.dispatchEvent(selectedEvent); //Send records to display on table to the parent component
    }
    setPaginationControls(){
        //Control Pre/Next buttons visibility by Total pages
        if(this.totalPages === 1){
            this.controlfirst = true;
            this.controlPrev = true;
            this.controlNext = true;
            this.controlLast = true;
        }else if(this.totalPages > 1){
           this.controlfirst = false;
           this.controlPrev = false;
           this.controlNext = false;
           this.controlLast = false;
        }
        //Control Pre/Next buttons visibility by Page number
        if(this.pageNumber <= 1){
            this.pageNumber = 1;
            this.controlfirst = true;
            this.controlPrev = true;

        }else if(this.pageNumber >= this.totalPages){
            this.pageNumber = this.totalPages;
           this.controlNext = true;
           this.controlLast = true;
        }
        //Control Pre/Next buttons visibility by Pagination visibility
        if(this.controlPagination === hideIt){
            this.controlfirst = true;
            this.controlPrev = true;
            this.controlNext = true;
            this.controlLast = true;

        }
    }
    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        var searchRecs = [];
        var recordsSent = [];
        if(searchKey){
            this.delayTimeout = setTimeout(() => {
              this.controlPagination = showIt;
              this.searchKey = searchKey;
              this.searchedRecords = this.records.filter(rec => JSON.stringify(rec).toLowerCase().includes(searchKey.toLowerCase()));
              this.totalRecords = this.searchedRecords.length
              this.setRecordsToDisplay();
            }, DELAY);

        }else{
            this.searchedRecords = this.records;
            this.controlPagination = showIt;
            this.totalRecords = this.records.length
            this.setRecordsToDisplay();
        }
    }
    sortBy(field, reverse, primer){

        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
}