<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('Pages.Login');
});
Route::post('/doLogin','LoginController@doLogin');
// dashboard
Route::get('/Admin/Dashboard','AdminController@dashboard');


// Department
Route::get('/Maintenance/Laboratory','LaboratoryController@lab');
Route::post('/save_Lab','LaboratoryController@save_Lab');
Route::post('/deleteLaboratory','LaboratoryController@deleteLaboratory');
Route::get('/updateLab','LaboratoryController@updateLab');
Route::post('/update_laboratory','LaboratoryController@update_laboratory');

// Employee
Route::get('/Maintenance/EmployeeType','EmployeeController@emptype');
Route::get('/Maintenance/Employee','EmployeeController@emp');
Route::get('/updateEmployeeType','EmployeeController@updateEmployeeType');
Route::post('/save_empType','EmployeeController@save_empType');
Route::post('/update_empType','EmployeeController@update_empType');
Route::post('/deleteEmployeeType','EmployeeController@deleteEmployeeType');
Route::get('/getFields','EmployeeController@getFields');
Route::get('/updateEmpDetails','EmployeeController@updateEmpDetails');
Route::get('/viewEmpDetails','EmployeeController@viewEmpDetails');
Route::post('/update_employee','EmployeeController@update_employee');
Route::post('/deleteEmployee','EmployeeController@deleteEmployee');
Route::post('/save_employee','EmployeeController@save_employee');

//Rebate
Route::get('/Maintenance/RebatePercentage','RebateController@rebatepercent');
Route::post('/save_rebatePercentage','RebateController@save_rebatePercentage');
Route::get('/Maintenance/EmployeeRebate','RebateController@emprebate');
Route::post('/deleteRebate','RebateController@deleteRebate');
Route::post('/save_empRebate','RebateController@save_empRebate');

//Service
// servgroup
Route::get('/Maintenance/ServiceGroup','ServiceController@servgroup');
Route::get('/updateServGroup','ServiceController@updateServGroup');
Route::post('/update_servGroup','ServiceController@update_servGroup');
Route::post('/save_servGroup','ServiceController@save_servGroup');
Route::post('/deleteServiceGroup','ServiceController@deleteServiceGroup');
// servtype
Route::get('/Maintenance/ServiceType','ServiceController@servtype');
Route::get('/updateServType','ServiceController@updateServType');
Route::post('/deleteServiceType','ServiceController@deleteServiceType');
Route::post('/save_servType','ServiceController@save_servType');
Route::post('/update_servType','ServiceController@update_servType');

//Service
Route::get('/Maintenance/Service','ServiceController@serv');
Route::get('/getServiceType','ServiceController@getServiceType');
Route::get('/getService','ServiceController@getService');
Route::post('/update_Service','ServiceController@update_service');
Route::post('/save_Service','ServiceController@save_Service');
Route::post('/deleteService','ServiceController@deleteService');

//Package
Route::get('/Maintenance/Package','PackageController@package');
Route::get('/updatePackage','PackageController@updatePackage');
Route::get('/viewServiceinPackage','PackageController@viewServiceinPackage');
Route::post('/deletePackage','PackageController@deletePackage');
Route::post('/update_package','PackageController@update_package');
Route::post('/save_package','PackageController@save_package');

//Corporate
Route::get('/Maintenance/Corporate','CorporateAccountController@corp');
Route::get('/getTotalPrice','CorporateAccountController@getTotalPrice');
Route::get('/updateCorporate','CorporateAccountController@updateCorporate');
Route::post('/update_Corporate','CorporateAccountController@update_Corporate');
Route::post('/save_corp','CorporateAccountController@save_corp');
Route::post('/deleteCorporate','CorporateAccountController@deleteCorporate');
Route::get('/Maintenance/Corporate/CreatePackage','CorporateAccountController@createpackage');
Route::post('/save_corpPackage','CorporateAccountController@save_corpPackage');
Route::post('/deleteCorporatePackage','CorporateAccountController@deleteCorporatePackage');
Route::get('/updateCorporatePackage','CorporateAccountController@updateCorporatePackage');
Route::post('/update_corpPackage','CorporateAccountController@update_corpPackage');


// Transaction
Route::get('/Transactions/PatientList','TransactionController@patient');
Route::post('/save_patient','TransactionController@save_patient');
Route::get('/Transaction/AvailService','TransactionController@medicalservice');
Route::get('/getDataPackage','TransactionController@getDataPackage');	
Route::get('/getDataService','TransactionController@getDataService');