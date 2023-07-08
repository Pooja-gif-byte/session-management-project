<script>
    var jpdbBaseURL="http://api.jsonpowerdb.com:5572";
    var connToken="90932861|-31949280222049110|90950753";
    var jpdbIRL="/api/irl";
    var jpdbIML="/api/iml";
    var empDBName="SAMPLE";
    var empRelationName="Project-table";

    setBaseUrl(jpdbBaseURL);
    
    function disableCtrl(ctrl){
        $("#new").prop("disabled",ctrl);
        $("#save").prop("disabled",ctrl);
        $("#edit").prop("disabled",ctrl);
        $("#change").prop("disabled",ctrl);
        $("#reset").prop("disabled",ctrl);
    }

    function disableNav(ctrl){
        $("#first").prop("disabled",ctrl);
        $("#prev").prop("disabled",ctrl);
        $("#next").prop("disabled",ctrl);
        $("#last").prop("disabled",ctrl);  
    }

    function disableForm(bValue){
        $("#EmployeeID").prop("disabled",bvalue);
        $("#EmployeeName").prop("disabled",bvalue);
        $("#Salary").prop("disabled",bvalue);
        $("#HRA").prop("disabled",bvalue);
        $("#DA").prop("disabled",bvalue);
        $("#Deduction").prop("disabled",bvalue);
    }

    function initEmpForm(){
        localStorage.removeItem("first_rec_no");
        localStorage.removeItem("last_rec_no");
        localStorage.removeItem("rec_no");

        console.log("initEmpForm() -done");
        //alert ("initEmpForm() -done");
    }

$("#empId").focus();
function validateAndGetFormData() {
var EmployeeIDVar = $("#EmployeeID").val();
if (EmployeeIDVar === "") {
alert("Employee ID is Required Value");
$("#EmployeeID").focus();
return "";
}
var EmployeeNameVar = $("#EmployeeName").val();
if (EmployeeNameVar === "") {
alert("Employee Name is Required Value");
$("#EmployeeName").focus();
return "";
}
var SalaryVar = $("#Salary").val();
if (SalaryVar === "") {
alert("Salary is Required Value");
$("#Salary").focus();
return "";
}
var HRAVar = $("#HRA").val();
if (HRAVar === "") {
alert("HRA is Required Value");
$("#HRA").focus();
return "";
}
var DAVar = $("#DA").val();
if (DAVar === "") {
alert("DA is Required Value");
$("#DA").focus();
return "";
}
var DeductionVar = $("#Deduction").val();
if (DeductionVar === "") {
alert("Deduction is Required Value");
$("#Deduction").focus();
return "";
}

var jsonStrObj = {
EmployeeID: EmployeeIDVar,
EmployeeName:EmployeeNameVar,
Salary:SalaryVar,
HRA:HRAVar,
DA:DAVar,
Deduction:DeductionVar
};
return JSON.stringify(jsonStrObj);
}

function getFirst(){
 var getFirstRequest=createFIRST_RECORDRequest(connToken,empDBName,empRelationName);
jQuery.ajaxSetup({asyn:false}); 
var result=executecommand(getFirstRequest,irlPartUrl);
showData(result);
jQuery.ajaxSetup({async:true});
$("#EmployeeID").prop("disabled",true);
$("#first").prop("disabled",true);
$("#prev").prop("disabled",true);
$("#next").prop("disabled",true);
$("#save").prop("disabled",true);
}

function getPrev(){
    var r=getCurrRecNoFromLS();
   if (r==1)
    {
 $("#first").prop("disabled",true);
$("#prev").prop("disabled",true);
    }
    var getPrevRequest=createPREV_RECORDRequest(connToken,empDBName,empRelatonName);
jQuery.ajaxSetup({asyn:false}); 
var result=executecommand(getLastRequest,irlPartUrl);
showData(result);
jQuery.ajaxSetup({async:true});
setLastRecNo2LS(result);
showData(result);
jQuery.ajaxSetup({async:true});
var r=getCurrRecordNoFromLS();
if(r==1){
$("#first").prop("disabled",true);
$("#prev").prop("disabled",true);
}
$("#save").prop("disabled",true);
}


function getNext(){
var r =getCurrRecNoFromLS();

var getPrevRequest=createNEXT_RECORDRequest(connToken,empDBName,empRelationName);
jQuery.ajaxSetup({asyn:false});
var result=executeCommand(getPrevRequest,irlPartUrl);
showData(result);
jQuery.ajaxSetup({async:true});

$("#save").prop("disabled",true);
}
function isNORecordPresentLS() {
    if(getFirstRecNoFromLS()==="0" && getLastRecNoFromLS()==="0"){
        return true;
    }
    return false;
}
function isOnlyOneRecordPresentLS(){

}
function getLast(){
var getLastRequest=createLAST_RECORDRequest(connToken,empDBName,empRelatonName);
jQuery.ajaxSetup({asyn:false}); 
var result=executecommand(getLastRequest,irlPartUrl);
showData(result);
jQuery.ajaxSetup({async:true});
setLastRecNo2LS(result);
showData(result);
jQuery.ajaxSetup({async:true});
$("#EmployeeID").prop("disabled",false);
$("#first").prop("disabled",false);
$("#prev").prop("disabled",true);
$("#next").prop("disabled",true);
$("#save").prop("disabled",true);

}

// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
var putRequest = "{\n"
+ "\"token\" : \""
+ connToken
+ "\","
+ "\"dbName\": \""
+ dbName
+ "\",\n" + "\"cmd\" : \"PUT\",\n"
+ "\"rel\" : \""
+ relName + "\","
+ "\"jsonStr\": \n"
+ jsonObj
+ "\n"
+ "}";
return putRequest;
}

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
var url = dbBaseUrl + apiEndPointUrl;
var jsonObj;
$.post(url, reqString, function (result) {
jsonObj = JSON.parse(result);
}).fail(function (result) {
var dataJsonObj = result.responseText;
jsonObj = JSON.parse(dataJsonObj);
});
return jsonObj;
}
function editData(){
    disableForm(false);
    $("#EmployeeID").prop("disabled",false);
    $("#EmployeeName").focus();

    disableNav(true);
    disableCtrl(true);
    $("#change").prop("#disabnled",false);
    $("#reset").prop("#disabnled",false); 
}
function changeData(){
    jsonChg = validateAndGetFormData()
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, empDBName, empRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#empid").focus();
    $("#edit").focus();
}
function resetForm() {
$("#EmployeeID").val("")
$("#Emp52loyeeName").val("");
$("#Salary").val("");
$("#HRA").val("");
$("#DA").val("");
$("#Deduction").val("");
$("#empId").focus();
}
function saveData() {
var jsonStr = validateAndGetFormData();
if (jsonStr === "") {
return;
}
var putReqStr = createPUTRequest("90932861|-31949280222049110|90950753",
jsonStr, "EMP-DB", "EmpData");
alert(putReqStr);
jQuery.ajaxSetup({async: false});
var resultObj = executeCommand(putReqStr,
"http://api.login2explore.com:5577", "/api/iml");
alert(JSON.stringify(resultObj));
jQuery.ajaxSetup({async: true});
resetForm();
}
</script>