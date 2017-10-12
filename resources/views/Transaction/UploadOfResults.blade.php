@if((Session::get('upresult')!= 1))
<script type="text/javascript">
    window.location = "{{ url('/PageNotFound') }}";
</script>
@endif
@extends('AdminLayout.admin')

@section ('breadrootName')
<i class="fa fa-handshake-o" aria-hidden="true"></i><span> Transaction</span>
@endsection

@section ('breadParentName')
<i class="fa fa-clipboard" aria-hidden="true"></i><span> Results</span>
@endsection
@section('breadactivePage','Uploading of Results')
@section('maintenanceactive')
<a href="">
@endsection

@section('transaction','active')
@section('transresultactive','active')
@section('uploadactive','active')
@section('content')
<div class="row">
	<div class="col-lg-12">
		<section class="panel">
			<header class="panel-heading">
				<strong>Upload Result</strong>
			</header>
			<div class="panel-body">
				<div class="clearfix">
					<div class="btn-group pull-right">
					</div>
					<table class="table table-bordered table-hover dataTable" id="rebateTbl">
				      <thead>
				        <tr>
				          <th width="15%">Transaction Date</th>
				          <th width="15%">Patient Last Name</th>
				          <th width="15%">Patient Middle Name</th>
				          <th width="15%">Patient First Name</th>
				          <th width="5%">No. of files</th>
				          <th width="20%">Progress</th>
				          <th width="15%">Action</th>
				        </tr>
				      </thead>

				      <tbody>
				        @foreach($transactions as $transact)
				        <tr>
				          <td>{{  date('F jS, Y',strtotime($transact->trans_date)) }}</td>
				          <td>{{ $transact->patient_lname }}</td>
				          <td>{{ $transact->patient_mname }}</td>
				          <td>{{ $transact->patient_fname }}</td>
				          <td>
				          	@foreach($nooffiles as $nof)
				          		@if($nof->result_id == $transact->result_id)
				          		{{ $nof->count_row }}
				          		@else
				          		0
				          		@endif
				          	@endforeach
				          </td>
				          <td>
				          	@foreach($totaltrans as $totals)
				          		@if($totals->result_id == $transact->result_id)
					          		@foreach($donetrans as $dones)
					          			@if($dones->result_id == $transact->result_id)
					          				<?php $total = floor(($dones->count_row/$totals->count_row)*100) ?>
								          	<div class="progress progress-striped active progress-md">
				                                  <div class="progress-bar progress-bar-success"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: {{ $total }}%">
				                                      <span>{{ $total }}% Complete</span>
				                                  </div>
				                            </div>

			                            @else
			                            <div class="progress progress-striped active progress-md">
			                                  <div class="progress-bar progress-bar-success"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 1%">
			                                      <span style="color:black"></span>
			                                  </div>
			                            </div>
			                            @endif

		                            @endforeach
	                            @endif
                              @endforeach
				          </td>
				          <td>
				            <a class="btn btn-warning btn-xs" href="/Transaction/PatientTransaction?id={{ $transact->trans_id }}"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;  Add Files</a>
				            @if($total == 100)
				            <a class="btn btn-primary btn-xs" href="/uploadFileResuls?id={{ $transact->trans_id }}"><i class="fa fa-upload" aria-hidden="true"></i>&nbsp;  Upload Result</a>
				            @endif
				          </td>
				        </tr>
				        <?php $total=0; ?>
				        @endforeach
				      </tbody>
				    </table>
				</div>
			</div>
		</section>
	</div>
</div>
@endsection
@section('additional')
<script type="text/javascript">
	$('#rebateTbl').DataTable({
	  'paging'      : true,
	  'lengthChange': true,
	  'searching'   : true,
	  'ordering'    : false,
	  'info'        : true,
	  'autoWidth'   : true,
	  'bSort'		: false
	});
</script>
@endsection