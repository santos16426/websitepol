@extends('AdminLayout.admin')

@if((Session::get('addresult')!= 1))
<script type="text/javascript">
    window.location = "{{ url('/PageNotFound') }}";
</script>
@endif

@section ('breadrootName')
<i class="fa fa-handshake-o" aria-hidden="true"></i><span> Transaction</span>
@endsection

@section ('breadParentName')
<i class="fa fa-clipboard" aria-hidden="true"></i><span> Results</span>
@endsection
@section('breadactivePage','Encoding of Results')
@section('maintenanceactive')
<a href="">
@endsection

@section('transaction','active')
@section('transresultactive','active')
@section('encodeactive','active')

@section ('content')

<div class="row">
	<div class="col-lg-12">
		<section class="panel">
			<form method="POST" action="/save_xray"  enctype="multipart/form-data">
			<header class="panel-heading">
				X-Ray
			</header>
			<div class="panel-body">
				<input type="hidden" name="result_id" value='{{ $result_id }}'>
				@foreach($services as $serv)
				<input type="hidden" name="service_id[]" value="{{ $serv->service_id }}">
				@endforeach
			@foreach($patient as $patientinfo)
			<div class="col-md-12">
				<div class="col-md-6">
			        <div class="form-group">
			              <div class="col-md-12">
			                 <div class="input-group">
			                  <div class="input-group-addon">
			                   Name
			                 </div>
			                <input readonly="" name="name" id="name" value="{{ $patientinfo->patient_fname }} {{ $patientinfo->patient_mname }} {{ $patientinfo->patient_lname }}"  type="text" placeholder="Name" class="form-control input-md" required>
			             </div>
			          </div>  
			       </div><br><br>
			 	 </div>
			 	 <div class="col-md-6">
			        <div class="form-group">
			              <div class="col-md-12">
			                 <div class="input-group">
			                  <div class="input-group-addon">
			                  Laboratory No.
			                 </div>
			                <input readonly="" value="{{ $lab_id }}" name="labno" id="labno" placeholder="Laboratory No." class="form-control input-md" required>
			             </div>
			          </div>  
			       </div><br><br>
		        </div> 
		    </div>  

		    <div class="col-md-12">
				<div class="col-md-6">
			        <div class="form-group">
			              <div class="col-md-12">
			                 <div class="input-group">
			                  <div class="input-group-addon">
			                   Age
			                 </div>
			                <input readonly="" name="age" id="age" value="{{ $patientinfo->age }}" placeholder="Age" class="form-control input-md" required>
			             </div>
			          </div>  
			       </div><br><br>
			 	 </div>
			 	 <div class="col-md-6">
			        <div class="form-group">
			              <div class="col-md-12">
			                 <div class="input-group">
			                  <div class="input-group-addon">
			                   Print Date
			                 </div>
			                <input readonly="" name="printdate" id="printdate" value="{{ $datenow }}" placeholder="Print Date" class="form-control input-md" required>
			             </div>
			          </div>  
			       </div><br><br>
		        </div> 
		    </div>  

		    <div class="col-md-12">
				<div class="col-md-6">
			        <div class="form-group">
			              <div class="col-md-12">
			                 <div class="input-group">
			                  <div class="input-group-addon">
			                   Gender
			                 </div>
			                <input readonly="" name="sex" id="sex" value="{{ $patientinfo->patient_gender }}" type="text" placeholder="Sex" class="form-control input-md" required>
			             </div>
			          </div>  
			       </div><br><br>
			 	 </div>
			 	 <div class="col-md-6">
			        <div class="form-group">
			       </div><br><br><br>
		        </div> 
		    </div>  
		    @endforeach
		    <div class="col-md-12">
				<div class="col-md-6">
			        <div class="form-group">
			              <div class="col-md-12">
			                 <div class="input-group">
			                  <div class="input-group-addon">
			                   Title
			                 </div>
			                <input name="title" id="title" type="text" placeholder="Title" class="form-control input-md" pattern="[a-zA-Z0-9.>/=\<-]{1,50}" title="This Field is required. This Field should not exceed 50 characters." required>
			             </div>
			          </div>  
			       </div><br><br>
			 	 </div>
			 	 <div class="col-md-6">
			        <div class="form-group">
			       </div><br><br>
		        </div> 
		    </div>

		    <div class="col-md-12">
				<div class="col-md-6">
			        <div class="form-group">
			              <div class="col-md-12">
			                 <label>Findings</label> 
			                <textarea  name="findings" id="findings" type="text" placeholder="" class="form-control input-md" pattern=".{1,1000}" title="Special characters are not allowed." title="This Field is required. This Field should not exceed 1000 characters." required></textarea>
			          </div>  
			       </div><br><br>
			 	 </div>
			 	 <div class="col-md-6">
			        <div class="form-group">
			       </div><br><br><br><br><br>
		        </div> 
		    </div>

		    <div class="col-md-12">
				<div class="col-md-6">
			        <div class="form-group">
			              <div class="col-md-12">
			                 <div class="input-group" >
									<span class="input-group-addon">Radiologic Technologist</span>
									<select class="form-control" name="radiologic" id="radiologic" style="width: 100%"  required="" >
										@foreach($radtech as $rad)

											<option value="{{ $rad->emp_id }}">{{ $rad->emp_fname }} {{ $rad->emp_mname }} {{ $rad->emp_lname }}</option>
										@endforeach
										@if(count($radtech)==0)
										<option disabled="">No available Radiologic Technologist</option>
										@endif
									</select>
								</div>
			          		</div>  
			       </div><br><br>
			 	 </div>
			 	 <div class="col-md-6">
			        <div class="form-group">
			        	<div class="col-md-12">
			                 <div class="input-group">
			                  <div class="input-group-addon">
			                   License No.
			                 </div>
			                <input readonly="" name="radlicense" id="radlicense" type="text" placeholder="License No." class="form-control input-md" required>
			             </div>
			          </div>
			       </div><br><br>
		        </div> 
		    </div>

		    <div class="col-md-12">
				<div class="col-md-6">
			        <div class="form-group" style="padding-left: 16px">
			        	<label>Upload Signature</label>
			              <div class="fileupload fileupload-new" data-provides="fileupload"> 
            					<div class="fileupload-new thumbnail" style="width: 200px; height: 150px;">
            						<img src="{{ asset('/CorporatePayments/default.jpg') }}" alt="" /> 
            					</div> 
            					<div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div> 
            					<div>
            						<span class="btn btn-white btn-file"> 
	            						<span class="fileupload-new"><i class="fa fa-paper-clip"></i> Select image</span>
	            						<span class="fileupload-exists"><i class="fa fa-undo"></i> Change</span>
	            						<input type="file" class="default" name="radiologic_img" required> 
            						</span> 
            						<a href="#" class="btn btn-danger fileupload-exists" data-dismiss="fileupload"><i class="fa fa-trash"></i> Remove</a> 
            					</div> 
            				</div>  
			       </div><br><br>
			 	 </div>
			 	 <div class="col-md-6">
			        <div class="form-group"> 
			       </div><br><br>
		        </div> 
		    </div>

		    <div class="col-md-12">
				<div class="col-md-6">
			        <div class="form-group">
			              <div class="col-md-12">
			                 <div class="input-group" >
									<span class="input-group-addon">Radiologist</span>
									<select class="form-control" name="radiologist" id="radiologist" style="width: 100%"  required="" >
										@foreach($radiologist as $rads)
											<option value="{{ $rads->emp_id }}">{{ $rads->emp_fname }} {{ $rads->emp_mname }} {{ $rads->emp_lname }}</option>
										@endforeach
										@if(count($radiologist)==0)
										<option disabled="">No available Radiologist</option>
										@endif
									</select>
								</div>
			          		</div>  
			       </div><br><br>
			 	 </div>
			 	 <div class="col-md-6">
			        <div class="form-group">
			       </div><br><br>
		        </div> 
		    </div>

		    <div class="col-md-12">
				<div class="col-md-6">
			        <div class="form-group" style="padding-left: 16px">
			        	<label>Upload Signature</label>
			              <div class="fileupload fileupload-new" data-provides="fileupload"> 
            					<div class="fileupload-new thumbnail" style="width: 200px; height: 150px;">
            						<img src="{{ asset('/CorporatePayments/default.jpg') }}" alt="" /> 
            					</div> 
            					<div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div> 
            					<div>
            						<span class="btn btn-white btn-file"> 
	            						<span class="fileupload-new"><i class="fa fa-paper-clip"></i> Select image</span>
	            						<span class="fileupload-exists"><i class="fa fa-undo"></i> Change</span>
	            						<input type="file" class="default" name="radiologist_img" required> 
            						</span> 
            						<a href="#" class="btn btn-danger fileupload-exists" data-dismiss="fileupload"><i class="fa fa-trash"></i> Remove</a> 
            					</div> 
            				</div>  
			       </div><br><br>
			 	 </div>
			 	 <div class="col-md-6">
			        <div class="form-group"> 
			       </div><br><br>
		        </div> 
		    </div>

	        </div>

	        {{ csrf_field() }}
	      </div>
					
			</div>
			<center>
				<button type="button" class="btn btn-xs" style="width: 8%">Back</button>
		        <button type="submit" class="btn btn-xs btn-success"  style="width: 8%">Save & Print</button>
		    </center>
		</form>
		</section>
	</div>
</div>
@endsection
@section('additional')
<script type="text/javascript">
	$('#radiologic').click(function(){
		var id =$('#radiologic').val();
		$.ajax
		({
			url : '/getLicense',
			data: {id:id},
			dataType : 'json',
			type: 'get',
			success:function(response)
			{
				$('#radlicense').val(response);
			}
		})
	})
	$(".select2").select2({
		placeholder:"Select an Employee"
	})
</script>
@endsection