@extends('AdminLayout.admin')

@section ('breadrootName')
<i class="fa fa-handshake-o" aria-hidden="true"></i><span> Transaction</span>
@endsection

@section ('breadParentName')
<i class="fa fa-percent" aria-hidden="true"></i><span> Rebate Employee Billing</span>
@endsection

@section('maintenanceactive')
<a href="">
@endsection
@section('breadactivePage',"View Employee Referrals")
@section('transaction','active')
@section('rebatetrans','active')

@section('content')
<div class="row">
	<div class="col-lg-4">
		<section class="panel">
			<div class="panel-body">
				@foreach($empdetails as $emp)
					<label>Employee Name:&nbsp; {{ $emp->emp_fname }} {{ $emp->emp_mname }} {{ $emp->emp_lname }}</label>
					@if($emp->address)
						<label>Employee Address:&nbsp; {{ $emp->emp_address }}</label>
					@endif
					
				@endforeach
			</div>
		</section>
	</div>
	<div class="col-lg-8">
		<section class="panel">
			<header class="panel-heading">
				Employee Referrals
				<span class="tools pull-right">
                    <a class="fa fa-chevron-down" href="javascript:;"></a>
                    <a class="fa fa-times" href="javascript:;"></a>
                </span>
			</header>
			<div class="panel-body">
				<div class="clearfix">
					<table class="table table-bordered table-hover dataTable" id="corpTrans">
					  <thead>
					    <tr>

					    	<th>Transaction ID</th>
					    	<th>Transaction Date</th>
					    	<th>Transaction Charge</th>
					    	<th>Corporate Patient</th>
					    	<th>Action</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr>
						      <td></td>
						      <td></td>
						      <td></td>
						      <td>
						      	
						      </td>
						      <td>
						      	<a class="btn btn-primary btn-xs printTrans" data-id=""><i class="fa fa-print" aria-hidden="true" ></i>&nbsp;Print</a>
						      </td>
					    </tr>
					  </tbody>
					</table>
				</div>
			</div>
		</section>
	</div>
	<div class="col-lg-8 col-lg-offset-4">
		<section class="panel">
			<header class="panel-heading">
				Company Payments
				<span class="tools pull-right">
                    <a class="fa fa-chevron-down" href="javascript:;"></a>
                    <a class="fa fa-times" href="javascript:;"></a>
                </span>
			</header>
			<div class="panel-body">
				<table class="table table-bordered table-hover dataTable" id="corpPayment">
					<thead>
					    <tr>
					    	<th>Payment ID</th>
					    	<th>Payment Date</th>
					    	<th>Amount</th>
					    	<th>Action</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr>
					      <td></td>
					      <td></td>
					      <td></td>
					      <td>
					      	<a class="btn btn-primary btn-xs printPayment" data-id=""><i class="fa fa-print" aria-hidden="true" ></i>&nbsp;Print</a>
					      </td>					   
					    </tr>
					    
					  </tbody>
				</table>
			</div>
		</section>
	</div>
</div>

@endsection

@section('additional')
<script type="text/javascript">
$('.select2').select2();

$('#corpTrans').DataTable({
  'paging'      : true,
  'lengthChange': true,
  'searching'   : true,
  'ordering'    : true,
  'info'        : true,
  'autoWidth'   : true
});
$('#corpPayment').DataTable({
  'paging'      : true,
  'lengthChange': true,
  'searching'   : true,
  'ordering'    : true,
  'info'        : true,
  'autoWidth'   : true
});

</script>
@endsection