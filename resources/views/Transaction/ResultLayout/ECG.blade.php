@if(Session::get('addresult')!= 1)
<script type="text/javascript">
    window.location = "{{ url('/PageNotFound') }}";
</script>
@endif
<!DOCTYPE html>
<html >
<body>
	<head>
		<meta charset="utf-8">
		<title>ECG</title>
		<link rel="stylesheet" href="{{ asset('/plugins/ecg.css') }}">
	</head>
			<div class="col-md-12">
				@foreach($patientinfo as $patient)
				<div class="col-md-4">
					<address style="float: left;">
						<p>ECG No.:&nbsp;<span></span></p>
						<p>Name:&nbsp;{{ $patient->patient_fname }} {{ $patient->patient_mname }} {{ $patient->patient_lname }}</p>
						<p>Rate:&nbsp;<span></span></p>
						<p>P/PR:&nbsp;<span></span></p>
						<p>QRS:&nbsp;<span></span></p>
						<p>QT/QTC:&nbsp;<span></span></p>
						<p>P/QRS/T:&nbsp;<span></span></p>
					</address>
				</div>
				<div class="col-md-4">
					<address style="padding-left: 35%">
						<p>Sex:&nbsp;{{ $patient->patient_gender }}</p>
						<p>Age:&nbsp;{{ $patient->age }}</p>
						<p>Doctor:&nbsp;<span></span></p>
						<p>Minesota Code:&nbsp;<span></span></p>
					</address>
				</div>
				<div class="col-md-4">
					<address style="padding-left: 65%">
						<p>Diagnosis Info:&nbsp;<span></span></p>
					</address>
				</div>
				@endforeach
			</div>
		<br><br>
		<div >
    		<img src="/add.png">
		</div>
	</body>
</html>
  
