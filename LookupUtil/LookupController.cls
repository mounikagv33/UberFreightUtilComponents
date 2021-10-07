public with sharing class LookupController {  
   private static final Integer numOfRecordsLimit = 5;
 
    @AuraEnabled
    public static List<sObject> lookUp(String objectName, String fieldsToSelect, Map<string,string> searchCriteriaMap , Map<string,string> additionalSearchCriteriaMap) {
        String filterCondition = '';
        String lookUpQuery = null;
        
        List<sObject> lookUpList = null;
        if(searchCriteriaMap!= Null && searchCriteriaMap.size() == 1 ){
            filterCondition = new List<String>(searchCriteriaMap.keySet())[0] + ' LIKE \'' + searchCriteriaMap.values()[0]+'%\'';
        }
        else if(searchCriteriaMap!= Null &&  searchCriteriaMap.size() > 1 ){
            for(String apiName : searchCriteriaMap.keySet()){
                if(filterCondition != '' && filterCondition != NULL){
                    filterCondition = filterCondition+' OR '+ apiName+ ' LIKE \'' + searchCriteriaMap.get(apiName)+'%\'';
                }
                else{
                    filterCondition =  apiName+ ' LIKE \'' + searchCriteriaMap.get(apiName)+'%\'';
                }
            }
        }
        
        if(additionalSearchCriteriaMap != null && additionalSearchCriteriaMap.size() == 1 ){
            filterCondition += filterCondition != '' ?  ' AND ' : '';
            filterCondition += new List<String>(additionalSearchCriteriaMap.keySet())[0] + '=\'' + additionalSearchCriteriaMap.values()[0] + '\'';
        }
        
        if(String.isNotBlank(filterCondition))
            lookUpQuery = 'Select '+ fieldsToSelect + ' FROM ' + objectName +' WHERE '+ filterCondition +' LIMIT  ' + numOfRecordsLimit; 
        else 
            lookUpQuery = 'Select '+ fieldsToSelect + ' FROM '+ objectName +' WHERE LastViewedDate != null ORDER BY LastViewedDate DESC LIMIT  ' + numOfRecordsLimit; 
    
        try {
            system.debug('lookUpQuery'+lookUpQuery);
            lookUpList = Database.query(lookUpQuery);
        }
        catch(Exception e){
            System.debug('Error querying for lookup data for Object: ' + objectName + '\n' + 'filterCondition: ' + filterCondition);
        }
        return lookUpList;  
    }
}