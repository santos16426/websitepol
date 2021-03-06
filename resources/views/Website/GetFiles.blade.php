

<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>Transaction</title>
  <link rel="stylesheet" href="{{ asset('/webplugins/assets/css/now-ui-kit.css') }}">
  <link rel="stylesheet" href="{{ asset('/webplugins/DataTable/assets/css/bootstrap-tbl.css') }}">
  <link rel="stylesheet" href="{{ asset('/webplugins/DataTable/assets/css/demo.css') }}">
  <link rel="stylesheet" href="{{ asset('/webplugins/DataTable/assets/css/bootstrap.min.css') }}">
  <link rel="stylesheet" href="{{ asset('/webplugins/DataTable/assets/css/fresh-bootstrap-table.css') }}">
  <link rel="stylesheet" href="{{ asset('/webplugins/DataTable/assets/css/gsdk.css') }}">
  <link rel="stylesheet" href="{{ asset('/webplugins/DataTable/assets/css/gsdk-base.css') }}">
  <link rel="stylesheet" href="{{ asset('/webplugins/DataTable/assets/style.css') }}">
  <link rel="stylesheet" href="{{ asset('/webplugins/DataTable/assets/background.css') }}">
  <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
  <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
  

</head>
<body>
  <div id="navbar-full">
    <div id="navbar">
       <nav class="navbar navbar-fixed-top navbar-ct-blue ">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#" rel="tooltip">
                    <strong><small>E-DIAGNOSTIC CENTER</small></strong>
                </a>
            </div>
        
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                  @if(Session::get('login') == true)
                      <li><a href="/doctors">Doctor &nbsp;<i class="fa fa-users" aria-hidden="true"></i></a></li>
                      <li><a href="/service">Service &nbsp;<i class="fa fa-dropbox" aria-hidden="true"></i></a></li>
                    @endif
                      <li><a href="/Website/Home">Back to Website&nbsp;&nbsp;<i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
                      
                      </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
        </nav>
    
    </div><!--  end navbar -->

</div> <!-- end menu-dropdown -->

<div class="main">
    <div class="col-sm-12"> <div class="container">
        <div class="row">
        
        <div class="space-100"></div>      
                                
                <div class="fresh-table toolbar-color-blue">
                    <div class="toolbar">
                        
                    </div>
                    @if(Session::get('login') == true)
                    <table id="fresh-table" class="table">
                        <thead>
                          <th data-sortable="true">Transaction Date</th>
                          <th >Patient Full Name</th>
                          <th>Age</th>
                          <th>Location</th>
                          <th>Services</th>
                          <th>Doctor</th>
                        </thead>
                        <tbody>
                        @foreach($table as $t)
                        <tr>
                        <td>{{ $t->sched_date }}</td>
                        <td>{{ $t->full_name }}</td>
                        <td>{{ $t->age }}</td>
                        <td>{{ $t->address }}</td>
                        <td>
                          @foreach($service as $s)
                           @if($s->trans_id == $t->tran_id)
                            {{ $s->service_name }},
                           @endif
                          @endforeach
                        </td>
                        <td>{{ $t->doctor_name }}</td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                    @else

                   
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                
                                <h4 class="modal-title" id="myModalLabel" style="margin-top: -10%">Login</h4>
                              </div>
                              <form method="POST" action="/login">
                                  <div class="modal-body">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <input type="text" value="" placeholder="Username" pattern="admin" title="Incorrect username and password" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <input type="password" value="" placeholder="Password" pattern="admin" title="Incorrect username and password" class="form-control">
                                        </div>
                                    </div>
                                  </div>
                                  <div class="modal-footer">
                                    <div class="col-md-12">
                                        <button type="submit" class="btn btn-success btn-round">Go</button>
                                    </div>
                                  </div>
                                  {{ csrf_field() }}
                                </form>
                            </div>
                          </div>
                          @endif
                </div>
        </div>
      </div>
    </div> 
  </div>
</body>


  
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>

<script src="{{ asset('/webplugins/assets/js/site.min.js') }}"></script>

<script src="{{ asset('/webplugins/DataTable/assets/js/bootstrap-tbl.js') }}"></script>
<script src="{{ asset('/webplugins/DataTable/assets/js/bootstrap-table.js') }}"></script>

<script type="text/javascript">
  $(document).ready(function () {
    $('#admin').modal('show');
});
</script>
<script type="text/javascript">
        var $table = $('#fresh-table'),
            
            full_screen = false;
            
        $().ready(function(){
            $table.bootstrapTable({
                toolbar: ".toolbar",
    
                showRefresh: true,
                search: true,
                showToggle: true,
                showColumns:true,
                pagination: true,
                striped: true,
                pageSize: 5,
                pageList: [5,10,25,50,100],
                
                formatShowingRows: function(pageFrom, pageTo, totalRows){
                    //do nothing here, we don't want to show the text "showing x of y from..." 
                },
                formatRecordsPerPage: function(pageNumber){
                    return pageNumber + " rows visible";
                },
                icons: {
                    refresh: 'fa fa-refresh',
                    toggle: 'fa fa-th-list',
                    columns: 'fa fa-columns',
                    detailOpen: 'fa fa-plus-circle',
                    detailClose: 'fa fa-minus-circle'
                }
            });
            
                        
            
            $(window).resize(function () {
                $table.bootstrapTable('resetView');
            });
    
            
            window.operateEvents = {
                'click .like': function (e, value, row, index) {
                    alert('You click like icon, row: ' + JSON.stringify(row));
                    console.log(value, row, index);
                },
                'click .edit': function (e, value, row, index) {
                    alert('You click edit icon, row: ' + JSON.stringify(row));
                    console.log(value, row, index);    
                },
                'click .remove': function (e, value, row, index) {
                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: [row.id]
                    });
            
                }
            };
            
         
            
        });
            
    
        function operateFormatter(value, row, index) {
            return [
                '<a rel="tooltip" title="Like" class="table-action like" href="javascript:void(0)" title="Like">',
                    '<i class="fa fa-heart"></i>',
                '</a>',
                '<a rel="tooltip" title="Edit" class="table-action edit" href="javascript:void(0)" title="Edit">',
                    '<i class="fa fa-edit"></i>',
                '</a>',
                '<a rel="tooltip" title="Remove" class="table-action remove" href="javascript:void(0)" title="Remove">',
                    '<i class="fa fa-remove"></i>',
                '</a>'
            ].join('');
        }
    
            
    </script>



</html>
  