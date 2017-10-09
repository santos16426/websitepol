$('#generatebtn').click(function(){
	var report = $('#selectrange').val();
    var start_date = $('#start_date_date').val();
    var monthly = $('#monthly_date').val();
    var yearly = $('#yearly_date').val();
    var rangestart = $('#rangestart_date').val();
	var rangeend = $('#rangeend_date').val();
	var total = 0;
	var charge = 0;
	if(report == 'daily')
	{
		if(start_date != '')
		{
			
			t.clear().draw();
			$.ajax
			({
				url: '/dailyTransactionReport',
				type: 'get',
				data:  { start_date:start_date},
				dataType : 'json',
				success:function(response){
					response[0].forEach(function(data){
						total = data.total*1;
						charge = data.charge *1;
						total = total +charge;

						Highcharts.chart('piecharts', {
					        chart: {
					            plotBackgroundColor: null,
					            plotBorderWidth: null,
					            plotShadow: false,
					            type: 'pie'
					        },
					        title: {
					            text: 'Transaction Report as of '+start_date
					        },
					        tooltip: {
					            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					        },
					        plotOptions: {
					            pie: {
					                allowPointSelect: true,
					                cursor: 'pointer',
					                dataLabels: {
					                    enabled: false
					                },
					                showInLegend: true
					            }
					        },
					        series: [{
					            name: 'Patient Type',
					            colorByPoint: true,
					            data: 
					            [{
				                	name: 'Corporate Patient',
				                	y: corporate()
				                },{
				                	name: 'Individual Patient',
				                	y: individual()
					            }]
					        }]
					    });
						Highcharts.chart('barcharts', {
						    chart: {
						        type: 'column'
						    },
						    title: {
						        text: 'Daily Transaction as of '+ start_date
						    },
						    
						    xAxis: {
						        categories: [
						            start_date
						        ],
						        crosshair: true
						    },
						    yAxis: {
						        min: 0,
						        title: {
						            text: 'Income (pesos)'
						        }
						    },
						    tooltip: {
						        headerFormat: '<span style="font-size:10px">Date: {point.key}</span><table>',
						        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						            '<td style="padding:0"><b>{point.y:.2f} pesos</b></td></tr>',
						        footerFormat: '</table>',
						        shared: true,
						        useHTML: true
						    },
						    plotOptions: {
						        column: {
						            pointPadding: 0.2,
						            borderWidth: 0
						        }
						    },
						    series: [{
						        name: 'Total Income',
						        data: [total]

						    }]
						});
					})//end for function response
					function corporate(){

						return response[3];
					}
					function individual()
					{
						return response[2];
					}
					response[1].forEach(function(data){
						t.row.add([
							data.trans_id,
							data.trans_date,
							data.trans_total + data.charge,
							'<a class="btn btn-primary btn-xs printTrans" data-id="'+data.trans_id+'"><i class="fa fa-print" aria-hidden="true" ></i>&nbsp;Print</a><input type="hidden" value='+data.trans_id+' class="trans_id">'
						]).draw(false);	
					})//end for function response
					$('.printTrans').click(function(){
						var date="";
						var total="";
						var payment="";
						var change="";
						var trans_id = $(this).data('id');
						var emp_name = "";
						var patient_name ="";
						var claimcode = '';
						var ref_name = "";
						$.ajax
						({
						url: '/retrieveReciept', 
						type: 'get',
						data: {ID:trans_id}, 
						dataType : 'json',
						success:function(response) { 
						response[0].forEach(function(data){
						date = data.trans_date;
						date = new Date(date);
						date = date.toDateString();
						total = data.trans_total;
						payment = data.trans_payment;
						change = data.trans_change;

						total = parseFloat(total).toFixed(2);
						payment= parseFloat(payment).toFixed(2);
						change =parseFloat(change).toFixed(2);

						})
						response[1].forEach(function(data) { 
						emp_name = data.Name;
						})
						response[2].forEach(function(data){
						patient_name = data.Name;
						})
						response[3].forEach(function(data){
						claimcode = data.claimCode;
						})
						response[4].forEach(function(data){
						ref_name=data.Name;
						})
						var contents = $("#formdeposit").html();
						var custtype =$("#typeDr").html();
						var frame1 = $('<iframe />');
						frame1[0].name = "frame1";
						frame1.css({ "position": "absolute", "top": "-1000000px" });
						$("body").append(frame1);
						var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
						frameDoc.document.open();
						frameDoc.document.write('<html><head>');
						frameDoc.document.write('</head><body>');
						frameDoc.document.write('<style>@page { margin: 2; } .invoice-box{ max-width:800px; margin:auto; padding:30px; font-size:16px; line-height:24px; font-family:Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; color:#555; } .invoice-box table{ width:100%; line-height:inherit; text-align:left; } .invoice-box table td{ padding:5px; vertical-align:top; } .invoice-box table tr td:nth-child(2){ text-align:right; } .invoice-box table tr td:nth-child(3){ text-align:left; padding-left:200px; } .invoice-box table tr.top table td{ padding-bottom:20px; } .invoice-box table tr.top table td.title{ font-size:45px; line-height:45px; color:#333; } .invoice-box table tr.information table td{ padding-bottom:40px; } .invoice-box table tr.heading td{ background:#eee; border-bottom:1px solid #ddd; font-weight:bold; } .invoice-box table tr.details td{ padding-bottom:20px; } .invoice-box table tr.item td{ border-bottom:1px solid #eee; } .invoice-box table tr.item.last td{ border-bottom:none; } .invoice-box table tr.total td:nth-child(2){ border-top:2px solid #eee; font-weight:bold; } @media only screen and (max-width: 600px) { .invoice-box table tr.top table td{ width:100%; display:block; text-align:center; } .invoice-box table tr.information table td{ width:100%; display:block; text-align:center; } } </style>');
						frameDoc.document.write('<html><body> <div class="invoice-box"> <table cellpadding="0" cellspacing="0"> <tr class="top"> <td colspan="2">   ');
						frameDoc.document.write('<table>');
						frameDoc.document.write('<tr> <td> <img src="{{ asset("/banner.jpg") }}" style="width:100%; max-width: 350px; padding 0"> </td> <td style="text-align: left; padding-top: 25px; padding: 0; font-size: 10px"> <strong>Company Name:</strong>Globalhealth Diagnostic Center Inc<br> <strong>Address:</strong>156 N. Domingo Street, San Juan City, <br>Metro Manila<br> <strong>Contact Number:</strong>722-4544/576-5357<br> <strong>Email:</strong>globalhealth_sj@yahoo.com </td> </tr>');
						frameDoc.document.write('</table>');
						frameDoc.document.write('<tr class="information"> <td colspan="2"> <table> <tr><td></td></tr>');
						frameDoc.document.write('<tr> <td> <strong>Patient Name:</strong>'+patient_name+'<br> <strong> Claiming Code:</strong> '+claimcode+'<br> <strong>Website:</strong>www.ghdc-sj.com </td> <td> </td> <td style="padding-left: 33px"> <strong>Date:</strong> '+date+' <br> <strong>Receptionist:</strong>'+emp_name+'<br> <strong>Reffering Employee:</strong>'+ref_name+' </td></tr>');

						frameDoc.document.write('</table>');

						frameDoc.document.write('<tr class="heading"> <td> Service </td> <td> Fee </td></tr>');

						response[5].forEach(function(data){
						price = data.service_price
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.serv_name+'</td><td>Php '+price+'</td></tr>');
						})

						response[6].forEach(function(data){
						var charge = data.charge;
						if(charge == 0)
						{
						  price = data.price
						  price = parseFloat(price).toFixed(2);
						  frameDoc.document.write('<tr class="item"><td>'+data.corpPack_name+' (Corporate Package)</td><td>Php '+price+'</td></tr>');
						}
						if(charge != 0)
						{
						  frameDoc.document.write('<tr><td>'+data.corpPack_name+' (Corporate Package) (c/o '+data.corp_name+')</td><td>Php 0</td></tr>'); 
						}
						response[7].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})

						})
						response[8].forEach(function(data){
						price = data.pack_price;
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.pack_name+'</td><td>Php '+price+'</td></tr>');
						response[9].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})
						})
						frameDoc.document.write('<tr class="item last total"> <td></td> <td> Total: '+total+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Payment:  '+payment+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Change: '+change+'</td></tr>');
						frameDoc.document.write('</table><br><br><br> <table> <tr> <td> Note<sup>*</sup> </td> </tr> <tr> <td> CBC - Dito ang desc<br> Test - Dito ang desc<br> Test - Dito ang desc<br> </td> </tr> </table> ');
						frameDoc.document.write('</div></body></html>');
						frameDoc.document.close();
						setTimeout(function () {
						window.frames["frame1"].focus();
						window.frames["frame1"].print();
						frame1.remove();
						}, 500);
						}
						});
					});//end ng click function printThis
				}
			});
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.success("Done!");
		}
		else
		{
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.warning("Please select a starting date");
		}
	}
	else if(report == 'weekly')
	{
		if(start_date != '')
		{

		    var date = new Date(start_date);
		    var newdate = new Date(date);
		    var sdd = date.getDate();
		    var smm = date.getMonth() + 1;
		    var sy = date.getFullYear();

		    var startdate = sy + '-' + smm + '-' + sdd;
		    newdate.setDate(newdate.getDate() + 6);
		    
		    var dd = newdate.getDate();
		    var mm = newdate.getMonth() + 1;
		    var y = newdate.getFullYear();



		    var enddate =  y + '-' + mm + '-' + dd ;

		    var seconddate = new Date(date);
		    seconddate.setDate(seconddate.getDate()+1);
		    var secdd = seconddate.getDate();
		    var secmm = seconddate.getMonth()+1;
		    var secy = 	seconddate.getFullYear();
		    var secdate = secy + '-' + secmm + '-' + secdd;

		    var thirddate = new Date(date);
		    thirddate.setDate(thirddate.getDate()+2);
		    var thirddd = thirddate.getDate();
		    var thirdmm = thirddate.getMonth()+1;
		    var thirdy = 	thirddate.getFullYear();
		    var thirddate = thirdy + '-' + thirdmm + '-' + thirddd;

		    var fourthdate = new Date(date);
		    fourthdate.setDate(fourthdate.getDate()+3);
		    var fourthdd = fourthdate.getDate();
		    var fourthmm = fourthdate.getMonth()+1;
		    var fourthy = 	fourthdate.getFullYear();
		    var fourthdate = fourthy + '-' + fourthmm + '-' + fourthdd;

		    var fifthdate = new Date(date);
		    fifthdate.setDate(fifthdate.getDate()+4);
		    var fifthdd = fifthdate.getDate();
		    var fifthmm = fifthdate.getMonth()+1;
		    var fifthy = 	fifthdate.getFullYear();
		    var fifthdate = fifthy + '-' + fifthmm + '-' + fifthdd;

		    var sixdate = new Date(date);
		    sixdate.setDate(sixdate.getDate()+5);
		    var sixdd = sixdate.getDate();
		    var sixmm = sixdate.getMonth()+1;
		    var sixy = 	sixdate.getFullYear();
		    var sixdate = sixy + '-' + sixmm + '-' + sixdd;
			t.clear().draw();
			$.ajax
			({
				url: '/weeklyTransactionReport',
				type: 'get',
				data:  { 
					startdate:startdate,
					secdate:secdate,
					thirddate:thirddate,	
					fourthdate:fourthdate,
					fifthdate:fifthdate,
					sixdate:sixdate,
					enddate:enddate
				},
				dataType : 'json',

				success:function(response){
						Highcharts.chart('piecharts', {
					        chart: {
					            plotBackgroundColor: null,
					            plotBorderWidth: null,
					            plotShadow: false,
					            type: 'pie'
					        },
					        title: {
					            text: 'Transaction Report as of '+start_date+ ' to ' +enddate
					        },
					        tooltip: {
					            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					        },
					        plotOptions: {
					            pie: {
					                allowPointSelect: true,
					                cursor: 'pointer',
					                dataLabels: {
					                    enabled: false
					                },
					                showInLegend: true
					            }
					        },
					        series: [{
					            name: 'Patient Type',
					            colorByPoint: true,
					            data: 
					            [{
				                	name: 'Corporate Patient',
				                	y: corporate()
				                },{
				                	name: 'Individual Patient',
				                	y: individual()
					            }]
					        }]
					    });
						Highcharts.chart('barcharts', {
						    chart: {
						        type: 'column'
						    },
						    title: {
						        text: 'Weekly Transaction as of '+ start_date +' to '+enddate
						    },
						    
						    xAxis: {
						        categories: [
						            start_date,
						            secdate,
						            thirddate,
						            fourthdate,
						            fifthdate,
						            sixdate,
						            enddate
						        ],
						        crosshair: true
						    },
						    yAxis: {
						        min: 0,
						        title: {
						            text: 'Income (pesos)'
						        }
						    },
						    tooltip: {
						        headerFormat: '<span style="font-size:10px">Date: {point.key}</span><table>',
						        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						            '<td style="padding:0"><b>{point.y:.2f} pesos</b></td></tr>',
						        footerFormat: '</table>',
						        shared: true,
						        useHTML: true
						    },
						    plotOptions: {
						        column: {
						            pointPadding: 0.2,
						            borderWidth: 0
						        }
						    },
						    series: [{
						        name: 'Total Income',
						        data: [
						        firsttotal(),
						        secondtotal(),
						        thirdtotal(),
						        fourthtotal(),
						        fifthtotal(),
						        sixtotal(),
						        seventotal()
						        ]

						    }]
						});
						function corporate()
						{
							return response[9];
						}
						function individual()
						{
							return response[10];
						}
						function firsttotal()
						{
							response[1].forEach(function(data){
								total = total *1;
					        	total = (data.total *1) + (data.charge *1);
					        });

					        return total;
						}
						function secondtotal()
						{
							response[2].forEach(function(data){
								total = total *1;
					        	total = (data.total *1) + (data.charge *1);
					        });

					        return total;
						}
						function thirdtotal()
						{
							response[3].forEach(function(data){
								total = total *1;
					        	total = (data.total *1) + (data.charge *1);
					        });

					        return total;
						}
						function fourthtotal()
						{
							response[4].forEach(function(data){
								total = total *1;
					        	total = (data.total *1) + (data.charge *1);
					        });

					        return total;
						}
						function fifthtotal()
						{
							response[5].forEach(function(data){
								total = total *1;
					        	total = (data.total *1) + (data.charge *1);
					        });

					        return total;
						}
						function sixtotal()
						{
							response[6].forEach(function(data){
								total = total *1;
					        	total = (data.total *1) + (data.charge *1);
					        });

					        return total;
						}
						function seventotal()
						{
							response[7].forEach(function(data){
								total = total *1;
					        	total = (data.total *1) + (data.charge *1);
					        });

					        return total;
						}
					response[0].forEach(function(data){
						t.row.add([
							data.trans_id,
							data.trans_date,
							data.trans_total + data.charge,
							'<a class="btn btn-primary btn-xs printTrans" data-id="'+data.trans_id+'"><i class="fa fa-print" aria-hidden="true" ></i>&nbsp;Print</a><input type="hidden" value='+data.trans_id+' class="trans_id">'
						]).draw(false);
					})//end ng function response
					$('.printTrans').click(function(){
						var date="";
						var total="";
						var payment="";
						var change="";
						var trans_id = $(this).data('id');
						var emp_name = "";
						var patient_name ="";
						var claimcode = '';
						var ref_name = "";
						$.ajax
						({
						url: '/retrieveReciept', 
						type: 'get',
						data: {ID:trans_id}, 
						dataType : 'json',
						success:function(response) { 
						response[0].forEach(function(data){
						date = data.trans_date;
						date = new Date(date);
						date = date.toDateString();
						total = data.trans_total;
						payment = data.trans_payment;
						change = data.trans_change;

						total = parseFloat(total).toFixed(2);
						payment= parseFloat(payment).toFixed(2);
						change =parseFloat(change).toFixed(2);

						})
						response[1].forEach(function(data) { 
						emp_name = data.Name;
						})
						response[2].forEach(function(data){
						patient_name = data.Name;
						})
						response[3].forEach(function(data){
						claimcode = data.claimCode;
						})
						response[4].forEach(function(data){
						ref_name=data.Name;
						})
						var contents = $("#formdeposit").html();
						var custtype =$("#typeDr").html();
						var frame1 = $('<iframe />');
						frame1[0].name = "frame1";
						frame1.css({ "position": "absolute", "top": "-1000000px" });
						$("body").append(frame1);
						var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
						frameDoc.document.open();
						frameDoc.document.write('<html><head>');
						frameDoc.document.write('</head><body>');
						frameDoc.document.write('<style>@page { margin: 2; } .invoice-box{ max-width:800px; margin:auto; padding:30px; font-size:16px; line-height:24px; font-family:Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; color:#555; } .invoice-box table{ width:100%; line-height:inherit; text-align:left; } .invoice-box table td{ padding:5px; vertical-align:top; } .invoice-box table tr td:nth-child(2){ text-align:right; } .invoice-box table tr td:nth-child(3){ text-align:left; padding-left:200px; } .invoice-box table tr.top table td{ padding-bottom:20px; } .invoice-box table tr.top table td.title{ font-size:45px; line-height:45px; color:#333; } .invoice-box table tr.information table td{ padding-bottom:40px; } .invoice-box table tr.heading td{ background:#eee; border-bottom:1px solid #ddd; font-weight:bold; } .invoice-box table tr.details td{ padding-bottom:20px; } .invoice-box table tr.item td{ border-bottom:1px solid #eee; } .invoice-box table tr.item.last td{ border-bottom:none; } .invoice-box table tr.total td:nth-child(2){ border-top:2px solid #eee; font-weight:bold; } @media only screen and (max-width: 600px) { .invoice-box table tr.top table td{ width:100%; display:block; text-align:center; } .invoice-box table tr.information table td{ width:100%; display:block; text-align:center; } } </style>');
						frameDoc.document.write('<html><body> <div class="invoice-box"> <table cellpadding="0" cellspacing="0"> <tr class="top"> <td colspan="2">   ');
						frameDoc.document.write('<table>');
						frameDoc.document.write('<tr> <td> <img src="{{ asset("/banner.jpg") }}" style="width:100%; max-width: 350px; padding 0"> </td> <td style="text-align: left; padding-top: 25px; padding: 0; font-size: 10px"> <strong>Company Name:</strong>Globalhealth Diagnostic Center Inc<br> <strong>Address:</strong>156 N. Domingo Street, San Juan City, <br>Metro Manila<br> <strong>Contact Number:</strong>722-4544/576-5357<br> <strong>Email:</strong>globalhealth_sj@yahoo.com </td> </tr>');
						frameDoc.document.write('</table>');
						frameDoc.document.write('<tr class="information"> <td colspan="2"> <table> <tr><td></td></tr>');
						frameDoc.document.write('<tr> <td> <strong>Patient Name:</strong>'+patient_name+'<br> <strong> Claiming Code:</strong> '+claimcode+'<br> <strong>Website:</strong>www.ghdc-sj.com </td> <td> </td> <td style="padding-left: 33px"> <strong>Date:</strong> '+date+' <br> <strong>Receptionist:</strong>'+emp_name+'<br> <strong>Reffering Employee:</strong>'+ref_name+' </td></tr>');

						frameDoc.document.write('</table>');

						frameDoc.document.write('<tr class="heading"> <td> Service </td> <td> Fee </td></tr>');

						response[5].forEach(function(data){
						price = data.service_price
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.serv_name+'</td><td>Php '+price+'</td></tr>');
						})

						response[6].forEach(function(data){
						var charge = data.charge;
						if(charge == 0)
						{
						  price = data.price
						  price = parseFloat(price).toFixed(2);
						  frameDoc.document.write('<tr class="item"><td>'+data.corpPack_name+' (Corporate Package)</td><td>Php '+price+'</td></tr>');
						}
						if(charge != 0)
						{
						  frameDoc.document.write('<tr><td>'+data.corpPack_name+' (Corporate Package) (c/o '+data.corp_name+')</td><td>Php 0</td></tr>'); 
						}
						response[7].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})

						})
						response[8].forEach(function(data){
						price = data.pack_price;
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.pack_name+'</td><td>Php '+price+'</td></tr>');
						response[9].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})
						})
						frameDoc.document.write('<tr class="item last total"> <td></td> <td> Total: '+total+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Payment:  '+payment+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Change: '+change+'</td></tr>');
						frameDoc.document.write('</table><br><br><br> <table> <tr> <td> Note<sup>*</sup> </td> </tr> <tr> <td> CBC - Dito ang desc<br> Test - Dito ang desc<br> Test - Dito ang desc<br> </td> </tr> </table> ');
						frameDoc.document.write('</div></body></html>');
						frameDoc.document.close();
						setTimeout(function () {
						window.frames["frame1"].focus();
						window.frames["frame1"].print();
						frame1.remove();
						}, 500);
						}
						});
					});//end ng click function printThis
				}
			});
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.success("Done!");
		}
		else
		{
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.warning("Please select a starting date");
		}
	}
	else if(report == 'monthly')
	{
		if(monthly != 'mm/yyyy')		    
		{
			var date = new Date("01/"+monthly);
		    var newdate = new Date(date);
		    var smm = date.getDate();
		    var sy = date.getFullYear();
		    t.clear().draw();
			$.ajax
			({
				url: '/monthlyTransactionReport',
				type: 'get',
				data:  { 
					month : smm,
					year : sy
				},
				dataType : 'json',
				success:function(response){
					Highcharts.chart('piecharts', {
				        chart: {
				            plotBackgroundColor: null,
				            plotBorderWidth: null,
				            plotShadow: false,
				            type: 'pie'
				        },
				        title: {
				            text: 'Monthly Transaction Report as of '+smm + ' '+sy
				        },
				        tooltip: {
				            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				        },
				        plotOptions: {
				            pie: {
				                allowPointSelect: true,
				                cursor: 'pointer',
				                dataLabels: {
				                    enabled: false
				                },
				                showInLegend: true
				            }
				        },
				        series: [{
				            name: 'Patient Type',
				            colorByPoint: true,
				            data: 
				            [{
			                	name: 'Corporate Patient',
			                	y: corporate()
			                },{
			                	name: 'Individual Patient',
			                	y: individual()
				            }]
				        }]
				    });
				    var x = [];
				    var y = [];
				    
				    Highcharts.chart('barcharts', {
						    chart: {
						        type: 'column'
						    },
						    title: {
						        text: 'Weekly Transaction as of '+ start_date +' to '+enddate
						    },
						    
						    xAxis: {
						        categories: [
						        xvalues()
						        ],
						        crosshair: true
						    },
						    yAxis: {
						        min: 0,
						        title: {
						            text: 'Income (pesos)'
						        }
						    },
						    tooltip: {
						        headerFormat: '<span style="font-size:10px">Date: {point.key}</span><table>',
						        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						            '<td style="padding:0"><b>{point.y:.2f} pesos</b></td></tr>',
						        footerFormat: '</table>',
						        shared: true,
						        useHTML: true
						    },
						    plotOptions: {
						        column: {
						            pointPadding: 0.2,
						            borderWidth: 0
						        }
						    },
						    series: [{
						        name: 'Total Income',
						        data: [
						        yvalues()
						        ]

						    }]
						});
				    function xvalues(){
				    	response[4].forEach(function(data){
				    		var total =0;
				    		total = data.trans_total + charge
					    	x.push(total);
					    })
					    alert(x);
					    return x;
				    }
				    function yvalues()
				    {
				    	response[4].forEach(function(data){
					    	y.push("'"+data.trans_date+"'");
					    })
					    return y;
				    }
					function corporate()
					{
						return response[2];
					}
					function individual()
					{
						return response[3];
					}
					response[0].forEach(function(data){
						t.row.add([
							data.trans_id,
							data.trans_date,
							data.trans_total + data.charge,
							'<a class="btn btn-primary btn-xs printTrans" data-id="'+data.trans_id+'"><i class="fa fa-print" aria-hidden="true" ></i>&nbsp;Print</a><input type="hidden" value='+data.trans_id+' class="trans_id">'
						]).draw(false);
					})//end ng function response
					$('.printTrans').click(function(){
						var date="";
						var total="";
						var payment="";
						var change="";
						var trans_id = $(this).data('id');
						var emp_name = "";
						var patient_name ="";
						var claimcode = '';
						var ref_name = "";
						$.ajax
						({
						url: '/retrieveReciept', 
						type: 'get',
						data: {ID:trans_id}, 
						dataType : 'json',
						success:function(response) { 
						response[0].forEach(function(data){
						date = data.trans_date;
						date = new Date(date);
						date = date.toDateString();
						total = data.trans_total;
						payment = data.trans_payment;
						change = data.trans_change;

						total = parseFloat(total).toFixed(2);
						payment= parseFloat(payment).toFixed(2);
						change =parseFloat(change).toFixed(2);

						})
						response[1].forEach(function(data) { 
						emp_name = data.Name;
						})
						response[2].forEach(function(data){
						patient_name = data.Name;
						})
						response[3].forEach(function(data){
						claimcode = data.claimCode;
						})
						response[4].forEach(function(data){
						ref_name=data.Name;
						})
						var contents = $("#formdeposit").html();
						var custtype =$("#typeDr").html();
						var frame1 = $('<iframe />');
						frame1[0].name = "frame1";
						frame1.css({ "position": "absolute", "top": "-1000000px" });
						$("body").append(frame1);
						var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
						frameDoc.document.open();
						frameDoc.document.write('<html><head>');
						frameDoc.document.write('</head><body>');
						frameDoc.document.write('<style>@page { margin: 2; } .invoice-box{ max-width:800px; margin:auto; padding:30px; font-size:16px; line-height:24px; font-family:Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; color:#555; } .invoice-box table{ width:100%; line-height:inherit; text-align:left; } .invoice-box table td{ padding:5px; vertical-align:top; } .invoice-box table tr td:nth-child(2){ text-align:right; } .invoice-box table tr td:nth-child(3){ text-align:left; padding-left:200px; } .invoice-box table tr.top table td{ padding-bottom:20px; } .invoice-box table tr.top table td.title{ font-size:45px; line-height:45px; color:#333; } .invoice-box table tr.information table td{ padding-bottom:40px; } .invoice-box table tr.heading td{ background:#eee; border-bottom:1px solid #ddd; font-weight:bold; } .invoice-box table tr.details td{ padding-bottom:20px; } .invoice-box table tr.item td{ border-bottom:1px solid #eee; } .invoice-box table tr.item.last td{ border-bottom:none; } .invoice-box table tr.total td:nth-child(2){ border-top:2px solid #eee; font-weight:bold; } @media only screen and (max-width: 600px) { .invoice-box table tr.top table td{ width:100%; display:block; text-align:center; } .invoice-box table tr.information table td{ width:100%; display:block; text-align:center; } } </style>');
						frameDoc.document.write('<html><body> <div class="invoice-box"> <table cellpadding="0" cellspacing="0"> <tr class="top"> <td colspan="2">   ');
						frameDoc.document.write('<table>');
						frameDoc.document.write('<tr> <td> <img src="{{ asset("/banner.jpg") }}" style="width:100%; max-width: 350px; padding 0"> </td> <td style="text-align: left; padding-top: 25px; padding: 0; font-size: 10px"> <strong>Company Name:</strong>Globalhealth Diagnostic Center Inc<br> <strong>Address:</strong>156 N. Domingo Street, San Juan City, <br>Metro Manila<br> <strong>Contact Number:</strong>722-4544/576-5357<br> <strong>Email:</strong>globalhealth_sj@yahoo.com </td> </tr>');
						frameDoc.document.write('</table>');
						frameDoc.document.write('<tr class="information"> <td colspan="2"> <table> <tr><td></td></tr>');
						frameDoc.document.write('<tr> <td> <strong>Patient Name:</strong>'+patient_name+'<br> <strong> Claiming Code:</strong> '+claimcode+'<br> <strong>Website:</strong>www.ghdc-sj.com </td> <td> </td> <td style="padding-left: 33px"> <strong>Date:</strong> '+date+' <br> <strong>Receptionist:</strong>'+emp_name+'<br> <strong>Reffering Employee:</strong>'+ref_name+' </td></tr>');

						frameDoc.document.write('</table>');

						frameDoc.document.write('<tr class="heading"> <td> Service </td> <td> Fee </td></tr>');

						response[5].forEach(function(data){
						price = data.service_price
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.serv_name+'</td><td>Php '+price+'</td></tr>');
						})

						response[6].forEach(function(data){
						var charge = data.charge;
						if(charge == 0)
						{
						  price = data.price
						  price = parseFloat(price).toFixed(2);
						  frameDoc.document.write('<tr class="item"><td>'+data.corpPack_name+' (Corporate Package)</td><td>Php '+price+'</td></tr>');
						}
						if(charge != 0)
						{
						  frameDoc.document.write('<tr><td>'+data.corpPack_name+' (Corporate Package) (c/o '+data.corp_name+')</td><td>Php 0</td></tr>'); 
						}
						response[7].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})

						})
						response[8].forEach(function(data){
						price = data.pack_price;
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.pack_name+'</td><td>Php '+price+'</td></tr>');
						response[9].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})
						})
						frameDoc.document.write('<tr class="item last total"> <td></td> <td> Total: '+total+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Payment:  '+payment+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Change: '+change+'</td></tr>');
						frameDoc.document.write('</table><br><br><br> <table> <tr> <td> Note<sup>*</sup> </td> </tr> <tr> <td> CBC - Dito ang desc<br> Test - Dito ang desc<br> Test - Dito ang desc<br> </td> </tr> </table> ');
						frameDoc.document.write('</div></body></html>');
						frameDoc.document.close();
						setTimeout(function () {
						window.frames["frame1"].focus();
						window.frames["frame1"].print();
						frame1.remove();
						}, 500);
						}
						});
					});//end ng click function printThis
				}
			});
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.success("Done!");
		}
		else
		{
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.warning("Please select a Month/Year");
		}

	}
	else if(report == 'yearly')
	{
		if(yearly != 'yyyy')   
		{
			var date = new Date("01/01/"+yearly);
		    var newdate = new Date(date);
		    var sy = date.getFullYear();
		    t.clear().draw();
			$.ajax
			({
				url: '/yearlyTransactionReport',
				type: 'get',
				data:  { 
					month : smm,
					year : sy
				},
				dataType : 'json',
				success:function(response){
					response.forEach(function(data){
						t.row.add([
							data.trans_id,
							data.trans_date,
							data.trans_total + data.charge,
							'<a class="btn btn-primary btn-xs printTrans" data-id="'+data.trans_id+'"><i class="fa fa-print" aria-hidden="true" ></i>&nbsp;Print</a><input type="hidden" value='+data.trans_id+' class="trans_id">'
						]).draw(false);
					})//end ng function response
					$('.printTrans').click(function(){
						var date="";
						var total="";
						var payment="";
						var change="";
						var trans_id = $(this).data('id');
						var emp_name = "";
						var patient_name ="";
						var claimcode = '';
						var ref_name = "";
						$.ajax
						({
						url: '/retrieveReciept', 
						type: 'get',
						data: {ID:trans_id}, 
						dataType : 'json',
						success:function(response) { 
						response[0].forEach(function(data){
						date = data.trans_date;
						date = new Date(date);
						date = date.toDateString();
						total = data.trans_total;
						payment = data.trans_payment;
						change = data.trans_change;

						total = parseFloat(total).toFixed(2);
						payment= parseFloat(payment).toFixed(2);
						change =parseFloat(change).toFixed(2);

						})
						response[1].forEach(function(data) { 
						emp_name = data.Name;
						})
						response[2].forEach(function(data){
						patient_name = data.Name;
						})
						response[3].forEach(function(data){
						claimcode = data.claimCode;
						})
						response[4].forEach(function(data){
						ref_name=data.Name;
						})
						var contents = $("#formdeposit").html();
						var custtype =$("#typeDr").html();
						var frame1 = $('<iframe />');
						frame1[0].name = "frame1";
						frame1.css({ "position": "absolute", "top": "-1000000px" });
						$("body").append(frame1);
						var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
						frameDoc.document.open();
						frameDoc.document.write('<html><head>');
						frameDoc.document.write('</head><body>');
						frameDoc.document.write('<style>@page { margin: 2; } .invoice-box{ max-width:800px; margin:auto; padding:30px; font-size:16px; line-height:24px; font-family:Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; color:#555; } .invoice-box table{ width:100%; line-height:inherit; text-align:left; } .invoice-box table td{ padding:5px; vertical-align:top; } .invoice-box table tr td:nth-child(2){ text-align:right; } .invoice-box table tr td:nth-child(3){ text-align:left; padding-left:200px; } .invoice-box table tr.top table td{ padding-bottom:20px; } .invoice-box table tr.top table td.title{ font-size:45px; line-height:45px; color:#333; } .invoice-box table tr.information table td{ padding-bottom:40px; } .invoice-box table tr.heading td{ background:#eee; border-bottom:1px solid #ddd; font-weight:bold; } .invoice-box table tr.details td{ padding-bottom:20px; } .invoice-box table tr.item td{ border-bottom:1px solid #eee; } .invoice-box table tr.item.last td{ border-bottom:none; } .invoice-box table tr.total td:nth-child(2){ border-top:2px solid #eee; font-weight:bold; } @media only screen and (max-width: 600px) { .invoice-box table tr.top table td{ width:100%; display:block; text-align:center; } .invoice-box table tr.information table td{ width:100%; display:block; text-align:center; } } </style>');
						frameDoc.document.write('<html><body> <div class="invoice-box"> <table cellpadding="0" cellspacing="0"> <tr class="top"> <td colspan="2">   ');
						frameDoc.document.write('<table>');
						frameDoc.document.write('<tr> <td> <img src="{{ asset("/banner.jpg") }}" style="width:100%; max-width: 350px; padding 0"> </td> <td style="text-align: left; padding-top: 25px; padding: 0; font-size: 10px"> <strong>Company Name:</strong>Globalhealth Diagnostic Center Inc<br> <strong>Address:</strong>156 N. Domingo Street, San Juan City, <br>Metro Manila<br> <strong>Contact Number:</strong>722-4544/576-5357<br> <strong>Email:</strong>globalhealth_sj@yahoo.com </td> </tr>');
						frameDoc.document.write('</table>');
						frameDoc.document.write('<tr class="information"> <td colspan="2"> <table> <tr><td></td></tr>');
						frameDoc.document.write('<tr> <td> <strong>Patient Name:</strong>'+patient_name+'<br> <strong> Claiming Code:</strong> '+claimcode+'<br> <strong>Website:</strong>www.ghdc-sj.com </td> <td> </td> <td style="padding-left: 33px"> <strong>Date:</strong> '+date+' <br> <strong>Receptionist:</strong>'+emp_name+'<br> <strong>Reffering Employee:</strong>'+ref_name+' </td></tr>');

						frameDoc.document.write('</table>');

						frameDoc.document.write('<tr class="heading"> <td> Service </td> <td> Fee </td></tr>');

						response[5].forEach(function(data){
						price = data.service_price
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.serv_name+'</td><td>Php '+price+'</td></tr>');
						})

						response[6].forEach(function(data){
						var charge = data.charge;
						if(charge == 0)
						{
						  price = data.price
						  price = parseFloat(price).toFixed(2);
						  frameDoc.document.write('<tr class="item"><td>'+data.corpPack_name+' (Corporate Package)</td><td>Php '+price+'</td></tr>');
						}
						if(charge != 0)
						{
						  frameDoc.document.write('<tr><td>'+data.corpPack_name+' (Corporate Package) (c/o '+data.corp_name+')</td><td>Php 0</td></tr>'); 
						}
						response[7].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})

						})
						response[8].forEach(function(data){
						price = data.pack_price;
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.pack_name+'</td><td>Php '+price+'</td></tr>');
						response[9].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})
						})
						frameDoc.document.write('<tr class="item last total"> <td></td> <td> Total: '+total+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Payment:  '+payment+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Change: '+change+'</td></tr>');
						frameDoc.document.write('</table><br><br><br> <table> <tr> <td> Note<sup>*</sup> </td> </tr> <tr> <td> CBC - Dito ang desc<br> Test - Dito ang desc<br> Test - Dito ang desc<br> </td> </tr> </table> ');
						frameDoc.document.write('</div></body></html>');
						frameDoc.document.close();
						setTimeout(function () {
						window.frames["frame1"].focus();
						window.frames["frame1"].print();
						frame1.remove();
						}, 500);
						}
						});
					});//end ng click function printThis
				}
			});
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.success("Done!");
		}
		else
		{
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.warning("Please select a Year");
		}
	}
	else if(report == 'range')
	{
		var startdate = new Date(rangestart);
	    var enddate = new Date(rangeend);
	    var edd = enddate.getDate();
	    var emm = enddate.getMonth() + 1;
	    var ey = enddate.getFullYear();

	    var sdd = startdate.getDate();
	    var smm = startdate.getMonth() + 1;
	    var sy = startdate.getFullYear();

	    var end_date =  ey + '-' + emm + '-' + edd ;
	    var start_date =  sy + '-' + smm + '-' + sdd ;
	    if(startdate != 'Invalid Date' && enddate != 'Invalid Date')   
		{
		    t.clear().draw();
			$.ajax
			({
				url: '/rangeTransactionReport',
				type: 'get',
				data:  { 
					enddate : end_date,
					startdate : start_date
				},
				dataType : 'json',
				success:function(response){
					response.forEach(function(data){
						t.row.add([
							data.trans_id,
							data.trans_date,
							data.trans_total + data.charge,
							'<a class="btn btn-primary btn-xs printTrans" data-id="'+data.trans_id+'"><i class="fa fa-print" aria-hidden="true" ></i>&nbsp;Print</a><input type="hidden" value='+data.trans_id+' class="trans_id">'
						]).draw(false);
					})//end ng function response
					$('.printTrans').click(function(){
						var date="";
						var total="";
						var payment="";
						var change="";
						var trans_id = $(this).data('id');
						var emp_name = "";
						var patient_name ="";
						var claimcode = '';
						var ref_name = "";
						$.ajax
						({
						url: '/retrieveReciept', 
						type: 'get',
						data: {ID:trans_id}, 
						dataType : 'json',
						success:function(response) { 
						response[0].forEach(function(data){
						date = data.trans_date;
						date = new Date(date);
						date = date.toDateString();
						total = data.trans_total;
						payment = data.trans_payment;
						change = data.trans_change;

						total = parseFloat(total).toFixed(2);
						payment= parseFloat(payment).toFixed(2);
						change =parseFloat(change).toFixed(2);

						})
						response[1].forEach(function(data) { 
						emp_name = data.Name;
						})
						response[2].forEach(function(data){
						patient_name = data.Name;
						})
						response[3].forEach(function(data){
						claimcode = data.claimCode;
						})
						response[4].forEach(function(data){
						ref_name=data.Name;
						})
						var contents = $("#formdeposit").html();
						var custtype =$("#typeDr").html();
						var frame1 = $('<iframe />');
						frame1[0].name = "frame1";
						frame1.css({ "position": "absolute", "top": "-1000000px" });
						$("body").append(frame1);
						var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
						frameDoc.document.open();
						frameDoc.document.write('<html><head>');
						frameDoc.document.write('</head><body>');
						frameDoc.document.write('<style>@page { margin: 2; } .invoice-box{ max-width:800px; margin:auto; padding:30px; font-size:16px; line-height:24px; font-family:Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; color:#555; } .invoice-box table{ width:100%; line-height:inherit; text-align:left; } .invoice-box table td{ padding:5px; vertical-align:top; } .invoice-box table tr td:nth-child(2){ text-align:right; } .invoice-box table tr td:nth-child(3){ text-align:left; padding-left:200px; } .invoice-box table tr.top table td{ padding-bottom:20px; } .invoice-box table tr.top table td.title{ font-size:45px; line-height:45px; color:#333; } .invoice-box table tr.information table td{ padding-bottom:40px; } .invoice-box table tr.heading td{ background:#eee; border-bottom:1px solid #ddd; font-weight:bold; } .invoice-box table tr.details td{ padding-bottom:20px; } .invoice-box table tr.item td{ border-bottom:1px solid #eee; } .invoice-box table tr.item.last td{ border-bottom:none; } .invoice-box table tr.total td:nth-child(2){ border-top:2px solid #eee; font-weight:bold; } @media only screen and (max-width: 600px) { .invoice-box table tr.top table td{ width:100%; display:block; text-align:center; } .invoice-box table tr.information table td{ width:100%; display:block; text-align:center; } } </style>');
						frameDoc.document.write('<html><body> <div class="invoice-box"> <table cellpadding="0" cellspacing="0"> <tr class="top"> <td colspan="2">   ');
						frameDoc.document.write('<table>');
						frameDoc.document.write('<tr> <td> <img src="{{ asset("/banner.jpg") }}" style="width:100%; max-width: 350px; padding 0"> </td> <td style="text-align: left; padding-top: 25px; padding: 0; font-size: 10px"> <strong>Company Name:</strong>Globalhealth Diagnostic Center Inc<br> <strong>Address:</strong>156 N. Domingo Street, San Juan City, <br>Metro Manila<br> <strong>Contact Number:</strong>722-4544/576-5357<br> <strong>Email:</strong>globalhealth_sj@yahoo.com </td> </tr>');
						frameDoc.document.write('</table>');
						frameDoc.document.write('<tr class="information"> <td colspan="2"> <table> <tr><td></td></tr>');
						frameDoc.document.write('<tr> <td> <strong>Patient Name:</strong>'+patient_name+'<br> <strong> Claiming Code:</strong> '+claimcode+'<br> <strong>Website:</strong>www.ghdc-sj.com </td> <td> </td> <td style="padding-left: 33px"> <strong>Date:</strong> '+date+' <br> <strong>Receptionist:</strong>'+emp_name+'<br> <strong>Reffering Employee:</strong>'+ref_name+' </td></tr>');

						frameDoc.document.write('</table>');

						frameDoc.document.write('<tr class="heading"> <td> Service </td> <td> Fee </td></tr>');

						response[5].forEach(function(data){
						price = data.service_price
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.serv_name+'</td><td>Php '+price+'</td></tr>');
						})

						response[6].forEach(function(data){
						var charge = data.charge;
						if(charge == 0)
						{
						  price = data.price
						  price = parseFloat(price).toFixed(2);
						  frameDoc.document.write('<tr class="item"><td>'+data.corpPack_name+' (Corporate Package)</td><td>Php '+price+'</td></tr>');
						}
						if(charge != 0)
						{
						  frameDoc.document.write('<tr><td>'+data.corpPack_name+' (Corporate Package) (c/o '+data.corp_name+')</td><td>Php 0</td></tr>'); 
						}
						response[7].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})

						})
						response[8].forEach(function(data){
						price = data.pack_price;
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.pack_name+'</td><td>Php '+price+'</td></tr>');
						response[9].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})
						})
						frameDoc.document.write('<tr class="item last total"> <td></td> <td> Total: '+total+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Payment:  '+payment+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Change: '+change+'</td></tr>');
						frameDoc.document.write('</table><br><br><br> <table> <tr> <td> Note<sup>*</sup> </td> </tr> <tr> <td> CBC - Dito ang desc<br> Test - Dito ang desc<br> Test - Dito ang desc<br> </td> </tr> </table> ');
						frameDoc.document.write('</div></body></html>');
						frameDoc.document.close();
						setTimeout(function () {
						window.frames["frame1"].focus();
						window.frames["frame1"].print();
						frame1.remove();
						}, 500);
						}
						});
					});//end ng click function printThis
				}
			});
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.success("Done!");
		}
		else
		{
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.warning("Please select a date range");
		}
	}
	else if(report == 'all')
	{
		$.ajax
			({
				url: '/allTransactionReport',
				type: 'get',
				dataType : 'json',
				success:function(response){
					response.forEach(function(data){
						t.row.add([
							data.trans_id,
							data.trans_date,
							data.trans_total + data.charge,
							'<a class="btn btn-primary btn-xs printTrans" data-id="'+data.trans_id+'"><i class="fa fa-print" aria-hidden="true" ></i>&nbsp;Print</a><input type="hidden" value='+data.trans_id+' class="trans_id">'
						]).draw(false);
					})//end ng function response
					$('.printTrans').click(function(){
						var date="";
						var total="";
						var payment="";
						var change="";
						var trans_id = $(this).data('id');
						var emp_name = "";
						var patient_name ="";
						var claimcode = '';
						var ref_name = "";
						$.ajax
						({
						url: '/retrieveReciept', 
						type: 'get',
						data: {ID:trans_id}, 
						dataType : 'json',
						success:function(response) { 
						response[0].forEach(function(data){
						date = data.trans_date;
						date = new Date(date);
						date = date.toDateString();
						total = data.trans_total;
						payment = data.trans_payment;
						change = data.trans_change;

						total = parseFloat(total).toFixed(2);
						payment= parseFloat(payment).toFixed(2);
						change =parseFloat(change).toFixed(2);

						})
						response[1].forEach(function(data) { 
						emp_name = data.Name;
						})
						response[2].forEach(function(data){
						patient_name = data.Name;
						})
						response[3].forEach(function(data){
						claimcode = data.claimCode;
						})
						response[4].forEach(function(data){
						ref_name=data.Name;
						})
						var contents = $("#formdeposit").html();
						var custtype =$("#typeDr").html();
						var frame1 = $('<iframe />');
						frame1[0].name = "frame1";
						frame1.css({ "position": "absolute", "top": "-1000000px" });
						$("body").append(frame1);
						var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
						frameDoc.document.open();
						frameDoc.document.write('<html><head>');
						frameDoc.document.write('</head><body>');
						frameDoc.document.write('<style>@page { margin: 2; } .invoice-box{ max-width:800px; margin:auto; padding:30px; font-size:16px; line-height:24px; font-family:Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; color:#555; } .invoice-box table{ width:100%; line-height:inherit; text-align:left; } .invoice-box table td{ padding:5px; vertical-align:top; } .invoice-box table tr td:nth-child(2){ text-align:right; } .invoice-box table tr td:nth-child(3){ text-align:left; padding-left:200px; } .invoice-box table tr.top table td{ padding-bottom:20px; } .invoice-box table tr.top table td.title{ font-size:45px; line-height:45px; color:#333; } .invoice-box table tr.information table td{ padding-bottom:40px; } .invoice-box table tr.heading td{ background:#eee; border-bottom:1px solid #ddd; font-weight:bold; } .invoice-box table tr.details td{ padding-bottom:20px; } .invoice-box table tr.item td{ border-bottom:1px solid #eee; } .invoice-box table tr.item.last td{ border-bottom:none; } .invoice-box table tr.total td:nth-child(2){ border-top:2px solid #eee; font-weight:bold; } @media only screen and (max-width: 600px) { .invoice-box table tr.top table td{ width:100%; display:block; text-align:center; } .invoice-box table tr.information table td{ width:100%; display:block; text-align:center; } } </style>');
						frameDoc.document.write('<html><body> <div class="invoice-box"> <table cellpadding="0" cellspacing="0"> <tr class="top"> <td colspan="2">   ');
						frameDoc.document.write('<table>');
						frameDoc.document.write('<tr> <td> <img src="{{ asset("/banner.jpg") }}" style="width:100%; max-width: 350px; padding 0"> </td> <td style="text-align: left; padding-top: 25px; padding: 0; font-size: 10px"> <strong>Company Name:</strong>Globalhealth Diagnostic Center Inc<br> <strong>Address:</strong>156 N. Domingo Street, San Juan City, <br>Metro Manila<br> <strong>Contact Number:</strong>722-4544/576-5357<br> <strong>Email:</strong>globalhealth_sj@yahoo.com </td> </tr>');
						frameDoc.document.write('</table>');
						frameDoc.document.write('<tr class="information"> <td colspan="2"> <table> <tr><td></td></tr>');
						frameDoc.document.write('<tr> <td> <strong>Patient Name:</strong>'+patient_name+'<br> <strong> Claiming Code:</strong> '+claimcode+'<br> <strong>Website:</strong>www.ghdc-sj.com </td> <td> </td> <td style="padding-left: 33px"> <strong>Date:</strong> '+date+' <br> <strong>Receptionist:</strong>'+emp_name+'<br> <strong>Reffering Employee:</strong>'+ref_name+' </td></tr>');

						frameDoc.document.write('</table>');

						frameDoc.document.write('<tr class="heading"> <td> Service </td> <td> Fee </td></tr>');

						response[5].forEach(function(data){
						price = data.service_price
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.serv_name+'</td><td>Php '+price+'</td></tr>');
						})

						response[6].forEach(function(data){
						var charge = data.charge;
						if(charge == 0)
						{
						  price = data.price
						  price = parseFloat(price).toFixed(2);
						  frameDoc.document.write('<tr class="item"><td>'+data.corpPack_name+' (Corporate Package)</td><td>Php '+price+'</td></tr>');
						}
						if(charge != 0)
						{
						  frameDoc.document.write('<tr><td>'+data.corpPack_name+' (Corporate Package) (c/o '+data.corp_name+')</td><td>Php 0</td></tr>'); 
						}
						response[7].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})

						})
						response[8].forEach(function(data){
						price = data.pack_price;
						price = parseFloat(price).toFixed(2);
						frameDoc.document.write('<tr><td>'+data.pack_name+'</td><td>Php '+price+'</td></tr>');
						response[9].forEach(function(data){
						  frameDoc.document.write('<tr><td>&emsp;&emsp;&emsp; -'+data.service_name+'</td><td></td></tr>');
						})
						})
						frameDoc.document.write('<tr class="item last total"> <td></td> <td> Total: '+total+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Payment:  '+payment+'</td></tr>');
						frameDoc.document.write('<tr> <td></td> <td> Change: '+change+'</td></tr>');
						frameDoc.document.write('</table><br><br><br> <table> <tr> <td> Note<sup>*</sup> </td> </tr> <tr> <td> CBC - Dito ang desc<br> Test - Dito ang desc<br> Test - Dito ang desc<br> </td> </tr> </table> ');
						frameDoc.document.write('</div></body></html>');
						frameDoc.document.close();
						setTimeout(function () {
						window.frames["frame1"].focus();
						window.frames["frame1"].print();
						frame1.remove();
						}, 500);
						}
						});
					});//end ng click function printThis
				}
			});
			toastr.options = {
		      "closeButton": true,
		      "debug": false,
		      "positionClass": "toast-top-right",
		      "onclick": null,
		      "showDuration": "3000",
		      "hideDuration": "100",
		      "timeOut": "3000",
		      "extendedTimeOut": "0",
		      "showEasing": "swing",
		      "hideEasing": "swing",
		      "showMethod": "show",
		      "hideMethod": "hide"
		    }
		    toastr.success("Done!");
	}
});